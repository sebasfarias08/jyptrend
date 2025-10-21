import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para que funcione bajo /tienda/
export default defineConfig({
  plugins: [react()],
  base: '/tienda/', // 👈 muy importante
})