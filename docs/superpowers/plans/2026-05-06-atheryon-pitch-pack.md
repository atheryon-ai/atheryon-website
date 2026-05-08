# Atheryon Labs Pitch Pack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public long-scroll pitch page at `/labs` on `www.atheryon.com.au` plus a downloadable PDF companion, presenting Atheryon Labs as Terry-directed AI-built proof of senior banker delivery.

**Architecture:** Pure additive Next.js 14 App Router page. New route `src/app/labs/page.tsx`, all copy centralised in `src/content/site.ts` under `site.pages.labs`, new section-specific components composed from existing primitives where possible. Static screenshots captured from `labs.atheryon.ai` into `public/labs/`. PDF generated separately from a Markdown source via the `/make-pdf` gstack skill. No backend, no auth, no iframe of the live app — screenshots only.

**Tech Stack:** Next.js 14 (App Router, static export), TypeScript, Tailwind CSS, Playwright E2E, Azure Static Web Apps. No new runtime dependencies.

**Source spec:** `docs/superpowers/specs/2026-05-06-atheryon-pitch-pack-design.md`

---

## File Structure

### Files to create

| Path | Purpose |
|------|---------|
| `src/app/labs/page.tsx` | Long-scroll `/labs` page composed from new Labs* components and copy from `site.pages.labs` |
| `src/components/LabsHero.tsx` | Two-line headline + italic disclaimer subline + three CTAs (hero variant for §1) |
| `src/components/LabsBankMap.tsx` | Eight-box visual of the labs IA (§4) |
| `src/components/LabsFlagship.tsx` | Screenshot + problem + how-it-works + metric footer block (§5–§7) |
| `src/components/LabsVignette.tsx` | "AI proposed / banking context corrected" two-paragraph card (§8) |
| `src/components/LabsEngagementCard.tsx` | One of three engagement-mode cards with single CTA (§10) |
| `tests/labs.spec.ts` | Playwright suite specific to `/labs` (anchors, CTAs, PDF download, viewport overflow) |
| `public/labs/atheryon-pitch-pack.pdf` | Generated PDF artifact (output of separate `/make-pdf` run, committed) |
| `public/labs/pitch-pack.md` | Markdown source for the PDF (mirrors page copy; referenced by `/make-pdf`) |
| `public/labs/screenshots/ops-board.png` | §5 Trade Board / Operations screenshot |
| `public/labs/screenshots/risk-pricer.png` | §6 Risk Pricer / IRRBB screenshot |
| `public/labs/screenshots/schema-editor.png` | §7 Schema Editor / CDM Intelligence screenshot |
| `public/labs/terry-headshot.jpg` | §2 photo placeholder (real asset replaced before launch — see Task 1.5) |

### Files to modify

| Path | Change |
|------|--------|
| `src/content/site.ts` | Add `site.pages.labs` block with all headlines, body copy, vignettes, engagement cards, CTAs, metadata |
| `src/components/index.ts` | Export `LabsHero`, `LabsBankMap`, `LabsFlagship`, `LabsVignette`, `LabsEngagementCard` |
| `src/components/Header.tsx` | Append `{ label: 'Labs', href: '/labs' }` to `mainNav` after `Reference Architectures` (discreet — single nav entry, not a dropdown) |
| `staticwebapp.config.json` | Add `{ "route": "/labs", "rewrite": "/labs.html" }` to the `routes` array |
| `public/sitemap.xml` | Add `<url>` entry for `https://atheryon.com.au/labs/` with priority `0.8` |
| `tests/routing.spec.ts` | Append `{ path: '/labs', title: /Labs/, h1: /Most capital-markets platforms/i }` to the `routes` table |

### Out of scope for this plan

- Any change to `labs-platform` itself (this is a marketing artefact only).
- A separate AI-lab-specific page (rejected option from spec D1).
- Iframe / live embed of `labs.atheryon.ai` — screenshots only.
- Updating the homepage (`src/app/page.tsx` and `home` copy block stay exactly as they are).
- Auth or paywall on `/labs`.

---

## Open-Question Tasks (require Terry input — embed in flow, do NOT block implementation)

The spec §10 lists open questions. Each one has a corresponding inline task in this plan that produces a draft and asks Terry to review:

- **OQ1 §3 flagship surface count** → resolved in Task 2 with `31` (count from `labs-platform/src/lib/themes/themes.ts` comment "31 themes / 121 pages"). Footnote in copy: "31 themes / 121 surfaces". Terry to override at copy review (Task 11).
- **OQ2 §5–§7 flagship picks** → spec defaults (Trade Board/Ops, Risk Pricer/IRRBB, Schema Editor) used in Task 2. Terry confirms during Task 11 copy review.
- **OQ3 §8 vignettes** → spec lists five candidate titles. Task 7 authors draft prose for each from PR/git evidence; Terry edits in Task 11.
- **OQ4 §9 embedded artefacts** → Task 8 leaves a *single* placeholder block clearly marked `{{TERRY_PROMPT_EXAMPLE}}` in `site.ts`; Task 11 includes a stop-the-line check that this placeholder is filled in before any deploy to production.
- **OQ5 §10 prompt-archive copy** → Task 9 uses spec wording verbatim. Fallback rename ("License the reference architecture") prepared as Task 9b — applied only if Task 11 review flags the section as still reading thin.
- **OQ6 Header nav** → resolved: add a single discreet `Labs` link (Task 10). Spec said "decision deferred"; we resolve by following the spec's "discreet *Labs* link" wording and not nesting it under Services.
- **OQ7 §2 photo** → Task 1.5 commits `public/labs/terry-headshot.jpg` (Terry supplies asset; placeholder grey square checked in if not yet available, gated by Task 11).
- **OQ8 PDF cover/back** → Task 12 generates PDF with cover (logo + "Atheryon Labs — Pitch Pack — May 2026") and back page (contact block). No watermark.

---

## Language Discipline (read this first)

