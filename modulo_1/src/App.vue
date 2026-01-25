<template>
    <BarraDeNavegacao />
    <Hero />
    <Funcionalidades />
    <Planos />
    <Contato />

    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                <strong>Nome</strong> - Links e Copyright © 2026
            </p>
            <div class="buttons is-centered">
                <a class="button is-light"><i class="fab fa-facebook"></i></a>
                <a class="button is-light"><i class="fab fa-instagram"></i></a>
                <a class="button is-light"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import BarraDeNavegacao from './components/BarraDeNavegacao.vue';
import Contato from './components/Contato.vue';
import Funcionalidades from './components/Funcionalidades.vue';
import Hero from './components/Hero.vue';
import Planos from './components/Planos.vue';
</script>

<style>
html, body {
  background-color: #ffffff;
  overflow-x: hidden;
}
section {
    scroll-margin-top: 4rem;
}
html {
  scroll-behavior: smooth;
}
.column {
    border: none !important;
}
.footer {
  background-color: #fafafa;
  border-top: 1px solid #eeeeee;
  padding: 3rem 1.5rem;
}


</style>
