import EscrowFactory from './contracts/EscrowFactory'
import { getKeypair } from './db'
import { AppContext } from './context'
import type { AbiEvent } from 'abitype'
import { Mode, Porto, Chains } from 'porto'
import { AbiFunction, Hex, P256, Signature } from 'ox'
import SimpleEscrow from './contracts/SimpleEscrow'
import { baseSepolia } from 'viem/chains'
import { http, Chain as Chain_viem, ChainContract } from 'viem'

// export const envs = ['anvil', 'dev', 'prod', 'stg'] as const
// export type Env = 'anvil' | 'dev' | 'prod' | 'stg'

// export type Chain = Chain_viem & {
//   contracts: Chain_viem['contracts'] & {
//     delegation?: ChainContract | undefined
//   }
// }

// const portoDev: Chain = {
//   blockExplorers: {
//     default: {
//       apiUrl: '',
//       name: '',
//       url: '',
//     },
//   },
//   contracts: {
//     delegation: {
//       address: '0x1bd84b4584a60cbcc1b3153694a69315f795c1ba',
//     },
//   },
//   id: 28_404,
//   name: 'Porto Dev',
//   nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
//   rpcUrls: {
//     default: { http: ['https://porto-dev.ithaca.xyz'] },
//   },
//   testnet: true,
// }

export function listenToEscrowCreated(ctx: AppContext) {
  console.log('Listening to blockchain events...')

  ctx.client.watchContractEvent<typeof EscrowFactory.abi, 'EscrowCreated'>({
    abi: EscrowFactory.abi,
    address: EscrowFactory.address as `0x${string}`,
    eventName: 'EscrowCreated',
    onLogs: (logs) => {
      logs.forEach((log) => {
        console.log('New escrow created', (log as any).args.escrowAddress)
        const args = (log as any).args
        processEscrowCreated(args.payee, args.escrowAddress, ctx)
      })
    },
  })

  updateSinceLastProcessedBlock(ctx)
  setInterval(
    () => {
      updateSinceLastProcessedBlock(ctx)
    },
    1000 * 60 * 10,
  )
}

async function updateSinceLastProcessedBlock(ctx: AppContext) {
  console.log('Catching up since last processed block')
  let lastProcessedBlock = await ctx.db.selectFrom('lastProcessedBlock').selectAll().executeTakeFirst()
  const START_BLOCK = 25324505
  if (!lastProcessedBlock) {
    await ctx.db
      .insertInto('lastProcessedBlock')
      .values({
        blockNumber: START_BLOCK,
      })
      .execute()
    lastProcessedBlock = {
      blockNumber: START_BLOCK,
    }
  }

  const currentBlockNumber = await ctx.client.getBlockNumber()

  const logs = await ctx.client.getLogs({
    address: EscrowFactory.address as `0x${string}`,
    event: EscrowFactory.abi.find((abi) => abi.name === 'EscrowCreated') as AbiEvent,
    fromBlock: BigInt(lastProcessedBlock.blockNumber),
    toBlock: currentBlockNumber,
  })

  logs.forEach((log) => {
    const args = (log as any).args
    processEscrowCreated(args.payee, args.escrowAddress, ctx)
  })

  await ctx.db
    .updateTable('lastProcessedBlock')
    .set({
      blockNumber: Number(currentBlockNumber),
    })
    .execute()
}

async function processEscrowCreated(payee: `0x${string}`, escrowAddress: `0x${string}`, ctx: AppContext) {
  console.log('Processing escrow created', escrowAddress)
  const escrow = await ctx.db.selectFrom('escrows').where('address', '=', escrowAddress).selectAll().executeTakeFirst()
  if (escrow) {
    console.log('Escrow already exists', escrowAddress)
    return
  }

  await ctx.db
    .insertInto('escrows')
    .values({
      address: escrowAddress,
      payer: payee,
      payee: payee,
      arbiter: payee,
    })
    .execute()

  const keypair = await getKeypair(ctx.db, payee)
  if (!keypair) {
    console.error('No keypair found for address', payee)
    return
  }
}

