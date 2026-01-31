<template>
  <section id="inicio" class="min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-blue-50 to-white py-12 md:py-20 overflow-hidden relative">
    
    <div class="absolute inset-0 z-0 opacity-20">
      <div class="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute top-1/2 right-1/4 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      
      <div class="text-center lg:text-left space-y-6 lg:space-y-8">
        <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Tenha a sua empresa <br />
          <span class="text-blue-600 italic">no seu total controle</span>
        </h1>
        
        <p class="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
          O Bingo ERP simplifica sua gestão de estoque, vendas e financeiro com inteligência e rapidez. Conectado diretamente com a API do Bling.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <button 
            v-if="!authStore.isAutenticated"
            @click="loginAPI" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-200"
          >
            Começar Agora
          </button>
          <button 
            v-else 
            @click="$router.push('/produtos')" 
            class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-200"
          >
            Acessar Meus Produtos
          </button>
          
          <button class="bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition">
            Ver Planos
          </button>
        </div>
      </div>

      <div class="hidden lg:block relative -mr-16">
        <div class="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <img 
          src="../../assets/logo.png" 
          alt="Interface Bingo ERP" 
          class="relative z-10  transition duration-500"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const loginAPI = () => {
    const clientId = '0c983835be17486ddac231a6e8a1fd4e624523e6'; 
    const urlRetorno = 'http://localhost:5173/auth';
    const redirect = encodeURIComponent(urlRetorno); 
    
    localStorage.removeItem('bling_state'); 
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('bling_state', state); 
    
    const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect=${redirect}`;
    window.location.href = authUrl;
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>