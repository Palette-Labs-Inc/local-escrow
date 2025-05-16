import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import { createStore, get, set, del } from 'idb-keyval'
import { Json } from 'ox'

////////////////////////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////////////////////////

export interface EscrowEventInfo {
  escrowAddress: `0x${string}`
  payee: `0x${string}`
  storefront: `0x${string}`
  arbiter: `0x${string}`
  blockNumber?: bigint
  transactionHash?: `0x${string}`
}

interface EscrowStore {
  /**
   * Events grouped by connected account address. Each account can hold many escrow events.
   */
  eventsByAccount: Record<`0x${string}`, EscrowEventInfo[]>
  /**
   * Append a new escrow event for the given account. Duplicate escrowAddress entries are ignored.
   */
  addEvent: (account: `0x${string}`, event: EscrowEventInfo) => void
  /**
   * Remove all events for a particular account (optional utility).
   */
  clearEvents: (account: `0x${string}`) => void
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// CUSTOM IDB STORAGE IMPLEMENTATION (async-aware)
////////////////////////////////////////////////////////////////////////////////////////////////////

// Define Storage type locally to adhere to user's spec
// We re-declare to avoid importing from internal path.
export interface CustomStorage {
  getItem: <V>(name: string) => V | Promise<V | null> | null
  removeItem: (name: string) => void | Promise<void>
  setItem: (name: string, value: unknown) => void | Promise<void>
  sizeLimit: number
  storages?: readonly CustomStorage[] | undefined
}

// Create a dedicated IndexedDB store for escrow events
const kvStore = createStore('escrow-db', 'escrow-events')

// Implements user-defined Storage interface with JSON (de)serialization via ox/Json
const escrowStorage: CustomStorage = {
  sizeLimit: 10 * 1024 * 1024, // 10 MB arbitrary limit
  async getItem<V>(name: string): Promise<V | null> {
    const raw = await get(name, kvStore)
    if (raw == null) return null
    try {
      return Json.parse(raw as string) as V
    } catch (_err) {
      // Not JSON – return raw value as-is
      return raw as unknown as V
    }
  },
  async setItem(_name: string, _value: unknown) {
    const serialized = Json.stringify(_value)
    await set(_name, serialized, kvStore)
  },
  async removeItem(name: string) {
    await del(name, kvStore)
  },
}

// Adapter converting CustomStorage -> Zustand's StateStorage (expects string values)
const escrowZustandStorage: StateStorage = {
  getItem: async (name) => {
    const value = await escrowStorage.getItem<string>(name)
    return (value as unknown as string) ?? null
  },
  setItem: async (name, value) => {
    await escrowStorage.setItem(name, value)
  },
  removeItem: async (name) => {
    await escrowStorage.removeItem(name)
  },
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// ZUSTAND STORE (persisted in IndexedDB via idb-keyval)
////////////////////////////////////////////////////////////////////////////////////////////////////

export const useEscrowStore = create<EscrowStore>()(
  persist<EscrowStore>(
    (set, get) => ({
      eventsByAccount: {},
      addEvent: (account, event) =>
        set((state: EscrowStore) => {
          const existing = state.eventsByAccount[account] ?? []
          if (existing.some((e: EscrowEventInfo) => e.escrowAddress === event.escrowAddress)) {
            return state
          }
          return {
            eventsByAccount: {
              ...state.eventsByAccount,
              [account]: [...existing, event],
            },
          }
        }),
      clearEvents: (account) =>
        set((state: EscrowStore) => ({
          eventsByAccount: {
            ...state.eventsByAccount,
            [account]: [],
          },
        })),
    }),
    {
      name: 'escrow-events',
      storage: createJSONStorage(() => escrowZustandStorage),
      version: 1,
    },
  ),
) 