import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-posts/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: { v1: "var(--font-family)", "v1-en": "Arial" },
    extend: {
      colors: {
        background: "var(--background)", //(Dark Midnight Blue)
        text: "var(--text)", // (Chalk White)
        subText: "var(--sub-text)", // (Chalk White)
        primary: "#4A90E2", // (Soft Slate Blue)
        secondary: "#8A9BA8", // (Grayish Blue)
        error: "#FF5E5E", // (Soft Red)
        success: "#6ABF69", // (Chalk Green)
        accent: "#E2A8F3", // (Soft Lavender),
      },
    },
  },
  plugins: [],
};
export default config;
