<script setup>
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

    const loginAPI = () => {
        const clientId = '0c983835be17486ddac231a6e8a1fd4e624523e6'
        const urlRetorno = 'http://localhost:5173/auth';
        const redirect = encodeURIComponent(urlRetorno);  
        
        localStorage.removeItem('bling_state');
    
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('bling_state', state); 
        
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
    <button 
      v-if="!authStore.accessToken" 
      @click="loginAPI" 
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Login no Bling
    </button>

    <div v-else class="flex items-center gap-3">
      <span class="text-green-600 font-medium flex items-center gap-1">
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        Autenticado
      </span>
      <button 
        @click="logout" 
        class="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition"
      >
        Sair
      </button>
    </div>
  </div>
</template>