import { exp1Address, exp1Config } from './contracts/contracts.ts'
import { useAccount, useReadContract } from 'wagmi'
import { Value } from 'ox'

export function useBalance() {
  const { address } = useAccount()

  const { data: balance } = useReadContract({
    abi: exp1Config.abi,
    functionName: 'balanceOf',
    address: exp1Address,
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 2_000,
    },
  })

  const raw = balance ?? 0n
  const formatted = `${Value.formatEther(raw)} EXP`

  return { raw, formatted }
}