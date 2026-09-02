import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// La base se toma de una variable de entorno, no del flag --base: en Git Bash
// sobre Windows, `--base=/tumomo-v2/` se traduce a una ruta de Windows y los
// assets terminan apuntando a /Program Files/Git/...
//   VITE_BASE=/tumomo-v2/  -> GitHub Pages (sirve bajo el nombre del repo)
//   sin variable           -> Vercel y desarrollo local
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
