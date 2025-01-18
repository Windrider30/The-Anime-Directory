import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    open: true
  },
  build: {
    minify: 'terser', // Minify code for production
    sourcemap: false, // Disable source maps for faster builds
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'], // Split React into a separate chunk
          router: ['react-router-dom'], // Split router into a separate chunk
        },
      },
    },
  },
})
