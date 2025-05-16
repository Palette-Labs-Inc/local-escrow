import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import { storage } from './storage'

export interface EscrowEventInfo {
  escrowAddress: `0x${string}`
  payee: `0x${string}`
  storefront: `0x${string}`
  arbiter: `0x${string}`
  blockNumber?: bigint
  transactionHash?: `0x${string}`
}

interface EscrowStore {
  eventsByAccount: Record<`0x${string}`, EscrowEventInfo[]>
  addEvent: (account: `0x${string}`, event: EscrowEventInfo) => void
  clearEvents: (account: `0x${string}`) => void
}

const zustandStorage: StateStorage = {
  getItem: async (name) => {
    const value = await storage.getItem<string>(name)
    return (value as unknown as string) ?? null
  },
  setItem: async (name, value) => {
    await storage.setItem(name, value)
  },
  removeItem: async (name) => {
    await storage.removeItem(name)
  },
}

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
      storage: createJSONStorage(() => zustandStorage),
      version: 1,
    },
  ),
) 