# CSP Positioning — Website Changes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Atheryon website Google-legible to a CSP partner-sourcing reviewer while preserving the Microsoft partner relationship, via five surgical content changes from `docs/superpowers/specs/2026-05-12-phase-1-csp-strategy-decision.md` Section 5.

**Architecture:** Five content-only changes. All copy lives in `src/content/site.ts` (per CLAUDE.md). One Playwright spec file (`tests/csp-positioning.spec.ts`) anchors all five changes with assertions on rendered pages plus a guardrail for Microsoft preservation. The `/transformation` change also touches `tests/pillars.spec.ts` (card-count assertion). No new components, no IA changes, no engineering on Atheryon Labs.

**Tech Stack:** Next.js 14 static export (`output: 'export'`), TypeScript, Playwright (5-browser test suite), Tailwind utility classes.

---

## Pre-Flight: Scope Confirmation

The five changes from the spec, in execution order:

| # | Page | Change | site.ts paths affected |
|---|---|---|---|
| 1 | `/reality` (home) | Add **"The Atheryon Standard"** subsection between hero and pillars; reframe transition copy from problem-coded to standard-coded. Preserve "weeks vs years" anchor by adding it here. No TCO calculator. | `pages.reality.standard` (new), `pages.reality.transition.title`, `pages.reality.transition.body` |
| 2 | `/ai-direction` | Expand the "Model-agnostic by design" card to be model-AND-cloud-agnostic, naming Vertex AI / Gemini alongside existing Anthropic Claude reference. Update hero positioning to add cloud-agnostic framing. **Do not remove Anthropic mentions.** | `pages.aiDirection.hero.positioning`, `pages.aiDirection.whatWeDo.cards[3].body` |
| 3 | `/labs` | Reposition Labs hero + method-economics paragraph from "proof of method" to "marketplace-bound platform" framing. **Narrative only — no engineering.** | `pages.labs.hero.body`, `pages.labs.method.economics.body`, `pages.labs.title` (metadata) |
| 4 | `/transformation` | Add a **5th card** to `whatWeDo.cards`: "Partner Co-Sell" (without naming Google). Update `tests/pillars.spec.ts` card count from 4 to 5. | `pages.transformation.whatWeDo.cards` (append) |
| 5 | Guardrail | Preserve Microsoft positioning unchanged. Adds tests that assert Microsoft mentions remain in 4 specific locations. **No code change** — pure regression protection. | none (tests only) |

**Files touched (total):**
- `src/content/site.ts` — copy edits in 5 sections
- `tests/csp-positioning.spec.ts` — new file, all CSP-positioning assertions + MS guardrail
- `tests/pillars.spec.ts` — card-count assertion bump

**Files explicitly NOT touched:**
- Any file under `src/components/` — no component changes
- Any other page file under `src/app/` — no IA changes
- Any file under `public/` — no new assets

---

## Task 1: Test Scaffold — Write Failing Tests for All Five Changes

**Files:**
- Create: `tests/csp-positioning.spec.ts`

This is a single test file that anchors all changes. Tests are written first; they will FAIL until Tasks 2–5 land the corresponding copy changes.

- [ ] **Step 1: Create the new test file with all assertions**

