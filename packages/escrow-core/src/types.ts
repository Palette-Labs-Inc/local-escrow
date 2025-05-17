import type { Address } from 'ox'

export type EscrowStatus = 'settled' | 'disputed' | 'expired' | 'pending'
export type UserRole = 'payer' | 'payee' | 'arbiter' | 'other'

export type EscrowAction =
  | 'dispute'
  | 'removeDispute'
  | 'settle'
  | 'refund'
  | 'resolveDispute'

export interface EscrowInfo {
  payer: Address.Address
  payee: Address.Address
  arbiter: Address.Address
  settled: boolean
  disputed: boolean
  settleTime: bigint
} 