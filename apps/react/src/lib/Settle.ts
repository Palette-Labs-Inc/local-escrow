import { useEffect } from 'react'
import { parseEther, encodeFunctionData } from 'viem'
import { useFormStore } from '@ariakit/react'
import { Value } from 'ox'
import { useAccount } from 'wagmi'
import type { Address } from 'ox'

import { useExpBalance } from './Balance.ts'
import { exp1Abi, exp1Address } from '../../../../packages/contracts/src/contracts.ts'
import SimpleEscrow from '../../../../packages/contracts/src/SimpleEscrow.ts'
import { useEscrowAction } from '@local-escrow/react'

// ---------------------------------------------------------------------------
// useForm
// ---------------------------------------------------------------------------
export function useForm() {
  const { address: currentUser } = useAccount()
  const { raw: balanceRaw } = useExpBalance(currentUser)

  const form = useFormStore({ defaultValues: { amount: '' } })
  const amountInput = (form.useValue as unknown as (name: string) => string)('amount')
  const amountWei = amountInput ? parseEther(amountInput) : 0n

  const isAmountInvalid = !amountInput || amountWei === 0n || balanceRaw < amountWei

  useEffect(() => {
    if (amountInput || balanceRaw === 0n) return
    const tenWei = parseEther('10')
    const defaultAmt = balanceRaw >= tenWei ? '10' : Value.formatEther(balanceRaw)
    form.setValue('amount', defaultAmt)
  }, [balanceRaw, amountInput, form])

  return { form, amountInput, amountWei, isAmountInvalid } as const
}

// ---------------------------------------------------------------------------
// useAction (generic wrapper)
// ---------------------------------------------------------------------------

export interface UseActionParameters {
  escrowAddress: Address.Address
  amountWei: bigint
  isAmountInvalid: boolean
  onSuccess: () => void
}

export function useAction({ escrowAddress, amountWei, isAmountInvalid, onSuccess }: UseActionParameters) {
  return useEscrowAction({
    onSuccess,
    buildCalls: () => {
      if (isAmountInvalid) return []
      const transferData = encodeFunctionData({
        abi: exp1Abi,
        functionName: 'transfer',
        args: [escrowAddress, amountWei] as const,
      })
      const settleData = encodeFunctionData({
        abi: SimpleEscrow.abi,
        functionName: 'settle',
        args: [exp1Address, amountWei] as const,
      })
      return [
        { to: exp1Address, data: transferData },
        { to: escrowAddress, data: settleData },
      ]
    },
  })
} 