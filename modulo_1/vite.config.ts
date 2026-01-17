import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  vue(),
  tailwindcss()
  ],
//ajuste para erro de CORS na API
  server: {
    proxy: {
      '/api-bling': {
        target: 'https://www.bling.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-bling/, ''),
        secure: true
      }
    }
  }
})

