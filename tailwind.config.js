/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    "./src/frontend/**/*.{tsx, ts, js, jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#cfdeff',
          200: '#a4bbeb',
          300: '#7794d4',
          400: '#5677bf',
          DEFAULT: '#5677bf',
          500: '#3e60a8',
          600: '#2c4d94',
          700: '#1c3d85',
          800: '#112d69',
          900: '#071f54',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin .5s linear infinite',
      },
    },
  },
  plugins: [],
}

