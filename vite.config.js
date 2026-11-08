import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// sitemap.xml and per-page pre-rendering are done after the build by
// scripts/prerender.mjs (see the "build" script in package.json).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
