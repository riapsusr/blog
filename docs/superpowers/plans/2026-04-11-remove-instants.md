# Remove Instants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the instants feature from the blog completely, fix the duplicate `class` attribute in the table of contents component, and replace the outdated `AGENTS.md` with a minimal guide that matches the current codebase.

**Architecture:** Simplify the site to a single content domain (`posts`) by removing all instants-specific routes, UI, content collections, constants, and content files. Keep the remaining post experience unchanged, make one focused fix in `TableOfContents.astro`, and rewrite `AGENTS.md` so it only documents the current stack, structure, commands, and key files.

**Tech Stack:** Astro 5, TypeScript, Astro Content Collections, Tailwind CSS, Pagefind, pnpm.

---

## File Map

- `src/pages/index.astro` — homepage; remove instants import, data fetch, and section.
- `src/components/Header.astro` — top navigation; remove the instants nav item.
- `src/content/config.ts` — content collection definitions; keep only `posts`.
- `src/consts.ts` — site metadata/constants; remove instants-specific constants.
- `src/types.ts` — shared types; remove the instants homepage-count field from `Site`.
- `src/components/TableOfContents.astro` — fix duplicate `class` attribute on the desktop nav.
- `AGENTS.md` — replace outdated documentation with a minimal, accurate guide.
- `src/pages/instants.astro` — delete.
- `src/components/InstantCard.astro` — delete.
- `src/content/instants/*` — delete all instants content and images.

### Task 1: Remove instants from the UI surface

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/Header.astro`
- Delete: `src/pages/instants.astro`
- Delete: `src/components/InstantCard.astro`
- Test: `pnpm lint`

- [ ] **Step 1: Write the failing verification expectation**

The homepage and header currently still reference instants. Confirm those references exist before changing code.

```bash
grep_expectations='src/pages/index.astro imports InstantCard and getCollection("instants"); src/components/Header.astro links to /instants'
```

- [ ] **Step 2: Run a targeted search to verify the old references exist**

Run: `rg -n "InstantCard|getCollection\(\"instants\"\)|/instants" src/pages/index.astro src/components/Header.astro src/pages/instants.astro src/components/InstantCard.astro`
Expected: matches in all four files.

- [ ] **Step 3: Replace `src/pages/index.astro` with the minimal posts-only homepage**

```astro
---
import Container from "@components/Container.astro";
import PageLayout from "@layouts/PageLayout.astro";
import ArrowCard from "@components/ArrowCard.astro";
import { SITE, HOME } from "@consts";

const posts = (await getCollection("posts"))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);

---
<PageLayout title={HOME.TITLE} description={HOME.DESCRIPTION}>
  <Container>
    <div class="space-y-16">
      <section class="space-y-4">
        <h4 class="font-semibold text-black dark:text-white text-lg">你好，我是 SyuEishin</h4>
        <article>
          <p class="text-justify leading-relaxed">
            我会在这里记录下所有我想说的话，期待这个博客伴随着我，永续地经营下去。如果你想跟我说声嗨，可以通过以下方式联系。
          </p>
        </article>
        <div class="flex gap-5 pt-2">
          <a href="https://t.me/riapsusr" target="_blank" rel="noopener noreferrer" class="text-stone-600 dark:text-stone-400 hover:text-blue-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
          <a href="https://x.com/riapsusr" target="_blank" rel="noopener noreferrer" class="text-stone-600 dark:text-stone-400 hover:text-sky-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
          <a href="mailto:riapsusr@gmail.com" class="text-stone-600 dark:text-stone-400 hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
        </div>
      </section>

      <section class="space-y-6">
        <h5 class="font-semibold text-black dark:text-white">最新文章</h5>
        <ul class="flex flex-col gap-0">
          {posts.map((post, index) => (
            <li>
              <ArrowCard 
                entry={post} 
                class:list={[
                  index === 0 && "rounded-t-lg",
                  index === posts.length - 1 && "rounded-b-lg border-b-0"
                ]}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  </Container>
</PageLayout>
```

- [ ] **Step 4: Remove the instants nav item from `src/components/Header.astro`**

Delete this block and keep the rest unchanged:

```astro
        <Link href="/instants" underline={false}>
          <span class:list={["px-2 py-1.5 rounded-none text-center block", activeClass("/instants")] }>
            刹那
          </span>
        </Link>
```

The final nav should only contain 首页, 文章, 关于.

- [ ] **Step 5: Delete the route and component files now made unreachable**

Delete these files:

```text
src/pages/instants.astro
src/components/InstantCard.astro
```

- [ ] **Step 6: Run lint to catch broken imports from the UI removal**

Run: `pnpm lint`
Expected: PASS with no import/reference errors.

### Task 2: Remove the instants content model and content files

**Files:**
- Modify: `src/content/config.ts`
- Modify: `src/consts.ts`
- Modify: `src/types.ts`
- Delete: `src/content/instants/2026-02-17.md`
- Delete: `src/content/instants/2026-02-17.jpg`
- Delete: `src/content/instants/2026-02-18.md`
- Delete: `src/content/instants/2026-02-18.jpg`
- Delete: `src/content/instants/2026-03-29.md`
- Delete: `src/content/instants/2026-03-29.jpg`
- Delete: `src/content/instants/demo.md`
- Delete: `src/content/instants/demo.jpg`
- Test: `pnpm lint`

- [ ] **Step 1: Verify the instants content model still exists before deleting it**

Run: `rg -n "instants|NUM_INSTANTS_ON_HOMEPAGE|INSTANTS" src/content/config.ts src/consts.ts src/types.ts`
Expected: matches in all three files.

- [ ] **Step 2: Replace `src/content/config.ts` with a posts-only collection config**

```ts
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    category: z.string(),
  }),
});

