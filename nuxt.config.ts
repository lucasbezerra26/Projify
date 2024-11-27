export default defineNuxtConfig({
    ssr: false,
    nitro: {
        preset: 'static'
    },
    vite: {
        build: {
            target: 'esnext',
        },
        define: {
            'process.env.PUBLIC_PATH': '/projify/'
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
        buildAssetsDir: '/projify/_nuxt/'
    },
    router: {
        options: {
            base: '/projify/',
        },
    },
    devtools: {enabled: true},
});