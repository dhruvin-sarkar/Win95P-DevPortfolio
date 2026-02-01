import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Win95P-DevPortfolio/",
  build: {
    sourcemap: false,  // Disable sourcemaps
  }
})
