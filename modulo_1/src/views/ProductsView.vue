<!-- CRUD produtos -->

<template>
    <main>
        <div>
            <h1>Cadastro de Produtos</h1>
            <!-- Renderizar o ProductPage.vue depois -->
            <div class="container"> 
                <div class="column">
                    <ProductPage />
                </div>
            </div>

        </div>
    </main>
</template>

<script setup lang="ts">
import ProductPage from '../components/ProductPage.vue'
</script>

<style scoped>

</style>
