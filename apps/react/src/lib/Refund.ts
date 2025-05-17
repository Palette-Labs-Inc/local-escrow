import type { Address } from 'ox'
import SimpleEscrow from '../contracts/SimpleEscrow.ts'
import { exp1Address } from '../contracts/contracts.ts'
import { useEscrowAction } from '../hooks/useEscrowAction.ts'
import { encodeFunctionData } from 'viem'

export interface UseActionParameters {
  escrowAddress: Address.Address
  onSuccess: () => void
  amount: bigint
}

export function useAction({ escrowAddress, onSuccess, amount }: UseActionParameters) {
  return useEscrowAction({
    onSuccess,
    buildCalls: () => [{
      to: escrowAddress,
      data: encodeFunctionData({
        abi: SimpleEscrow.abi,
        functionName: 'refund',
        args: [exp1Address, amount],
      }),
    }],
  })
} 