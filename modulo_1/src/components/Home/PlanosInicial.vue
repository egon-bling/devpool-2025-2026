<script setup lang="ts">
import { lista_planos } from '../../mocks/planos';
</script>

<template>
  <section id="planos" class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto group">
        <div 
          v-for="plano in lista_planos" 
          :key="plano.titulo"
          :class="[
            //base
            'p-8 rounded-3xl border transition-all duration-300 flex flex-col relative bg-white cursor-default',
            // grupo
            'group-hover:opacity-40 group-hover:scale-[0.95] group-hover:shadow-none',
            //sob mouse
            'hover:opacity-100 hover:scale-105 hover:shadow-2xl hover:z-30 hover:border-blue-500',
            plano.destaque 
            ? 'opacity-100 scale-105 shadow-2xl z-20 border-blue-600'
            : 'opacity-80 border-slate-200 shadow-sm'
          ]"
        >
          <div v-if="plano.destaque" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap">
            Recomendado
          </div>

          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ plano.titulo }}</h3>
          
          <div class="mb-6">
            <span class="text-4xl font-black text-slate-900">R$ {{ plano.preco }}</span>
            <span class="text-slate-500 text-sm">/{{ plano.periodicidade }}</span>
          </div>

          <ul class="space-y-3 mb-8 grow">
            <li v-for="feat in plano.funcionalidades" :key="feat" class="flex items-center gap-2 text-slate-600 text-sm">
              <span class="text-blue-600 font-bold">✓</span> {{ feat }}
            </li>
          </ul>

          <button :class="[
            'w-full py-3 px-6 rounded-xl font-bold transition-all',
            plano.destaque ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
          ]">
            Escolher {{ plano.titulo }}
          </button>

            </div> 
        </div>
    </div>
  </section>
</template>

