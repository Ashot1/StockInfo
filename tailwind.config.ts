import type { Config } from 'tailwindcss'
const {
   default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
   darkMode: ['class'],
   prefix: '',
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   safelist: [{ pattern: /delay-(100|200|300|500|700|1000)/ }],
   theme: {
      container: {
         center: true,
         padding: '2rem',
         screens: {
            '2xl': '1400px',
         },
      },
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         screens: {
            '300p': '340px',
            '500p': '520px',
            '768p': '820px',
            '1024p': '1120px',
            '1080p': '1640px',
            '4k': '2250px',
         },
         colors: {
            main: 'var(--Main)',
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
         },
         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
            'appearance-kf': {
               from: { opacity: '0' },
               to: { opacity: '1' },
            },
            'appearance-moving-kf': {
               from: { opacity: '0', transform: 'translateX(-30px)' },
               to: { opacity: '1', transform: 'translateX(0)' },
            },
            'appearance-moving-top-kf': {
               from: { opacity: '0', transform: 'translateY(40px)' },
               to: { opacity: '1', transform: 'translateX(0)' },
            },
            'scaling-kf': {
               from: {
                  transform: 'scale(0.7)',
               },
               '70%': {
                  transform: 'scale(1.1)',
               },
               to: {
                  transform: 'scale(1)',
               },
            },
            'scaling-normal-kf': {
               from: {
                  transform: 'scale(0.7)',
               },
               to: {
                  transform: 'scale(1)',
               },
            },
            aurora: {
               from: {
                  backgroundPosition: '50% 50%, 50% 50%',
               },
               to: {
                  backgroundPosition: '350% 50%, 350% 50%',
               },
            },
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            appearance: 'appearance-kf 2s ease-out',
            'fast-appearance': 'appearance-kf .4s ease-out',
            'appearance-moving': 'appearance-moving-kf 2.5s ease-out',
            'appearance-moving-top': 'appearance-moving-top-kf 2.5s ease-out',
            'fast-appearance-moving-top':
               'appearance-moving-top-kf .3s ease-out',
            'middle-appearance-moving-top':
               'appearance-moving-top-kf .9s ease-out',
            scaling: 'scaling-kf .5s ease-in-out',
            'scaling-normal': 'scaling-normal-kf .5s ease-in-out',
            aurora: 'aurora 60s linear infinite',
         },
      },
   },
   plugins: [require('tailwindcss-animate'), addVariablesForColors],
}
export default config

function addVariablesForColors({ addBase, theme }: any) {
   let allColors = flattenColorPalette(theme('colors'))
   let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   )

   addBase({
      ':root': newVars,
   })
}
