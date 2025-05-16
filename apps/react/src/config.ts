import { baseSepolia } from 'wagmi/chains'
import { createConfig, createStorage, http } from 'wagmi'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { porto } from 'porto/wagmi'
import { Mode } from 'porto'
import { storage } from './store/storage'

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    porto({
      mode: Mode.dialog({
        host: import.meta.env.VITE_DIALOG_HOST,
      }),
    }),
  ],
  storage: createStorage({ storage: storage }),
  transports: {
    [baseSepolia.id]: http(),
  },
})

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60, // 1 hour
      refetchOnReconnect: () => !queryClient.isMutating(),
    },
  },
  /**
   * https://tkdodo.eu/blog/react-query-error-handling#putting-it-all-together
   * note: only runs in development mode. Production unaffected.
   */
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (import.meta.env.MODE !== 'development') return
      if (query.state.data !== undefined) {
        console.error(error)
      }
    },
  }),
  mutationCache: new MutationCache({
    onSettled: () => {
      if (queryClient.isMutating() === 1) {
        return queryClient.invalidateQueries()
      }
    },
  }),
})

////////////////////////////////////////////////////////////////////////////////////////////////////
// SHARED PORTO PROVIDER
////////////////////////////////////////////////////////////////////////////////////////////////////

interface PortoProvider {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>
}

export function getProvider(): Promise<PortoProvider> {
  const connector = wagmiConfig.connectors[0] as unknown as {
    id: string
    getProvider: () => Promise<PortoProvider>
  }

  if (connector?.id !== 'xyz.ithaca.porto')
    throw new Error('⛔ Porto connector not initialised')

  // eslint-disable-next-line @typescript-eslint/return-await
  return connector.getProvider()
}