# M&A Practice (Phase 3 + 4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the M&A practice site — `/ma`, `/ma/approach`, `/ma/offers` — with all v2-voice prose pre-written, replacing the temporary `/ma → /` placeholder from Plan A.

**Architecture:** Three static pages under `/ma/*` read content from a new `v2Ma` export in `src/content/site.ts`. The `/ma/system` route name from Plan A's addendum is renamed to `/ma/approach` (M&A is consulting practice, not a platform). `/ma/offers` shows a single "Embedded Execution Specialists" card — M&A is sold consulting-only, distinct from CM's three-offer model. SWA config replaces placeholder 301s with real rewrites. The M&A practice is led by Anna Contos.

**Tech Stack:** Next.js 15.5.18 static export, React 18, TypeScript strict, Tailwind, Playwright (chromium-only).

---

## Design Decisions (from brainstorm)

**Scope:** M&A practice is **post-deal execution** + **pre-sign execution review**, NOT M&A advisory. Atheryon does not price deals, find partners, or negotiate terms.

**Positioning:** Consulting practice, not platform. "Senior M&A execution **specialists**" (not "architects" — register choice; CM keeps "architects"). AI agents are tools, not a product.

**80/20 framing:** 80% post-sign delivery (separation, integration, TSA reduction, Day-1 readiness). 20% pre-sign execution review (the wedge — "talk to us before signing").

**Offer model:** Embedded consultants only. No licensed platform. No prompts archive standalone. `/ma/offers` shows one card explaining this.

**Practice lead:** Anna Contos. Bio drafted from LinkedIn screenshots provided during brainstorming (Westpac Head of S&I 2023–2025, CBA Head of Divestment Execution 2018–2020, Count Financial divestment, CommInsure sale, 25+ years).

**Route rename:** `/ma/system` (from Plan A addendum) → `/ma/approach` (signals consulting framing, not "system"). SWA defensively redirects `/ma/system → /ma/approach`.

**Toggle accent:** `[data-mode="ma"]` stays blue (Plan A Phase 1 default). M&A toggle pill is already blue per `PracticeToggle.tsx`.

**Status:** M&A ships as `shipped` (not `building`) since prose is pre-written. M&A drops from `/roadmap` aggregator naturally (`/roadmap` filters `status !== 'shipped'`).

