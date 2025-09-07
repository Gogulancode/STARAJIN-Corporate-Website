/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        starajin: {
          blue: '#023EDA',           // Primary
          orange: '#ffc700',         // Secondary
          'dark-blue': '#012e9f',    // Adjusted darker shade derived from primary
          'light-blue': '#4d78ff',   // Harmonized lighter variant
          gray: '#64748b',
          'light-gray': '#f8fafc',
        },
        primary: '#023EDA',          // direct alias
        secondary: '#ffc700'
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans KR', 'sans-serif'],
        'korean': ['Noto Sans KR', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      }
    },
  },
  plugins: [],
};
