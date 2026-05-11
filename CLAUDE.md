# CLAUDE.md — atheryon-website

## Project
Next.js 14 **static export** (`output: 'export'`, `images.unoptimized: true`). No API routes, no middleware, no server actions. Output: `out/` via `next build`.

## Key paths
- `src/app/page.tsx` — re-exports `/reality` (homepage = Reality content)
- `src/app/{reality,data,ai-direction,transformation,labs,labs/themes,about,contact,programs,programs/mib-insight}/page.tsx` — current IA
- `src/content/site.ts` — ALL page copy lives here under `site.pages.<pageName>` (no inline strings in TSX)
- `src/content/themes.ts` — manual snapshot of the labs-platform theme taxonomy (29 themes / 147 pages); re-sync from sibling repo
- `src/components/` — RealityHero, LabsHero, PillarHero, Section, LabsFlagship, ThemeCard, ThemeBand, etc.
- `staticwebapp.config.json` — Azure SWA routes, redirects, auth (sp-clients role on `/integration/*`)

## Sibling repo
`/Users/terencetsakiris/GitHub/labs-platform/` is the source for:
- `src/lib/themes/themes.ts` → manually copy to `src/content/themes.ts`
- `public/menu-themes-thumbs/t-*.png` → manually copy to `public/menu-themes-thumbs/`

Re-sync after upstream changes; there is no build-time link.

## Data patterns
- Theme IDs in `src/content/themes.ts` already include the `t-` prefix (`t-schema-model`). Use `theme.thumb` (preformed path) for `<img src>` — do NOT prepend `t-` again, or you get `/menu-themes-thumbs/t-t-schema-model.png` and a 404.
- `{{PLACEHOLDER_NAME}}` strings in `site.ts` (e.g. `{{TERRY_PROMPT_EXAMPLE_PROMPT}}`, `{{WEEKS}}`, `{{PRS}}`) are intentional TODO markers. Components MUST hide their containing block when present — see `LabsFlagship.tsx` (footer) and `src/app/labs/page.tsx` (method.artifact) for the pattern.

## Commands
- `npx next build` — build + typecheck
- `npx next dev` — local dev (port 3000)
- `npm test` — Playwright full suite (5 browsers, ~15 min via webServer in `playwright.config.ts`)
- `npx playwright test tests/<file>` — targeted
- `npm run verify:production-ready` — greps `src/` for `REPLACE_ME` placeholders before deploy

## UI patterns
- Page sections use `<Section badge title description>` wrapper; spacing via `<SectionDivider />` between every section
- All copy/text goes in `site.ts` under `site.pages.<pageName>`, not inline in TSX
- Forms post to Formspree (https://formspree.io/f/xdkdynak) — 3rd-party PII processor

## Deploy topology
- **Test:** push to `dev` → SWA `atheryon-website-test` (Sponsorship sub) at https://polite-flower-03ba3020f.7.azurestaticapps.net
- **Prod:** push to `main` → SWA `icy-tree-093dcc800` (PAYG sub — currently DISABLED) at https://www.atheryon.com.au
- These are now SEPARATE SWAs (split 2026-05-11). The PAYG sub disable is a ticking clock for production — migrate the prod SWA to Sponsorship before grace expires.
- Workflows: `.github/workflows/deploy-test.yml`, `.github/workflows/deploy-production.yml`. Actions are SHA-pinned. CODEOWNERS protects both workflows + package.json/lock + staticwebapp.config.json.

## Git workflow
- `dev` is the integration branch; `main` is production-tagged
- Promote dev → main via PR with `gh pr merge --merge` (not squash; preserves history)
- After merging the PR, **fast-forward dev to match main** so future branches start aligned: `git checkout dev && git merge --ff-only origin/main && git push origin dev`
- Single PR routinely promotes 10–60 commits (e.g. PR #15 had 64, PR #20 had 10)
