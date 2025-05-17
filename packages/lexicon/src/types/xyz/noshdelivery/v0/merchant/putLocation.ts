/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
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
import type * as XyzNoshdeliveryV0MerchantDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.merchant.putLocation'

export interface QueryParams {}

export interface InputSchema {
  /** The tid of the merchant group. */
  groupTid: string
  /** The external id of the merchant location. */
  externalId?: string
  /** The name of the merchant location. */
  name: string
  address: CommunityLexiconLocationAddress.Main
  coordinates: CommunityLexiconLocationGeo.Main
  /** The timezone of the merchant location. */
  timezone: string
  /** The uri of the merchant group. */
  parentGroup: string
}

export interface OutputSchema {
  locations: XyzNoshdeliveryV0MerchantDefs.LocationView[]
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
  qp?: QueryParams
  encoding?: 'application/json'
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}
