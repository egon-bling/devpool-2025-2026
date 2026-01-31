<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import BotaoAuth from './BotaoAuth.vue';

const authStore = useAuthStore();

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <nav class="bg-blue-950 p-4 border-b border-gray-700 fixed top-0 w-full z-50 flex justify-between items-center shadow-lg px-6 md:px-12">
    
    <router-link to="/" class="font-bold text-2xl text-white tracking-tight hover:opacity-90 transition">
      Bingo<span class="text-blue-400">ERP</span>
    </router-link>

    <div class="flex items-center gap-8">
      <template v-if="!authStore.carregandoAuth">
        
        <div v-if="!authStore.isAuthenticated" class="hidden md:flex gap-8 items-center">
          <router-link to="/" class="text-gray-300 hover:text-white transition font-medium">Início</router-link>
          
          <a href="#planos" @click.prevent="scrollToSection('planos')" class="text-gray-300 hover:text-white transition font-medium cursor-pointer">Planos</a>
          <a href="#contato" @click.prevent="scrollToSection('contato')" class="text-gray-300 hover:text-white transition font-medium cursor-pointer">Contato</a>
        </div>

        <div v-else class="flex gap-6 items-center">
          <router-link 
            to="/produtos" 
            class="text-blue-400 font-bold border-b-2 border-blue-400 pb-1 hover:text-blue-300 transition"
          >
            Meus Produtos
          </router-link>
        </div>
        
      </template>
    </div>

    <div class="flex items-center gap-4">
      <botao-auth v-if="!authStore.carregandoAuth" />
      
      <div v-else class="w-24 h-10 bg-blue-900/50 animate-pulse rounded-lg"></div>
    </div>
  </nav>
</template>