- **No bare "10x".** Stats strip and flagship footers must carry a denominator (e.g., "10× faster than the bank's prior baseline" not "10× faster"). Spec §9 explicitly flags this risk.
- **One AI/Claude disclosure only.** The string `Claude` and `Anthropic` must appear *exactly once* in the entire `/labs` page — inside the §9 disclosure line. Task 13 verifies this with a grep assertion.
- **The italic hero disclaimer is non-negotiable.** "It is not a production bank platform…" must render above the fold (Task 4 layout test asserts this).
- **Bank-first voice.** Body copy is a banker talking to bankers. AI is a *mechanism*, not a partner.

---

## Task 1: Branch hygiene and asset placeholders

**Files:**
- Verify: current branch is `feat/labs-pitch-pack`
- Create: `public/labs/.gitkeep`, `public/labs/screenshots/.gitkeep`

- [ ] **Step 1: Confirm branch and clean tree**

Run: `git status && git branch --show-current`
Expected: `feat/labs-pitch-pack` and a clean tree (or only this plan staged).

- [ ] **Step 2: Create asset directories**

Run:
```bash
mkdir -p public/labs/screenshots
touch public/labs/.gitkeep public/labs/screenshots/.gitkeep
```

- [ ] **Step 3: Add a placeholder headshot**

If Terry has supplied a real photo, place at `public/labs/terry-headshot.jpg`. Otherwise, generate a 600×600 neutral grey placeholder so the layout renders during dev:

```bash
# macOS — quick grey placeholder via sips/ImageMagick is overkill;
# use a 1×1 grey PNG renamed for now and replace before launch.
printf '\x89PNG\r\n\x1a\n' > public/labs/terry-headshot.jpg  # not a real image
# Better: copy the existing logo as a stand-in until the real asset arrives
cp public/logo.png public/labs/terry-headshot.jpg || true
```

A real headshot must replace this file before Task 13. Task 13 includes a stop-the-line check.

- [ ] **Step 4: Commit**

```bash
git add public/labs/.gitkeep public/labs/screenshots/.gitkeep public/labs/terry-headshot.jpg docs/superpowers/plans/2026-05-06-atheryon-pitch-pack.md
git commit -m "chore(labs): scaffold public/labs assets dir + plan"
```

---

## Task 2: Add `site.pages.labs` copy block (skeleton — section keys + metadata)

**Files:**
- Modify: `src/content/site.ts` (insert new top-level key `labs:` inside `pages:` between `mibInsightThanks:` and the closing `}` — match alphabetical-ish placement near `programs`)

- [ ] **Step 1: Add the metadata + hero copy block**

Insert into `src/content/site.ts`, in `pages:`, after the existing `mibInsightThanks:` block (around line 967, before the closing brace of `pages:`). Keep wording verbatim from the spec §1, §2, §3:

