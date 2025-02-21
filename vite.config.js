import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ViteFonts from 'vite-plugin-fonts';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ViteFonts({
      google: {
        families: ['Roboto:wght@400;700', 'Open+Sans:ital,wght@0,400;1,400'],
      },
    }),
    tailwindcss(),
    react()],
    
})
