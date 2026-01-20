<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import BotaoAuth from './BotaoAuth.vue';
const authStore = useAuthStore();
</script>

<template>
<nav class="bg-blue-950 p-4 border-b border-gray-200 fixed top-0 w-full z-50 flex justify-between items-center">
    <div class="font-bold text-xl text-white">
        Bingo ERP
    </div>  

    <div v-if="!authStore.accessToken" class="flex gap-4">
        <router-link to="/#inicio" class="text-white">Início</router-link>
        <router-link to="/#funcionalidades" class="text-white">Funcionalidades</router-link>
        <a href="#planos" class="text-slate-300 hover:text-white transition cursor-pointer">
          Planos
        </a>
        <a href="#contato" class="text-slate-300 hover:text-white transition cursor-pointer">
          Contato
        </a>    
    </div>

    <div v-else class="flex gap-4">
        <router-link to="/produtos" class="text-white font-medium hover:text-blue-200 transition">
          Meus Produtos
        </router-link>
    </div>

    <botao-auth/>
  </nav>
</template>

