import { useEffect } from 'react'
import { parseEther } from 'viem'
import { useFormStore } from '@ariakit/react'
import { Value } from 'ox'
import { useAccount, useCallsStatus, useSendCalls } from 'wagmi'
import type { Address } from 'ox'

import { useExpBalance } from './Balance.ts'
import { exp1Abi, exp1Address } from '../contracts/contracts.ts'
import SimpleEscrow from '../contracts/SimpleEscrow.ts'

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
// useAction
// ---------------------------------------------------------------------------
export interface UseActionParameters {
  escrowAddress: Address.Address
  amountWei: bigint
  isAmountInvalid: boolean
  onSuccess: () => void
}

export function useAction({ escrowAddress, amountWei, isAmountInvalid, onSuccess }: UseActionParameters) {
  const { error, isPending, sendCalls, data: txId } = useSendCalls()
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
    if (isPending || isAmountInvalid) return
    sendCalls({
      calls: [
        {
          to: exp1Address,
          abi: exp1Abi,
          functionName: 'transfer',
          args: [escrowAddress, amountWei],
        },
        {
          to: escrowAddress,
          abi: SimpleEscrow.abi,
          functionName: 'settle',
          args: [exp1Address, amountWei],
        },
      ],
    })
  }

  return { error, isPending, statusData, handle } as const
} 