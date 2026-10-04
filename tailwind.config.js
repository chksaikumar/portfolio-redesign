/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "350px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        night: "#05080a",      // page bg (dark)
        pine: "#0b1110",       // surface (dark)
        card: "#0e1513",       // card (dark)
        cream: "#f4f5f3",      // page bg (light)
        paper: "#ffffff",      // surface (light)
        accent: "#34d399",     // mint glow accent
        accentdeep: "#0e9f6e",
        ink: "#0c1210",        // text (light mode)
        fog: "#e9efec",        // text (dark mode)
        muteddark: "#8fa098",  // secondary text (dark)
        mutedlight: "#5b6663", // secondary text (light)
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          "Inter",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 24px 0 rgba(52, 211, 153, 0.35)",
        card: "0 20px 60px -20px rgba(0, 0, 0, 0.55)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(24px, -18px)" },
          "66%": { transform: "translate(-18px, 14px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      // `light:` variant applies when <html> carries the .light class.
      // Base styles are the dark theme; light: overrides switch to light mode.
      addVariant("light", ".light &");
    },
  ],
};
