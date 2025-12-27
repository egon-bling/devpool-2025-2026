<template>
<section id="contato" class="py-24 bg-slate-50 font-sans">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4">Fale com nossos especialistas</h2>
        <p class="text-slate-600">Tire suas dúvidas agora mesmo.</p>
      </div>

      <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
        
        <Transition name="fade">
          <div v-if="enviado" class="absolute inset-0 bg-blue-600 flex flex-col items-center justify-center text-white z-50 p-6 text-center">
            <div class="text-6xl mb-4">✅</div>
            <h3 class="text-2xl font-bold mb-2">Mensagem enviada!</h3>
            <p>Em breve nossa equipe entrará em contato com você.</p>
            <button @click="enviado = false" class="mt-6 text-sm underline opacity-80 hover:opacity-100">Enviar outra mensagem</button>
          </div>
        </Transition>

        <form @submit.prevent="enviarFormulario" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label class="text-sm font-bold text-slate-700 mb-2">Seu Nome</label>
              <input 
                v-model="form.nome"
                type="text" 
                placeholder="Ex: João Silva"
                :class="['px-4 py-3 rounded-xl border outline-none transition-all', erros.nome ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500']"
              >
              <span v-if="erros.nome" class="text-red-500 text-xs mt-1">O nome é obrigatório</span>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-bold text-slate-700 mb-2">E-mail Corporativo</label>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="joao@empresa.com"
                :class="['px-4 py-3 rounded-xl border outline-none transition-all', erros.email ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500']"
              >
              <span v-if="erros.email" class="text-red-500 text-xs mt-1">Insira um e-mail válido</span>
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-bold text-slate-700 mb-2">Como podemos ajudar?</label>
            <textarea 
              v-model="form.mensagem"
              rows="4" 
              placeholder="Descreva sua necessidade..."
              class="px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            :disabled="carregando"
            class="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="carregando" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            {{ carregando ? 'Enviando...' : 'Enviar Mensagem' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({
  nome: '',
  email: '',
  mensagem: ''
});

const carregando = ref(false);
const enviado = ref(false);
const erros = reactive({
  nome: false,
  email: false
});

const enviarFormulario = () => {
  erros.nome = !form.nome;
  erros.email = !form.email.includes('@');

  if (erros.nome || erros.email) return;

  carregando.value = true;

  setTimeout(() => {
    carregando.value = false;
    enviado.value = true;

    form.nome = '';
    form.email = '';
    form.mensagem = '';

    setTimeout(() => enviado.value = false, 5000);
    }, 2000);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