export async function disputeEscrow(payer: `0x${string}`, escrowAddress: `0x${string}`, ctx: AppContext) {
  console.log('Processing escrow disputed', escrowAddress)
  const escrow = await ctx.db.selectFrom('escrows').where('address', '=', escrowAddress).selectAll().executeTakeFirst()
  if (!escrow) {
    console.log('Escrow does not exist', escrowAddress)
    return
  }
  const keypair = await getKeypair(ctx.db, payer)
  if (!keypair) {
    console.error('No keypair found for address', payer, keypair)
    return
  }

  const porto = Porto.create({
    chains: [baseSepolia],
    // mode: Mode.relay(),
  })

  console.log('Processing dispute for escrow', escrowAddress)

  const call = {
    to: escrowAddress,
    data: AbiFunction.encodeData(AbiFunction.fromAbi(SimpleEscrow.abi, 'dispute'), []),
  }

  console.log('public key', keypair.public_key)
  const { digest, ...request } = await porto.provider.request({
    method: 'wallet_prepareCalls',
    params: [
      {
        from: keypair.address,
        calls: [call],
        chainId: Hex.fromNumber(baseSepolia.id),
        key: {
          publicKey: keypair.public_key,
          type: 'p256',
        },
      },
    ],
  })

  const signature = Signature.toHex(
    P256.sign({
      payload: digest,
      privateKey: keypair.private_key as `0x${string}`,
    }),
  )

  const [sendPreparedCallsResult] = await porto.provider.request({
    method: 'wallet_sendPreparedCalls',
    params: [
      {
        ...request,
        signature: {
          value: signature,
          type: keypair.type,
          publicKey: keypair.public_key,
        },
      },
    ],
  })

  // const signature = Signature.toHex(
  //   P256.sign({
  //     payload: digest,
  //     privateKey: keypair.private_key as `0x${string}`,
  //   }),
  // )
  // await porto.provider.request({
  //   method: 'wallet_connect',
  //   params: [
  //     {
  //       capabilities: {
  //         createAccount: true,
  //       },
  //     },
  //   ],
  // })

  // const [sendPreparedCallsResult] = await porto.provider.request({
  //   method: 'wallet_sendCalls',
  //   params: [
  //     {
  //       calls: [
  //         {
  //           data: AbiFunction.encodeData(AbiFunction.fromAbi(SimpleEscrow.abi, 'dispute'), []),
  //           to: escrowAddress,
  //         },
  //       ],
  //       from: payer,
  //       // signature: {
  //       //   value: signature,
  //       //   type: keypair.type,
  //       //   publicKey: keypair.public_key,
  //       // },
  //     },
  //   ],
  // })

  const hash = sendPreparedCallsResult?.id
  if (!hash) {
    console.error(`failed to send prepared calls for ${payer}. No hash returned from wallet_sendPreparedCalls`)
    throw new Error('failed to send prepared calls')
  }
}

/*
  {
    eventName: 'EscrowCreated',
    args: {
      escrowAddress: '0x1439675344ea18FA878f23c9DCa0aD3230E3E3a8',
      payee: '0x0ca3AA1529206b4df87A512993657fc7290DaD7d',
      storefront: '0x0ca3AA1529206b4df87A512993657fc7290DaD7d',
      arbiter: '0x0ca3AA1529206b4df87A512993657fc7290DaD7d'
    },
    address: '0x0f01298ca1472dc8fce232e5611d57294aefe904',
    blockHash: '0xba6c2e823244ad5a078194e4246c68e35c88bae23bd7bcf62ff3f8e13a43fbff',
    blockNumber: 25398744n,
    data: '0x0000000000000000000000000ca3aa1529206b4df87a512993657fc7290dad7d',
    logIndex: 308,
    removed: false,
    topics: [
      '0x9d6330c40b62e9b3318783aac74e1b766472a80cc5298f1a06e5106eb7c58a8e',
      '0x0000000000000000000000001439675344ea18fa878f23c9dca0ad3230e3e3a8',
      '0x0000000000000000000000000ca3aa1529206b4df87a512993657fc7290dad7d',
      '0x0000000000000000000000000ca3aa1529206b4df87a512993657fc7290dad7d'
    ],
    transactionHash: '0x7c9a2e3558d58ea4eedc9b48efb0c6bddb420e4ba22916603cfb285ce0a122b5',
    transactionIndex: 51
  }
*/
