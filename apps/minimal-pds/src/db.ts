import SqliteDb from 'better-sqlite3'
import assert from 'node:assert'
import { retry } from '@atproto/common'
import {
  Kysely,
  KyselyPlugin,
  Migration,
  MigrationProvider,
  Migrator,
  PluginTransformQueryArgs,
  PluginTransformResultArgs,
  QueryResult,
  RootOperationNode,
  SqliteDialect,
  UnknownRow,
  sql,
} from 'kysely'
import { DatabaseSchema } from '#/types'
import { CID } from 'multiformats/cid'
import { cborToLexRecord, WriteOpAction } from '@atproto/repo'
import { AtUri } from '@atproto/uri'
import { RepoRecord } from '@atproto/lexicon'

const last = <T>(arr: T[]) => arr[arr.length - 1]
const DELAYS = [1, 2, 5, 10, 15, 20, 25, 25, 25, 50, 50, 100]
const TOTALS = [0, 1, 3, 8, 18, 33, 53, 78, 103, 128, 178, 228]
const RETRY_ERRORS = new Set(['SQLITE_BUSY', 'SQLITE_BUSY_SNAPSHOT', 'SQLITE_BUSY_RECOVERY', 'SQLITE_BUSY_TIMEOUT'])

export const retrySqlite = <T>(fn: () => Promise<T>): Promise<T> => {
  return retry(fn, {
    retryable: retryableSqlite,
    getWaitMs: getWaitMsSqlite,
    maxRetries: 60, // a safety measure: getWaitMsSqlite() times out before this after 5000ms of waiting.
  })
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const retryableSqlite = (err: any) => {
  return typeof err?.code === 'string' && RETRY_ERRORS.has(err.code)
}

// based on sqlite's backoff strategy https://github.com/sqlite/sqlite/blob/91c8e65dd4bf17d21fbf8f7073565fe1a71c8948/src/main.c#L1704-L1713
const getWaitMsSqlite = (n: number, timeout = 5000) => {
  if (n < 0) return null
  let delay: number
  let prior: number
  if (n < DELAYS.length) {
    delay = DELAYS[n]
    prior = TOTALS[n]
  } else {
    delay = last(DELAYS)
    prior = last(TOTALS) + delay * (n - (DELAYS.length - 1))
  }
  if (prior + delay > timeout) {
    delay = timeout - prior
    if (delay <= 0) return null
  }
  return delay
}

export class Database<Schema> {
  destroyed = false
  commitHooks: CommitHook[] = []

  constructor(public db: Kysely<Schema>) {}

  static sqlite<T>(location: string): Database<T> {
    const sqliteDb = new SqliteDb(location, {
      timeout: 0, // handled by application
    })
    const db = new Kysely<T>({
      dialect: new SqliteDialect({
        database: sqliteDb,
      }),
    })
    return new Database(db)
  }

  async ensureWal() {
    await sql`PRAGMA journal_mode = WAL`.execute(this.db)
  }

  async transactionNoRetry<T>(fn: (db: Database<Schema>) => T | PromiseLike<T>): Promise<T> {
    this.assertNotTransaction()
    const leakyTxPlugin = new LeakyTxPlugin()
    const { hooks, txRes } = await this.db
      .withPlugin(leakyTxPlugin)
      .transaction()
      .execute(async (txn) => {
        const dbTxn = new Database(txn)
        try {
          const txRes = await fn(dbTxn)
          leakyTxPlugin.endTx()
          const hooks = dbTxn.commitHooks
          return { hooks, txRes }
        } catch (err) {
          leakyTxPlugin.endTx()
          // ensure that all in-flight queries are flushed & the connection is open
          await txn.getExecutor().provideConnection(async () => {})
          throw err
        }
      })
    hooks.map((hook) => hook())
    return txRes
  }

  async transaction<T>(fn: (db: Database<Schema>) => T | PromiseLike<T>): Promise<T> {
    return retrySqlite(() => this.transactionNoRetry(fn))
  }

  async executeWithRetry<T>(query: { execute: () => Promise<T> }) {
    if (this.isTransaction) {
      // transaction() ensures retry on entire transaction, no need to retry individual statements.
      return query.execute()
    }
    return retrySqlite(() => query.execute())
  }

  onCommit(fn: () => void) {
    this.assertTransaction()
    this.commitHooks.push(fn)
  }

  get isTransaction() {
    return this.db.isTransaction
  }

  assertTransaction() {
    assert(this.isTransaction, 'Transaction required')
  }

  assertNotTransaction() {
    assert(!this.isTransaction, 'Cannot be in a transaction')
  }

  close(): void {
    if (this.destroyed) return
    this.db
      .destroy()
      .then(() => {
        this.destroyed = true
      })
      .catch((err) => console.error({ err }, 'error closing db'))
  }
}

type CommitHook = () => void

class LeakyTxPlugin implements KyselyPlugin {
  private txOver = false

  endTx() {
    this.txOver = true
  }

  transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
    if (this.txOver) {
      throw new Error('tx already failed')
    }
    return args.node
  }

  async transformResult(args: PluginTransformResultArgs): Promise<QueryResult<UnknownRow>> {
    return args.result
  }
}

