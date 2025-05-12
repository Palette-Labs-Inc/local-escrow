import { useQuery } from '@tanstack/react-query'
import { Hooks, porto } from 'porto/wagmi'
import {
  useAccount,
  useConnectors,
  http,
  createConfig,
  BaseError,
  useCallsStatus,
  useSendCalls,
  useWatchContractEvent,
  Connector,
  createStorage,
} from 'wagmi'
import { Hex, Json, Value } from 'ox'
import { useEffect, useState } from 'react'
import { useMutation } from 'wagmi/query'
import EscrowFactory from '../contracts/EscrowFactory'
import { queryClient } from '../queryClient'
import { Porto } from 'porto/remote'
import { odysseyDevnet } from 'porto/Chains'

const theChain = odysseyDevnet
// const theChain = baseSepolia

export const wagmiConfig = createConfig({
  chains: [theChain],
  connectors: [porto()],
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    [theChain.id]: http(),
  },
})

export function truncateHexString({ address, length = 6 }: { address: string; length?: number }) {
  return length > 0 ? `${address.slice(0, length)}...${address.slice(-length)}` : address
}

export const permissions = () =>
  ({
    expiry: Math.floor(Date.now() / 1_000) + 60 * 60, // 1 hour
    permissions: {
      calls: [
        {
          signature: 'createEscrow(address,address,address)',
          to: EscrowFactory.address as `0x${string}`,
        },
        {
          signature: 'dispute()',
          to: '0xa4C5d46bE1D81d3743f829b1D84b858b3792da8f' as `0x${string}`,
        },
      ],
      spend: [
        {
          period: 'minute',
          token: EscrowFactory.address as `0x${string}`,
          limit: Hex.fromNumber(Value.fromEther('1000')),
        },
      ],
    },
  } as const)

interface Key {
  type: 'p256'
  expiry: number
  publicKey: Hex.Hex
  role: 'session' | 'admin'
}

export default function Order() {
  const [serverKey, setServerKey] = useState<Key | undefined>(undefined)
  const { address } = useAccount()

  // Get a server-generated key that we will give permissions to to act on behalf of the user.
  // ATM it does nothing since I have not been able to get delegation working.
  const requestServerKeyMutation = useMutation<Key>({
    mutationFn: async () => {
      if (!address) return
      const searchParams = new URLSearchParams({
        expiry: permissions().expiry.toString(),
      })
      const response = await fetch(`/api/keys/${address.toLowerCase()}?${searchParams.toString()}`)
      const result = await Json.parse(await response.text())
      setServerKey(result)
      return result
    },
  })

  useEffect(() => {
    if (address) {
      requestServerKeyMutation.mutate()
    }
  }, [address])

  return (
    <div>
      <Header />
      <Cart serverKey={serverKey} />
      <PastOrders />
      {/* <RequestKey /> */}
      {/* <GrantPermissions /> */}
      {/* <GetPermissions /> */}
      {/* <CreateEscrow /> */}
      {/* <Account /> */}
      {/* <Events /> */}
      {/* <Clear /> */}
    </div>
  )
}

function Header() {
  const label = `porto-test-${Date.now()}`
  const connectors = useConnectors()
  const connector = connectors.find((x) => x.id === 'xyz.ithaca.porto')
  const connect = Hooks.useConnect()
  const { address } = useAccount()
  const [chainId, setChainId] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (connector) {
      if (connector) {
        connector.getChainId().then((id) => setChainId(id))
      }
    }
  }, [connector])

  useEffect(() => {
    if (connect.error) {
      console.error(connect.error)
    }
  }, [connect.error])

  return (
    <div>
      {chainId && <div className="mb-2">Connected to {chainId}</div>}
      {address ? (
        <div>Account: {address}</div>
      ) : (
        <button
          disabled={connect.status === 'pending'}
          onClick={async () => {
            connect.mutate({
              connector: connector as Connector,
              createAccount: { label },
            })
          }}
          type="button"
        >
          Sign In
        </button>
      )}
    </div>
  )
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

