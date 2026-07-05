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
        // muted / line 用 CSS 变量驱动，亮/暗模式由 global.css 在 `html.dark` 下覆盖变量，
        // 这样 `text-muted` / `border-line` 在两种模式自动取对应值，无需 `dark:` 前缀。
        fg: "rgb(0 0 0)",                // 主前景（亮色模式）— 暗色直接用 `fg-invert`
        "fg-invert": "rgb(255 255 255)", // 暗色模式主前景
        muted: "var(--color-muted, #78716c)",
        line: "var(--color-line, rgba(0,0,0,0.10))",
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
