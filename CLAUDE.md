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
- **One dark ground.** The whole site renders on navy `#0E2A3A`. Statement moments (the homepage band, the `/capital-markets` pull-quote) are marked by serif scale, bronze ticks and the foundation rule; all of them sit on the same ground. `StatementBand` renders once site-wide, on homepage viewport 1; the design lint fails the build on a second usage.
- **`bone` and `charcoal` are role names; `globals.css` decides their colour.** It intercepts every utility they generate, so `bg-bone` renders navy and `text-charcoal` renders warm white `#FAF9F7`. Use them for "document surface" and "document text" and expect the dark result. Check contrast against `#0E2A3A`, or `#16394C` inside an elevated panel. See design standard §9.
- **Tokens, not hexes.** Colours come from the Tailwind tokens and the `--homev3-*` variables in `globals.css` (ground `#0E2A3A`, elevated `#16394C`, bronze `#B08D57`, slate `#93A5B4`, warm-white `#FAF9F7`). No raw hex in components, no new colours, no gradients, no shadows, no imagery, no new fonts (typefaces gated on the IA brief §8 TODO 7). Amber `text-brand-amber-light` is a named exception for status badges only.
- **Bronze is structural only.** Ticks, rules, small-caps strips, labels. Never body text.
- **§ numbers ascend in display order.** Use the shared `Doc*` components; standard devices (tick, foundation rule, proof strip, statement band) are components, never hand-rolled per page.
- **One CTA per viewport.** Header renders label OR shortLabel by breakpoint, never both.
- **M&A before Capital Markets** wherever the arms appear.

## Project
Next.js 15.5 **static export** (`output: 'export'`, `images.unoptimized: true`). No API routes, no middleware, no server actions. Output: `out/` via `next build`.

## Key paths
Two route groups, each rendering its own nav + footer shell:
- `src/app/(cm)/` — the firm shell, holding every page except the mortgages stub. Homepage (`page.tsx`), plus:
  - arms: `ma`, `capital-markets`, `data-ai`
  - per-arm sub-pages: `ma/{experience,approach,contact}`, `capital-markets/{experience,approach,contact}`
  - firm-level: `about`, `contact`, `experience`, `approach`
  - legacy/CM surfaces: `themes`, `themes/[id]`, `offers`, `offers/{code,prompts,consult}`, `offers/prompts/thanks`, `system`, `labs`, `labs/themes`, `roadmap`
  - writing + legal: `blog`, `blog/why-claude`, `privacy`, `terms`
  - There is no separate `ma` route group; `/ma` lives inside `(cm)` and has no layout of its own.
- `src/app/mortgages/` — buried stub with its own layout (hidden from nav)
- `src/content/site.ts` — exports THREE content generations: `site` (older pages: labs, offers, footer links, legal labels), `v2` (superseded generation, still the source for `/system` and the `Doc*` chrome defaults) and `v3` (current generation: home, ma, capital-markets, data-ai, about, contact, experience, approach and the per-arm sub-pages). Also `v2Ma` and `v2Mortgages`. New page copy goes in `v3`.
- `src/content/buyerThemes.ts` — the seven `/themes` entries
- `src/content/themes.ts` — manual snapshot of the labs-platform theme taxonomy; re-sync from sibling repo
- Inline TSX copy (not in site.ts): `/labs`, `/blog/why-claude`, `/privacy`, `/terms`
- `src/components/` — `Doc.tsx` (DocPage/DocBanner/DocSection/DocFooter/DocBullets — §-numbered document chrome), `shellConfig.ts` (header nav per mode), `Footer.tsx` (reads `site.footer.*`), `brand/*` (BronzeTick, FoundationRule, ProofStrip, StatementBand), `ArmSubNav.tsx`, ContactForm, StatusBadge, SystemArchitectureDiagram, ModeSetter, `home/*`
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
- Prefer `site.ts` for page copy on structured pages, writing new copy into the `v3` export; `/labs` and `/blog/why-claude` carry long-form copy inline in TSX
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
