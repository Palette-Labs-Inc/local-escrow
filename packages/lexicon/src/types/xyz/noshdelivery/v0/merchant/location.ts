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
import type * as CommunityLexiconLocationAddress from '../../../../community/lexicon/location/address.js'
import type * as CommunityLexiconLocationGeo from '../../../../community/lexicon/location/geo.js'
import type * as XyzNoshdeliveryV0MediaDefs from '../media/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.merchant.location'

export interface Record {
  $type: 'xyz.noshdelivery.v0.merchant.location'
  /** The uri for the merchant group that this location belongs to. */
  parentGroup: string
  externalId?: string
  name: string
  timezone: string
  address: CommunityLexiconLocationAddress.Main
  coordinates: CommunityLexiconLocationGeo.Main
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
