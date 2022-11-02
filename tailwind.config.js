/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/partials/*.ejs', './views/*.ejs'],
  theme: {
    extend: {
      colors: {
        customMain: '#1b1a21',
        customSecondary: '#2f2c3b',
        customAccent: '#fb6750',
        customText: '#c8c7ce',
      },
    },
  },
  plugins: [require('daisyui')],
};
