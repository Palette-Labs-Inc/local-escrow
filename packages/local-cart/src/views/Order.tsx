import { useQuery } from '@tanstack/react-query'
import { Hooks, porto } from 'porto/wagmi'
import {
  useAccount,
  useConnectors,
  http,
  createConfig,
  useCallsStatus,
  useSendCalls,
  useWatchContractEvent,
  type Connector,
  createStorage,
  useReadContracts,
} from 'wagmi'
import { AbiFunction, Hex, Json, P256, Signature, Value } from 'ox'
import { useEffect, useState } from 'react'
import { useMutation } from 'wagmi/query'
import EscrowFactory from '../contracts/EscrowFactory'
import { queryClient } from '../queryClient'
import { Porto } from 'porto'
import { baseSepolia } from 'wagmi/chains'
import SimpleEscrow from '../contracts/SimpleEscrow'

const theChain = baseSepolia

const portoInstance = Porto.create()

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

const EXP1_ADDRESS = '0x29F45fc3eD1d0ffaFb5e2af9Cc6C3AB1555cd5a2'

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
          period: 'week',
          token: EXP1_ADDRESS as `0x${string}`,
          limit: Hex.fromNumber(Value.fromEther('1000')),
        },
      ],
    },
  } as const)

interface Key {
  type: 'p256'
  expiry: number
  publicKey: Hex.Hex
  privateKey: string
  role: 'session' | 'admin'
}