```typescript
    labs: {
      title: 'Atheryon Labs — Pitch Pack',
      description: 'A senior capital-markets data leader using AI to turn 20+ years of tacit banking delivery knowledge into a working, inspectable reference platform.',
      hero: {
        headlineLine1: 'Most capital-markets platforms take a decade and a thousand engineers.',
        headlineLine2: 'This one took one banker, directing AI.',
        body: 'Atheryon Labs is a CDM-native reference implementation across trading, post-trade, risk, treasury, compliance, and mortgage workflows — built by Terry Tsakiris with AI as a coding partner. Twenty years inside Credit Suisse, CBA, Westpac, Barclays, applied to a working artifact you can inspect.',
        disclaimer: 'It is not a production bank platform. It is proof that senior domain judgment plus AI-assisted engineering compresses discovery, architecture, and working delivery into weeks.',
        primaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
        secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
        tertiaryCta: { label: 'Request a confidential discussion', href: '/contact' },
      },
      credibility: {
        badge: 'Twenty years on the inside',
        title: 'A career inside tier-1 banks',
        photo: '/labs/terry-headshot.jpg',
        photoAlt: 'Terry Tsakiris',
        body: "I'm Terry Tsakiris. At Credit Suisse I built the bank's first near-real-time front-office risk system, then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates. At Commonwealth Bank I owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance. At Westpac Institutional Banking I rescued a distressed $84M data program and stood up a Data Products capability that delivered ten times faster than the bank's prior baseline. Atheryon Labs is the next iteration of that method: the same delivery muscle, paired with AI.",
      },
      stats: {
        badge: 'At a glance',
        title: 'The shape of what was built',
        items: [
          { value: '8', label: 'banking functions covered' },
          { value: '1', label: 'CDM data model — ISDA-compliant, end to end' },
          { value: '31', label: 'flagship surfaces shipped' },
          { value: 'Live', label: 'at labs.atheryon.ai' },
        ],
      },
      bankMap: {
        badge: 'The bank, mapped',
        title: 'Eight functions, one model',
        caption: 'The bank as I have worked it. Each section maps to a function I have shipped inside a tier-1 institution.',
        boxes: [
          'Operational Data Store',
          'Front Office',
          'Operations',
          'Compliance & Reporting',
          'Market Risk',
          'Credit Risk',
          'Treasury',
          'Mortgages',
        ],
      },
      flagships: {
        badge: 'Three deep-dives',
        title: 'What the platform actually does',
        items: [
          {
            number: '01',
            name: 'Trade Board + Operations',
            screenshot: '/labs/screenshots/ops-board.png',
            screenshotAlt: 'Atheryon Labs trade board and operations surface',
            problem: 'Operations teams in capital markets reconcile breaks, manage confirmations, and process lifecycle events end-of-day under hard regulatory deadlines. Most platforms model this as a workflow tool. The result is reconciliation that misses the underlying CDM event.',
            howItWorks: 'The /ops board is built directly on the CDM event model: every break, confirmation, and lifecycle action is an event with a typed payload. Operators triage breaks, run lifecycle actions, and the audit trail is the event stream itself — not an after-the-fact log.',
            metric: 'CV anchor: CBA Markets ODS — Reg Trade Reporting, MiFID II, Surveillance.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.',
          },
          {
            number: '02',
            name: 'Risk Pricer + IRRBB',
            screenshot: '/labs/screenshots/risk-pricer.png',
            screenshotAlt: 'Atheryon Labs risk pricer and IRRBB surface',
            problem: 'Front-office and middle-office risk teams need pricing and risk views that are fast, correct, and inspectable. Most platforms separate the pricer from the risk view, then reconcile them downstream. The reconciliation is where errors live.',
            howItWorks: '/risk/pricer and /risk/irrbb call a typed atheryon-risk client over a shared CDM trade payload. Pricing and Greeks come from the same source; IRRBB views layer balance-sheet sensitivity on top. One model, one wire format, one source of truth for explain.',
            metric: 'CV anchor: Credit Suisse FOBO risk + Global P&L Attribution.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.',
          },
          {
            number: '03',
            name: 'Schema Editor + CDM Intelligence',
            screenshot: '/labs/screenshots/schema-editor.png',
            screenshotAlt: 'Atheryon Labs schema editor and CDM intelligence surfaces',
            problem: 'The hardest part of any banking data platform is keeping the data model honest under change. Most platforms treat the schema as a database concern. The result is silent drift between the model the business agrees to and the model the system enforces.',
            howItWorks: '/build/schema-editor edits CDM types directly. /explore/graph walks instances of those types. Reg Submissions reverse-map regulator artefacts back to CDM, so the schema and the regulator are always in the same conversation.',
            metric: 'CV anchor: the data-modelling thesis — the Atheryon differentiator.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.',
          },
        ],
      },
      vignettes: {
        badge: "What AI couldn't know without the banker",
        title: 'Five places domain judgment changed the implementation',
        intro: 'In each of these, the AI proposed something plausible. Twenty years on the trading floor changed the answer. The point of this section is not that AI is bad. The point is that the durable artefact is the human directing it.',
        items: [
          {
            title: 'Lifecycle state model',
            aiProposed: 'The AI proposed modelling a trade as a row that moves through statuses — pending, confirmed, settled, terminated. Standard CRUD with a lifecycle column.',
            bankerCorrected: 'CDM events are not trade states. Operations does not reconcile rows; it reconciles events — partial terminations, increases, novations, exercise — each one a typed payload with its own controls. The data model was rebuilt event-first, with the trade as a projection.',
          },
          {
            title: 'Regulatory Trade Reporting evidence',
            aiProposed: 'The AI generated reporting endpoints that emitted the regulator-required fields. Functionally complete by the spec.',
            bankerCorrected: 'MiFID II and EMIR audits do not ask for the report; they ask for the *evidence chain* — what was reported, what changed, who approved, when. The platform was extended to emit a per-submission evidence artefact alongside the report. Reg Submissions is built around that artefact.',
          },
          {
            title: 'Risk view granularity',
            aiProposed: 'The AI built a risk view that aggregated P&L explain by risk type — delta, gamma, vega, theta. Textbook taxonomy.',
            bankerCorrected: 'FOBO P&L breaks if you do not separate explain types the way the trading floor separates them — market move, new trades, amendments, lifecycle, parameters, residual. The Greeks taxonomy came second; the FOBO taxonomy came first, and it is what reconciles.',
          },
          {
            title: 'Schema modelling — extend vs wrap',
            aiProposed: 'The AI defaulted to extending CDM types whenever a bank-specific field was needed. Inheritance, by the textbook.',
            bankerCorrected: 'Goldman SecDB taught the opposite: extend when the concept is genuinely a CDM concept with one more attribute; wrap when the concept is a bank-internal artefact that happens to reference CDM. The schema editor encodes both modes, and the rule for choosing.',
          },
          {
            title: 'Ops exception handling at 5pm Sydney',
            aiProposed: 'The AI built an exception queue with severity, owner, and SLA. Tidy.',
            bankerCorrected: 'At 5pm Sydney, operations does not work an SLA queue. It works a *deadline*: what must be in the regulator before market open in Frankfurt. The queue was redesigned around deadline-to-cutoff, with a cutoff calendar that knows the holiday schedule of every relevant venue.',
          },
        ],
      },
      method: {
        badge: 'The 10× method',
        title: 'How a banker directs AI',
        principles: [
          {
            title: 'Built from banking controls, not user stories.',
            body: 'Where most AI demos start "as a user I want…", this started with the regulatory artefact, the operational control, the risk view. Controls drive surfaces; surfaces do not drive controls.',
          },
          {
            title: 'Started from the product / event / data model, not the screen.',
            body: 'CDM-first, then surfaces. The data model is the contract. Every screen is a projection of it.',
          },
          {
            title: 'Generate variants, then narrow them.',
            body: 'Three implementation candidates per surface. AI generates them in minutes. Banking judgment rejects, corrects, and chooses.',
          },
          {
            title: 'Every surface traceable to a banking function, CDM concept, and operating control.',
            body: 'The labs IA enforces this. If a surface cannot be mapped, it does not ship.',
          },
          {
            title: 'The deliverable is a working decision surface, not a slide deck.',
            body: 'Inspectable, deployable, extendable. A reader who is technical can fork it tonight.',
          },
        ],
        artifact: {
          heading: 'One real prompt, one real correction',
          // {{TERRY_PROMPT_EXAMPLE}} — Terry to fill in. Stop-the-line: Task 13 fails if this string remains.
          promptShown: '{{TERRY_PROMPT_EXAMPLE_PROMPT}}',
          correctionShown: '{{TERRY_PROMPT_EXAMPLE_CORRECTION}}',
          prLink: '{{TERRY_PROMPT_EXAMPLE_PR_URL}}',
        },
        disclosure: "Atheryon Labs is currently built using Anthropic's Claude. The method is model-agnostic by design — the durable artefact is how a banker directs AI, not which AI is on the other side of the chat.",
      },
      engagement: {
        badge: 'Three ways to use what is here',
        title: 'Code, prompts, advisory',
        cards: [
          {
            number: '01',
            title: 'Take the code.',
            body: "Fork the labs-platform repo. Inspect, deploy, extend. Suitable for technology partners and engineering teams who want to study the reference implementation. Includes architecture map, CDM model, and read-only access to a hosted instance.",
            ctaLabel: 'Inspect',
            ctaHref: '/contact?topic=labs-code',
          },
          {
            number: '02',
            title: 'Take the prompts.',
            body: "A curated archive of the prompts, corrections, and architectural decisions that produced the platform — paired with Terry's reasoning per surface. Not a generic prompt library; the banker's directorial track.",
            ctaLabel: 'License',
            ctaHref: '/contact?topic=labs-prompts',
          },
          {
            number: '03',
            title: 'Take the advisory.',
            body: 'Atheryon Advisory engagements: 30-day diagnostic, prototype sprint, or full data-platform recovery. Continuing the method that rescued the $84M Westpac program — now amplified.',
            ctaLabel: 'Engage',
            ctaHref: '/contact?topic=labs-advisory',
          },
        ],
      },
      closing: {
        badge: 'Available for select engagements',
        title: 'Atheryon partners with a small number of institutions per year.',
        body: 'If what you have just read maps to a problem on your desk, the next step is a confidential conversation.',
        primaryCta: { label: 'Request a confidential discussion', href: '/contact' },
        secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
        tertiaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
      },
    },
```

