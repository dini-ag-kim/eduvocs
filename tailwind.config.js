/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		themes: ['fantasy', 'night'],
		darkTheme: 'night'
	},
	darkMode: ['selector', '[data-theme="night"]']
};
