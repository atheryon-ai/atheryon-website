# CLAUDE.md — atheryon-website

## Project
Next.js 14 static site (App Router). Output: `out/` via `next build`.

## Key Paths
- Homepage: `src/app/page.tsx`
- Content/copy: `src/content/site.ts` (all page text lives here, not in components)
- Components: `src/components/` (Hero, Section, Card, FeatureGrid, etc.)
- Public assets: `public/` (videos, images served at `/filename`)
- Hero component: `src/components/Hero.tsx` (two variants: Hero, SimpleHero)

## Commands
- `npx next build` — build & typecheck
- `npx next dev` — local dev server (port 3000)

## Patterns
- Page sections use `<Section badge="" title="">` wrapper from components
- All copy/text goes in `site.ts` under `site.pages.<pageName>`, not inline in TSX
- **Exception — legal pages:** `/privacy` and `/terms` may inline their content in TSX rather than `site.ts`. Reason: legal prose is long, deeply structured (sections, sub-sections, mixed rich bullets, external links), and changes rarely. Inlining keeps the content readable next to its rendering and avoids inventing a complex `site.pages.legal.{...}` shape that won't pay off for two pages.
- Video elements must have: `autoPlay loop muted playsInline`
- One video asset exists: `public/atheryon-logo-animation.mp4`
- Section spacing via `<SectionDivider />` between every section
- Homepage renders sections in order defined in page.tsx; content from `site.pages.home`
