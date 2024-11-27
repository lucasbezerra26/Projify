export default defineNuxtConfig({
    base: '/projify/',
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
        buildAssetsDir: '/_nuxt/'
    },
    // router: {
    //     options: {
    //         base: '/projify/',
    //     },
    // },
    devtools: {enabled: true},
});