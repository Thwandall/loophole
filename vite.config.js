import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * Dev server configuration.
   * We proxy /api/* calls from the React app to the Node backend (server.js),
   * so the frontend can call /api/submit-survey as if it were same-origin.
   */
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
