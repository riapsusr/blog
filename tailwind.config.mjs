import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // 语义色 —— 集中切换主题与品牌色，避免散落的 black / stone-500 hardcoded
        // 注意：不要使用 `border` 作为键名，会与 Tailwind 的 border 宽度工具类冲突。
        fg: "rgb(0 0 0)",                // 主前景（亮色模式）
        "fg-invert": "rgb(255 255 255)", // 暗色模式主前景
        muted: "#78716c",               // 次级文本，对比度 >= 4.5:1
        line: "rgba(0,0,0,0.10)",        // 分隔线/边框颜色
      },
      spacing: {
        // 排版节奏：section 16 / block 10 / group 6 / item 4
        section: "4rem",
        block: "2.5rem",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
};
