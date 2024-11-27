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
                primary: {
                    DEFAULT: "#1C1930",
                    50: "#F3F1FF",
                    100: "#E1DCFF",
                    200: "#B2A8FF",
                    500: "#695CCD",
                    900: "#1C1930",
                },
                secondary: {
                    DEFAULT: '#695CCD',
                    50: "#F4F2FF",
                    100: "#8C8B93",
                    500: "#695CCD",
                },
                yellow: "#FFB23D",
                light: "#FFFFFF",
                danger: "#C40000",
                text: {
                    primary: {
                        DEFAULT: "#1F1283",
                        500: "#695CCD"
                    },
                    secondary: "#717171",
                    light: "#FFFFFF",
                    dark: "#1C1930",
                    red: "#C40000",
                },
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
