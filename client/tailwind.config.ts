import type { Config } from 'tailwindcss'

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontSize: {
			"sm-11": "11px",
			"sm-12": "12px",
			"sm-13": "13px",
			"sm-14": "14px",
			"md-16": "16px",
			"lg-23": "23px",
			sm: "14px",
			md: "16px",
			lg: "20px",
			xl: "24px",
			"2xl": "30px",
			"3xl": "36px",
			"4xl": "48px"
		},
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"]
			},
		},
	},
	plugins: [],
} satisfies Config

