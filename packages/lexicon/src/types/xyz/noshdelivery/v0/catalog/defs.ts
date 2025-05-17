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
const id = 'xyz.noshdelivery.v0.catalog.defs'

export interface PriceMoney {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#priceMoney'
  currency: string
  /** The amount in the smallest unit of the currency. For example cents. */
  amount: number
}

const hashPriceMoney = 'priceMoney'

export function isPriceMoney<V>(v: V) {
  return is$typed(v, id, hashPriceMoney)
}

export function validatePriceMoney<V>(v: V) {
  return validate<PriceMoney & V>(v, id, hashPriceMoney)
}

export interface CatalogView {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#catalogView'
  uri: string
  externalId?: string
  name: string
  availabilityPeriods?: AvailabilityPeriod[]
  /** Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented. */
  childCollections?: string[]
}

const hashCatalogView = 'catalogView'

export function isCatalogView<V>(v: V) {
  return is$typed(v, id, hashCatalogView)
}

export function validateCatalogView<V>(v: V) {
  return validate<CatalogView & V>(v, id, hashCatalogView)
}

export interface CollectionView {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#collectionView'
  uri: string
  externalId?: string
  name: string
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  /** Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented. */
  childCollections?: string[]
  /** Pkeys of xyz.noshdelivery.v0.catalog.item records that belong in this collection. Ordered in the way they will be presented. */
  items?: string[]
}

const hashCollectionView = 'collectionView'

export function isCollectionView<V>(v: V) {
  return is$typed(v, id, hashCollectionView)
}

export function validateCollectionView<V>(v: V) {
  return validate<CollectionView & V>(v, id, hashCollectionView)
}

export interface ItemView {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#itemView'
  uri: string
  externalId?: string
  /** The item is currently suspended from ordering */
  suspended: boolean
  name: string
  description?: string
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  priceMoney?: PriceMoney
  /** Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this collection. Ordered in the way they will be presented. */
  modifiersGroups?: string[]
}

const hashItemView = 'itemView'

export function isItemView<V>(v: V) {
  return is$typed(v, id, hashItemView)
}

export function validateItemView<V>(v: V) {
  return validate<ItemView & V>(v, id, hashItemView)
}

export interface ModifierGroupView {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#modifierGroupView'
  uri: string
  externalId?: string
  name: string
  description?: string
  media?: XyzNoshdeliveryV0MediaDefs.MediaView
  /** Minimum number of options that must be selected from this group. 0 means it is optional. */
  minimumSelection: number
  /** Maximum number of options that can be selected from this group. 1 means it is a single select. */
  maximumSelection: number
  /** Quantity of each modifier you can at most select. For example if you were selecting a dozen donuts with at most 3 of each variety this would be set to 3 with maximum and minimum selections to 1and2. 0 means no limit up to group maximum. */
  maximumOfEachModifier: number
  /** Pkeys of xyz.noshdelivery.v0.catalog.modifier records that belong in this collection. Ordered in the way they will be presented. */
  modifiers?: string[]
}

const hashModifierGroupView = 'modifierGroupView'

export function isModifierGroupView<V>(v: V) {
  return is$typed(v, id, hashModifierGroupView)
}

export function validateModifierGroupView<V>(v: V) {
  return validate<ModifierGroupView & V>(v, id, hashModifierGroupView)
}

export interface ModifierView {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#modifierView'
  uri: string
  externalId?: string
  /** The modifier group is currently suspended from ordering */
  suspended: boolean
  name: string
  description?: string
  priceMoney: PriceMoney
  /** Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that are children of this modifier. Ordered in the way they will be presented. */
  childModifierGroups?: string[]
}

const hashModifierView = 'modifierView'

export function isModifierView<V>(v: V) {
  return is$typed(v, id, hashModifierView)
}

export function validateModifierView<V>(v: V) {
  return validate<ModifierView & V>(v, id, hashModifierView)
}

export interface AvailabilityPeriod {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#availabilityPeriod'
  start: AvailabilityTimeOfDay
  end: AvailabilityTimeOfDay
  dayOfWeek:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
}

const hashAvailabilityPeriod = 'availabilityPeriod'

export function isAvailabilityPeriod<V>(v: V) {
  return is$typed(v, id, hashAvailabilityPeriod)
}

export function validateAvailabilityPeriod<V>(v: V) {
  return validate<AvailabilityPeriod & V>(v, id, hashAvailabilityPeriod)
}

export interface AvailabilityTimeOfDay {
  $type?: 'xyz.noshdelivery.v0.catalog.defs#availabilityTimeOfDay'
  localHour: number
  localMinute: number
}

const hashAvailabilityTimeOfDay = 'availabilityTimeOfDay'

export function isAvailabilityTimeOfDay<V>(v: V) {
  return is$typed(v, id, hashAvailabilityTimeOfDay)
}

export function validateAvailabilityTimeOfDay<V>(v: V) {
  return validate<AvailabilityTimeOfDay & V>(v, id, hashAvailabilityTimeOfDay)
}
