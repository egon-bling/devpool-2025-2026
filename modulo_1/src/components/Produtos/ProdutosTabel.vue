<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{ 
  produtos: any[], 
  selecionados?: number[] 
}>(), {
  produtos: () => [],
  selecionados: () => [] 
});

const emit = defineEmits(['editar', 'excluir', 'update:selecionados']);

const todosSelecionados = computed({
  get: () => props.produtos.length > 0 && props.selecionados.length === props.produtos.length,
  set: (val) => {
    const ids = val ? props.produtos.map(p => p.id) : [];
    emit('update:selecionados', ids);
  }
});


const toggleItem = (id: number) => {
  const novosSelecionados = [...props.selecionados];
  const index = novosSelecionados.indexOf(id);
  
  if (index > -1) {
    novosSelecionados.splice(index, 1);
  } else {
    novosSelecionados.push(id);
  }
  emit('update:selecionados', novosSelecionados);
};
</script>

<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr class="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        <th class="px-6 py-4 w-10">
          <input 
            type="checkbox" 
            v-model="todosSelecionados"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
        </th>
        <th class="px-6 py-4">Código (SKU)</th>
        <th class="px-6 py-4">Produto</th>
        <th class="px-6 py-4 text-center">Unidade</th>
        <th class="px-6 py-4">Situação</th>
        <th class="px-6 py-4 text-right">Ações</th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-100 bg-white">
      <tr v-for="produto in produtos" :key="produto.id" 
          :class="{'bg-blue-50/30': selecionados.includes(produto.id)}"
          class="hover:bg-slate-50 transition-colors">
        
        <td class="px-6 py-4">
          <input 
            type="checkbox" 
            :checked="selecionados.includes(produto.id)"
            @change="toggleItem(produto.id)"
            class="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500 cursor-pointer"
          />
        </td>

        <td class="px-6 py-4 text-sm font-mono text-gray-400">{{ produto.codigo }}</td>
        <td class="px-6 py-4 text-sm font-semibold text-gray-800">{{ produto.nome }}</td>
        
        <td class="px-6 py-4 text-center">
          <span class="inline-flex items-center justify-center px-2 py-1 border border-gray-200 rounded text-[10px] font-bold text-gray-600 bg-gray-50 min-w-[32px]">
            {{ produto.unidade || 'UN' }}
          </span>
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-2">
            <span :class="{'bg-emerald-500': produto.situacao === 'A', 'bg-amber-500': produto.situacao === 'I', 'bg-rose-500': produto.situacao === 'E'}" class="h-2 w-2 rounded-full"></span>
            <span :class="{'text-emerald-700': produto.situacao === 'A', 'text-amber-700': produto.situacao === 'I', 'text-rose-700': produto.situacao === 'E'}" class="text-[11px] font-bold uppercase tracking-tight">
              {{ produto.situacao === 'A' ? 'Ativo' : produto.situacao === 'I' ? 'Inativo' : 'Excluído' }}
            </span>
          </div>
        </td>

        <td class="px-6 py-4 text-right">
          <div class="flex justify-end gap-2">
            <button @click="$emit('editar', produto.id)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Editar Produto">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </button>
            <button @click="$emit('excluir', produto.id)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors" title="Excluir Produto">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>