/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050508',
        surface: '#0D0D14',
        accent: {
          teal: '#7EFFF5',
          purple: '#C084FC',
          pink: '#F0ABFC'
        },
        warning: '#FBBF24',
        success: '#4ADE80',
        danger: '#F87171',
        text: {
          primary: '#E8E8F0',
          muted: '#666680'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'orb-float': 'orbFloat 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
