import type { pino } from 'pino'
import { Database } from './db'
import { DatabaseSchema } from './types'
import { AccountManager } from './services/account'

export type AppContext = {
  logger: pino.Logger
  db: Database<DatabaseSchema>
  accountManager: AccountManager
}