function Cart({ serverKey }: { serverKey?: Key }) {
  const { address } = useAccount()
  const [cart, setCart] = useState<CartItem[]>([])
  const grantPermissions = Hooks.useGrantPermissions()

  const {
    data: callData,
    error,
    isPending,
    sendCalls,
  } = useSendCalls({
    mutation: {
      onSuccess: (data) => {
        // 0x8cd4ff1a921f41a5f8962c8072840dcc777acd93612030a6a6a7fc5c65c271e6
        console.log('onSuccess data', data)
      },
    },
  })

  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    eventName: 'EscrowCreated',
    onLogs: (logs) => {
      console.log('logs', logs)
    },
  })

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useCallsStatus({
    id: callData?.id || 'disabled',
    query: {
      enabled: !!callData?.id,
      refetchInterval: ({ state }) => {
        if (state.data?.status === 'success') return false
        return 1_000
      },
    },
  })

  useEffect(() => {
    if (error) {
      console.error('Error sending calls', error)
    }
  }, [error])

  useEffect(() => {
    const cartString = localStorage.getItem('cart')
    const cart = cartString ? JSON.parse(cartString) : []
    if (cart && cart.length) {
      setCart(cart)
    } else {
      console.log('setting')
      setCart([
        {
          id: '1',
          name: 'Item 1',
          price: 10,
          quantity: 1,
        },
        {
          id: '2',
          name: 'Item 2',
          price: 20,
          quantity: 1,
        },
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Temporary just set to the same address
  const merchantAddress = address
  const customerAddress = address
  const arbiterAddress = address

  const handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault()
    grantPermissions.mutate({
      key: serverKey,
      expiry: permissions().expiry,
      address,
      permissions: permissions().permissions,
    })
    sendCalls({
      calls: [
        {
          functionName: 'createEscrow',
          abi: EscrowFactory.abi,
          to: EscrowFactory.address,
          args: [merchantAddress, customerAddress, arbiterAddress],
        },
      ],
    })
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - x{item.quantity}
          </li>
        ))}
      </ul>
      <button disabled={isPending || isConfirming} onClick={handleSubmit}>
        {isPending ? 'Placing...' : 'Place Order'}
      </button>
    </div>
  )
}

function PastOrders() {
  const { address } = useAccount()

  const queryOrders = useQuery<
    {
      address: string
      payer: string
      payee: string
      arbiter: string
    }[]
  >({
    refetchInterval: 1000 * 60, // 1 minute
    queryKey: ['orders', address],
    queryFn: async () => {
      if (!address) return
      const response = await fetch(`/api/orders/customer/${address}`)
      const result = await Json.parse(await response.text())
      return result
    },
  })

  const disputeEscrowMutation = useMutation({
    mutationFn: async (escrowAddress: string) => {
      if (!address) return
      const response = await fetch(`/api/orders/customer/${address}/dispute/${escrowAddress}`, {
        method: 'POST',
      })
      const result = await Json.parse(await response.text())
      return result
    },
  })

  return (
    <div>
      <h2>Past Orders</h2>
      <div>
        {queryOrders.data?.map((order) => (
          <div key={order.address}>
            <h3>{order.address}</h3>
            <button onClick={() => disputeEscrowMutation.mutate(order.address)}>Dispute</button>
            <div>Payer: {order.payer}</div>
            <div>Payee: {order.payee}</div>
            <div>Arbiter: {order.arbiter}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RequestKey() {
  const { address } = useAccount()

  const requestKeyMutation = useMutation<Key>({
    mutationFn: async () => {
      if (!address) return
      const searchParams = new URLSearchParams({
        expiry: permissions().expiry.toString(),
      })
      const response = await fetch(`/api/keys/${address.toLowerCase()}?${searchParams.toString()}`)
      const result = await Json.parse(await response.text())
      await wagmiConfig.storage?.setItem(`${address.toLowerCase()}-keys`, Json.stringify(result))
      return result
    },
  })

  useEffect(() => {
    requestKeyMutation.mutate()
  }, [])
  return (
    <div>
      {address ? (
        <button
          type="button"
          onClick={() => requestKeyMutation.mutate()}
          disabled={requestKeyMutation.status === 'pending'}
        >
          {requestKeyMutation.status === 'pending' ? 'Requesting key…' : 'Request Key'}
        </button>
      ) : null}
      {requestKeyMutation.data ? (
        <div>
          <pre>{Json.stringify(requestKeyMutation.data, undefined, 2)}</pre>
        </div>
      ) : null}
    </div>
  )
}

function Clear() {
  const clear = () => {
    queryClient.clear()
    queryClient.resetQueries()
    queryClient.removeQueries()
    queryClient.invalidateQueries()
    queryClient.unmount()
    window.localStorage.clear()
    window.sessionStorage.clear()
    localStorage.removeItem('wagmi.store')
  }
  return <button onClick={clear}>Clear</button>
}

function CreateEscrow() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls({
    mutation: {
      onSuccess: (data) => {
        // 0x8cd4ff1a921f41a5f8962c8072840dcc777acd93612030a6a6a7fc5c65c271e6
        console.log('onSuccess data', data)
      },
    },
  })

  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    eventName: 'EscrowCreated',
    onLogs: (logs) => {
      console.log('logs', logs)
    },
  })
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useCallsStatus({
    id: data?.id || 'disabled',
    query: {
      enabled: !!data?.id,
      refetchInterval: ({ state }) => {
        if (state.data?.status === 'success') return false
        return 1_000
      },
    },
  })

  const [transactions, setTransactions] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (data?.id) {
      setTransactions((prev) => new Set([...prev, data.id]))
      console.log('data', data)
    }
  }, [data])

  // Temporary just set to the same address
  const merchantAddress = address
  const customerAddress = address
  const arbiterAddress = address

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendCalls({
      calls: [
        {
          functionName: 'createEscrow',
          abi: EscrowFactory.abi,
          to: EscrowFactory.address,
          args: [merchantAddress, customerAddress, arbiterAddress],
        },
      ],
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={isPending} style={{ marginBottom: '5px' }}>
          {isPending ? 'Confirming...' : 'Create Escrow'}
        </button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.from(transactions).map((tx) => (
          <li key={tx}>
            <a target="_blank" rel="noopener noreferrer" href={`https://sepolia.basescan.org/tx/${tx}`}>
              {tx}
            </a>
          </li>
        ))}
      </ul>
      <p>{isConfirming && 'Waiting for confirmation...'}</p>
      <p>{isConfirmed && 'Transaction confirmed.'}</p>
      {error && (
        <div>
          Error: {(error as BaseError).shortMessage} {error.message} <br />
          {error.stack}
        </div>
      )}
    </div>
  )
}

