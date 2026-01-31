<script setup lang="ts">
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'filtrar', 'limpar']);

const atualizarCampo = (campo: string, event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  emit('update:modelValue', { 
    ...props.modelValue, 
    [campo]: target.value 
  });
};
</script>

<template>
  <div class="max-w-7xl mx-auto mb-1"> 
    <div class="flex flex-col md:flex-row gap-4 items-end bg-white p-5 rounded-t-xl border border-gray-200 shadow-sm">
      
      <div class="flex-1">
        <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Buscar por Nome ou SKU</label>
        <input 
          :value="modelValue.nome"
          @input="atualizarCampo('nome', $event)"
          @keyup.enter="$emit('filtrar')"
          type="text" 
          class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

    <div class="w-full md:w-40">
  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Data Inicial</label>
  <input 
    type="date" 
    :value="modelValue.dataInicio"
    @input="atualizarCampo('dataInicio', $event)"
    class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<div class="w-full md:w-40">
  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Data Final</label>
  <input 
    type="date" 
    :value="modelValue.dataFim"
    @input="atualizarCampo('dataFim', $event)"
    class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

    <div class="w-full md:w-48">
      <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1">Situação</label>
      <select 
        :value="modelValue.situacao"
        @change="atualizarCampo('situacao', $event)"
        class="w-full px-3 py-2 bg-slate-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="1">Últimos Incluídos</option>
        <option value="2">Ativos</option>
        <option value="3">Inativos</option>
        <option value="5">Todos</option>
      </select>
    </div>

    <div class="flex gap-2">
        <button @click="$emit('limpar')" class="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-md transition">Limpar</button>
        <button @click="$emit('filtrar')" class="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-blue-700 transition shadow-sm">Filtrar</button>
      </div>
    </div>
  </div>
</template>