**Workflows on `/ma/approach §03`:** Three workflows (trimmed from CM's five) — Pre-Sign Execution Review (the wedge), Separation/Integration Planning (the spine), TSA Tracking & Reduction (the exit).

**Partners cited on `/ma/approach §02`:** S&P Global (data continuity), Microsoft Azure (runtime). Mirrors existing CM partner mentions.

---

## File Structure

### Created

| Path | Responsibility |
|------|---------------|
| `src/app/ma/page.tsx` | `/ma` home page. Renders `v2Ma.home.sections` (hero, thesis, triggers, execution, outcomes, CTA). |
| `src/app/ma/approach/page.tsx` | `/ma/approach` page. Renders `v2Ma.approach.sections` (5 sections: approach, dataSpecialist, workflowExamples, embeddedDelivery, seniorSpecialist). |
| `src/app/ma/offers/page.tsx` | `/ma/offers` page. Renders `v2Ma.offers.sections` (1 offer card + explanatory note about Code/Prompts being CM-only). |
| `tests/ma-practice.spec.ts` | Playwright tests covering route 200s, `data-mode='ma'` flip, content presence, toggle interaction, legacy redirects. |

### Modified

| Path | Change |
|------|--------|
| `src/content/site.ts` | Add `v2Ma` export below existing `v2Mortgages` export. Full prose embedded. ~250 lines of new content. |
| `staticwebapp.config.json` | Remove temporary `{ route: /ma, redirect: / }` and `{ route: /ma/*, redirect: / }` 301s from Plan A Task 14. Add `/ma → /ma.html`, `/ma/approach → /ma/approach.html`, `/ma/offers → /ma/offers.html` rewrites. Add defensive `/ma/system → /ma/approach` and `/ma/workflows → /ma/approach` 301s. |
| `public/sitemap.xml` | Add `/ma`, `/ma/approach`, `/ma/offers` URLs. |
| `public/llms.txt` | Reflect M&A practice — add lines for the 3 new routes. |

### Not modified (verified expected to work as-is)

- `src/components/PracticeToggle.tsx` — Already routes M&A pill to `/ma`. No change needed.
- `src/components/ModeSetter.tsx` — Already handles `/ma` and `/ma/*` paths. No change needed.
- `src/app/globals.css` — `[data-mode="ma"]` already defined in Plan A Task 1 (currently blue). No change.
- `src/app/roadmap/page.tsx` — Already filters `status !== 'shipped'`; M&A as `shipped` drops automatically.

---

## Tasks

### Task 1: Add `v2Ma.home` content to `site.ts`

**Files:**
- Modify: `src/content/site.ts` (append below `v2Mortgages` export — find `export const v2Mortgages = { ... } as const` block and add `v2Ma` after it, before `export type V2Mortgages`)

**Steps:**

- [ ] **Step 1: Locate insertion point.**

Run: `grep -n "export type V2Mortgages" src/content/site.ts`

Note the line number. The new `v2Ma` block goes BEFORE this `export type` declaration (after the `v2Mortgages = { ... } as const` closing).

- [ ] **Step 2: Insert `v2Ma.home` block.**

Use the `Edit` tool. Find the line `export type V2Mortgages = typeof v2Mortgages` and replace it with:

```ts
// =============================================================================
// v2Ma — M&A practice (2026-05-17)
// =============================================================================
// M&A practice is post-deal execution + pre-sign execution review. NOT M&A
// advisory (no deal sourcing/valuation/negotiation). Consulting practice, not
// platform. Led by Anna Contos. Status: shipped (full prose pre-written).
// =============================================================================

export const v2Ma = {
  home: {
    route: '/ma',
    title: 'M&A — Atheryon',
    description:
      'M&A success is determined before the deal is signed. Senior execution specialists pre-sign and post-sign. AI agents accelerating dependency mapping, control tracing, TSA tracking — Day-1 readiness in weeks, not quarters.',
    status: 'shipped' as const,
    sections: {
      hero: {
        label: 'atheryon / m-and-a / execution',
        title: 'M&A Execution',
        subtitle: 'M&A success is determined before the deal is signed.',
      },
      thesis: {
        label: '§01 / Thesis',
        title: 'Talk to us before signing',
        body:
          'M&A success is determined before the deal is signed. The clauses you agree shape what is and isn’t executable on Day-1 — and most of the operational, data, and regulatory traps in an M&A deal are visible at the term-sheet stage to a specialist who has run separations and integrations through to completion. Most firms don’t have this voice in the pre-sign room. We are that voice.\n\nPre-sign execution advice is the leverage. Delivery execution is the substance — the eighty percent of our practice. Once the deal lands, we drive the separation/integration plan as senior specialists in the delivery seat: reading the perimeter, sequencing the waves, mapping the controls, tracking the TSAs to clean exit. AI agents accelerate the dependency mapping, control tracing, and TSA tracking that traditionally consume the most analyst hours. Senior specialists set direction; agents do the volume work.\n\nDay-1 readiness in weeks. Clean exit to target operating model. Regulatory continuity preserved. Value realised post-sign, not eroded.\n\nThis is execution-specialist work, not deal advisory. We don’t price the deal, find the partner, or negotiate the terms — bankers and lawyers own that. We tell you what’s executable. Then we deliver.',
      },
      triggers: {
        label: '§02 / When clients call us',
        title: 'Triggers for engagement',
        items: [
          {
            id: 'pre-sign-negotiation',
            name: 'Late-stage deal negotiation — the highest-leverage moment to engage us',
            body:
              'Draft terms are forming. The execution implications need a specialist read before signing. Most clients don’t engage us here; this is the single most valuable moment to.',
          },
          {
            id: 'transaction-delivery',
            name: 'High-stakes transaction delivery — the most common engagement',
            body:
              'Deal is signed; integration or separation is underway. Specialist execution leadership in the delivery seat. AI-velocity on dependency mapping, control tracing, TSA tracking.',
          },
          {
            id: 'capability-gaps',
            name: 'Execution capability gaps',
            body:
              'Internal team is competent but stretched. We embed senior specialists alongside, with agent acceleration on the analytical work.',
          },
          {
            id: 'planning-deficits',
            name: 'Pre-deal planning deficits',
            body:
              'Day-1 plan is thin; carve-out perimeter unclear; control continuity undefined. We rebuild it fast, then drive the delivery.',
          },
          {
            id: 'data-migration-risk',
            name: 'Data migration risk in M&A',
            body:
              'Data is the dependency layer. Mapping, lineage, separation strategy. See /ma/approach §02.',
          },
        ],
      },
      execution: {
        label: '§03 / How we execute',
        title: 'Six capabilities',
        items: [
          'Pre-sign execution review (the wedge)',
          'Separation/integration plan tied to deal outcomes',
          'Day-1 requirements and transition operating model',
          'Critical data, reporting, and control dependencies mapped',
          'Separation/integration waves executed with clear contracts',
          'TSA scope reduced; clean exit to target state',
        ],
      },
      outcomes: {
        label: '§04 / What we deliver',
        title: 'Outcomes',
        items: [
          'Pre-sign execution clarity — sign with the traps already in your register',
          'Clean separation/integration delivered to timeline',
          'Reduced TSA cost and duration',
          'Lower operational disruption and delivery risk',
          'Regulatory continuity across reporting and controls',
          'Value realised post-sign, not eroded',
        ],
      },
      cta: {
        label: 'Book an M&A execution review',
        href: '/contact?topic=ma-execution',
        supportingLine: 'Pre-sign or post-sign. Senior specialist on call.',
      },
    },
  },
  // approach + offers blocks added in Tasks 4 and 7
} as const

export type V2Ma = typeof v2Ma

export type V2Mortgages = typeof v2Mortgages
```

Note: the existing `export type V2Mortgages = typeof v2Mortgages` line is preserved at the end of the replacement (last line of the code block above). The new `export type V2Ma` is added immediately before it. The `Edit` tool's `old_string` should match just the literal `export type V2Mortgages = typeof v2Mortgages` line; the `new_string` is the full code block above (which ends with that same line).

- [ ] **Step 3: Build to typecheck.**

Run: `npx next build`

Expected: PASS. The `v2Ma` object should be partially-defined (only `home`); the `approach` and `offers` blocks will be added by Tasks 4 and 7. Since no consumer of `v2Ma.approach` or `v2Ma.offers` exists yet, the build should succeed.

If TypeScript complains that `v2Ma` is missing properties referenced elsewhere, STOP and surface — Task 1 is meant to be additive only.

- [ ] **Step 4: Commit.**

```bash
git add src/content/site.ts
git commit -m "phase-3+4: v2Ma.home — M&A practice landing content"
```

---

### Task 2: Write failing test for `/ma` route

**Files:**
- Create: `tests/ma-practice.spec.ts`

**Steps:**

- [ ] **Step 1: Author the test file.**

Create `tests/ma-practice.spec.ts` with:

```ts
import { test, expect } from '@playwright/test'

const SKIP_LOCAL_REDIRECTS = !process.env.SWA_BASE_URL

test('/ma route 200 + sets data-mode="ma" on <html>', async ({ page }) => {
  const response = await page.goto('/ma')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma renders M&A Execution heading + thesis lead', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('heading', { level: 1, name: 'M&A Execution' })).toBeVisible()
  await expect(page.getByText('M&A success is determined before the deal is signed', { exact: false })).toBeVisible()
})

test('/ma renders pre-sign trigger as #1', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByText('Late-stage deal negotiation', { exact: false })).toBeVisible()
})

test('/ma renders all 6 outcomes', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByText('Pre-sign execution clarity', { exact: false })).toBeVisible()
  await expect(page.getByText('Clean separation/integration delivered to timeline', { exact: false })).toBeVisible()
  await expect(page.getByText('Reduced TSA cost and duration', { exact: false })).toBeVisible()
  await expect(page.getByText('Value realised post-sign, not eroded', { exact: false })).toBeVisible()
})

test('/ma renders CTA with pre-sign-or-post-sign supporting line', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('link', { name: 'Book an M&A execution review' })).toBeVisible()
  await expect(page.getByText('Pre-sign or post-sign', { exact: false })).toBeVisible()
})
```

- [ ] **Step 2: Run; expect FAIL.**

Run: `npx playwright test tests/ma-practice.spec.ts --project=chromium`

Expected: All 5 tests FAIL — `/ma` currently returns 200 because SWA temporarily 301-redirects `/ma → /`, so `data-mode` becomes `cm`, and the homepage doesn't have the "M&A Execution" heading. The redirect to `/` means tests 2-5 fail on missing content.

- [ ] **Step 3: Commit failing test.**

```bash
git add tests/ma-practice.spec.ts
git commit -m "phase-3+4: failing tests for /ma route (TDD)"
```

---

### Task 3: Create `/ma` page (TDD green)

**Files:**
- Create: `src/app/ma/page.tsx`

**Steps:**

- [ ] **Step 1: Create the page.**

Create `src/app/ma/page.tsx` with:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Ma } from '@/content/site'

