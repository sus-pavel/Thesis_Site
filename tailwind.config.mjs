/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#06101d",
        panel: "#0a1726",
        line: "#26364a",
        paper: "#eef4f8",
        muted: "#91a1b5",
        electric: "#52a6ff",
        renewable: "#62d98b",
        diesel: "#f4b740",
        alert: "#ff6b45"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};
