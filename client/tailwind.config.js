/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/images/dog-bg.webp')", // Background image
        'custom-gradient': "linear-gradient(0deg, rgba(34,197,94,1) 0%, rgba(204,225,145,1) 40%, rgba(255,255,255,1) 70%, rgba(34,197,94,1) 100%)",
      },
    },  },
  plugins: [],
}

