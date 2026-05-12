module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#4ee6ff',
          purple: '#b368ff'
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
