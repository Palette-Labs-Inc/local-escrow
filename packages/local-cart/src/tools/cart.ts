import objectHash from 'object-hash'
import { Catalogs, ModifierGroup } from './catalog'
import cloneDeep from 'lodash.clonedeep'

export type fullfillmentType = 'DELIVERY' | 'PICKUP'

export interface Preferences {
  // In nosh we have global delivery and pickup preferences, not per-cart. This makes much simpler UX
  // but precludes  more complex functionality like group orders
  // fullfillmentType: fullfillmentType
  // address: Address
}

export interface CartModifierGroup {
  modifierGroupId: string
  modifiers: CartModifier[]
}

export interface CartModifier {
  modifierId: string
  quantity: number
  childModifierGroups?: CartModifierGroup[]
}

export interface CartItem {
  id: string
  itemId: string
  quantity: number
  itemNotes?: string
  modifierGroups?: CartModifierGroup[]
}

export interface Cart {
  merchantId: string
  orderNotes?: string
  preferences: Preferences
  cartItems: CartItem[]
}

export enum CartValidationErrorCode {
  MODIFIER_ABOVE_MAXIMUM = 'MODIFIER_ABOVE_MAXIMUM',
  MODIFIER_UNAVAILABLE = 'MODIFIER_UNAVAILABLE',
  ITEM_UNAVAILABLE = 'ITEM_UNAVAILABLE',
  MODIFIER_GROUP_UNAVAILABLE = 'MODIFIER_GROUP_UNAVAILABLE',
  MODIFIER_GROUP_TOTAL_ABOVE_MAXIMUM = 'MODIFIER_GROUP_TOTAL_ABOVE_MAXIMUM',
  MODIFIER_GROUP_TOTAL_BELOW_MINIMUM = 'MODIFIER_GROUP_TOTAL_BELOW_MINIMUM',
}

export class CartValidationError extends Error {
  catalogObjectId: string
  code: CartValidationErrorCode
  message: string

  constructor(catalogObjectId: string, code: CartValidationErrorCode, message: string) {
    super(message)
    this.catalogObjectId = catalogObjectId
    this.code = code
    this.message = message
  }
}

export type CartErrorMap = Partial<Record<string, CartValidationError[]>>

export function validateItem(
  itemId: string,
  modifierGroupValues: CartModifierGroup[],
  catalog: Catalogs,
): CartErrorMap {
  const errors: CartErrorMap = {}
  const catalogItem = catalog.items[itemId]
  if (!catalogItem) {
    // No way to recover here
    throw new CartValidationError(itemId, CartValidationErrorCode.ITEM_UNAVAILABLE, 'Group not part of catalog')
  }

  const catalogGroups = catalogItem.modifierGroups
    .map((groupId) => catalog.modifierGroups[groupId])
    .filter((group): group is ModifierGroup => !!group)

  for (const modifierGroup of catalogGroups) {
    const modifierGroupValue = modifierGroupValues.find((value) => value.modifierGroupId === modifierGroup.id) || {
      modifierGroupId: modifierGroup.id,
      modifiers: [],
    }
    extendErrorMap(itemId, errors, validateModifierGroup(modifierGroupValue, catalog))
  }

  return errors
}

export function validateModifierGroup(modifierGroupValues: CartModifierGroup, catalog: Catalogs): CartErrorMap {
  const groupErrorMap: CartErrorMap = {}

  const catalogGroup = catalog.modifierGroups[modifierGroupValues.modifierGroupId]
  if (!catalogGroup) {
    // No way to recover here
    throw new CartValidationError(
      modifierGroupValues.modifierGroupId,
      CartValidationErrorCode.MODIFIER_GROUP_UNAVAILABLE,
      'Group not part of catalog',
    )
  }

  const minSelection = catalogGroup.minimumSelection
  const maxSelection = catalogGroup.maximumSelection
  const maxPerModifier = catalogGroup.maximumOfEachModifier

  const modifierValues = modifierGroupValues.modifiers

  const total = modifierValues.reduce((sum, { quantity }) => {
    return sum + quantity
  }, 0)

  if (total < minSelection) {
    addError(
      modifierGroupValues.modifierGroupId,
      groupErrorMap,
      new CartValidationError(
        modifierGroupValues.modifierGroupId,
        CartValidationErrorCode.MODIFIER_GROUP_TOTAL_BELOW_MINIMUM,
        `Total quantity of modifiers for group is less than minimum of ${minSelection}.`,
      ),
    )
  }

  if (total > maxSelection) {
    addError(
      modifierGroupValues.modifierGroupId,
      groupErrorMap,
      new CartValidationError(
        modifierGroupValues.modifierGroupId,
        CartValidationErrorCode.MODIFIER_GROUP_TOTAL_ABOVE_MAXIMUM,
        `Total quantity of modifiers for group is greater than maximum of ${maxSelection}.`,
      ),
    )
  }

  for (const modifierId of catalogGroup.modifiers) {
    const modifierErrorMap: CartErrorMap = {}

    if (catalogGroup.modifiers.indexOf(modifierId) === -1) {
      // No way to recover from this one
      throw new CartValidationError(
        modifierId,
        CartValidationErrorCode.MODIFIER_UNAVAILABLE,
        'Modifier does not belong to modifier group',
      )
    }

    const modifierValue = modifierValues.find((value) => value.modifierId === modifierId)
    const quantity = modifierValue?.quantity || 0

    if (quantity > maxPerModifier && maxPerModifier !== 0) {
      addError(
        modifierGroupValues.modifierGroupId,
        modifierErrorMap,
        new CartValidationError(
          modifierGroupValues.modifierGroupId,
          CartValidationErrorCode.MODIFIER_GROUP_TOTAL_ABOVE_MAXIMUM,
          `Total quantity of modifiers for group is greater than maximum of ${maxSelection}.`,
        ),
      )
    }
    const catalogModifier = catalog.modifiers[modifierId]

    if (quantity && catalogModifier?.childModifierGroups) {
      for (const childGroupId of catalogModifier.childModifierGroups) {
        const childValue = modifierValue?.childModifierGroups?.find(
          (value) => value.modifierGroupId === childGroupId,
        ) || { modifierGroupId: childGroupId, modifiers: [] }
        extendErrorMap(modifierId, modifierErrorMap, validateModifierGroup(childValue, catalog))
      }
    }
    extendErrorMap(modifierGroupValues.modifierGroupId, groupErrorMap, modifierErrorMap)
  }

  return groupErrorMap
}

