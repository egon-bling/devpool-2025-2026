<template>
<nav class="bg-blue-950 p-4 border-b border-gray-200 fixed top-0 w-full z-50 flex justify-between items-center">
<div class="font-bold text-xl text-white">
    Bingo ERP
</div>  

<div class="flex gap-4">
    <router-link to="/#inicio" class="text-white">Início</router-link>
    <router-link to="/#funcionalidades" class="text-white">Funcionalidades</router-link>
    <a href="#planos" class="text-slate-300 hover:text-white transition cursor-pointer">
    Planos
    </a>
    <a href="#contato" class="text-slate-300 hover:text-white transition cursor-pointer">
    Contato
    </a>    
</div>

<botao-auth/>

</nav>
</template>

<script setup lang="ts">
import BotaoAuth from './BotaoAuth.vue';
</script>

<style scoped>


</style>