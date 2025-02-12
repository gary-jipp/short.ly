import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true, // Modify host header to match target
        // rewrite: (path) => path.replace(/^\/api/, '') // Removes  /api prefix
      }
    }
  }
});
