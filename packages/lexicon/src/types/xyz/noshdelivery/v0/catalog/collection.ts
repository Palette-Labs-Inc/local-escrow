/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../../lexicons'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../../util'
import type * as XyzNoshdeliveryV0MediaDefs from '../media/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.collection'

export interface Record {
  $type: 'xyz.noshdelivery.v0.catalog.collection'
  /** An external ID that can be used to identify this object in an external system such as a warehousing system */
  externalId?: string
  name: string
  childCollections?: string[]
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  /** Pkeys of xyz.noshdelivery.v0.catalog.item records that are in this collection. Ordered in the way they will be presented. */
  items?: string[]
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
