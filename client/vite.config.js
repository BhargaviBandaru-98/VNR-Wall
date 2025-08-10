import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'b7dcb0ac7cce.ngrok-free.app'
    ]
  }
})
