import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router' // Importa o roteador (router.ts)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router) // Usa o roteador (importado de router.ts) na aplicação
app.mount('#app')

