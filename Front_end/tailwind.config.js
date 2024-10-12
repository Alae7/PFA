/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2A2B39',
        'yellow-100': '#E8FBB3',
        "hero-pattern": "linear-gradient(90deg, rgba(226,209,195,1) 100%, rgba(253,252,251,1) 100%);",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

