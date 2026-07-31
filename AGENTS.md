# Syu's Blog

## Project overview
- Site: `https://199623.xyz`
- Framework: Astro static site
- Package manager: pnpm
- Primary content type: posts

## Tech stack
- Astro 5
- TypeScript
- Tailwind CSS
- Astro Content Collections
- Pagefind search
- RSS via `@astrojs/rss`
- Vercel Analytics / Speed Insights

## Commands
```bash
pnpm dev
pnpm dev:network
pnpm build
pnpm preview
pnpm preview:network
pnpm lint
pnpm lint:fix
```

## Current source structure
```text
src/
├── components/   # shared Astro components
│   └── PostArchive.astro  # 服务端渲染的分类归档（含分类筛选导航）
├── content/
│   ├── config.ts # content collection schema
│   └── posts/    # markdown post content (+ images/ 目录)
├── layouts/      # shared page layout
├── lib/
│   └── utils.ts  # 日期/摘要/链接工具 (getPostURL, getPostCategoryURL, getPostExcerpt ...)
├── pages/
│   ├── index.astro       # homepage
│   ├── about.astro       # about page
│   ├── search.astro      # Pagefind UI
│   ├── 404.astro         # 404 page
│   ├── robots.txt.ts     # robots.txt
│   ├── rss.xml.ts        # RSS feed（正文图片/链接绝对化）
│   └── posts/
│       ├── index.astro              # posts archive（使用 PostArchive）
│       ├── category/[category].astro  # 每个分类一个静态页面
│       └── [...slug].astro          # individual post page, TOC
├── styles/       # global styles（语义色 CSS 变量定义处）
├── consts.ts     # site constants and metadata
├── types.ts      # shared types
└── env.d.ts      # window 上 cleanup hook 的类型声明
```
另：`public/og-default.png`（1200×630 默认分享图，源稿在 `design/og-default.svg`）。

## Content model
Posts live in `src/content/posts/*.md` with frontmatter:

```yaml
---
title: 文章标题
date: YYYY-MM-DD
category: 分类名称
draft: false
---
```

`date` 是日历字符串，schema 为 `z.preprocess((v) => v instanceof Date ? v.toISOString().slice(0, 10) : v, z.string().date())`——Astro 的 frontmatter 解析器（js-yaml，YAML 1.1）会把未加引号的 `YYYY-MM-DD` 自动转成 UTC 午夜的 `Date`，preprocess 负责规整回日历字符串（保留 `z.string().date()` 校验）。格式化/排序一律按字符串处理（`src/lib/utils.ts`）；需要时间点时（如 RSS `pubDate`）显式构造 `new Date(\`${date}T00:00:00.000Z\`)`，不要直接把字符串当 Date 用。

## Key files
- `src/content/config.ts` — post collection schema（date 为日历字符串）
- `src/layouts/PageLayout.astro` — shared page shell (含 head slot)
- `src/lib/utils.ts` — `getPostURL` / `getPostCategoryURL` / `getPostExcerpt` 等集中工具，所有文章链接构造必须走此模块；摘要用 MarkdownIt 解析纯文本（body 级缓存）
- `src/env.d.ts` — `window` 上各页面 cleanup hook 的类型声明
- `src/styles/global.css` — global visual system
- `tailwind.config.mjs` — semantic colors (`fg` / `fg-invert` / `body` / `muted` / `surface*` / `control*` / `line` / `line-soft` / `decoration` / `overlay` / `accent` / `highlight`)，避免散落硬编码 `text-black` / `text-stone-500`
- `astro.config.mjs` — 响应式图片全局配置（`image.layout: "full-width"` + `responsiveStyles`），正文 Markdown 图片自动生成 srcset/sizes

## Design tokens
- 在 `tailwind.config.mjs` 已声明语义色：`fg`(亮色主前景)、`fg-invert`(暗色主前景)、`muted`(次级文本，对比度 ≥ 4.5:1)、`line`(分隔线) 以及 `body` / `surface` / `surface-raised` / `surface-hover` / `surface-overlay` / `control` / `control-hover` / `line-soft` / `decoration` / `overlay` / `accent` / `highlight`。这些色由 `src/styles/global.css` 在 `html.dark` 下覆盖 CSS 变量，因此消费处无需 `dark:` 前缀（`fg`/`fg-invert` 除外）。优先用这些 token，避免直接写 `text-black`、`text-stone-500`、`border-black/5` 等散落颜色。
- 圆角阶沿用 Tailwind 默认 (`sm` 轻 / `md` 标准卡片 / `lg` 浮层 / `full` 胶囊)。文章列表卡片基础类**不带** `rounded-*`，由列表项首/末通过 `rounded-t-lg` / `rounded-b-lg border-b-0` 控制圆角；分类筛选是服务端静态页面（`PostArchive.astro`），圆角在渲染时直接计算，`posts/index.astro` 无动态筛选脚本。

## Maintenance
- 如果页面结构有变更（新增、删除、重命名页面或组件），及时更新本文件中的源码结构等相关内容。

## Verification
- Run `pnpm lint` after code changes.
- Run `pnpm build` before finishing structural changes.
- Pagefind search data is generated during `pnpm build`.

## Module aliases
`tsconfig.json` declares explicit path aliases used throughout the source:
- `@components/*` -> `src/components/*`
- `@layouts/*`    -> `src/layouts/*`
- `@lib/*`        -> `src/lib/*`
- `@consts`       -> `src/consts.ts`
- `@types`        -> `src/types.ts`

Astro reads these aliases from `tsconfig.json` and applies them to both Vite (build) and the TS language server (IDE). Do not use a bare `@*` wildcard — it risks colliding with npm package scopes like `@vercel`.

## Client-side script conventions
View Transitions are currently disabled (see `src/components/Head.astro`). The page-level client scripts (Footer theme toggle, TableOfContents, InteractiveDogLogo, pagefind) are written for a single page load. They each guard against repeat initialization via a unified `__cleanup*` hook on `window`（如 `__tocCleanup__` / `__cleanupDogLogo__` / `__cleanupThemeToggle__` / `__cleanupPagefind__`），hook 类型集中在 `src/env.d.ts`。模式为：脚本开头先调用同名旧 hook（若有），结束时注册新的 cleanup；cleanup 必须移除全部监听、取消 timer/rAF，避免未来启用 View Transitions 时泄漏。

If View Transitions (`<ClientRouter />`) are re-enabled in future, each script must be re-run on `astro:page-load` and torn down on `astro:after-swap`. The existing cleanup hooks are the intended seam for that — reuse them instead of rewriting the scripts.