async function createkOrGetSessionKey(address: string) {
  // Generate P-256 key pair
  const sessionKey = localStorage.getItem(`${address?.toLowerCase()}-session-key`)
  if (sessionKey) {
    return Json.parse(sessionKey)
  }

  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true, // extractable
    ['sign', 'verify'],
  )

  localStorage.setItem(`${address?.toLowerCase()}-session-key`, Json.stringify(keyPair))

  return keyPair
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
      localStorage.setItem(`${address.toLowerCase()}-server-key`, Json.stringify(result))
      return result
    },
  })

  useEffect(() => {
    if (address) {
      if (!serverKey) {
        const localKey = JSON.parse(localStorage.getItem(`${address.toLowerCase()}-server-key`) || '{}') as
          | Key
          | undefined
        console.log('localKey found', localKey)
        if (!localKey || !localKey.publicKey) {
          requestServerKeyMutation.mutate()
        } else {
          setServerKey(localKey)
        }
      }
    }
  }, [address])
  const connectors = useConnectors()
  const portoConnector = connectors.find((x) => x.id === 'xyz.ithaca.porto')
  const grantPermissions = Hooks.useGrantPermissions()
  const getPermissions = Hooks.usePermissions()

  const handleGrant = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    grantPermissions.mutate({
      key: serverKey,
      expiry: permissions().expiry,
      address,
      permissions: permissions().permissions,
      onSuccess: () => {
        console.log('Permissions granted')
      },
      onError: (error: any) => {
        console.error('Error granting permissions', error)
      },
    })
  }
  const createEscrowDelegated = () => {
    if (!serverKey) return

    const call = {
      to: EscrowFactory.address,
      data: AbiFunction.encodeData(AbiFunction.fromAbi(EscrowFactory.abi, 'createEscrow'), [address, address, address]),
    }
    portoConnector
      ?.getProvider({
        chainId: theChain.id,
      })
      .then((provider: unknown) => {
        const castedProvider = provider as ReturnType<typeof Porto.create>['provider']
        castedProvider.request({
          method: 'wallet_sendCalls',
          params: [
            {
              calls: [call],
              capabilities: {
                permissions: {
                  calls: [
                    {
                      id: '0x17e67ecac2d23af8d3d06cda8643b16c03d189028f95ad218d31e4d795f91473964db6300f0eb82d44b3cecb33cecb6650a261acc9bc1bded4c417da9a5b436f',
                    },
                  ],
                },
              },
            },
          ],
        })
      })
  }
  console.log('getPermissions.data', getPermissions.data)

  const rawConnect = async () => {
    const connectResult = await portoInstance.provider.request({
      method: 'wallet_connect',
    })
    console.log('connectResult', connectResult)
  }

  const rawPrepareAndCall = async () => {
    const call = {
      to: EscrowFactory.address,
      data: AbiFunction.encodeData(AbiFunction.fromAbi(EscrowFactory.abi, 'createEscrow'), [address, address, address]),
    }

    console.log('public key', serverKey?.publicKey)
    const { digest, ...request } = await portoInstance.provider.request({
      method: 'wallet_prepareCalls',
      params: [
        {
          from: address,
          calls: [call],
          chainId: Hex.fromNumber(baseSepolia.id),
          key: {
            publicKey: serverKey?.publicKey,
            type: 'p256',
          },
        },
      ],
    })

    console.log('request', digest, request)

    const signature = Signature.toHex(
      P256.sign({
        payload: digest,
        privateKey: serverKey?.publicKey as `0x${string}`,
      }),
    )

    const [sendPreparedCallsResult] = await portoInstance.provider.request({
      method: 'wallet_sendPreparedCalls',
      params: [
        {
          ...request,
          signature: {
            value: signature,
            type: serverKey?.type,
            publicKey: serverKey?.publicKey,
          },
        },
      ],
    })
    console.log('sendPreparedCallsResult', sendPreparedCallsResult)
  }

  return (
    <div>
      <div>{address}</div>
      <div>{serverKey?.publicKey}</div>
      <div>{JSON.stringify(getPermissions.data, (_, v) => (typeof v === 'bigint' ? v.toString() : v), 2)}</div>
      <button onClick={handleGrant}>Grant Permissions</button>
      <button onClick={createEscrowDelegated}>Create Escrow Delegated</button>
      <button onClick={rawConnect}>Raw Connect</button>
      <button onClick={rawPrepareAndCall}>Raw Prepare and Call</button>
      <Header />
      <Cart serverKey={serverKey} />
      <PastOrders />
      {/* <RequestKey /> */}
      <GetPermissions />
      {/* <CreateEscrow /> */}
      <Events />
      <Logout />
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
  useEffect(() => {
    if (grantPermissions.error) {
      console.error('Error granting permissions', grantPermissions.error)
    }
  }, [grantPermissions.error])

  const {
    data: callData,
    error,
    isPending,
    sendCalls,
  } = useSendCalls({
    mutation: {
      onSuccess: (data) => {
        console.log('Escrow created', data)
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

  const handleGrantPermissions = () => {
    grantPermissions.mutate({
      key: serverKey,
      expiry: permissions().expiry,
      address,
      permissions: permissions().permissions,
    })
  }

  const handleSubmit = async (event: React.FormEvent<any>) => {
    event.preventDefault()
    await handleGrantPermissions()
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

  const handleDispute = (escrowAddress: string) => {
    sendCalls({
      calls: [
        {
          functionName: 'dispute',
          abi: SimpleEscrow.abi,
          to: escrowAddress,
          args: [],
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
      {serverKey ? (
        <button disabled={isPending || isConfirming} onClick={handleSubmit}>
          {isPending ? 'Placing...' : 'Place Order'}
        </button>
      ) : null}
    </div>
  )
}

function PastOrders() {
  const { address } = useAccount()

  const {
    data: callData,
    error,
    isPending,
    sendCalls,
  } = useSendCalls({
    mutation: {
      onSuccess: (data) => {
        console.log('Wrote contract', data)
      },
      onError: (error) => {
        console.error('Error writing to contract', error)
      },
    },
  })

  const handleDispute = (escrowAddress: string) => {
    sendCalls({
      calls: [
        {
          functionName: 'dispute',
          abi: SimpleEscrow.abi,
          to: escrowAddress,
          args: [],
        },
      ],
    })
  }
  const handleRemoveDispute = (escrowAddress: string) => {
    sendCalls({
      calls: [
        {
          functionName: 'removeDispute',
          abi: SimpleEscrow.abi,
          to: escrowAddress,
          args: [],
        },
      ],
    })
  }

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

  const { data: contracts, refetch: refetchContracts } = useReadContracts({
    contracts: queryOrders.data
      ?.map((order) => [
        {
          address: order.address as `0x${string}`,
          abi: SimpleEscrow.abi,
          functionName: 'isDisputed',
        },
        {
          address: order.address as `0x${string}`,
          abi: SimpleEscrow.abi,
          functionName: 'isSettled',
        },
      ])
      .flat(),
  })

  let contractValues: Record<string, { isDisputed: boolean; isSettled: boolean }> = {}
  const addresses = queryOrders.data?.map((order) => order.address)

  for (let i = 0; i < (contracts?.length || 0); i += 2) {
    const contract = contracts?.[i]
    if (!contract || contract.error) {
      console.error('Error fetching contract', contract?.error)
    } else {
      const address = addresses?.[i / 2]!
      contractValues[address] = {
        isDisputed: Boolean(contract.result),
        isSettled: Boolean(contracts?.[i + 1]?.result),
      }
    }
  }

  const events = ['Dispute', 'DisputeRemoved', 'DisputeResolved', 'Refunded', 'Settled']
  events.forEach((event) => {
    const addresses = queryOrders.data?.map((order) => order.address)
    useWatchContractEvent({
      enabled: addresses && addresses.length > 0,
      address: addresses as `0x${string}`[],
      eventName: event,
      onLogs: (logs) => {
        console.log(`Event "${event}" in contract ${logs[0].address}`, logs)
        refetchContracts()
      },
    })
  })

  // const disputeEscrowMutation = useMutation({
  //   mutationFn: async (escrowAddress: string) => {
  //     if (!address) return
  //     const response = await fetch(`/api/orders/customer/${address}/dispute/${escrowAddress}`, {
  //       method: 'POST',
  //     })
  //     const result = await Json.parse(await response.text())
  //     return result
  //   },
  // })

  return (
    <div>
      <h2>Past Orders</h2>
      <div>
        {queryOrders.data?.map((order) => (
          <div key={order.address}>
            <h3>{order.address}</h3>
            <div>
              {' '}
              Status:{' '}
              {contractValues[order.address]?.isSettled
                ? 'Settled'
                : contractValues[order.address]?.isDisputed
                ? 'Disputed'
                : 'Active'}
            </div>
            {contractValues[order.address]?.isDisputed ? (
              <button onClick={() => handleRemoveDispute(order.address)}>Remove Dispute</button>
            ) : (
              <button onClick={() => handleDispute(order.address)}>Dispute</button>
            )}
            <div>Payer: {order.payer}</div>
            <div>Payee: {order.payee}</div>
            {/* <div>Arbiter: {order.arbiter}</div> */}
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

function Logout() {
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
  return <button onClick={clear}>Logout</button>
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
