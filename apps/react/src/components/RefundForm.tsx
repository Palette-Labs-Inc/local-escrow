import {
  Form as AriakitForm,
  FormInput as AriakitFormInput,
  FormSubmit as AriakitFormSubmit,
  Button as AriakitButton,
  useFormStore
} from '@ariakit/react'
import { parseEther } from 'viem'
import type { Address } from 'ox'

import * as Refund from '../lib/Refund.ts'

const buttonClassName =
  'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50'

const buttonVariantClasses = {
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
}

export interface RefundFormProps {
  escrowAddress: Address.Address
  onSuccess: () => void
}

function useForm() {
  const form = useFormStore({ defaultValues: { amount: '1' } })
  const amountInput = (form.useValue as unknown as (name: string) => string)('amount')
  const amountWei = amountInput ? parseEther(amountInput) : 0n

  const isAmountInvalid = !amountInput || amountWei === 0n

  return { form, amountInput, amountWei, isAmountInvalid } as const
}

export function RefundForm({ escrowAddress, onSuccess }: RefundFormProps) {
  const { form, amountWei, isAmountInvalid } = useForm()
  
  const refundAction = Refund.useAction({
    escrowAddress,
    onSuccess,
    amount: amountWei,
  })

  const amountField = String(form.names.amount as unknown as string)

  return (
    <AriakitForm
      store={form}
      aria-label="Refund Escrow"
      className="mt-3 grid gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (!isAmountInvalid) {
          refundAction.handle()
        }
      }}
    >
      <label className="text-sm" htmlFor={amountField}>
        Amount to refund
        <AriakitFormInput
          name={form.names.amount as unknown as string}
          id={amountField}
          placeholder="0.0"
          type="number"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </label>

      <div className="flex items-end">
        <AriakitButton
          className={`${buttonClassName} ${buttonVariantClasses.secondary}`}
          disabled={refundAction.isPending || isAmountInvalid}
          onClick={refundAction.handle}
          type="button"
        >
          Refund
        </AriakitButton>
      </div>

      {isAmountInvalid && (
        <small className="text-red-600">Enter a valid amount</small>
      )}
      
      {refundAction.isPending && <small>Processing refund...</small>}
    </AriakitForm>
  )
} 