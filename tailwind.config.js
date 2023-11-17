/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      green: '#10b981',
      leaf: '#BFE6CB',
      darkleaf: '#A0C7AC',
    },
    extend: {
      fontFamily: {
        LANENAR: ['LANENAR'],
        Gentle: ['Gentle'],
        Roboto: ['Roboto'],
        antipasto: ['antipasto'],
        helvetica: ['helvetica'],
        manrope: ['manrope_regular'],
        manropeBold: ['manrope_bold'],
      },
    },
  },
  plugins: [],
}
