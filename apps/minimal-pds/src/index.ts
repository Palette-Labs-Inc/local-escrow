import events from 'node:events'
import fs from 'node:fs'
import type http from 'node:http'
import path from 'node:path'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { pino } from 'pino'

import API from '#/api'
import type { AppContext } from '#/context'
import * as error from '#/error'
import { createServer } from '#/lexicon'
import { env } from '#/env'
import { XRPCError } from '@atproto/xrpc-server'
import { createDb, migrateToLatest } from './db'
import { AccountManager } from './services/account'
export class Server {
  constructor(
    public app: express.Application,
    public server: http.Server,
    public ctx: AppContext,
  ) {}

  static async create() {
    const { NODE_ENV, HOST, PORT } = env
    const logger = pino({ name: 'server start' })

    // Create the atproto utilities
    // const oauthClient = await createClient(db)
    // const baseIdResolver = createIdResolver()
    // const resolver = createBidirectionalResolver(baseIdResolver)

    const db = createDb(path.resolve(__dirname, 'db.sqlite'))
    await migrateToLatest(db)

    const ctx = {
      logger,
      db,
      accountManager: new AccountManager(db),
    }

    // Subscribe to events on the firehose
    // ingester.start()

    const app = express()
    app.use(cors({ maxAge: 1000 * 60 * 60 * 24 }))
    app.use(compression())
    // app.use(auth.createRouter(ctx))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // Create our server
    let server = createServer({
      validateResponse: env.isDevelopment,
      payload: {
        jsonLimit: 100 * 1024, // 100kb
        textLimit: 100 * 1024, // 100kb
        // no blobs
        // blobLimit: 0,
      },
      errorParser: (err: unknown) => {
        console.log(err)
        return new XRPCError(500, (err as Error).message || 'hello', undefined, (err as Error).stack?.split('\n'))
      },
    })

    server = API(server, ctx)

    // app.use(oauth.createRouter(ctx))
    app.use(server.xrpc.router)
    app.use(error.createHandler(ctx))

    // Serve static files from the frontend build - prod only
    if (env.isProduction) {
      const frontendPath = path.resolve(__dirname, '../../../packages/client/dist')

      // Check if the frontend build exists
      if (fs.existsSync(frontendPath)) {
        logger.info(`Serving frontend static files from: ${frontendPath}`)

        // Serve static files
        app.use(express.static(frontendPath))

        // For any other requests, send the index.html file
        app.get('*', (req, res) => {
          // Only handle non-API paths
          if (!req.path.startsWith('/xrpc/')) {
            res.sendFile(path.join(frontendPath, 'index.html'))
          } else {
            res.status(404).json({ error: 'API endpoint not found' })
          }
        })
      } else {
        logger.warn(`Frontend build not found at: ${frontendPath}`)
        app.use('*', (_req, res) => {
          res.sendStatus(404)
        })
      }
    } else {
      app.set('trust proxy', true)
    }

    // Use the port from env (should be 3001 for the API server)
    const httpServer = app.listen(PORT)
    await events.once(httpServer, 'listening')
    logger.info(`API Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`)

    return new Server(app, httpServer, ctx)
  }

  async close() {
    this.ctx.logger.info('sigint received, shutting down')
    // await this.ctx.ingester.destroy()
    await new Promise<void>((resolve) => {
      this.server.close(() => {
        this.ctx.logger.info('server closed')
        resolve()
      })
    })
  }
}

const run = async () => {
  // Only auto-start the server if not in test mode
  if (process.env.NODE_ENV !== 'test') {
    const server = await Server.create()

    const onCloseSignal = async () => {
      setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
      await server.close()
      process.exit(0)
    }

    process.on('SIGINT', onCloseSignal)
    process.on('SIGTERM', onCloseSignal)
  }
}

run()