export const createDb = (location: string): Database<DatabaseSchema> => {
  const kysely = new Kysely<DatabaseSchema>({
    dialect: new SqliteDialect({
      database: new SqliteDb(location),
    }),
    // plugins: [new ParseJSONResultsPlugin()],
  })
  return new Database(kysely)
}

const migrations: Record<string, Migration> = {}

const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations
  },
}

export const migrateToLatest = async (db: Database<DatabaseSchema>) => {
  const migrator = new Migrator({ db: db.db, provider: migrationProvider })
  const { error } = await migrator.migrateToLatest()
  if (error) throw error
}

migrations['001'] = {
  async up(db: Kysely<unknown>): Promise<void> {
    await db.schema
      .createTable('did_account')
      .addColumn('did', 'varchar', (col) => col.primaryKey())
      .addColumn('privateKey', 'varchar', (col) => col.notNull())
      .execute()

    await db.schema
      .createTable('repo_root')
      .addColumn('did', 'varchar', (col) => col.primaryKey())
      .addColumn('cid', 'varchar', (col) => col.notNull())
      .addColumn('rev', 'varchar', (col) => col.notNull())
      .addColumn('indexedAt', 'varchar', (col) => col.notNull())
      .execute()

    await db.schema
      .createTable('repo_block')
      .addColumn('cid', 'varchar', (col) => col.primaryKey())
      .addColumn('repoRev', 'varchar', (col) => col.notNull())
      .addColumn('size', 'integer', (col) => col.notNull())
      .addColumn('content', 'blob', (col) => col.notNull())
      .execute()

    await db.schema.createIndex('repo_block_repo_rev_idx').on('repo_block').columns(['repoRev', 'cid']).execute()

    await db.schema
      .createTable('record')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('cid', 'varchar', (col) => col.notNull())
      .addColumn('collection', 'varchar', (col) => col.notNull())
      .addColumn('rkey', 'varchar', (col) => col.notNull())
      .addColumn('repoRev', 'varchar', (col) => col.notNull())
      .addColumn('indexedAt', 'varchar', (col) => col.notNull())
      .addColumn('takedownRef', 'varchar')
      .execute()
    await db.schema.createIndex('record_cid_idx').on('record').column('cid').execute()
    await db.schema.createIndex('record_collection_idx').on('record').column('collection').execute()
    await db.schema.createIndex('record_repo_rev_idx').on('record').column('repoRev').execute()

    await db.schema
      .createTable('blob')
      .addColumn('cid', 'varchar', (col) => col.primaryKey())
      .addColumn('mimeType', 'varchar', (col) => col.notNull())
      .addColumn('size', 'integer', (col) => col.notNull())
      .addColumn('tempKey', 'varchar')
      .addColumn('width', 'integer')
      .addColumn('height', 'integer')
      .addColumn('createdAt', 'varchar', (col) => col.notNull())
      .addColumn('takedownRef', 'varchar')
      .execute()
    await db.schema.createIndex('blob_tempkey_idx').on('blob').column('tempKey').execute()

    await db.schema
      .createTable('record_blob')
      .addColumn('blobCid', 'varchar', (col) => col.notNull())
      .addColumn('recordUri', 'varchar', (col) => col.notNull())
      .addPrimaryKeyConstraint('record_blob_pkey', ['blobCid', 'recordUri'])
      .execute()

    await db.schema
      .createTable('backlink')
      .addColumn('uri', 'varchar', (col) => col.notNull())
      .addColumn('path', 'varchar', (col) => col.notNull())
      .addColumn('linkTo', 'varchar', (col) => col.notNull())
      .addPrimaryKeyConstraint('backlinks_pkey', ['uri', 'path'])
      .execute()
    await db.schema.createIndex('backlink_link_to_idx').on('backlink').columns(['path', 'linkTo']).execute()

    await db.schema
      .createTable('account_pref')
      .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
      .addColumn('name', 'varchar', (col) => col.notNull())
      .addColumn('valueJson', 'text', (col) => col.notNull())
      .execute()
  },

  async down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('account_pref').execute()
    await db.schema.dropTable('backlink').execute()
    await db.schema.dropTable('record_blob').execute()
    await db.schema.dropTable('blob').execute()
    await db.schema.dropTable('record').execute()
    await db.schema.dropTable('repo_block').execute()
    await db.schema.dropTable('repo_root').execute()
  },
}

