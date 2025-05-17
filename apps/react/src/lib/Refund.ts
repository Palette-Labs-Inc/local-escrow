import type { Address } from 'ox'
import SimpleEscrow from '../../../../packages/contracts/src/SimpleEscrow.ts'
import { exp1Address } from '../../../../packages/contracts/src/contracts.ts'
import { useEscrowAction } from '@local-escrow/react'
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