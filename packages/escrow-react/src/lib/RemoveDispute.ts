import type { Address } from 'ox'
import { useEscrowAction } from '@local-escrow/react'
import { encodeFunctionData } from 'viem'
import { SimpleEscrow } from '@local-escrow/contracts-abi'

export type UseActionParameters = {
  escrowAddress: Address.Address
  onSuccess: () => void
}

export type UseActionReturn = ReturnType<typeof useEscrowAction>

export function useAction({ escrowAddress, onSuccess }: UseActionParameters): UseActionReturn {
  return useEscrowAction({
    onSuccess,
    buildCalls: () => [
      {
        to: escrowAddress,
        data: encodeFunctionData({ abi: SimpleEscrow.abi, functionName: 'removeDispute' }),
      },
    ],
  })
}