Create `tests/csp-positioning.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('CSP positioning — /reality (Task 2 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reality')
  })

  test('"The Atheryon Standard" section is present with weeks-vs-years anchor', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /decision-grade is the standard/i })).toBeVisible()
    await expect(page.getByText(/weeks.*not years/i)).toBeVisible()
  })

  test('transition copy leads with the standard, not the problem', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /architect the decision-grade reality beneath your enterprise/i })).toBeVisible()
  })
})

test.describe('CSP positioning — /ai-direction (Task 3 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-direction')
  })

  test('hero positioning mentions cloud-agnostic in addition to model-agnostic', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toContainText(/cloud-agnostic/i)
  })

  test('model-agnostic card names Vertex AI / Gemini alongside Anthropic Claude', async ({ page }) => {
    const card = page.getByTestId('pillar-service-card').filter({ hasText: /Model.{0,3}agnostic/i })
    await expect(card).toBeVisible()
    await expect(card).toContainText(/cloud.{0,3}agnostic/i)
    await expect(card).toContainText(/Vertex AI/i)
    await expect(card).toContainText(/Gemini/i)
    await expect(card).toContainText(/Anthropic/i)
  })
})

test.describe('CSP positioning — /labs (Task 4 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/labs')
  })

  test('hero body positions Labs as a marketplace-bound platform', async ({ page }) => {
    await expect(page.getByText(/marketplace-bound platform/i)).toBeVisible()
  })

  test('method economics paragraph positions Labs as licensable platform IP', async ({ page }) => {
    await expect(page.getByText(/platform IP/i)).toBeVisible()
  })
})

test.describe('CSP positioning — /transformation (Task 5 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/transformation')
  })

  test('"What we do" grid renders 5 cards (was 4, +1 for Partner Co-Sell)', async ({ page }) => {
    const cards = page.getByTestId('pillar-service-card')
    await expect(cards).toHaveCount(5)
  })

  test('Partner Co-Sell card is present and does NOT name Google', async ({ page }) => {
    const card = page.getByTestId('pillar-service-card').filter({ hasText: /Partner Co-Sell/i })
    await expect(card).toBeVisible()
    await expect(card).not.toContainText(/Google/i)
    await expect(card).not.toContainText(/GCP/i)
    await expect(card).not.toContainText(/Vertex/i)
  })
})

test.describe('Microsoft preservation guardrail (Task 6)', () => {
  test('Reality hero partner strip still lists Microsoft', async ({ page }) => {
    await page.goto('/reality')
    await expect(page.getByText('Microsoft partner')).toBeVisible()
  })

  test('Labs evidence partners still lists Microsoft Partner', async ({ page }) => {
    await page.goto('/labs')
    await expect(page.getByText('Microsoft Partner')).toBeVisible()
  })

  test('About founder bio still references Microsoft partner', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByText(/Microsoft partner/i)).toBeVisible()
  })

  test('Labs banker-wedge bio still references Microsoft partner', async ({ page }) => {
    await page.goto('/labs')
    const bankerSection = page.getByText(/Why a banker beats a consultancy/i).locator('xpath=ancestor::section')
    await expect(bankerSection).toContainText(/Microsoft partner/i)
  })
})
```

- [ ] **Step 2: Run the new spec — confirm failures**

Run: `npx playwright test tests/csp-positioning.spec.ts --project=chromium`
Expected: All "Task 2/3/4/5 target" tests FAIL. The four "Microsoft preservation guardrail" tests PASS immediately (no code change needed — those assertions already hold against the current site).

If any Microsoft guardrail test FAILS at this step, **stop** — the current site has already lost a Microsoft mention and the spec assumption is wrong. Fix that first.

- [ ] **Step 3: Commit the failing scaffold**

```bash
git checkout -b feat/csp-positioning
git add tests/csp-positioning.spec.ts
git commit -m "test(csp-positioning): add failing scaffold for 5 surgical CSP-positioning changes

Scaffolds Playwright assertions for the five website changes in
docs/superpowers/specs/2026-05-12-phase-1-csp-strategy-decision.md
section 5, plus a Microsoft-preservation guardrail. Tests currently
fail; implementation lands in subsequent commits."
```

---

## Task 2: `/reality` — Add "The Atheryon Standard" subsection + reframe transition

**Files:**
- Modify: `src/content/site.ts:609-732` (the `reality` page block)
- Modify: `src/app/reality/page.tsx` (add the new section render between Pillars and Transition)

The reframe is **additive**: add a "standard"-coded subsection that owns the new framing, and tighten the existing transition heading. No removal of the diagnostic copy in Floor 13.

- [ ] **Step 1: Add `reality.standard` block in site.ts**

Find the `reality` block in `src/content/site.ts` (starts at line 609). After the `hero` block and before the `pillars` block (around line 624), insert a new key `standard`. The full new block — copy this exactly:

