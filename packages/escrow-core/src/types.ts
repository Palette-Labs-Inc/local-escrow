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

export interface EscrowEvent {
  /** Address of the freshly created escrow */
  escrowAddress: Address.Address
  /** Optional transaction hash of the creation tx */
  transactionHash?: `0x${string}`
  /** Optional block number where the event was emitted */
  blockNumber?: bigint
} 