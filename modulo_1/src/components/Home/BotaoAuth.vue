<script setup>
    const loginAPI = () => {
        const clientId = '0c983835be17486ddac231a6e8a1fd4e624523e6'
        const urlRetorno = 'http://localhost:5173/auth';
        const redirect = encodeURIComponent(urlRetorno);  
        
        localStorage.removeItem('bling_state');
    
        const state = Math.random().toString(36).substring(7);
        localStorage.setItem('bling_state', state); 
        
        const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect=${redirect}`;
        window.location.href = authUrl;
        }
</script>

<template>
    <button @click="loginAPI" class="bg-blue-600 text-white px-4 py-2 rounded">
    Login
    </button>
</template>