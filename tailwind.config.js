/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        shield: {
          ink: "#050816",
          panel: "#0b1024",
          blue: "#38bdf8",
          violet: "#8b5cf6",
          orange: "#fb923c",
        },
      },
      boxShadow: {
        glow: "0 24px 80px rgba(56, 189, 248, 0.18)",
        violet: "0 18px 70px rgba(139, 92, 246, 0.22)",
      },
      backgroundImage: {
        "signal-grid":
          "linear-gradient(135deg, rgba(56,189,248,.16), transparent 30%), linear-gradient(225deg, rgba(139,92,246,.18), transparent 32%), linear-gradient(0deg, rgba(251,146,60,.08), transparent 48%)",
      },
    },
  },
  plugins: [],
};
