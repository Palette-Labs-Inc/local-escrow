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
import type * as XyzNoshdeliveryV0MediaImage from '../media/image.js'
import type * as XyzNoshdeliveryV0MerchantDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.merchant.putGroup'

export interface QueryParams {}

export interface InputSchema {
  externalId?: string
  name: string
  logo?: XyzNoshdeliveryV0MediaImage.Main
}

export interface OutputSchema {
  groups: XyzNoshdeliveryV0MerchantDefs.GroupView[]
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
