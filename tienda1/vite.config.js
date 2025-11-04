import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 📦 Si estás compilando para Android (ej: npm run build:android)
  const isAndroid = mode === 'android'

  return {
    plugins: [react()],
    base: isAndroid ? './' : '/Tienda/', // ✅ base local para Capacitor, GitHub para web
    build: {
      outDir: isAndroid ? 'dist' : '../Tienda', // ✅ build correcto según destino
      emptyOutDir: true,
    },
  }
})