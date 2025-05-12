import { addItemToCart, CartItem, itemsAreEquivalent, CartModifierGroup, Cart } from './cart'
import { Catalog, Collection, Item, ModifierGroup } from './catalog'

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

describe('cart', () => {
  describe('itemsAreEquivalent', () => {
    it('should return true for basic equivalent items', () => {
      const item1: CartItem = {
        itemId: '123',
        quantity: 1,
        modifierGroups: [],
      }
      const item2: CartItem = {
        itemId: '123',
        quantity: 1,
        modifierGroups: [],
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(true)
    })

    it('should ignore quantity', () => {
      const item1: CartItem = {
        itemId: '123',
        quantity: 1,
        modifierGroups: [],
      }
      const item2: CartItem = {
        itemId: '123',
        quantity: 2,
        modifierGroups: [],
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(true)
    })

    it('should compare modifier groups regardless of order', () => {
      const modifierGroup1: CartModifierGroup = {
        modifierGroupId: '123',
        modifiers: [
          {
            modifierId: '789',
            quantity: 1,
            childModifierGroups: [
              {
                modifierGroupId: '456',
                modifiers: [
                  {
                    modifierId: '123',
                    quantity: 1,
                  },
                ],
              },
            ],
          },
        ],
      }

      const modifierGroup2: CartModifierGroup = {
        modifierGroupId: '456',
        modifiers: [
          {
            modifierId: '123',
            quantity: 1,
            childModifierGroups: [
              {
                modifierGroupId: '789',
                modifiers: [
                  {
                    modifierId: '456',
                    quantity: 1,
                  },
                ],
              },
            ],
          },
        ],
      }

      const item1: CartItem = {
        itemId: '123',
        quantity: 1,
        modifierGroups: [modifierGroup1, modifierGroup2],
      }
      const item2: CartItem = {
        itemId: '123',
        quantity: 1,
        modifierGroups: [modifierGroup2, modifierGroup1],
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(true)
    })

    it('should treat items notes as not equivalent', () => {
      const item1: CartItem = {
        itemId: '123',
        quantity: 1,
        itemNotes: 'no spice!',
      }
      const item2: CartItem = {
        itemId: '123',
        quantity: 1,
        itemNotes: 'spicy!',
      }
      expect(itemsAreEquivalent(item1, item2)).toBe(false)
    })
  })
  describe('addItemToCart', () => {
    it('should add an item to the cart', () => {
      const cart: Cart = {
        id: '123',
        merchantId: '456',
        orderNotes: 'test',
        preferences: {
          deliveryType: 'DELIVERY',
          pickupType: 'PICKUP',
        },
        cartItems: [],
      }
      const item: CartItem = {
        itemId: '1',
        quantity: 2,
        modifierGroups: [],
      }
      addItemToCart(cart, item, makeCatalogs())
      expect(cart.cartItems).toEqual([item])
    })

    it('should increment quantity if item already exists', () => {
      const cart: Cart = {
        id: '123',
        merchantId: '456',
        orderNotes: 'test',
        preferences: {
          deliveryType: 'DELIVERY',
          pickupType: 'PICKUP',
        },
        cartItems: [
          {
            itemId: '1',
            quantity: 1,
            modifierGroups: [],
          },
        ],
      }
      const item: CartItem = {
        itemId: '1',
        quantity: 2,
        modifierGroups: [],
      }
      addItemToCart(cart, item, makeCatalogs())
      expect(cart.cartItems).toEqual([
        {
          itemId: '1',
          quantity: 3,
          modifierGroups: [],
        },
      ])
    })
  })
})
