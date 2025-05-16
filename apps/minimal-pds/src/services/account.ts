import { Database } from '#/db'
import { DatabaseSchema, PreparedCreate, PreparedWrite } from '#/types'
import * as crypto from '@atproto/crypto'
import * as uint8arrays from 'uint8arrays'
import { SqlRepoTransactor } from './storage'
import { formatDataKey, Repo } from '@atproto/repo'

export class AccountManager {
  readonly db: Database<DatabaseSchema>

  constructor(db: Database<DatabaseSchema>) {
    this.db = db
  }

  // Returns a mock account
  async createOrGetAccount(storage: SqlRepoTransactor): Promise<crypto.Keypair> {
    const did = 'did:plc:ufa7rl6agtfdqje6bant3wsb'
    const base64PrivateKey = 'DnksijpIIN+hxqVO1XIpYg/8CpQT1Rh7MBNIVQBlNQk='
    const key = await crypto.Secp256k1Keypair.import(uint8arrays.fromString(base64PrivateKey, 'base64pad'))

    const account = await this.db.db.selectFrom('did_account').where('did', '=', did).selectAll().executeTakeFirst()

    if (!account) {
      await this.db.db.insertInto('did_account').values({ did, privateKey: base64PrivateKey }).execute()

      // Lifted from createRepo in packages/pds/src/actor-store/repo/transactor.ts. For a new empty repo writes a [].
      const commit = await Repo.formatInitCommit(storage, did, key, [])
      await Promise.all([
        storage.applyCommit(commit, true),
        // this.indexWrites(writes, commit.rev),
        // this.blob.processWriteBlobs(commit.rev, writes),
      ])
    }
    return key
  }
}
