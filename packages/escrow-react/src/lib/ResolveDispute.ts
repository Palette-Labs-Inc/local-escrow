import type { Address } from 'ox'
import { exp1Address, SimpleEscrow } from '@local-escrow/contracts'
import { useEscrowAction } from '@local-escrow/react'
import { encodeFunctionData } from 'viem'

export type UseActionParameters = {
  escrowAddress: Address.Address
  onSuccess: () => void
  shouldSettle: boolean
  amount: bigint
}

export type UseActionReturn = ReturnType<typeof useEscrowAction>

export function useAction({ escrowAddress, onSuccess, shouldSettle, amount }: UseActionParameters): UseActionReturn {
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