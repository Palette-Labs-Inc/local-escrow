import { createStore, del, get, set } from "idb-keyval"
import { Json } from "ox"

export type MaybePromise<T> = T | Promise<T>

export type Storage = {
  getItem: <V>(name: string) => MaybePromise<V | null>
  removeItem: (name: string) => MaybePromise<void>
  setItem: (name: string, value: unknown) => MaybePromise<void>
}

export const kvStore = createStore('account-db', 'account-store')


export const storage: Storage = {
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