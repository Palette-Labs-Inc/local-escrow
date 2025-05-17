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
import type * as XyzNoshdeliveryV0CatalogDefs from './defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'xyz.noshdelivery.v0.catalog.putCatalogObject'

export interface QueryParams {}

export interface InputSchema {
  merchantLocation: string
  type: 'catalog' | 'collection' | 'item' | 'modifierGroup' | 'modifier'
  data: $Typed<Catalog> | $Typed<Collection> | $Typed<Item> | { $type: string }
}

export interface OutputSchema {
  catalogObject:
    | $Typed<XyzNoshdeliveryV0CatalogDefs.CatalogView>
    | $Typed<XyzNoshdeliveryV0CatalogDefs.CollectionView>
    | $Typed<XyzNoshdeliveryV0CatalogDefs.ItemView>
    | { $type: string }
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

export interface Catalog {
  $type?: 'xyz.noshdelivery.v0.catalog.putCatalogObject#catalog'
  externalId?: string
  name: string
  merchantLocation?: string
  availabilityPeriods?: XyzNoshdeliveryV0CatalogDefs.AvailabilityPeriod[]
  /** Pkeys of xyz.noshdelivery.v0.catalog.collection records that belong in this catalog. Ordered in the way they will be presented. */
  collections?: string[]
}

const hashCatalog = 'catalog'

export function isCatalog<V>(v: V) {
  return is$typed(v, id, hashCatalog)
}

export function validateCatalog<V>(v: V) {
  return validate<Catalog & V>(v, id, hashCatalog)
}

export interface Collection {
  $type?: 'xyz.noshdelivery.v0.catalog.putCatalogObject#collection'
  /** An external ID that can be used to identify this object in an external system such as a warehousing system */
  externalId?: string
  name: string
  collections?: string[]
  /** Pkeys of xyz.noshdelivery.v0.catalog.item records that are in this collection. Ordered in the way they will be presented. */
  items?: string[]
}

const hashCollection = 'collection'

export function isCollection<V>(v: V) {
  return is$typed(v, id, hashCollection)
}

export function validateCollection<V>(v: V) {
  return validate<Collection & V>(v, id, hashCollection)
}

export interface Item {
  $type?: 'xyz.noshdelivery.v0.catalog.putCatalogObject#item'
  /** An external ID that can be used to identify this object in an external system such as a warehousing system */
  externalId?: string
  /** The item is currently available for ordering at this location */
  suspended: boolean
  name: string
  description?: string
  priceMoney: XyzNoshdeliveryV0CatalogDefs.PriceMoney
  /** Pkeys of xyz.noshdelivery.v0.catalog.modifierGroup records that belong in this item. Ordered in the way they will be presented. */
  modifierGroups?: string[]
}

const hashItem = 'item'

export function isItem<V>(v: V) {
  return is$typed(v, id, hashItem)
}

export function validateItem<V>(v: V) {
  return validate<Item & V>(v, id, hashItem)
}
