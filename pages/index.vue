
<template>
  <div class="flex flex-col bg-background-app p-4 min-h-screen">
    <!-- Header -->
    <header class="flex items-center justify-between mb-8">
      <h1 class="text-xl font-bold text-primary">Projetos ({{ filteredProjects.length }})</h1>
      <div class="flex items-center space-x-4">
        <label class="flex items-center space-x-2">
          <span class="text-sm">Apenas Favoritos</span>
          <input type="checkbox" v-model="showFavorites" class="toggle-checkbox" />
        </label>
        <select v-model="sortOption" class="p-2 border rounded-md text-sm">
          <option value="alphabetical">Ordem alfabética</option>
          <option value="recent">Mais recentes</option>
          <option value="endingSoon">Próximos à finalização</option>
        </select>
        <NuxtLink to="/new">
          <button class="flex items-center space-x-2 bg-secondary text-textLight px-6 py-2 rounded-full shadow hover:bg-opacity-90">
            <Icon name="mdi:plus-circle-outline" class="h-5 w-5" />
            <span>Novo projeto</span>
          </button>
        </NuxtLink>
      </div>
    </header>

    <!-- Barra de Busca -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar projetos..."
        class="w-full p-3 border rounded-md"
        @input="handleSearch"
      />
      <ul v-if="recentSearches.length > 0" class="mt-2 text-sm">
        <li v-for="search in recentSearches" :key="search" @click="searchFromHistory(search)" class="cursor-pointer hover:underline">
          {{ search }}
        </li>
      </ul>
    </div>

    <!-- Lista de Projetos -->
    <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="project in sortedProjects" :key="project.id" class="bg-light p-4 rounded-lg shadow">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ project.name }}</h2>
          <div class="flex space-x-2">
            <button @click="toggleFavorite(project.id)" :class="project.isFavorite ? 'text-yellow-400' : 'text-gray-400'">
              <Icon name="mdi:star" class="h-5 w-5" />
            </button>
            <button @click="showOptions(project.id)" class="text-gray-400">
              <Icon name="mdi:dots-vertical" class="h-5 w-5" />
            </button>
          </div>
        </div>
        <p class="text-sm text-textSecondary">Cliente: {{ project.client }}</p>
        <div class="flex items-center space-x-2 mt-2 text-sm">
          <Icon name="mdi:calendar" class="h-4 w-4" />
          <span>Início: {{ project.startDate }}</span>
          <Icon name="mdi:calendar" class="h-4 w-4" />
          <span>Finalização: {{ project.endDate }}</span>
        </div>
      </div>
    </div>

    <!-- Mensagem quando não há projetos -->
    <div v-else class="flex flex-col items-center justify-center">
      <h2 class="text-textPrimary font-bold text-xl mb-4">Nenhum projeto encontrado</h2>
      <NuxtLink to="/new">
        <button class="bg-secondary text-white px-6 py-2 rounded-md">Criar Projeto</button>
      </NuxtLink>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <Modal v-if="showDeleteModal" @close="closeDeleteModal">
      <template #header>Confirmar Exclusão</template>
      <template #body>Tem certeza que deseja excluir o projeto "{{ projectToDelete?.name }}"?</template>
      <template #footer>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md" @click="deleteProject">Excluir</button>
        <button class="bg-gray-300 px-4 py-2 rounded-md" @click="closeDeleteModal">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Mock Data
const projects = ref([
  { id: 1, name: "Projeto 01", client: "Clicksign", startDate: "2024-09-01", endDate: "2024-12-12", isFavorite: true },
  { id: 2, name: "Projeto 02", client: "Clicksign", startDate: "2024-09-01", endDate: "2024-12-12", isFavorite: false },
  // ...
]);

const router = useRouter();
const showFavorites = ref(false);
const sortOption = ref("alphabetical");
const searchQuery = ref("");
const recentSearches = ref<string[]>([]);
const showDeleteModal = ref(false);
const projectToDelete = ref<any>(null);

// Computed Properties
const filteredProjects = computed(() => {
  let filtered = projects.value;
  if (showFavorites.value) {
    filtered = filtered.filter((project) => project.isFavorite);
  }
  if (searchQuery.value.length >= 3) {
    filtered = filtered.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return filtered;
});

const sortedProjects = computed(() => {
  if (sortOption.value === "alphabetical") {
    return filteredProjects.value.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortOption.value === "recent") {
    return filteredProjects.value.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
  if (sortOption.value === "endingSoon") {
    return filteredProjects.value.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
  }
  return filteredProjects.value;
});

// Methods
const toggleFavorite = (id: number) => {
  const project = projects.value.find((p) => p.id === id);
  if (project) project.isFavorite = !project.isFavorite;
};

const handleSearch = () => {
  if (searchQuery.value.length >= 3) {
    if (!recentSearches.value.includes(searchQuery.value)) {
      if (recentSearches.value.length >= 5) recentSearches.value.pop();
      recentSearches.value.unshift(searchQuery.value);
    }
  }
};

const searchFromHistory = (query: string) => {
  searchQuery.value = query;
};

const showOptions = (id: number) => {
  projectToDelete.value = projects.value.find((p) => p.id === id);
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const deleteProject = () => {
  projects.value = projects.value.filter((p) => p.id !== projectToDelete.value.id);
  closeDeleteModal();
};
</script>