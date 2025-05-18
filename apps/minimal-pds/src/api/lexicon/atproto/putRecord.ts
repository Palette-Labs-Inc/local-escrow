import { AppContext } from '#/context'
import { CID } from 'multiformats/cid'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'
import { Server } from '#/lexicon'
import { AtUri } from '@atproto/uri'
import {
  WriteOpAction,
  cborToLex,
  formatDataKey,
  Repo,
  RecordDeleteOp,
  RecordWriteOp,
  RecordCreateOp,
  RecordUpdateOp,
} from '@atproto/repo'
import { TID } from '@atproto/common'
import { InvalidRequestError } from '@atproto/xrpc-server'
import { RepoRecord, lexToIpld } from '@atproto/lexicon'
import {
  InvalidRecordError,
  PreparedCreate,
  PreparedUpdate,
  PreparedWrite,
  CommitDataWithOps,
  CommitOp,
  BadRecordSwapError,
  BadCommitSwapError,
  PreparedDelete,
} from '#/types'
import { deleteRecord, getDuplicateRecordCids, getRecord, indexRecord } from '#/db'
import { SqlRepoTransactor } from '#/services/storage'
import * as cbor from '@ipld/dag-cbor'

export const dataToCborBlock = async (data: unknown) => {
  return Block.encode({
    value: data,
    codec: cbor,
    hasher: sha256,
  })
}

async function cidForSafeRecord(record: RepoRecord) {
  try {
    const block = await dataToCborBlock(lexToIpld(record))
    return block.cid
  } catch (err) {
    // Block does not properly transform between lex and cbor
    console.log('Bad record:', err)
    throw new InvalidRecordError('Bad record')
  }
}

export const setCollectionName = (collection: string, record: RepoRecord, validate: boolean) => {
  if (!record.$type) {
    record.$type = collection
  }
  if (validate && record.$type !== collection) {
    throw new InvalidRecordError(`Invalid $type: expected ${collection}, got ${record.$type}`)
  }
  return record
}

export const prepareCreate = async (opts: {
  did: string
  collection: string
  rkey?: string
  swapCid?: CID | null
  record: RepoRecord
  validate?: boolean
}): Promise<PreparedCreate> => {
  const { did, collection, swapCid, validate } = opts
  const maybeValidate = validate !== false
  const record = setCollectionName(collection, opts.record, maybeValidate)
  // let validationStatus: ValidationStatus
  // if (maybeValidate) {
  //   validationStatus = assertValidRecordWithStatus(record, {
  //     requireLexicon: validate === true,
  //   })
  // }
  const nextRkey = TID.next()
  const rkey = opts.rkey || nextRkey.toString()
  // @TODO: validate against Lexicon record 'key' type, not just overall recordkey syntax
  // ensureValidRecordKey(rkey)
  return {
    action: WriteOpAction.Create,
    uri: AtUri.make(did, collection, rkey),
    cid: await cidForSafeRecord(record),
    swapCid,
    record,
    blobs: [],
    validationStatus: 'valid',
  }
}

export const prepareUpdate = async (opts: {
  did: string
  collection: string
  rkey: string
  swapCid?: CID | null
  record: RepoRecord
  validate?: boolean
}): Promise<PreparedUpdate> => {
  const { did, collection, rkey, swapCid, validate } = opts
  const maybeValidate = validate !== false
  const record = setCollectionName(collection, opts.record, maybeValidate)
  // let validationStatus: ValidationStatus
  // if (maybeValidate) {
  //   validationStatus = assertValidRecordWithStatus(record, {
  //     requireLexicon: validate === true,
  //   })
  // }
  return {
    action: WriteOpAction.Update,
    uri: AtUri.make(did, collection, rkey),
    cid: await cidForSafeRecord(record),
    swapCid,
    record,
    blobs: [],
    validationStatus: 'valid',
  }
}

export const createWriteToOp = (write: PreparedCreate): RecordCreateOp => ({
  action: WriteOpAction.Create,
  collection: write.uri.collection,
  rkey: write.uri.rkey,
  record: write.record,
})

