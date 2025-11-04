import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update base to your repo name if different
export default defineConfig({
  base: '/shangwe-frontend/',
  plugins: [react()],
})
