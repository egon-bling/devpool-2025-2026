<script setup>
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

    const loginAPI = () => {
        const clientId = '0c983835be17486ddac231a6e8a1fd4e624523e6'
        const urlRetorno = 'http://localhost:5173/auth';
        const redirect = encodeURIComponent(urlRetorno);  
        
        localStorage.removeItem('auth_state');
    
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('auth_state', state); 
        
        const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect=${redirect}`;
        window.location.href = authUrl;
        }

    const logout = () => {
        authStore.logout();
        router.push('/');
    }
</script>

<template>
  <div class="flex items-center gap-4">
    <template v-if="!authStore.carregandoAuth">
      
      
      <button 
        v-if="!authStore.isAuthenticated" 
        @click="loginAPI" 
        class="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
      >
        Conectar ao Bling
      </button>

      <div v-else class="flex items-center gap-4 bg-slate-800/50 p-1 pl-3 rounded-full border border-slate-700">
        <span class="text-emerald-400 text-sm font-bold flex items-center gap-2">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Online
        </span>
        <button 
          @click="logout" 
          class="bg-slate-700 text-slate-200 px-4 py-1.5 rounded-full text-sm hover:bg-red-500 hover:text-white transition-colors"
        >
          Sair
        </button>
      </div>

    </template>
  </div>
</template>