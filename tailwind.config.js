/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    opacity: ["group-hover", "hover"],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        openMobileNav: {
          "0%": {
            transform: "scale(0) translatex(-50%)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1) translatex(-50%)",
            opacity: 1,
          },
        },

        closeMobileNav: {
          "0%": {
            transform: "scale(1) translatex(-50%)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(0) translatex(-50%)",
            opacity: 0,
          },
        },
      },

      animation: {
        openMobileNav: "openMobileNav 0.2s linear forwards",
        closeMobileNav: "closeMobileNav 0.2s linear forwards",
      },
    },
  },
  plugins: [],
};
