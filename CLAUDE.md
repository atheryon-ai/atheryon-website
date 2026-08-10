# CLAUDE.md — atheryon-website

## Copy rules (HARD RULES — apply to every edit)
- **Never invent a number, client, date, timeline, credential or capability.** If a rewrite needs a fact Terry hasn't given, write `TODO(terry): <the question>` and move on. Twenty TODOs beat one confident fabrication.
- **Australian spelling throughout** (productise, summarise, organise — not -ize).
- **Voice:** first person for Terry on `/labs` and `/about`; third person everywhere else. Never switch mid-page.
- Don't touch routing, links or component APIs unless the task explicitly says to.

### Banned constructions
- **"not X — Y" corrective contrast** ("Not benchmark scores — production constraints", "Consulting practice, not a platform", "weeks, not minutes"). The single biggest AI tell on this site. Max one per page.
- **Em dashes.** Max one per page.
- **"actually" as an intensifier** — delete every instance.
- **Rhythmic three-item lists** ("instructions, corrections, domain constraints").
- **Filler adjectives** "production-grade" and "front-to-back" where not load-bearing.
- **Sentence fragments as standalone paragraphs.**

Also required: varied sentence length; concrete nouns over abstractions.

## Design standard (HARD RULES — apply to every UI edit)
Styling contract: `docs/superpowers/specs/2026-08-09-design-standard.md`. Read it before any visual change. Non-negotiables:
- **Two registers only.** Navy statement band = homepage viewport 1, nowhere else. Everything else is the bone document register.
- **Tokens, not hexes.** Colours come from the Tailwind tokens (navy `#0E2A3A`, bronze `#B08D57`, slate `#93A5B4`, warm-white `#FAF9F7`, existing bone/charcoal). No raw hex in components, no new colours, no gradients, no shadows, no imagery, no new fonts (typefaces gated on the IA brief §8 TODO 7).
- **Bronze is structural only** — ticks, rules, small-caps strips, labels on navy. Never body text.
- **§ numbers ascend in display order.** Use the shared `Doc*` components; standard devices (tick, foundation rule, proof strip, statement band) are components, never hand-rolled per page.
- **One CTA per viewport.** Header renders label OR shortLabel by breakpoint, never both.
- **M&A before Capital Markets** wherever the arms appear.

## Project
Next.js 15.5 **static export** (`output: 'export'`, `images.unoptimized: true`). No API routes, no middleware, no server actions. Output: `out/` via `next build`.

## Key paths
Three route groups, each rendering its own nav + footer shell:
- `src/app/(cm)/` — Capital Markets shell: homepage (`page.tsx`), plus `{themes,themes/[id],offers,offers/{code,prompts,consult},system,labs,labs/themes,about,contact,blog,blog/why-claude,roadmap,privacy,terms}/page.tsx`
- `src/app/ma/` — M&A practice: `{page,approach,offers,contact}`
- `src/app/mortgages/` — buried stub (hidden from nav)
- `src/content/site.ts` — exports TWO content generations: `site` (older pages: labs, offers, footer links, legal labels) and `v2` (newer pages: home, system, about, contact, ma)
- `src/content/buyerThemes.ts` — the seven `/themes` entries
- `src/content/themes.ts` — manual snapshot of the labs-platform theme taxonomy; re-sync from sibling repo
- Inline TSX copy (not in site.ts): `/labs`, `/blog/why-claude`, `/privacy`, `/terms`
- `src/components/` — `Doc.tsx` (DocPage/DocBanner/DocSection/DocFooter/DocBullets — §-numbered document chrome), `shellConfig.ts` (header nav per mode), `Footer.tsx` (reads `site.footer.*`), ContactForm, StatusBadge, PracticeToggle, `home/*`, `ma/*`
- `staticwebapp.config.json` — Azure SWA routes, redirects, auth (sp-clients role on `/integration/*`). All redirects go here (static export = no Next redirects).

## Sibling repo
`/Users/terencetsakiris/repos/labs-platform/` is the source for:
- `src/lib/themes/themes.ts` → manually copy to `src/content/themes.ts`
- `public/menu-themes-thumbs/t-*.png` → manually copy to `public/menu-themes-thumbs/`

Re-sync after upstream changes; there is no build-time link.

## Data patterns
- Theme IDs in `src/content/themes.ts` already include the `t-` prefix (`t-schema-model`). Use `theme.thumb` (preformed path) for `<img src>` — do NOT prepend `t-` again, or you get `/menu-themes-thumbs/t-t-schema-model.png` and a 404.
- `{{PLACEHOLDER_NAME}}` strings in `site.ts` (e.g. `{{TERRY_PROMPT_EXAMPLE_PROMPT}}`, `{{WEEKS}}`, `{{PRS}}`) are intentional TODO markers. Components MUST hide their containing block when present — see the `isPending` guards in `src/app/(cm)/labs/page.tsx` and `src/app/(cm)/system/page.tsx` for the pattern.

## Commands
- `npx next build` — build + typecheck
- `npx next dev` — local dev (port 3000)
- `npm test` — Playwright full suite (5 browsers, ~15 min via webServer in `playwright.config.ts`)
- `npx playwright test tests/<file>` — targeted
- `npm run verify:production-ready` — greps `src/` for `REPLACE_ME` placeholders before deploy

## UI patterns
- Newer pages use the `Doc*` family from `src/components/Doc.tsx` (DocPage wrapper, DocBanner header, DocSection with § numbering, DocFooter)
- Prefer `site.ts` (`site` or `v2` export) for page copy on structured pages; `/labs` and `/blog/why-claude` carry long-form copy inline in TSX
- **Exception — legal pages:** `/privacy` and `/terms` may inline their content in TSX rather than `site.ts`. Reason: legal prose is long, deeply structured (sections, sub-sections, mixed rich bullets, external links), and changes rarely. Inlining keeps the content readable next to its rendering and avoids inventing a complex `site.pages.legal.{...}` shape that won't pay off for two pages.
- Forms post to Formspree (https://formspree.io/f/xdkdynak) — 3rd-party PII processor

## Deploy topology
- **Test:** push to `dev` → SWA `atheryon-website-test` (Sponsorship sub) at https://polite-flower-03ba3020f.7.azurestaticapps.net
- **Prod:** push to `main` → SWA `icy-tree-093dcc800` (PAYG sub) at https://www.atheryon.com.au
- These are SEPARATE SWAs (split 2026-05-11) — prod stayed on PAYG, test was moved to Sponsorship.
- Workflows: `.github/workflows/deploy-test.yml`, `.github/workflows/deploy-production.yml`. Actions are SHA-pinned. CODEOWNERS protects both workflows + package.json/lock + staticwebapp.config.json.

## Git workflow
- `dev` is the integration branch; `main` is production-tagged
- Promote dev → main via PR with `gh pr merge --merge` (not squash; preserves history)
- After merging the PR, **fast-forward dev to match main** so future branches start aligned: `git checkout dev && git merge --ff-only origin/main && git push origin dev`
- Single PR routinely promotes 10–60 commits (e.g. PR #15 had 64, PR #20 had 10)

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
