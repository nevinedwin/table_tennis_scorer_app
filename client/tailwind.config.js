import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-secondary': '0 0px 4px #bebebe'
      },
      textShadow: {
        default: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 8px rgba(0, 0, 0, 0.6)',
        lg: '3px 3px 12px rgba(0, 0, 0, 0.7)',
      },
      transitionTimingFunction: {
        'custom': "cubic-bezier(0.645, 0.045, 0.355, 1)"
      },
      transitionProperty: {
        'bg-border': 'background-color, border-color'
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
        'line-move': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        },
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0%)" }
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
          "0%": { opacity: 0 }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        gradientMove: {
          '100%': {backgroundPosition: '0% 50%'},
          '0%': {backgroundPosition: '200% 50%'}
        }
      },
      animation: {
        wave: 'wave 15s ease-in-out infinite',
        'background-wave': 'background-wave 10s ease-in-out infinite',
        'line-move': 'line-move 1.5s linear infinite',
        slideIn: "slideIn .8s ease-in-out forwards",
        slideInRight: "slideInRight .8s ease-in-out forwards",
        opacity: "opacity .3s ease-in-out",
        'spin-slow': 'spin 2s linear infinite',
        'gradient-move': 'gradientMove 3s ease-in-out infinite'
      },
      spacing: {
        '2': '0.5rem',
      },
      colors: {
        dark: '#2B2D42',
        light: '#FFFFFF',
        backgroundLightColor: "#e8e8e8",
        backgroundLight: "#f8f8f8",
        boxShadowLightColor: "#bebebe",
        darkBlack: '#121212',
        greyShade: "#242526",
        // blueColor: "#3F88FB",
        blueColor: "#AB1E23",
        navbarBg: "#0E1528",
        cardBg: "#0D1629",
        bgColor: "#13151B",
        primary: {
          DEFAULT: '#AB1E23',
          light: '#d9363c',
        },
        secondary: {
          DEFAULT: '#2B2D42',
          light: '#5a5b67',
          dark: "#222439"
        },
        borderColor: '#333',
      },
      fontFamily: {
        default: ['Roboto', 'sans-serif'],
        ttHeading: ['rushk', 'sans-serif']
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
        '4xl': ['50px', '65px'],
        '5xl': ['80px', '100px'],
        '10xl': ['180px', '200px'],
        'custom-3xl':['35px', '45px'],
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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.word-spacing-2': {
          'word-spacing': '0.5rem',
        },
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '4px 2px 1px rgba(47, 48, 48, 0.7)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 12px rgba(0, 0, 0, 0.7)',
        },
        '.text-shadow-xl': {
          textShadow: '7px 4px 1px rgba(47, 48, 48, 0.7)',
        },
      });
    },
    require('tailwind-scrollbar')
  ],
}