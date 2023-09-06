/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1D1D1F",

          secondary: "#F5F5F7",

          accent: "#2A9D8F",

          neutral: "#2b3440",

          "base-100": "#ffffff",

          info: "#78716c",

          success: "#0d9488",

          warning: "#fbbd23",

          error: "#B40016",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
