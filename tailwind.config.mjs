import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 1. 将所有 sans 字体合并，霞鹜文楷放在第一位
        // 2. 后面紧跟 defaultTheme.fontFamily.sans，它包含了所有的系统兜底字体
        sans: ['"LXGW WenKai Screen"', ...defaultTheme.fontFamily.sans],
        
        // 如果你还想保留 Lora 作为衬线字体
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("@tailwindcss/typography")],
};