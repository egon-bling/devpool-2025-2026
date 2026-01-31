<!-- AUTH_01A - Rota de Callback -->

<template>
    <div style="padding: 40px;">
        <h1>Processando autorização…</h1> <!-- AUTH_01A Exibe mensagem de processamento ao usuário -->
        <p v-if="error" style="color: red;">{{ error }}</p> <!-- AUTH-02B Exibe erro se fluxo de verificação retorna falso -->
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'; //AUTH-01A e AUTH-02A
import { useAuthStore } from '../stores/auth'; //AUTH-03A store de autenticação

const error = ref<string | null>(null)

const route = useRoute() //AUTH-02A para saber onde está 
const router = useRouter() //AUTH-02A para ir para algum lugar
const auth = useAuthStore() //AUTH-03A acesso à store de autenticação (OAuth)


onMounted(() => {
    const code = route.query.code as string | undefined
    const state = route.query.state as string | undefined
    const savedState = sessionStorage.getItem('oauth_state')

    console.log('Query recebida do Oauth', route.query) //AUTH-01A

    //AUTH_02B validação básica
    if (!code || !state) {
        error.value = 'Parâmetros OAuth inválidos.'
        return
    }

    if (state !== savedState) {
        error.value = 'A autorização falhou. Confira suas credenciais.' /* state inválido */
        return
    }

    //AUTH_02B Até aqui, OAuth funcionou
    console.log('OAuth validado com sucesso')

    // AUTH-03A Guarda o code via store (store cuida do sessionStorage)
    auth.setOAuthCode(code)

    //AUTH_02B Limpa o state usado
    sessionStorage.removeItem('oauth_state')

    //AUTH_02B Redireciona para a área autenticada após 1,5 segundos
    setTimeout(() => {
        router.push('/produtos')
    }, 1500)
})
</script>


<style></style>