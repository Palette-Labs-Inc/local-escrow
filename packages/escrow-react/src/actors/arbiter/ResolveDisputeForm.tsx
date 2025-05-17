import {
  Form as AriakitForm,
  FormInput as AriakitFormInput,
  Button as AriakitButton,
  useFormStore,
} from '@ariakit/react'
import { parseEther } from 'viem'
import type { Address } from 'ox'

import * as ResolveDispute from '../../lib/ResolveDispute.js'

const buttonClassName =
  'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50'

const buttonVariantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
}

function useResolveForm() {
  const form = useFormStore({ defaultValues: { amount: '1' } })
  const amountInput = (form.useValue as unknown as (name: string) => string)('amount')
  const amountWei = amountInput ? parseEther(amountInput) : 0n
  const isAmountInvalid = !amountInput || amountWei === 0n
  return { form, amountWei, isAmountInvalid } as const
}

export function ResolveDisputeForm({ escrowAddress, onSuccess }: ResolveDisputeForm.Props) {
  const { form, amountWei, isAmountInvalid } = useResolveForm()
  const approveAction = ResolveDispute.useAction({ escrowAddress, onSuccess, shouldSettle: true, amount: amountWei })
  const rejectAction = ResolveDispute.useAction({ escrowAddress, onSuccess, shouldSettle: false, amount: amountWei })

  const amountField = String(form.names.amount as unknown as string)

  return (
    <AriakitForm
      store={form}
      aria-label="Resolve Dispute"
      className="mt-3 grid gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="text-sm" htmlFor={amountField}>
        Amount to transfer
        <AriakitFormInput
          name={form.names.amount as unknown as string}
          id={amountField}
          placeholder="0.0"
          type="number"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </label>

      <div className="flex gap-2 mt-2">
        <AriakitButton
          className={`${buttonClassName} ${buttonVariantClasses.primary}`}
          disabled={approveAction.isPending || isAmountInvalid}
          onClick={approveAction.handle}
          type="button"
        >
          Approve Escrow
        </AriakitButton>

        <AriakitButton
          className={`${buttonClassName} ${buttonVariantClasses.danger}`}
          disabled={rejectAction.isPending || isAmountInvalid}
          onClick={rejectAction.handle}
          type="button"
        >
          Reject & Refund
        </AriakitButton>
      </div>

      {isAmountInvalid && <small className="text-red-600">Enter a valid amount</small>}
      {approveAction.isPending && <small>Processing approval...</small>}
      {rejectAction.isPending && <small>Processing rejection...</small>}
    </AriakitForm>
  )
}

export namespace ResolveDisputeForm {
  export interface Props {
    escrowAddress: Address.Address
    onSuccess: () => void
  }
} 