// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        safari: {
          yellow: '#f59e0b',
          orange: '#ea580c',
          green: '#16a34a',
          brown: '#92400e',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gentle': 'pulse-gentle 2s infinite',
        'bounce-gentle': 'bounce 1s infinite',
      },
      backgroundImage: {
        'safari-gradient': 'linear-gradient(135deg, #f59e0b, #d97706, #f97316)',
        'east-africa-sunset': 'linear-gradient(135deg, #ff7e5f, #feb47b)',
        'savanna': 'linear-gradient(135deg, #8B4513, #228B22)',
      },
      boxShadow: {
        'custom': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
