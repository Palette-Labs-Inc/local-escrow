import { Hooks } from 'porto/wagmi'
import { useAccount } from 'wagmi'
import { truncateHexString } from '../utils'
import { Button as AriakitButton } from '@ariakit/react'

export function Account() {
  const account = useAccount()
  const disconnect = Hooks.useDisconnect()

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Account</h2>

      <div className="space-y-2 text-sm mb-4">
        <div>
          <span className="text-gray-600">Account: </span>
          <span className="font-mono">
            {truncateHexString({ address: account.address, length: 10 })}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Chain ID: </span>
          <span className="font-mono">{account.chainId}</span>
        </div>
        <div>
          <span className="text-gray-600">Status: </span>
          <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700">
            {account.status}
          </span>
        </div>
      </div>

      {account.status !== 'disconnected' && (
        <AriakitButton
          onClick={() => disconnect.mutate({})}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Disconnect
        </AriakitButton>
      )}
    </section>
  )
} 