```typescript
      standard: {
        anchor: 'standard',
        badge: 'The standard',
        title: 'Decision-grade is the standard, not the recovery.',
        body: 'Banking platforms used to be measured by years of program spend. Decision-grade is the new measurement: regulator-credible data, ontology-driven semantics, AI-readiness baked in. Atheryon builds to the standard from week one — and recovers programs that started without it. The compression is real: surfaces that consultancies scope in years ship in weeks, not as demos, as decision-grade software.',
        weeksAnchor: {
          label: 'The compression',
          value: 'Weeks, not years.',
          caption: 'vs. typical multi-year consultancy programmes for an equivalent scope.',
        },
      },
```

- [ ] **Step 2: Reframe transition heading**

In the same `reality` block, find `transition` (around line 659). Change:

```typescript
      transition: {
        badge: 'The hidden reality',
        title: 'Beneath every enterprise is a hidden operating reality.',
```

To:

```typescript
      transition: {
        badge: 'The hidden reality',
        title: 'Architect the decision-grade reality beneath your enterprise.',
```

Leave the `body` and `steps` array unchanged — they're diagnostic, not "recovery-coded."

- [ ] **Step 3: Render the new section on /reality**

Open `src/app/reality/page.tsx`. Find the SectionDivider after the Pillars Section (around line 50). After that SectionDivider and before the `{/* §3 Narrative transition */}` comment, insert this new section:

```typescript
      {/* §2.5 The Atheryon Standard — CSP positioning anchor */}
      <Section
        id={reality.standard.anchor}
        badge={reality.standard.badge}
        title={reality.standard.title}
      >
        <div className="max-w-3xl">
          <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
            {reality.standard.body}
          </p>
          <div className="p-6 bg-white border border-charcoal/10 rounded-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-amber mb-2">
              {reality.standard.weeksAnchor.label}
            </div>
            <div className="text-3xl font-bold text-charcoal tracking-tight mb-2">
              {reality.standard.weeksAnchor.value}
            </div>
            <p className="text-sm italic text-charcoal/60">
              {reality.standard.weeksAnchor.caption}
            </p>
          </div>
        </div>
      </Section>

      <SectionDivider />
```

- [ ] **Step 4: Type-check the build**

Run: `npx next build`
Expected: Clean build, no TypeScript errors. The `site.pages.reality.standard` shape flows into `Site` type automatically because `site` is exported with `export type Site = typeof site`.

If you see `Property 'standard' does not exist on type ...` — verify the indentation in step 1 is correct and that `standard` is at the same nesting as `hero`, `pillars`, `transition`, etc.

- [ ] **Step 5: Run the Task 2 tests**

Run: `npx playwright test tests/csp-positioning.spec.ts -g "Task 2 target" --project=chromium`
Expected: Both Task 2 tests now PASS:
- "The Atheryon Standard" section visible with weeks-vs-years anchor
- transition heading reads "Architect the decision-grade reality..."

- [ ] **Step 6: Commit**

```bash
git add src/content/site.ts src/app/reality/page.tsx
git commit -m "feat(reality): add 'The Atheryon Standard' subsection + reframe transition

Implements change 1 from docs/superpowers/specs/2026-05-12-phase-1-csp-strategy-decision.md.
Adds the decision-grade-standard framing as a new subsection between hero and
pillars, with explicit 'weeks vs years' anchor (no TCO calculator per spec).
Reframes transition heading from 'hidden operating reality' to 'decision-grade
reality beneath your enterprise' — additive, no removal of diagnostic copy in
Floor 13."
```

---

## Task 3: `/ai-direction` — Vertex AI / Gemini reference + cloud-agnostic framing

**Files:**
- Modify: `src/content/site.ts:839-887` (the `aiDirection` page block)

Two changes, both in `site.ts`. No TSX changes — the existing components render whatever copy is there.

- [ ] **Step 1: Update hero positioning to add cloud-agnostic framing**

In `src/content/site.ts`, find `aiDirection.hero.positioning` (around line 846). Change:

```typescript
        positioning: 'Frontier AI generates plausible code. In a regulated domain, plausible is wrong. The durable artefact is not the model — it is the directorial track of the human who corrected it.',
```

