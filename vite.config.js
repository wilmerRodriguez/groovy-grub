import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this app from /groovy-grub/
export default defineConfig({
  plugins: [react()],
  base: '/groovy-grub/',
})
