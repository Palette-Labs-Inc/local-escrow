import type { Address } from 'ox'
import SimpleEscrow from '../contracts/SimpleEscrow.ts'
import { useEscrowAction } from '../hooks/useEscrowAction.ts'
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
      data: encodeFunctionData({ abi: SimpleEscrow.abi, functionName: 'removeDispute' }),
    }],
  })
} 