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
const id = 'xyz.noshdelivery.v0.catalog.modifierGroup'

export interface Record {
  $type: 'xyz.noshdelivery.v0.catalog.modifierGroup'
  /** An external ID that can be used to identify this object in an external system such as a warehousing system */
  externalId?: string
  name: string
  description?: string
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  /** Minimum number of options that must be selected from this group. 0 means it is optional. */
  minimumSelection: number
  /** Maximum number of options that can be selected from this group. 1 means it is a single select (radio-button). */
  maximumSelection: number
  /** Quantity of each modifier you can at most select. For example if you were selecting a dozen donuts with at most 3 of each variety this would be set to 3 with maximum and minimum selections to 1and2. 0 means no limit up to group maximum. */
  maximumOfEachModifier: number
  /** Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this item. Ordered in the way they will be presented. */
  modifiers?: string[]
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
