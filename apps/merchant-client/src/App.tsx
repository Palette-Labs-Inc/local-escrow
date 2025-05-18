import { QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import CatalogView from './views/CatalogView'
import { queryClient } from './config'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatalogView />
    </QueryClientProvider>
  )
}

export default App
