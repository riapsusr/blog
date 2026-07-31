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
        // 其余语义色由 global.css 在 `html.dark` 下覆盖；因此无需在消费处散落 stone / black / white。
        fg: "rgb(0 0 0)",
        "fg-invert": "rgb(255 255 255)",
        body: "var(--color-body, #44403c)",
        muted: "var(--color-muted, #78716c)",
        surface: "var(--color-surface, #ffffff)",
        "surface-raised": "var(--color-surface-raised, #f5f5f4)",
        "surface-hover": "var(--color-surface-hover, #e7e5e4)",
        "surface-overlay": "var(--color-surface-overlay, rgb(255 255 255 / 0.75))",
        control: "var(--color-control, #e7e5e4)",
        "control-hover": "var(--color-control-hover, #d6d3d1)",
        line: "var(--color-line, rgba(0,0,0,0.10))",
        "line-soft": "var(--color-line-soft, rgba(0,0,0,0.05))",
        decoration: "var(--color-decoration, rgba(0,0,0,0.25))",
        overlay: "var(--color-overlay, rgb(0 0 0 / 0.30))",
        accent: "var(--color-accent, rgb(239 68 68 / 0.80))",
        highlight: "var(--color-highlight, #fef08a)",
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
