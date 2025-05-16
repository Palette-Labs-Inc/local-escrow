import { baseSepolia } from 'wagmi/chains'
import { createConfig, createStorage, http } from 'wagmi'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { porto } from 'porto/wagmi'
import { Mode } from 'porto'

// export const porto = Porto.create({ mode: Mode.dialog({ host: 'http://localhost:6901/'})})

// Initialise Porto connector with an embedded dialog so the provider is
// injected as soon as the page loads. This prevents Wallet-Standard probe
// calls (e.g. `wallet_getCapabilities`) from leaking to the chain RPC node.

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [porto({
    chains: [baseSepolia],
    mode: Mode.dialog(),
    transports: {
      [baseSepolia.id]: http(),
    },
  })],
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