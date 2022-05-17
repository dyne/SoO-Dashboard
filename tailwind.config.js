module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Syne', sans-serif"]
      },
      colors: {
        primary: '#FCEFDF',
      }
    },
  }
};
