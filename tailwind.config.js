/* eslint-disable import/no-extraneous-dependencies */
const color = require('tailwindcss/colors');
const { fontSize } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		container: { screen: {} },
		fontSize: {
			...fontSize,
		},
		colors: {
			...color,
			primary: '#870000',
			secondary: '#ff6600',
			tertiary: '#ff0066',
			quaternary: '#00ff00',
			backgroundColor: '#111',
			textColor: '#eee',
		},
	},
	plugins: [],
};
