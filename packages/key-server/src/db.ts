import { XyzNoshdeliveryV0MerchantGroup, XyzNoshdeliveryV0MerchantLocation } from '@nosh/lexicon'
import SqliteDb from 'better-sqlite3'
import {
  Kysely,
  Migration,
  MigrationProvider,
  Migrator,
  sql,
  SqliteDialect,
  // ParseJSONResultsPlugin
} from 'kysely'
import { P256, PublicKey } from 'ox'

export interface Keypair {
  address: string
  public_key: string
  private_key: string
  role: 'session' | 'admin'
  type: 'p256'
  expiry: number
}

export interface Escrow {
  address: string
  payer: string
  payee: string
  arbiter: string
}

export interface LastProcessedBlock {
  blockNumber: number
}

interface DatabaseSchema {
  keypairs: Keypair
  escrows: Escrow
  lastProcessedBlock: LastProcessedBlock
}

// Migrations

const migrations: Record<string, Migration> = {}

const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations
  },
}

migrations['001'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable('escrows')
      .ifNotExists()
      .addColumn('address', 'text', (col) => col.primaryKey().notNull())
      .addColumn('payer', 'text', (col) => col.notNull())
      .addColumn('payee', 'text', (col) => col.notNull())
      .addColumn('arbiter', 'text', (col) => col.notNull())
      .execute()

    await db.schema
      .createTable('keypairs')
      .ifNotExists()
      .addColumn('address', 'text', (col) => col.primaryKey().notNull())
      .addColumn('public_key', 'text', (col) => col.notNull())
      .addColumn('private_key', 'text', (col) => col.notNull())
      .addColumn('role', 'text', (col) => col.notNull())
      .addColumn('type', 'text', (col) => col.notNull())
      .addColumn('expiry', 'integer', (col) => col.notNull())
      .execute()

    await db.schema
      .createTable('lastProcessedBlock')
      .ifNotExists()
      .addColumn('blockNumber', 'integer', (col) => col.notNull())
      .execute()
  },
  async down(db: Kysely<unknown>) {},
}

// APIs

export const createDb = (location: string): Database => {
  return new Kysely<DatabaseSchema>({
    dialect: new SqliteDialect({
      database: new SqliteDb(location),
    }),
    // plugins: [new ParseJSONResultsPlugin()],
  })
}

export const migrateToLatest = async (db: Database) => {
  const migrator = new Migrator({ db, provider: migrationProvider })
  const { error } = await migrator.migrateToLatest()
  if (error) throw error
}

export type Database = Kysely<DatabaseSchema>

export async function getKeypair(db: Database, address: string) {
  const result = await db
    .selectFrom('keypairs')
    .where('address', '=', address.toLowerCase())
    .selectAll()
    .executeTakeFirst()
  if (!result) {
    console.error('No keypair found for address', address)
    return null
  }
  return result
}

type GeneratedKeyPair = Pick<Keypair, 'public_key' | 'role' | 'expiry' | 'type'>

export async function createKeypair(
  db: Database,
  address: string,
  expiry = Math.floor(Date.now() / 1_000) + 60 * 2, // 2 minutes by default
): Promise<GeneratedKeyPair | undefined> {
  const role = 'session'
  const privateKey = P256.randomPrivateKey()
  const publicKey = PublicKey.toHex(P256.getPublicKey({ privateKey }), {
    includePrefix: false,
  })

  /**
   * you can have a setup where an address can have multiple keys
   * we are just doing 1 per address in this demo for simplicity
   */

  try {
    await db.deleteFrom('keypairs').where('address', '=', address).execute()

    const result = await db
      .insertInto('keypairs')
      .values({
        address,
        public_key: publicKey,
        private_key: privateKey,
        role,
        type: 'p256',
        expiry,
      })
      .returningAll()
      .executeTakeFirst()

    if (!result) {
      return undefined
    }

    return {
      public_key: result.public_key,
      role: result.role,
      expiry: result.expiry,
      type: result.type,
    }
  } catch (error) {
    console.error('Error creating keypair:', error)
    return undefined
  }
}
