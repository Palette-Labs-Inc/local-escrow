import {
  useBalance,
} from './hooks.ts'
import { Hooks } from 'porto/wagmi'
import { wagmiConfig } from './config.ts'
import { exp1Address, exp1Config } from './contracts/contracts.ts'
import { useAccount, useConnectors } from 'wagmi'
import { truncateHexString } from './utilities.ts'
import { type Errors, Json } from 'ox'
import { permissions } from './constants.ts'
import { useEffect, useState } from 'react'
import { useCallsStatus, useSendCalls } from 'wagmi'
import { parseEther } from 'viem'

export function App() {
  // useNukeEverything()

  return (
    <main>
      <hr />
      <Connect />
      <hr />
      <GrantPermissions />
      <hr />
      <Mint />
    </main>
  )
}

function Connect() {
  const label = `_exp-0003-${Math.floor(Date.now() / 1_000)}`
  const [grantPermissions, setGrantPermissions] = useState<boolean>(true)

  const connectors = useConnectors()
  const connector = connectors.find((x) => x.id === 'xyz.ithaca.porto')

  const { address } = useAccount()
  const connect = Hooks.useConnect()
  const disconnect = Hooks.useDisconnect()
  const allPermissions_ = Hooks.usePermissions()
  const latestPermissions = allPermissions_.data?.at(-1)

  const disconnectFromAll = async () => {
    await Promise.all(connectors.map((c) => c.disconnect().catch(() => {})))
    await disconnect.mutateAsync({ connector })
  }

  return (
    <div>
      <div
        style={{
          gap: '10px',
          display: 'flex',
          marginBottom: '0px',
          alignItems: 'flex-end',
        }}
      >
        <h3 style={{ marginBottom: '0px' }}>[client] wallet_connect</h3>|
        <p style={{ marginBottom: '0px' }}>{connect.status}</p>
      </div>
      <p>
        <input
          type="checkbox"
          checked={grantPermissions}
          onChange={() => setGrantPermissions((x) => !x)}
        />
        Grant Permissions
      </p>

      {connector && (
        <div key={connector?.uid} style={{ display: 'flex', gap: '10px' }}>
          <button
            key={connector?.uid}
            disabled={connect.status === 'pending'}
            onClick={async () =>
              disconnectFromAll().then(() =>
                connect.mutateAsync({
                  connector,
                  grantPermissions: grantPermissions
                    ? permissions()
                    : undefined,
                }),
              )
            }
            type="button"
          >
            Login
          </button>
          <button
            disabled={connect.status === 'pending'}
            onClick={async () =>
              disconnectFromAll().then(() => {
                connect.mutate({
                  connector,
                  createAccount: { label },
                  grantPermissions: grantPermissions
                    ? permissions()
                    : undefined,
                })
              })
            }
            type="button"
          >
            Register
          </button>
          <button
            type="button"
            onClick={disconnectFromAll}
            disabled={
              connect.status === 'pending' ||
              disconnect.status === 'pending' ||
              !address
            }
          >
            Disconnect
          </button>
        </div>
      )}
      <p>{connect.error?.message}</p>
      {address && <p>Account: {address}</p>}

      {address && latestPermissions && (
        <details
          style={{ marginTop: '5px' }}
          key={latestPermissions.expiry + latestPermissions.id}
        >
          <summary>
            <span style={{ marginRight: '8px' }}>Permissions:</span>
            {truncateHexString({
              address: latestPermissions?.key.publicKey,
              length: 12,
            })}
          </summary>
          <pre>{Json.stringify(latestPermissions, undefined, 2)}</pre>
        </details>
      )}
    </div>
  )
}


function GrantPermissions() {
  const { address } = useAccount()
  const grantPermissions = Hooks.useGrantPermissions()
  return (
    <div>
      <h3>
        [client] Grant Permissions to Create Escrow (experimental_grantPermissions)
      </h3>
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          const key = permissions().key
          grantPermissions.mutate({
            key,
            expiry: permissions().expiry,
            address,
            permissions: permissions().permissions,
          })
        }}
      >
        <button
          type="submit"
          style={{ marginBottom: '5px' }}
          disabled={grantPermissions.status === 'pending'}
        >
          {grantPermissions.status === 'pending'
            ? 'Authorizing…'
            : 'Grant Permissions'}
        </button>
        {grantPermissions.status === 'error' && (
          <p>{grantPermissions.error?.message}</p>
        )}
      </form>
      {grantPermissions.data ? (
        <details>
          <summary style={{ marginTop: '1rem' }}>
            Permissions:{' '}
            {truncateHexString({
              address: grantPermissions.data?.key.publicKey,
              length: 12,
            })}
          </summary>
          <pre>{Json.stringify(grantPermissions.data, undefined, 2)}</pre>
        </details>
      ) : null}
    </div>
  )
}

function Mint() {
  const { address } = useAccount()
  
  const { data: id, error, isPending, sendCalls } = useSendCalls()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useCallsStatus({
    id: id?.id as string,
    query: {
      enabled: !!id,
      refetchInterval: ({ state }: { state: { data: { status: string } } }) => {
        if (state.data?.status === 'success') return false
        return 1_000
      },
    },
  })

  const balance = useBalance()
  const [transactions, setTransactions] = useState<Set<string>>(new Set())

  useEffect(() => {
    const txId = typeof id === 'string' ? id : id?.id
    if (txId) setTransactions((prev) => new Set([...prev, txId]))
  }, [id])

  if (!address) return null

  return (
    <div>
      <h3>[client] Mint EXP [balance: {balance}]</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault()
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
      >
        <button
          type="submit"
          disabled={isPending}
          style={{ marginBottom: '5px' }}
        >
          {isPending ? 'Confirming...' : 'Mint 100 EXP'}
        </button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.from(transactions).map((tx) => (
          <li key={tx}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://odyssey-explorer.ithaca.xyz/tx/${tx}`}
            >
              {tx}
            </a>
          </li>
        ))}
      </ul>
      <p>{isConfirming && 'Waiting for confirmation...'}</p>
      <p>{isConfirmed && 'Transaction confirmed.'}</p>
      {error && (
        <div>
          Error: {(error as Errors.BaseError).shortMessage || error.message}
        </div>
      )}
    </div>
  )
}