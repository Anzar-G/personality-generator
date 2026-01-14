/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#ff006e",
                "neon-yellow": "#FFE500",
                "neon-purple": "#9D4EDD",
                "background-light": "#f5f5f5",
                "background-dark": "#0a0a0a",
                "card-dark": "#161616",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
            },
            animation: {
                'noise': 'noise-anim 2s infinite linear alternate-reverse',
            },
            keyframes: {
                'noise-anim': {
                    '0%': { 'clip': 'rect(26px, 9999px, 86px, 0)' },
                    '5%': { 'clip': 'rect(86px, 9999px, 16px, 0)' },
                    '10%': { 'clip': 'rect(6px, 9999px, 6px, 0)' },
                    '15%': { 'clip': 'rect(66px, 9999px, 46px, 0)' },
                    '20%': { 'clip': 'rect(96px, 9999px, 86px, 0)' },
                    '25%': { 'clip': 'rect(26px, 9999px, 16px, 0)' },
                    '30%': { 'clip': 'rect(56px, 9999px, 56px, 0)' },
                    '35%': { 'clip': 'rect(26px, 9999px, 36px, 0)' },
                    '40%': { 'clip': 'rect(16px, 9999px, 56px, 0)' },
                    '45%': { 'clip': 'rect(46px, 9999px, 86px, 0)' },
                    '50%': { 'clip': 'rect(6px, 9999px, 66px, 0)' },
                    '55%': { 'clip': 'rect(36px, 9999px, 66px, 0)' },
                    '60%': { 'clip': 'rect(6px, 9999px, 6px, 0)' },
                    '65%': { 'clip': 'rect(96px, 9999px, 56px, 0)' },
                    '70%': { 'clip': 'rect(56px, 9999px, 86px, 0)' },
                    '75%': { 'clip': 'rect(26px, 9999px, 16px, 0)' },
                    '80%': { 'clip': 'rect(66px, 9999px, 36px, 0)' },
                    '85%': { 'clip': 'rect(6px, 9999px, 66px, 0)' },
                    '90%': { 'clip': 'rect(36px, 9999px, 76px, 0)' },
                    '95%': { 'clip': 'rect(66px, 9999px, 16px, 0)' },
                    '100%': { 'clip': 'rect(6px, 9999px, 46px, 0)' },
                }
            }
        },
    },
    plugins: [],
}
