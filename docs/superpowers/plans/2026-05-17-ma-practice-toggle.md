# Add M&A to atheryon-website — practice-area toggle

## Context

The tagline on every page promises three peer practices — `CAPITAL MARKETS. | M&A. | MORTGAGES.` (shipped in commit `dd8a4d0`, 17 May 2026) — but the site itself only proves one. Every page (`/`, `/system`, `/workflows`, `/about`, `/engagements`/`/offers`) is single-vertical Capital Markets. M&A appears nowhere except the tagline. Mortgages is mentioned twice in passing on `/labs`.

There used to be a `/m-and-a-execution` page (services voice — separation & integration, Day-1 readiness, TSA reduction) deleted by the May 15 rewrite (`83d3c59`) that replaced the legacy IA with the v2 capital-markets-AI-systems interface. The old content is recoverable from git at commit `9526a7d` (key `maExecution` in `site.ts`).

The user's framing: **"big thinking — some kind of toggle between Atheryon capital markets and M&A. I don't see overlap much in clients."** Buyer separation is the load-bearing insight: this is not a content-addition problem, it's a buyer-architecture problem.

## Approach (locked with user)

A **persistent practice-area toggle** in the header — the existing `CAPITAL MARKETS. | M&A. | MORTGAGES.` tagline becomes interactive. Selecting a practice navigates to that practice's home and re-skins the active-accent colour. Same brand, same chrome, three buyer journeys.

- **All three modes** ship day one; Mortgages is a single-page stub
- **Asymmetric URLs**: CM keeps its current URLs (`/system`, `/workflows`, `/offers`, …) — zero SEO disruption. M&A gets `/ma/*` prefix. Mortgages gets single `/mortgages`
- **M&A v1 has full IA parallel to CM**: `/ma`, `/ma/system`, `/ma/workflows`, `/ma/offers` (label "Engagements" per existing alias)
- **Shared across all modes**: About, Contact, Privacy, Terms, Labs, footer
- **v2 const in `src/content/site.ts` stays untouched** (user-locked 2026-05-15). M&A and Mortgages content are *additive* — new `v2Ma` and `v2Mortgages` exports

## Critical files

| File | Change |
|------|--------|
| `src/app/globals.css` | Add `--mode-accent` / `--mode-accent-bright` semantic tokens + `:root[data-mode="..."]` overrides |
| `src/app/layout.tsx` | Mount the `ModeSetter` client component |
| `src/components/home/BrandLockup.tsx` | Replace static tagline spans with `<PracticeToggle />` |
| `src/components/PracticeToggle.tsx` | **new** — three `<Link>`s, derives active mode from `usePathname()` |
| `src/components/ModeSetter.tsx` | **new** — client-side `useEffect` writes `documentElement.dataset.mode` from pathname |
| `src/components/Footer.tsx` | Add a "Practices" link group; keep footer single-shared |
| `src/components/home/HomeNav.tsx` + `HomeHero.tsx` + ~6 others | Swap hard-coded `var(--homev3-blue-bright)` → `var(--mode-accent-bright)` where the usage means "active practice colour" (not structural chrome) |
| `src/content/site.ts` | Add `v2Ma` (mirrors `v2.pages.{home,system,workflows,engagements}`) and `v2Mortgages` (single `home`) exports |
| `src/app/ma/page.tsx` + `system/page.tsx` + `workflows/page.tsx` + `offers/page.tsx` + `layout.tsx` | **new** — render from `v2Ma.pages.*` |
| `src/app/mortgages/page.tsx` | **new** — renders from `v2Mortgages.pages.home` |
| `public/sitemap.xml` | Add 5 new URLs (`/ma`, `/ma/system`, `/ma/workflows`, `/ma/offers`, `/mortgages`) |
| `public/llms.txt` | Add three-practice statement + new URLs |
| `staticwebapp.config.json` | Add 5 static rewrites for new HTML files; retarget legacy `/m-and-a-execution → /ma` (preserve SEO juice); add `/ma/engagements → /ma/offers` alias |
| `tests/practice-toggle.spec.ts` | **new** — covers route 200s, toggle interaction, `data-mode` flips, mode persistence across `/ma/*` navigation, keyboard nav |

