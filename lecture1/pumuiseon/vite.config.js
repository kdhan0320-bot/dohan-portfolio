import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dohan-portfolio/portfolio-feedback-hub/',
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
