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
        void: '#030508',
        obsidian: '#070A0F',
        carbon: '#0D121B',
        graphite: '#161D2A',
        terminal: {
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(34, 197, 94, 0.4)',
          glow: 'rgba(34, 197, 94, 0.15)',
        },
        kbj: {
          green: '#22C55E',
          lime: '#A3E635',
          emerald: '#10B981',
          cyan: '#00F0FF',
          red: '#EF4444',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 35px -5px rgba(34, 197, 94, 0.35)',
        'glow-lime': '0 0 35px -5px rgba(163, 230, 53, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'glass-edge': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.18), transparent 70%)',
        'subzero-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.12), transparent 70%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'noise-pattern': 'radial-gradient(rgba(34, 197, 94, 0.06) 1px, transparent 0)',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