// Most of these are pulled from RecordTransactor pds/src/actor-store/record/sql-record-transactor.ts
export async function indexRecord(
  db: Database<DatabaseSchema>,
  uri: AtUri,
  cid: CID,
  record: RepoRecord | null,
  // biome-ignore lint/style/useDefaultParameterLast: <explanation>
  action: WriteOpAction.Create | WriteOpAction.Update = WriteOpAction.Create,
  repoRev: string,
  timestamp?: string,
) {
  console.debug({ uri }, 'indexing record')
  const row = {
    uri: uri.toString(),
    cid: cid.toString(),
    collection: uri.collection,
    rkey: uri.rkey,
    repoRev: repoRev,
    indexedAt: timestamp || new Date().toISOString(),
  }
  if (!uri.hostname.startsWith('did:')) {
    throw new Error('Expected indexed URI to contain DID')
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (row.collection.length < 1) {
    throw new Error('Expected indexed URI to contain a collection')
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else if (row.rkey.length < 1) {
    throw new Error('Expected indexed URI to contain a record key')
  }

  // Track current version of record
  await db.db
    .insertInto('record')
    .values(row)
    .onConflict((oc) =>
      oc.column('uri').doUpdateSet({
        cid: row.cid,
        repoRev: repoRev,
        indexedAt: row.indexedAt,
      }),
    )
    .execute()

  // TODO what are backlinks for?
  // if (record !== null) {
  //   // Maintain backlinks
  //   const backlinks = getBacklinks(uri, record)
  //   if (action === WriteOpAction.Update) {
  //     // On update just recreate backlinks from scratch for the record, so we can clear out
  //     // the old ones. E.g. for weird cases like updating a follow to be for a different did.
  //     await this.removeBacklinksByUri(uri)
  //   }
  //   await this.addBacklinks(backlinks)
  // }

  console.info({ uri }, 'indexed record')
}

export async function deleteRecord(db: Database<DatabaseSchema>, uri: AtUri) {
  console.debug({ uri }, 'deleting indexed record')
  const deleteQuery = db.db.deleteFrom('record').where('uri', '=', uri.toString())
  const backlinkQuery = db.db.deleteFrom('backlink').where('uri', '=', uri.toString())
  await Promise.all([deleteQuery.execute(), backlinkQuery.execute()])

  console.info({ uri }, 'deleted indexed record')
}

export async function getRecord(
  db: Database<DatabaseSchema>,
  uri: AtUri,
  cid: string | null,
  includeSoftDeleted = false,
): Promise<{
  uri: string
  cid: string
  value: Record<string, unknown>
  indexedAt: string
  takedownRef: string | null
} | null> {
  const { ref } = db.db.dynamic
  let builder = db.db
    .selectFrom('record')
    .innerJoin('repo_block', 'repo_block.cid', 'record.cid')
    .where('record.uri', '=', uri.toString())
    .selectAll()
  // .if(!includeSoftDeleted, (qb) =>
  //   qb.where(notSoftDeletedClause(ref('record'))),
  // )
  if (cid) {
    builder = builder.where('record.cid', '=', cid)
  }
  const record = await builder.executeTakeFirst()
  if (!record) return null
  return {
    uri: record.uri,
    cid: record.cid,
    value: cborToLexRecord(record.content),
    indexedAt: record.indexedAt,
    takedownRef: record.takedownRef ? record.takedownRef.toString() : null,
  }
}

export async function getDuplicateRecordCids(
  db: Database<DatabaseSchema>,
  cids: CID[],
  touchedUris: AtUri[],
): Promise<CID[]> {
  if (touchedUris.length === 0 || cids.length === 0) {
    return []
  }
  const cidStrs = cids.map((c) => c.toString())
  const uriStrs = touchedUris.map((u) => u.toString())
  const res = await db.db
    .selectFrom('record')
    .where('cid', 'in', cidStrs)
    .where('uri', 'not in', uriStrs)
    .select('cid')
    .execute()
  return res.map((row) => CID.parse(row.cid))
}
