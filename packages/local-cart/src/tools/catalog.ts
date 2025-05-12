import { isActiveCatalog } from './time'
import memoize from 'lodash.memoize'

type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export interface Money {
  currency: string
  amount: number
}

export interface AvailabilityTimeOfDay {
  localHour: number
  localMinute: number
}

export interface AvailabilityPeriod {
  dayOfWeek: DayOfWeek
  start: AvailabilityTimeOfDay
  end: AvailabilityTimeOfDay
}

export interface Catalog {
  id: string
  name: string
  description?: string
  merchantLocation: string
  collections: string[]
  availabilityPeriods?: AvailabilityPeriod[]
}

export interface Collection {
  id: string
  name: string
  description?: string
  items: string[]
  childCollections: string[]
}

export interface Item {
  id: string
  name: string
  priceMoney: Money
  description?: string
  suspended: boolean
  modifierGroups: string[]
}

export interface ModifierGroup {
  id: string
  name: string
  minimumSelection: number
  maximumSelection: number
  maximumOfEachModifier: number
  modifiers: string[]
}

export interface Modifier {
  id: string
  name: string
  priceMoney: Money
  suspended: boolean
  childModifierGroups: string[]
}

export interface Catalogs {
  catalogs: Record<string, Catalog>
  collections: Record<string, Collection>
  items: Record<string, Item>
  modifierGroups: Record<string, ModifierGroup>
  modifiers: Record<string, Modifier>
}

/**
 * @param date - The date to check the catalog availability for
 * @param timezone - The timezone that the catalog schedule is referring to
 * @returns The catalogs but without any items that are suspended or unavailable for some reason
 */
export function pruneCatalogs(catalogs: Catalogs, date: Date, timezone: string): Catalogs {
  const isModifierAvailable = memoize((modifierId: string): boolean => {
    const modifier = catalogs.modifiers[modifierId]
    if (!modifier) {
      return false
    }
    return !modifier.suspended
  })

  const isModifierGroupAvailable = memoize((modifierGroupId: string): boolean => {
    const modifierGroup = catalogs.modifierGroups[modifierGroupId]
    if (!modifierGroup) {
      return false
    }
    const availableModifiers = modifierGroup.modifiers.filter((modifierId) => isModifierAvailable(modifierId))

    if (
      modifierGroup.maximumOfEachModifier &&
      modifierGroup.minimumSelection &&
      availableModifiers.length * modifierGroup.maximumOfEachModifier < modifierGroup.minimumSelection
    ) {
      return false
    }

    // TODO child modifier groups

    return availableModifiers.length > 0 && availableModifiers.length >= modifierGroup.minimumSelection
  })

  const isItemAvailable = memoize((itemId: string): boolean => {
    const item = catalogs.items[itemId]
    if (!item || item.suspended) {
      return false
    }
    const requiredGroups = item.modifierGroups.filter(
      (modifierGroupId) =>
        catalogs.modifierGroups[modifierGroupId] && catalogs.modifierGroups[modifierGroupId].minimumSelection > 0,
    )

    const unavailableRequiredGroups = requiredGroups.filter(
      (modifierGroupId) => !isModifierGroupAvailable(modifierGroupId),
    )

    if (unavailableRequiredGroups.length > 0) {
      return false
    }

    return true
  })

  const isCollectionAvailable = memoize((collectionId: string): boolean => {
    const collection = catalogs.collections[collectionId]
    if (!collection) {
      return false
    }
    return collection.items.some((itemId) => isItemAvailable(itemId))
  })

  const isCatalogAvailable = memoize((catalogId: string): boolean => {
    const catalog = catalogs.catalogs[catalogId]
    if (!catalog) {
      return false
    }
    return (
      // TODO add time parameter
      isActiveCatalog(catalog.availabilityPeriods || [], date, timezone) &&
      catalog.collections.some((collectionId) => isCollectionAvailable(collectionId))
    )
  })

  function isTruthy<T>(arg: T | undefined): arg is T {
    return Boolean(arg)
  }

  function listToMap<T extends { id: string }>(objects: T[]) {
    return Object.fromEntries(objects.map((obj) => [obj.id, obj]))
  }

  const populateModifiers = (completeCatalog: Catalogs, modifierIds: string[]): string[] => {
    const availableModifiers = modifierIds
      .map((modifierId) => catalogs.modifiers[modifierId])
      .filter(isTruthy)
      .filter((modifier) => isModifierAvailable(modifier.id))
    const mappedModifiers = availableModifiers.map((modifier) => ({
      ...modifier,
      childModifierGroups: populateModifierGroups(completeCatalog, modifier.childModifierGroups),
    }))
    Object.assign(completeCatalog.modifiers, listToMap(mappedModifiers))
    return mappedModifiers.map((modifier) => modifier.id)
  }

  const populateModifierGroups = (completeCatalog: Catalogs, modifierGroupIds: string[]): string[] => {
    const availableModifierGroups = modifierGroupIds
      .map((modifierGroupId) => catalogs.modifierGroups[modifierGroupId])
      .filter(isTruthy)
      .filter((modifierGroup) => isModifierGroupAvailable(modifierGroup.id))
    const mappedModifierGroups = availableModifierGroups.map((modifierGroup) => ({
      ...modifierGroup,
      modifiers: populateModifiers(completeCatalog, modifierGroup.modifiers),
    }))
    Object.assign(completeCatalog.modifierGroups, listToMap(mappedModifierGroups))
    return mappedModifierGroups.map((modifierGroup) => modifierGroup.id)
  }

  const populateItems = (completeCatalog: Catalogs, itemIds: string[]): string[] => {
    const availableItems = itemIds
      .map((itemId) => catalogs.items[itemId])
      .filter(isTruthy)
      .filter((item) => isItemAvailable(item.id))
    const mappedItems = availableItems.map((item) => ({
      ...item,
      modifierGroups: populateModifierGroups(completeCatalog, item.modifierGroups),
    }))
    Object.assign(completeCatalog.items, listToMap(mappedItems))
    return mappedItems.map((item) => item.id)
  }

  const populateCollections = (completeCatalog: Catalogs, collectionIds: string[]): string[] => {
    const availableCollections = collectionIds
      .map((collectionId) => catalogs.collections[collectionId])
      .filter(isTruthy)
      .filter((collection) => isCollectionAvailable(collection.id))
    const mappedCollections = availableCollections
      .map((collection) => {
        return {
          ...collection,
          items: populateItems(completeCatalog, collection.items),
        }
      })
      .filter((collection) => collection.items.length > 0)
    Object.assign(completeCatalog.collections, listToMap(mappedCollections))
    return mappedCollections.map((collection) => collection.id)
  }

  const populateCatalogs = (completeCatalog: Catalogs, catalogs: Catalog[]) => {
    // TODO chain to optimize
    const availableCatalogs = catalogs.filter((catalog) => isCatalogAvailable(catalog.id))
    const mappedCatalogs: Catalog[] = availableCatalogs
      .map((catalog) => ({
        ...catalog,
        collections: populateCollections(completeCatalog, catalog.collections),
      }))
      .filter((catalog) => catalog.collections.length > 0)
    completeCatalog.catalogs = listToMap(mappedCatalogs)
  }

  const completeCatalog: Catalogs = {
    catalogs: {},
    collections: {},
    items: {},
    modifierGroups: {},
    modifiers: {},
  }
  populateCatalogs(completeCatalog, Object.values(catalogs.catalogs))

  return completeCatalog
}