const page = v2Ma.home
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/ma' },
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

export default function MaHomePage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Hero */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.subtitle}
          </p>
        </div>
      </section>

      {/* §01 Thesis */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.thesis.label} title={s.thesis.title} />
          <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4">
            {s.thesis.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Triggers */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.triggers.label} title={s.triggers.title} />
          <ol className="grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
            {s.triggers.items.map((it, i) => (
              <li key={it.id} className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-8 md:items-baseline">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 md:w-12 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-charcoal tracking-tight mb-2">
                    {it.name}
                  </h3>
                  <p className="text-sm md:text-base text-charcoal/80 leading-relaxed">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §03 Execution capabilities */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.execution.label} title={s.execution.title} />
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
            {s.execution.items.map((it, i) => (
              <li key={i} className="border border-charcoal/30 bg-white p-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-charcoal/85 leading-relaxed">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §04 Outcomes */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.outcomes.label} title={s.outcomes.title} />
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
            {s.outcomes.items.map((it, i) => (
              <li key={i} className="border border-charcoal/30 bg-white p-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-charcoal/85 leading-relaxed">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* End-of-document CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / end-of-document
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <Link
              href={s.cta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              {s.cta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <p className="font-mono text-xs text-charcoal/60 italic">
              {s.cta.supportingLine}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Update SWA config to allow `/ma` to render (drop the temporary 301).**

This is needed BEFORE the test will pass — currently SWA returns 301 redirect, so the page never renders.

Edit `staticwebapp.config.json`. Find and DELETE these two lines (added by Plan A Task 14):

```json
{ "route": "/ma",                     "redirect": "/",            "statusCode": 301 },
{ "route": "/ma/*",                   "redirect": "/",            "statusCode": 301 },
```

Replace with (in the rewrites block, near `/mortgages`):

```json
{ "route": "/ma",                     "rewrite": "/ma.html" },
```

(The `/ma/approach` and `/ma/offers` rewrites are added in Tasks 6 and 9. For now `/ma` rewrite is sufficient to make Task 3's tests pass.)

Validate JSON:
```bash
node -e "JSON.parse(require('fs').readFileSync('staticwebapp.config.json','utf8'))" && echo OK
```

Expected: `OK`.

- [ ] **Step 3: Build.**

Run: `npx next build`

Expected: PASS. `out/ma.html` is generated. New route `/ma` appears in the build output table.

- [ ] **Step 4: Run tests.**

Run: `npx playwright test tests/ma-practice.spec.ts --project=chromium`

Expected: 5 PASS — TDD-green moment. The `data-mode` flip test passes because `ModeSetter` already handles `/ma`. Content tests pass because the page renders all sections.

- [ ] **Step 5: Commit.**

```bash
git add src/app/ma/page.tsx staticwebapp.config.json
git commit -m "phase-3+4: /ma home page (M&A Execution landing) + drop /ma placeholder 301"
```

---

### Task 4: Add `v2Ma.approach` content to `site.ts`

**Files:**
- Modify: `src/content/site.ts` (extend the existing `v2Ma` object — add `approach` key after `home`)

**Steps:**

- [ ] **Step 1: Insert `v2Ma.approach` block.**

Edit `src/content/site.ts`. Find this comment placeholder inside the `v2Ma` object:

```ts
  // approach + offers blocks added in Tasks 4 and 7
```

Replace with the `approach` key (and leave a placeholder for `offers`):

```ts
  approach: {
    route: '/ma/approach',
    title: 'M&A Approach — Atheryon',
    description:
      'How Atheryon delivers M&A execution. Senior consulting practice, AI data specialist work with S&P Global and Microsoft Azure, three M&A workflows, embedded delivery, led by Anna Contos.',
    sections: {
      hero: {
        label: 'atheryon / m-and-a / approach',
        title: 'M&A Approach',
        subtitle: 'How we deliver. Senior specialists, AI velocity, embedded.',
      },
      approach: {
        label: '§01 / Approach',
        title: 'Consulting practice, not a platform',
        body:
          'M&A execution is consulting work. Senior specialists in the term-sheet review room before signing, then senior specialists in the delivery seat from Day-1 through TSA exit. AI agents are tools we use to compress the analytical volume work — not a platform you license. The value is the specialist who reads the deal, sets direction, and owns the outcome. Atheryon does not sell M&A software. We sell senior execution capacity, augmented with AI velocity.\n\nThree lifecycle stages: pre-sign (term-sheet review for execution traps), Day-1/Day-2 readiness, and TSA exit. We are in those rooms. The eighty percent of our practice is post-sign delivery; the wedge is the pre-sign conversation that prevents the worst traps from being signed in.',
      },
      dataSpecialist: {
        label: '§02 / AI Data Specialist Work',
        title: 'Partners: S&P Global, Microsoft Azure',
        body:
          'Data is the dependency layer in any M&A deal. Carve-out perimeters are defined in legal entities; the operating reality is defined in data flows. Atheryon brings AI data specialist capability to the deal-execution data work: separation lineage, migration sequencing, regulatory continuity mapping, control re-anchoring.\n\nWe work with S&P Global for market and reference data continuity across the separation boundary, and on Microsoft Azure as the runtime for the AI agent work that traces dependencies, projects migration windows, and flags meaning-loss risks before they reach the wave plan. The same partner stack that runs Atheryon’s capital-markets practice runs the M&A data work — shared infrastructure, shared directorial archive, M&A-specific agent topology.',
      },
      workflowExamples: {
        label: '§03 / Workflow Examples',
        title: 'Three M&A workflows — pre-sign + delivery',
        intro:
          'Each workflow follows our standard pipeline — Input → AI agents → Processing → Output — adapted for M&A execution data and decisions. One is pre-sign execution review; two cover the spine and exit of post-sign delivery.',
        stages: ['Input', 'AI agents', 'Processing', 'Output'] as const,
        items: [
          {
            id: 'pre-sign-execution-review',
            label: '§3a',
            name: 'Pre-Sign Execution Review',
            input:
              'Draft deal terms, target perimeter definitions, data flow inventories, existing control map.',
            agents:
              'Clause-to-execution-risk mapping; TSA scope projection; control-continuity scoring.',
            processing:
              'Traps register → mitigations register → risk-weighted recommendation.',
            output:
              'Pre-sign execution risk report + mitigations playbook. Delivered before ink.',
          },
          {
            id: 'separation-integration-planning',
            label: '§3b',
            name: 'Separation/Integration Planning',
            input:
              'Signed deal terms, perimeter definitions, target operating model.',
            agents:
              'Dependency tracing; wave-window sequencing; Day-1 requirements derivation; data lineage mapping.',
            processing:
              'Dependency graph → wave plan → Day-1 readiness checklist → data migration sequence.',
            output:
              'Separation/integration plan with contractual wave commitments, Day-1 readiness pack, data migration plan with field-level lineage.',
          },
          {
            id: 'tsa-tracking-reduction',
            label: '§3c',
            name: 'TSA Tracking & Reduction',
            input:
              'TSA scope, time-boxed obligations, exit criteria, ongoing delivery status.',
            agents:
              'TSA dependency analysis; exit-criteria projection; scope-creep detection; control assurance verification.',
            processing:
              'TSA register → reduction roadmap → exit scenarios → executive surface.',
            output:
              'TSA exit plan with milestone gates and scope-creep alarms; delivery dashboard with audit trail to closure.',
          },
        ],
      },
      embeddedDelivery: {
        label: '§04 / Embedded Delivery',
        title: 'Senior specialist + AI agents, embedded',
        body:
          'Atheryon deploys M&A as embedded execution specialists. Senior specialists alongside your in-house team — pre-sign if you bring us in early, then continuous through Day-1, Day-2, and TSA exit. Typical engagement: 6–18 months from term sheet to clean exit. AI agents run on Atheryon infrastructure; outputs surface in your team’s tools.\n\nAzure-native. Azure OpenAI as the agent runtime. APRA CPS 234-aligned operational-controls baseline. Auditable directorial archive — every agent decision is replayable.\n\nNot a licensed platform. Not a marketplace product. Embedded consulting with AI velocity, delivered by people you can call.',
      },
      seniorSpecialist: {
        label: '§05 / Senior Specialist',
        title: 'Led by Anna Contos',
        body:
          'Atheryon’s M&A practice is led by Anna Contos — 25+ years in financial-services execution across Australia, the UK, and the US, with the recent two decades focused on M&A separations, integrations, divestments, and large-scale transformation.\n\nMost recently Head of Separation and Integration Advisory at Westpac Group (2023–2025), executive-leading separation and integration programs across Westpac’s divestment and acquisition initiatives. Prior: Head of Divestment Execution at Commonwealth Bank for the Wealth division (2018–2020), running the portfolio of finance programs that delivered CBA’s Count Financial divestment and the CommInsure sale. Earlier: Take to Market Lead for the BT Panorama platform launches; business consulting and strategy roles at Deutsche Bank, Deutsche Pfandbriefbank, Credit Suisse, and Capco across investment banking, wealth, and retail.\n\nTrack record across the deal lifecycle: separation/integration strategy, planning, commercial structuring, business readiness, execution, and stabilisation. Carve-outs, demergers, end-to-end transition management — in highly regulated, politically sensitive environments.\n\nThe M&A practice is structured around her as senior specialist. AI agents do the volume work; Anna sets direction and owns the outcome.',
      },
      cta: {
        label: 'Book an M&A execution review',
        href: '/contact?topic=ma-execution',
      },
    },
  },
  // offers block added in Task 7
```

- [ ] **Step 2: Build to typecheck.**

Run: `npx next build`

Expected: PASS.

- [ ] **Step 3: Commit.**

```bash
git add src/content/site.ts
git commit -m "phase-3+4: v2Ma.approach — 5 sections including Anna Contos bio"
```

---

### Task 5: Write failing test for `/ma/approach`

**Files:**
- Modify: `tests/ma-practice.spec.ts` (append)

**Steps:**

- [ ] **Step 1: Append tests for `/ma/approach`.**

Append to `tests/ma-practice.spec.ts`:

```ts

test('/ma/approach route 200 + sets data-mode="ma"', async ({ page }) => {
  const response = await page.goto('/ma/approach')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma/approach renders all 5 sections (§01–§05)', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('§01 / Approach', { exact: false })).toBeVisible()
  await expect(page.getByText('§02 / AI Data Specialist Work', { exact: false })).toBeVisible()
  await expect(page.getByText('§03 / Workflow Examples', { exact: false })).toBeVisible()
  await expect(page.getByText('§04 / Embedded Delivery', { exact: false })).toBeVisible()
  await expect(page.getByText('§05 / Senior Specialist', { exact: false })).toBeVisible()
})

test('/ma/approach mentions S&P Global and Microsoft Azure', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('S&P Global', { exact: false })).toBeVisible()
  await expect(page.getByText('Microsoft Azure', { exact: false })).toBeVisible()
})

test('/ma/approach renders Anna Contos bio', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('Anna Contos', { exact: false })).toBeVisible()
  await expect(page.getByText('Head of Separation and Integration Advisory at Westpac', { exact: false })).toBeVisible()
})

test('/ma/approach renders 3 workflow examples (pre-sign + 2 delivery)', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('Pre-Sign Execution Review', { exact: false })).toBeVisible()
  await expect(page.getByText('Separation/Integration Planning', { exact: false })).toBeVisible()
  await expect(page.getByText('TSA Tracking & Reduction', { exact: false })).toBeVisible()
})
```

- [ ] **Step 2: Run; expect FAIL.**

Run: `npx playwright test tests/ma-practice.spec.ts --project=chromium`

Expected: 5 new tests FAIL — `/ma/approach` returns 404 (route doesn't exist yet, no SWA rewrite).

- [ ] **Step 3: Commit failing tests.**

```bash
git add tests/ma-practice.spec.ts
git commit -m "phase-3+4: failing tests for /ma/approach (TDD)"
```

---

### Task 6: Create `/ma/approach` page (TDD green)

**Files:**
- Create: `src/app/ma/approach/page.tsx`
- Modify: `staticwebapp.config.json` (add `/ma/approach` rewrite)

**Steps:**

- [ ] **Step 1: Create the page.**

Create `src/app/ma/approach/page.tsx` with:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Ma } from '@/content/site'

const page = v2Ma.approach
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/ma/approach' },
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

function ProseSection({ section }: { section: { label: string; title: string; body: string } }) {
  return (
    <section className="border-b border-charcoal/15">
      <div className="max-w-container mx-auto px-6 py-16 md:py-20">
        <SectionHead label={section.label} title={section.title} />
        <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4">
          {section.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MaApproachPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Hero */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.subtitle}
          </p>
        </div>
      </section>

      {/* §01 Approach (prose) */}
      <ProseSection section={s.approach} />

      {/* §02 AI Data Specialist Work (prose, partners) */}
      <ProseSection section={s.dataSpecialist} />

      {/* §03 Workflow Examples (3 workflows with Input/Agents/Processing/Output cards) */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.workflowExamples.label} title={s.workflowExamples.title} />
          <p className="font-mono text-sm text-charcoal/75 leading-relaxed max-w-3xl mb-8">
            {s.workflowExamples.intro}
          </p>
          <div className="space-y-12">
            {s.workflowExamples.items.map((wf) => (
              <article key={wf.id} id={wf.id} className="scroll-mt-24">
                <header className="mb-4 flex items-baseline gap-4">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
                    {wf.label}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight">
                    {wf.name}
                  </h3>
                </header>
                <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(
                    [
                      ['Input', wf.input],
                      ['AI agents', wf.agents],
                      ['Processing', wf.processing],
                      ['Output', wf.output],
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §04 Embedded Delivery (prose) */}
      <ProseSection section={s.embeddedDelivery} />

      {/* §05 Senior Specialist — Anna Contos (prose) */}
      <ProseSection section={s.seniorSpecialist} />

      {/* End-of-document CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / approach / end-of-document
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

- [ ] **Step 2: Add SWA rewrite.**

Edit `staticwebapp.config.json`. In the rewrites block (near the existing `/ma` rewrite from Task 3), add:

```json
{ "route": "/ma/approach",            "rewrite": "/ma/approach.html" },
```

Validate JSON.

- [ ] **Step 3: Build.**

Run: `npx next build`

Expected: PASS. New static page at `out/ma/approach.html`.

- [ ] **Step 4: Run tests.**

Run: `npx playwright test tests/ma-practice.spec.ts --project=chromium`

Expected: All 10 tests PASS (5 existing + 5 new for `/ma/approach`).

- [ ] **Step 5: Commit.**

```bash
git add src/app/ma/approach/page.tsx staticwebapp.config.json
git commit -m "phase-3+4: /ma/approach page (5 sections + 3 workflows + Anna Contos bio)"
```

---

### Task 7: Add `v2Ma.offers` content to `site.ts`

**Files:**
- Modify: `src/content/site.ts` (extend `v2Ma` with `offers` key)

**Steps:**

- [ ] **Step 1: Insert `v2Ma.offers` block.**

Edit `src/content/site.ts`. Find the placeholder comment:

```ts
  // offers block added in Task 7
```

Replace with:

```ts
  offers: {
    route: '/ma/offers',
    title: 'M&A Offers — Atheryon',
    description:
      'How to engage Atheryon’s M&A practice. One way: embedded execution specialists. Pre-sign through post-sign, led by Anna Contos.',
    sections: {
      hero: {
        label: 'atheryon / m-and-a / offers',
        title: 'How to engage the M&A practice',
        subtitle: 'One way to engage. Embedded consulting.',
      },
      offer: {
        label: '§01 / The offer',
        title: 'Embedded Execution Specialists',
        body:
          'Atheryon’s M&A practice is sold one way: embedded execution specialists alongside your in-house team — pre-sign if you bring us in early, then continuous through Day-1, Day-2, and TSA exit.\n\nSenior specialists set direction. AI agents do the volume work. Outputs surface where your team can use them. Azure-native infrastructure. APRA CPS 234-aligned operational-controls baseline. Auditable directorial archive.\n\nAnna Contos leads the practice. Typical engagement: 6–18 months from term sheet to clean TSA exit. Pre-sign sprints possible as a stand-alone wedge or a precursor to full delivery.',
        outcomeListIntro:
          'What we deliver:',
        outcomes: [
          'Pre-sign execution clarity — sign with the traps already in your register',
          'Clean separation/integration delivered to timeline',
          'Reduced TSA cost and duration',
          'Lower operational disruption and delivery risk',
          'Regulatory continuity across reporting and controls',
          'Value realised post-sign, not eroded',
        ],
        cta: {
          label: 'Book an M&A execution review',
          href: '/contact?topic=ma-execution',
        },
      },
      codeAndPrompts: {
        label: '§02 / Code and Prompts',
        title: 'Not offered for M&A',
        body:
          'Atheryon’s capital-markets practice offers two productised paths alongside Consult: license the code (the deployable banking reference implementation) or license the prompts (the directorial archive — methodology IP transfer). See /offers for both.\n\nFor M&A, the value is the senior specialist plus AI velocity, both inside the same embedded engagement. We do not productise M&A separately. The practice is sold as consulting, not as code or methodology IP.',
        cmOffersLink: {
          label: 'See capital-markets offers →',
          href: '/offers',
        },
      },
    },
  },
```

- [ ] **Step 2: Build to typecheck.**

Run: `npx next build`

Expected: PASS.

- [ ] **Step 3: Commit.**

```bash
git add src/content/site.ts
git commit -m "phase-3+4: v2Ma.offers — single Embedded Specialists card + Code/Prompts explanation"
```

---

### Task 8: Write failing test for `/ma/offers`

**Files:**
- Modify: `tests/ma-practice.spec.ts` (append)

**Steps:**

- [ ] **Step 1: Append tests for `/ma/offers`.**

Append to `tests/ma-practice.spec.ts`:

```ts

test('/ma/offers route 200 + sets data-mode="ma"', async ({ page }) => {
  const response = await page.goto('/ma/offers')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma/offers renders single Embedded Execution Specialists offer card', async ({ page }) => {
  await page.goto('/ma/offers')
  await expect(page.getByRole('heading', { name: 'Embedded Execution Specialists', exact: true })).toBeVisible()
  await expect(page.getByText('Anna Contos leads the practice', { exact: false })).toBeVisible()
})

test('/ma/offers explains Code and Prompts are CM-only', async ({ page }) => {
  await page.goto('/ma/offers')
  await expect(page.getByText('Not offered for M&A', { exact: false })).toBeVisible()
  await expect(page.getByText('We do not productise M&A separately', { exact: false })).toBeVisible()
  await expect(page.getByRole('link', { name: /See capital-markets offers/ })).toBeVisible()
})

test('Clicking M&A pill in toggle navigates to /ma (no longer 301 to /)', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'M&A.' }).click()
  await page.waitForURL('**/ma')
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})
```

- [ ] **Step 2: Run; expect 3 new tests FAIL, 1 pass.**

Run: `npx playwright test tests/ma-practice.spec.ts --project=chromium`

Expected: 3 of the 4 new tests FAIL (`/ma/offers` is 404). The toggle test passes because `/ma` is now a real route (Task 3) and `data-mode='ma'` flips correctly.

- [ ] **Step 3: Commit failing tests.**

```bash
git add tests/ma-practice.spec.ts
git commit -m "phase-3+4: failing tests for /ma/offers + toggle interaction (TDD)"
```

---

### Task 9: Create `/ma/offers` page (TDD green)

**Files:**
- Create: `src/app/ma/offers/page.tsx`
- Modify: `staticwebapp.config.json` (add `/ma/offers` rewrite + defensive `/ma/system → /ma/approach` and `/ma/workflows → /ma/approach` 301s)

**Steps:**

- [ ] **Step 1: Create the page.**

Create `src/app/ma/offers/page.tsx` with:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Ma } from '@/content/site'

const page = v2Ma.offers
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/ma/offers' },
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

export default function MaOffersPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Hero */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.subtitle}
          </p>
        </div>
      </section>

      {/* §01 The offer — Embedded Execution Specialists */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.offer.label} title={s.offer.title} />
          <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4 mb-10">
            {s.offer.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-4">
            {s.offer.outcomeListIntro}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mb-10">
            {s.offer.outcomes.map((it, i) => (
              <li key={i} className="border border-charcoal/30 bg-white p-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-charcoal/85 leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
          <Link
            href={s.offer.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {s.offer.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* §02 Code and Prompts — not offered for M&A */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.codeAndPrompts.label} title={s.codeAndPrompts.title} />
          <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4 mb-6">
            {s.codeAndPrompts.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Link
            href={s.codeAndPrompts.cmOffersLink.href}
            className="font-mono text-sm text-charcoal underline-offset-4 hover:underline"
          >
            {s.codeAndPrompts.cmOffersLink.label}
          </Link>
        </div>
      </section>

      {/* End-of-document */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / offers / end-of-document
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Add SWA rewrites + defensive 301s.**

Edit `staticwebapp.config.json`. In the rewrites block, add (after the `/ma/approach` rewrite from Task 6):

```json
{ "route": "/ma/offers",              "rewrite": "/ma/offers.html" },
```

In the 301 redirects block (alongside `/m-and-a-execution`), add defensive 301s:

```json
{ "route": "/ma/system",              "redirect": "/ma/approach", "statusCode": 301 },
{ "route": "/ma/workflows",           "redirect": "/ma/approach", "statusCode": 301 },
```

Validate JSON.

- [ ] **Step 3: Build.**

Run: `npx next build`

Expected: PASS. New static page at `out/ma/offers.html`.

- [ ] **Step 4: Run tests.**

Run: `npx playwright test tests/ma-practice.spec.ts --project=chromium`

Expected: All 14 tests PASS (5 `/ma` + 5 `/ma/approach` + 4 `/ma/offers`+toggle).

- [ ] **Step 5: Commit.**

```bash
git add src/app/ma/offers/page.tsx staticwebapp.config.json
git commit -m "phase-3+4: /ma/offers page (single Embedded Specialists offer) + defensive 301s"
```

---

### Task 10: Update sitemap + llms.txt

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`

**Steps:**

- [ ] **Step 1: Update sitemap.**

Edit `public/sitemap.xml`. Add the three new URLs alongside other practice/content entries (after `/mortgages`, before `/privacy`):

```xml
  <url><loc>https://atheryon.com.au/ma</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://atheryon.com.au/ma/approach</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://atheryon.com.au/ma/offers</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

- [ ] **Step 2: Update llms.txt.**

Edit `public/llms.txt`. In the Site map section, add lines for the M&A practice (insert after the `[Mortgages]` entry, before `[About]`):

```
- [M&A](https://atheryon.com.au/ma): M&A execution practice — pre-sign advice + post-deal delivery. Led by Anna Contos.
- [M&A Approach](https://atheryon.com.au/ma/approach): how Atheryon delivers M&A — senior consulting + AI agents on Azure with S&P Global data partner. Three workflows: Pre-Sign Review, Separation/Integration Planning, TSA Tracking & Reduction.
- [M&A Offers](https://atheryon.com.au/ma/offers): one offer — Embedded Execution Specialists. Pre-sign through post-sign engagement. Not productised separately.
```

- [ ] **Step 3: Commit.**

```bash
git add public/sitemap.xml public/llms.txt
git commit -m "phase-3+4: sitemap + llms.txt reflect M&A practice routes"
```

---

### Task 11: Update `/about` M&A credibility box to reference Anna Contos and `/ma`

**Files:**
- Modify: `src/content/site.ts` (find the `/about` credibility boxes — specifically the "M&A Execution & Integration" box and link to /ma; add Anna Contos as practice lead reference if not already present)

**Steps:**

- [ ] **Step 1: Locate the /about M&A credibility box.**

Read `src/content/site.ts` and find the `site.pages.about.credibilityBoxes` array. The second item should be the "M&A Execution & Integration" box.

- [ ] **Step 2: Update the M&A credibility box.**

Update the M&A credibility box to:
1. Mention Anna Contos as the practice lead.
2. Link to `/ma` so the credibility box becomes a discoverable entry-point.

If the box already has a `title: 'M&A Execution & Integration'` field and a `description: '...'` field, append a sentence to the description like:

```
"The M&A practice is led by Anna Contos — see /ma for current engagement model."
```

(Adjust the exact wording to match the existing box style — read the existing description first to match tone.)

If the credibilityBoxes structure supports a `linkHref` or similar, set it to `/ma`. If not, leave the link as inline-prose Markdown-style or just text — the about page rendering component determines this. Verify by reading `src/app/about/page.tsx` to see how it renders the description.

- [ ] **Step 3: Build.**

Run: `npx next build`

Expected: PASS.

- [ ] **Step 4: Commit.**

```bash
git add src/content/site.ts
git commit -m "phase-3+4: /about M&A credibility box references Anna Contos + /ma"
```

---

### Task 12: Phase 3+4 verification

**Files:** (no edits)

**Steps:**

- [ ] **Step 1: Build clean.**

Run: `npx next build`

Expected: PASS. Build output should include the new routes: `/ma`, `/ma/approach`, `/ma/offers`. Total static pages should be 29 (was 26 after Plan A + 3 new M&A pages).

- [ ] **Step 2: Run full Playwright suite.**

Run: `npx playwright test --project=chromium`

Expected: All tests pass — `home`, `offers`, `grok-polish`, `practice-toggle`, `themes`, `ma-practice`. Pre-existing SWA-only skips remain (legacy redirect tests). 0 failures.

- [ ] **Step 3: Production-ready check.**

Run: `npm run verify:production-ready`

Expected: clean — no `REPLACE_ME` placeholders.

- [ ] **Step 4: Manual smoke — visit each new route locally.**

Run: `npx next dev` (in background)

Visit in browser:
- `http://localhost:3000/ma` — verify hero, thesis, 5 triggers (pre-sign #1), 6 capabilities, 6 outcomes, CTA visible. Check `<html data-mode="ma">` via DevTools.
- `http://localhost:3000/ma/approach` — verify §01–§05 all render, Anna Contos bio is visible in §05, S&P Global and Microsoft Azure mentioned in §02, 3 workflows rendered with Input/Agents/Processing/Output cards in §03.
- `http://localhost:3000/ma/offers` — verify single offer card, 6 outcomes listed, "Not offered for M&A" note explaining Code/Prompts.
- Click the **M&A.** pill in the header toggle from `/` — confirm it navigates to `/ma`, not back to `/`.
- Visit `/roadmap` — confirm M&A is NOT listed (`status: 'shipped'` filters it out).
- Visit `/about` — confirm the M&A credibility box now references Anna Contos and links to `/ma`.

- [ ] **Step 5: Phase 3+4 done.**

The M&A practice is fully live on the local build. Ready to push to `dev` for test SWA deploy, then open promotion PR `dev → main`.

---

## Out of Scope (Documented)

- **Phase 5: FOUC mitigation.** Optional — only if the brief flash of CM accent on direct-load to `/ma` is visually disruptive on the deployed SWA. Implementation: inline `<script>` in `/ma/layout.tsx` setting `documentElement.dataset.mode = 'ma'` before React hydrates. Skip unless visibly disruptive.
- **M&A subsite extraction.** Earlier brainstorming considered separate `mortgages.atheryon.com.au` and M&A subsites — rejected in favour of the in-site practice toggle (per brand_architecture memory). Not in scope.
- **Code/Prompts offerings for M&A.** Locked out per design decisions (M&A is consulting-only).
- **Additional workflows on `/ma/approach §03`.** Trimmed to 3. Day-1 Readiness + Data Separation + Post-Sign Delivery Tracking are folded into the 3 named workflows. Adding back would expand `/ma/approach` content density; not currently scoped.
- **Engagement / pricing details.** Not on `/ma/offers`. Pricing remains bespoke (consistent with `/offers/consult` for CM). Conversation moves to `/contact`.

---

## Verification Summary

After all 12 tasks:

1. `npx next build` — PASS, no TS errors, no ESLint errors, **29 static pages** including the 3 new M&A routes
2. `npx playwright test --project=chromium` — full suite green (`home`, `offers`, `grok-polish`, `practice-toggle`, `themes`, `ma-practice` — 14 new `ma-practice` tests pass)
3. `npm run verify:production-ready` — no `REPLACE_ME` strings
4. **Manual:** M&A toggle pill navigates to `/ma`, `data-mode='ma'` flips correctly. All 3 M&A pages render with full prose. `/roadmap` does NOT list M&A (peer practice now shipped).
5. **Legacy redirects:** `/ma/system → /ma/approach` (301), `/ma/workflows → /ma/approach` (301) — verified on deployed SWA only.
6. **CM pages look pixel-identical** to pre-Phase-3+4 state — no regression introduced by the new M&A routes.
