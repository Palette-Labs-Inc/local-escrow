import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  server: { port: 6902 },
  plugins: [
    TanStackRouterVite({ 
      target: 'react', 
      autoCodeSplitting: true 
    }),
    react(),
    mkcert(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      '#': resolve(__dirname, 'src'),
    },
  },
})
