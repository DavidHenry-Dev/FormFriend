/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/partials/*.ejs', './views/*.ejs'],
  theme: {
    extend: {
      colors: {
        customMain: '#e8eced',
        customSecondary: '#f6f8f8',
        customThird: '#e8eced',
        customButton: '#1a2024',
        customAccent: '#e2836b',
        customAccent2: '#804436',
        customText: '#1a2024',
      },
    },
  },
  plugins: [require('daisyui')],
};
