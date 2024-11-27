<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        class="bg-white rounded-lg shadow-lg p-6 relative
              w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary-500 p-3 rounded-full shadow-md">
          <img src="@/assets/icons/trash-white.svg" alt="Remover" class="w-6 h-6 text-white" />
        </div>

        <h2 class="text-xl font-semibold text-center text-text-primary mt-8 mb-4">{{ title }}</h2>

        <hr class="border-secondary-100 mb-4" />

        <p class="text-text-secondary text-center mb-4">{{ message }}</p>

        <p v-if="itemName" class="text-center font-semibold text-lg text-text-dark mb-6">{{ itemName }}</p>

        <div class="flex justify-around">
          <button
            class="px-14 py-2 rounded-full border border-secondary text-text-primary-500"
            @click="$emit('cancel')"
          >
            Cancelar
          </button>
          <button
            class="px-14 py-2 rounded-full bg-secondary text-text-light hover:bg-purple-600"
            @click="$emit('confirm')"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  show: Boolean,
  title: {
    type: String,
    default: "Confirmar ação",
  },
  message: {
    type: String,
    default: "Tem certeza que deseja realizar esta ação?",
  },
  itemName: {
    type: String,
    default: "",
  },
});

defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
/* Transição para o modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>