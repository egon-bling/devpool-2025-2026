<script setup lang="ts">
import BarraHome from './components/Home/BarraHome.vue';

</script>

<template>
  <div class="antialiased font-sans text-slate-900">
    <BarraHome />
    
    <main class="pt-16">
      <router-view />
    </main>
  </div>
</template>