export const updateWriteToOp = (write: PreparedUpdate): RecordUpdateOp => ({
  action: WriteOpAction.Update,
  collection: write.uri.collection,
  rkey: write.uri.rkey,
  record: write.record,
})

export const deleteWriteToOp = (write: PreparedDelete): RecordDeleteOp => ({
  action: WriteOpAction.Delete,
  collection: write.uri.collection,
  rkey: write.uri.rkey,
})

export const writeToOp = (write: PreparedWrite): RecordWriteOp => {
  switch (write.action) {
    case WriteOpAction.Create:
      return createWriteToOp(write)
    case WriteOpAction.Update:
      return updateWriteToOp(write)
    case WriteOpAction.Delete:
      return deleteWriteToOp(write)
    default:
      throw new Error(`Unrecognized action: ${write}`)
  }
}

// `processWrites` and `formatCommit` are from RepoTransactor pds/src/actor-store/repo/transactor.ts. Repo transactor wraps SqlRepoTransactor
// Pulled out because RepoTransactor deals with blobs and queueing blog processing which pulls it just too much stuff
async function processWrites(
  writes: PreparedWrite[],
  did: string,
  ctx: AppContext,
  swapCommitCid?: CID,
): Promise<CommitDataWithOps> {
  // ctx.db.assertTransaction()
  if (writes.length > 200) {
    throw new InvalidRequestError('Too many writes. Max: 200')
  }

  const storage = new SqlRepoTransactor(ctx.db, did)
  const commit = await formatCommit(ctx, did, writes, swapCommitCid)
  // Do not allow commits > 2MB
  if (commit.relevantBlocks.byteSize > 2000000) {
    throw new InvalidRequestError('Too many writes. Max event size: 2MB')
  }

  await Promise.all([
    // persist the commit to repo storage
    storage.applyCommit(commit),
    // & send to indexing
    // ctx.indexWrites(writes, commit.rev),
    (async () => {
      await Promise.all(
        writes.map(async (write) => {
          // TOOD? What is indexing
          if (write.action === WriteOpAction.Create || write.action === WriteOpAction.Update) {
            await indexRecord(
              ctx.db,
              write.uri,
              write.cid,
              write.record,
              write.action,
              commit.rev,
              new Date().toISOString(),
            )
          } else if (write.action === WriteOpAction.Delete) {
            await deleteRecord(ctx.db, write.uri)
          }
        }),
      )
    })(),
    // process blobs
    // ctx.blob.processWriteBlobs(commit.rev, writes),
  ])
  return commit
}

