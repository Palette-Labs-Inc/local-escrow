import { Hooks } from 'porto/wagmi'
import { useConnectors } from 'wagmi'
import { Button as AriakitButton } from '@ariakit/react'
import { permissions } from '../constants.js'

export function Connect() {
  const connectors = useConnectors()
  const connect = Hooks.useConnect()

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Connect</h2>
      <div className="space-y-4">
        {connectors
          .filter((x) => x.id === 'xyz.ithaca.porto')
          ?.map((connector) => (
            <div key={connector.uid}>
              <AriakitButton
                onClick={() => {
                  connect.mutate({ connector, grantPermissions: permissions() })
                }}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50"
              >
                Connect
              </AriakitButton>
            </div>
          ))}
        {connect.status && (
          <div className="text-sm text-gray-600">Status: {connect.status}</div>
        )}
        {connect.error && (
          <div className="text-sm text-red-600">{connect.error.message}</div>
        )}
      </div>
    </section>
  )
}