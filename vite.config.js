import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE_PATH lets the build be served from a sub-directory without code changes.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  build: { outDir: 'dist', assetsInlineLimit: 2048 },
});
