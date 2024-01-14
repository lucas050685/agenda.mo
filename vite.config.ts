import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const resolvedPath = path.resolve(__dirname, "src") + "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./src/frontend",
  publicDir: "../public",
  resolve: {
    alias: {
      "@": resolvedPath,
    }
  }
})
