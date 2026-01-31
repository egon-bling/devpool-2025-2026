<script setup>
defineProps({
  exibir: Boolean,
  mensagem: String,
  tipo: { type: String, default: 'sucesso' } 
});
</script>

<template>
  <Transition
    enter-active-class="transform transition duration-300 ease-out"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="exibir" 
      class="fixed bottom-5 right-5 z-[100] max-w-sm w-full bg-white border-l-4 shadow-2xl rounded-r-lg p-4 flex items-center gap-3"
      :class="tipo === 'erro' ? 'border-rose-500' : 'border-emerald-500'"
    >
      <div :class="tipo === 'erro' ? 'bg-rose-100' : 'bg-emerald-100'" class="p-2 rounded-full">
        <svg v-if="tipo === 'erro'" class="h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <p class="text-sm font-bold text-gray-900">{{ tipo === 'erro' ? 'Ops! Algo deu errado' : 'Sucesso!' }}</p>
        <p class="text-xs text-gray-500">{{ mensagem }}</p>
      </div>
    </div>
  </Transition>
</template>

