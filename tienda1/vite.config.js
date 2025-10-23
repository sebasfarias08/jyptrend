import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tienda/', // 👈 muy importante para rutas correctas en GitHub Pages
  build: {
    outDir: '../Tienda', // 👈 esto coloca el build final en /Tienda
    emptyOutDir: true
  }
})