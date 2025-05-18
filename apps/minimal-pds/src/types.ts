import { CID } from 'multiformats/cid'
import { AtUri } from '@atproto/uri'
import { CommitData, WriteOpAction } from '@atproto/repo'
import { RepoRecord } from '@atproto/lexicon'

import { GeneratedAlways } from 'kysely'

type ValidationStatus = 'valid' | 'unknown'

export class InvalidRecordError extends Error {}

export class BadCommitSwapError extends Error {
  constructor(public cid: CID) {
    super(`Commit was at ${cid.toString()}`)
  }
}

export class BadRecordSwapError extends Error {
  constructor(public cid: CID | null) {
    super(`Record was at ${cid?.toString() ?? 'null'}`)
  }
}

export type PreparedCreate = {
  action: WriteOpAction.Create
  uri: AtUri
  cid: CID
  swapCid?: CID | null
  record: RepoRecord
  blobs: []
  validationStatus: ValidationStatus
}

export type PreparedUpdate = {
  action: WriteOpAction.Update
  uri: AtUri
  cid: CID
  swapCid?: CID | null
  record: RepoRecord
  blobs: []
  validationStatus: ValidationStatus
}

export type PreparedDelete = {
  action: WriteOpAction.Delete
  uri: AtUri
  swapCid?: CID | null
}

export type PreparedWrite = PreparedCreate | PreparedUpdate | PreparedDelete

export interface Signer {
  jwtAlg: string
  sign(msg: Uint8Array): Promise<Uint8Array>
}

export interface Didable {
  did(): string
}

export interface Keypair extends Signer, Didable {}

export type CommitOp = {
  action: 'create' | 'update' | 'delete'
  path: string
  cid: CID | null
  prev?: CID
}

export type CommitDataWithOps = CommitData & {
  ops: CommitOp[]
  prevData: CID | null
}

export type CarBlock = {
  cid: CID
  bytes: Uint8Array
}

// DB
export interface DidAccount {
  did: string
  privateKey: string
}

export interface AccountPref {
  id: GeneratedAlways<number>
  name: string
  valueJson: string // json
}

export interface RepoRoot {
  did: string
  cid: string
  rev: string
  indexedAt: string
}

export interface DbRecord {
  uri: string
  cid: string
  collection: string
  rkey: string
  repoRev: string
  indexedAt: string
  takedownRef: string | null
}

export interface Backlink {
  uri: string
  path: string
  linkTo: string
}

export interface RepoBlock {
  cid: string
  repoRev: string
  size: number
  content: Uint8Array
}

export interface Blob {
  cid: string
  mimeType: string
  size: number
  tempKey: string | null
  width: number | null
  height: number | null
  createdAt: string
  takedownRef: string | null
}

export interface RecordBlob {
  blobCid: string
  recordUri: string
}

export type DatabaseSchema = {
  account_pref: AccountPref
  repo_root: RepoRoot
  record: DbRecord
  repo_block: RepoBlock
  blob: Blob
  record_blob: RecordBlob
  backlink: Backlink
  did_account: DidAccount
}
