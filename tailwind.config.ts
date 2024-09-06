
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'p-25': '#F8F8FF',
        'p-50': '#E9EAFF',
        'p-100': '#DADCFF',
        'p-200': '#B4B9FF',
        'p-300': '#9C97FF',
        'p-400': '#907EFE',
        'p-500': '#7857FE',
        'p-600': '#6947DB',
        'p-700': '#422693',
        'p-800': '#201755',
        'p-900': '#170E31',
        'p-1000': '#0A0118',
        'p-1100': '#070114',

        'p-1200': '#04010D',

        //* Light Mode Colors
        // Text
        'light-text-dark': '#201755',
        'light-text-light': '#475569',

        // Background


        // Stroke
        'light-stroke': '#DFE5FA',


        //* Dark Mode Colors
        // Text
        "dark-text-dark": 'rgba(223,229,250,0.35)',
        "dark-text-light": 'rgba(223,229,250,0.90)',

        // Background
        "dark-bg-light": 'rgba(223,229,250,0.02)',

        // Stroke
        "dark-stroke": 'rgba(223,229,250,0.09)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
