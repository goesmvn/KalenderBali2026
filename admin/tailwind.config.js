/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#fcf4f4',
                    100: '#f8e6e6',
                    200: '#f0caca',
                    300: '#e5a5a5',
                    400: '#d57677',
                    500: '#c24e4f',
                    600: '#a73638',
                    700: '#8e2a2b',
                    800: '#762527',
                    900: '#622325',
                    950: '#351011',
                },
            },
        },
    },
    plugins: [],
};