To:

```typescript
        positioning: 'Frontier AI generates plausible code. In a regulated domain, plausible is wrong. The durable artefact is not the model — it is the directorial track of the human who corrected it. Model-agnostic and cloud-agnostic by design: the method runs on Anthropic Claude on Azure today, ports to Gemini on Vertex AI or any frontier model on any cloud tomorrow.',
```

- [ ] **Step 2: Expand the model-agnostic card to name Vertex AI / Gemini**

In the same block, find `aiDirection.whatWeDo.cards` — specifically the fourth card whose `title` starts with `'Model-agnostic by design'` (around line 866). Change:

```typescript
          { title: 'Model-agnostic by design', body: "Atheryon Labs is currently built using Anthropic’s Claude. The durable artefact is how a senior banker directs frontier AI, not which model is on the other side of the chat." },
```

To:

```typescript
          { title: 'Model-agnostic and cloud-agnostic by design', body: "Atheryon Labs is currently built using Anthropic’s Claude on Microsoft Azure, with a working Vertex AI / Gemini reference under active development. The durable artefact is how a senior banker directs frontier AI — Claude, Gemini, or what comes next — not which model is on the other side of the chat or which cloud runs the inference." },
```

**Important:** keep the Anthropic Claude reference. The spec says **do not remove** Anthropic mentions. The Microsoft Azure reference is also preserved (and strengthened) to maintain Microsoft positioning.

- [ ] **Step 3: Type-check and run Task 3 tests**

Run: `npx next build`
Expected: Clean build.

Run: `npx playwright test tests/csp-positioning.spec.ts -g "Task 3 target" --project=chromium`
Expected: Both Task 3 tests now PASS:
- Hero contains "cloud-agnostic"
- Model-agnostic card contains "Vertex AI", "Gemini", and "Anthropic"

- [ ] **Step 4: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(ai-direction): add Vertex AI / Gemini reference + cloud-agnostic framing

Implements change 2 from docs/superpowers/specs/2026-05-12-phase-1-csp-strategy-decision.md.
Expands the model-agnostic card to model-and-cloud-agnostic, naming Vertex AI /
Gemini alongside Anthropic Claude. Preserves Anthropic mentions per spec.
Strengthens Microsoft Azure reference rather than diluting it (CSP-leverage
play, not radical neutrality)."
```

---

## Task 4: `/labs` — Reposition to marketplace-bound platform (narrative only)

**Files:**
- Modify: `src/content/site.ts:278-484` (the `labs` page block)

Three small copy changes — hero body, method economics paragraph, and page title metadata. **No engineering work.** No new components, no new sections.

- [ ] **Step 1: Update labs page title (metadata)**

In `src/content/site.ts`, find `labs.title` (around line 279). Change:

```typescript
      title: 'Atheryon Labs — Banking platform built by AI',
```

To:

```typescript
      title: 'Atheryon Labs — Marketplace-bound banking platform',
```

- [ ] **Step 2: Update labs hero body**

In the same block, find `labs.hero.body` (around line 284). Change:

```typescript
        body: 'Atheryon Labs is a working CDM-native banking reference platform built by one capital-markets expert directing AI. It demonstrates how complex financial data can be modelled, linked, structured, and turned into usable banking software.',
```

To:

```typescript
        body: 'Atheryon Labs is a marketplace-bound CDM-native banking platform — a working reference today, packaged for cloud marketplace distribution as it matures. Built by one capital-markets expert directing AI, it demonstrates how complex financial data can be modelled, linked, structured, and turned into usable banking software that institutions can license, deploy, and extend.',
```

- [ ] **Step 3: Update method economics paragraph (the "licensable asset" statement)**

In the same block, find `labs.method.economics.body` (around line 433). Change:

```typescript
        economics: {
          heading: 'What this method displaces',
          body: 'A tier-1 systems integrator scopes a regulated-banking platform as a multi-year, eight-figure engagement — armies of analysts running discovery, change requests, and reconciliation cycles. The five rules above are the operating system that compresses that scope into weeks. This is the licensable asset: not the model on the other side of the chat, but the directorial track that makes the model ship.',
        },
