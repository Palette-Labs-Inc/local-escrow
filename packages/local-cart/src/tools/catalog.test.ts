import { Catalog, Collection, Item, Modifier, ModifierGroup, pruneCatalogs } from './catalog'
import dayjs from 'dayjs'

function listToMap<T extends { id: string }>(objects: T[]) {
  return Object.fromEntries(objects.map((obj) => [obj.id, obj]))
}

function makeCatalogs() {
  const catalog: Catalog = {
    id: '1',
    name: 'Test Catalog',
    description: 'Test Description',
    merchantLocation: '1',
    availabilityPeriods: [
      {
        dayOfWeek: 'MONDAY',
        start: {
          localHour: 10,
          localMinute: 0,
        },
        end: {
          localHour: 18,
          localMinute: 0,
        },
      },
    ],
    collections: ['1'],
  }
  const collection: Collection = {
    id: '1',
    name: 'Test Collection',
    description: 'Test Description',
    items: ['1', '2'],
    childCollections: [],
  }
  const item1: Item = {
    id: '1',
    name: 'Test Item 1',
    description: 'Test Description',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    modifierGroups: ['1'],
  }
  const item2: Item = {
    id: '2',
    name: 'Test Item 2',
    description: 'Test Description',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    modifierGroups: ['1'],
  }
  const modifierGroup1: ModifierGroup = {
    id: '1',
    name: 'Test Modifier Group 1',
    minimumSelection: 0,
    maximumSelection: 1,
    maximumOfEachModifier: 1,
    modifiers: ['1'],
  }

  const modifier1 = {
    id: '1',
    name: 'Test Modifier 1',
    priceMoney: {
      currency: 'USD',
      amount: 10,
    },
    suspended: false,
    childModifierGroups: [],
  }

  return {
    catalogs: listToMap([catalog]),
    collections: listToMap([collection]),
    items: listToMap([item1, item2]),
    modifierGroups: listToMap([modifierGroup1]),
    modifiers: listToMap([modifier1]),
  }
}

describe('catalogs', () => {
  describe('pruneCatalogs', () => {
    it('should leave catalog unchanged if everything is available', () => {
      const catalogs = makeCatalogs()
      const mondayMidDay = dayjs().tz('America/New_York').day(1).hour(13).minute(0).toDate()
      const prunedCatalogs = pruneCatalogs(catalogs, mondayMidDay, 'America/New_York')
      expect(prunedCatalogs).toEqual(catalogs)
    })
    it('should remove unavailable items', () => {
      const catalogs = makeCatalogs()
      catalogs.items['1'].suspended = true
      const mondayMidDay = dayjs().tz('America/New_York').day(1).hour(13).minute(0).toDate()
      const prunedCatalogs = pruneCatalogs(catalogs, mondayMidDay, 'America/New_York')
      expect(prunedCatalogs.items['1']).toBeUndefined()
      expect(prunedCatalogs.collections['1'].items).toEqual(['2'])
    })
    it('should cascade removals', () => {
      const catalogs = makeCatalogs()
      catalogs.modifierGroups['1'].minimumSelection = 2
      catalogs.modifierGroups['1'].maximumSelection = 2
      const mondayMidDay = dayjs().tz('America/New_York').day(1).hour(13).minute(0).toDate()
      const prunedCatalogs = pruneCatalogs(catalogs, mondayMidDay, 'America/New_York')
      expect(prunedCatalogs).toEqual({
        catalogs: {},
        collections: {},
        items: {},
        modifierGroups: {},
        modifiers: {},
      })
    })
  })
})