## Design rules (locked)

1. **CSS theming.** Do NOT redefine `--homev3-blue` / `--homev3-orange` per mode — they're structural literals (form borders, focus rings, `.bg-charcoal` remap at `globals.css:410`). Introduce semantic `--mode-accent` and `--mode-accent-bright` that read from the appropriate literal per mode. The BrandLockup tagline stays literal — even in M&A mode, the inactive options must show in their own colour. Tagline colour mapping (already established): CM = orange, M&A = blue, Mortgages = white. `--mode-accent` inherits the *active* practice's colour.

2. **Mode from URL, not from state.** Static export means no middleware can write the `<html data-mode>` attribute server-side. A `ModeSetter` client component reads `usePathname()` in a `useEffect` and writes `documentElement.dataset.mode`. Accept a brief FOUC on direct `/ma` loads — mitigate later only if visually disruptive (optional Phase 5).

3. **Toggle a11y.** `role="navigation"` + `aria-label="Practice area"` on the wrapper. Each link gets `aria-current="page"` when active. Roving-tabindex arrow-key handler as progressive enhancement. NOT `role="tablist"` — the "tabpanels" are different documents.

4. **Mode persistence.** URL is the source of truth. No localStorage. Within `/ma/*`, internal `<Link>`s stay in mode. Clicking a CM link from M&A intentionally exits to CM. The toggle is the only mode-switch UI.

5. **v2 voice for M&A.** Recast the old `maExecution` services-voice content into v2 system-interface voice:
   - **Intro paragraph** → `/ma` home transformation slot
   - **4 triggers** → `/ma/workflows` (as workflow inputs)
   - **5 capabilities** → `/ma/system` §01–§05 architecture sections
   - **5 outcomes** → `/ma/workflows` outputs
   - Ship Phase 3 with `{{PENDING_*}}` markers per existing convention; user provides final v2-voice prose in Phase 4.

6. **Mortgages stub.** Single `/mortgages` page: hero, one-paragraph thesis ("Why Atheryon will apply CDM-native systems + AI agents to mortgage origination, servicing, and risk"), placeholder capability list, contact CTA. No `/mortgages/*` sub-routes.

## Implementation phasing

Each phase is independently shippable — no half-built toggle is ever visible.

### Phase 1 — Invisible colour-token refactor
- Add `--mode-accent` and `--mode-accent-bright` to `globals.css` (default = CM orange to match current rendering)
- Refactor the ~8 components where `var(--homev3-blue-bright)` / `var(--homev3-orange-bright)` means "the active practice accent" (not "this is permanently orange/blue") — verify by reading each usage site
- **Verification:** site looks pixel-identical to before; visual diff via `/qa-only` or Playwright screenshots
- **No user-visible change.** Pure plumbing.

### Phase 2 — Toggle goes live; Mortgages stub
- New components: `ModeSetter`, `PracticeToggle`
- Wire `ModeSetter` into root `layout.tsx`
- Replace BrandLockup tagline spans with `<PracticeToggle />`
- New `src/app/mortgages/page.tsx` + `v2Mortgages` in `site.ts` (~200 words of stub content)
- Update `globals.css` `[data-mode="mortgages"]` to white accent (or whatever the design calls for in the stub state)
- Update `staticwebapp.config.json` (rewrite `/mortgages → /mortgages.html`). Add temporary rule so /ma 404s gracefully until Phase 3
- Update sitemap + llms.txt for `/mortgages`
- New test file with toggle interaction + `/mortgages` route assertion
- **User-visible:** toggle works for CM ↔ Mortgages. M&A toggle is disabled or routes to a "Coming next week" landing

