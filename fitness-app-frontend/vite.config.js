import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //cors
  server: {
    proxy: {
      '/realms': {
        target: 'http://localhost:8181',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
