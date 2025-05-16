import { AppContext } from '#/context'
import { Database } from '#/db'
import { Server } from '#/lexicon'
import { DatabaseSchema } from '#/types'
import { cborToLexRecord } from '@atproto/repo'

async function listRecordsForCollection(opts: {
  db: Database<DatabaseSchema>
  collection: string
  limit: number
  reverse: boolean
  cursor?: string
  rkeyStart?: string
  rkeyEnd?: string
  includeSoftDeleted?: boolean
}): Promise<{ uri: string; cid: string; value: Record<string, unknown> }[]> {
  const { collection, limit, reverse, cursor, rkeyStart, rkeyEnd, includeSoftDeleted = false } = opts

  let builder = opts.db.db
    .selectFrom('record')
    .innerJoin('repo_block', 'repo_block.cid', 'record.cid')
    .where('record.collection', '=', collection)
    // .if(!includeSoftDeleted, (qb) => qb.where(notSoftDeletedClause(ref('record'))))
    .orderBy('record.rkey', reverse ? 'asc' : 'desc')
    .limit(limit)
    .selectAll()

  // prioritize cursor but fall back to soon-to-be-depcreated rkey start/end
  // if (cursor !== undefined) {
  //   if (reverse) {
  //     builder = builder.where('record.rkey', '>', cursor)
  //   } else {
  //     builder = builder.where('record.rkey', '<', cursor)
  //   }
  // } else {
  //   if (rkeyStart !== undefined) {
  //     builder = builder.where('record.rkey', '>', rkeyStart)
  //   }
  //   if (rkeyEnd !== undefined) {
  //     builder = builder.where('record.rkey', '<', rkeyEnd)
  //   }
  // }
  const res = await builder.execute()
  return res.map((row) => {
    return {
      uri: row.uri,
      cid: row.cid,
      value: cborToLexRecord(row.content),
    }
  })
}

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.listRecords({
    handler: async ({ params }) => {
      const records = await listRecordsForCollection({
        db: ctx.db,
        collection: params.collection,
        limit: params.limit,
        reverse: false,
        cursor: undefined,
      })
      return {
        encoding: 'application/json',
        body: {
          records,
        },
      }
    },
  })
}
