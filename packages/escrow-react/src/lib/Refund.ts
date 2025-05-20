import type { Address } from 'ox'

import { useEscrowAction } from '@local-escrow/react'
import { encodeFunctionData } from 'viem'
import { exp1Address, SimpleEscrow } from '@local-escrow/contracts-abi'

export interface UseActionParameters {
  escrowAddress: Address.Address
  onSuccess: () => void
  amount: bigint
}

export type UseActionReturn = ReturnType<typeof useEscrowAction>

export function useAction({ escrowAddress, onSuccess, amount }: UseActionParameters): UseActionReturn {
  return useEscrowAction({
    onSuccess,
    buildCalls: () => [
      {
        to: escrowAddress,
        data: encodeFunctionData({
          abi: SimpleEscrow.abi,
          functionName: 'refund',
          args: [exp1Address, amount],
        }),
      },
    ],
  })
}
