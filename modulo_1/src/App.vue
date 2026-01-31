<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useRoute } from 'vue-router'; 
import BarraHome from './components/Home/BarraHome.vue';

const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  if (!window.location.search.includes('code=')) {
    authStore.finalizarCarregamento();
  }
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