import { encodeFunctionData } from 'viem'
import EscrowFactory from './contracts/EscrowFactory'
import { wagmiConfig } from './config'
import { Hex, P256, Signature } from 'ox'
import { getEscrowPrivateKey, getEscrowPublicKey, permissions } from './constants'


////////////////////////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////////////////////////

/** Parameters required to open a new escrow. */
export interface CreateEscrowInput {
  payee: `0x${string}`
  storefront: `0x${string}`
  arbiter: `0x${string}`
}

/**
 * Asks Porto to hash (prepare) the `createEscrow` call for our delegated key.
 */
async function prepareCreateEscrowCall(input: CreateEscrowInput) {
  const publicKey = getEscrowPublicKey()

  const calldata = encodeFunctionData({
    abi: EscrowFactory.abi,
    functionName: 'createEscrow',
    args: [input.payee, input.storefront, input.arbiter],
  })

  const provider = await getProvider()
  const result = await provider.request({
    method: 'wallet_prepareCalls',
    params: [
      {
        from: input.payee,
        chainId: Hex.fromNumber(wagmiConfig.chains[0].id),
        calls: [
          {
            to: EscrowFactory.address,
            data: calldata,
          },
        ],
        capabilities: {
          authorizeKeys: [
            {
              publicKey,
              type: 'p256',
              expiry: permissions().expiry,
              permissions: permissions().permissions,
            },
          ],
        },
        key: {
          publicKey,
          type: 'p256',
        },
      },
    ],
  }) as Promise<{
    digest: `0x${string}`
    context: unknown
    chainId: `0x${string}`
    key: { publicKey: `0x${string}`; type: 'p256' }
  }>
  console.log('result', JSON.stringify(result, null, 2))
  return result
}

/** Signs the digest returned by `wallet_prepareCalls`. */
async function signDigest(digest: `0x${string}`): Promise<`0x${string}`> {
  const signature = P256.sign({ payload: digest, privateKey: getEscrowPrivateKey() })
  return Signature.toHex(signature) as `0x${string}`
}

/** Executes the previously prepared and signed call bundle. */
async function executePreparedCalls(
  context: unknown,
  chainId: `0x${string}`,
  key: { publicKey: `0x${string}`; type: 'p256' },
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
  console.log('input', JSON.stringify(input, null, 2))

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

export function truncateHexString({
    address,
    length = 6,
  }: {
    address: string
    length?: number
  }) {
    return length > 0
      ? `${address.slice(0, length)}...${address.slice(-length)}`
      : address
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
