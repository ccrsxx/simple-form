module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'white-ish': 'rgba(255,255,255,0.8)'
      }
    }
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('children', '& > *');
    }
  ]
};
