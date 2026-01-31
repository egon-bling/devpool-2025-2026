<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCadastroProduto } from '../composables/useCadastroProduto';
import Toast from '../components/Geral/Toast.vue'; 

const router = useRouter();

// Lógica local para o Toast
const toastConfig = ref({ exibir: false, mensagem: '', tipo: 'sucesso' as 'sucesso' | 'erro' });
const mostrarToast = (msg: string, tipo: 'sucesso' | 'erro' = 'sucesso') => {
  toastConfig.value = { exibir: true, mensagem: msg, tipo };
  setTimeout(() => { toastConfig.value.exibir = false; }, 4000);
};

// Consumindo nosso Composable com a lógica completa
const { produto, salvando, erros, mensagemErro, cadastrar } = useCadastroProduto(mostrarToast);
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-24 p-4 md:p-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      
      <header class="mb-10">
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Novo Produto</h2>
        <p class="text-slate-500 text-sm">Preencha as informações para integrar ao Bling.</p>
      </header>

      <div v-if="mensagemErro" class="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm flex justify-between items-center shadow-sm">
        <span class="flex items-center gap-2 font-medium">⚠️ {{ mensagemErro }}</span>
        <button @click="mensagemErro = ''" class="text-rose-400 hover:text-rose-600 text-xl font-bold">&times;</button>
      </div>

      <form @submit.prevent="cadastrar" class="space-y-8">
        
        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Nome do Produto *</label>
            <input 
              v-model="produto.nome" 
              type="text" 
              placeholder="Ex: Camiseta Algodão Premium"
              :class="[erros.nome ? 'border-rose-400 bg-rose-50 ring-4 ring-rose-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50']"
              class="w-full px-4 py-3 border rounded-xl outline-none transition-all font-medium text-slate-700"
            />
            <p v-if="erros.nome" class="text-rose-500 text-[10px] mt-1.5 font-bold italic">{{ erros.nome }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Tipo</label>
              <select v-model="produto.tipo" class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 outline-none transition-all font-medium cursor-pointer">
                <option value="P">Produto</option>
                <option value="S">Serviço</option>
              </select>
            </div>

            <div class="flex flex-col">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Situação</label>
              <select v-model="produto.situacao" class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 outline-none transition-all font-medium cursor-pointer">
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>

            <div class="flex flex-col">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Formato</label>
              <select v-model="produto.formato" class="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 outline-none transition-all font-medium cursor-pointer">
                <option value="S">Simples</option>
                <option value="V">Com Variações</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          <div class="flex flex-col">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Código (SKU) *</label>
            <input 
              v-model="produto.codigo" 
              type="text" 
              placeholder="Ex: CAM-001"
              :class="[erros.codigo ? 'border-rose-400 bg-rose-50 ring-4 ring-rose-50' : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50']"
              class="w-full px-4 py-3 border rounded-xl outline-none transition-all font-medium"
            />
            <p v-if="erros.codigo" class="text-rose-500 text-[10px] mt-1.5 font-bold italic">{{ erros.codigo }}</p>
          </div>

          <div class="flex flex-col">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Preço de Venda</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">R$</span>
              <input 
                v-model.number="produto.preco" 
                type="number" 
                step="0.01"
                class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Unidade</label>
            <input 
              v-model="produto.unidade" 
              type="text" 
              placeholder="Ex: UN, PC, KG"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div class="flex flex-col">
          <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Descrição Curta</label>
          <textarea 
            v-model="produto.descricaoCurta" 
            rows="3" 
            placeholder="Detalhes internos ou breve resumo do item..."
            class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-medium resize-none"
          ></textarea>
        </div>

        <div class="flex justify-end items-center gap-4 pt-8 border-t border-slate-100">
          <button 
            type="button" 
            @click="router.back()" 
            class="px-6 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-all active:scale-95"
          >
            Cancelar
          </button>
          
          <button 
            type="submit" 
            :disabled="salvando" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="salvando" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            {{ salvando ? 'Cadastrando...' : 'Salvar no Bling' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <Toast :exibir="toastConfig.exibir" :tipo="toastConfig.tipo" :mensagem="toastConfig.mensagem" />
</template>