```

To:

```typescript
        economics: {
          heading: 'What this method displaces — and what it produces',
          body: 'A tier-1 systems integrator scopes a regulated-banking platform as a multi-year, eight-figure engagement — armies of analysts running discovery, change requests, and reconciliation cycles. The five rules above are the operating system that compresses that scope into weeks. The licensable asset has two halves: the directorial track (how a banker directs AI to produce shipped code) and the platform IP it produces (CDM connectors, regulatory schema mapping, banking surfaces) — designed for cloud marketplace distribution once the partner channel is in place.',
        },
```

- [ ] **Step 4: Type-check and run Task 4 tests**

Run: `npx next build`
Expected: Clean build.

Run: `npx playwright test tests/csp-positioning.spec.ts -g "Task 4 target" --project=chromium`
Expected: Both Task 4 tests now PASS:
- Hero contains "marketplace-bound platform"
- Method economics contains "platform IP"

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(labs): reposition as marketplace-bound platform (narrative only)

Implements change 3 from docs/superpowers/specs/2026-05-12-phase-1-csp-strategy-decision.md.
Shifts Labs narrative from 'proof of method' to 'marketplace-bound platform' in
hero, page title, and method-economics paragraph. Narrative only — no Labs-to-GCP
engineering work, which is Phase 2 per the decision document. Builds runway for
Phase 2 product positioning without committing engineering at zero revenue."
```

---

## Task 5: `/transformation` — Add Partner Co-Sell card

**Files:**
- Modify: `src/content/site.ts:888-936` (the `transformation` page block)
- Modify: `tests/pillars.spec.ts:42-45` (bump card count from 4 to 5)

- [ ] **Step 1: Append Partner Co-Sell card to transformation.whatWeDo.cards**

In `src/content/site.ts`, find `transformation.whatWeDo.cards` (around line 911). The existing array has 4 cards ending with "Engagement Shapes". Append a 5th card:

```typescript
        cards: [
          { title: 'Recovery & Migration', body: 'Diagnose distressed programs, restructure delivery, migrate critical data and platforms safely.' },
          { title: 'M&A Execution', body: 'Day-1 readiness, Day-100 integration, divestiture carve-outs — the data and platform spine of M&A.' },
          { title: 'Capability Enablement', body: 'Build internal data, AI, and platform capability in the institutions we serve, not on top of them.' },
          { title: 'Engagement Shapes', body: '30-day diagnostic, prototype sprint, or full platform engagement — matched to the risk profile of the work.' },
          { title: 'Partner Co-Sell', body: 'Joint engagements with hyperscale cloud and data platform partners — Atheryon brings the regulated-finance domain track, the partner brings the cloud or data primitives, the bank gets a credible joint delivery. Engagement-ready across multiple cloud platforms.' },
        ],
```

Note: copy says "hyperscale cloud and data platform partners" (plural, no specific name). This satisfies the spec requirement to add the track **without naming Google**, while signalling to a Google reviewer that the model is multi-CSP-ready.

- [ ] **Step 2: Update tests/pillars.spec.ts card count for /transformation**

The existing `pillars.spec.ts` runs the same 4-card assertion for all three pillars. Changing the assertion globally would break `/data` and `/ai-direction`. Instead, split the assertion per-pillar.

Open `tests/pillars.spec.ts`. Find the test (lines 42–45):

```typescript
    test('"What we do" grid renders 4 cards', async ({ page }) => {
      const cards = page.getByTestId('pillar-service-card')
      await expect(cards).toHaveCount(4)
    })
```

Replace with a per-pillar count drawn from the route. Change the `pillars` constant array at the top of the file (line 3) to include an expected count, and change the test to read it:

Find the top of the file (lines 3-28):

