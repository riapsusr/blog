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
├── content/
│   ├── config.ts # content collection schema
│   └── posts/    # markdown post content
├── layouts/      # shared page layout
├── lib/
│   ├── utils.ts    # 日期/摘要/链接工具 (getPostURL, getPostExcerpt ...)
│   └── cleanup.ts  # 客户端脚本统一 guard 模式
├── pages/
│   ├── index.astro       # homepage
│   ├── about.astro       # about page
│   ├── search.astro      # Pagefind UI
│   ├── 404.astro         # 404 page
│   ├── robots.txt.ts     # robots.txt
│   ├── rss.xml.ts         # RSS feed
│   └── posts/
│       ├── index.astro       # posts archive with category filter
│       └── [...slug].astro   # individual post page, TOC
├── styles/       # global styles
├── consts.ts     # site constants and metadata
└── types.ts      # shared types
```

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

## Key files
- `src/content/config.ts` — post collection schema
- `src/layouts/PageLayout.astro` — shared page shell (含 head slot)
- `src/lib/utils.ts` — `getPostURL` / `getPostExcerpt` 等集中工具，所有文章链接构造必须走此模块
- `src/lib/cleanup.ts` — 客户端脚本初始化/清理的统一接缝
- `src/styles/global.css` — global visual system
- `tailwind.config.mjs` — semantic colors (`fg` / `fg-invert` / `muted` / `line`)，避免散落硬编码 `text-black` / `text-stone-500`

## Design tokens
- 在 `tailwind.config.mjs` 已声明语义色：`fg`(亮色主前景)、`fg-invert`(暗色主前景)、`muted`(次级文本，对比度 ≥ 4.5:1)、`line`(分隔线)。优先用这些 token，避免直接写 `text-black`、`text-stone-500`、`border-black/5` 等散落颜色。
- 圆角阶沿用 Tailwind 默认 (`sm` 轻 / `md` 标准卡片 / `lg` 浮层 / `full` 胶囊)。文章列表卡片基础类**不带** `rounded-*`，由列表项首/末通过 `rounded-t-lg` / `rounded-b-lg border-b-0` 控制圆角；`posts/index.astro` 的筛选脚本会动态重设首/末可见项圆角——保持该逻辑。

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
View Transitions are currently disabled (see `src/components/Head.astro`). The page-level client scripts (Footer theme toggle, TableOfContents, posts filter, pagefind) are written for a single page load. They each guard against repeat initialization via a unified `__cleanup*` hook on `window`（如 `__tocCleanup__` / `__cleanupPostFilter__` / `__cleanupPagefind__` / `__cleanupDogLogo__`）。`src/lib/cleanup.ts` 提供该模式的 TS 版辅助（`withCleanup` / `runOnReady` / `markReady`）供模块脚本使用；inline 脚本沿用统一的 guard 模式即可。

If View Transitions (`<ClientRouter />`) are re-enabled in future, each script must be re-run on `astro:page-load` and torn down on `astro:after-swap`. The existing cleanup hooks are the intended seam for that — reuse them instead of rewriting the scripts.
