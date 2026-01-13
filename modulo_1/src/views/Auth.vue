<script setup>
    import { onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
        const code = route.query.code;
        const state = route.query.state;
        const savedState = localStorage.getItem('bling_state');

        if (!state || state !== savedState) {
            console.error('State não confere');
            router.push('/')
            return;
        }

        if (code) {
            const tokenSucesso = await trocarCodeToken(code);

            if (tokenSucesso) {
                router.push('/produtos');
            }
            else {
                router.push ('/');
            }
        }
    })

    const trocarCodeToken = async (code) => {
        const clientId = '0c983835be17486ddac231a6e8a1fd4e624523e6';
        const clientSecret = '2d2f1174d9f4ec82d908b256f6bb77b6a3db2d7cf7679817e3faddc2f809';
        const authHeader = btoa(`${clientId}:${clientSecret}`);

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", code); //expira em 1 minuto
        urlencoded.append("redirect_uri", "http://localhost:5173/auth");

        try {
            const response = await fetch("https://www.bling.com.br/Api/v3/oauth/token",{
                method: "POST",
                headers: {"Authorization": `Basic ${authHeader}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlencoded,
            });
            
            const data = await response.json();

            if (data.access_token) {
                localStorage.setItem('bling_access_token', data.access_token);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro na troca do token:", error);
            return false;
        }
    };
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-slate-50">
    <div class="text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
    <p class="text-slate-600 font-medium">Autenticando</p>
    </div>
    </div>
</template>