import { AppContext } from '#/context'
import { createKeypair, getKeypair } from '#/db'
import { Express, RequestHandler } from 'express'
import { Address } from 'ox'
export * as health from './health'
import keyApi from './key'
import orderApi from './order'

export default function (app: Express, ctx: AppContext) {
  keyApi(app, ctx)
  orderApi(app, ctx)

  return app
}
