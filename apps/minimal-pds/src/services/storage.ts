import { cborDecode, check, chunkArray } from '@atproto/common'
import {
  sql,
} from 'kysely'
import { DatabaseSchema, RepoBlock } from '#/types'
import { CID } from 'multiformats/cid'
import {
  BlockMap,
  CarBlock,
  cborToLexRecord,
  CidSet,
  CommitData,
  RepoStorage,
  writeCarStream,
} from '@atproto/repo'
import { RepoRecord } from '@atproto/lexicon'
import { Database } from '#/db'

export const parseObjByDef = <T>(
  bytes: Uint8Array,
  cid: CID,
  def: check.Def<T>,
): { obj: T; bytes: Uint8Array } => {
  const obj = cborDecode(bytes)
  const res = def.schema.safeParse(obj)
  if (res.success) {
    return { obj: res.data, bytes }
  }
  throw new Error(`Unexpected object ${cid.toString()}`)
}

export abstract class ReadableBlockstore {
  abstract getBytes(cid: CID): Promise<Uint8Array | null>
  abstract has(cid: CID): Promise<boolean>
  abstract getBlocks(cids: CID[]): Promise<{ blocks: BlockMap; missing: CID[] }>

  async attemptRead<T>(
    cid: CID,
    def: check.Def<T>,
  ): Promise<{ obj: T; bytes: Uint8Array } | null> {
    const bytes = await this.getBytes(cid)
    if (!bytes) return null
    return parseObjByDef(bytes, cid, def)
  }

  async readObjAndBytes<T>(
    cid: CID,
    def: check.Def<T>,
  ): Promise<{ obj: T; bytes: Uint8Array }> {
    const read = await this.attemptRead(cid, def)
    if (!read) {
      throw new Error(`Missing block ${cid.toString()}`)
    }
    return read
  }

  async readObj<T>(cid: CID, def: check.Def<T>): Promise<T> {
    const obj = await this.readObjAndBytes(cid, def)
    return obj.obj
  }

  async attemptReadRecord(cid: CID): Promise<RepoRecord | null> {
    try {
      return await this.readRecord(cid)
    } catch {
      return null
    }
  }

  async readRecord(cid: CID): Promise<RepoRecord> {
    const bytes = await this.getBytes(cid)
    if (!bytes) {
      throw new Error(`Missing block ${cid.toString()}`)
    }
    return cborToLexRecord(bytes)
  }
}

export class SqlRepoReader extends ReadableBlockstore {
  cache: BlockMap = new BlockMap()

  constructor(public db: Database<DatabaseSchema>) {
    super()
  }

  async getRoot(): Promise<CID> {
    const root = await this.getRootDetailed()
    return root.cid
  }

  async getRootDetailed(): Promise<{ cid: CID; rev: string }> {
    const res = await this.db.db
      .selectFrom('repo_root')
      .select(['cid', 'rev'])
      .limit(1)
      .executeTakeFirstOrThrow()
    return {
      cid: CID.parse(res.cid),
      rev: res.rev,
    }
  }

  async getBytes(cid: CID): Promise<Uint8Array | null> {
    const cached = this.cache.get(cid)
    if (cached) return cached
    const found = await this.db.db
      .selectFrom('repo_block')
      .where('repo_block.cid', '=', cid.toString())
      .select('content')
      .executeTakeFirst()
    if (!found) return null
    this.cache.set(cid, found.content)
    return found.content
  }

  async has(cid: CID): Promise<boolean> {
    const got = await this.getBytes(cid)
    return !!got
  }

  async getBlocks(cids: CID[]): Promise<{ blocks: BlockMap; missing: CID[] }> {
    const cached = this.cache.getMany(cids)
    if (cached.missing.length < 1) return cached
    const missing = new CidSet(cached.missing)
    const missingStr = cached.missing.map((c) => c.toString())
    const blocks = new BlockMap()
    await Promise.all(
      chunkArray(missingStr, 500).map(async (batch) => {
        const res = await this.db.db
          .selectFrom('repo_block')
          .where('repo_block.cid', 'in', batch)
          .select(['repo_block.cid as cid', 'repo_block.content as content'])
          .execute()
        for (const row of res) {
          const cid = CID.parse(row.cid)
          blocks.set(cid, row.content)
          missing.delete(cid)
        }
      }),
    )
    this.cache.addMap(blocks)
    blocks.addMap(cached.blocks)
    return { blocks, missing: missing.toList() }
  }

  async getCarStream(since?: string) {
    const root = await this.getRoot()
    if (!root) {
      throw new Error('Repo root not found')
    }
    return writeCarStream(root, this.iterateCarBlocks(since))
  }

