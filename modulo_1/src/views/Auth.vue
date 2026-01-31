<script setup>
    import { onMounted, computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useAuthStore } from '../stores/authStore';

    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();

    const mode = computed(() => (route.query.mode) || 'callback');

    const Texto = computed(() =>{
        if (mode.value === 'logout') return 'Saindo da Conta...';
        if (mode.value === 'error') return 'Erro em se autenticar';
        return 'Finalizando Conexão, aguarde.';
    });

    const TextoSec = computed(() => {
        if (mode.value === 'logout') return 'Até mais! Redirecionando...';
        if (mode.value === 'error') return 'Não foi possível conectar no Bling.';
        return 'Aguarde enquanto sincronizamos sua conta.';
    });

    onMounted(async () => {
        if (mode.value === 'logout') {
            authStore.logout();
            setTimeout(() => router.push('/'), 1500);
            return;
        }
        const { code, state } = route.query
        const savedState = localStorage.getItem('auth_state'); 

        if (!code || !state || state !== savedState) {
            console.error('State inválido ou código ausente');
            router.push('/?error=invalid_state');
            return;
        }

        try {
            await authStore.handleAuthCallback(code, state); 
            
            localStorage.removeItem('auth_state');
            
            router.push('/produtos');
        } catch (error){
            console.error('Falha ao obter token:', error);
            router.push('/?error=token_failure');
        }
    });
</script>

<template>
    <div class="min-h-screen bg-slate-900 flex items-center justify-center">
    <div class="text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
    <h2 class="mt-6 text-xl font-semibold text-white">{{ Texto }}</h2>
    <p class="mt-2 text-slate-400">{{ TextoSec }}</p>
    </div>
</div>
</template>