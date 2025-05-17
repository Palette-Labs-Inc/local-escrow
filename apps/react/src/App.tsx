import { Hooks } from 'porto/wagmi'
import { parseEther } from 'viem'
import {
  type BaseError,
  useAccount,
  useConnectors,
  useSendCalls,
  useWaitForCallsStatus,
} from 'wagmi'
import {
  Button as AriakitButton,
} from "@ariakit/react"
import { exp1Address, exp1Config } from './contracts/contracts'
import * as Balance from './lib/Balance'
import { permissions } from './constants'
import { truncateHexString } from './utils'

export function App() {
  const { isConnected } = useAccount()
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <Account />
      {isConnected ? (
        <div className="space-y-8">
          <AccountBalance />
          <Mint />
        </div>
      ) : (
        <Connect />
      )}
    </div>
  )
}

function Account() {
  const account = useAccount()
  const disconnect = Hooks.useDisconnect()

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Account</h2>

      <div className="space-y-2 text-sm mb-4">
        <div>
          <span className="text-gray-600">Account: </span>
          <span className="font-mono">{truncateHexString({ address: account.address, length: 10 })}</span>
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

function Connect() {
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
					connect.mutate({ 
						connector, 
						grantPermissions: permissions(),
					})
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

function AccountBalance() {
  const { formatted } = Balance.useExpBalance()

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Balance</h2>
      <div className="text-lg">
        <span className="text-gray-600">Balance: </span>
        <span className="font-semibold">{formatted} EXP</span>
      </div>
    </section>
  )
}

function Mint() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForCallsStatus({
      id: data?.id,
    })

  if (!address) return null;
  
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
