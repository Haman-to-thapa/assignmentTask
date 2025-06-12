import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // ✅ So you can use `test`, `expect` globally
    environment: 'jsdom' // ✅ Simulates browser environment
  },
  
  build: {
    outDir: 'dist', // Explicitly set output directory
    emptyOutDir: true, // Clear the directory before build
    sourcemap: import.meta.NODE_ENV !== 'production' // Enable sourcemaps in dev
  },
   optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    open: true, // Optional: open browser on dev server start
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  preview: {
    port: 3000 // Preview port for 'vite preview' command
  }
});

