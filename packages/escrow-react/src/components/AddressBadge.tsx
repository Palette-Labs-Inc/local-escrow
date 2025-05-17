import type { Address } from 'ox'
import { truncateHexString } from '../utils.js'

export interface AddressBadgeProps {
  address: Address.Address
  length?: number
}

export function AddressBadge({ address, length = 6 }: AddressBadgeProps) {
  const truncated = truncateHexString({ address, length })
  return (
    <a
      href={`https://sepolia.basescan.org/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700"
    >
      {truncated}
    </a>
  )
} 