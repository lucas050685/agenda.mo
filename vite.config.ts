import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const p = path.resolve(__dirname, "src") + "/";
console.log('>>>', p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./src/frontend",
  publicDir: "../public",
  resolve: {
    alias: {
      "@": p,
    }
  }
})
