import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // --- Vendor chunks ---
          // React core (react + react-dom + scheduler)
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }
          // Amplitude analytics — loaded via dynamic import() in
          // src/utils/analytics.ts, so Rollup creates a separate chunk
          // automatically.  No manualChunks entry needed; adding one
          // would force shared tslib helpers into the amplitude chunk,
          // creating an unwanted static import in the index chunk.

          // --- Data chunks (large static content) ---
          // Question data (~284 KB source)
          if (id.includes('src/data/questions/')) {
            return 'data-questions'
          }
          // Topic study content (~132 KB source)
          if (id.includes('src/data/topicContent/')) {
            return 'data-topic-content'
          }
        },
      },
    },
  },
})
