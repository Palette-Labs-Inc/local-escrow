import { useMemo } from 'react'
import { useReadContracts, type UseReadContractsReturnType } from 'wagmi'
import type { Address } from 'ox'
import SimpleEscrow from '../contracts/SimpleEscrow.ts'
import type { EscrowInfo } from '@local-escrow/core'

export interface UseEscrowDataParameters {
  escrowAddress: Address.Address
}

export function useEscrowData({ escrowAddress }: UseEscrowDataParameters) {
  const contracts = useMemo(
    () => [
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'payer' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'isSettled' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'isDisputed' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'settleTime' },
    ] as const,
    [escrowAddress],
  )

  const result: UseReadContractsReturnType<typeof contracts> = useReadContracts({
    allowFailure: true,
    contracts,
  })

  const info = useMemo<EscrowInfo | undefined>(() => {
    if (!result.data || result.isLoading || result.isError) return undefined
    const [payerRes, settledRes, disputedRes, settleTimeRes] = result.data.map(
      (d) => (d as { result: unknown }).result,
    ) as [Address.Address, boolean, boolean, bigint]
    return { payer: payerRes, settled: settledRes, disputed: disputedRes, settleTime: settleTimeRes }
  }, [result.data, result.isLoading, result.isError])

  return {
    info,
    isLoading: result.isLoading,
    isError: result.isError,
    refetch: result.refetch,
  } as const
} 