const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  // Safelist for map tooltips
  safelist: ['text-discovered', 'whitespace-normal', 'w-80'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // https://tailwindcss.com/docs/animation#using-custom-values
      animation: {
        fadeInFromLeft: 'fadeInFromLeft 200ms ease-in',
        fadeOutToLeft: 'fadeOutToLeft 200ms ease-in',
        fadeIn: 'fadeIn 100ms ease-in',
        fadeOut: 'fadeOut 100ms ease-in',
      },
      colors: {
        gray: colors.zinc,
        'gray-1000': '#101010',
        'gray-1100': '#0e1116',
        brand: {
          100: '#fef3e4',
          200: '#fbdcae',
          300: '#f9c677',
          400: '#f6af41',
          500: '#f4980b',
          600: '#be7609',
          700: '#875406',
          800: '#ad9c82',
          900: '#1b1101',
        },
        discovered: '#95ef9f',
      },
      data: {
        // https://www.radix-ui.com/docs/primitives/overview/animation#animating-with-css-animation
        // https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes
        open: 'state~="open"',
        closed: 'state~="closed"',
      },
      height: {
        // Full screen height without nav bar
        'full-height': 'calc(100vh - 56px)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: ({ theme }) => ({
        'vc-border-gradient': `radial-gradient(at left top, ${theme(
          'colors.gray.500',
        )}, 50px, ${theme('colors.gray.800')} 50%)`,
      }),
      keyframes: ({ theme }) => ({
        fadeInFromLeft: {
          '0%': { left: -400, opacity: 0 },
          '100%': { left: 0, opacity: 1 },
        },
        fadeOutToLeft: {
          '0%': { left: 0, opacity: 1 },
          '100%': { left: -400, opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        rerender: {
          '0%': {
            ['border-color']: theme('colors.vercel.pink'),
          },
          '40%': {
            ['border-color']: theme('colors.vercel.pink'),
          },
        },
        highlight: {
          '0%': {
            background: theme('colors.vercel.pink'),
            color: theme('colors.white'),
          },
          '40%': {
            background: theme('colors.vercel.pink'),
            color: theme('colors.white'),
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        translateXReset: {
          '100%': {
            transform: 'translateX(0)',
          },
        },
        fadeToTransparent: {
          '0%': {
            opacity: 1,
          },
          '40%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