async function formatCommit(
  ctx: AppContext,
  did: string,
  writes: PreparedWrite[],
  swapCommit?: CID,
): Promise<CommitDataWithOps> {
  // Create a new keypair?
  // Create a new repo?

  const storage = new SqlRepoTransactor(ctx.db, did)
  const currRoot = await storage.getRootDetailed()
  if (!currRoot) {
    throw new InvalidRequestError(`No repo root found for ${did}`)
  }
  if (swapCommit && !currRoot.cid.equals(swapCommit)) {
    throw new BadCommitSwapError(currRoot.cid)
  }
  // cache last commit since there's likely overlap
  // await this.storage.cacheRev(currRoot.rev)
  const newRecordCids: CID[] = []
  const delAndUpdateUris: AtUri[] = []
  const commitOps: CommitOp[] = []
  for (const write of writes) {
    const { action, uri, swapCid } = write
    if (action !== WriteOpAction.Delete) {
      newRecordCids.push(write.cid)
    }
    if (action !== WriteOpAction.Create) {
      delAndUpdateUris.push(uri)
    }
    const record = await getRecord(ctx.db, uri, null, true)
    const currRecord = record ? CID.parse(record.cid) : null

    const op: CommitOp = {
      action,
      path: formatDataKey(uri.collection, uri.rkey),
      cid: write.action === WriteOpAction.Delete ? null : write.cid,
    }
    if (currRecord) {
      op.prev = currRecord
    }
    commitOps.push(op)
    if (swapCid !== undefined) {
      if (action === WriteOpAction.Create && swapCid !== null) {
        throw new BadRecordSwapError(currRecord) // There should be no current record for a create
      }
      if (action === WriteOpAction.Update && swapCid === null) {
        throw new BadRecordSwapError(currRecord) // There should be a current record for an update
      }
      if (action === WriteOpAction.Delete && swapCid === null) {
        throw new BadRecordSwapError(currRecord) // There should be a current record for a delete
      }
      if ((currRecord || swapCid) && !currRecord?.equals(swapCid)) {
        throw new BadRecordSwapError(currRecord)
      }
    }
  }

  const repo = await Repo.load(storage, currRoot.cid)
  const prevData = repo.commit.data
  const writeOps = writes.map(writeToOp)
  const keypair = await ctx.accountManager.createOrGetAccount(storage)
  const commit = await repo.formatCommit(writeOps, keypair)

  // find blocks that would be deleted but are referenced by another record
  const dupeRecordCids = await getDuplicateRecordCids(ctx.db, commit.removedCids.toList(), delAndUpdateUris)
  for (const cid of dupeRecordCids) {
    commit.removedCids.delete(cid)
  }

  // find blocks that are relevant to ops but not included in diff
  // (for instance a record that was moved but cid stayed the same)
  const newRecordBlocks = commit.relevantBlocks.getMany(newRecordCids)
  if (newRecordBlocks.missing.length > 0) {
    const missingBlocks = await storage.getBlocks(newRecordBlocks.missing)
    commit.relevantBlocks.addMap(missingBlocks.blocks)
  }
  return {
    ...commit,
    ops: commitOps,
    prevData,
  }
}

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.putRecord({
    handler: async ({ input, req, res }) => {
      const { repo, collection, rkey, record, validate, swapCommit, swapRecord } = input.body
      const did = 'did:plc:ufa7rl6agtfdqje6bant3wsb'
      const storage = new SqlRepoTransactor(ctx.db, did)
      await ctx.accountManager.createOrGetAccount(storage)

      const uri = AtUri.make(did, collection, rkey)
      const swapCommitCid = swapCommit ? CID.parse(swapCommit) : undefined
      const swapRecordCid = typeof swapRecord === 'string' ? CID.parse(swapRecord) : swapRecord

      const { commit, write } = await (async () => {
        const current = await getRecord(ctx.db, uri, null, true)
        const isUpdate = current !== null

        const writeInfo = {
          did,
          collection,
          rkey,
          record,
          swapCid: swapRecordCid,
          validate,
        }

        let write: PreparedCreate | PreparedUpdate
        try {
          write = isUpdate ? await prepareUpdate(writeInfo) : await prepareCreate(writeInfo)
        } catch (err) {
          if (err instanceof InvalidRecordError) {
            throw new InvalidRequestError(err.message)
          }
          throw err
        }

        // no-op
        if (current && current.cid === write.cid.toString()) {
          return {
            commit: null,
            write,
          }
        }

        const commit = await processWrites([write], did, ctx, swapCommitCid).catch(
          (err: BadCommitSwapError | BadRecordSwapError) => {
            if (err instanceof BadCommitSwapError || err instanceof BadRecordSwapError) {
              throw new InvalidRequestError(err.message, 'InvalidSwap')
            } else {
              throw err
            }
          },
        )

        // await ctx.sequencer.sequenceCommit(did, commit)

        return { commit, write }
      })()

      if (commit !== null) {
        await storage.updateRoot(commit.cid, commit.rev).catch((err: any) => {
          ctx.logger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root')
        })
      }

      return {
        encoding: 'application/json',
        body: {
          uri: write.uri.toString(),
          cid: write.cid.toString(),
          commit: commit
            ? {
                cid: commit.cid.toString(),
                rev: commit.rev,
              }
            : undefined,
          validationStatus: write.validationStatus,
        },
      }
    },
  })
}
