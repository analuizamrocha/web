import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"The Seasons"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1400px',
        '9xl': '1500px',
        container: '1432px',
      },
    },
    colors: {
      // TODO: Set primary, secondary, text colors, etc..
      // add stuff to our theme so it matches our design
    },
  },
  plugins: [],
}

export default config
