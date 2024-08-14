import type { Config } from 'tailwindcss'

export default {
	important: true,
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		animation: {
			aimloader: "aimloader 1s infinite ease-in-out",
			rotation: "rotation 1s linear infinite"
		},
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
		keyframes: {
			rotation: {
				"0%": {
					transform: " rotate(0deg)"
				},
				"100%": {
					transform: "rotate(360deg)"
				}
			},
			aimloader: {
				"50%": {
					transform: "scale(1) translate(-50%, -50%)"
				}
			}
		}
	},
	plugins: [],
} satisfies Config
