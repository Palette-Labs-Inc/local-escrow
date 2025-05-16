import { exp1Address, exp1Config } from './contracts/contracts.ts'
import { useAccount, useReadContract } from 'wagmi'
import { Value } from 'ox'

export function useBalance() {
  const { address } = useAccount()

  if (!address) {
    return '0 EXP'
  }

  const { data: balance } = useReadContract({
    args: [address],
    abi: exp1Config.abi,
    functionName: 'balanceOf',
    address: exp1Address,
    query: { enabled: !!address, refetchInterval: 2_000 },
  })

  return `${Value.formatEther(balance ?? 0n)} EXP`
}