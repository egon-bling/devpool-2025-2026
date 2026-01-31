<script setup>
defineProps({ aberto: Boolean });
defineEmits(['confirmar', 'cancelar']);
</script>

<template>
  <div v-if="aberto" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all">
      <div class="p-6 text-center">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-4">
          <svg class="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-gray-900 mb-2">Confirmar Exclusão</h3>
        <p class="text-sm text-gray-500">
          Você está prestes a marcar este produto como <b>Excluído</b>. Ele não aparecerá mais nas buscas principais.
        </p>
      </div>

      <div class="bg-gray-50 px-6 py-4 flex flex-col gap-2">
        <button @click="$emit('confirmar')" class="w-full py-2.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition shadow-md shadow-rose-200">
          Sim, excluir produto
        </button>
        <button @click="$emit('cancelar')" class="w-full py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

