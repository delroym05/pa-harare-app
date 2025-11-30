module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // scan all your source files
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'modern-negra': ['"Modern Negra"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
