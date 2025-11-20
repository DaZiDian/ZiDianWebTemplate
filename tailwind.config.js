/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tokyo-night': {
          'bg': '#1a1b26',
          'bg-dark': '#16161e',
          'bg-highlight': '#292e42',
          'fg': '#c0caf5',
          'fg-dark': '#a9b1d6',
          'blue': '#7aa2f7',
          'cyan': '#7dcfff',
          'magenta': '#bb9af7',
          'purple': '#9d7cd8',
          'orange': '#ff9e64',
          'yellow': '#e0af68',
          'green': '#9ece6a',
          'red': '#f7768e',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['JetBrains Mono', 'STZhongsong', '华文中宋', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-out': 'fadeOut 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'expand': 'expand 0.3s ease-out',
        'pulse-line': 'pulseLine 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        expand: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseLine: {
          '0%, 100%': { transform: 'scaleX(0.5)', opacity: '0.5' },
          '50%': { transform: 'scaleX(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

