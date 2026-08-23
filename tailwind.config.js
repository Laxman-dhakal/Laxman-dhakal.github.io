module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 80px rgba(59, 130, 246, 0.18)',
      },
      backgroundImage: {
        'hero-soft': 'radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
};
