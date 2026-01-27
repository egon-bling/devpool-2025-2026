<template>
  <div class="section has-text-centered">
    <div class="container" style="max-width: 600px; margin: 0 auto;">

      <div v-if="loading">
        <h2 class="title is-4">Processando login...</h2>
        <button class="button is-loading is-large is-ghost">Carregando</button>
      </div>

      <div v-else-if="sucesso" class="notification is-success">
        <h2 class="title is-5">Login realizado com sucesso!</h2>
        <p>Redirecionando para produtos...</p>
      </div>

      <div v-else-if="erroCors" class="box has-text-left">
        <h2 class="title is-4 has-text-warning-dark">
          <span class="icon"><i class="fas fa-exclamation-triangle"></i></span>
          Atenção: Bloqueio de CORS detectado
        </h2>
        <p class="mb-4">
          O navegador bloqueou a troca automática do token (comportamento padrão em localhost).
          Conforme a página 11 dos requisitos, utilize o Postman ou insira o token manualmente abaixo.
        </p>

        <div class="field">
          <label class="label">Seu Código de Autorização (Code):</label>
          <div class="control has-icons-right">
            <input class="input" type="text" :value="authCode" readonly @click="copiarCode">
            <span class="icon is-small is-right"><i class="fas fa-copy"></i></span>
          </div>
          <p class="help">Use este código no Postman para gerar o Access Token.</p>
        </div>

        <hr>

        <div class="field">
          <label class="label">Cole seu Access Token aqui:</label>
          <div class="control">
            <input class="input is-primary" type="text" v-model="tokenManual"
              placeholder="Cole o token gerado no Postman...">
          </div>
        </div>

        <button class="button is-primary is-fullwidth mt-3" @click="salvarTokenManual" :disabled="!tokenManual">
          Salvar e Acessar Produtos
        </button>

        <p class="has-text-centered mt-4">
          <a class="has-text-grey" @click="router.push('/')">Cancelar e Voltar</a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const sucesso = ref(false);
const erroCors = ref(false);
const authCode = ref('');
const tokenManual = ref('');

const CLIENT_ID = import.meta.env.VITE_BLING_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_BLING_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/callback'; 

onMounted(async () => {
  const code = route.query.code as string;
  const state = route.query.state as string;
  const savedState = localStorage.getItem('auth_state');
  
  authCode.value = code;


  if (!state || state !== savedState) {
    alert('Erro de Segurança: State inválido.');
    router.push('/');
    return;
  }

  if (!code) {
    router.push('/');
    return;
  }

  
  try {
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const urlencoded = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    });

    const resposta = await fetch('/Api/v3/oauth/token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`
      },
      body: urlencoded
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      sucesso.value = true; 
      loading.value = false;
      finalizarLogin(dados.access_token);
    } else {
      throw new Error('Não foi possível obter o token automaticamente.');
    }
  } catch (err) {
    if (!sucesso.value) {
      console.warn("Troca automática indisponível. Ativando contingência manual.");
      loading.value = false;
      erroCors.value = true; 
    }
  }
});

const finalizarLogin = (token: string) => {
  localStorage.setItem('bling_access_token', token);
  localStorage.removeItem('auth_state');
  
  setTimeout(() => {
    router.push('/produtos');
  }, 1500);
};

const salvarTokenManual = () => {
  if (tokenManual.value) {
    sucesso.value = true;
    erroCors.value = false;
    finalizarLogin(tokenManual.value);
  }
};

const copiarCode = () => {
  navigator.clipboard.writeText(authCode.value);
  alert('Código copiado!');
};
</script>