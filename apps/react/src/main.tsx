import './main.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { StrictMode } from 'react'
import { WagmiProvider } from 'wagmi'
import { createRoot } from 'react-dom/client'
import { queryClient, wagmiConfig } from './config.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create the router instance from the generated route tree
const router = createRouter({ routeTree })

// Augment TanStack Router's register interface for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const root = document.querySelector('div#root')
if (!root) throw new Error('Root not found')

createRoot(root).render(
  <StrictMode>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </WagmiProvider>
  </StrictMode>
)
