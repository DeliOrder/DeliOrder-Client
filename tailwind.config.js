/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,jsx,js,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans-kr": ["Noto Sans KR", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        bold: "700",
        extraBold: "800",
      },
      colors: {
        "blue-light": "#295BF2",
        "blue-medium": "#365FD9",
        "green-bright": "#AAF23D",
        "orange-warm": "#F2A74B",
        "yellow-bright": "#FFE100",
        "gray-light": "#F2F2F2",
      },
    },
  },
  plugins: [],
};
