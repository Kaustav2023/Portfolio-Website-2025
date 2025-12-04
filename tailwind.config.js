/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'twinkle': 'twinkle ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'float': 'float 4s ease-in-out infinite',
                'orbit': 'orbit 5s linear infinite',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                orbit: {
                    'from': { transform: 'rotate(0deg) translateX(70px) rotate(0deg)' },
                    'to': { transform: 'rotate(360deg) translateX(70px) rotate(-360deg)' },
                },
            },
        },
    },
    plugins: [],
}
