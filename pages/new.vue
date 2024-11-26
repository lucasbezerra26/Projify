<template>
  <div class="flex flex-col bg-background-app p-4">
    <!-- Header -->
    <div class="flex items-start justify-between flex-col mb-6">
      <button class="flex items-center space-x-2 text-primary font-medium hover:underline" @click="goBack">
        <img src="@/assets/icons/arrow-left.svg" alt="Voltar"/>
        <span class="text-secondary font-normal">Voltar</span>
      </button>
      <h1 class="text-textPrimary text-xl font-semibold">Novo projeto</h1>
    </div>

    <!-- Form Container -->
    <div class="w-full min-h-9/10 border border-gray-200 p-8 rounded-lg flex flex-col items-center justify-center">
      <form @submit.prevent="onSubmit" class="container mx-auto max-w-lg space-y-6 text-secondary">
        <!-- Nome do Projeto -->
        <div>
          <label for="projectName" class="block text-sm font-medium">
            Nome do projeto
            <span :class="touched.projectName && errors.projectName ? 'text-textRed' : 'text-textSecondary'"
                  class="font-normal">(Obrigatório)</span>
          </label>
          <input
              id="projectName"
              v-model="formData.projectName"
              type="text"
              class="mt-1 block w-full p-2 border rounded-md text-textDark"
              :class="{'border-red-500': touched.projectName && errors.projectName}"
              @blur="touched.projectName = true"
          />
          <p v-if="touched.projectName && errors.projectName" class="text-textRed text-sm mt-1">{{
              errors.projectName
            }}</p>
        </div>

        <!-- Cliente -->
        <div>
          <label for="client" class="block text-sm font-medium">
            Cliente
            <span :class="touched.client && errors.client ? 'text-textRed' : 'text-textSecondary'" class="font-normal">(Obrigatório)</span>
          </label>
          <input
              id="client"
              v-model="formData.client"
              type="text"
              class="mt-1 block w-full p-2 border rounded-md text-textDark"
              :class="{'border-red-500': touched.client && errors.client}"
              @blur="touched.client = true"
          />
          <p v-if="touched.client && errors.client" class="text-textRed text-sm mt-1">{{ errors.client }}</p>
        </div>

        <!-- Datas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="startDate" class="block text-sm font-medium">
              Data de Início
              <span :class="touched.startDate && errors.startDate ? 'text-textRed' : 'text-textSecondary'"
                    class="font-normal">(Obrigatório)</span>
            </label>
            <input
                id="startDate"
                v-model="formData.startDate"
                type="date"
                class="mt-1 block w-full p-2 border rounded-md text-textDark"
                :class="{'border-red-500': touched.startDate && errors.startDate}"
                @blur="touched.startDate = true"
            />
            <p v-if="touched.startDate && errors.startDate" class="text-textRed text-sm mt-1">{{ errors.startDate }}</p>
          </div>

          <div>
            <label for="endDate" class="block text-sm font-medium">
              Data Final
              <span :class="touched.endDate && errors.endDate ? 'text-textRed' : 'text-textSecondary'"
                    class="font-normal">(Obrigatório)</span>
            </label>
            <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                class="mt-1 block w-full p-2 border rounded-md text-textDark"
                :class="{'border-red-500': touched.endDate && errors.endDate}"
                @blur="touched.endDate = true"
            />
            <p v-if="touched.endDate && errors.endDate" class="text-textRed text-sm mt-1">{{ errors.endDate }}</p>
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
              <p class="text-sm text-textSecondary">Escolha uma imagem .jpg ou .png no seu dispositivo</p>
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
                class="bg-light border border-secondary text-secondary font-normal text-sm rounded-full py-2 px-6 hover:bg-secondary hover:text-white transition"
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
              :class="isFormValid ? 'bg-background-primary' : 'bg-background-secondary'"
              class="w-full text-white py-2 px-4 rounded-md hover:bg-background-primary"
          >
            Salvar projeto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import {useRouter} from "vue-router";

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

interface FormTouched {
  projectName: boolean;
  client: boolean;
  startDate: boolean;
  endDate: boolean;
}

const router = useRouter();

const formData = ref<FormData>({
  projectName: "",
  client: "",
  startDate: "",
  endDate: "",
  projectCover: null,
});

const errors = ref<FormErrors>({});
const touched = ref<FormTouched>({
  projectName: false,
  client: false,
  startDate: false,
  endDate: false,
});

const imagePreview = ref<string | null>(null);

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

const onSubmit = () => {
  touched.value = {
    projectName: true,
    client: true,
    startDate: true,
    endDate: true,
  };

  if (validateForm()) {
    console.log("Dados do formulário:", formData.value);
  }
};

const onFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files ? fileInput.files[0] : null;
  if (file) {
    formData.value.projectCover = file;
    imagePreview.value = URL.createObjectURL(file);
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