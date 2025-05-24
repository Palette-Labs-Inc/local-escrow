import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import * as Storage from '../lib/Storage.js'
import type { Address, Hex, Json } from 'ox'

export type EscrowEventInfo = {
  escrowAddress: Address.Address
  payer: Address.Address
  payee: Address.Address
  arbiter: Address.Address
  blockNumber?: bigint
  transactionHash?: Hex.Hex
}

interface EscrowStore {
  eventsByAccount: Record<Address.Address, EscrowEventInfo[]>
  addEvent: (account: Address.Address, event: EscrowEventInfo) => void
  clearEvents: (account: Address.Address) => void
}

const zustandStorage: StateStorage = {
  getItem: async (name) => {
    const value = await Storage.storage.getItem<string>(name)
    return (value as unknown as string) ?? null
  },
  setItem: async (name, value) => {
    await Storage.storage.setItem(name, value)
  },
  removeItem: async (name) => {
    await Storage.storage.removeItem(name)
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
      storage: createJSONStorage(() => zustandStorage, {
        replacer: (_, value) => {
          if (typeof value === 'bigint') {
            return `${value.toString()}n`
          }
          return value
        },
        reviver: (_, value) => {
          if (typeof value === 'string' && value.endsWith('n')) {
            return BigInt(value.slice(0, -1))
          }
          return value
        },
      }),
      version: 1,
    },
  ),
)
