import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The proxy sends every request that starts with /api to the Node/Express backend (port 3000).
// It is only used when DEMO_MODE is false in src/api.js.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
