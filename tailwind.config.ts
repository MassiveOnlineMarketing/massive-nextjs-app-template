
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
        // Primary/ brand colors
        'base-50': '#F8F8FF',
        'base-100': '#F2F3FF',
        'base-200': '#DFE5FA',
        'base-300': '#B4B9FF',
        'base-400': '#907EFE',
        'base-500': '#7857FE',
        'base-600': '#6947DB',
        'base-700': '#422693',
        'base-800': '#2C3462',
        'base-900': '#170E31',
        'base-950': '#070114',


        //* Light mode 
        // Text
        'theme-light-text-primary':         '#2C3462', // base-800
        'theme-light-text-secondary':       '#475569', // slate-600
        'theme-light-text-tertiary':        '#64748B', // slate-500
        'theme-light-text-notes':           '#94A3B8', // slate-400

        // Background
        'theme-light-background-primary':   '#F8F8FF', // base-50
        'theme-light-background-secondary': '#F2F3FF', // base-100

        // Stroke
        'theme-light-stroke':                '#DFE5FA', // base-200


        //* Night mode
        // Text
        'theme-night-text-primary':          'rgba(223,229,250,0.90)',
        'theme-night-text-secondary':        'rgba(223,229,250,0.75)',
        'theme-night-text-tertiary':         'rgba(223,229,250,0.35)',
        'theme-night-text-notes':            'rgba(223,229,250,0.5)',

        // Background
        'theme-night-background-primary':    'rgba(223,229,250,0.02)',
        'theme-night-background-secondary':  'rgba(223,229,250,0.02)',
        
        // Stroke
        'theme-night-stroke':                'rgba(223,229,250,0.09)',


      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "open-down": {
          from: { maxHeight: 0 },
          to: { maxHeight: "1000px" },
        },
        modalOpacityIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        modalOpacityOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "open-down": "open-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "modal-opacity-in": "modalOpacityIn 0.5s ease forwards",
        "modal-opacity-out": "modalOpacityOut 0.5s ease forwards",
        'pulse-fast': 'pulse 0.2s linear infinite',
      },
      borderRadius: {
        'lg': '0.625rem'
      },
      spacing: {
        '0-5': '2px',
        '1-5': '6px',
        '2-5': '10px',
        '3-5': '14px',
      },
      margin:{
        '0-5': '2px',
        '1-5': '6px',
        '2-5': '10px',
        '3-5': '14px',
      },
      padding: {
        '0-5': '2px',
        '1-5': '6px',
        '2-5': '10px',
        '3-5': '14px',
      },
      transitionProperty: {
        'width': 'width',
      },
      boxShadow: {
        "neon": "0 12px 13px rgba(120 87 254 / 0.06), 0 20px 35px rgba(120 87 254 / 0.10), 0 40px 60px rgba(120 87 254 / 0.12)",

      },
    },
  },
  plugins: [],
};
