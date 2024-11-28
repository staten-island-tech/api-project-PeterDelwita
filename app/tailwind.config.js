/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./JS/main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // daisyui: {
  //   themes: ["synthwave"],
  // },
  plugins: [require("daisyui")],
};
