/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      colors: {
        pyrus: {
          DEFAULT: '#e53e3e',
          light: '#fc8181',
          dark: '#9b2c2c',
        },
        aquos: {
          DEFAULT: '#3182ce',
          light: '#63b3ed',
          dark: '#2c5282',
        },
        ventus: {
          DEFAULT: '#38a169',
          light: '#68d391',
          dark: '#276749',
        },
        haos: {
          DEFAULT: '#d69e2e',
          light: '#f6e05e',
          dark: '#975a16',
        },
        darkus: {
          DEFAULT: '#805ad5',
          light: '#b794f4',
          dark: '#553c9a',
        },
        subterra: {
          DEFAULT: '#b7791f',
          light: '#f6ad55',
          dark: '#7b341e',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
