const brandColors = {
  birdBlue: "#1D9BF0",
  paltinum: "#E7E9EA",
  silver: "#71767B",
  onix: "#222528",
  richBlack: "#15202B",
};

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ...brandColors,
        backgroundColor: brandColors.richBlack,
        textColor: brandColors.paltinum,
      },
    },
  },
  plugins: [],
};
