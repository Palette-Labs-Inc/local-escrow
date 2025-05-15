import { encodeFunctionData, parseEther, toHex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import EscrowFactory from './_generated/EscrowFactory'
import { config } from './config'

////////////////////////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////////////////////////

/** Parameters required to open a new escrow. */
export interface CreateEscrowInput {
  payee: `0x${string}`
  storefront: `0x${string}`
  arbiter: `0x${string}`
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// LOW-LEVEL PRIMITIVES ─ each has exactly one reason to change (SRP)
////////////////////////////////////////////////////////////////////////////////////////////////////

interface PortoProvider {
    // minimal subset we need
    request: (args: { method: string; params?: unknown }) => Promise<unknown>
  }
  
  /**
   * Returns the *singleton* Porto provider that is already being used by wagmiʼs
   * `porto()` connector. Creating a fresh instance with `Porto.create()` would
   * yield an un-connected provider which triggers
   * "The provider is disconnected from all chains." errors when invoking
   * delegated methods. By re-using the provider from the existing connector we
   * guarantee that all RPC requests share the same session & connection state.
   */
  async function getProvider(): Promise<PortoProvider> {
    const connector = config.connectors[0] as unknown as {
      id: string
      getProvider: () => Promise<PortoProvider>
    }
  
    if (connector.id !== 'xyz.ithaca.porto')
      throw new Error('⛔ Porto connector not initialised')
  
    // eslint-disable-next-line @typescript-eslint/return-await -- we purposely propagate the promise
    return connector.getProvider()
  } 
  
/**
 * Returns the (app-managed) signing account derived from the private key.
 * The key is read **once** from the environment – makes DI trivial in tests.
 */
export function getEscrowSigner() {
  const pk = import.meta.env.VITE_ESCROW_SIGNER_PRIVATE_KEY as
    | `0x${string}`
    | undefined

  if (!pk) throw new Error('⛔ VITE_ESCROW_SIGNER_PRIVATE_KEY is missing')
  return privateKeyToAccount(pk)
}

/**
 * Grants the minimum permissions Porto requires (one call scope + one spend limit)
 * so that the escrow signer can interact with `EscrowFactory`.
 */
export async function grantEscrowSignerPermissions() {
  const provider = await getProvider()
  const signer = getEscrowSigner()

  const expiry = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 1 week

  return provider.request({
    method: 'experimental_grantPermissions',
    params: [
      {
        expiry,
        key: { publicKey: signer.address, type: 'secp256k1' },
        permissions: {
          calls: [
            {
              signature: 'createEscrow(address,address,address)',
              to: EscrowFactory.address as `0x${string}`,
            },
          ],
          spend: [
            {
              limit: toHex(parseEther('0.01')), // tight native-ETH budget per day
              period: 'day',
            },
          ],
        },
      },
    ],
  })
}

/**
 * Asks Porto to hash (prepare) the `createEscrow` call for our delegated key.
 */
async function prepareCreateEscrowCall(input: CreateEscrowInput) {
  const provider = await getProvider()
  const signer = getEscrowSigner()

  const calldata = encodeFunctionData({
    abi: EscrowFactory.abi,
    functionName: 'createEscrow',
    args: [input.payee, input.storefront, input.arbiter],
  })

  return provider.request({
    method: 'wallet_prepareCalls',
    params: [
      {
        calls: [
          {
            to: EscrowFactory.address as `0x${string}`,
            data: calldata as `0x${string}`,
            value: '0x0',
          },
        ],
        key: {
          publicKey: signer.address,
          type: 'secp256k1',
        },
      },
    ],
  }) as Promise<{
    digest: `0x${string}`
    context: unknown
    chainId: `0x${string}`
    key: { publicKey: `0x${string}`; type: 'secp256k1' }
  }>
}

/** Signs the digest returned by `wallet_prepareCalls`. */
async function signDigest(digest: `0x${string}`): Promise<`0x${string}`> {
  const signer = getEscrowSigner()
  return signer.signMessage({ message: { raw: digest } }) as Promise<`0x${string}`>
}

/** Executes the previously prepared and signed call bundle. */
async function executePreparedCalls(
  context: unknown,
  chainId: `0x${string}`,
  key: { publicKey: `0x${string}`; type: 'secp256k1' },
  signature: `0x${string}`,
) {
  const provider = await getProvider()
  return provider.request({
    method: 'wallet_sendPreparedCalls',
    params: [
      {
        chainId,
        context,
        key,
        signature,
      },
    ],
  }) as Promise<{ id: string }[]>
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// HIGH-LEVEL ORCHESTRATOR ─ composes the primitives (OCP & ISP friendly)
////////////////////////////////////////////////////////////////////////////////////////////////////

export async function createEscrow(input: CreateEscrowInput) {
  // 1️⃣ prepare call
  const prepared = await prepareCreateEscrowCall(input)

  // 2️⃣ sign digest off-wallet
  const signature = await signDigest(prepared.digest)

  // 3️⃣ broadcast via Porto
  return executePreparedCalls(
    prepared.context,
    prepared.chainId,
    prepared.key,
    signature,
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// EXAMPLE USAGE (can be removed when you wire into your UI)
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
(async () => {
  await grantEscrowSignerPermissions()

  const response = await createEscrow({
    payee: '0x123...',
    storefront: '0xabc...',
    arbiter: '0xdef...',
  })

  console.log('Escrow TX id', response[0]?.id)
})()
*/