export const collections = { posts };
```

- [ ] **Step 3: Replace `src/consts.ts` with posts-only constants**

```ts
import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Syu's Blog",
  EMAIL: "riapsusr@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
};

export const HOME: Metadata = {
  TITLE: "主页",
  DESCRIPTION: "",
};

export const POSTS: Metadata = {
  TITLE: "文章",
  DESCRIPTION: "",
};

export const ABOUT: Metadata = {
  TITLE: "关于",
  DESCRIPTION: "关于我",
};

export const SOCIALS: Socials = [
  {
    NAME: "Twitter",
    HREF: "https://x.com/riapsusr",
  },
  {
    NAME: "Telegram",
    HREF: "https://t.me/riapsusr"
  },
  {
    NAME: "Email",
    HREF: "mailto:riapsusr@gmail.com"
  },
  {
    NAME: "RSS",
    HREF: "/rss.xml"
  }
];
```

- [ ] **Step 4: Replace `src/types.ts` with the simplified `Site` type**

```ts
export type Site = {
  NAME: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];
```

- [ ] **Step 5: Delete all instants content files**

Delete these files:

```text
src/content/instants/2026-02-17.md
src/content/instants/2026-02-17.jpg
src/content/instants/2026-02-18.md
src/content/instants/2026-02-18.jpg
src/content/instants/2026-03-29.md
src/content/instants/2026-03-29.jpg
src/content/instants/demo.md
src/content/instants/demo.jpg
```

- [ ] **Step 6: Run lint after the content-model removal**

Run: `pnpm lint`
Expected: PASS with no unused imports or missing symbol errors.

### Task 3: Fix the TOC attribute bug and rewrite AGENTS.md

**Files:**
- Modify: `src/components/TableOfContents.astro`
- Modify: `AGENTS.md`
- Test: `pnpm lint`

- [ ] **Step 1: Verify the duplicate attribute exists before changing it**

Run: `rg -n "class=\"hidden xl:block sticky top-32 w-48 max-h-\[calc\(100vh-8rem\)\] overflow-y-auto border border-black/10 dark:border-white/10 rounded" src/components/TableOfContents.astro`
Expected: two consecutive `class=` lines on the desktop `<nav>`.

- [ ] **Step 2: Collapse the duplicate `class` attributes into one**

Replace the opening desktop nav with this exact markup:

```astro
            <nav
                class="hidden xl:block sticky top-32 w-48 max-h-[calc(100vh-8rem)] overflow-y-auto border border-black/10 dark:border-white/10 rounded-lg p-4"
                aria-label="目录"
            >
```

- [ ] **Step 3: Replace `AGENTS.md` with a minimal, accurate project guide**

```md
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
```

- [ ] **Step 4: Run lint to validate the TOC and doc edits didn't introduce syntax issues**

Run: `pnpm lint`
Expected: PASS.

### Task 4: Perform final repo-wide verification

**Files:**
- Verify: `src/**/*`
- Verify: `AGENTS.md`
- Test: `pnpm lint`
- Test: `pnpm build`

- [ ] **Step 1: Search for stale instants references in active source files**

Run: `rg -n "InstantCard|NUM_INSTANTS_ON_HOMEPAGE|\bINSTANTS\b|getCollection\(\"instants\"\)|collection:\s*\"instants\"|/instants" src AGENTS.md`
Expected: no matches.

- [ ] **Step 2: Search for the duplicate TOC class bug**

Run: `rg -n "class=\"hidden xl:block sticky top-32" src/components/TableOfContents.astro`
Expected: one match only.

- [ ] **Step 3: Run the full verification commands**

Run: `pnpm lint && pnpm build`
Expected: both commands pass; `astro check`, `astro build`, and `pagefind --site dist` complete successfully.

- [ ] **Step 4: Review git diff before any commit**

Run: `git diff -- src/pages/index.astro src/components/Header.astro src/content/config.ts src/consts.ts src/types.ts src/components/TableOfContents.astro AGENTS.md`
Expected: diff shows only the instants removal, TOC fix, and AGENTS rewrite.

## Self-Review

- Spec coverage check: Task 1 removes route/UI entry points; Task 2 removes the instants model and content; Task 3 fixes the TOC bug and rewrites `AGENTS.md`; Task 4 verifies lint/build and absence of stale references.
- Placeholder scan: no `TODO`, `TBD`, or ambiguous “update as needed” language remains.
- Type consistency: all remaining references use `posts`, `SITE.NUM_POSTS_ON_HOMEPAGE`, and the simplified `Site` type; no later task depends on removed instants symbols.
