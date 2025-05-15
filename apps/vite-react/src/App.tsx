import { Hooks } from 'porto/wagmi'
import { formatEther, parseEther } from 'viem'
import {
  type BaseError,
  useAccount,
  useConnectors,
  useReadContract,
  useSendCalls,
  useWaitForCallsStatus,
} from 'wagmi'
import { exp1Address, exp1Config } from './_generated/contracts'
import { grantEscrowSignerPermissions, createEscrow } from './escrow-delegation'
import { useState } from 'react'

export function App() {
  const { isConnected } = useAccount()
  return (
    <>
      <Account />
      {isConnected ? (
        <>
          <Balance />
          <Mint />
          <CreateEscrow />
        </>
      ) : (
        <Connect />
      )}
    </>
  )
}

function Account() {
  const account = useAccount()
  const disconnect = Hooks.useDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status !== 'disconnected' && (
        <button onClick={() => disconnect.mutate({})} type="button">
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const connectors = useConnectors()
  const connect = Hooks.useConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors
        .filter((x) => x.id === 'xyz.ithaca.porto')
        ?.map((connector) => (
          <div key={connector.uid}>
            <button
              onClick={() =>
                connect.mutate({
                  connector,
                })
              }
              type="button"
            >
              Connect
            </button>
          </div>
        ))}
      <div>{connect.status}</div>
      <div>{connect.error?.message}</div>
    </div>
  )
}

function Balance() {
  const { address } = useAccount()

  if (!address) return null

  const { data: balance } = useReadContract({
    ...exp1Config,
    args: [address],
    functionName: 'balanceOf',
    query: {
      enabled: true,
      refetchInterval: 2_000,
    },
  })

  return (
    <div>
      <h2>Balance</h2>
      <div>Balance: {formatEther(balance ?? 0n)} EXP</div>
    </div>
  )
}

function Mint() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForCallsStatus({
      id: data?.id,
    })

  if (!address) return null

  return (
    <div>
      <h2>Mint EXP</h2>
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
      >
        <button disabled={isPending} type="submit">
          {isPending ? 'Confirming...' : 'Mint 100 EXP'}
        </button>
      </form>
      {data?.id && <div>Transaction Hash: {data.id}</div>}
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  )
}

function CreateEscrow() {
  const [payee, setPayee] = useState('')
  const [storefront, setStorefront] = useState('')
  const [arbiter, setArbiter] = useState('')
  const [grantStatus, setGrantStatus] = useState<'idle' | 'granting' | 'granted' | 'error'>('idle')
  const [txId, setTxId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGrant() {
    try {
      setGrantStatus('granting')
      await grantEscrowSignerPermissions()
      setGrantStatus('granted')
    } catch (err) {
      setGrantStatus('error')
      setError((err as Error).message)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const response = await createEscrow({ payee: payee as `0x${string}`, storefront: storefront as `0x${string}`, arbiter: arbiter as `0x${string}` })
      setTxId(response[0]?.id ?? null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div>
      <h2>Escrow Delegation</h2>
      <button disabled={grantStatus === 'granting'} onClick={handleGrant} type="button">
        {grantStatus === 'granted' ? 'Permissions Granted ✔' : grantStatus === 'granting' ? 'Granting…' : 'Grant Permissions'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleCreate} style={{ marginTop: 12 }}>
        <div>
          <label>
            Payee:
            <input value={payee} onChange={(e) => setPayee(e.target.value)} placeholder="0x…" />
          </label>
        </div>
        <div>
          <label>
            Storefront:
            <input value={storefront} onChange={(e) => setStorefront(e.target.value)} placeholder="0x…" />
          </label>
        </div>
        <div>
          <label>
            Arbiter:
            <input value={arbiter} onChange={(e) => setArbiter(e.target.value)} placeholder="0x…" />
          </label>
        </div>
        <button type="submit">Create Escrow</button>
      </form>

      {txId && <div>Escrow Transaction Id: {txId}</div>}
    </div>
  )
}
