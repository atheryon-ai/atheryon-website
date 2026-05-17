# Practice-Toggle Phases 1, 2, 2.5 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the persistent practice-area toggle (CM ↔ Mortgages stub + M&A placeholder), introduce the CM `/themes` buyer matrix with `/roadmap` aggregator, dissolve `/workflows` into per-buyer pages — all without breaking the locked v2 CM IA.

**Architecture:** Static-export Next.js 14 (`output: 'export'`). A new client-only `ModeSetter` reads `usePathname()` and writes `documentElement.dataset.mode`; CSS reads `--mode-accent` / `--mode-accent-bright` via `[data-mode="..."]` selectors. Page copy lives in `src/content/site.ts` (extended with `v2Mortgages`); buyer-matrix data lives in `src/content/buyerThemes.ts` and joins to existing `v2.pages.workflows.items` by id.

**Tech Stack:** Next.js 14 (App Router, static export) · React 18 · TypeScript strict · Tailwind · Playwright (chromium-only per `playwright.config.ts`).

---

## File Structure

### Created

| Path | Responsibility |
|---|---|
| `src/components/ModeSetter.tsx` | Client component. Reads `usePathname()`, writes `document.documentElement.dataset.mode` ∈ {`cm`,`ma`,`mortgages`}. Renders nothing. |
| `src/components/PracticeToggle.tsx` | Client component. Three `<Link>`s replacing the static BrandLockup tagline spans; derives active mode from `usePathname()`; sets `aria-current="page"`. |
| `src/components/StatusBadge.tsx` | Server component. Renders `SHIPPED` / `BUILDING` / `ROADMAP` inline pill from a discriminated-union prop. Used on `/themes`, `/themes/[id]`, `/roadmap`. |
| `src/content/buyerThemes.ts` | 7-row buyer-matrix data structure (id, name, status, buyerTitles, pain, speedPitch, workflowId, offerFramings). Joins to `v2.pages.workflows.items` by id. |
| `src/app/mortgages/page.tsx` | Static page; renders `v2Mortgages.home` content; ~200-word stub. |
| `src/app/themes/page.tsx` | Matrix index. Renders the 7-row grid + `StatusBadge` per row. |
| `src/app/themes/[id]/page.tsx` | Dynamic per-buyer page. Required `generateStaticParams` (static export). Reads `buyerThemes` + joined `v2.pages.workflows.items[workflowId]`. |
| `src/app/roadmap/page.tsx` | Aggregator across `buyerThemes` (status !== shipped) + `v2Mortgages.roadmap`. |
| `tests/practice-toggle.spec.ts` | Phase 2 tests: toggle click, `data-mode` flip, `/mortgages` route 200, keyboard nav. |
| `tests/themes.spec.ts` | Phase 2.5 tests: matrix index, per-row, status badges, `/workflows` redirect (skipped locally), `/roadmap` aggregation. |

### Modified

| Path | Change |
|---|---|
| `src/app/globals.css` | Add `--mode-accent` + `--mode-accent-bright` semantic tokens to `:root`; add `[data-mode="ma"]` + `[data-mode="mortgages"]` overrides. |
| `src/app/layout.tsx` | Mount `<ModeSetter />` inside `<body>` above `<HomeNav />`. |
| `src/components/home/BrandLockup.tsx` | Replace static tagline `<span>`s with `<PracticeToggle />`. |
| `src/components/home/HomeNav.tsx` | Swap `WORKFLOWS` link for `THEMES`. CM nav becomes `THEMES · OFFERS · SYSTEM` (3 concepts). Also swap blue token → mode-accent token in CTA border/color. |
| `src/components/home/HomeHero.tsx` | Replace 5× `var(--homev3-blue[-bright])` "active practice accent" sites with mode-accent token. (Keep structural button `background` literal — see Task 3.) |
| `src/components/home/HomeStrip.tsx` | Replace 1× `var(--homev3-blue-bright)` (StripCell label color) with mode-accent token. |
| `src/components/home/BuiltForGrid.tsx` | Replace 2× `var(--homev3-blue-bright)` (icon + link color) with mode-accent token. |
| `src/components/home/ReferenceSystemCTA.tsx` | Replace 1× `var(--homev3-blue-bright)` (link color) with mode-accent token. |
| `src/components/home/OrchestrationDiagram.tsx` | Replace 1× `var(--homev3-blue-bright)` (icon color, line 124) with mode-accent token. SVG literals `#fbbf24` / `#60a5fa` stay — those are decorative wire dots, not active-accent surfaces. |
| `src/components/Footer.tsx` | Add `/roadmap` link to footer nav. |
| `src/content/site.ts` | Add `v2Mortgages` export (new). Update `site.nav` / `site.footer.links.pillars` to use `Themes` not `Workflows`. |
| `staticwebapp.config.json` | Add `/mortgages` rewrite; add `/workflows → /themes` 301; add `/themes` + `/themes/[id]` + `/roadmap` rewrites; retarget legacy `/m-and-a-execution` → `/offers` stays; add temporary `/ma → /` 301 placeholder until Phase 3 lands. |
| `public/sitemap.xml` | Add `/mortgages`, `/themes`, 7× `/themes/[id]`, `/roadmap`; drop `/workflows`. |
| `public/llms.txt` | Reflect new IA: themes index, per-buyer pages, roadmap, dissolved workflows, mortgages stub. |
| `tests/home.spec.ts` | Fix the stale `'DATA.'` assertion at line 8 (no longer in source) — replace with `'CAPITAL MARKETS.'`. |

### Deleted

| Path | Reason |
|---|---|
| `src/app/workflows/page.tsx` | Content dissolves into `/themes/[id]` pages; route becomes 301 to `/themes`. |

---

## Phase 1 — Invisible Colour-Token Refactor

Pure plumbing. Site looks pixel-identical after.

### Task 1: Add semantic mode-accent tokens to globals.css

**Files:**
- Modify: `src/app/globals.css` (lines 9-30 — the `:root` block)

**Steps:**

- [ ] **Step 1: Add `--mode-accent` and `--mode-accent-bright` to `:root`, defaulting to CM orange.**
  Edit `src/app/globals.css`. Insert after line 27 (`--homev3-orange-bright: #fbbf24;`):
  ```css
    --homev3-orange: #f59e0b;
    --homev3-orange-bright: #fbbf24;
    /* Semantic active-practice accent. Reads from the appropriate literal per
       data-mode below. Default = CM (orange) so existing pages render unchanged
       when no mode is set. */
    --mode-accent: var(--homev3-blue);
    --mode-accent-bright: var(--homev3-blue-bright);
  ```
  Wait — default needs CM. CM today renders with the blue-bright accent (HomeHero eyebrow, HomeNav CTA, etc. are blue). Per Phase 1's "pixel-identical" rule, default must match the **currently rendered** colour, which is BLUE for CM. The addendum's "CM = orange tagline" only applies to the BrandLockup tagline (which becomes the toggle — stays literal-colour-coded). Confirming: default `--mode-accent[-bright]` = blue.

  Final content to insert after line 27:
  ```css
    /* Semantic active-practice accent. Default = CM (blue), matching the
       current rendered colour on every CM page. Overridden by [data-mode]
       selectors further down for non-CM modes. */
    --mode-accent: var(--homev3-blue);
    --mode-accent-bright: var(--homev3-blue-bright);
  ```

- [ ] **Step 2: Add per-mode overrides below the `:root` block.**
  After the closing `}` of `:root` (line 30), insert:
  ```css

  :root[data-mode="cm"] {
    --mode-accent: var(--homev3-blue);
    --mode-accent-bright: var(--homev3-blue-bright);
  }

  :root[data-mode="ma"] {
    /* M&A reuses blue; the toggle's M&A label is already blue. Phase 3 may
       re-tune. */
    --mode-accent: var(--homev3-blue);
    --mode-accent-bright: var(--homev3-blue-bright);
  }

  :root[data-mode="mortgages"] {
    /* Mortgages = white accent per the addendum. */
    --mode-accent: #ffffff;
    --mode-accent-bright: #ffffff;
  }
  ```

- [ ] **Step 3: Build to verify CSS still parses.**
  Run: `npx next build`
  Expected: PASS — `Compiled successfully` with the same route list as before. No new routes yet. If build fails, the CSS additions broke something — read the error and fix.

- [ ] **Step 4: Commit.**
  ```bash
  git add src/app/globals.css
  git commit -m "phase-1: add --mode-accent semantic token (default = CM blue)"
  ```

### Task 2: Refactor active-accent sites in HomeNav

**Files:**
- Modify: `src/components/home/HomeNav.tsx` (lines 72-73)
- Test: existing `tests/home.spec.ts` covers the homepage; no new test needed for this invisible refactor.

**Steps:**

- [ ] **Step 1: Replace blue token with mode-accent token in HomeNav CTA.**
  Edit `src/components/home/HomeNav.tsx`. Replace the two CTA style entries:
  ```tsx
            border: '1px solid var(--homev3-blue)',
            color: 'var(--homev3-blue-bright)',
  ```
  with:
  ```tsx
            border: '1px solid var(--mode-accent)',
            color: 'var(--mode-accent-bright)',
  ```

