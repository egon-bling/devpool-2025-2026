<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import BarraHome from './components/Home/BarraHome.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.finalizarCarregamento();
}); 
</script>

<template>
  <div class="antialiased font-sans text-slate-900 min-h-screen bg-slate-50">
    <BarraHome />
    
    <main class="pt-24 md:pt-28"> 
      <router-view />
    </main>
  </div>
</template>