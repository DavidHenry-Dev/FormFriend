/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/partials/*.ejs', './views/*.ejs'],
  theme: {
    extend: {},
    colors: {
      accent: '#18182f',
      subColor: '#161616',
    },
  },
  plugins: [require('daisyui')],
};
