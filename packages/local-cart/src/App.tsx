import './App.css'
import { CartProvider } from './context/CartContext'
import Order, { wagmiConfig } from './views/Order'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Order />
        </CartProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
