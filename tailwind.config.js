/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      spacing: {
        'custom': '235px'
      },
      fontSize: {
        'lg': '0.75rem',
        'md': '0.90rem',
        'xl': '1.5rem',
      },
      width: {
        'custom-navbar': '800px'
      },

      colors: {
        customColor: '#2b7786',
        footerColor: "#0a1f29",
        doctorName: "#42a895",
        buttonColor: "#00b48d",
        buttonHov: "#17a2b8",
        megamenuColor: "#429997",
        slot: "#0078bf",
        slotButton: "#00b48d",
        loginBackgroundColor: "#148e9c",
        hoverLogin: "#139bab",
        loginImage: "#d6fbff",
        adminHomeBarChartUser: "#cd8ced",
        adminHomeBarChartDoctor: "#5f62de"
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

