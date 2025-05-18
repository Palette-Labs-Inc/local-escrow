import { describe, beforeAll, afterAll, it, expect } from '@jest/globals'
import { Server } from '../src/index'
import { AtpAgent } from '@atproto/api'
import { TID } from '@atproto/common'

const REPO = 'did:plc:ufa7rl6agtfdqje6bant3wsb'
describe('PDS Server', () => {
  let server: Server
  let client: AtpAgent

  beforeAll(async () => {
    // Start the server
    server = await Server.create()

    // Create an XRPC client pointing to the server
    client = new AtpAgent({
      service: `http://localhost:${process.env.PORT || 3001}`,
    })
  })

  afterAll(async () => {
    if (server) {
      await server.close()
    }
  })

  it('should start and list records', async () => {
    // Not an awesome test. There is no health check endpoint.
    const response = await client.com.atproto.repo.listRecords({
      repo: REPO,
      collection: 'xyz.noshdelivery.v0.merchant.group',
    })
    expect(response.data.records).toBeTruthy()
  })

  it('should create a record', async () => {
    const rkey = TID.nextStr()
    const putResponse = await client.com.atproto.repo.putRecord({
      repo: REPO,
      collection: 'xyz.noshdelivery.v0.merchant.group',
      rkey,
      record: {
        tid: rkey,
        data: {
          name: 'test',
        },
      },
    })
    const listResponse = await client.com.atproto.repo.listRecords({
      repo: REPO,
      collection: 'xyz.noshdelivery.v0.merchant.group',
    })
    expect(listResponse.data.records.findIndex((r) => r.uri === putResponse.data.uri)).not.toBe(-1)
  })

  it.only('should update a record', async () => {
    const rkey = TID.nextStr()
    await client.com.atproto.repo.putRecord({
      repo: REPO,
      collection: 'xyz.noshdelivery.v0.merchant.group',
      rkey,
      record: {
        tid: rkey,
        data: {
          name: 'test',
        },
      },
    })
    const putResponse = await client.com.atproto.repo.putRecord({
      repo: REPO,
      collection: 'xyz.noshdelivery.v0.merchant.group',
      rkey,
      record: {
        tid: rkey,
        data: {
          name: 'test2',
        },
      },
    })
    const listResponse = await client.com.atproto.repo.listRecords({
      repo: REPO,
      collection: 'xyz.noshdelivery.v0.merchant.group',
    })
    console.log('listResponse', listResponse.data.records)
    const record = listResponse.data.records.find((r) => r.uri === putResponse.data.uri)
    expect(record).toBeTruthy()
    expect((record?.value as any).data.name).toBe('test2')
  })
})
