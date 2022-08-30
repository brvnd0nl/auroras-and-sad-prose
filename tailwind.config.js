/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        20: '20',
        30: '30',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  variants: {
    lineClamp: ['responsive', 'hover']
  }
}
