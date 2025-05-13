import { AppContext } from '../context'
import { createKeypair, getKeypair } from '#/db'
import { Express, RequestHandler } from 'express'
import { Address } from 'ox'
export * as health from './health'

export default function registerApi(app: Express, ctx: AppContext) {
  app.get('/keys/:address', async (req, res) => {
    const { address } = req.params
    const { expiry } = req.query

    if (!address || !Address.validate(address)) {
      res.status(400).json({ error: 'Invalid address' })
      return
    }

    // check for existing key
    const storedKey = await getKeypair(ctx.db, address)

    const expired = storedKey?.expiry && storedKey.expiry < Math.floor(Date.now() / 1_000)

    if (!expired && storedKey) {
      console.log('found key', storedKey)
      res.json({
        type: storedKey.type,
        publicKey: storedKey.public_key,
        privateKey: storedKey.private_key,
        expiry: storedKey.expiry,
        role: storedKey.role,
      })
      return
    }

    const keyPair = await createKeypair(ctx.db, address, expiry ? Number(expiry) : undefined)
    if (!keyPair) {
      res.status(500).json({ error: 'Failed to create key pair' })
      return
    }
    console.log('keypair', keyPair)

    console.info(`Key stored for ${address}`)

    const { public_key, role, type } = keyPair

    res.json({ type, publicKey: public_key, expiry, role })
  })
}
