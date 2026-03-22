import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#263875',
          dark:    '#1a2754',
          light:   '#EEF1FA',
        },
        red: {
          DEFAULT: '#E63946',
          dark:    '#C0202E',
          light:   '#FDECEA',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
}
export default config