/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#e5e7eb'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
