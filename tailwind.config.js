/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with "class"
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], // Ensure Tailwind scans all UI files
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#1b8386",
          secondary: "#90cfd0",
          foreground: "#002626",
          accent: "#dcf1f1",
          background: "#f1fafa",
        },
        accent: {
          gold: "#d19e45",
          lightGold: "#e9d49f",
          cream: "#f3eace",
          darkBrown: "#200900",
        },
        neutral: {
          main: "#e2e8f0",
          foreground: "#111827",
          background: "#f3f4f6",
        },
        status: {
          danger: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        small: "0px -5px 25px 0px rgba(0,0,0,0.05)",
        shadowSm: "0px 4px 8px 0px rgba(0,38,38,0.05), 0px 0px 4px 0px rgba(0,38,38,0.03)",
      },
      borderRadius: {
        "0": "0rem",
        "1": "0.025rem",
        "2": "0.083rem",
        "3": "0.25rem",
        "4": "0.333rem",
        "5": "0.417rem",
        "6": "0.5rem",
        "7": "0.667rem",
        "8": "0.833rem",
        "9": "0.95rem",
        "10": "1rem",
        "11": "1.083rem",
        "12": "1.167rem",
        "13": "1.333rem",
        "14": "1.5rem",
        "15": "1.667rem",
        "16": "2.5rem",
        "17": "2.667rem",
        "18": "3.25rem",
        "19": "3.333rem",
        "20": "4.167rem",
        "21": "83.25rem",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.8" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 600ms linear forwards",
      },
    },
  },
  plugins: [],
};
