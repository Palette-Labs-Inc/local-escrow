import { RouterProvider } from '@tanstack/react-router'
import { WagmiProvider } from 'wagmi'
import { queryClient, wagmiConfig } from './config.js'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as Router from './lib/Router.js'

export function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router.router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
