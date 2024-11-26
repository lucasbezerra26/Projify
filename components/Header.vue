<template>
  <header class="bg-primary text-white shadow-md py-4 flex items-center justify-between">
    <div class="container mx-auto flex items-center justify-center">
      <NuxtLink to="/" class="hover:text-gray-200">
        <div class="flex items-center justify-center">
          <div class="m-1 img-logo">
             <img src="@/assets/icons/symbol.svg" alt="Home"/>
          </div>
          <div class="m-1 project-name">
            <h3>Gerenciador de Projetos</h3>
          </div>
        </div>
      </NuxtLink>
    </div>
    <nav class="flex space-x-4">
      <Icon name="mdi:magnify" class="h-6 w-6" />
    </nav>
  </header>
</template>

<style scoped>

.project-name {
  max-width: 100px;
}

</style>
<script setup lang="ts">
</script>