### Phase 3 — M&A IA scaffolding
- New `src/app/ma/layout.tsx` + `page.tsx` + `system/page.tsx` + `workflows/page.tsx` + `offers/page.tsx`
- New `v2Ma` export in `site.ts` mirroring `v2.pages.{home,system,workflows,engagements}` structure exactly. Use `{{PENDING_*}}` markers for prose bodies; populate section labels, titles, and structural elements (the 5 capabilities → §01–§05; the 4 triggers; the 5 outcomes) from the recovered `maExecution` content
- Enable M&A in `PracticeToggle`
- Update `staticwebapp.config.json` (4 new rewrites; `/ma/engagements → /ma/offers` alias; retarget `/m-and-a-execution → /ma`)
- Update sitemap + llms.txt with the 4 M&A URLs
- Extend Playwright test: `/ma/*` routes 200; mode-persistence across M&A navigation; `data-mode="ma"` set
- **User-visible:** M&A toggle live. Structure renders. Prose bodies say "[pending]" — clearly placeholder

### Phase 4 — M&A prose
- User reviews recast content for each `/ma/*` page section. Iterate in v2 systems-interface voice (no marketing prose, industry-anchored framing — see CLAUDE.md memory and `atheryon_website_constitution.md`)
- Fill in `{{PENDING_*}}` markers
- Final QA pass via `/qa` or `/design-review`
- **User-visible:** M&A is a full peer practice with credible prose

### Phase 5 (optional) — FOUC mitigation
Only if the brief flash of CM accent on direct-load to `/ma` is visually disruptive. Add a small inline `<script>` in `/ma/layout.tsx` that sets `document.documentElement.dataset.mode = 'ma'` before React hydrates. Skip if imperceptible.

## Constraints & gotchas

- **Static export.** No server-side mode setting. `ModeSetter` is the only path.
- **v2 is user-locked.** All new content additive (`v2Ma`, `v2Mortgages`). Do not edit `v2` itself.
- **CLAUDE.md memory rule:** no FINOS/Rosetta/version/internal-service-names exposure. Bespoke + industry-anchored framing only. Carry into M&A copy.
- **CODEOWNERS** protects `staticwebapp.config.json`, `package.json`, `package-lock.json`, and both deploy workflows — PR needs approval from @abigail-atheryon before merge.
- **Test the stale assertion claim from Plan agent:** `tests/home.spec.ts:8` reportedly looks for `'DATA.'` in BrandLockup which isn't in current source. Likely already stale from earlier IA rewrite — verify and fix during Phase 1.
- **`/labs` is currently CM-only.** It stays under shared chrome (visible in all modes). If/when M&A grows a labs surface, that's a separate Phase 6+ decision.
- **CDM-platform and labs-platform repos are separate.** This change touches only `atheryon-website`. The sibling-repo theme sync flow is unaffected.

## Verification

For each phase:

1. **`npx next build`** — no TS errors, no ESLint errors, no `output: 'export'` breakage
2. **`npx next dev`** — manually click through each mode in the toggle; verify URL changes, accent flips, page renders, no console errors
3. **`npx playwright test tests/practice-toggle.spec.ts`** — the new test file passes
4. **`npm test`** — full suite still green (existing CM tests must not regress — that's the whole point of asymmetric URLs)
5. **`npm run verify:production-ready`** — no `REPLACE_ME` placeholders leak through (note: `{{PENDING_*}}` is the established marker convention and is gated separately)
6. **Visual regression on CM pages** — `/`, `/system`, `/workflows`, `/offers`, `/about` should look pixel-identical to pre-Phase-1 (the colour refactor must be invisible)
7. **Phase 3 acceptance:** structural diff between `/system` and `/ma/system` shows identical section scaffolding with M&A-appropriate label/title text and `{{PENDING_*}}` bodies
8. **Phase 4 acceptance:** `/qa` or `/design-review` produces a clean report; user signs off on prose

## Deploy

Standard atheryon-website flow per CLAUDE.md:
- Branch off `dev`; PR into `dev` for each phase
- After PR merges to `dev`, GitHub Actions deploys to test SWA (`atheryon-website-test`, https://polite-flower-03ba3020f.7.azurestaticapps.net)
- Smoke-test on test environment (toggle + new routes + redirects)
- Promote `dev → main` via `gh pr merge --merge` for prod release to https://www.atheryon.com.au
- Fast-forward `dev` to match `main` after merge

Phases 1 and 2 likely fit in one PR (refactor + toggle + Mortgages stub). Phases 3 and 4 likely separate PRs. Phase 5 only if needed.
