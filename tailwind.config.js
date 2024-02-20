/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom background color here
        customBackground: '#f0f4f8',
      },
    },
  },
  plugins: [require("daisyui")],
}