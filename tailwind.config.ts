import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070B14',
        surface: '#101827',
        surfaceHighlight: '#121B2D',
        primary: '#0C1220',
        accent: '#3B6FE0',
        gray: {
          300: '#F3F6FF',
          400: '#A9B5CF',
          500: '#8F9CB5',
        },
        slate: {
          400: '#7F8CA8',
          500: '#67738D',
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config