- [ ] **Step 2: Run typecheck**

Run: `npx next build`
Expected: build succeeds. (Even though we have not yet built the page, adding to `site.ts` should not break anything.)

- [ ] **Step 3: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(labs): add site.pages.labs copy block"
```

---

## Task 3: Add Playwright route + write failing labs.spec.ts

**Files:**
- Modify: `tests/routing.spec.ts` (line ~22 area, append to `routes` array)
- Create: `tests/labs.spec.ts`

- [ ] **Step 1: Append `/labs` to `tests/routing.spec.ts`**

Edit `tests/routing.spec.ts` — add this entry to the end of the `routes` array (line ~22, before the closing `];`):

```typescript
  { path: '/labs', title: /Labs/, h1: /Most capital-markets platforms/i },
```

- [ ] **Step 2: Create `tests/labs.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('/labs page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/labs');
  });

  test('hero disclaimer renders above the fold', async ({ page }) => {
    const disclaimer = page.getByText(/It is not a production bank platform/i);
    await expect(disclaimer).toBeVisible();
    const box = await disclaimer.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(900);
  });

  test('three hero CTAs are present', async ({ page }) => {
    await expect(page.getByRole('link', { name: /See it live/i }).first()).toHaveAttribute('href', 'https://labs.atheryon.ai');
    await expect(page.getByRole('link', { name: /Download the pack/i }).first()).toHaveAttribute('href', '/labs/atheryon-pitch-pack.pdf');
    await expect(page.getByRole('link', { name: /Request a confidential discussion/i }).first()).toHaveAttribute('href', '/contact');
  });

  test('Anthropic/Claude appears exactly once', async ({ page }) => {
    const text = await page.locator('main, body').first().innerText();
    const claudeCount = (text.match(/Claude/g) || []).length;
    const anthropicCount = (text.match(/Anthropic/g) || []).length;
    expect(claudeCount).toBe(1);
    expect(anthropicCount).toBe(1);
  });

  test('eight bank-map boxes render', async ({ page }) => {
    const map = page.getByTestId('labs-bank-map');
    await expect(map).toBeVisible();
    await expect(map.locator('[data-testid="bank-map-box"]')).toHaveCount(8);
  });

  test('three flagship deep-dives render', async ({ page }) => {
    await expect(page.getByTestId('labs-flagship')).toHaveCount(3);
  });

  test('five vignettes render', async ({ page }) => {
    await expect(page.getByTestId('labs-vignette')).toHaveCount(5);
  });

  test('three engagement cards render with single CTA each', async ({ page }) => {
    const cards = page.getByTestId('labs-engagement-card');
    await expect(cards).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(cards.nth(i).getByRole('link')).toHaveCount(1);
    }
  });

  test('PDF download responds', async ({ request }) => {
    const r = await request.head('/labs/atheryon-pitch-pack.pdf');
    expect(r.status()).toBe(200);
  });

  test('no TERRY_PROMPT_EXAMPLE placeholder leaks into rendered page', async ({ page }) => {
    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/TERRY_PROMPT_EXAMPLE/);
    expect(body).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });
});
```

- [ ] **Step 3: Run the suite — expect all to fail (page does not yet exist)**

Run: `npx playwright test tests/labs.spec.ts tests/routing.spec.ts -g "/labs"`
Expected: all `/labs` tests fail with "page not found" or `404`.

- [ ] **Step 4: Commit**

```bash
git add tests/labs.spec.ts tests/routing.spec.ts
git commit -m "test(labs): add /labs route + page expectations (failing)"
```

---

## Task 4: Build `LabsHero` component

**Files:**
- Create: `src/components/LabsHero.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement the component**

```tsx
'use client'

import Link from 'next/link'

interface LabsHeroProps {
  headlineLine1: string
  headlineLine2: string
  body: string
  disclaimer: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  tertiaryCta: { label: string; href: string }
}

export function LabsHero({
  headlineLine1,
  headlineLine2,
  body,
  disclaimer,
  primaryCta,
  secondaryCta,
  tertiaryCta,
}: LabsHeroProps) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-neutral-900 mb-2 leading-[1.1]">
          {headlineLine1}
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-brand-orange mb-8 leading-[1.1]">
          {headlineLine2}
        </h1>

        <p className="text-lg md:text-subheading text-neutral-700 max-w-3xl mb-6 leading-relaxed">
          {body}
        </p>

        <p className="text-base md:text-lg italic text-neutral-600 max-w-3xl mb-10 leading-relaxed">
          {disclaimer}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Link href={primaryCta.href} className="btn-primary">{primaryCta.label}</Link>
          <Link href={secondaryCta.href} className="btn-secondary">{secondaryCta.label}</Link>
          <Link href={tertiaryCta.href} className="btn-secondary">{tertiaryCta.label}</Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Export from `src/components/index.ts`**

Append:
```typescript
export { LabsHero } from './LabsHero'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LabsHero.tsx src/components/index.ts
git commit -m "feat(labs): add LabsHero component"
```

---

## Task 5: Build `LabsBankMap` component (§4)

**Files:**
- Create: `src/components/LabsBankMap.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