- [ ] **Step 2: Build and verify.**
  Run: `npx next build`
  Expected: PASS. Default `--mode-accent` is `var(--homev3-blue)` so colours resolve identically.

- [ ] **Step 3: Commit.**
  ```bash
  git add src/components/home/HomeNav.tsx
  git commit -m "phase-1: HomeNav CTA uses mode-accent token"
  ```

### Task 3: Refactor active-accent sites in HomeHero

**Files:**
- Modify: `src/components/home/HomeHero.tsx` (lines 32, 49, 72-73, 93-94)

**Steps:**

- [ ] **Step 1: Identify and classify each blue usage.**
  Lines in HomeHero.tsx:
  - L32 `color: 'var(--homev3-blue-bright)'` — eyebrow text → **active accent** (refactor)
  - L49 `color: 'var(--homev3-blue-bright)'` — "AI agents." span → **active accent** (refactor)
  - L72 `background: 'var(--homev3-blue)'` — primary CTA fill → **active accent** (refactor)
  - L73 `border: '1px solid var(--homev3-blue)'` — primary CTA border → **active accent** (refactor)
  - L93 `border: '1px solid var(--homev3-blue)'` — secondary CTA border → **active accent** (refactor)
  - L94 `color: 'var(--homev3-blue-bright)'` — secondary CTA text → **active accent** (refactor)

  All six are practice-accent surfaces, not structural chrome. All six refactor.

- [ ] **Step 2: Apply replacements.**
  Edit `src/components/home/HomeHero.tsx`. Use `Edit` with `replace_all=false` six times (each line is unique by neighbouring code):

  Line 32 inside the eyebrow span style block — change `color: 'var(--homev3-blue-bright)'` to `color: 'var(--mode-accent-bright)'`.

  Line 49 inside `<span style={{ color: 'var(--homev3-blue-bright)' }}>AI agents.</span>` — change to `<span style={{ color: 'var(--mode-accent-bright)' }}>AI agents.</span>`.

  Lines 72-73 inside the primary CTA style — change `background: 'var(--homev3-blue)'` to `background: 'var(--mode-accent)'` and `border: '1px solid var(--homev3-blue)'` to `border: '1px solid var(--mode-accent)'`.

  Lines 93-94 inside the secondary CTA style — change `border: '1px solid var(--homev3-blue)'` to `border: '1px solid var(--mode-accent)'` and `color: 'var(--homev3-blue-bright)'` to `color: 'var(--mode-accent-bright)'`.

- [ ] **Step 3: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 4: Commit.**
  ```bash
  git add src/components/home/HomeHero.tsx
  git commit -m "phase-1: HomeHero accent surfaces use mode-accent token"
  ```

### Task 4: Refactor active-accent sites in HomeStrip, BuiltForGrid, ReferenceSystemCTA, OrchestrationDiagram

**Files:**
- Modify: `src/components/home/HomeStrip.tsx` (line 20)
- Modify: `src/components/home/BuiltForGrid.tsx` (lines 86, 119)
- Modify: `src/components/home/ReferenceSystemCTA.tsx` (line 66)
- Modify: `src/components/home/OrchestrationDiagram.tsx` (line 124)

**Steps:**

- [ ] **Step 1: HomeStrip — label colour.**
  Edit `src/components/home/HomeStrip.tsx`. Change `color: 'var(--homev3-blue-bright)'` (line 20) → `color: 'var(--mode-accent-bright)'`.

- [ ] **Step 2: BuiltForGrid — icon colour and link colour.**
  Edit `src/components/home/BuiltForGrid.tsx`. Change BOTH instances of `color: 'var(--homev3-blue-bright)'` (lines 86 and 119) → `color: 'var(--mode-accent-bright)'`. The two lines are in different style blocks (icon circle vs. link) so use two targeted `Edit` calls with surrounding context.

- [ ] **Step 3: ReferenceSystemCTA — link colour.**
  Edit `src/components/home/ReferenceSystemCTA.tsx`. Change `color: 'var(--homev3-blue-bright)'` (line 66) → `color: 'var(--mode-accent-bright)'`.

