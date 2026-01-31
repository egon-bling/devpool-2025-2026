<template>
    <BarraHome/>
    <main>
        <section id="inicio">
            <HeroInicial/>
        </section>

        <section id="funcionalidades">
            </section>

        <section id="planos">
            <PlanosInicial/>
        </section>

        <section id="contato">
            <ContatoInicial/>
        </section>
    </main>
</template>

<script setup lang="ts">
import HeroInicial from '../components/Home/HeroInicial.vue';
import PlanosInicial from '../components/Home/PlanosInicial.vue';
import ContatoInicial from '../components/Home/ContatoInicial.vue';
import BarraHome from '../components/Home/BarraHome.vue';
</script>

<style scoped>
html {
  scroll-behavior: smooth; 
  scroll-padding-top: 80px; 
}
</style>