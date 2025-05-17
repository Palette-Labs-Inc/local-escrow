import {
  Form as AriakitForm,
  FormInput as AriakitFormInput,
  FormSubmit as AriakitFormSubmit,
} from '@ariakit/react'
import type { Address } from 'ox'

import * as Settle from '../lib/Settle.ts'

const buttonClassName =
  'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50'

export interface SettleEscrowFormProps {
  escrowAddress: Address.Address
  onSuccess: () => void
}

export function SettleEscrowForm({ escrowAddress, onSuccess }: SettleEscrowFormProps) {
  const { form, amountWei, isAmountInvalid } = Settle.useForm()
  const { error, isPending, statusData, handle } = Settle.useAction({
    escrowAddress,
    amountWei,
    isAmountInvalid,
    onSuccess,
  })

  // Ensure name/id typed correctly
  const amountField = String(form.names.amount as unknown as string)

  return (
    <AriakitForm
      store={form}
      aria-label="Settle escrow"
      className="mt-3 grid gap-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
      onSubmit={handle}
    >
      <label className="text-sm" htmlFor={amountField}>
        Amount in EXP
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
        <AriakitFormSubmit
          className={buttonClassName}
          disabled={isPending || isAmountInvalid}
        >
          Settle
        </AriakitFormSubmit>
      </div>

      {isAmountInvalid && (
        <small className="text-red-600">Enter a valid amount ≤ balance</small>
      )}
      {error && <div className="text-red-600">{error.message}</div>}
      {(statusData as { status?: string } | undefined)?.status && (
        <small>Tx status: {(statusData as { status?: string }).status}</small>
      )}
    </AriakitForm>
  )
} 