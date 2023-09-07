/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			container: {
				center: true
			},
			colors: {
				primary: {
					100: '#ccd6ec',
					200: '#99add9',
					300: '#6685c6',
					400: '#335cb3',
					500: '#0033a0',
					600: '#002980',
					700: '#001f60',
					800: '#001440',
					900: '#000a20'
				},
				secondary: {
					100: '#f9fad4',
					200: '#f4f6a9',
					300: '#eef17f',
					400: '#e9ed54',
					500: '#e3e829',
					600: '#b6ba21',
					700: '#888b19',
					800: '#5b5d10',
					900: '#2d2e08'
				}
			}
		}
	},
	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')]
};