```typescript
const pillars = [
  {
    path: '/data',
    eyebrow: '01 · Data',
    h1: 'Data',
    proofAlt: /schema editor/i,
    closingLabel: /Request a session/i,
    closingHref: '/contact',
  },
  {
    path: '/ai-direction',
    eyebrow: '02 · AI Direction',
    h1: 'AI Direction',
    proofAlt: /analytics/i,
    closingLabel: /Request access/i,
    closingHref: '/contact?topic=ai-direction',
  },
  {
    path: '/transformation',
    eyebrow: '03 · Transformation',
    h1: 'Transformation',
    proofAlt: /trade board/i,
    closingLabel: /Request a session/i,
    closingHref: '/contact',
  },
]
```

Replace with (note the new `whatWeDoCount` on each):

```typescript
const pillars = [
  {
    path: '/data',
    eyebrow: '01 · Data',
    h1: 'Data',
    proofAlt: /schema editor/i,
    closingLabel: /Request a session/i,
    closingHref: '/contact',
    whatWeDoCount: 4,
  },
  {
    path: '/ai-direction',
    eyebrow: '02 · AI Direction',
    h1: 'AI Direction',
    proofAlt: /analytics/i,
    closingLabel: /Request access/i,
    closingHref: '/contact?topic=ai-direction',
    whatWeDoCount: 4,
  },
  {
    path: '/transformation',
    eyebrow: '03 · Transformation',
    h1: 'Transformation',
    proofAlt: /trade board/i,
    closingLabel: /Request a session/i,
    closingHref: '/contact',
    whatWeDoCount: 5,
  },
]
```

Then change the test (lines 42–45) to:

```typescript
    test('"What we do" grid renders expected card count', async ({ page }) => {
      const cards = page.getByTestId('pillar-service-card')
      await expect(cards).toHaveCount(p.whatWeDoCount)
    })
```

- [ ] **Step 3: Type-check and run all affected tests**

Run: `npx next build`
Expected: Clean build.

Run: `npx playwright test tests/csp-positioning.spec.ts tests/pillars.spec.ts --project=chromium`
Expected:
- Both Task 5 CSP tests PASS (5 cards on /transformation, Partner Co-Sell card present and Google-free)
- All `pillars.spec.ts` tests PASS — /data and /ai-direction still expect 4 cards, /transformation expects 5
- Microsoft preservation guardrail (Task 6) tests still PASS

- [ ] **Step 4: Commit**

```bash
git add src/content/site.ts tests/pillars.spec.ts
git commit -m "feat(transformation): add Partner Co-Sell engagement card

Implements change 4 from docs/superpowers/specs/2026-05-12-phase-1-csp-strategy-decision.md.
Adds a 5th 'What we do' card on /transformation describing partner co-sell as
an engagement shape, without naming Google or any specific CSP. Signals
co-sell-readiness to CSP partner scouts while preserving multi-cloud optionality.

Updates tests/pillars.spec.ts to parametrise card count per pillar — /data and
/ai-direction still expect 4, /transformation expects 5."
```

---

## Task 6: Full Verification — Build, Full Test Suite, Production Greps

**Files:** None modified — this is verification only.

- [ ] **Step 1: Run the verify:production-ready script**

Run: `npm run verify:production-ready`
Expected: PASS — no `REPLACE_ME` placeholders introduced. (Per CLAUDE.md this greps `src/` for placeholder markers.)

- [ ] **Step 2: Run the full Playwright suite on Chromium**

Run: `npx playwright test --project=chromium`
Expected: All tests PASS. The visual regression specs (`tests/visual.spec.ts-snapshots/`) may flag changes on `/reality`, `/ai-direction`, `/labs`, `/transformation` — those are expected and need snapshot updates.

If visual tests fail:

Run: `npx playwright test --project=chromium --update-snapshots`
Then re-run: `npx playwright test --project=chromium`
Expected: All PASS.

- [ ] **Step 3: Manual verification — visit each changed page in dev**

Run (in a separate terminal, leave running): `npx next dev`

