import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b4c6fc',
          400: '#8da2fb',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        ai: {
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          pink: '#ec4899',
          amber: '#f59e0b',
          emerald: '#10b981',
        },
        dark: {
          bg: '#0a0d14',
          surface: '#111726',
          card: '#161e31',
          border: '#1f2b45',
          muted: '#8b9bb4',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'splash-in': 'splashIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'splash-bar': 'splashBar 2.2s ease-in-out forwards',
      },
      keyframes: {
        splashIn: {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        splashBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(139, 92, 246, 0.6)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
