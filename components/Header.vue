<template>
  <header>
    <div class="bg-primary-900 text-white shadow-md px-4 flex items-center justify-between">
      <div class="container mx-auto flex items-center justify-center">
        <NuxtLink to="/" class="hover:text-gray-200">
          <div class="flex items-center justify-center">
            <div class="m-1 img-logo">
              <img src="@/assets/icons/symbol.svg" alt="Home" />
            </div>
            <div class="m-1 project-name">
              <h3>Gerenciador de Projetos</h3>
            </div>
          </div>
        </NuxtLink>
      </div>
      <nav v-if="isHomePage" class="flex space-x-4">
        <img
          class="cursor-pointer text-text-light"
          @click="toggleSearch"
          src="@/assets/icons/search.svg"
          alt="Procurar"
        />
      </nav>
    </div>

    <transition name="slide-fade" v-if="showSearchInput && isHomePage">
      <div
        class="rounded-sm absolute z-40 ease-in-out top-0 left-0 w-full bg-light text-text-secondary shadow-md"
      >
        <div class="border-2 bg-light b flex flex-col  py-2"
          :class="[showRecentSearches ? 'border-secondary-500':'border-0' ]"
        >
          <div class="flex items-center justify-between p-4 space-x-2">
            <img src="@/assets/icons/search-input.svg" alt="Procurar" />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="w-full p-2 rounded-md text-text-dark border-0 focus:ring-0"
              placeholder="Digite o nome do projeto..."
              @focus="enableHistory()"
              @input="debounceEmitSearch"
              @blur="disableHistory"
              @keydown.enter="debounceEmitSearch"
              @keydown.esc="closeSearch"
            />
          </div>
          <div
            v-if="showRecentSearches && filteredSearchHistory.length > 0"
            class="bg-white rounded-md m-0 w-full"
          >
            <ul>
              <li
                v-for="search in filteredSearchHistory"
                :key="search"
                class="hover:bg-gray-100 cursor-pointer rounded-md border-t"
                @click="selectRecentSearch(search)"
              >
                <div class="p-4 flex space-x-4 w-full">
                  <img src="@/assets/icons/recent.svg" alt="Recentes" />
                  <span>{{ search }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const showSearchInput = ref(false);
const showRecentSearches = ref(true);
const searchInput = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const recentSearches = ref<string[]>([]);
const route = useRoute();
let typingTimer: ReturnType<typeof setTimeout> | null = null;

const isHomePage = computed(() => route.name === "index");

const filteredSearchHistory = computed(() => {
  if (searchQuery.value.trim()) {
    return recentSearches.value.filter((item) =>
      item.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    );
  }
  return recentSearches.value;
});

const loadSearchHistory = () => {
  const storedHistory = localStorage.getItem("searchHistory");
  recentSearches.value = storedHistory ? JSON.parse(storedHistory) : [];
};

const saveSearchHistory = () => {
  localStorage.setItem("searchHistory", JSON.stringify(recentSearches.value));
};

const toggleSearch = () => {
  showSearchInput.value = true;
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  });
};

const enableHistory = () => {
  showRecentSearches.value = true
}

const disableHistory = () => {
  showRecentSearches.value = false
}

const closeSearch = () => {
  showSearchInput.value = false;
  searchQuery.value = "";
  const eventSearch = new CustomEvent("search", { detail: searchQuery.value });
  window.dispatchEvent(eventSearch);

  const event = new CustomEvent("CloseSearch", {});
  window.dispatchEvent(event);
};

const debounceEmitSearch = () => {
  if (typingTimer) clearTimeout(typingTimer);

  showRecentSearches.value = true

  typingTimer = setTimeout(() => {
      addSearchToHistory(searchQuery.value);
      const event = new CustomEvent("search", { detail: searchQuery.value });
      window.dispatchEvent(event);
      showRecentSearches.value = false
  }, 1000); // Esperar 1 segundo após parar de digitar
};

const addSearchToHistory = (query: string) => {
  if (!recentSearches.value.includes(query)) {
    recentSearches.value.unshift(query);
    if (recentSearches.value.length > 5) {
      recentSearches.value.pop();
    }
    saveSearchHistory();
  }
};

const selectRecentSearch = (query: string) => {
  searchQuery.value = query;
  debounceEmitSearch();
};

onMounted(() => {
  if (isHomePage) {
    loadSearchHistory();
  }
});

</script>


<style scoped>
/* Efeito slide-in/out para o campo de pesquisa */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>