import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1220',
        surface: '#111827',
        surfaceHighlight: 'rgba(18,26,44,0.82)',
        primary: '#111827',
        accent: '#4F8CFF',
        secondaryAccent: '#7C5CFF',
        success: '#3DD598',
        warning: '#F5B942',
        navy: {
          deep: '#0B1220',
          soft: '#0F172A',
          dark: '#080C16',
        },
        gray: {
          300: '#C6D0E3',
          400: '#94A3B8',
          500: '#7F8EA3',
        },
        slate: {
          400: '#94A3B8',
          500: '#64748B',
          900: '#111827',
          950: '#0B1220',
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