- [ ] **Step 4: OrchestrationDiagram — node icon colour.**
  Edit `src/components/home/OrchestrationDiagram.tsx`. Change `color: 'var(--homev3-blue-bright)'` (line 124, inside the `Node` component's icon-circle style) → `color: 'var(--mode-accent-bright)'`. Do NOT touch the SVG `<g fill="#fbbf24">` (line 183) or `<g fill="#60a5fa">` (line 175) — those are decorative wire-dots, not active-accent surfaces, and changing them would alter the pixel-identical promise for orange-coloured outbound wires.

- [ ] **Step 5: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 6: Commit.**
  ```bash
  git add src/components/home/HomeStrip.tsx src/components/home/BuiltForGrid.tsx src/components/home/ReferenceSystemCTA.tsx src/components/home/OrchestrationDiagram.tsx
  git commit -m "phase-1: remaining home components use mode-accent token"
  ```

### Task 5: Fix stale `tests/home.spec.ts` assertion

**Files:**
- Modify: `tests/home.spec.ts` (line 8)

**Steps:**

- [ ] **Step 1: Run the existing test to confirm it currently fails.**
  Run: `npx playwright test tests/home.spec.ts`
  Expected: FAIL at line 8 — `page.getByText('DATA.', { exact: false }).first()` is not present in the current BrandLockup output (which has `CAPITAL MARKETS.`, `M&A.`, `MORTGAGES.`).

- [ ] **Step 2: Replace the assertion to match current source.**
  Edit `tests/home.spec.ts`. Change line 8:
  ```ts
    await expect(page.getByText('DATA.', { exact: false }).first()).toBeVisible()
  ```
  to:
  ```ts
    await expect(page.getByText('CAPITAL MARKETS.', { exact: false }).first()).toBeVisible()
  ```

- [ ] **Step 3: Re-run.**
  Run: `npx playwright test tests/home.spec.ts`
  Expected: PASS.

- [ ] **Step 4: Commit.**
  ```bash
  git add tests/home.spec.ts
  git commit -m "phase-1: fix stale home.spec.ts tagline assertion"
  ```

### Task 6: Phase 1 verification — full build + screenshot diff

**Files:** (no edits; verification only)

**Steps:**

- [ ] **Step 1: Run full build with strict typecheck.**
  Run: `npx next build`
  Expected: PASS. No TS errors, no ESLint warnings introduced.

- [ ] **Step 2: Run the Playwright suite to confirm no regressions.**
  Run: `npx playwright test`
  Expected: All passing (single chromium project per `playwright.config.ts`). Targeted: home + offers specs.

- [ ] **Step 3: Phase 1 done — site looks identical, plumbing is in place.**

---

## Phase 2 — Toggle Live + Mortgages Stub

### Task 7: Create `ModeSetter` client component

**Files:**
- Create: `src/components/ModeSetter.tsx`

**Steps:**

- [ ] **Step 1: Write the component.**
  ```tsx
  'use client'

  import { useEffect } from 'react'
  import { usePathname } from 'next/navigation'

  /**
   * ModeSetter — derives the practice-mode from the URL and writes it onto
   * <html data-mode="...">. Static export means we cannot set this server-side;
   * we accept a brief FOUC on direct loads to /ma or /mortgages.
   *
   * Mode mapping:
   *   /ma           → 'ma'
   *   /ma/*         → 'ma'
   *   /mortgages    → 'mortgages'
   *   anything else → 'cm'
   */
  export function ModeSetter() {
    const pathname = usePathname()

    useEffect(() => {
      const mode =
        pathname === '/ma' || pathname.startsWith('/ma/')
          ? 'ma'
          : pathname === '/mortgages'
          ? 'mortgages'
          : 'cm'
      document.documentElement.dataset.mode = mode
    }, [pathname])

    return null
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 3: Commit.**
  ```bash
  git add src/components/ModeSetter.tsx
  git commit -m "phase-2: ModeSetter client component (URL → data-mode)"
  ```

### Task 8: Mount `ModeSetter` in root layout

**Files:**
- Modify: `src/app/layout.tsx` (lines 40-48)

**Steps:**

- [ ] **Step 1: Add import.**
  Edit `src/app/layout.tsx`. After line 3 (`import { HomeNav } from '@/components/home'`) add:
  ```tsx
  import { ModeSetter } from '@/components/ModeSetter'
  ```

- [ ] **Step 2: Mount inside `<body>`.**
  Replace lines 40-48 (the JSX return) with:
  ```tsx
    return (
      <html lang="en">
        <body className="antialiased">
          <ModeSetter />
          <HomeNav />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    )
  ```

- [ ] **Step 3: Build.**
  Run: `npx next build`
  Expected: PASS. The static-export check passes because `ModeSetter` is `'use client'` and renders `null`.

- [ ] **Step 4: Commit.**
  ```bash
  git add src/app/layout.tsx
  git commit -m "phase-2: mount ModeSetter in root layout"
  ```

### Task 9: Write failing test for `data-mode` flip on `/mortgages`

**Files:**
- Create: `tests/practice-toggle.spec.ts`

**Steps:**

- [ ] **Step 1: Author the test (first assertion only).**
  ```ts
  import { test, expect } from '@playwright/test'

  test('/mortgages route sets data-mode="mortgages" on <html>', async ({ page }) => {
    const response = await page.goto('/mortgages')
    expect(response?.status()).toBe(200)
    // Wait briefly for the client-side ModeSetter useEffect to flush.
    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.dataset.mode),
    ).toBe('mortgages')
  })

  test('/ route sets data-mode="cm" on <html>', async ({ page }) => {
    await page.goto('/')
    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.dataset.mode),
    ).toBe('cm')
  })
  ```

- [ ] **Step 2: Run; expect FAIL (no /mortgages route exists yet).**
  Run: `npx playwright test tests/practice-toggle.spec.ts`
  Expected: FAIL — `/mortgages` returns 404; even if `data-mode` flips, the response status assertion fails.

### Task 10: Add `v2Mortgages` content to `site.ts`

**Files:**
- Modify: `src/content/site.ts` (append below `export const v2 = { ... }` block — after line 875)

**Steps:**

- [ ] **Step 1: Append `v2Mortgages` export.**
  Edit `src/content/site.ts`. After line 875 (the closing `} as const` of `v2`), insert before line 877's `export type V2`:
  ```ts

  // =============================================================================
  // v2Mortgages — Mortgages practice stub (2026-05-17)
  // =============================================================================
  // Mortgages = retail mortgage origination automation. NOT CDM-native — see
  // the practice-toggle plan addendum. The capability narrative is "same
  // AI-velocity, different vertical." Status: BUILDING (stub only).
  // =============================================================================

  export const v2Mortgages = {
    home: {
      route: '/mortgages',
      title: 'Mortgages — Atheryon',
      intent: 'Retail mortgage origination automation.',
      description:
        'The same AI-velocity that runs our CDM-native capital markets work also runs retail mortgage origination automation — same capability, different vertical.',
      status: 'building' as const,
      sections: {
        hero: {
          label: 'atheryon / mortgages / practice-overview',
          title: 'Mortgages',
          body: 'Retail mortgage origination automation.',
        },
        thesis: {
          label: '§01 / Thesis',
          title: 'Same AI-velocity, different vertical',
          body:
            'The same AI-velocity that runs our CDM-native capital markets work also runs retail mortgage origination automation. Senior capital-markets architects directing AI agents that do the build, delivering in weeks what traditionally takes 6–18 months. The capability transfers; the vertical changes. Capital markets uses ISDA CDM as the canonical data model; mortgages uses LIXI (AU) and MISMO (US/intl) — different schemas, same architectural pattern: a typed data plane, an agent orchestration layer, and deterministic pipelines from ingest to operational output.',
        },
        scope: {
          label: '§02 / Scope',
          title: 'Where the capability applies',
          items: [
            {
              id: 'origination',
              name: 'Origination',
              body: 'Application intake, document classification, income/expense extraction, eligibility scoring, conditional-approval pipelines.',
            },
            {
              id: 'servicing',
              name: 'Servicing',
              body: 'Lifecycle events, hardship workflows, arrears triage, variation processing, customer-facing decisioning.',
            },
            {
              id: 'risk-reporting',
              name: 'Risk & reporting',
              body: 'Portfolio analytics, regulatory reporting (APRA ARS 220, RBA CLF/SCV), stress testing, climate-risk overlay.',
            },
          ],
        },
        status: {
          label: '§03 / Status',
          title: 'BUILDING',
          body:
            'Practice stub is live. Reference architecture, agent topology, and pricing in active development. First engagement window: 2026 H2.',
        },
        cta: {
          label: 'Talk about a mortgages engagement',
          href: '/contact?topic=mortgages',
        },
      },
    },
    roadmap: {
      // Aggregated by /roadmap. Single item for the stub state.
      id: 'mortgages-practice',
      name: 'Mortgages practice',
      status: 'building' as const,
      blurb: 'Retail mortgage origination automation — full mode launches after Phase 2 stub.',
      href: '/mortgages',
    },
  } as const

  export type V2Mortgages = typeof v2Mortgages
  ```

- [ ] **Step 2: Build to typecheck the new export.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 3: Commit.**
  ```bash
  git add src/content/site.ts
  git commit -m "phase-2: v2Mortgages content stub in site.ts"
  ```

### Task 11: Create `/mortgages` page

**Files:**
- Create: `src/app/mortgages/page.tsx`

**Steps:**

- [ ] **Step 1: Create the page.** It follows the `/about` and `/workflows` aesthetic — `bg-bone`, doc-banner, sections with `§NN / X` labels.
  ```tsx
  import type { Metadata } from 'next'
  import Link from 'next/link'
  import { v2Mortgages } from '@/content/site'

  const page = v2Mortgages.home
  const s = page.sections

  export const metadata: Metadata = {
    title: page.title,
    description: page.description,
    openGraph: { title: page.title, description: page.description },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description },
    alternates: { canonical: 'https://atheryon.com.au/mortgages' },
  }

  function SectionHead({ label, title }: { label: string; title: string }) {
    return (
      <header className="mb-8 pb-4 border-b border-charcoal/15">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
          {label}
        </div>
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
          {title}
        </h2>
      </header>
    )
  }

  export default function MortgagesPage() {
    return (
      <div className="bg-bone min-h-screen">
        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
              {s.hero.label}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
              {s.hero.title}
            </h1>
            <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
              {s.hero.body}
            </p>
          </div>
        </section>

        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 py-16 md:py-20">
            <SectionHead label={s.thesis.label} title={s.thesis.title} />
            <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
              {s.thesis.body}
            </p>
          </div>
        </section>

        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 py-16 md:py-20">
            <SectionHead label={s.scope.label} title={s.scope.title} />
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
              {s.scope.items.map((it) => (
                <li key={it.id} className="bg-bone p-6 flex flex-col">
                  <div className="font-display text-xl font-medium text-charcoal mb-2">
                    {it.name}
                  </div>
                  <p className="text-sm text-charcoal/80 leading-relaxed">{it.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 py-16 md:py-20">
            <SectionHead label={s.status.label} title={s.status.title} />
            <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
              {s.status.body}
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              atheryon / mortgages / end-of-document
            </div>
            <Link
              href={s.cta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              {s.cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    )
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS. New static page emitted at `out/mortgages.html`.

- [ ] **Step 3: Re-run Phase 2 toggle test — partial pass.**
  Run: `npx playwright test tests/practice-toggle.spec.ts`
  Expected: First test (`/mortgages` route + data-mode flip) now PASSES because the route exists AND `ModeSetter` flips the attribute. Second test (`/` → `cm`) also PASSES. Other tests authored in Task 13 don't exist yet.

- [ ] **Step 4: Commit.**
  ```bash
  git add src/app/mortgages/page.tsx
  git commit -m "phase-2: /mortgages stub page"
  ```

### Task 12: Create `PracticeToggle` component (replacing static tagline)

**Files:**
- Create: `src/components/PracticeToggle.tsx`
- Modify: `src/components/home/BrandLockup.tsx` (lines 24-39 — the tagline span block)

**Steps:**

- [ ] **Step 1: Author PracticeToggle.**
  Create `src/components/PracticeToggle.tsx`:
  ```tsx
  'use client'

  import Link from 'next/link'
  import { usePathname } from 'next/navigation'

  type Mode = 'cm' | 'ma' | 'mortgages'

  const ITEMS: { mode: Mode; label: string; href: string; color: string }[] = [
    { mode: 'cm', label: 'CAPITAL MARKETS.', href: '/', color: 'var(--homev3-orange-bright)' },
    { mode: 'ma', label: 'M&A.', href: '/ma', color: 'var(--homev3-blue-bright)' },
    { mode: 'mortgages', label: 'MORTGAGES.', href: '/mortgages', color: '#ffffff' },
  ]

  function modeFromPath(pathname: string): Mode {
    if (pathname === '/ma' || pathname.startsWith('/ma/')) return 'ma'
    if (pathname === '/mortgages') return 'mortgages'
    return 'cm'
  }

  /**
   * PracticeToggle — three Links derived from the URL. Replaces the static
   * BrandLockup tagline spans. Tagline colour stays literal per item (CM=orange,
   * M&A=blue, Mortgages=white) so all three practices are visible at once;
   * --mode-accent reflects the ACTIVE practice (set by ModeSetter on <html>).
   */
  export function PracticeToggle() {
    const pathname = usePathname()
    const active = modeFromPath(pathname)

    return (
      <span
        role="navigation"
        aria-label="Practice area"
        className="brand-lockup-tagline"
        style={{
          fontSize: 9,
          letterSpacing: '0.22em',
          fontWeight: 500,
          marginTop: 6,
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        {ITEMS.map((item, idx) => (
          <span key={item.mode} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            {idx > 0 && (
              <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.35)', padding: '0 6px' }}>
                |
              </span>
            )}
            <Link
              href={item.href}
              aria-current={active === item.mode ? 'page' : undefined}
              style={{
                color: item.color,
                textDecoration: 'none',
                opacity: active === item.mode ? 1 : 0.85,
              }}
            >
              {item.label}
            </Link>
          </span>
        ))}
      </span>
    )
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 3: Swap PracticeToggle into BrandLockup.**
  Edit `src/components/home/BrandLockup.tsx`. Replace lines 24-39 (the static tagline `<span className="brand-lockup-tagline" ...>` and its children) with:
  ```tsx
        <PracticeToggle />
  ```
  Add the import at the top of the file (line 2 — under the BrandMark import):
  ```tsx
  import { PracticeToggle } from '../PracticeToggle'
  ```

- [ ] **Step 4: Build.**
  Run: `npx next build`
  Expected: PASS. `BrandLockup.tsx` is now used by a server component (`HomeNav` wraps it in a client component via `'use client'` at line 1 of HomeNav.tsx — so PracticeToggle's `'use client'` is fine). HomeNav already has `'use client'` directive.

- [ ] **Step 5: Verify in browser manually (optional but recommended).**
  Start dev server: `npx next dev` (in another shell or background). Visit `http://localhost:3000/`, click `MORTGAGES.` in the lockup. Confirm: route changes to `/mortgages`, `data-mode` flips to `mortgages` (inspect `<html>` in DevTools), `aria-current="page"` on the MORTGAGES link.

- [ ] **Step 6: Commit.**
  ```bash
  git add src/components/PracticeToggle.tsx src/components/home/BrandLockup.tsx
  git commit -m "phase-2: PracticeToggle replaces static BrandLockup tagline"
  ```

### Task 13: Extend `tests/practice-toggle.spec.ts` with toggle interaction + keyboard nav

**Files:**
- Modify: `tests/practice-toggle.spec.ts`

**Steps:**

- [ ] **Step 1: Add tests below existing assertions.**
  Append to `tests/practice-toggle.spec.ts`:
  ```ts

  test('clicking MORTGAGES. in the toggle navigates and flips data-mode', async ({ page }) => {
    await page.goto('/')
    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.dataset.mode),
    ).toBe('cm')

    await page.getByRole('link', { name: 'MORTGAGES.' }).click()
    await page.waitForURL('**/mortgages')

    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.dataset.mode),
    ).toBe('mortgages')
  })

  test('active practice link has aria-current="page"', async ({ page }) => {
    await page.goto('/mortgages')
    const active = page.getByRole('link', { name: 'MORTGAGES.' })
    await expect(active).toHaveAttribute('aria-current', 'page')

    const inactive = page.getByRole('link', { name: 'CAPITAL MARKETS.' })
    await expect(inactive).not.toHaveAttribute('aria-current', 'page')
  })

  test('keyboard: Tab to first toggle link and activate with Enter navigates', async ({ page }) => {
    await page.goto('/')
    // Walk the focus order until we land on the CAPITAL MARKETS. link, then Tab to MORTGAGES.
    await page.keyboard.press('Tab') // first focusable — depends on the doc, usually the brand Link wrapper
    // Direct focus is more reliable than guessing tab depth for a static-export page:
    await page.getByRole('link', { name: 'MORTGAGES.' }).focus()
    await page.keyboard.press('Enter')
    await page.waitForURL('**/mortgages')
    expect(page.url()).toContain('/mortgages')
  })
  ```

- [ ] **Step 2: Run.**
  Run: `npx playwright test tests/practice-toggle.spec.ts`
  Expected: All 5 tests PASS.

- [ ] **Step 3: Commit.**
  ```bash
  git add tests/practice-toggle.spec.ts
  git commit -m "phase-2: practice-toggle tests (toggle + keyboard + aria-current)"
  ```

### Task 14: Update `staticwebapp.config.json` for `/mortgages` rewrite + temporary `/ma` 301

**Files:**
- Modify: `staticwebapp.config.json`

**Steps:**

- [ ] **Step 1: Add the `/mortgages` rewrite and temporary `/ma` 301.**
  Edit `staticwebapp.config.json`. After the `/labs` rewrite (line 38), before the `/integration/*` rule (line 39), insert:
  ```json
      { "route": "/mortgages",   "rewrite": "/mortgages.html" },
  ```
  Then, BEFORE the legacy redirect block (currently line 10 retargets `/m-and-a-execution → /offers`), add a temporary `/ma` 301 (Phase 3 will replace this with proper rewrites):
  ```json
      { "route": "/ma",                     "redirect": "/",            "statusCode": 301 },
      { "route": "/ma/*",                   "redirect": "/",            "statusCode": 301 },
  ```
  Place these two new lines after line 14 (`/what-we-deliver`) and before line 15 (`/ai-ready-data`) — anywhere in the legacy-redirect block is fine.

- [ ] **Step 2: Verify JSON is still valid.**
  Run: `node -e "JSON.parse(require('fs').readFileSync('staticwebapp.config.json','utf8'))" && echo OK`
  Expected: prints `OK`. If parse error, fix the JSON.

- [ ] **Step 3: Commit.**
  ```bash
  git add staticwebapp.config.json
  git commit -m "phase-2: SWA rewrite /mortgages + temporary /ma 301"
  ```

### Task 15: Update `public/sitemap.xml` and `public/llms.txt` for `/mortgages`

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`

**Steps:**

- [ ] **Step 1: Add `/mortgages` to sitemap.**
  Edit `public/sitemap.xml`. Before the `/privacy` line (line 14), insert:
  ```xml
    <url><loc>https://atheryon.com.au/mortgages</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  ```

- [ ] **Step 2: Add Mortgages to llms.txt.**
  Edit `public/llms.txt`. After line 11 (the "AI Agent Systems" line in Core Domains), the Core Domains list ends with workflows. Update the Site map section — after line 36 (`[Labs Themes]`), insert before `[About]`:
  ```
  - [Mortgages](https://atheryon.com.au/mortgages): retail mortgage origination automation — practice stub (BUILDING).
  ```

- [ ] **Step 3: Commit.**
  ```bash
  git add public/sitemap.xml public/llms.txt
  git commit -m "phase-2: sitemap + llms.txt add /mortgages"
  ```

### Task 16: Phase 2 verification

**Files:** (no edits)

**Steps:**

- [ ] **Step 1: Build clean.**
  Run: `npx next build`
  Expected: PASS. New routes in output: `/mortgages`.

- [ ] **Step 2: Run full Playwright suite.**
  Run: `npx playwright test`
  Expected: All passing — `home.spec.ts`, `offers.spec.ts`, `practice-toggle.spec.ts`.

- [ ] **Step 3: Run production-ready check.**
  Run: `npm run verify:production-ready`
  Expected: no `REPLACE_ME` strings. `{{PENDING_*}}` is gated separately.

- [ ] **Step 4: Phase 2 done — toggle is live, Mortgages renders, M&A 301s home temporarily.**

---

## Phase 2.5 — CM `/themes` Matrix + `/roadmap` + `/workflows` Redirect

### Task 17: Create `StatusBadge` component

**Files:**
- Create: `src/components/StatusBadge.tsx`

**Steps:**

- [ ] **Step 1: Author the component.**
  ```tsx
  // Shared status pill. Used on /themes, /themes/[id], /roadmap.
  // Status taxonomy (locked, addendum 2026-05-17):
  //   shipped — blue, proof exists, page renders fully
  //   building — amber-striped, in active dev
  //   roadmap — amber-outline, declared intent
  export type Status = 'shipped' | 'building' | 'roadmap'

  const STYLES: Record<Status, { label: string; bg: string; fg: string; border: string }> = {
    shipped: {
      label: 'SHIPPED',
      bg: 'rgba(59, 130, 246, 0.15)',
      fg: '#60a5fa',
      border: 'rgba(59, 130, 246, 0.45)',
    },
    building: {
      label: 'BUILDING',
      bg: 'rgba(245, 158, 11, 0.18)',
      fg: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.55)',
    },
    roadmap: {
      label: 'ROADMAP',
      bg: 'transparent',
      fg: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.55)',
    },
  }

  export function StatusBadge({ status }: { status: Status }) {
    const s = STYLES[status]
    return (
      <span
        data-status={status}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '3px 8px',
          fontSize: 10,
          letterSpacing: '0.16em',
          fontWeight: 700,
          textTransform: 'uppercase',
          background: s.bg,
          color: s.fg,
          border: `1px solid ${s.border}`,
          borderRadius: 3,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        {s.label}
      </span>
    )
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 3: Commit.**
  ```bash
  git add src/components/StatusBadge.tsx
  git commit -m "phase-2.5: StatusBadge component (shipped/building/roadmap)"
  ```

### Task 18: Create `buyerThemes.ts`

**Files:**
- Create: `src/content/buyerThemes.ts`

**Steps:**

- [ ] **Step 1: Author the data structure.**
  ```ts
  // buyerThemes.ts — the 7-row CM buyer matrix (addendum 2026-05-17).
  //
  // Each row joins to v2.pages.workflows.items[workflowId] in site.ts when a
  // proven workflow exists. workflowId === null means the workflow is still on
  // the roadmap; the theme page renders a "ROADMAP — planned" marker.
  //
  // 3 themes carry status="roadmap": treasury, front-office-trading,
  // entity-intelligence — their workflows are not yet built.
  //
  // Foundation / ODS is a TECH SELL (CDO/CTO/Architect buyers), not a
  // business-line desk. Its offerFramings reflect platform language.

  import type { Status } from '@/components/StatusBadge'

  export type OfferKey = 'code' | 'prompts' | 'consult'

  export type BuyerTheme = {
    id: string
    name: string
    status: Status
    buyerTitles: readonly string[]
    pain: string
    speedPitch: string
    /** Matches an id in v2.pages.workflows.items, or null for roadmap themes. */
    workflowId:
      | 'trade-lifecycle-automation'
      | 'risk-reporting-generation'
      | 'portfolio-analytics-pipeline'
      | 'research-summarisation-workflow'
      | 'financial-data-ingestion-and-structuring'
      | null
    offerFramings: Record<OfferKey, string>
  }

  export const buyerThemes: readonly BuyerTheme[] = [
    {
      id: 'front-office-trading',
      name: 'Front Office Trading',
      status: 'roadmap',
      buyerTitles: ['Head of Trading', 'Head of e-Trading', 'Head of Quant Trading'],
      pain: 'Pre-trade pricing and risk pipelines are slow, fragile, and quant-engineer-bound — every new instrument or venue is a multi-quarter build.',
      speedPitch:
        'Pre-trade pricing pipeline normally takes 9–12 months → with us, 6–8 weeks.',
      workflowId: null,
      offerFramings: {
        code: 'License the pricing/analytics pipeline scaffolding — typed payloads, agent topology, venue adapters.',
        prompts: 'Directorial prompt archive for quant-engineer + agent pairing on instrument modelling.',
        consult: 'Senior-led design of your pre-trade pricing stack and rollout path.',
      },
    },
    {
      id: 'middle-office-ops',
      name: 'Middle Office Ops',
      status: 'shipped',
      buyerTitles: ['Head of Operations', 'Head of Post-Trade', 'Head of Confirmations'],
      pain: 'Trade affirmation/confirmation breaks aging across MarkitWire, DTCC CTM, and bilateral channels — manual exception triage dominates.',
      speedPitch:
        'Confirmations exception platform normally takes 6–9 months → with us, 4–6 weeks.',
      workflowId: 'trade-lifecycle-automation',
      offerFramings: {
        code: 'License the trade lifecycle automation pipeline — match logic, exception triage, audit chain.',
        prompts: 'Directorial archive of the prompts that built the post-trade agent topology.',
        consult: 'Senior-led delivery of a confirmations + breaks pipeline tailored to your platforms.',
      },
    },
    {
      id: 'compliance-surveillance',
      name: 'Compliance & Surveillance',
      status: 'shipped',
      buyerTitles: ['Head of Regulatory Reporting', 'Head of Trade Surveillance', 'Chief Compliance Officer'],
      pain: 'EMIR Refit + MiFID II + ASIC + CFTC reporting builds eat 6+ FTE per regime — schema drift breaks submissions monthly.',
      speedPitch:
        'Multi-regime reporting build normally takes 9–18 months → with us, 6–10 weeks.',
      workflowId: 'risk-reporting-generation',
      offerFramings: {
        code: 'License the risk reporting generation pipeline — per-regime rulesets, scoring, submission queue.',
        prompts: 'Directorial archive of the prompts that built the per-regime field-completeness agents.',
        consult: 'Senior-led delivery of a regime-by-regime reporting pipeline and remediation surface.',
      },
    },
    {
      id: 'risk-analytics',
      name: 'Risk & Analytics',
      status: 'shipped',
      buyerTitles: ['Head of Market Risk', 'Head of Counterparty Risk', 'Head of Portfolio Analytics'],
      pain: 'Portfolio analytics + research summarisation pipelines are bespoke per desk — anomaly detection and explanation lag the trading day.',
      speedPitch:
        'Real-time analytics + explanation pipeline normally takes 9–12 months → with us, 6–8 weeks.',
      workflowId: 'portfolio-analytics-pipeline',
      offerFramings: {
        code: 'License the portfolio analytics + research summarisation pipelines — aggregation, anomaly, NL explanation.',
        prompts: 'Directorial archive of the prompts that built the analytics + summarisation agents.',
        consult: 'Senior-led delivery of an analytics pipeline framed against your risk hierarchy.',
      },
    },
    {
      id: 'treasury',
      name: 'Treasury',
      status: 'roadmap',
      buyerTitles: ['Treasurer', 'Head of ALM', 'Head of Liquidity Risk', 'Head of FTP'],
      pain: 'Bank ALM (IRRBB, liquidity, FTP) lives in a patchwork of spreadsheets and vendor tools — scenario refresh is overnight, not intraday.',
      speedPitch:
        'IRRBB / liquidity scenario pipeline normally takes 9–12 months → with us, 6–10 weeks.',
      workflowId: null,
      offerFramings: {
        code: 'License the ALM scenario pipeline scaffolding (when shipped) — typed payloads, agent topology.',
        prompts: 'Directorial prompt archive for ALM analyst + agent pairing on scenario design.',
        consult: 'Senior-led design of your IRRBB / liquidity / FTP pipeline and rollout path.',
      },
    },
    {
      id: 'entity-intelligence',
      name: 'Entity Intelligence',
      status: 'roadmap',
      buyerTitles: ['Head of KYC', 'Head of Client Onboarding', 'Head of Counterparty Data'],
      pain: 'Counterparty + KYC enrichment is fragmented across vendors — entity-resolution and refresh cycles run weeks, not minutes.',
      speedPitch:
        'Counterparty + KYC automation pipeline normally takes 9–12 months → with us, 6–8 weeks.',
      workflowId: null,
      offerFramings: {
        code: 'License the entity resolution + enrichment pipeline scaffolding — typed payloads, agent topology.',
        prompts: 'Directorial prompt archive for KYC analyst + agent pairing on entity refresh.',
        consult: 'Senior-led design of your counterparty + KYC automation pipeline.',
      },
    },
    {
      id: 'foundation-ods',
      name: 'Foundation / ODS',
      status: 'shipped',
      buyerTitles: ['CDO', 'CTO', 'Chief Architect', 'Head of Platform', 'Head of Data'],
      pain: 'Your operational data store is a decade of vendor-locked, partial, untyped pipelines — every new business build pays the foundation tax.',
      speedPitch:
        'CDM-native ODS platform build normally takes 12–18 months → with us, 8–12 weeks.',
      workflowId: 'financial-data-ingestion-and-structuring',
      offerFramings: {
        code: 'License the CDM-native ODS platform — schema editor, ingestion pipeline, lineage, validators.',
        prompts: 'Directorial archive of the prompts that built the ODS platform.',
        consult: 'Senior-led delivery of a CDM-native ODS in your tenant, with downstream desk surfaces.',
      },
    },
  ] as const

  export function getBuyerTheme(id: string): BuyerTheme | undefined {
    return buyerThemes.find((t) => t.id === id)
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 3: Commit.**
  ```bash
  git add src/content/buyerThemes.ts
  git commit -m "phase-2.5: buyerThemes data (7-row CM buyer matrix)"
  ```

### Task 19: Write failing test for `/themes` index

**Files:**
- Create: `tests/themes.spec.ts`

**Steps:**

- [ ] **Step 1: Author initial assertions.**
  ```ts
  import { test, expect } from '@playwright/test'

  const SKIP_LOCAL_REDIRECTS = !process.env.SWA_BASE_URL

  test('/themes index renders all 7 buyer themes', async ({ page }) => {
    const response = await page.goto('/themes')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: 'Front Office Trading', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Middle Office Ops', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Compliance & Surveillance', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Risk & Analytics', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Treasury', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Entity Intelligence', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Foundation / ODS', exact: true })).toBeVisible()
  })

  test('/themes index shows status badges for shipped + roadmap rows', async ({ page }) => {
    await page.goto('/themes')
    // Foundation/ODS is shipped → at least one SHIPPED badge visible.
    await expect(page.locator('[data-status="shipped"]').first()).toBeVisible()
    // Treasury is roadmap → at least one ROADMAP badge visible.
    await expect(page.locator('[data-status="roadmap"]').first()).toBeVisible()
  })
  ```

- [ ] **Step 2: Run.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: FAIL — `/themes` returns 404.

### Task 20: Create `/themes` index page

**Files:**
- Create: `src/app/themes/page.tsx`

**Steps:**

- [ ] **Step 1: Author the page.**
  ```tsx
  import type { Metadata } from 'next'
  import Link from 'next/link'
  import { buyerThemes } from '@/content/buyerThemes'
  import { StatusBadge } from '@/components/StatusBadge'

  export const metadata: Metadata = {
    title: 'Themes — Atheryon',
    description:
      'Seven buyer themes across capital markets. Each one is a desk-head pocket of pain, mapped to a workflow we have built or are building.',
    openGraph: {
      title: 'Themes — Atheryon',
      description: 'Seven buyer themes across capital markets.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Themes — Atheryon',
      description: 'Seven buyer themes across capital markets.',
    },
    alternates: { canonical: 'https://atheryon.com.au/themes' },
  }

  export default function ThemesIndexPage() {
    return (
      <div className="bg-bone min-h-screen">
        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
              atheryon / themes / buyer-matrix
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
              Themes
            </h1>
            <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
              Seven buyer themes across capital markets. Each theme is a desk-head pocket of pain, mapped to a workflow we have built or are building. Speed is the proof — every theme leads with the time we shorten.
            </p>
          </div>
        </section>

        <section>
          <ul className="max-w-container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
            {buyerThemes.map((t, i) => (
              <li key={t.id} className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 md:items-baseline">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 md:w-16 shrink-0">
                  §{String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight">
                      <Link href={`/themes/${t.id}`} className="underline-offset-4 hover:underline">
                        {t.name}
                      </Link>
                    </h2>
                    <StatusBadge status={t.status} />
                  </div>
                  <p className="text-sm md:text-base text-charcoal/80 leading-relaxed mb-2">{t.pain}</p>
                  <p className="font-mono text-xs md:text-sm text-charcoal/65 leading-relaxed">{t.speedPitch}</p>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/55 md:text-right md:w-56 shrink-0">
                  {t.buyerTitles.join(' · ')}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS. New static page at `out/themes.html`.

- [ ] **Step 3: Re-run themes test.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: Both index tests PASS. Per-row tests don't exist yet.

- [ ] **Step 4: Commit.**
  ```bash
  git add src/app/themes/page.tsx
  git commit -m "phase-2.5: /themes index renders 7-row buyer matrix"
  ```

### Task 21: Write failing test for `/themes/[id]` per-buyer pages

**Files:**
- Modify: `tests/themes.spec.ts`

**Steps:**

- [ ] **Step 1: Append per-row assertions.**
  Append to `tests/themes.spec.ts`:
  ```ts

  const SHIPPED_ROWS = [
    { id: 'middle-office-ops', name: 'Middle Office Ops', workflowName: 'Trade lifecycle automation' },
    { id: 'compliance-surveillance', name: 'Compliance & Surveillance', workflowName: 'Risk reporting generation' },
    { id: 'risk-analytics', name: 'Risk & Analytics', workflowName: 'Portfolio analytics pipeline' },
    { id: 'foundation-ods', name: 'Foundation / ODS', workflowName: 'Financial data ingestion and structuring' },
  ] as const

  const ROADMAP_ROWS = [
    { id: 'front-office-trading', name: 'Front Office Trading' },
    { id: 'treasury', name: 'Treasury' },
    { id: 'entity-intelligence', name: 'Entity Intelligence' },
  ] as const

  for (const row of SHIPPED_ROWS) {
    test(`/themes/${row.id} renders SHIPPED badge + embedded workflow`, async ({ page }) => {
      const response = await page.goto(`/themes/${row.id}`)
      expect(response?.status()).toBe(200)
      await expect(page.getByRole('heading', { name: row.name, exact: true })).toBeVisible()
      await expect(page.locator('[data-status="shipped"]').first()).toBeVisible()
      await expect(page.getByText(row.workflowName, { exact: false }).first()).toBeVisible()
    })
  }

  for (const row of ROADMAP_ROWS) {
    test(`/themes/${row.id} renders ROADMAP marker (no workflow)`, async ({ page }) => {
      const response = await page.goto(`/themes/${row.id}`)
      expect(response?.status()).toBe(200)
      await expect(page.getByRole('heading', { name: row.name, exact: true })).toBeVisible()
      await expect(page.locator('[data-status="roadmap"]').first()).toBeVisible()
      await expect(page.getByText('ROADMAP', { exact: false }).first()).toBeVisible()
    })
  }
  ```

- [ ] **Step 2: Run.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: 7 per-row tests FAIL — `/themes/[id]` routes return 404.

### Task 22: Create `/themes/[id]` dynamic page

**Files:**
- Create: `src/app/themes/[id]/page.tsx`

**Steps:**

- [ ] **Step 1: Author the page with `generateStaticParams` (required for static export).**
  ```tsx
  import type { Metadata } from 'next'
  import Link from 'next/link'
  import { notFound } from 'next/navigation'
  import { buyerThemes, getBuyerTheme } from '@/content/buyerThemes'
  import { StatusBadge } from '@/components/StatusBadge'
  import { v2 } from '@/content/site'

  type Params = { id: string }

  export function generateStaticParams(): Params[] {
    return buyerThemes.map((t) => ({ id: t.id }))
  }

  export function generateMetadata({ params }: { params: Params }): Metadata {
    const theme = getBuyerTheme(params.id)
    if (!theme) return { title: 'Theme not found' }
    const title = `${theme.name} — Atheryon`
    const description = theme.pain
    return {
      title,
      description,
      openGraph: { title, description },
      twitter: { card: 'summary_large_image', title, description },
      alternates: { canonical: `https://atheryon.com.au/themes/${theme.id}` },
    }
  }

  export default function ThemePage({ params }: { params: Params }) {
    const theme = getBuyerTheme(params.id)
    if (!theme) notFound()

    const workflow = theme.workflowId
      ? v2.pages.workflows.sections.items.find((w) => w.id === theme.workflowId)
      : null

    return (
      <div className="bg-bone min-h-screen">
        {/* Header */}
        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
              atheryon / themes / {theme.id}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02]">
                {theme.name}
              </h1>
              <StatusBadge status={theme.status} />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/55 mb-6">
              {theme.buyerTitles.join(' · ')}
            </p>
            <p className="text-base md:text-lg text-charcoal/80 max-w-3xl leading-relaxed mb-4">
              {theme.pain}
            </p>
            <p className="font-mono text-sm md:text-base text-charcoal/85 max-w-3xl leading-relaxed">
              {theme.speedPitch}
            </p>
          </div>
        </section>

        {/* Workflow embed */}
        <section id="workflow" className="border-b border-charcoal/15 scroll-mt-24">
          <div className="max-w-container mx-auto px-6 py-16 md:py-20">
            <header className="mb-8 pb-4 border-b border-charcoal/15">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
                §01 / Workflow
              </div>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
                {workflow ? workflow.name : 'ROADMAP — workflow planned'}
              </h2>
            </header>
            {workflow ? (
              <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {(
                  [
                    ['Input', workflow.input],
                    ['AI agents', workflow.agents],
                    ['Processing', workflow.processing],
                    ['Output', workflow.output],
                  ] as const
                ).map(([stage, content]) => (
                  <li key={stage} className="border border-charcoal/30 bg-white p-4 flex flex-col h-full">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                      {stage}
                    </div>
                    <div className="font-mono text-xs md:text-sm text-charcoal/85 leading-relaxed">
                      {content}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-base md:text-lg text-charcoal/80 max-w-3xl leading-relaxed">
                ROADMAP — workflow for {theme.name} is planned. The speed promise above is what we will ship. Talk to us if you want to co-build it.
              </p>
            )}
          </div>
        </section>

        {/* Offers framed for this buyer */}
        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 py-16 md:py-20">
            <header className="mb-8 pb-4 border-b border-charcoal/15">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
                §02 / Offers for this theme
              </div>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
                Three ways to engage
              </h2>
            </header>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
              {(
                [
                  { key: 'code', title: 'Buy the code', href: '/offers/code' },
                  { key: 'prompts', title: 'License the prompts', href: '/offers/prompts' },
                  { key: 'consult', title: 'Consult', href: '/offers/consult' },
                ] as const
              ).map((o) => (
                <li key={o.key} className="bg-bone p-6 flex flex-col">
                  <Link
                    href={o.href}
                    className="font-display text-2xl font-medium text-charcoal tracking-tight underline-offset-4 hover:underline mb-3"
                  >
                    {o.title}
                  </Link>
                  <p className="text-sm text-charcoal/80 leading-relaxed">
                    {theme.offerFramings[o.key]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              atheryon / themes / {theme.id} / end-of-document
            </div>
            <Link
              href={`/contact?topic=${theme.id}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              Book system assessment
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    )
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS. Build output should list 7 static pages under `/themes/...`. If Next prints a warning about dynamic routes needing `generateStaticParams` in static export mode and the build fails, the function is present — re-read the build error.

- [ ] **Step 3: Re-run themes spec.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: All 9 tests PASS (2 index + 4 shipped-row + 3 roadmap-row).

- [ ] **Step 4: Commit.**
  ```bash
  git add src/app/themes/[id]/page.tsx
  git commit -m "phase-2.5: /themes/[id] per-buyer pages with workflow embed"
  ```

### Task 23: Delete `/workflows` page and add 301 redirect

**Files:**
- Delete: `src/app/workflows/page.tsx`
- Modify: `staticwebapp.config.json`
- Modify: `tests/themes.spec.ts`

**Steps:**

- [ ] **Step 1: Add the test first.**
  Append to `tests/themes.spec.ts`:
  ```ts

  test('legacy /workflows redirects to /themes', async ({ page }) => {
    test.skip(SKIP_LOCAL_REDIRECTS, 'requires SWA_BASE_URL — skipped in local next dev')
    const response = await page.goto('/workflows')
    expect(response?.url()).toContain('/themes')
  })
  ```

- [ ] **Step 2: Delete the workflows page file.**
  Run: `rm /Users/terencetsakiris/GitHub/atheryon-website/src/app/workflows/page.tsx`

- [ ] **Step 3: Update `staticwebapp.config.json`.**
  Edit `staticwebapp.config.json`. Find the line `{ "route": "/workflows",   "rewrite": "/workflows.html" },` (around line 28 currently) and REPLACE it with:
  ```json
      { "route": "/workflows",              "redirect": "/themes",      "statusCode": 301 },
      { "route": "/themes",                 "rewrite": "/themes.html" },
      { "route": "/themes/*",               "rewrite": "/themes/[id].html" },
      { "route": "/roadmap",                "rewrite": "/roadmap.html" },
  ```
  Wait — Next.js static export produces files per generated param like `out/themes/middle-office-ops.html`, not `out/themes/[id].html`. The SWA rewrite needs to map `/themes/*` to the actual generated file path. SWA supports `:slug` capture. Use:
  ```json
      { "route": "/workflows",              "redirect": "/themes",      "statusCode": 301 },
      { "route": "/themes",                 "rewrite": "/themes.html" },
      { "route": "/themes/:slug",           "rewrite": "/themes/{slug}.html" },
      { "route": "/roadmap",                "rewrite": "/roadmap.html" },
  ```
  Confirm against SWA routing docs at runtime; if `{slug}` fails, fall back to per-id explicit rewrites for all 7 themes. The repo already uses path-segment rewrites like `/offers/prompts/thanks` → explicit file, so the explicit fallback works:
  ```json
      { "route": "/themes/front-office-trading",     "rewrite": "/themes/front-office-trading.html" },
      { "route": "/themes/middle-office-ops",        "rewrite": "/themes/middle-office-ops.html" },
      { "route": "/themes/compliance-surveillance",  "rewrite": "/themes/compliance-surveillance.html" },
      { "route": "/themes/risk-analytics",           "rewrite": "/themes/risk-analytics.html" },
      { "route": "/themes/treasury",                 "rewrite": "/themes/treasury.html" },
      { "route": "/themes/entity-intelligence",      "rewrite": "/themes/entity-intelligence.html" },
      { "route": "/themes/foundation-ods",           "rewrite": "/themes/foundation-ods.html" },
  ```
  Use the explicit-fallback form (safer; matches the project's existing pattern). Insert below the `/workflows` redirect line. Final block:
  ```json
      { "route": "/workflows",              "redirect": "/themes",      "statusCode": 301 },
      { "route": "/themes",                 "rewrite": "/themes.html" },
      { "route": "/themes/front-office-trading",     "rewrite": "/themes/front-office-trading.html" },
      { "route": "/themes/middle-office-ops",        "rewrite": "/themes/middle-office-ops.html" },
      { "route": "/themes/compliance-surveillance",  "rewrite": "/themes/compliance-surveillance.html" },
      { "route": "/themes/risk-analytics",           "rewrite": "/themes/risk-analytics.html" },
      { "route": "/themes/treasury",                 "rewrite": "/themes/treasury.html" },
      { "route": "/themes/entity-intelligence",      "rewrite": "/themes/entity-intelligence.html" },
      { "route": "/themes/foundation-ods",           "rewrite": "/themes/foundation-ods.html" },
      { "route": "/roadmap",                "rewrite": "/roadmap.html" },
  ```

- [ ] **Step 4: Validate JSON.**
  Run: `node -e "JSON.parse(require('fs').readFileSync('staticwebapp.config.json','utf8'))" && echo OK`
  Expected: `OK`.

- [ ] **Step 5: Build to confirm `/workflows` is gone.**
  Run: `npx next build`
  Expected: PASS. `out/workflows.html` is no longer emitted.

- [ ] **Step 6: Run themes spec — the `/workflows` redirect test is skipped locally (no SWA), other tests still pass.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: PASS (the redirect test is skipped when `SWA_BASE_URL` is unset, matching the offers.spec.ts pattern).

- [ ] **Step 7: Commit.**
  ```bash
  git add src/app/workflows tests/themes.spec.ts staticwebapp.config.json
  git rm -r src/app/workflows
  git commit -m "phase-2.5: delete /workflows page, add 301 to /themes + SWA rewrites for /themes/[id]"
  ```
  (Note: `git rm` already stages the delete; the `git add` of `src/app/workflows` may be redundant but is harmless.)

### Task 24: Write failing test for `/roadmap` aggregator

**Files:**
- Modify: `tests/themes.spec.ts`

**Steps:**

- [ ] **Step 1: Append the roadmap test.**
  Append to `tests/themes.spec.ts`:
  ```ts

  test('/roadmap aggregates BUILDING + ROADMAP items', async ({ page }) => {
    const response = await page.goto('/roadmap')
    expect(response?.status()).toBe(200)

    // Mortgages = BUILDING
    await expect(page.getByRole('heading', { name: 'Mortgages practice', exact: true })).toBeVisible()
    await expect(page.locator('[data-status="building"]').first()).toBeVisible()

    // Roadmap themes
    await expect(page.getByRole('heading', { name: 'Front Office Trading', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Treasury', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Entity Intelligence', exact: true })).toBeVisible()

    // SHIPPED items should NOT appear here (e.g., Middle Office Ops)
    await expect(page.getByRole('heading', { name: 'Middle Office Ops', exact: true })).toHaveCount(0)
  })
  ```

- [ ] **Step 2: Run.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: FAIL — `/roadmap` returns 404.

### Task 25: Create `/roadmap` page

**Files:**
- Create: `src/app/roadmap/page.tsx`

**Steps:**

- [ ] **Step 1: Author the page.**
  ```tsx
  import type { Metadata } from 'next'
  import Link from 'next/link'
  import { buyerThemes } from '@/content/buyerThemes'
  import { v2Mortgages } from '@/content/site'
  import { StatusBadge, type Status } from '@/components/StatusBadge'

  export const metadata: Metadata = {
    title: 'Roadmap — Atheryon',
    description:
      'What Atheryon is building next. Mortgages practice, M&A prose, and four buyer themes in active design or roadmap status.',
    openGraph: {
      title: 'Roadmap — Atheryon',
      description: 'What Atheryon is building next.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Roadmap — Atheryon',
      description: 'What Atheryon is building next.',
    },
    alternates: { canonical: 'https://atheryon.com.au/roadmap' },
  }

  type RoadmapItem = {
    id: string
    name: string
    status: Status
    blurb: string
    href: string
  }

  function aggregate(): RoadmapItem[] {
    const themeItems: RoadmapItem[] = buyerThemes
      .filter((t) => t.status !== 'shipped')
      .map((t) => ({
        id: t.id,
        name: t.name,
        status: t.status,
        blurb: t.speedPitch,
        href: `/themes/${t.id}`,
      }))

    const mortgages: RoadmapItem = {
      id: v2Mortgages.roadmap.id,
      name: v2Mortgages.roadmap.name,
      status: v2Mortgages.roadmap.status,
      blurb: v2Mortgages.roadmap.blurb,
      href: v2Mortgages.roadmap.href,
    }

    // BUILDING first, then ROADMAP, stable within each group.
    return [mortgages, ...themeItems].sort((a, b) => {
      const rank = (s: Status) => (s === 'building' ? 0 : s === 'roadmap' ? 1 : 2)
      return rank(a.status) - rank(b.status)
    })
  }

  export default function RoadmapPage() {
    const items = aggregate()

    return (
      <div className="bg-bone min-h-screen">
        <section className="border-b border-charcoal/15">
          <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
              atheryon / roadmap / whats-next
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
              Roadmap
            </h1>
            <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
              Atheryon ships fast. This is what is BUILDING and what is on the ROADMAP. Every item is an open invitation to co-build.
            </p>
          </div>
        </section>

        <section>
          <ul className="max-w-container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
            {items.map((it) => (
              <li key={it.id} className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-8 md:items-baseline">
                <div className="md:w-32 shrink-0">
                  <StatusBadge status={it.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight mb-2">
                    <Link href={it.href} className="underline-offset-4 hover:underline">
                      {it.name}
                    </Link>
                  </h2>
                  <p className="font-mono text-xs md:text-sm text-charcoal/75 leading-relaxed">{it.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
  ```

- [ ] **Step 2: Build.**
  Run: `npx next build`
  Expected: PASS. New `out/roadmap.html`.

- [ ] **Step 3: Run themes spec.**
  Run: `npx playwright test tests/themes.spec.ts`
  Expected: All tests PASS (including the new `/roadmap` test).

- [ ] **Step 4: Commit.**
  ```bash
  git add src/app/roadmap/page.tsx
  git commit -m "phase-2.5: /roadmap aggregator (Mortgages BUILDING + 3 ROADMAP themes)"
  ```

### Task 26: Update HomeNav — swap WORKFLOWS for THEMES

**Files:**
- Modify: `src/components/home/HomeNav.tsx` (lines 6-11 — the `links` array)
- Modify: `tests/home.spec.ts` (if needed; current test doesn't assert nav links — verify)

**Steps:**

- [ ] **Step 1: Confirm home test does not depend on the WORKFLOWS link.**
  `tests/home.spec.ts` checks `'DATA.'` (fixed in Task 5 to `'CAPITAL MARKETS.'`), heading text, domain cards, offer strip, CTA card. No nav-link assertion. Safe to edit nav.

- [ ] **Step 2: Update the `links` array.**
  Edit `src/components/home/HomeNav.tsx`. Replace lines 6-11:
  ```tsx
  const links = [
    { label: 'SYSTEM', href: '/system' },
    { label: 'WORKFLOWS', href: '/workflows' },
    { label: 'ABOUT', href: '/about' },
    { label: 'OFFERS', href: '/offers' },
  ]
  ```
  with the addendum's `THEMES · OFFERS · SYSTEM` (3 concepts) — About moves to footer-only:
  ```tsx
  const links = [
    { label: 'THEMES', href: '/themes' },
    { label: 'OFFERS', href: '/offers' },
    { label: 'SYSTEM', href: '/system' },
  ]
  ```

- [ ] **Step 3: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 4: Run full Playwright suite.**
  Run: `npx playwright test`
  Expected: All passing.

- [ ] **Step 5: Commit.**
  ```bash
  git add src/components/home/HomeNav.tsx
  git commit -m "phase-2.5: HomeNav swap WORKFLOWS→THEMES (CM nav = THEMES · OFFERS · SYSTEM)"
  ```

### Task 27: Update Footer — add `/roadmap` link

**Files:**
- Modify: `src/content/site.ts` (lines 409-422 — `site.footer.links` block)
- Modify: `src/components/Footer.tsx` (no changes needed — it already maps all link groups)

**Steps:**

- [ ] **Step 1: Update `site.footer.links` to add Roadmap under a `whatsNext` slot AND swap Workflows→Themes under pillars.**
  Edit `src/content/site.ts`. Replace the `footer.links` block (lines 409-422):
  ```ts
    footer: {
      links: {
        pillars: [
          { label: 'System', href: '/system' },
          { label: 'Workflows', href: '/workflows' },
        ],
        resources: [
          { label: 'Labs', href: '/labs' },
        ],
        company: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
  ```
  with:
  ```ts
    footer: {
      links: {
        pillars: [
          { label: 'System', href: '/system' },
          { label: 'Themes', href: '/themes' },
        ],
        whatsNext: [
          { label: 'Roadmap', href: '/roadmap' },
        ],
        resources: [
          { label: 'Labs', href: '/labs' },
        ],
        company: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
  ```

- [ ] **Step 2: Update Footer to render the new group.**
  Edit `src/components/Footer.tsx`. Change line 5:
  ```tsx
    const { pillars, resources, company } = site.footer.links
  ```
  to:
  ```tsx
    const { pillars, whatsNext, resources, company } = site.footer.links
  ```
  And line 14:
  ```tsx
            {[...pillars, ...resources, ...company, ...legalLinks].map((item) => (
  ```
  to:
  ```tsx
            {[...pillars, ...whatsNext, ...resources, ...company, ...legalLinks].map((item) => (
  ```

- [ ] **Step 3: Also update `site.nav` to drop Workflows.**
  Edit `src/content/site.ts` lines 5-12 — replace the `nav` block:
  ```ts
    nav: [
      { label: 'System', href: '/system' },
      { label: 'Approach', href: '/approach' },
      { label: 'Engagements', href: '/engagements' },
      { label: 'Workflows', href: '/workflows' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  ```
  with:
  ```ts
    nav: [
      { label: 'System', href: '/system' },
      { label: 'Themes', href: '/themes' },
      { label: 'Offers', href: '/offers' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  ```

- [ ] **Step 4: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 5: Visit `/` locally (optional) — confirm footer shows Roadmap link.**

- [ ] **Step 6: Commit.**
  ```bash
  git add src/content/site.ts src/components/Footer.tsx
  git commit -m "phase-2.5: footer adds /roadmap; nav + footer.pillars drop /workflows"
  ```

### Task 28: Update sitemap.xml and llms.txt for Phase 2.5

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`

**Steps:**

- [ ] **Step 1: Update sitemap.**
  Edit `public/sitemap.xml`. Remove the `/workflows` line (currently line 8). Add the new routes before `/privacy`:
  ```xml
    <url><loc>https://atheryon.com.au/themes</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
    <url><loc>https://atheryon.com.au/themes/front-office-trading</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/themes/middle-office-ops</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/themes/compliance-surveillance</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/themes/risk-analytics</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/themes/treasury</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/themes/entity-intelligence</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/themes/foundation-ods</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>https://atheryon.com.au/roadmap</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  ```

- [ ] **Step 2: Update llms.txt.**
  Edit `public/llms.txt`. In the Core Domains section, replace the AI Agent Systems URL `https://atheryon.com.au/workflows` with `https://atheryon.com.au/themes`. In the Site map section, remove the `[Workflows]` line and insert before `[Offers]`:
  ```
  - [Themes](https://atheryon.com.au/themes): seven-row CM buyer matrix — desk-head pockets of pain joined to workflows.
  - [Roadmap](https://atheryon.com.au/roadmap): BUILDING + ROADMAP items across themes + practices.
  ```

- [ ] **Step 3: Commit.**
  ```bash
  git add public/sitemap.xml public/llms.txt
  git commit -m "phase-2.5: sitemap + llms.txt reflect /themes + /roadmap; drop /workflows"
  ```

### Task 29: Update `/system §04` anchor targets — `/workflows#xxx` → `/themes/[id]#workflow`

**Files:**
- Modify: `src/content/site.ts` (lines 676, 683, 690, 697 — the `href` values in `v2.pages.system.sections.workflowExamples.items`)

**Steps:**

- [ ] **Step 1: Apply the addendum's anchor remap.**
  Edit `src/content/site.ts`. Per the addendum, `/system §04` anchor targets must change from `/workflows#xxx` to `/themes/[id]#workflow`. Mapping (workflow id → theme id):
  - `trade-lifecycle-automation` → `middle-office-ops`
  - `risk-reporting-generation` → `compliance-surveillance`
  - `portfolio-analytics-pipeline` → `risk-analytics`
  - `financial-data-ingestion-and-structuring` → `foundation-ods`

  Find and replace the four `href` lines in `v2.pages.system.sections.workflowExamples.items`:
  - L676: `href: '/workflows#trade-lifecycle-automation',` → `href: '/themes/middle-office-ops#workflow',`
  - L683: `href: '/workflows#risk-reporting-generation',` → `href: '/themes/compliance-surveillance#workflow',`
  - L690: `href: '/workflows#portfolio-analytics-pipeline',` → `href: '/themes/risk-analytics#workflow',`
  - L697: `href: '/workflows#financial-data-ingestion-and-structuring',` → `href: '/themes/foundation-ods#workflow',`

- [ ] **Step 2: Also update `site.pages.themes.cards` AI Agent Systems link.**
  Search `src/content/site.ts` for `'/workflows'` — there is also a reference at line 549 inside the capabilityOverview cards:
  ```ts
              { name: 'AI Agent Systems', qualifier: '', href: '/workflows' },
  ```
  Change to:
  ```ts
              { name: 'AI Agent Systems', qualifier: '', href: '/themes' },
  ```
  And the `cardMeta['ai-agent-systems'].href` in `src/components/home/BuiltForGrid.tsx` line 31 — change `href: '/workflows'` to `href: '/themes'`.

- [ ] **Step 3: Search for any remaining `/workflows` strings in the source tree.**
  Run: `grep -rn "/workflows" src/ public/ staticwebapp.config.json`
  Expected: Only the `/workflows → /themes` 301 line in staticwebapp.config.json should remain. If any other live links remain, update them in this task.

- [ ] **Step 4: Build.**
  Run: `npx next build`
  Expected: PASS.

- [ ] **Step 5: Commit.**
  ```bash
  git add src/content/site.ts src/components/home/BuiltForGrid.tsx
  git commit -m "phase-2.5: remap /workflows#xxx anchors → /themes/[id]#workflow"
  ```

### Task 30: Phase 2.5 verification

**Files:** (no edits)

**Steps:**

- [ ] **Step 1: Build clean.**
  Run: `npx next build`
  Expected: PASS. Output should include: `out/themes.html`, `out/themes/{7 files}.html`, `out/roadmap.html`, `out/mortgages.html`. NO `out/workflows.html`.

- [ ] **Step 2: Run full Playwright suite.**
  Run: `npx playwright test`
  Expected: All passing — home, offers, practice-toggle, themes.

- [ ] **Step 3: Production-ready check.**
  Run: `npm run verify:production-ready`
  Expected: clean.

- [ ] **Step 4: Manual smoke — open `/`, `/themes`, `/themes/middle-office-ops`, `/themes/treasury`, `/roadmap`, `/mortgages`. Verify the toggle flips `data-mode` on each, the StatusBadge renders correctly, and the workflow embed appears on shipped rows but a ROADMAP marker appears on roadmap rows.**

- [ ] **Step 5: Phase 2.5 done. Ready to open the PR.**

---

## Out of Scope (Documented)

- Phase 3 (M&A IA scaffolding `/ma`, `/ma/system`, `/ma/offers`) — separate plan.
- Phase 4 (M&A prose) — separate plan.
- Phase 5 (FOUC mitigation) — only if visually disruptive.
- Updating `v2.pages.workflows` content itself (kept as data source for `/themes/[id]` embeds — the route is gone but the items survive).

## Verification Summary

After all 30 tasks:

1. `npx next build` — PASS, no TS errors, no ESLint errors
2. `npx playwright test` — full suite green (`home`, `offers`, `practice-toggle`, `themes`)
3. `npm run verify:production-ready` — no `REPLACE_ME` strings
4. Manual: toggle flips `data-mode` across CM/Mortgages; M&A toggle 301s to `/` (Phase 3 fills in)
5. CM pages (`/`, `/system`, `/themes`, `/themes/[id]`, `/offers`, `/about`, `/contact`, `/labs`, `/roadmap`) look pixel-identical to pre-refactor for active-accent surfaces (default `--mode-accent` = blue)
6. Legacy `/workflows` returns 301 to `/themes` (on deployed SWA)
