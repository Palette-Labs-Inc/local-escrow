import type { pino } from 'pino'
import { Database } from './db'
import type { PublicClient } from 'viem'

export type AppContext = {
  db: Database
  logger: pino.Logger
  client: PublicClient
}
