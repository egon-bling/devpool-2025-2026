<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  situacao: {
    type: [String, Number],
    default: 'A'
  }
});

const statusConfig = computed(() => {
  const s = String(props.situacao || 'A').toUpperCase();
  
  const mapa: Record<string, { texto: string; classe: string }> = {
    'A': { texto: 'Ativo', classe: 'bg-green-100 text-green-700 border-green-200' },
    'I': { texto: 'Inativo', classe: 'bg-gray-100 text-gray-500 border-gray-200' },
    '2': { texto: 'Ativo', classe: 'bg-green-100 text-green-700 border-green-200' },
    '3': { texto: 'Inativo', classe: 'bg-gray-100 text-gray-500 border-gray-200' }
  };

  return mapa[s] || { texto: 'Desconhecido', classe: 'bg-yellow-100 text-yellow-700' };
});
</script>

<template>
  <span :class="['px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider', statusConfig.classe]">
    {{ statusConfig.texto }}
  </span>
</template>