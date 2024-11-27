export default defineNuxtConfig({
  // Configuração do Vite
  ssr: false,
  vite: {
    build: {
      target: 'esnext',
    },
  },
  compatibilityDate: "2024-11-20",

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt"
  ],

  devtools: { enabled: true },
});