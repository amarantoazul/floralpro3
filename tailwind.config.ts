import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blossom: {
          50: "#fce7f3",
          100: "#fbcfe8",
          200: "#f9a8d4",
          300: "#f472b6",
          400: "#ec4899",
          500: "#db2777"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(236, 72, 153, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
