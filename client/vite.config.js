import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'e73b-103-248-208-99.ngrok-free.app'
    ]
  }
})
