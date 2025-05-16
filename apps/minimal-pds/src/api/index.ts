import type { AppContext } from '#/context'
import type { Server } from '#/lexicon'
import listRecords from './lexicon/atproto/listRecords'
import putRecord from './lexicon/atproto/putRecord'

export default function (server: Server, ctx: AppContext) {
  listRecords(server, ctx)
  putRecord(server, ctx)
  return server
}
