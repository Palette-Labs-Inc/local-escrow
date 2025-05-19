import { AtpAgent } from '@atproto/api'
import {
  XyzNoshdeliveryV0CatalogCatalog,
  XyzNoshdeliveryV0CatalogCollection,
  XyzNoshdeliveryV0CatalogItem,
  ComAtprotoRepoListRecords,
  XyzNoshdeliveryV0CatalogModifierGroup,
  XyzNoshdeliveryV0CatalogModifier,
} from 'lexicon'
import { AtUri } from '@atproto/api'
import type { Catalog, Catalogs, Collection, Item, Modifier, ModifierGroup } from '../types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { TID } from '../lib/tid'

const REPO = 'did:plc:ufa7rl6agtfdqje6bant3wsb'
const pdsClient = new AtpAgent({
  service: `http://localhost:3001`,
})

async function listRecords<T>(collection: string) {
  const response = await pdsClient.com.atproto.repo.listRecords({
    repo: REPO,
    collection,
  })
  return response.data.records as (ComAtprotoRepoListRecords.Record & {
    value: T
  })[]
}

function extractRkey(uri: string) {
  const uriObj = new AtUri(uri)
  return uriObj.rkey
}

function listToMap<T extends { uri: string; value: any }>(list: T[], recordToObject: (record: T) => any) {
  return list.reduce((acc: Record<string, any>, item) => {
    acc[extractRkey(item.uri)] = recordToObject(item)
    return acc
  }, {})
}

type CatalogRecord = ComAtprotoRepoListRecords.Record & {
  value: XyzNoshdeliveryV0CatalogCatalog.Record
}
type CollectionRecord = ComAtprotoRepoListRecords.Record & {
  value: XyzNoshdeliveryV0CatalogCollection.Record
}
type ItemRecord = ComAtprotoRepoListRecords.Record & {
  value: XyzNoshdeliveryV0CatalogItem.Record
}
type ModifierGroupRecord = ComAtprotoRepoListRecords.Record & {
  value: XyzNoshdeliveryV0CatalogModifierGroup.Record
}
type ModifierRecord = ComAtprotoRepoListRecords.Record & {
  value: XyzNoshdeliveryV0CatalogModifier.Record
}

// This should not be done ad-hoc. The best solution to convert records with backward and forward
// compatibility seems to be Cambria, which is meant specifically for this purpose.
function recordToCatalog(record: CatalogRecord): Catalog {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    merchantLocation: record.value.merchantLocation,
    // description: record.value.description, // TODO: add description to lexicon
    collections: record.value.collections ?? [],
    availabilityPeriods: record.value.availabilityPeriods,
  }
}

function recordToCollection(record: CollectionRecord): Collection {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    // description: record.value.description,
    childCollections: record.value.childCollections ?? [],
    // media: record.value.media,
    items: record.value.items ?? [],
  }
}

function recordToItem(record: ItemRecord): Item {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    priceMoney: record.value.priceMoney,
    suspended: record.value.suspended,
    modifierGroups: record.value.modifierGroups ?? [],
  }
}

function recordToModifierGroup(record: ModifierGroupRecord): ModifierGroup {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    minimumSelection: record.value.minimumSelection,
    maximumSelection: record.value.maximumSelection,
    maximumOfEachModifier: record.value.maximumOfEachModifier,
    modifiers: record.value.modifiers ?? [],
  }
}

function recordToModifier(record: ModifierRecord): Modifier {
  return {
    id: extractRkey(record.uri),
    name: record.value.name,
    priceMoney: record.value.priceMoney,
    suspended: record.value.suspended,
    childModifierGroups: record.value.childModifierGroups ?? [],
  }
}

async function fetchCatalog(): Promise<Catalogs> {
  const catalogResponse = await listRecords<XyzNoshdeliveryV0CatalogCatalog.Record>(
    'xyz.noshdelivery.v0.catalog.catalog',
  )
  const collectionResponse = await listRecords<XyzNoshdeliveryV0CatalogCollection.Record>(
    'xyz.noshdelivery.v0.catalog.collection',
  )
  const itemResponse = await listRecords<XyzNoshdeliveryV0CatalogItem.Record>('xyz.noshdelivery.v0.catalog.item')
  const modifierGroupResponse = await listRecords<XyzNoshdeliveryV0CatalogModifierGroup.Record>(
    'xyz.noshdelivery.v0.catalog.modifierGroup',
  )
  const modifierResponse = await listRecords<XyzNoshdeliveryV0CatalogModifier.Record>(
    'xyz.noshdelivery.v0.catalog.modifier',
  )
  return {
    catalogs: listToMap(catalogResponse, recordToCatalog),
    collections: listToMap(collectionResponse, recordToCollection),
    items: listToMap(itemResponse, recordToItem),
    modifierGroups: listToMap(modifierGroupResponse, recordToModifierGroup),
    modifiers: listToMap(modifierResponse, recordToModifier),
  }
}

type CatalogObjectPair =
  | { type: 'xyz.noshdelivery.v0.catalog.catalog'; object: Partial<Catalog> }
  | { type: 'xyz.noshdelivery.v0.catalog.collection'; object: Partial<Collection> }
  | { type: 'xyz.noshdelivery.v0.catalog.item'; object: Partial<Item> }
  | { type: 'xyz.noshdelivery.v0.catalog.modifierGroup'; object: Partial<ModifierGroup> }
  | { type: 'xyz.noshdelivery.v0.catalog.modifier'; object: Partial<Modifier> }

export function useCatalog() {
  const { data: catalogs, refetch: refetchCatalog } = useQuery({
    queryKey: ['catalogs'],
    queryFn: fetchCatalog,
  })

  const { mutate: putRecord } = useMutation({
    mutationFn: async ({ type, object }: CatalogObjectPair) => {
      const { id, ...rest } = object
      const result = await pdsClient.com.atproto.repo.putRecord({
        repo: REPO,
        collection: type,
        rkey: id || TID.nextStr(),
        record: rest,
      })
      refetchCatalog()
      return result.data.uri
    },
  })

  return { catalogs, putRecord }
}
