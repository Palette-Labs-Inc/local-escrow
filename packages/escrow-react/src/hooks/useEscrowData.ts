import { useMemo } from 'react'
import { useReadContracts } from 'wagmi'
import { Address } from 'ox'
import { SimpleEscrow } from '@local-escrow/contracts'
import type { EscrowInfo } from '@local-escrow/core'

export type UseEscrowDataParameters = {
  escrowAddress: Address.Address
}

export type EscrowDataResult = {
  info?: EscrowInfo
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export function useEscrowData({ escrowAddress }: UseEscrowDataParameters): EscrowDataResult {
  const contracts = useMemo(
    () => [
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'payer' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'payee' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'arbiter' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'isSettled' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'isDisputed' },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: 'settleTime' },
    ] as const,
    [escrowAddress],
  )

  const result = useReadContracts({
    allowFailure: false,
    contracts,
    scopeKey: escrowAddress,
    query: {
      enabled: Address.validate(escrowAddress),
      refetchInterval: 10_000,
      select: ([
        payer,
        payee,
        arbiter,
        settled,
        disputed,
        settleTime,
      ]) => ({
        payer,
        payee,
        arbiter,
        settled,
        disputed,
        settleTime,
      } as EscrowInfo),
    },
  })

  return {
    info: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    refetch: result.refetch,
  }
}