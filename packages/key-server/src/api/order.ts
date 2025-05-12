import { AppContext } from '../context'
import { createKeypair, getKeypair } from '#/db'
import { Express, RequestHandler } from 'express'
import { Address } from 'ox'
import { disputeEscrow } from '#/blockchain'
export * as health from './health'

export default function registerApi(app: Express, ctx: AppContext) {
  app.post('/orders/customer/:address/dispute/:escrowAddress', async (req, res) => {
    const { address, escrowAddress } = req.params
    console.log(`orders/customer/${address}/dispute/${escrowAddress}`)

    if (!address || !Address.validate(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }

    try {
      await disputeEscrow(address as `0x${string}`, escrowAddress as `0x${string}`, ctx)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to dispute escrow' })
      return
    }

    const escrows = await ctx.db.selectFrom('escrows').where('payer', '=', address).selectAll().execute()
    res.json(escrows)
  })

  app.get('/orders/customer/:address', async (req, res) => {
    const { address } = req.params
    console.log(`orders/customer/${address}`)

    if (!address || !Address.validate(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }

    const escrows = await ctx.db.selectFrom('escrows').where('payer', '=', address).selectAll().execute()
    res.json(escrows)
  })

  app.get('/orders/merchant/:address', async (req, res) => {
    const { address } = req.params

    if (!address || !Address.validate(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }

    const escrows = await ctx.db.selectFrom('escrows').where('payee', '=', address).selectAll().execute()
    res.json(escrows)
  })
}
