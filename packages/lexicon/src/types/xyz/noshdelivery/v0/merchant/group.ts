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
import type * as XyzNoshdeliveryV0MediaImage from '../media/image.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.merchant.group'

export interface Record {
  $type: 'xyz.noshdelivery.v0.merchant.group'
  externalId?: string
  name: string
  logo?: XyzNoshdeliveryV0MediaImage.Main
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
