import type { ErrorRequestHandler } from 'express'

import { AppContext } from '#/context'

export const createHandler: (ctx: AppContext) => ErrorRequestHandler = (ctx) => (err, _req, res, next) => {
  ctx.logger.error('unexpected internal server error', err)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ error: 'Internal Server Error' })
}
