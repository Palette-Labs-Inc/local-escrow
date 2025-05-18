import { useEffect, useCallback } from 'react'
import { useSendCalls, useCallsStatus } from 'wagmi'
import type { Address, Hex } from 'ox'

export interface ContractCall {
  to: Address.Address
  data: Hex.Hex
}

export interface UseEscrowActionParameters {
  buildCalls: () => ContractCall[]
  onSuccess: () => void
}

export interface UseEscrowActionResult {
  isPending: boolean
  error: unknown
  statusData: unknown
  handle: () => void
}

export function useEscrowAction({ buildCalls, onSuccess }: UseEscrowActionParameters): UseEscrowActionResult {
  const { sendCalls, isPending, error, data: txId } = useSendCalls()

  const { data: statusData } = useCallsStatus({
    id: txId?.id as string,
    query: {
      enabled: !!txId?.id,
      refetchInterval: (query) => (query.state.data?.status === 'success' ? false : 1000),
    },
  })

  useEffect(() => {
    if (statusData?.status === 'success') onSuccess()
  }, [statusData, onSuccess])

  const handle = useCallback(() => {
    if (isPending) return
    const calls = buildCalls()
    sendCalls({ calls })
  }, [isPending, buildCalls, sendCalls])

  return { isPending, error, statusData, handle }
}