function GrantPermissions() {
  const { address } = useAccount()
  const grantPermissions = Hooks.useGrantPermissions()
  const [key, setKey] = useState<string>('')

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          if (!address) return

          const key = Json.parse((await wagmiConfig.storage?.getItem(`${address.toLowerCase()}-keys`)) || '{}') as Key
          {
            JSON.stringify(key)
          }

          setKey(JSON.stringify(key))

          // if `expry` is present in both `key` and `permissions`, pick the lower value
          const expiry = Math.min(key.expiry, permissions().expiry)

          grantPermissions.mutate({
            key,
            expiry,
            address,
            permissions: permissions().permissions,
          })
        }}
      >
        <button type="submit" style={{ marginBottom: '5px' }} disabled={grantPermissions.status === 'pending'}>
          {grantPermissions.status === 'pending' ? 'Authorizing…' : 'Grant Permissions'}
        </button>
        {grantPermissions.status === 'error' && <p>{grantPermissions.error?.message}</p>}
      </form>
      <div>Key: {key}</div>
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

function GetPermissions() {
  const getPermissions = Hooks.usePermissions()
  return (
    <div>
      {getPermissions.data ? (
        <details>
          <pre>{Json.stringify(getPermissions.data, undefined, 2)}</pre>
        </details>
      ) : null}
    </div>
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

function Events() {
  const [responses, setResponses] = useState<Record<string, unknown>>({})
  const connectors = useConnectors()
  const portoConnector = connectors.find((x) => x.id === 'xyz.ithaca.porto')
  useEffect(() => {
    portoConnector
      ?.getProvider({
        chainId: theChain.id,
      })
      .then((provider: unknown) => {
        const castedProvider = provider as ReturnType<typeof Porto.create>['provider']
        castedProvider.request({})
        const handleResponse = (event: string) => (response: unknown) =>
          setResponses((responses) => ({
            ...responses,
            [event]: response,
          }))

        const handleAccountsChanged = handleResponse('accountsChanged')
        const handleChainChanged = handleResponse('chainChanged')
        const handleConnect = handleResponse('connect')
        const handleDisconnect = handleResponse('disconnect')
        const handleMessage = handleResponse('message')

        castedProvider?.on('accountsChanged', handleAccountsChanged)
        castedProvider?.on('chainChanged', handleChainChanged)
        castedProvider?.on('connect', handleConnect)
        castedProvider?.on('disconnect', handleDisconnect)
        castedProvider?.on('message', handleMessage)
        return () => {
          castedProvider?.removeListener('accountsChanged', handleAccountsChanged)
          castedProvider?.removeListener('chainChanged', handleChainChanged)
          castedProvider?.removeListener('connect', handleConnect)
          castedProvider?.removeListener('disconnect', handleDisconnect)
          castedProvider?.removeListener('message', handleMessage)
        }
      })
  }, [])
  return (
    <div>
      <h3>Events</h3>
      <pre>{Json.stringify(responses, null, 2)}</pre>
    </div>
  )
}
