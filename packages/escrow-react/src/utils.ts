import type { Address } from 'ox'
import { zeroAddress } from 'viem';

export function truncateHexString({
  address,
  length = 6,
}: {
  address?: Address.Address
  length?: number
}) {
  if (!address) return zeroAddress;
  return length > 0
    ? `${address.slice(0, length)}...${address.slice(-length)}`
    : address;
}
