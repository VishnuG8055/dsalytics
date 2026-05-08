/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080810',
          secondary: '#0e0e1a',
          card: '#12121f',
        },
        accent: {
          DEFAULT: '#6c63ff',
          light: '#8b84ff',
        },
        border: {
          DEFAULT: '#1e1e35',
          light: '#2a2a45',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}