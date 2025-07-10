import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Brand Colors - formalized from @theme tokens
      colors: {
        // Primary brand colors
        brand: {
          primary: '#c27e5c',
          secondary: '#d4b7a2',
          tertiary: '#b08771',
        },
        // Semantic colors
        primary: '#663a25',
        secondary: '#d4b7a2',
        tertiary: '#b08771',
        accent: {
          neutral: '#7a8b68',
        },
        background: '#fff9f3',
        // Neutral palette
        neutral: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4de',
          300: '#d4ccc1',
          400: '#b5a599',
          500: '#967d6f',
          600: '#7a8b68',
          700: '#5a4f47',
          800: '#463d36',
          900: '#2d2622',
        },
      },
      // Typography scale
      fontFamily: {
        serif: ['var(--font-unna)', 'Unna', 'serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      // Container and layout
      maxWidth: {
        '8xl': '1400px',
        '9xl': '1500px',
        container: '1432px',
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
      // Border radius scale
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Box shadow variants
      boxShadow: {
        brand: '0 4px 14px 0 rgba(102, 58, 37, 0.15)',
        'brand-lg': '0 10px 25px 0 rgba(102, 58, 37, 0.2)',
      },
      // Animation timing
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
