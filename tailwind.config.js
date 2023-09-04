/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#ffc24c',
          100: ' #e2e959',
          200: '#002ba8',
          300: '#0075ed',
          400: '#00d3ff',
          500: '#002ba8',
          600: '#002ba8',
          700: '#002ba8',
          800: '#002ba8',
          900: '#002ba8'
    
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

