# Remove Instants And Refresh Project Docs Design

> **For agentic workers:** This document captures the approved design before implementation planning.

**Goal:** Remove the instants feature completely from the blog, fix the duplicate `class` attribute bug in `src/components/TableOfContents.astro`, and replace the outdated `AGENTS.md` with a minimal document that matches the current codebase.

**Architecture:** The site will be simplified to a single content domain: posts. All instants-specific routes, content collections, components, constants, and content files will be removed so the runtime, content model, and documentation stay aligned. Documentation will be reduced to only the high-signal operational facts that are verifiable from the current repository state.

**Tech Stack:** Astro 5, TypeScript, Astro Content Collections, Tailwind CSS, Pagefind, pnpm.

---

## Scope

### Included
- Remove the `/instants` route and all UI entry points to it.
- Remove instants usage from the homepage.
- Remove the instants content collection from `src/content/config.ts`.
- Remove instants-only constants, types, components, and content files.
- Fix the duplicate `class` attribute in `src/components/TableOfContents.astro`.
- Rewrite `AGENTS.md` into a minimal, accurate project guide.
- Verify with `pnpm lint` and `pnpm build`.

### Excluded
- No redesign of the remaining post pages.
- No refactor of unrelated styles or components.
- No changes to RSS, search architecture, deployment settings, or analytics beyond what is required by instants removal.

## File-Level Design

### Files to modify
- `src/pages/index.astro`
  - Remove instants data loading, `InstantCard` import, and the “最新刹那” section.
- `src/components/Header.astro`
  - Remove the `/instants` navigation item.
- `src/content/config.ts`
  - Remove the `instants` collection definition and export only `posts`.
- `src/consts.ts`
  - Remove `NUM_INSTANTS_ON_HOMEPAGE` and `INSTANTS` metadata.
- `src/types.ts`
  - Remove the `NUM_INSTANTS_ON_HOMEPAGE` field from `Site`.
- `src/components/TableOfContents.astro`
  - Replace the duplicate `class` attributes on the desktop `<nav>` with one correct attribute.
- `AGENTS.md`
  - Replace outdated content with a minimal current reference.

### Files to delete
- `src/pages/instants.astro`
- `src/components/InstantCard.astro`
- `src/content/instants/2026-02-17.md`
- `src/content/instants/2026-02-17.jpg`
- `src/content/instants/2026-02-18.md`
- `src/content/instants/2026-02-18.jpg`
- `src/content/instants/2026-03-29.md`
- `src/content/instants/2026-03-29.jpg`
- `src/content/instants/demo.md`
- `src/content/instants/demo.jpg`

### Files intentionally left alone
- `src/pages/rss.xml.ts`
  - Already depends only on posts.
- `src/pages/search.astro`
  - Search stays as-is; index contents will naturally update on build.
- `src/pages/posts/[...slug].astro`
  - No instants dependency.

## Behavior After Change

### Routing
- `/instants` will no longer exist because `src/pages/instants.astro` is removed.
- Navigation will only expose home, posts, and about.

### Homepage
- The homepage will only show the intro block and latest posts block.
- No placeholder or replacement section will be added where instants used to be.

### Content model
- The project will use a single content collection: `posts`.
- `src/content/instants/` will no longer exist.

### Documentation
- `AGENTS.md` will become a concise operational reference containing:
  - stack and package manager
  - verified commands
  - current source directory structure
  - current content model (`posts` only)
  - key files for common edits
- It will not preserve outdated sections that describe removed instants behavior or inaccurate workflows.

## AGENTS.md Structure

The rewritten `AGENTS.md` should be short and factual. It will contain:
1. Project overview
2. Tech stack
3. Commands from `package.json`
4. Current `src/` structure
5. Content model (`posts` frontmatter)
6. Key files and what they control
7. Verification expectations (`pnpm lint`, `pnpm build`)

## Testing And Verification Design

### Required verification
- Run `pnpm lint`
- Run `pnpm build`

### Expected success criteria
- No imports or references to `InstantCard`, `instants`, `NUM_INSTANTS_ON_HOMEPAGE`, or `INSTANTS` remain in active source files.
- Astro content config still type-checks.
- The site builds successfully without the instants collection.
- `AGENTS.md` matches the actual project structure after the deletion.

## Risks And Mitigations

### Risk: stale references to instants remain
Mitigation: perform repo-wide search for `instants`, `InstantCard`, and `NUM_INSTANTS_ON_HOMEPAGE` after edits.

### Risk: generated or cache files mention instants
Mitigation: verify source files and build output rather than editing `.astro/` generated files manually; a fresh build should regenerate what is needed.

### Risk: AGENTS.md drifts from code again
Mitigation: keep the rewritten file minimal and only include facts directly verifiable from current files.
