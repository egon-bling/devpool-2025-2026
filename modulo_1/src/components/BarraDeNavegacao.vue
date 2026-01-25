<template>
    <nav class="navbar is-white has-shadow is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    <strong>NOME</strong>
                </a>
                <a role="button" class="navbar-burger" :class="{ 'is-active': menuAtivo }" aria-label="menu"
                    aria-expanded="false" @click="menuAtivo = !menuAtivo">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" :class="{ 'is-active': menuAtivo }">
                <div class="navbar-start">
                    <a class="navbar-item" href="#inicio">Início</a>
                    <a class="navbar-item" href="#funcionalidades">Funcionalidades</a>
                    <a class="navbar-item" href="#planos">Planos</a>
                    <a class="navbar-item" href="#contato">Contato</a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <button class="button is-dark is-outlined">
                            <span class="icon"><i class="fas fa-user"></i></span>
                            <span>ENTRAR</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const menuAtivo = ref(false);
</script>

<style scoped>
.navbar-item {
    font-family: 'Gilroy', sans-serif;
    color: #4a4a4a;
    display: flex;
}

.navbar-item:hover {
    color: #27ae60 !important;
    transition: 0.3s;
}

@media screen and (max-width: 1023px) {
    .navbar-menu.is-active {
        display: block;
        background-color: white;
    }
    
}

.button {
    margin-top: 0;
}
</style>