/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/partials/*.ejs', './views/*.ejs'],
  theme: {
    extend: {
      colors: {
        customMain: '#e8eced',
        customSecondary: '#f6f8f8',
        customThird: '#9b9b9e',
        customButton: '#1a2024',
        customAccent: '#e2836b',
        customAccent2: '#804436',
        customText: '#1a2024',
      },
    },
  },
  plugins: [require('daisyui')],
};
