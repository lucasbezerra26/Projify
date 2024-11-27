<template>
  <div class="flex flex-col bg-secondary-50 p-4">
    <!-- Header -->
    <div class="flex items-start justify-between flex-col mb-6">
      <button class="flex items-center space-x-2 text-primary font-medium hover:underline" @click="goBack">
        <img src="@/assets/icons/arrow-left.svg" alt="Voltar"/>
        <span class="text-secondary font-normal">Voltar</span>
      </button>
      <h1 class="text-text-primary text-xl font-semibold">Novo projeto</h1>
    </div>

    <!-- Form Container -->
    <div class="w-full min-h-9/10 border border-gray-200 p-8 rounded-lg flex flex-col items-center justify-center">
      <form @submit.prevent="onSubmit" class="container mx-auto max-w-lg space-y-6 text-text-primary-500">
        <!-- Nome do Projeto -->
        <div :class="touched.projectName && errors.projectName ? 'text-text-red' : 'text-text-primary-500'">
          <label for="projectName" class="block text-sm font-medium">
            Nome do projeto
            <span
                  class="font-normal text-text-secondary">(Obrigatório)</span>
          </label>
          <input
              id="projectName"
              v-model="formData.projectName"
              type="text"
              class="mt-1 block w-full p-2 border rounded-md text-text-dark"
              :class="[{'border-red-500': touched.projectName && errors.projectName}, touched.projectName && errors.projectName ? 'text-text-red' : 'text-text-secondary']"
              @blur="touched.projectName = true"
          />
          <p v-if="touched.projectName && errors.projectName" class="text-text-red text-sm mt-1">{{
              errors.projectName
            }}</p>
        </div>

        <!-- Cliente -->
        <div :class="touched.client && errors.client ? 'text-text-red' : 'text-text-primary-500'">
          <label for="client" class="block text-sm font-medium">
            Cliente
            <span  class="font-normal text-text-secondary">(Obrigatório)</span>
          </label>
          <input
              id="client"
              v-model="formData.client"
              type="text"
              class="mt-1 block w-full p-2 border rounded-md text-text-dark"
              :class="[{'border-red-500': touched.client && errors.client}, touched.client && errors.client ? 'text-text-red' : '']"
              @blur="touched.client = true"
          />
          <p v-if="touched.client && errors.client" class="text-text-red text-sm mt-1">{{ errors.client }}</p>
        </div>

        <!-- Datas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div :class="touched.startDate && errors.startDate ? 'text-text-red' : ''">
            <label for="startDate" class="block text-sm font-medium">
              Data de Início
              <span
                    class="font-normal text-text-secondary">(Obrigatório)</span>
            </label>
            <input
                id="startDate"
                v-model="formData.startDate"
                type="date"
                class="mt-1 block w-full p-2 border rounded-md text-text-dark"
                :class="[{'border-red-500': touched.startDate && errors.startDate}, touched.startDate && errors.startDate ? 'text-text-red' : '']"
                @blur="touched.startDate = true"
            />
            <p v-if="touched.startDate && errors.startDate" class="text-text-red text-sm mt-1">{{ errors.startDate }}</p>
          </div>

          <div>
            <label for="endDate" class="block text-sm font-medium" :class="touched.endDate && errors.endDate ? 'text-text-red' : ''">
              Data Final
              <span
                    class="font-normal text-text-secondary">(Obrigatório)</span>
            </label>
            <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                class="mt-1 block w-full p-2 border rounded-md text-text-dark"
                :class="[{'border-red-500': touched.endDate && errors.endDate}, touched.endDate && errors.endDate ? 'text-text-red' : '']"
                @blur="touched.endDate = true"
            />
            <p v-if="touched.endDate && errors.endDate" class="text-text-red text-sm mt-1">{{ errors.endDate }}</p>
          </div>
        </div>

        <!-- Capa do Projeto -->
        <div>
          <label for="projectCover" class="block text-sm font-medium mb-2">Capa do projeto</label>
          <div
              class="flex flex-col items-center justify-center w-full h-44 border border-dashed border-gray-300 rounded-lg space-y-3 relative"
              :class="formData.projectCover ? 'w-[702px] h-[395px] bg-cover bg-center' : ''"
              :style="{ backgroundImage: formData.projectCover ? `url(${imagePreview})` : '' }"
          >
            <div v-if="!formData.projectCover" class="flex flex-col items-center justify-center">
              <img src="@/assets/icons/upload-light.svg" alt="Upload"/>
              <p class="text-sm text-text-secondary">Escolha uma imagem .jpg ou .png no seu dispositivo</p>
            </div>

            <button
                v-if="formData.projectCover"
                type="button"
                class="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white"
                @click="removeImage"
            >
              <img src="@/assets/icons/trash.svg" alt="Remover" class="h-4 w-4"/>
            </button>

            <button
                v-if="!formData.projectCover"
                type="button"
                class="border border-secondary text-primary-500 font-normal text-sm rounded-full py-2 px-6 hover:bg-secondary hover:text-white transition bg-light"
                @click="triggerFileInput"
            >
              Selecionar
            </button>
            <input id="projectCover" type="file" accept="image/png, image/jpeg" class="hidden" ref="fileInput"
                   @change="onFileChange"/></div>
        </div>

        <!-- Botão de Salvar -->
        <div>
          <button
              type="submit"
              :class="isFormValid ? 'bg-secondary' : 'bg-primary-200'"
              class="w-full text-white py-2 px-4 rounded-md hover:bg-secondary"
          >
            Salvar projeto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

