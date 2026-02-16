/** @type {import('tailwindcss').Config} */
console.log("holaaaaaaaaaaaaaaaaaaa")
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        }
      },
      animation: {
        heartbeat: 'heartbeat 1.3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}