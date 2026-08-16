# AGENTS.md — atheryon-website

Reconciled against the code on 2026-08-12. `CLAUDE.md` carries the copy and
design rules; this file is the structural and operational summary. Where the
two overlap they should agree, so change both or neither.

## Project
Next.js 15.5 **static export** (`output: 'export'`, `images.unoptimized: true`).
No API routes, no middleware, no server actions. Output: `out/` via `next build`.

## Key paths
One route group, `(cm)`, rendering the nav + footer shell for every route:

- `src/app/(cm)/` — the firm shell, holding every page:
  - homepage `page.tsx`
  - functions: `ma`, `data-ai`, plus `data-ai/supply-chain` (application of
    function 2, not a sector)
  - firm-level (one of each): `experience`, `approach`, `about`, `contact`
  - function-2 depth: `themes`, `themes/[id]`, `offers`, `offers/{code,prompts,consult}`, `offers/prompts/thanks`, `system`, `labs`, `labs/themes`
  - legal: `privacy`, `terms`
  - `/ma` has no layout of its own; it sits inside `(cm)` and inherits the firm shell
  - **Two FUNCTIONS, four SECTORS** (`docs/superpowers/specs/2026-08-15-functions-and-sectors-ia-design.md`):
    M&A Transaction Services (`/ma`) and Data, Transformation, AI (`/data-ai`).
    Header short form for function 1 is always **M&A Services** (`M&A SERVICES`).
    Capital markets, banking, wealth and NBFIs are sectors — an audience line,
    never routes. `/capital-markets` retired into `/data-ai` on 2026-08-15 and
    301s there. Function-path `/ma/*` and `/data-ai/{experience,approach,contact}`
    pages are deleted and 301 to firm `/experience`, `/approach`, `/contact`.
    The `/mortgages` stub went on 2026-08-12 and `/roadmap` on 2026-08-15.
    `/blog` and `/blog/why-claude` were removed on 2026-08-16; those URLs 404.
- `src/content/site.ts` — THREE content generations: `site` (older pages: labs,
  offers, footer links, legal labels), `v2` (superseded; still the source for
  `/system` and the `Doc*` chrome defaults) and `v3` (current: home, ma,
  data-ai, about, contact, experience, approach). Also `v2Ma` and
  `v2Mortgages`. **New page copy goes in `v3`.** The function-2 keys are still
  named `cm*` (`cmCta`, `cmExperience`, `cmApproach`, `cmCases`, …) —
  deliberate; firm `/experience` and `/approach` still read them as sources.
- `src/content/themes.ts` — manual snapshot of the labs-platform theme taxonomy
  (26 themes / 111 pages via `pageCountFor`); re-sync from the sibling repo
- `src/content/buyerThemes.ts` — the seven `/themes` entries
- `src/content/metrics.ts` — derived counts; carries `TODO(terry)` markers on
  two unverified marketing figures
- `src/components/` — `Doc.tsx` (DocPage/DocBanner/DocSection/DocFooter/DocBullets,
  §-numbered document chrome), `brand/*` (BronzeTick, FoundationRule, ProofStrip,
  StatementBand), `home/*` (HomeNav, BrandLockup, BrandMark), `Footer.tsx`,
  `ArmSubNav.tsx`, `ContactForm.tsx`, `StatusBadge.tsx`,
  `SystemArchitectureDiagram.tsx`, `ModeSetter.tsx`, `shellConfig.ts`
- `staticwebapp.config.json` — Azure SWA routes, redirects, auth (sp-clients role
  on `/integration/*`). All redirects live here; static export means no Next
  redirects.

## Sibling repo
`/Users/terencetsakiris/repos/labs-platform/` is the source for:
- `src/lib/themes/themes.ts` → manually copy to `src/content/themes.ts`
- `public/menu-themes-thumbs/t-*.png` → manually copy to `public/menu-themes-thumbs/`

Re-sync after upstream changes; there is no build-time link.

## Data patterns
- Theme IDs in `src/content/themes.ts` already include the `t-` prefix
  (`t-schema-model`). Use `theme.thumb` (preformed path) for `<img src>` — do NOT
  prepend `t-` again, or you get `/menu-themes-thumbs/t-t-schema-model.png` and a 404.
- `{{PLACEHOLDER_NAME}}` strings in `site.ts` (e.g. `{{TERRY_PROMPT_EXAMPLE_PROMPT}}`,
  `{{WEEKS}}`, `{{PRS}}`) are intentional TODO markers. Components MUST hide their
  containing block when present — see the `isPending` guards in
  `src/app/(cm)/labs/page.tsx` and `src/app/(cm)/system/page.tsx`.

