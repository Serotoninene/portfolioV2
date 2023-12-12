/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1C0F13",
        secondary: {
          50: "#fdfcfc",
          100: "#f7f7f5",
          200: "#f4f3f0",
          300: "#eeede9",
          400: "#ebe9e5",
          500: "#e6e4de",
          600: "#d1cfca",
          700: "#a3a29e",
          800: "#7f7d7a",
          900: "#61605d",
        },
      },
    },
  },
  plugins: [],
};
