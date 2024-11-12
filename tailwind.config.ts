import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			v1: {
  				primary: '#FF825B',
  				secondery: '#5479F8',
  				tertiary: '#F56060',
  				background: '#F2F1F6',
  				orange: {
  					'50': '#FFF8F5',
  					'100': '#FFF0E9',
  					'200': '#FFE0D6',
  					'250': '#FFD7CB',
  					'300': '#FFC1AD',
  					'350': '#FFB69F',
  					'400': '#FFA284',
  					'500': '#FF825B',
  					'600': '#FF7A32',
  					'700': '#ED5707',
  					'800': '#BF4300'
  				},
  				blue: {
  					'100': '#E1E8FF',
  					'200': '#C3CEF6',
  					'300': '#ADBCE2',
  					'400': '#8594D4',
  					'500': '#5479F8',
  					'600': '#375FEB',
  					'700': '#183FC6'
  				},
  				red: {
  					'100': '#FEF3F3',
  					'200': '#FEEBEB',
  					'300': '#FDD8D8',
  					'400': '#FBC0C0',
  					'500': '#F89090',
  					'600': '#F56060',
  					'700': '#F23030'
  				},
  				grey: {
  					'50': '#F9FAFB',
  					'100': '#F3F4F6',
  					'200': '#E5E7EB',
  					'300': '#DEE2E6',
  					'400': '#CED4DA',
  					'500': '#BAC0C7',
  					'600': '#A1A8AF',
  					'700': '#686C70',
  					'800': '#4D5155',
  					'900': '#303235'
  				},
  				white: '#FFFBFA',
  				'text-primary': {
  					'50': '#E8E8F1',
  					'100': '#C7C6D4',
  					'200': '#9F9EAE',
  					'300': '#6E6E86',
  					'400': '#3E3D5D',
  					'500': '#0E0D35',
  					'600': '#0B0A2A',
  					'700': '#080820',
  					'800': '#060515',
  					'900': '#03030B'
  				},
  				subtext: {
  					'100': '#F4F5FB',
  					'200': '#E0E1E8',
  					'300': '#D0D1D6',
  					'400': '#BBBEC5',
  					'500': '#A4A9B3',
  					'600': '#8A919D',
  					'700': '#707986',
  					'800': '#626C7A',
  					'900': '#626C7A'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: '#F56060',
  			gradation: '#2B67FA',
  			surface: {
  				dark: '#1C1C1E',
  				light: '#F2F2F7'
  			},
  			text: {
  				dark: '#030303',
  				light: '#FFFFFF'
  			},
  			error: {
  				dark: '#EB4732',
  				light: '#EB4732'
  			},
  			submit: {
  				dark: '#30D158',
  				light: '#49C055'
  			},
  			textPrimary: '#FFFBFA',
  			grayscale: {
  				'50': '#F9FAFB',
  				'100': '#F3F4F6',
  				'200': '#E5E7EB',
  				'300': '#DEE2E6',
  				'400': '#CED4DA',
  				'500': '#BAC0C7',
  				'600': '#858B90',
  				'700': '#686C70',
  				'800': '#4D5155',
  				'900': '#303235'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
