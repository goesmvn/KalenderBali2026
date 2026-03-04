import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom'],
          // Animation library
          'vendor-motion': ['framer-motion'],
          // PDF generation (heavy)
          'vendor-pdf': ['jspdf', 'jspdf-autotable'],
          // Spreadsheet (heavy)
          'vendor-xlsx': ['xlsx'],
          // UI icons
          'vendor-icons': ['lucide-react'],
          // Radix UI primitives
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
            '@radix-ui/react-scroll-area',
          ],
        },
      },
    },
    // Increase the warning limit since we've chunked intentionally
    chunkSizeWarningLimit: 600,
  },
});
