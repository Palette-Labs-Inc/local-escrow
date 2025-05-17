import type { Address } from 'ox'
import SimpleEscrow, { exp1Address } from '@local-escrow/contracts'
import { useEscrowAction } from '@local-escrow/react'
import { encodeFunctionData } from 'viem'

export interface UseActionParameters {
  escrowAddress: Address.Address
  onSuccess: () => void
  shouldSettle: boolean
  amount: bigint
}

export function useAction({ escrowAddress, onSuccess, shouldSettle, amount }: UseActionParameters) {
  return useEscrowAction({
    onSuccess,
    buildCalls: () => [{
      to: escrowAddress,
      data: encodeFunctionData({
        abi: SimpleEscrow.abi,
        functionName: 'resolveDispute',
        args: [shouldSettle, exp1Address, amount],
      }),
    }],
  })
} 