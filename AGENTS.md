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
├── lib/          # utility functions
├── pages/
│   ├── index.astro       # homepage
│   ├── about.astro       # about page
│   ├── search.astro      # Pagefind UI
│   ├── 404.astro         # 404 page
│   ├── robots.txt.ts     # robots.txt
│   ├── rss.xml.ts         # RSS feed
│   └── posts/
│       ├── index.astro       # posts archive with category filter
│       └── [...slug].astro   # individual post page and TOC
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
- `src/layouts/PageLayout.astro` — shared page shell
- `src/styles/global.css` — global visual system

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
View Transitions are currently disabled (see `src/components/Head.astro`). The page-level client scripts (Footer theme toggle, post lightbox, TableOfContents, posts filter) are written for a single page load. They each guard against repeat initialization via a `__cleanup*` hook on `window` and/or a `data-ready` attribute.

If View Transitions (`<ClientRouter />`) are re-enabled in future, each script must be re-run on `astro:page-load` and torn down on `astro:after-swap`. The existing cleanup hooks are the intended seam for that — reuse them instead of rewriting the scripts.
