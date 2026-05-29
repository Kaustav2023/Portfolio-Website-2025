/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            colors: {
                accent: '#c8ff00',
                'accent-dim': '#a8d600',
                dark: {
                    primary: '#0a0a0a',
                    card: '#111111',
                    'card-hover': '#1a1a1a',
                    border: '#1e1e1e',
                },
            },
            animation: {
                'twinkle': 'twinkle ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'blob': 'blob-morph 8s ease-in-out infinite',
                'marquee': 'marquee 30s linear infinite',
                'spin-slow': 'spin 20s linear infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'gradient': 'gradient-shift 6s ease infinite',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.3)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'blob-morph': {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                    '50%': { borderRadius: '50% 60% 30% 60% / 30% 40% 70% 60%' },
                    '75%': { borderRadius: '60% 30% 50% 40% / 70% 50% 40% 60%' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(200, 255, 0, 0.15)' },
                    '50%': { boxShadow: '0 0 40px rgba(200, 255, 0, 0.3)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [],
}
