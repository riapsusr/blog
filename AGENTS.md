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
├── pages/        # Astro routes
├── styles/       # global styles
├── consts.ts     # site constants and metadata
└── types.ts      # shared types
```

## Content model
Posts live in `src/content/posts/*.md` with frontmatter:

```yaml
---
title: 文章标题
description: 文章描述
date: YYYY-MM-DD
category: 分类名称
draft: false
---
```

## Key files
- `src/pages/index.astro` — homepage intro and latest posts list
- `src/pages/posts/index.astro` — posts archive with category filter
- `src/pages/posts/[...slug].astro` — individual post page and TOC integration
- `src/content/config.ts` — post collection schema
- `src/layouts/PageLayout.astro` — shared page shell
- `src/styles/global.css` — global visual system
- `src/pages/search.astro` — Pagefind UI integration
- `src/pages/rss.xml.ts` — RSS feed generation

## Verification
- Run `pnpm lint` after code changes.
- Run `pnpm build` before finishing structural changes.
- Pagefind search data is generated during `pnpm build`.
