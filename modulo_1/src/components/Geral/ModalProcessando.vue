<template>
  <div v-if="aberto" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
    <div class="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-xs w-full">
      <div class="relative w-16 h-16 mb-4">
        <div class="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <h3 class="text-lg font-bold text-gray-800 mb-1">Processando</h3>
      <p class="text-gray-500 text-sm text-center">
        Aguarde enquanto processa sua requisição...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ aberto: boolean }>();
</script>