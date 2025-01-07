module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        info: {
          DEFAULT: "#ff0000", // Set your desired red color
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          "error": "#ff0000", // Change info color globally to red
        },
      },
    ],
  },
};
