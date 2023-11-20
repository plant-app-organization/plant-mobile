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
      lightorange: '#FDE9E9',
      magicgrey: '#73859e',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      green: '#10b981',
      leaf: '#BFE6CB',
      darkleaf: '#A0C7AC',
      lightleaf: '#e7ffec',
      lightyellow: '#E4F5FF',
      lightblue: '#E4F5FF',
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
