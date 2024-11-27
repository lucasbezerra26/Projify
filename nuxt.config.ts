export default defineNuxtConfig({
    // Configuração do Vite
    ssr: false,
    nitro: {
        preset: 'static'
    },
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

    app: {
        baseURL: '/projify/',
    },

    devtools: {enabled: true},
});