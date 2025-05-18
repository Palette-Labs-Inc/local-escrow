import type { Hex } from 'ox'
import { truncateHexString } from '../utils.js'

export interface TransactionBadgeProps {
  transactionHash: Hex.Hex
  length?: number
}

export function TransactionBadge({ transactionHash, length = 6 }: TransactionBadgeProps) {
  const truncated = truncateHexString({ address: transactionHash, length })
  return (
    <a
      href={`https://sepolia.basescan.org/tx/${transactionHash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700"
    >
      {truncated}
    </a>
  )
}