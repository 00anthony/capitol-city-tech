
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'liquid': 'liquid 20s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'scroll': 'scroll 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'spin-slow': 'spin 10s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(50px, -70px) scale(1.2)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        liquid: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(10%, -10%) rotate(5deg)' },
          '66%': { transform: 'translate(-5%, 15%) rotate(-5deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    }
  },
  plugins: [],
}