```tsx
interface LabsBankMapProps {
  boxes: string[]
  caption: string
}

export function LabsBankMap({ boxes, caption }: LabsBankMapProps) {
  return (
    <div data-testid="labs-bank-map">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {boxes.map((label) => (
          <div
            key={label}
            data-testid="bank-map-box"
            className="p-6 bg-white border border-neutral-500/10 rounded-2xl shadow-soft text-center"
          >
            <span className="font-semibold text-neutral-900 tracking-tight">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-base italic text-neutral-600 max-w-3xl">{caption}</p>
    </div>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { LabsBankMap } from './LabsBankMap'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LabsBankMap.tsx src/components/index.ts
git commit -m "feat(labs): add LabsBankMap component"
```

---

## Task 6: Build `LabsFlagship` component (§5–§7)

**Files:**
- Create: `src/components/LabsFlagship.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

```tsx
import Image from 'next/image'

interface LabsFlagshipProps {
  number: string
  name: string
  screenshot: string
  screenshotAlt: string
  problem: string
  howItWorks: string
  metric: string
  footer: string
  reverse?: boolean
}

export function LabsFlagship({
  number,
  name,
  screenshot,
  screenshotAlt,
  problem,
  howItWorks,
  metric,
  footer,
  reverse = false,
}: LabsFlagshipProps) {
  return (
    <article
      data-testid="labs-flagship"
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div className="rounded-2xl overflow-hidden border border-neutral-500/10 shadow-card bg-white">
        <Image
          src={screenshot}
          alt={screenshotAlt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      <div>
        <div className="text-sm font-mono text-brand-orange mb-2">§{number}</div>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-6 leading-tight">
          {name}
        </h3>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">The problem</h4>
        <p className="text-neutral-700 leading-relaxed mb-6">{problem}</p>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">How it works</h4>
        <p className="text-neutral-700 leading-relaxed mb-6">{howItWorks}</p>
        <p className="text-sm text-neutral-600 italic mb-2">{metric}</p>
        <p className="text-xs text-neutral-500 italic">{footer}</p>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { LabsFlagship } from './LabsFlagship'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LabsFlagship.tsx src/components/index.ts
git commit -m "feat(labs): add LabsFlagship component"
```

---

## Task 7: Build `LabsVignette` component (§8)

**Files:**
- Create: `src/components/LabsVignette.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

```tsx
interface LabsVignetteProps {
  title: string
  aiProposed: string
  bankerCorrected: string
}

export function LabsVignette({ title, aiProposed, bankerCorrected }: LabsVignetteProps) {
  return (
    <article
      data-testid="labs-vignette"
      className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-soft"
    >
      <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-6">{title}</h3>
      <div className="mb-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">The implementation AI proposed</h4>
        <p className="text-neutral-700 leading-relaxed">{aiProposed}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-orange mb-2">What banking context changed</h4>
        <p className="text-neutral-800 leading-relaxed font-medium">{bankerCorrected}</p>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { LabsVignette } from './LabsVignette'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LabsVignette.tsx src/components/index.ts
git commit -m "feat(labs): add LabsVignette component"
```

---

## Task 8: Build `LabsEngagementCard` component (§10)

**Files:**
- Create: `src/components/LabsEngagementCard.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

```tsx
import Link from 'next/link'
import { ArrowRightIcon } from './Icons'

interface LabsEngagementCardProps {
  number: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export function LabsEngagementCard({ number, title, body, ctaLabel, ctaHref }: LabsEngagementCardProps) {
  return (
    <div
      data-testid="labs-engagement-card"
      className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card flex flex-col h-full"
    >
      <div className="text-sm font-mono text-brand-orange mb-3">{number}</div>
      <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-4">{title}</h3>
      <p className="text-neutral-700 leading-relaxed mb-8 flex-1">{body}</p>
      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all self-start"
      >
        {ctaLabel}
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { LabsEngagementCard } from './LabsEngagementCard'
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LabsEngagementCard.tsx src/components/index.ts
git commit -m "feat(labs): add LabsEngagementCard component"
```

---

## Task 9: Build the `/labs` page

**Files:**
- Create: `src/app/labs/page.tsx`

- [ ] **Step 1: Implement the page**

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Section,
  SectionDivider,
  LabsHero,
  LabsBankMap,
  LabsFlagship,
  LabsVignette,
  LabsEngagementCard,
} from '@/components'
import { site } from '@/content/site'

const { labs } = site.pages

export const metadata: Metadata = {
  title: labs.title,
  description: labs.description,
  openGraph: { title: labs.title, description: labs.description },
}

export default function LabsPage() {
  return (
    <main>
      {/* §1 Hero */}
      <LabsHero
        headlineLine1={labs.hero.headlineLine1}
        headlineLine2={labs.hero.headlineLine2}
        body={labs.hero.body}
        disclaimer={labs.hero.disclaimer}
        primaryCta={labs.hero.primaryCta}
        secondaryCta={labs.hero.secondaryCta}
        tertiaryCta={labs.hero.tertiaryCta}
      />

      <SectionDivider />

      {/* §2 Credibility */}
      <Section badge={labs.credibility.badge} title={labs.credibility.title}>
        <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="w-48 h-48 rounded-2xl overflow-hidden bg-warm-200">
            <Image
              src={labs.credibility.photo}
              alt={labs.credibility.photoAlt}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            {labs.credibility.body}
          </p>
        </div>
      </Section>

      <SectionDivider />

      {/* §3 Stats */}
      <Section badge={labs.stats.badge} title={labs.stats.title}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {labs.stats.items.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight mb-2">{s.value}</div>
              <div className="text-sm text-neutral-600">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §4 Bank map */}
      <Section badge={labs.bankMap.badge} title={labs.bankMap.title}>
        <LabsBankMap boxes={labs.bankMap.boxes} caption={labs.bankMap.caption} />
      </Section>

      <SectionDivider />

      {/* §5–§7 Flagships */}
      <Section badge={labs.flagships.badge} title={labs.flagships.title}>
        <div className="space-y-20">
          {labs.flagships.items.map((f, i) => (
            <LabsFlagship key={f.number} {...f} reverse={i % 2 === 1} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §8 Vignettes */}
      <Section badge={labs.vignettes.badge} title={labs.vignettes.title} description={labs.vignettes.intro}>
        <div className="grid md:grid-cols-2 gap-6">
          {labs.vignettes.items.map((v) => (
            <LabsVignette key={v.title} {...v} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §9 Method */}
      <Section badge={labs.method.badge} title={labs.method.title}>
        <ul className="space-y-6 mb-12 max-w-3xl">
          {labs.method.principles.map((p) => (
            <li key={p.title}>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-1">{p.title}</h3>
              <p className="text-neutral-700 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="p-8 bg-warm-200 border border-neutral-500/10 rounded-2xl mb-10">
          <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-4">{labs.method.artifact.heading}</h3>
          <div className="font-mono text-sm bg-white border border-neutral-500/10 rounded-xl p-5 mb-4 text-neutral-800 whitespace-pre-wrap">
            {labs.method.artifact.promptShown}
          </div>
          <div className="font-mono text-sm bg-white border border-brand-orange/40 rounded-xl p-5 mb-4 text-neutral-900 whitespace-pre-wrap">
            {labs.method.artifact.correctionShown}
          </div>
          {labs.method.artifact.prLink && !labs.method.artifact.prLink.startsWith('{{') && (
            <a href={labs.method.artifact.prLink} className="text-sm font-semibold text-brand-orange">
              View the PR →
            </a>
          )}
        </div>

        <p className="text-base italic text-neutral-600 max-w-3xl">
          {labs.method.disclosure}
        </p>
      </Section>

      <SectionDivider />

      {/* §10 Engagement */}
      <Section badge={labs.engagement.badge} title={labs.engagement.title}>
        <div className="grid md:grid-cols-3 gap-6">
          {labs.engagement.cards.map((c) => (
            <LabsEngagementCard key={c.number} {...c} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §11 Closing */}
      <Section badge={labs.closing.badge} title={labs.closing.title} centered>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {labs.closing.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link href={labs.closing.primaryCta.href} className="btn-primary">{labs.closing.primaryCta.label}</Link>
          <Link href={labs.closing.secondaryCta.href} className="btn-secondary">{labs.closing.secondaryCta.label}</Link>
          <Link href={labs.closing.tertiaryCta.href} className="btn-secondary">{labs.closing.tertiaryCta.label}</Link>
        </div>
      </Section>
    </main>
  )
}
```

- [ ] **Step 2: Build**

Run: `npx next build`
Expected: build succeeds, `/labs` listed in output. (Image components will warn about missing screenshots — fix in Task 11.)

- [ ] **Step 3: Commit**

```bash
git add src/app/labs/page.tsx
git commit -m "feat(labs): add /labs page route"
```

---

## Task 10: Routing wiring (header, sitemap, staticwebapp)

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `staticwebapp.config.json`
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Add Labs to Header `mainNav`**

Edit `src/components/Header.tsx`. Replace the `mainNav` array (~lines 9–14):

```typescript
const mainNav = [
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Programs', href: '/programs' },
  { label: 'Reference Architectures', href: '/reference-architectures' },
  { label: 'Labs', href: '/labs' },
  { label: 'About', href: '/about' },
]
```

- [ ] **Step 2: Add /labs to `staticwebapp.config.json`**

Insert into the `routes` array (after the `/programs/mib-insight/thanks` entry, before `/privacy`):

```json
    {
      "route": "/labs",
      "rewrite": "/labs.html"
    },
```

- [ ] **Step 3: Add /labs to `public/sitemap.xml`**

Insert before `</urlset>`:

```xml
  <url>
    <loc>https://atheryon.com.au/labs/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

- [ ] **Step 4: Build**

Run: `npx next build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx staticwebapp.config.json public/sitemap.xml
git commit -m "feat(labs): wire /labs into nav, sitemap, SWA routes"
```

---

## Task 11: Capture screenshots from `labs.atheryon.ai`

**Files:**
- Create: `public/labs/screenshots/ops-board.png`
- Create: `public/labs/screenshots/risk-pricer.png`
- Create: `public/labs/screenshots/schema-editor.png`

- [ ] **Step 1: Authenticate to labs.atheryon.ai (Entra)**

Use the gstack `/setup-browser-cookies` skill or manually export cookies from a browser session signed in to `labs.atheryon.ai`. Required because the live site is gated by Microsoft Entra.

- [ ] **Step 2: Capture three screenshots**

Use the `/browse` gstack skill, or manually:

```bash
# /browse goto https://labs.atheryon.ai/ops
# /browse screenshot public/labs/screenshots/ops-board.png --width 1600

# /browse goto https://labs.atheryon.ai/risk/pricer
# /browse screenshot public/labs/screenshots/risk-pricer.png --width 1600

# /browse goto https://labs.atheryon.ai/build/schema-editor
# /browse screenshot public/labs/screenshots/schema-editor.png --width 1600
```

Target dimensions: ~1600×1000 PNG, optimised to under 400KB each (use `pngquant --quality 70-85` or `cwebp` if size is an issue — but keep `.png` extension to match the copy block).

- [ ] **Step 3: Confirm files render in dev**

Run: `npx next dev` and visit `http://localhost:3000/labs`. Confirm all three flagship screenshots load (no broken-image icon).

- [ ] **Step 4: Commit**

```bash
git add public/labs/screenshots/*.png
git commit -m "feat(labs): add flagship screenshots from labs.atheryon.ai"
```

---

## Task 12: Terry copy review and fill open placeholders

This task is a **stop-the-line gate**. Do not proceed to Task 13 (PDF) or Task 14 (deploy verification) until Terry has signed off and the placeholders are gone.

**Files:**
- Modify: `src/content/site.ts` (the `labs` block, in particular `flagships.items[*].footer` and `method.artifact.*`)

- [ ] **Step 1: Pull real numbers from `git log` for flagship footers**

For each of the three flagships, run in `~/repos/labs-platform`:

```bash
# Trade Board / Operations — paths under src/app/(business)/ops or similar
git log --oneline --since='2026-01-01' -- src/app/\(business\)/ops | wc -l   # PR count proxy

# Risk Pricer / IRRBB
git log --oneline --since='2026-01-01' -- src/app/\(business\)/risk | wc -l

# Schema Editor / CDM intelligence
git log --oneline --since='2026-01-01' -- src/app/\(ods\)/build/schema-editor src/app/\(ods\)/explore/graph | wc -l
```

Use the commit count as the upper bound on PRs (filter to merge commits if Terry prefers). Compute weeks from first-to-last commit date for each surface. Substitute `{{WEEKS}}` and `{{PRS}}` in `src/content/site.ts > pages.labs.flagships.items[*].footer` with the real numbers. If a flagship's numbers do not tell the story (e.g., PR count is misleadingly low because of a single squashed commit), either restate the metric (lines of CDM coverage, themes touched) or — per spec §9 risks — swap the flagship.

- [ ] **Step 2: Confirm §3 stats with Terry**

Default value for "flagship surfaces shipped" is `31` (count from the `labs-platform/src/lib/themes/themes.ts` header comment "31 themes / 121 pages"). Ask Terry:

> Spec §3 needs a number for "flagship surfaces shipped". The themes.ts header comment says 31 themes / 121 pages. Do we want 31 (themes), 121 (pages), or a curated production-grade subset? Default is 31.

Edit `pages.labs.stats.items[2]` accordingly.

- [ ] **Step 3: Resolve §9 prompt artefact**

Ask Terry to nominate one prompt+correction example with a public PR. Paste:
- The prompt as written, into `pages.labs.method.artifact.promptShown` (replacing `{{TERRY_PROMPT_EXAMPLE_PROMPT}}`).
- The correction Terry made, into `correctionShown` (replacing `{{TERRY_PROMPT_EXAMPLE_CORRECTION}}`).
- The PR URL into `prLink` (replacing `{{TERRY_PROMPT_EXAMPLE_PR_URL}}`). Must be a *public* repo / safely shareable.

If Terry has not nominated an artefact, this task blocks. Do not deploy with `{{...}}` placeholders.

- [ ] **Step 4: Read the page out loud**

Per spec §8, manual test: read the full page out loud at desktop width. Does the credibility-then-proof-then-method flow track without stumbling? If the §10 "Take the prompts" card reads as gimmick, apply the spec's fallback: rename to "License the reference architecture" and update `pages.labs.engagement.cards[1].title` only — preserve the body copy and CTA structure.

- [ ] **Step 5: Replace headshot if Terry has supplied a real one**

Drop the real headshot at `public/labs/terry-headshot.jpg` (≥600×600, JPEG <200KB).

- [ ] **Step 6: Commit**

```bash
git add src/content/site.ts public/labs/terry-headshot.jpg
git commit -m "content(labs): real numbers, prompt artefact, headshot — Terry review pass"
```

---

## Task 13: Generate the PDF companion

**Files:**
- Create: `public/labs/pitch-pack.md`
- Create: `public/labs/atheryon-pitch-pack.pdf`

- [ ] **Step 1: Author the Markdown source**

Create `public/labs/pitch-pack.md` mirroring the page copy. One H1 per top-level section, kept in sync with `site.pages.labs`. Layout:

```markdown
# Atheryon Labs — Pitch Pack
*May 2026*

## Most capital-markets platforms take a decade and a thousand engineers. This one took one banker, directing AI.

[body paragraph from labs.hero.body]

*[disclaimer paragraph from labs.hero.disclaimer]*

---

## Twenty years on the inside

[labs.credibility.body]

---

## At a glance

- **8** banking functions covered
- **1** CDM data model — ISDA-compliant, end to end
- **31** flagship surfaces shipped
- **Live at** labs.atheryon.ai

---

## The bank, mapped

[labs.bankMap.boxes as a grid table or bullet list]

*[labs.bankMap.caption]*

---

## Three deep-dives

### §01 Trade Board + Operations
**The problem.** [labs.flagships.items[0].problem]
**How it works.** [labs.flagships.items[0].howItWorks]
*[labs.flagships.items[0].metric]*
*[labs.flagships.items[0].footer with real numbers]*

[Repeat for §02 Risk Pricer + IRRBB and §03 Schema Editor + CDM Intelligence]

---

## What AI couldn't know without the banker

[labs.vignettes.intro]

[For each of the 5 vignettes:]
### [title]
**The implementation AI proposed.** [aiProposed]
**What banking context changed.** [bankerCorrected]

---

## The 10× method

[5 principles as numbered list with title bold + body]

### One real prompt, one real correction
[promptShown]
[correctionShown]
[prLink]

*[disclosure line]*

---

## Three ways to use what is here

[3 engagement cards with title, body, CTA label + URL]

---

## Available for select engagements

[closing body + CTAs]

---

**Atheryon Advisory** · info@atheryon.com.au · atheryon.com.au · Sydney, Australia
```

- [ ] **Step 2: Generate PDF via `/make-pdf`**

Run the `/make-pdf` gstack skill against `public/labs/pitch-pack.md`:

> /make-pdf public/labs/pitch-pack.md --output public/labs/atheryon-pitch-pack.pdf --cover "Atheryon Labs — Pitch Pack — May 2026" --logo public/logo.png

(If the skill writes to a different default path, move the resulting file to `public/labs/atheryon-pitch-pack.pdf`.)

- [ ] **Step 3: Smoke-check the PDF**

Run: `ls -lh public/labs/atheryon-pitch-pack.pdf && open public/labs/atheryon-pitch-pack.pdf`
Expected: file under 5MB, opens cleanly, cover page renders, page numbers present, no DRAFT watermark.

- [ ] **Step 4: Commit**

```bash
git add public/labs/pitch-pack.md public/labs/atheryon-pitch-pack.pdf
git commit -m "feat(labs): add downloadable PDF pitch pack"
```

---

## Task 14: Final verification — build, tests, deploy preview

- [ ] **Step 1: Lint + build**

Run:
```bash
npx next lint
npx next build
```
Expected: clean lint, build succeeds, `/labs` appears in the route list, build size warnings are nominal (<300KB First Load JS).

- [ ] **Step 2: Verify single Claude/Anthropic disclosure**

Run: `grep -c -E '(Claude|Anthropic)' src/content/site.ts | head; grep -n -E '(Claude|Anthropic)' src/content/site.ts`
Expected: matches appear *only* inside the `labs.method.disclosure` line. Any other match is a violation of the spec's "single disclosure" rule.

- [ ] **Step 3: Verify no `{{PLACEHOLDER}}` strings remain in labs copy**

Run: `grep -n '{{' src/content/site.ts | grep -i labs || echo "OK: no labs placeholders"`
Expected: `OK: no labs placeholders`.

- [ ] **Step 4: Run Playwright suite**

Run: `npm run test`
Expected: all tests pass — including the new `tests/labs.spec.ts` and `/labs` route in `tests/routing.spec.ts`.

- [ ] **Step 5: Lighthouse parity**

Run dev preview, run Lighthouse on `/labs`. Expected: SEO and performance scores within 5 points of `/`. Common fixes: lazy-load screenshots (`loading="lazy"` on the three flagship `<Image>` instances if not already defaulted by Next).

- [ ] **Step 6: Visual check at three breakpoints**

Manual or via Playwright `responsive.spec.ts`-style — view `/labs` at 375 / 768 / 1280 / 1920px. Expected: no horizontal overflow; bank-map grid collapses 4→2; flagship layout stacks; engagement cards equal-height.

- [ ] **Step 7: Push branch and open PR**

```bash
git push -u origin feat/labs-pitch-pack
gh pr create --title "feat(labs): /labs pitch pack page + PDF" \
  --body "$(cat <<'EOF'
## Summary
- New public long-scroll page at /labs with hero, credibility, stats, bank map, three flagship deep-dives, five vignettes, the 10× method, three engagement modes, closing CTA.
- New downloadable PDF at /labs/atheryon-pitch-pack.pdf.
- Discreet "Labs" link added to header nav.

Spec: docs/superpowers/specs/2026-05-06-atheryon-pitch-pack-design.md
Plan: docs/superpowers/plans/2026-05-06-atheryon-pitch-pack.md

## Test plan
- [x] /labs returns 200, all section anchors resolve
- [x] All CTAs link to the right targets
- [x] PDF download responds
- [x] Anthropic/Claude appears exactly once
- [x] No {{PLACEHOLDER}} leaks
- [ ] Manual: Lighthouse SEO + performance parity with homepage
- [ ] Manual: read out loud at 1280px — flow tracks
EOF
)"
```

- [ ] **Step 8: Verify on test environment**

After CI deploys, smoke-test `https://icy-tree-093dcc800.6.azurestaticapps.net/labs` (or whatever `dev.atheryon.com.au` resolves to). Walk the page top to bottom, click every CTA, download the PDF.

- [ ] **Step 9: Request review from `abigail-atheryon`**

Per `~/CLAUDE.md`: `gh pr edit --add-reviewer abigail-atheryon`. Promote to production manually after Terry's approval.

---

## Self-review checklist (run after writing this plan)

- [x] Spec §1 problem framing → covered by hero copy (Task 2) and `labs.title`/`description`.
- [x] Spec §2 goal → page exists at /labs (Task 9), PDF generated (Task 13), exports as artefact.
- [x] Spec §3 positioning → bank-first spine kept; one disclosure line in §9 (verified by Task 14 step 2).
- [x] Spec §4 page structure §1–§11 → each has a copy block (Task 2) and a render block (Task 9).
- [x] Spec §5 visual approach → uses existing `Section`/`SectionDivider`; new `LabsHero`, `LabsBankMap`, `LabsFlagship`, `LabsVignette`, `LabsEngagementCard` (Tasks 4–8); screenshots in `public/labs/screenshots/` (Task 11); PDF via `/make-pdf` (Task 13).
- [x] Spec §6 implementation notes → new route `src/app/labs/page.tsx`; copy in `site.pages.labs`; sitemap regenerated (Task 10); header nav decision resolved (add Labs).
- [x] Spec §7 out of scope → respected (no auth, no iframe, no homepage change, no labs-platform change).
- [x] Spec §8 test plan → covered by Task 3 (Playwright), Task 14 (build / Lighthouse / responsive).
- [x] Spec §9 risks → toy-demo inoculation in hero copy; AI demoted from spine; "Take the prompts" fallback in Task 12; numbers pulled from git log in Task 12; one Claude disclosure verified in Task 14.
- [x] Spec §10 open questions → all 8 mapped to specific tasks above (see "Open-Question Tasks" section).
- [x] Placeholder scan: only `{{TERRY_PROMPT_EXAMPLE_*}}` and `{{WEEKS}}` / `{{PRS}}` remain — explicitly gated by Task 12 stop-the-line and Task 14 grep check.
- [x] Type consistency: prop names match across copy block (Task 2) and component definitions (Tasks 4–8) — verified inline.
