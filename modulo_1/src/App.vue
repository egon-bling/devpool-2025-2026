<template>
    <Navbar />
    <Hero />
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
import Contato from './components/Contato.vue';
import Hero from './components/Hero.vue';
import Navbar from './components/Navbar.vue';
import Planos from './components/Planos.vue';


</script>

<style>
.hero {
    background-color: #fcfcfc;
}

.card-destaque {
    border: 2px solid #48c774;
    transform: scale(1.05);
    z-index: 1;
}

.placeholder-img {
    border: 2px dashed #ccc;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f5f5f5;
}
.column {
    border: none !important;
}
</style>
