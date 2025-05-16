import { exp1Address, exp1Config } from './contracts/contracts.ts'
import { useAccount, useReadContract } from 'wagmi'
import { type Address, type Hex, Value } from 'ox'

export function useBalance() {
  const { address } = useAccount()

  const { data: balance } = useReadContract({
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    args: [address!],
    abi: exp1Config.abi,
    functionName: 'balanceOf',
    address: exp1Address,
    query: { enabled: !!address, refetchInterval: 2_000 },
  })

  return `${Value.formatEther(balance ?? 0n)} EXP`
}

export interface DebugData {
  transactions: Array<{
    id: number
    role: 'session' | 'admin'
    created_at: string
    address: Address.Address
    hash: Address.Address
    public_key: Hex.Hex
  }>
  key: {
    account: Address.Address
    privateKey: Address.Address
  }
  schedules: Array<{
    id: number
    created_at: string
    address: Address.Address
    schedule: string
    action: string
    calls: string
  }>
}