## Commands
- `npx next build` — build + typecheck
- `npx next dev` — local dev (port 3000)
- `npx playwright test --project=chromium` — the suite CI runs (68 tests, ~1 min).
  There is no `npm test` script. `playwright.config.ts` defines a single
  `chromium` project and starts `next dev` itself via `webServer`.
- `npx playwright test tests/<file>` — targeted
- `npm run verify:production-ready` — runs the design lint, then greps the BUILT
  `out/` directory for `REPLACE_ME` and `{{PLACEHOLDER}}` leaks. **Run
  `next build` first**; it errors if `out/` is missing.
- `node scripts/design-lint.mjs` — design-standard lint on its own
- `node scripts/copy-lint.mjs` — copy-rule lint

## UI patterns
- Pages use the `Doc*` family from `src/components/Doc.tsx` (DocPage wrapper,
  DocBanner header, DocSection with derived § numbering, DocFooter). Standard
  devices (bronze tick, foundation rule, proof strip, statement band) are
  components in `brand/`, never hand-rolled per page.
- Prefer `site.ts` for page copy on structured pages, writing new copy into `v3`;
  `/labs` carries long-form copy inline in TSX.
- **Exception — legal pages:** `/privacy` and `/terms` may inline their content in
  TSX rather than `site.ts`. Legal prose is long, deeply structured and changes
  rarely; inlining keeps it readable next to its rendering and avoids inventing a
  complex `site.pages.legal.{...}` shape for two pages.
- Forms post to Formspree (https://formspree.io/f/xdkdynak) — 3rd-party PII processor.
- Visual baselines exist for `/`, `/ma` and `/experience` only, in darwin and
  linux variants. No baseline covers a page that renders a `StatusBadge`.

## Design and copy rules
Live in `CLAUDE.md`, with the full styling contract in
`docs/superpowers/specs/2026-08-09-design-standard.md` (v2). The two rules most
often got wrong:
- The whole site renders on the dark navy ground. `bone` and `charcoal` are role
  names whose colour `globals.css` intercepts, so `bg-bone` renders navy and
  `text-charcoal` renders warm white. Check contrast against `#0E2A3A`, or
  `#16394C` inside an elevated panel. See design standard §9.
- Never invent a number, client, date, timeline, credential or capability. Write
  `TODO(terry): <question>` instead.

## Deploy topology
- **Test:** push to `dev` → SWA `atheryon-website-test` (Sponsorship sub) at
  https://polite-flower-03ba3020f.7.azurestaticapps.net
- **Prod:** push to `main` → SWA `icy-tree-093dcc800` (PAYG sub) at
  https://www.atheryon.com.au
- These are SEPARATE SWAs (split 2026-05-11) — prod stayed on PAYG, test moved to
  Sponsorship.
- Workflows: `.github/workflows/deploy-test.yml`, `deploy-production.yml`,
  `test.yml`. Actions are SHA-pinned. CODEOWNERS protects both deploy workflows
  plus package.json/lock and staticwebapp.config.json.
- CI flake to recognise: `playwright install --with-deps` runs `apt-get update`,
  which occasionally 403s on `packages.microsoft.com` and fails the job before any
  test runs. Re-run; it is not a code failure.

## Git workflow
- `dev` is the integration branch; `main` is production-tagged
- Promote dev → main via PR with `gh pr merge --merge` (not squash; preserves history)
- After merging, **fast-forward dev to match main** so future branches start
  aligned: `git checkout dev && git merge --ff-only origin/main && git push origin dev`
- Single PR routinely promotes 10–60 commits (PR #15 had 64, PR #91 had 10)

### There is no reviewer — Terry is the only person on this repo
**Never wait for review, approval, or a second pair of eyes on a PR.** Terry is
the sole developer. A PR here exists to satisfy CODEOWNERS branch protection and
to record what shipped, not to gate on a human.

When asked to push to main: open the PR and merge it in the same step
(`gh pr merge <n> --merge --admin`), then fast-forward `dev`. Do not stop after
opening the PR and ask whether to merge, and do not describe the work as "waiting
on review" — there is nobody to wait for. `--admin` is expected here and is not a
bypass of anything meaningful.

Still confirm before promoting when the diff is genuinely risky (destructive
migrations, secrets, infrastructure). Routine content, copy, docs and component
work needs no confirmation beyond the request to push.

## graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community
structure, and cross-file relationships. A `/graphify` skill (and the `graphify`
CLI) is installed — use it instead of grepping.

Rules:
- For codebase questions, first run `graphify query "<question>"` when
  `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for
  relationships and `graphify explain "<concept>"` for focused concepts. These
  return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep.
- To (re)build the graph, run `/graphify .` (or `graphify update .` for a
  code-only, no-LLM refresh).
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of
  raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review, or when
  query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current
  (AST-only, no API cost).
