<script setup lang="ts">
import { computed } from 'vue'; 
import { useAuthStore } from '../../stores/authStore';
import BotaoAuth from './BotaoAuth.vue';

const authStore = useAuthStore();

const estaAutenticado = computed(() => !!authStore.accessToken);
</script>

<template>
  <nav class="bg-blue-950 p-4 border-b border-gray-700 fixed top-0 w-full z-50 flex justify-between items-center shadow-md">
    <div class="font-bold text-xl text-white">Bingo ERP</div>

    <div v-if="!estaAutenticado" class="flex gap-4">
        <router-link to="/#inicio" class="text-white hover:text-blue-300 transition">Início</router-link>
        <router-link to="/#funcionalidades" class="text-white hover:text-blue-300 transition">Funcionalidades</router-link>
        <a href="#planos" class="text-slate-300 hover:text-white transition">Planos</a>
        <a href="#contato" class="text-slate-300 hover:text-white transition">Contato</a>
    </div>

    <div v-else class="flex gap-4">
        <router-link to="/produtos" class="text-white font-bold border-b-2 border-blue-400">
          Meus Produtos
        </router-link>
    </div>

    <botao-auth />
  </nav>
</template>