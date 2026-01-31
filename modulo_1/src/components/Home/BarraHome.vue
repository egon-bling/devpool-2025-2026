<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import BotaoAuth from './BotaoAuth.vue';

const authStore = useAuthStore();

</script>

<template>
  <nav class="bg-blue-950 p-4 border-b border-gray-700 fixed top-0 w-full z-50 flex justify-between items-center shadow-md">
    <div class="font-bold text-xl text-white">Bingo ERP</div>

    <template v-if="!authStore.carregandoAuth">
        
        <div v-if="!authStore.isAutenticated" class="flex gap-6">
            <router-link to="/" class="text-white hover:text-blue-300 transition">Início</router-link>
            <router-link to="/#planos" class="text-white hover:text-blue-300 transition">Planos</router-link>
            <router-link to="/#contato" class="text-white hover:text-blue-300 transition">Contato</router-link>

        </div>

        <div v-else class="flex gap-4">
            <router-link to="/produtos" class="text-white font-bold border-b-2 border-blue-400">
               Meus Produtos
            </router-link>
        </div>
        
    </template>

    <botao-auth v-if="!authStore.carregandoAuth" />
  </nav>
</template>