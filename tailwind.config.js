/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // important to scan React files
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],

}
