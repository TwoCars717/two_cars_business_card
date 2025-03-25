/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#4ecca3',
        black: '#000000',
      },
      animation:{
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { 'filter': 'drop-shadow(0 0 0px #3ef8f5)' },
          '50%': { 'filter': 'drop-shadow(0 0 6px #3ef8f5)' },
        },
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