interface FormData {
  projectName: string;
  client: string;
  startDate: string;
  endDate: string;
  projectCover: File | null;
}

interface FormErrors {
  projectName?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
}

interface Project {
  id: number;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  coverImage: string | null; // Base64 da imagem
}

const router = useRouter();
const route = useRoute();

const formData = ref<FormData>({
  projectName: "",
  client: "",
  startDate: "",
  endDate: "",
  projectCover: null,
});

const errors = ref<FormErrors>({});
const touched = ref({
  projectName: false,
  client: false,
  startDate: false,
  endDate: false,
});

const imagePreview = ref<string | null>(null);

const loadProjectsFromStorage = (): Project[] => {
  const storedProjects = localStorage.getItem("projects");
  return storedProjects ? JSON.parse(storedProjects) : [];
};

const saveProjectsToStorage = (projects: Project[]) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

// Função para converter arquivo para Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Carrega dados do projeto para edição, se houver ID na rota
onMounted(async () => {
  const projectId = route.query.id;
  if (projectId) {
    const projects = loadProjectsFromStorage();
    const project = projects.find((p) => p.id === Number(projectId));
    if (project) {
      formData.value.projectName = project.name;
      formData.value.client = project.client;
      formData.value.startDate = project.startDate;
      formData.value.endDate = project.endDate;
      imagePreview.value = project.coverImage;
    }
  }
});

const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.projectName || formData.value.projectName.length < 2) {
    errors.value.projectName = "O nome do projeto deve ter pelo menos 2 caracteres.";
    isValid = false;
  }

  if (!formData.value.client || formData.value.client.length < 1) {
    errors.value.client = "O cliente deve ter pelo menos 1 caractere.";
    isValid = false;
  }

  if (!formData.value.startDate) {
    errors.value.startDate = "Por favor, selecione uma data de início.";
    isValid = false;
  }

  if (!formData.value.endDate) {
    errors.value.endDate = "Por favor, selecione uma data final.";
    isValid = false;
  } else if (formData.value.startDate && formData.value.endDate < formData.value.startDate) {
    errors.value.endDate = "A data final deve ser depois da data de início.";
    isValid = false;
  }

  return isValid;
};

const isFormValid = computed(() => validateForm());

const onSubmit = async () => {
  touched.value = {
    projectName: true,
    client: true,
    startDate: true,
    endDate: true,
  };

  if (validateForm()) {
    const projects = loadProjectsFromStorage();
    const projectId = route.query.id;

    let coverImageBase64 = null;
    if (formData.value.projectCover) {
      coverImageBase64 = await fileToBase64(formData.value.projectCover); // Converte para Base64
    }

    if (projectId) {
      // Atualiza o projeto existente
      const index = projects.findIndex((p) => p.id === Number(projectId));
      if (index !== -1) {
        projects[index] = {
          ...projects[index],
          name: formData.value.projectName,
          client: formData.value.client,
          startDate: formData.value.startDate,
          endDate: formData.value.endDate,
          coverImage: coverImageBase64 || projects[index].coverImage,
        };
      }
    } else {
      // Adiciona um novo projeto
      projects.push({
        id: Date.now(),
        name: formData.value.projectName,
        client: formData.value.client,
        startDate: formData.value.startDate,
        endDate: formData.value.endDate,
        isFavorite: false,
        coverImage: coverImageBase64,
      });
    }

    saveProjectsToStorage(projects);
    router.push("/");
  }
};

const onFileChange = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files ? fileInput.files[0] : null;
  if (file) {
    formData.value.projectCover = file;
    imagePreview.value = await fileToBase64(file); // Exibe a imagem como preview
  }
};

const removeImage = () => {
  formData.value.projectCover = null;
  imagePreview.value = null;
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const fileInput = ref<HTMLInputElement | null>(null);

const goBack = () => {
  router.back();
};
</script>