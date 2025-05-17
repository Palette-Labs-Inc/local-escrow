import type { Address } from 'ox'
import { SimpleEscrow } from '@local-escrow/contracts'
import { useEscrowAction } from '@local-escrow/react'
import { encodeFunctionData } from 'viem'

export interface UseActionParameters {
  escrowAddress: Address.Address
  onSuccess: () => void
}

export function useAction({ escrowAddress, onSuccess }: UseActionParameters) {
  return useEscrowAction({
    onSuccess,
    buildCalls: () => [{
      to: escrowAddress,
      data: encodeFunctionData({ abi: SimpleEscrow.abi, functionName: 'dispute' }),
    }],
  })
} 