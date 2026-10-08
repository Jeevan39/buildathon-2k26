/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cit: {
          dark: "#071224",
          navy: "#0b1d3a",
          navyLight: "#132a52",
          blue: "#0284c7",
          cyan: "#0ea5e9",
          ice: "#f0f6ff",
          iceDark: "#e2edfc",
          magenta: "#e11d48",
          pink: "#f43f5e",
          green: "#10b981",
          gold: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Outfit", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-blue": "0 0 25px -5px rgba(14, 165, 233, 0.4)",
        "glow-magenta": "0 0 25px -5px rgba(225, 29, 72, 0.4)",
        "card-soft": "0 10px 30px -10px rgba(11, 29, 58, 0.08)",
        "card-hover": "0 20px 40px -15px rgba(11, 29, 58, 0.15)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
