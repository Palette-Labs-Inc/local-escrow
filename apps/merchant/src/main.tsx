import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

const root = document.querySelector('div#root')
if (!root) throw new Error('Root not found')

createRoot(root).render(
  <StrictMode>
      <App />
  </StrictMode>
)
