// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'background-app': '#F4F2FF',
                'background-secondary': '#B2A8FF',
                'background-primary': '#695CCD',
                primary: '#1C1930',
                secondary: '#695CCD',
                light: '#FFFFFF',
                textRed: '#C40000',
                textPrimary: '#1F1283',
                textSecondary: '#717171',
                textLight: '#FFFFFF',
                textDark: '#1C1930',

            },
            minHeight: {
                '9/10': '90vh',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
