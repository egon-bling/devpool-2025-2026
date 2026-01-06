<template>
  <section id="contato" class="py-24 bg-slate-50 font-sans">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-display font-black text-slate-900 mb-4"
        >
          Fale com nossos especialistas
        </h2>
        <p class="text-slate-600">Tire suas dúvidas agora mesmo.</p>
      </div>

      <div
        class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
<Transition name="toast">
  <div v-if="enviado" class="fixed bottom-10 right-10 z-100 w-full max-w-sm">
    <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 duration-300">
      
      <div class="shrink-0 w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-xl">
        ✓
      </div>
      
      <div class="flex-1">
        <h3 class="text-sm font-bold text-slate-900">Mensagem enviada!</h3>
        <p class="text-xs text-slate-500">Retornaremos em breve.</p>
      </div>

      <button @click="enviado = false" class="text-slate-400 hover:text-slate-600 transition-colors">
        <span class="text-xl">&times;</span>
      </button>
    </div>
  </div>
</Transition>

        <form @submit.prevent="enviarFormulario" class="space-y-6" novalidate>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label class="text-sm font-bold text-slate-700 mb-2"
                >Seu Nome</label
              >
              <input
                v-model="form.nome"
                type="text"
                placeholder="Ex: João Silva"
                :class="[
                  'px-4 py-3 rounded-xl border outline-none transition-all',
                  erros.nome
                    ? 'border-red-500 bg-red-50'
                    : 'border-slate-200 focus:border-blue-500',
                ]"
              />

            
                <div v-if="erros.nome" class="mt-2 flex items-start gap-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 text-xs">
                <span>⚠️</span>
                <p><strong>Nome obrigatório:</strong> Por favor, digite seu nome completo para identificarmos seu contato.</p>
                </div>
              </div>

            <div class="flex flex-col">
              <label class="text-sm font-bold text-slate-700 mb-2"
                >E-mail Corporativo</label
              >
              <input
                v-model="form.email"
                type="email"
                placeholder="joao@empresa.com"
                :class="[
                  'px-4 py-3 rounded-xl border outline-none transition-all',
                  erros.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-slate-200 focus:border-blue-500',
                ]"
              />

            <div v-if="erros.email" class="mt-2 flex items-start gap-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 text-xs">
              <span>⚠️</span>
              <p><strong>E-mail inválido:</strong> Verifique se o e-mail contém '@' e um domínio válido (ex: .com).</p>
            </div>
          </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-bold text-slate-700 mb-2"
              >Telefone</label
            >
            <input
              v-model="form.phone"
              type="tel"
              maxlength="15"
              placeholder="49991011001"
              :class="[
                'px-4 py-3 rounded-xl border outline-none transition-all',
                erros.phone
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-200 focus:border-blue-500',
              ]"
            />
            <div v-if="erros.phone" class="mt-2 flex items-start gap-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 text-xs">
            <span>⚠️</span>
            <p><strong>Número incompleto:</strong> O telefone deve conter o DDD e ter 11 dígitos no total.</p>
            </div>
            </div>

          <div class="flex flex-col">
            <label class="text-sm font-bold text-slate-700 mb-2"
              >Nome da Empresa</label
            >
            <input
              v-model="form.nomeempresa"
              type="text"
              placeholder="Ex: Bingo ERP"
              :class="[
                'px-4 py-3 rounded-xl border outline-none transition-all',
                erros.nomeempresa
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-200 focus:border-blue-500',
              ]"
            />
          <div v-if="erros.nomeempresa" class="mt-2 flex items-start gap-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 text-xs">
          <span>⚠️</span>
          <p><strong>Empresa faltante:</strong> Precisamos do nome da sua empresa para nosso melhor contato.</p>
          </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-bold text-slate-700 mb-2"
              >Tamanho da Empresa</label
            >
            <select
              v-model="form.tamanhoempresa"
              :class="[
                'px-4 py-3 rounded-xl border outline-none transition-all appearance-none bg-white',
                erros.tamanhoempresa
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-200 focus:border-blue-500',
              ]"
            >
              <option value="" disabled selected>Selecione uma opção</option>
              <option value="1-10">1 a 10 funcionários</option>
              <option value="11-50">11 a 50 funcionários</option>
              <option value="50+">Mais de 50 funcionários</option>
            </select>
          <div v-if="erros.tamanhoempresa" class="mt-2 flex items-start gap-2 text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 text-xs">
          <span>⚠️</span>
          <p><strong>Seleção necessária:</strong> Escolha uma faixa de funcionários para filtrarmos os melhores recursos para você.</p>
          </div>
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-bold text-slate-700 mb-2"
              >Como podemos ajudar?</label
            >
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
            <span
              v-if="carregando"
              class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
            ></span>
            {{ carregando ? "Enviando..." : "Enviar Mensagem" }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const form = reactive({
  nome: "",
  email: "",
  phone: "",
  nomeempresa: "",
  tamanhoempresa: "",
  mensagem: "",
});

const carregando = ref(false);
const enviado = ref(false);
const erros = reactive({
  nome: false,
  email: false,
  phone: false,
  nomeempresa: false,
  tamanhoempresa: false,
});

const enviarFormulario = () => {
  erros.nome = !form.nome;
  erros.email = !form.email.includes("@");
  erros.phone = form.phone.length !== 11;
  erros.nomeempresa = !form.nomeempresa;

  if (
    erros.nome ||
    erros.email ||
    erros.phone ||
    erros.nomeempresa ||
    erros.tamanhoempresa
  )
    return;

  carregando.value = true;

  setTimeout(() => {
    carregando.value = false;
    enviado.value = true;

    form.nome = "";
    form.email = "";
    form.phone = "";
    form.nomeempresa = "";
    form.mensagem = "";
    form.tamanhoempresa = "";

    setTimeout(() => (enviado.value = false), 5000);
  }, 2000);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
