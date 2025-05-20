import { encodeFunctionData } from 'viem'
import { useAccount, useSendCalls, useCallsStatus, type BaseError } from 'wagmi'
import {
  Form as AriakitForm,
  FormInput as AriakitFormInput,
  Button as AriakitButton,
  useFormStore,
} from '@ariakit/react'
import { EscrowFactory, escrowFactoryAddress, exp1Address } from '@local-escrow/contracts-abi'
import * as EscrowEvents from '#/lib/EscrowEvents'
import { TransactionBadge, AddressBadge } from '@local-escrow/react'
import { type Hex, Address } from 'ox'
import * as Router from '#/lib/Router'
import { useState, useEffect } from 'react'

const buttonClassName =
  'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50'

function useCreateEscrowForm() {
  const form = useFormStore({
    defaultValues: { payee: '', arbiter: '' },
  })

  const payee = (form.useValue as unknown as (name: string) => string)('payee')
  const arbiter = (form.useValue as unknown as (name: string) => string)('arbiter')

  const areAddressesValid = [payee, arbiter].every((address) => Address.validate(address))
  return { form, payee, arbiter, areAddressesValid } as const
}

export function CreateEscrow() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls()
  const [isWaitingForEvent, setIsWaitingForEvent] = useState(false)

  const { isLoading, isSuccess } = useCallsStatus({
    id: data?.id as string,
    query: {
      enabled: !!data,
    },
  })

  // Reset isWaitingForEvent when an error occurs
  useEffect(() => {
    if (error) {
      setIsWaitingForEvent(false)
    }
  }, [error])

  const isCreatingEscrow = isPending || isWaitingForEvent

  const { form, payee, arbiter, areAddressesValid } = useCreateEscrowForm()

  EscrowEvents.useWatchEscrowEvents({
    onEvent: (eventInfo) => {
      setIsWaitingForEvent(false)
      Router.router.navigate({
        to: '/escrow/$escrowAddress',
        params: { escrowAddress: eventInfo.escrowAddress },
      })
    },
  })

  if (!address) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!areAddressesValid) return
    const dayFromNow = Math.floor(Date.now() / 1000) + 60 * 60 * 24
    setIsWaitingForEvent(true)
    sendCalls({
      calls: [
        {
          data: encodeFunctionData({
            abi: EscrowFactory.abi,
            functionName: 'createEscrow',
            args: [payee as Address.Address, arbiter as Address.Address, BigInt(dayFromNow)],
          }),
          to: escrowFactoryAddress as `0x${string}`,
        },
      ],
    })
  }

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Place Order</h2>

      <AriakitForm store={form} aria-label="Create Escrow" className="space-y-4" onSubmit={handleSubmit}>
        <div className="block text-sm">
          Buyer Address
          <div className="mt-1">
            <AddressBadge address={address as Address.Address} />
          </div>
        </div>

        <label className="block text-sm" htmlFor={String(form.names.payee)}>
          Payee Address
          <AriakitFormInput
            name={form.names.payee as unknown as string}
            id={String(form.names.payee)}
            placeholder="0x..."
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </label>

        <label className="block text-sm" htmlFor={String(form.names.arbiter)}>
          Arbiter Address
          <AriakitFormInput
            name={form.names.arbiter as unknown as string}
            id={String(form.names.arbiter)}
            placeholder="0x..."
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </label>

        <AriakitButton disabled={isCreatingEscrow || !areAddressesValid} className={buttonClassName} type="submit">
          {isCreatingEscrow ? 'Creating Escrow...' : 'Place Order'}
        </AriakitButton>

        {!areAddressesValid && <div className="text-sm text-red-600">Enter valid Ethereum addresses</div>}

        {data?.id && (
          <div className="text-sm">
            <span className="text-gray-600">Transaction Hash: </span>
            <TransactionBadge transactionHash={data.id as Hex.Hex} />
          </div>
        )}

        {isLoading && <div className="text-sm text-blue-600">Waiting for confirmation...</div>}
        {isWaitingForEvent && isSuccess && <div className="text-sm text-blue-600">Waiting for escrow creation...</div>}
        {error && (
          <div className="text-sm text-red-600">Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </AriakitForm>
    </section>
  )
}
