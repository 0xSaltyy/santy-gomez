import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "ui-serif", "Georgia", "serif"]
      },
      colors: {
        ink: "#171819",
        paper: "#faf6ef",
        line: "#e8ddd2",
        forest: "#17624f",
        wine: "#9a3d68",
        brass: "#b98935",
        lavender: "#c9b8ff",
        cyan: "#9ddfec",
        blush: "#f4b8c8",
        butter: "#f3dc86",
        navy: "#17253a"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 24, 25, 0.09)",
        glow: "0 22px 70px rgba(157, 223, 236, 0.24), 0 10px 38px rgba(154, 61, 104, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
