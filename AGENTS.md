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
