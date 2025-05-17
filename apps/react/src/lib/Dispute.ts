import { useEffect } from 'react'
import { useCallsStatus, useSendCalls } from 'wagmi'
import type { Address } from 'ox'

import SimpleEscrow from '../contracts/SimpleEscrow.ts'

export interface UseActionParameters {
  escrowAddress: Address.Address
  onSuccess: () => void
}

export function useAction({ escrowAddress, onSuccess }: UseActionParameters) {
  const { isPending, sendCalls, data: txId } = useSendCalls()
  const { data: statusData } = useCallsStatus({
    id: txId?.id as string,
    query: {
      enabled: !!txId?.id,
      refetchInterval: (query) => (query.state.data?.status === 'success' ? false : 1_000),
    },
  })

  useEffect(() => {
    if (statusData?.status === 'success') onSuccess()
  }, [statusData, onSuccess])

  function handle() {
    sendCalls({ calls: [{ to: escrowAddress, abi: SimpleEscrow.abi, functionName: 'dispute' }] })
  }

  return {
    isPending,
    handle,
  } as const
} 