  async *iterateCarBlocks(since?: string): AsyncIterable<CarBlock> {
    let cursor: RevCursor | undefined = undefined
    // allow us to write to car while fetching the next page
    do {
      const res = await this.getBlockRange(since, cursor)
      for (const row of res) {
        yield {
          cid: CID.parse(row.cid),
          bytes: row.content,
        }
      }
      const lastRow = res.at(-1)
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (lastRow && lastRow.repoRev) {
        cursor = {
          cid: CID.parse(lastRow.cid),
          rev: lastRow.repoRev,
        }
      } else {
        cursor = undefined
      }
    } while (cursor)
  }

  async getBlockRange(since?: string, cursor?: RevCursor) {
    let builder = this.db.db
      .selectFrom('repo_block')
      .select(['cid', 'repoRev', 'content'])
      .orderBy('repoRev', 'desc')
      .orderBy('cid', 'desc')
      .limit(500)

    if (cursor) {
      // use this syntax to ensure we hit the index
      builder = builder.where((eb) => 
        eb.and([
          eb('repoRev', '<', cursor.rev),
          eb.or([
            eb('repoRev', '=', cursor.rev),
            eb('cid', '<', cursor.cid.toString())
          ])
        ])
      )
    }
    if (since) {
      builder = builder.where('repoRev', '>', since)
    }
    return builder.execute()
  }

  async countBlocks(): Promise<number> {
    const res = await this.db.db
      .selectFrom('repo_block')
      .select(sql`count(*)`.as('count'))
      .executeTakeFirst()
    return (res?.count as number) || 0
  }

  async destroy(): Promise<void> {
    throw new Error('Destruction of SQL repo storage not allowed at runtime')
  }
}

type RevCursor = {
  cid: CID
  rev: string
}

// PUlled from pds/src/actor-store/repo/sql-repo-transactor.ts'.
export class SqlRepoTransactor extends SqlRepoReader implements RepoStorage {
  cache: BlockMap = new BlockMap()
  now: string

  constructor(
    public db: Database<DatabaseSchema>,
    public did: string,
    now?: string,
  ) {
    super(db)
    this.now = now ?? new Date().toISOString()
  }

  // proactively cache all blocks from a particular commit (to prevent multiple roundtrips)
  async cacheRev(rev: string): Promise<void> {
    const res = await this.db.db
      .selectFrom('repo_block')
      .where('repoRev', '=', rev)
      .select(['repo_block.cid', 'repo_block.content'])
      .limit(15)
      .execute()
    for (const row of res) {
      this.cache.set(CID.parse(row.cid), row.content)
    }
  }

  async putBlock(cid: CID, block: Uint8Array, rev: string): Promise<void> {
    await this.db.db
      .insertInto('repo_block')
      .values({
        cid: cid.toString(),
        repoRev: rev,
        size: block.length,
        content: block,
      })
      .onConflict((oc) => oc.doNothing())
      .execute()
    this.cache.set(cid, block)
  }

  async putMany(toPut: BlockMap, rev: string): Promise<void> {
    const blocks: RepoBlock[] = []
    toPut.forEach((bytes, cid) => {
      blocks.push({
        cid: cid.toString(),
        repoRev: rev,
        size: bytes.length,
        content: bytes,
      })
    })
    await Promise.all(
      chunkArray(blocks, 50).map((batch) =>
        this.db.db
          .insertInto('repo_block')
          .values(batch)
          .onConflict((oc) => oc.doNothing())
          .execute(),
      ),
    )
  }

  async deleteMany(cids: CID[]) {
    if (cids.length < 1) return
    const cidStrs = cids.map((c) => c.toString())
    await this.db.db
      .deleteFrom('repo_block')
      .where('cid', 'in', cidStrs)
      .execute()
  }

  async applyCommit(commit: CommitData, isCreate?: boolean) {
    await Promise.all([
      this.updateRoot(commit.cid, commit.rev, isCreate),
      this.putMany(commit.newBlocks, commit.rev),
      this.deleteMany(commit.removedCids.toList()),
    ])
  }

  async updateRoot(cid: CID, rev: string, isCreate = false): Promise<void> {
    if (isCreate) {
      await this.db.db
        .insertInto('repo_root')
        .values({
          did: this.did,
          cid: cid.toString(),
          rev: rev,
          indexedAt: this.now,
        })
        .execute()
    } else {
      await this.db.db
        .updateTable('repo_root')
        .set({
          cid: cid.toString(),
          rev: rev,
          indexedAt: this.now,
        })
        .execute()
    }
  }

  async destroy(): Promise<void> {
    throw new Error('Destruction of SQL repo storage not allowed at runtime')
  }
}