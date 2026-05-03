import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensures all asset linkages are relative, critical for x20 and GitHub Pages subfolders
  plugins: [
    react(),
    tailwindcss()
  ],
})