Then visit and visually inspect:
- http://localhost:3000/reality — confirm "The Atheryon Standard" subsection appears between hero and pillars; transition heading reads "Architect the decision-grade reality beneath your enterprise."
- http://localhost:3000/ai-direction — confirm hero mentions cloud-agnostic; the 4th "What we do" card title is "Model-agnostic and cloud-agnostic by design" and body names Vertex AI, Gemini, and Anthropic
- http://localhost:3000/labs — confirm hero body says "marketplace-bound CDM-native banking platform"; method economics says "platform IP"
- http://localhost:3000/transformation — confirm 5th "What we do" card titled "Partner Co-Sell" appears; verify it does NOT mention Google
- http://localhost:3000/about — confirm founder bio still references "Atheryon is a Microsoft partner and S&P Global partner."

Kill the dev server when done: Ctrl-C.

- [ ] **Step 4: Commit any snapshot updates**

If you updated visual snapshots in step 2:

```bash
git add tests/visual.spec.ts-snapshots
git commit -m "test(visual): update snapshots for CSP-positioning copy changes

The five surgical content changes in this branch produce expected visual
diffs on /reality (new subsection), /ai-direction (longer hero positioning),
/labs (longer hero body + economics), /transformation (5th card)."
```

- [ ] **Step 5: Final branch state check**

Run: `git log --oneline main..HEAD`
Expected: 5 or 6 commits on `feat/csp-positioning` branch:
1. `test(csp-positioning): add failing scaffold for 5 surgical CSP-positioning changes`
2. `feat(reality): add 'The Atheryon Standard' subsection + reframe transition`
3. `feat(ai-direction): add Vertex AI / Gemini reference + cloud-agnostic framing`
4. `feat(labs): reposition as marketplace-bound platform (narrative only)`
5. `feat(transformation): add Partner Co-Sell engagement card`
6. (optional) `test(visual): update snapshots for CSP-positioning copy changes`

Run: `git diff --stat main..HEAD`
Expected: Changes localised to `src/content/site.ts`, `src/app/reality/page.tsx`, `tests/csp-positioning.spec.ts`, `tests/pillars.spec.ts`, and optionally snapshot files. **No** changes to `src/components/`, `staticwebapp.config.json`, `package.json`, or any other infrastructure file.

---

## Task 7: PR Creation (manual — outside the agentic loop)

The plan does **not** create the PR automatically. Terry should:

1. Review the rendered pages on `dev` after pushing the branch (`dev.atheryon.ai` via the deploy-test workflow).
2. Tune copy by hand for tone before promoting to `main` — the plan deliberately delivers full draft copy, but the founder voice is the one that ships.
3. Open the PR with `gh pr create --base dev` (per CLAUDE.md the `dev` branch is the integration branch; promotion to `main` is a separate PR).

This task is intentionally outside the agentic loop because the copy itself is strategic prose and benefits from human review before being merged.

---

## Self-Review Notes

**Spec coverage:**
- ✅ Spec section 5 change #1 (/reality narrative reframe) → Task 2
- ✅ Spec section 5 change #2 (/ai-direction Vertex AI / Gemini) → Task 3
- ✅ Spec section 5 change #3 (/labs marketplace-bound platform) → Task 4
- ✅ Spec section 5 change #4 (/transformation Partner co-sell) → Task 5
- ✅ Spec section 5 change #5 (Microsoft preservation) → Task 1 guardrail tests + Task 6 manual /about verification
- ✅ Spec section 6 anti-scope (no AWS, no TCO calculator, no de-Terry push, no Labs engineering, no IA rebuild, no MS reduction) — none of the tasks violate any anti-scope item

**Type consistency:**
- The new `reality.standard` object has `anchor`, `badge`, `title`, `body`, `weeksAnchor` — consistent with the existing `reality.methodology` and `reality.engagement` shapes which also use `anchor`/`badge`/`title`.
- `weeksAnchor` has `label`, `value`, `caption` — new shape, only used in Task 2 step 3 render.
- `whatWeDoCount: number` added to `pillars` test array — used only in `pillars.spec.ts`.

**No placeholders:** Every copy block in the plan is the actual text to ship. Test code is complete and runnable.

**Scope:** Single coherent plan. Five surgical content changes, ~3 hours of execution work, gated behind the 2–4 week elapsed timeline in the spec so Terry can iterate on the copy. No subsystem decomposition needed.
