/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-secondary' : '0 0px 4px #bebebe'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-50%)' },
        },
        'background-wave': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-10%) translateY(10%)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
      },
      animation: {
        wave: 'wave 15s ease-in-out infinite',
        'background-wave': 'background-wave 10s ease-in-out infinite',
      },
      colors: {
        dark: '#2B2D42',
        light: '#FFFFFF',
        backgroundLightColor: "#e8e8e8",
        backgroundLight: "#f8f8f8",
        boxShadowLightColor: "#bebebe",
        primary: {
          DEFAULT: '#AB1E23',
          light: '#F7BAC5',
        },
        secondary: {
          DEFAULT: '#2B2D42',
          light: '#5a5b67',
          dark: "#222439"
        },
        bordersColor: '#d0d5e1',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      fontSize: {
        'xs': ['10px', '14px'],
        'sm': ['11px', '15px'],
        '2sm': ['12px', '16px'],
        'md': ['13px', '18px'],
        '2md': ['14px', '20px'],
        'lg': ['15px', '22px'],
        '2lg': ['16px', '24px'],
        'xl': ['17px', '26px'],
        'xxl': ['20px', '30px'],
      },
      screens: {
        'xs': { 'min': '479px' },
        'sm': { 'min': '639px' },
        'md': { 'min': '768px' },
        'lg': { 'min': '992px' },
        'xl': { 'min': '1344px' },
        '2xl': { 'min': '1555px' },
        '3xl': { 'min': '1805px' },
      },
    },
  },
  plugins: [],
}