function getAllErrorValues(errorMap: CartErrorMap) {
  return Array.from(new Set(Object.values(errorMap).flat(1)).values())
}

// All catalog items/modifiers inherits the errors from their children so add the errors and also assign to
// the parent ID
export function extendErrorMap(parentItemId: string, currentErrors: CartErrorMap, childErrors: CartErrorMap) {
  const parentErrors = currentErrors[parentItemId] || []
  return Object.assign(
    currentErrors,
    { [parentItemId]: [...parentErrors, ...getAllErrorValues(childErrors)] },
    childErrors,
  )
}

function addError(catalogItemId: string, currentErrors: CartErrorMap, error: CartValidationError) {
  const serializeableError: CartValidationError = {
    name: 'CartValidationError',
    catalogObjectId: error.catalogObjectId,
    code: error.code,
    message: error.message,
  }

  if (currentErrors[catalogItemId]) {
    ;(currentErrors[catalogItemId] as CartValidationError[]).push(serializeableError)
  } else {
    currentErrors[catalogItemId] = [serializeableError]
  }
}

export interface CartItemModifierNested {
  id: string
  modifierGroupIds: string[]
  childModifierGroupIds: string[]
}

export function canAddGroupToItemModifier(
  modifierGroupId: string,
  itemModifierId: string,
  allModifiers: CartItemModifierNested[],
) {
  return validateItemModifierNestedSchema(itemModifierId, allModifiers, [], [modifierGroupId])
}

export function canAddItemModifierToGroup(
  itemModifierId: string,
  modifierGroupId: string,
  allModifiers: CartItemModifierNested[],
) {
  return validateModifierGroupSchema(modifierGroupId, allModifiers, [itemModifierId], [])
}

function validateItemModifierNestedSchema(
  itemModifierId: string,
  allModifiers: CartItemModifierNested[],
  existingItemModifierIds: string[],
  existingModifierGroupIds: string[],
) {
  const itemModifier = allModifiers.find((m) => m.id === itemModifierId)

  if (!itemModifier) {
    return false
  }

  const parentModifierGroupIds = itemModifier.modifierGroupIds

  for (const modifierGroupId of parentModifierGroupIds) {
    if (existingModifierGroupIds.includes(modifierGroupId)) {
      return false
    }

    const newExistingModifierGroupIds = [...existingModifierGroupIds, modifierGroupId]

    if (
      !validateModifierGroupSchema(modifierGroupId, allModifiers, existingItemModifierIds, newExistingModifierGroupIds)
    ) {
      return false
    }
  }

  return true
}

function validateModifierGroupSchema(
  modifierGroupId: string,
  allModifiers: CartItemModifierNested[],
  existingItemModifierIds: string[],
  existingModifierGroupIds: string[],
) {
  const parentItemModifierIds = allModifiers
    .filter((m) => m.childModifierGroupIds.includes(modifierGroupId))
    .map((m) => m.id)

  for (const itemModifierId of parentItemModifierIds) {
    if (existingItemModifierIds.includes(itemModifierId)) {
      return false
    }

    const newExistingItemModifierIds = [...existingItemModifierIds, itemModifierId]

    if (
      !validateItemModifierNestedSchema(
        itemModifierId,
        allModifiers,
        newExistingItemModifierIds,
        existingModifierGroupIds,
      )
    ) {
      return false
    }
  }

  return true
}

export function itemsAreEquivalent(item1: CartItem, item2: CartItem) {
  const smartHash = (obj: any) => {
    const IGNORE_KEYS = ['quantity']
    return objectHash(obj, {
      unorderedArrays: true, // Treat arrays as unordered sets
      excludeKeys: (key) => IGNORE_KEYS.includes(key),
    })
  }
  return smartHash(item1) === smartHash(item2)
}

// In-place
export function addItemToCart(cart: Cart, item: CartItem, catalogs: Catalogs) {
  const errorMap = validateItem(item.itemId, item.modifierGroups || [], catalogs)
  const erroroneous = errorMap[item.itemId]?.[0]
  if (erroroneous) {
    return errorMap
  }

  const existingItem = cart.cartItems.find((cartItem) => itemsAreEquivalent(cartItem, item))

  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.cartItems.push(item)
  }
  return cart
}

export function removeItemFromCart(cart: Cart, id: string) {
  cart.cartItems = cart.cartItems.filter((item) => item.id !== id)
  return cart
}

export function updateItem(cart: Cart, itemId: string, item: CartItem) {
  cart.cartItems = cart.cartItems.filter((item) => item.itemId !== itemId)
  cart.cartItems.push(item)
  return cart
}
