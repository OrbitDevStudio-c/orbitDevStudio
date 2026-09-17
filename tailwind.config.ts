import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070B16',
        surface: '#0B1222',
        surfaceHighlight: 'rgba(18,26,44,0.82)',
        primary: '#111827',
        accent: '#1677FF',
        secondaryAccent: '#6C2BFF',
        brandCyan: '#00D9FF',
        success: '#3DD598',
        warning: '#F5B942',
        navy: {
          deep: '#0B1222',
          soft: '#101A2D',
          dark: '#070B16',
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
