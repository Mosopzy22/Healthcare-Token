import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#04080f",
        surface:  "#0b1220",
        surface2: "#101b2e",
        accent:   "#00e5c8",
        accent2:  "#4fa8ff",
        accent3:  "#ff5e84",
        gold:     "#f5c842",
        muted:    "#7a8ba8",
        border:   "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
