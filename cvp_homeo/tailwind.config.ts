import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D7A4F", // Forest Green
          dark: "#1A3C2E", // Deep Canopy
        },
        accent: {
          DEFAULT: "#C9A84C", // Warm Gold
        },
        parent: {
          DEFAULT: "#1B2B4B", // CVP Navy
        },
        background: {
          DEFAULT: "#FAFAF7", // Parchment White
        },
        surface: {
          DEFAULT: "#E8F5EE", // Sage Tint
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "9999px", // pill shape
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

// Made with Bob
