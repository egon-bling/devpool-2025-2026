<template>
<nav class="bg-blue-950 p-4 border-b border-gray-200 fixed top-0 w-full flex justify-between items-center">
 
<div class="font-bold text-xl text-white">
    Bingo ERP
</div>  

<div class="flex gap-4">
    <router-link to="/#inicio" class="text-white">Início</router-link>
    <router-link to="/#funcionalidades" class="text-white">Funcionalidades</router-link>
    <router-link to="/#planos" class="text-white">Planos</router-link>
    <router-link to="/#contatos" class="text-white">Contatos</router-link>
</div>

<router-link to="/produtos" class="bg-blue-600 text-white px-4 py-2 rounded">
    Entrar
</router-link>

</nav>

</template>

<script setup lang="ts">


</script>

<style scoped>


</style>