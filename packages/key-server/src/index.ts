import events from 'node:events'
import fs from 'node:fs'
import type http from 'node:http'
import path from 'node:path'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { pino } from 'pino'
import { Request, Response, NextFunction } from 'express'

import API, { health } from '#/api'
import type { AppContext } from '#/context'
import * as error from '#/error'
import { env } from '#/env'
import { createDb, migrateToLatest } from './db'
import { listenToEscrowCreated } from './blockchain'
import { createPublicClient, http as viemHttp } from 'viem'
import type { PublicClient } from 'viem'
import 'fake-indexeddb/auto'
import { baseSepolia } from 'viem/chains'

export class Server {
  constructor(
    public app: express.Application,
    public server: http.Server,
    public ctx: AppContext,
  ) {}

  static async create() {
    const { NODE_ENV, HOST, PORT } = env
    const logger = pino({ name: 'server start' })

    // Set up the SQLite database
    const db = createDb('./db.sqlite')
    await migrateToLatest(db)

    const client = createPublicClient({
      chain: baseSepolia,
      transport: viemHttp('https://base-sepolia.g.alchemy.com/v2/alcht_Va64Bg4LImclXeKet6ltyISGpaRKAg'),
    }) as PublicClient

    const ctx = {
      db,
      logger,
      client,
    }

    listenToEscrowCreated(ctx)

    const app = express()
    app.use(cors({ maxAge: 1000 * 60 * 60 * 24 }))
    app.use(compression())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err)
      res.status(500).json({ error: 'Internal server error' })
    })
    // app.use(pinoHttp({ logger }))

    API(app, ctx)

    app.use(health.createRouter(ctx))
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
  const server = await Server.create()

  const onCloseSignal = async () => {
    setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
    await server.close()
    process.exit(0)
  }

  process.on('SIGINT', onCloseSignal)
  process.on('SIGTERM', onCloseSignal)
}

run()
