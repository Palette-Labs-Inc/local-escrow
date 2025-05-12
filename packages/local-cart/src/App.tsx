import './App.css'
import CartView from './views/CartView'
import MerchantView from './views/MerchantView'
import { CartProvider } from './context/CartContext'
import PortoAuth, { wagmiConfig } from './views/PortoAuth'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <PortoAuth />
          {/* <CartView />
          <MerchantView /> */}
        </CartProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
