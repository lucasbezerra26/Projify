<template>
  <div v-if="projects && projects.length > 0" class="flex flex-col bg-secondary-50 p-4 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
      <h1 class="text-xl font-bold text-text-primary text-center md:text-left">
        Projetos ({{ filteredProjects.length }})
      </h1>
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex items-center space-x-2">
          <label for="favorite-switch" class="text-sm">Apenas Favoritos</label>
          <button
              id="favorite-switch"
              @click="toggleFavorites"
              :class="{'bg-yellow': showFavorites, 'bg-gray-300': !showFavorites}"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
          >
        <span
            :class="{'translate-x-6': showFavorites, 'translate-x-1': !showFavorites}"
            class="inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300"
        ></span>
          </button>
        </div>
        <select v-model="sortOption" class="p-2 border rounded-md text-sm w-full md:w-auto">
          <option value="alphabetical">Ordem alfabética</option>
          <option value="recent">Mais recentes</option>
          <option value="endingSoon">Próximos à finalização</option>
        </select>
        <NuxtLink to="/new">
          <button
              class="flex items-center justify-center space-x-2 bg-secondary text-text-light px-6 py-2 rounded-full shadow hover:bg-opacity-90 w-full md:w-auto"
          >
            <Icon name="mdi:plus-circle-outline" class="h-5 w-5"/>
            <span>Novo projeto</span>
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
          v-for="project in sortedProjects"
          :key="project.id"
          class="bg-light rounded-lg shadow cursor-pointer hover:shadow-md transition w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <div class="relative  h-40 rounded-lg overflow-hidden bg-gray-100">
          <img v-if="project.coverImage" :src="project.coverImage" alt="Capa do Projeto"
               class="object-cover w-full h-full"/>
          <div v-else class="flex items-center justify-center h-full text-text-secondary">
            <img src="@/assets/img/deafult-project.png" alt="Imagem padrão"/>
          </div>
          <div class="absolute bottom-2 right-2 flex items-center space-x-2">
            <button @click.stop="toggleFavorite(project.id)">
              <img v-if="!project.isFavorite" src="@/assets/icons/favorite.svg" alt="Favorito"/>
              <img v-else src="@/assets/icons/favorite-yellow.svg" alt="Favorito"/>
            </button>

            <div class="relative">
              <button
                  class="flex items-center justify-center bg-light text-text-secondary rounded-full shadow hover:bg-opacity-90"
                  @click.stop="toggleOverlay(project.id)"
              >
                <span class="text-center w-8 h-8 text-text-primary">...</span>
              </button>

              <transition name="slide-up">
                <div ref="refOverlayOpen" @blur="hiddenOverlay" @focusout="hiddenOverlay"
                     tabindex="-1"
                     v-if="overlayOpen === project.id"
                     class="absolute right-0 bottom-10 w-40 bg-white rounded-md shadow-lg z-40 p-2"
                >
                  <ul>
                    <li>
                      <button class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              @click="editProject(project.id)">
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                          class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          @click="confirmDelete(project)"
                      >
                        Remover
                      </button>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>


        <div class="mt-1 p-4 space-y-2">
          <div class="space-y-2">
            <h2 class="text-lg font-semibold text-text-primary">{{ project.name }}</h2>
            <p class="text-sm text-text-secondary"><strong>Cliente:</strong> {{ project.client }}</p>
          </div>
          <div class="border-t-2 border-secondary-50 text-text-secondary"></div>
          <div class="flex items-start flex-col text-sm">
            <div class="flex items-start space-x-3 mt-4">
              <img src="@/assets/icons/calendar-day-light.svg" alt="Calendário"/>
              <span class="mt-1">{{ formatDate(project.startDate) }}</span>
            </div>
            <div class="flex items-start justify-center space-x-3 mt-4">
              <img src="@/assets/icons/calendar-check-light.svg" alt="Calendário"/>
              <span class="mt-1">{{ formatDate(project.endDate) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <h2 class="text-primary font-bold text-xl mb-4">Nenhum projeto encontrado</h2>
    </div>

    <!-- Modal de Confirmação -->
    <ConfirmModal
        :show="showModal"
        title="Remover projeto"
        message="Essa ação removerá definitivamente o projeto:"
        :itemName="projectToDelete?.name"
        @confirm="deleteConfirmed"
        @cancel="closeModal"
    />
  </div>
  <div v-else class="flex flex-col items-center justify-center min-h-9/10 bg-secondary-50 p-16">
    <main class="w-full bg-light flex flex-col items-center justify-center flex-grow">
      <h1 class="text-text-primary font-bold mb-2">Nenhum projeto</h1>
      <p class="text-text-secondary text-center mb-6">
        Clique no botão abaixo para criar o primeiro e gerenciá-lo.
      </p>

      <NuxtLink to="/new" class="hover:text-gray-200">
        <button
            class="flex items-center space-x-2 bg-secondary text-text-light px-6 py-2 rounded-full shadow hover:bg-opacity-90"
        >
          <Icon name="mdi:plus-circle-outline" class="h-5 w-5"/>
          <span>Novo projeto</span>
        </button>
      </NuxtLink>
    </main>
  </div>
</template>
<script setup lang="ts">
import {ref, computed, onMounted, nextTick} from "vue";
import {useRouter} from "vue-router";
import ConfirmModal from "@/components/ConfirmModal.vue";

const hiddenOverlay = () => {
  overlayOpen.value = null;
}
const toggleFavorites = () => {
  showFavorites.value = !showFavorites.value;
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {day: "2-digit", month: "long", year: "numeric"};
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

interface Project {
  id: number;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  coverImage: string | null;
}

const projects = ref<Project[]>([]);
const showFavorites = ref(false);
const sortOption = ref("alphabetical");
const searchQuery = ref("");
const router = useRouter();
const overlayOpen = ref<number | null>(null);
const refOverlayOpen = ref<HTMLDivElement | null>(null);


const showModal = ref(false);
const projectToDelete = ref<Project | null>(null);

const loadProjectsFromStorage = () => {
  const storedProjects = localStorage.getItem("projects");
  projects.value = storedProjects ? JSON.parse(storedProjects) : [];
};

const saveProjectsToStorage = () => {
  localStorage.setItem("projects", JSON.stringify(projects.value));
};

// Listener para o evento de busca
const handleSearchEvent = (event: Event) => {
  const query = (event as CustomEvent).detail as string;
  searchQuery.value = query;
};

onMounted(() => {
  loadProjectsFromStorage();
  window.addEventListener("search", handleSearchEvent); // Ouvir eventos de busca
});

const filteredProjects = computed(() => {
  let filtered = projects.value;

  if (showFavorites.value) {
    filtered = filtered.filter((p) => p.isFavorite);
  }

  if (searchQuery.value.length >= 3) {
    filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

// Lógica de ordenação
const sortedProjects = computed(() => {
  if (sortOption.value === "alphabetical") {
    return filteredProjects.value.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === "recent") {
    return filteredProjects.value.sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  } else if (sortOption.value === "endingSoon") {
    return filteredProjects.value.sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
  }
  return filteredProjects.value;
});

// Alternar favoritos
const toggleFavorite = (id: number) => {
  const project = projects.value.find((p) => p.id === id);
  if (project) {
    project.isFavorite = !project.isFavorite;
    saveProjectsToStorage();
  }
};

const toggleOverlay = (id: number) => {
  overlayOpen.value = overlayOpen.value === id ? null : id;

  // nextTick(() => {
  //   if (refOverlayOpen.value) {
  //     console.log(refOverlayOpen.value); // Verifique se o elemento está correto
  //     refOverlayOpen.value.focus(); // Foco aplicado ao div
  //   }
  // });
};

// Editar projeto
const editProject = (id: number) => {
  router.push(`/new?id=${id}`);
};

// Confirmar exclusão
const confirmDelete = (project: Project) => {
  projectToDelete.value = project;
  showModal.value = true;
};

// Fechar modal
const closeModal = () => {
  showModal.value = false;
  projectToDelete.value = null;
};

// Excluir projeto confirmado
const deleteConfirmed = () => {
  if (projectToDelete.value !== null) {
    projects.value = projects.value.filter((p) => p.id !== projectToDelete.value.id);
    saveProjectsToStorage();
    closeModal();
  }
};
</script>

<style scoped>
/* Transição para o overlay */
.slide-up-enter-active {
  animation: slide-up 0.3s ease-out;
}

.slide-up-leave-active {
  animation: slide-down 0.3s ease-in;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20%);
  }
}


</style>