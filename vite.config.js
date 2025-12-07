import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // For normal builds (Vercel): base = '/'
  // For GitHub Pages builds (mode = 'gh-pages'): base = '/hotel-management-app/'
  base: mode === 'gh-pages' ? '/hotel-management-app/' : '/'
}))
