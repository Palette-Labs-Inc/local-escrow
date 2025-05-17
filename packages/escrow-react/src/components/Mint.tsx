import { parseEther } from 'viem'
import { exp1Address, exp1Config } from '@local-escrow/contracts'
import { useAccount, useSendCalls, useWaitForCallsStatus, type BaseError } from 'wagmi'
import { Button as AriakitButton } from '@ariakit/react'

export function Mint() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForCallsStatus({ id: data?.id })

  if (!address) return null

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Mint EXP</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendCalls({
            calls: [
              {
                ...exp1Config,
                args: [address, parseEther('100')],
                functionName: 'mint',
                to: exp1Address,
              },
            ],
          })
        }}
        className="space-y-4"
      >
        <AriakitButton
          disabled={isPending}
          type="submit"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50"
        >
          {isPending ? 'Confirming...' : 'Mint 100 EXP'}
        </AriakitButton>

        {data?.id && (
          <div className="text-sm">
            <span className="text-gray-600">Transaction Hash: </span>
            <span className="font-mono">{data.id}</span>
          </div>
        )}

        {isConfirming && (
          <div className="text-sm text-blue-600">Waiting for confirmation...</div>
        )}

        {isConfirmed && (
          <div className="text-sm text-green-600">Transaction confirmed.</div>
        )}

        {error && (
          <div className="text-sm text-red-600">
            Error: {(error as BaseError).shortMessage || error.message}
          </div>
        )}
      </form>
    </section>
  )
} 