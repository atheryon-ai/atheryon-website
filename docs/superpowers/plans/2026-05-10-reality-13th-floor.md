# Atheryon `/reality` — 13th Floor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing homepage and 4 legacy service pages with a 13th-Floor IA: `/reality` campaign pitch (also renders at `/`), three pillar pages (`/data`, `/intelligence`, `/transformation`), an interactive Floor 13 switchboard funnelling visitors to the existing `/labs` sell triad, and an integrated BR2049 × 13th Floor brand palette.

**Architecture:** Pure additive Next.js 14 App Router work — new routes and components are added; legacy routes are deleted in one pass; brand tokens are added without removing the old ones (the legacy token cleanup is v2). All copy lives in `src/content/site.ts` per repo convention. Floor 13 is a single client component (`'use client'`) with a small useState machine; no backend, no API. Hero animation is pure CSS keyframes over two SVG layers.

**Tech Stack:** Next.js 14 (App Router, static export), TypeScript, Tailwind CSS, Playwright E2E, Azure Static Web Apps. No new runtime dependencies.

**Source spec:** `docs/superpowers/specs/2026-05-10-reality-13th-floor-design.md`

---

## File Structure

### Files to create

| Path | Purpose |
|---|---|
| `src/app/reality/page.tsx` | Long-scroll `/reality` page composed from new components and copy from `site.pages.reality` |
| `src/app/data/page.tsx` | Data pillar page using shared pillar template + `site.pages.data` |
| `src/app/intelligence/page.tsx` | Intelligence pillar page |
| `src/app/transformation/page.tsx` | Transformation pillar page |
| `src/components/RealityHero.tsx` | Hero with sepia → glitch → architecture animation (§1 of /reality) |
| `src/components/PillarGrid.tsx` | Three numbered pillar cards (§2 of /reality) |
| `src/components/RealitySplit.tsx` | "Hidden reality" + 3-step timeline (§3 of /reality) |
| `src/components/FloorThirteen.tsx` | Switchboard + Reality Blueprint (§4 of /reality) — client component |
| `src/components/PillarHero.tsx` | Eyebrow ("01 · Data") + name + definition + breadcrumb (pillar page §1) |
| `src/components/PillarServiceGrid.tsx` | "What we do" 3-4 cards (pillar page §3) |
| `src/components/LabsTeaser.tsx` | One-screenshot proof band (homepage §6, pillar page §4) |
| `public/reality/hero-sepia.svg` | Pre-glitch sepia composition |
| `public/reality/hero-architecture.svg` | Post-glitch architecture lattice |
| `public/reality/labs-screenshot-data.png` | /data pillar proof |
| `public/reality/labs-screenshot-intelligence.png` | /intelligence pillar proof |
| `public/reality/labs-screenshot-transformation.png` | /transformation pillar proof |
| `tests/reality.spec.ts` | Playwright suite for /reality page (hero, Floor 13 mechanic, sell-card anchoring) |
| `tests/pillars.spec.ts` | Playwright suite for the 3 pillar pages |
| `tests/redirects.spec.ts` | Smoke test that the 8 legacy URLs resolve correctly via SWA config |

### Files to modify

| Path | Change |
|---|---|
| `src/app/page.tsx` | Replace homepage content with the same component tree as `/reality/page.tsx` (re-export pattern) |
| `src/content/site.ts` | Add `site.pages.reality`, `data`, `intelligence`, `transformation` blocks. Do **not** delete legacy `home`, `cdmPlatform`, etc. blocks yet — they'll be removed in Task 19 once their referencing pages are deleted. |
| `src/components/Header.tsx` | Replace `mainNav` with `[Reality, Data, Intelligence, Transformation, Labs, About]`. Remove header CTA. |
| `src/components/Footer.tsx` | Strip resource columns. Keep: Atheryon · Contact · Privacy · LinkedIn · year |
| `src/components/LabsEngagementCard.tsx` | Add optional `id` prop so anchors work |
| `src/app/labs/page.tsx` | Pass `id="code"` / `"prompts"` / `"advisory"` to the three engagement cards |
| `src/components/index.ts` | Export the 7 new components |
| `tailwind.config.ts` | **Add** `brand.amber` (`#D98B3E`), `brand.amber-light`, `bone` (`#EFEAE0`), `ink` (`#0E1116`), `charcoal` (`#15171A`). Do **not** remove `brand.orange` or `warm.*` — legacy components still depend on them. Cleanup is v2. |
| `src/app/globals.css` | Add CSS custom properties for the new tokens; add the `.glitch` keyframes |
| `staticwebapp.config.json` | Replace 6 legacy `rewrite` entries with `redirect` (301) to pillar URLs; add 2 more (how-we-work, what-we-deliver). Add `/reality`, `/data`, `/intelligence`, `/transformation` rewrite entries. |
| `public/sitemap.xml` | Replace legacy URLs with new IA URLs |
| `tests/homepage.spec.ts` | Update expectations for the new homepage (H1 = "Reality is built on data") |
| `tests/buttons.spec.ts` | Re-confirm CTA selectors still resolve on the new homepage |
| `tests/accessibility.spec.ts` | Run on new pages (no source changes — just verify after rebuild) |

### Files to delete (Task 19, after pillar pages are live)

```
src/app/cdm-platform/
src/app/recovery-migration/
src/app/m-and-a-execution/
src/app/capability-enablement/
src/app/how-we-work/
src/app/what-we-deliver/
src/app/ai-ready-data/
src/app/reference-architectures/
public/atheryon-logo-animation.mp4
```

Plus the corresponding `site.pages.{cdmPlatform,recoveryMigration,...}` blocks in `src/content/site.ts`.

### Out of scope for this plan

- Logo / favicon / wordmark replacement (separate spec track: `docs/superpowers/specs/wordmark-candidates/`)
- Bodoni Moda font integration
- Floor 13 lead capture (Mailchimp / SendGrid) or AI-generated blueprints
- `/floor-13` standalone deep-link route
- Rebranding `/labs` to the new sodium-amber palette (it stays at `#FF9900` for v1)
- `/programs/mib-insight` rebranding (live commerce — do not destabilise)
- `/about`, `/contact` content rewrites (token-only updates if any)

---

## Brand Token Strategy (read this first)

The spec's "rename `brand.orange` → `brand.amber`" is risky — 23+ files reference `brand-orange`. Safer pattern, used throughout this plan:

1. **Add** new tokens (`brand.amber`, `bone`, `ink`, `charcoal`, `brand.blue` keeps existing value `#0A84FF` — we add a separate `brand.deepblue` for `#0D4D7A` to avoid collision).
2. **New code** uses the new tokens.
3. **Existing code** keeps old tokens until the legacy pages are deleted (Task 19) or retuned in a future sprint (e.g. `/labs` retune).
4. **No global rename** in this sprint. The `tests/buttons.spec.ts` rerun confirms nothing breaks.

**Token mapping:**

| New token | Hex | Replaces (eventually) |
|---|---|---|
| `brand.amber` | `#D98B3E` | `brand.orange` (`#FF9900`) — v2 cleanup |
| `brand.amber-light` | `#E5A862` | `brand.orange-light` (`#FFB833`) — v2 |
| `bone` | `#EFEAE0` | `warm.50/100` (`#F7F6F3`) — v2 |
| `ink` | `#0E1116` | (new) — used by Floor 13, footer dark mode |
| `charcoal` | `#15171A` | (new) — text-on-bone alternative to `neutral.900` |
| `brand.deepblue` | `#0D4D7A` | (new) — Data pillar accent |

---

## Language Discipline

- **No Floor 13 lead capture.** The optional input is *not* sent anywhere. Tests assert the absence of any fetch/form-submit on the Floor 13 component.
- **The "Anthropic" / "Claude" mention exists only on `/labs`** (already shipped). No new mentions on `/reality` or pillar pages.
- **One amber accent per pillar page.** Structural blue `#0D4D7A` appears only on `/data` (and on the Floor 13 Data dial when active). Tests assert this.
- **Voice:** enterprise-broad, cinematic, restrained. No "AI-augmented" buzzwords; no "transform your enterprise" verbs without an object.

---

## Task 1: Branch hygiene + asset directories

**Files:**
- Verify branch: `feat/reality-13th-floor` (created in brainstorming session)
- Create: `public/reality/`, `public/reality/.gitkeep`

- [ ] **Step 1: Confirm branch**

Run: `git status && git branch --show-current`
Expected: branch `feat/reality-13th-floor`, clean tree (the spec is already committed at `bfd4a43`).

- [ ] **Step 2: Create asset directory**

Run:
```bash
mkdir -p public/reality
touch public/reality/.gitkeep
```

- [ ] **Step 3: Commit**

```bash
git add public/reality/.gitkeep
git commit -m "chore(reality): scaffold public/reality assets dir"
```

---

## Task 2: Add new brand tokens (additive, non-breaking)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add new colour tokens to `tailwind.config.ts`**

Edit `tailwind.config.ts` — the `colors:` block (lines ~11–45). Add these keys *inside* the existing structure. Do not delete anything.

Replace the existing `'brand'` block (lines 22–28):

```typescript
        'brand': {
          orange: '#FF9900',          // legacy — used by /labs and unchanged components; cleanup in v2
          'orange-light': '#FFB833',
          amber: '#D98B3E',           // new — primary accent for /reality, pillars, Floor 13
          'amber-light': '#E5A862',
          blue: '#0A84FF',            // legacy — Atheryon Blue (canonical); still used by existing pages
          'blue-light': '#4BC0FF',
          deepblue: '#0D4D7A',        // new — Data pillar / Floor 13 Data dial structural accent
          dark: '#0A1A2F',            // legacy
        },
```

Add three new top-level keys *after* the `'neutral':` block (line 44 area, before the closing `colors:` brace):

```typescript
        'bone': '#EFEAE0',            // new — body bg for /reality and pillars; replaces warm-50 in new code
        'ink': '#0E1116',             // new — Floor 13 band, dark sections
        'charcoal': '#15171A',        // new — text-on-bone alternative to neutral.900
```

- [ ] **Step 2: Add CSS custom properties + glitch keyframes to `src/app/globals.css`**

Add at the top of `src/app/globals.css` (after the `@import` and `:root` if present, or in a fresh block):

```css
:root {
  --color-bone: #EFEAE0;
  --color-ink: #0E1116;
  --color-charcoal: #15171A;
  --color-amber: #D98B3E;
  --color-amber-light: #E5A862;
  --color-deepblue: #0D4D7A;
}

@keyframes hero-glitch {
  0%   { opacity: 1; filter: none; transform: translateX(0); }
  45%  { opacity: 1; filter: none; transform: translateX(0); }
  46%  { opacity: 0.85; filter: hue-rotate(8deg); transform: translateX(-2px); }
  48%  { opacity: 0.7; filter: hue-rotate(-6deg); transform: translateX(3px); }
  50%  { opacity: 0.4; filter: hue-rotate(0); transform: translateX(0); }
  52%  { opacity: 0.6; transform: translateX(-1px); }
  54%  { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes architecture-reveal {
  0%   { opacity: 0; }
  45%  { opacity: 0; }
  54%  { opacity: 0.4; }
  60%  { opacity: 1; }
  95%  { opacity: 1; }
  100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .reality-hero-sepia { opacity: 0 !important; animation: none !important; }
  .reality-hero-architecture { opacity: 1 !important; animation: none !important; }
}
```

- [ ] **Step 3: Verify build**

Run: `npx next build`
Expected: build succeeds. New tokens are available; nothing legacy breaks.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat(brand): add 13th Floor palette tokens (amber, bone, ink, deepblue, glitch keyframes)"
```

---

## Task 3: Add `site.pages.reality` copy block

**Files:**
- Modify: `src/content/site.ts` — append a new top-level key inside the `pages:` object

- [ ] **Step 1: Find the insertion point**

Open `src/content/site.ts`. Locate the `pages:` object. Find the `labs:` block (added in PR #11). Insert the new `reality` block *after* `labs` and *before* the closing brace of `pages`.

- [ ] **Step 2: Add the `reality` copy block**

Insert verbatim:

```typescript
    reality: {
      title: 'Atheryon — Architects of Your Reality',
      description: 'Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.',
      hero: {
        headline: 'Reality is built on data. Architect yours.',
        lede: 'Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.',
        primaryCta: { label: 'Enter Floor 13', href: '#floor-13' },
        secondaryCta: { label: 'Explore the pillars', href: '#pillars' },
      },
      pillars: {
        anchor: 'pillars',
        badge: 'Three pillars',
        title: 'Data. Intelligence. Transformation.',
        intro: 'A simple three-pillar explanation of how we architect reality.',
        items: [
          {
            number: '01',
            title: 'Data',
            body: 'Foundations: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.',
            href: '/data',
          },
          {
            number: '02',
            title: 'Intelligence',
            body: 'Decision advantage: analytics, AI implementation, forecasting, automation, insight products.',
            href: '/intelligence',
          },
          {
            number: '03',
            title: 'Transformation',
            body: 'Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.',
            href: '/transformation',
          },
        ],
      },
      transition: {
        badge: 'The hidden reality',
        title: 'Beneath every enterprise is a hidden operating reality.',
        body: 'Fragmented systems create fragmented decisions. Atheryon makes the underlying architecture visible, intelligent, and ready for transformation.',
        cta: { label: 'Reveal the hidden layer', href: '#floor-13' },
        steps: [
          { number: '1', title: 'Fragmented data', body: 'Disconnected sources, inconsistent reporting, unclear ownership.' },
          { number: '2', title: 'Structured intelligence', body: 'Reliable pipelines, models, dashboards, AI readiness, decision systems.' },
          { number: '3', title: 'Real transformation', body: 'Cloud, AI, and operating change aligned to measurable business outcomes.' },
        ],
      },
      floor13: {
        anchor: 'floor-13',
        badge: 'Floor 13',
        title: 'Choose the issue that best describes your current reality.',
        intro: 'The switchboard generates a Reality Blueprint below.',
        dials: [
          { id: 'data', title: 'Data pain', body: '"Our data is fragmented, inconsistent, or inaccessible."', cta: 'Plug into Data' },
          { id: 'intelligence', title: 'Intelligence pain', body: '"We have data, but not enough predictive or decision value."', cta: 'Plug into Intelligence' },
          { id: 'transformation', title: 'Transformation pain', body: '"We need change, but the roadmap and operating model are unclear."', cta: 'Plug into Transformation' },
        ],
        inputPlaceholder: 'Optional: type your biggest data or transformation challenge',
        inputCta: 'Generate Blueprint',
        blueprints: {
          data: {
            title: 'Reality Blueprint: Data Foundation',
            intro: 'Your current reality appears to be constrained by fragmented data sources, inconsistent visibility, or unclear data ownership.',
            bullets: [
              'Map critical data sources and business decision points.',
              'Design a unified architecture across cloud, governance, pipelines, and reporting.',
              'Prioritise the first high-value data product that can prove momentum.',
            ],
          },
          intelligence: {
            title: 'Reality Blueprint: Intelligence Layer',
            intro: 'Your organisation may have data available, but the intelligence layer is not yet turning it into prediction, automation, or better decisions.',
            bullets: [
              'Assess analytics maturity and AI readiness.',
              'Identify use cases where models, automation, or decision dashboards can create measurable value.',
              'Build an intelligence layer connected to trusted enterprise data foundations.',
            ],
          },
          transformation: {
            title: 'Reality Blueprint: Transformation Pathway',
            intro: 'Your transformation challenge appears to be less about ambition and more about architecture, roadmap, ownership, and execution.',
            bullets: [
              'Define the target operating reality and the systems required to support it.',
              'Sequence data, cloud, AI, process, and adoption initiatives into a practical roadmap.',
              'Connect transformation activity to measurable business outcomes.',
            ],
          },
          custom: {
            title: 'Reality Blueprint: Custom Challenge',
            intro: 'Your custom challenge has been captured.',
            bullets: [
              'Classify the challenge across data, intelligence, and transformation.',
              'Generate recommended first moves based on the selected pain point.',
              'Continue the conversation in a Reality Architecture Session.',
            ],
          },
        },
        sellCardsHeading: 'Your next moves',
        recommendation: {
          data: 'code',
          intelligence: 'prompts',
          transformation: 'advisory',
        },
        sellCards: [
          { id: 'code', title: 'Take the code', body: 'Fork the labs-platform repo. Inspect, deploy, extend.', ctaLabel: 'Inspect →', ctaHref: '/labs#code' },
          { id: 'prompts', title: 'Take the prompts', body: "A curated archive of the prompts and corrections that produced the platform — paired with Terry's reasoning.", ctaLabel: 'License →', ctaHref: '/labs#prompts' },
          { id: 'advisory', title: 'Take the advisory', body: 'Atheryon Advisory engagements: 30-day diagnostic, prototype sprint, or full data-platform recovery.', ctaLabel: 'Engage →', ctaHref: '/labs#advisory' },
        ],
        closingCta: { label: 'Or — book a Reality Architecture Session', href: '/contact' },
      },
      methodology: {
        anchor: 'methodology',
        badge: 'How we architect reality',
        title: 'Built from controls, not user stories.',
        principles: [
          { title: 'Built from regulatory artefacts and operational controls.', body: 'Most platforms start "as a user I want…". We start with the artefact, the control, the risk view.' },
          { title: 'Started from the data model, not the screen.', body: 'CDM-first, then surfaces. Every screen is a projection of the contract.' },
          { title: 'Generate variants, then narrow.', body: 'AI generates implementation candidates in minutes. Senior judgment chooses, corrects, and ships.' },
          { title: 'Working decision surface, not a slide deck.', body: 'Inspectable, deployable, extendable. Proof, not promise.' },
        ],
      },
      proof: {
        badge: 'Proof — Atheryon Labs',
        title: 'We use this method. Here is the artifact.',
        body: 'Atheryon Labs is a CDM-native reference platform across eight banking functions, built using the /reality approach. A working artefact you can inspect.',
        screenshot: '/labs/screenshots/ops-board.png',
        screenshotAlt: 'Atheryon Labs trade board screenshot',
        cta: { label: 'See the artefact →', href: '/labs' },
      },
      closing: {
        badge: 'Available for select engagements',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation to identify the hidden architecture beneath your data estate and define the first transformation move.',
        primaryCta: { label: 'Request a session', href: '/contact' },
        secondaryCta: { label: 'See the artefact', href: '/labs' },
      },
    },
```

- [ ] **Step 3: Verify build**

Run: `npx next build`
Expected: build succeeds. (Page does not yet exist — copy block is unused but typed.)

- [ ] **Step 4: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(reality): add site.pages.reality copy block"
```

---

## Task 4: Add `site.pages.{data,intelligence,transformation}` copy blocks

**Files:**
- Modify: `src/content/site.ts` — append three more keys inside `pages:`, after `reality:`

- [ ] **Step 1: Add the three pillar copy blocks**

Insert after the `reality:` block:

```typescript
    data: {
      title: 'Data — Atheryon',
      description: 'The foundation: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.',
      hero: {
        eyebrow: '01 · Data',
        title: 'Data',
        definition: 'The foundation: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.',
        positioning: 'Most enterprises have data. Few have a foundation that intelligence and transformation can stand on. We build that foundation.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most enterprise data programs stall.',
        bullets: [
          'Fragmented sources with no shared ownership or model.',
          'Governance written as policy, not encoded in the platform.',
          'Schemas drift between what the business agrees and what the system enforces.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'From fragmented sources to a decision-grade foundation.',
        cards: [
          { title: 'CDM Platform', body: 'ISDA Common Domain Model implementations — schemas, validators, transforms, governance — for capital-markets data estates.' },
          { title: 'Reference Architectures', body: 'Cloud-native architectures for trading, risk, ops, and reporting — built on CDM, deployable into your estate.' },
          { title: 'Data Foundations', body: 'Pipelines, modelling, governance, lineage, and unified visibility across your enterprise data estate.' },
          { title: 'Schema Modelling', body: 'CDM-first schema design with extension and wrapping patterns for bank-internal artefacts.' },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See the data foundation in Labs.',
        body: 'The Schema Editor, ODS, and Validators in Atheryon Labs are the data layer in action — 1,019 CDM types, 42 ISO 20022 messages, 14 FpML schemas.',
        screenshot: '/reality/labs-screenshot-data.png',
        screenshotAlt: 'Atheryon Labs schema editor and ODS surfaces',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Not sure where to start?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation focused on your data foundation.',
        cta: { label: 'Request a session', href: '/contact' },
      },
    },
    intelligence: {
      title: 'Intelligence — Atheryon',
      description: 'Decision advantage: analytics, AI implementation, forecasting, automation, insight products.',
      hero: {
        eyebrow: '02 · Intelligence',
        title: 'Intelligence',
        definition: 'Decision advantage: analytics, AI implementation, forecasting, automation, insight products.',
        positioning: 'Data alone does not improve decisions. We build the intelligence layer that turns trusted data into prediction, automation, and decision support.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most AI initiatives stall.',
        bullets: [
          'Models built on ungoverned data fail audits and lose stakeholder trust.',
          'Insight projects deliver dashboards, not decision change.',
          'Automation gets bolted on instead of designed into the operating model.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'Decision advantage from foundations you trust.',
        cards: [
          { title: 'AI Readiness', body: 'Assess data maturity, governance, and model lifecycle readiness before AI investment.' },
          { title: 'Analytics & ML', body: 'Production analytics dashboards, ML pipelines, and the data quality controls that make them trustworthy.' },
          { title: 'Insight Products', body: 'Decision surfaces — not dashboards. Built around the choices the business actually has to make.' },
          { title: 'AI-Augmented Decisioning', body: 'Workflow-level AI integration with human-in-the-loop controls and audit trails.' },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See the intelligence layer in Labs.',
        body: 'The Analytics Dashboard and ML Workbench in Atheryon Labs show the intelligence layer running on top of governed CDM data — including 11 AI-detected operational patterns.',
        screenshot: '/reality/labs-screenshot-intelligence.png',
        screenshotAlt: 'Atheryon Labs analytics dashboard and ML workbench',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Not sure where to start?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation focused on your intelligence layer.',
        cta: { label: 'Request a session', href: '/contact' },
      },
    },
    transformation: {
      title: 'Transformation — Atheryon',
      description: 'Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.',
      hero: {
        eyebrow: '03 · Transformation',
        title: 'Transformation',
        definition: 'Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.',
        positioning: 'Capability is not change. Transformation is the operating shift that connects new platforms and intelligence to measurable business outcomes — and to the people who must adopt them.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most transformations stall mid-program.',
        bullets: [
          'Roadmaps bought from a deck rarely survive contact with the operating model.',
          'New platforms ship without the workflow redesign that makes them load-bearing.',
          'Adoption is treated as comms instead of as workflow integration.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'From distressed program to delivered outcome.',
        cards: [
          { title: 'Recovery & Migration', body: 'Diagnose distressed programs, restructure delivery, migrate critical data and platforms safely.' },
          { title: 'M&A Execution', body: 'Day-1 readiness, Day-100 integration, divestiture carve-outs — the data and platform spine of M&A.' },
          { title: 'Capability Enablement', body: 'Build internal data, AI, and platform capability in the institutions we serve, not on top of them.' },
          { title: 'Engagement Shapes', body: '30-day diagnostic, prototype sprint, or full platform engagement — matched to the risk profile of the work.' },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See transformation in Labs.',
        body: 'The Trade Board, Operations, and lifecycle surfaces in Atheryon Labs are the operating change in action — break triage, confirmations, lifecycle management, and SSI on a unified CDM event model.',
        screenshot: '/reality/labs-screenshot-transformation.png',
        screenshotAlt: 'Atheryon Labs trade board and operations surfaces',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Not sure where to start?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation focused on your transformation pathway.',
        cta: { label: 'Request a session', href: '/contact' },
      },
    },
```

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(reality): add site.pages.{data,intelligence,transformation} copy blocks"
```

---

## Task 5: Write failing Playwright tests for `/reality`

**Files:**
- Create: `tests/reality.spec.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/reality.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('/reality page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reality')
  })

  test('hero renders with H1 and both CTAs', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /Reality is built on data/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Enter Floor 13/i }).first()).toHaveAttribute('href', /#floor-13/)
    await expect(page.getByRole('link', { name: /Explore the pillars/i })).toHaveAttribute('href', /#pillars/)
  })

  test('three pillar cards link to the pillar pages', async ({ page }) => {
    const cards = page.getByTestId('reality-pillar-card')
    await expect(cards).toHaveCount(3)
    await expect(cards.nth(0).getByRole('link')).toHaveAttribute('href', '/data')
    await expect(cards.nth(1).getByRole('link')).toHaveAttribute('href', '/intelligence')
    await expect(cards.nth(2).getByRole('link')).toHaveAttribute('href', '/transformation')
  })

  test('Floor 13 switchboard has 3 dial buttons', async ({ page }) => {
    const dials = page.getByTestId('floor13-dial')
    await expect(dials).toHaveCount(3)
  })

  test('clicking the Data dial reveals the Data blueprint', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    await expect(page.getByTestId('floor13-blueprint')).toBeVisible()
    await expect(page.getByTestId('floor13-blueprint')).toContainText('Reality Blueprint: Data Foundation')
  })

  test('re-clicking another dial swaps blueprint content (not stacks)', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    await page.getByTestId('floor13-dial').nth(1).getByRole('button').click()
    const titles = page.getByTestId('floor13-blueprint').locator('h3')
    await expect(titles).toHaveCount(1)
    await expect(titles).toContainText('Reality Blueprint: Intelligence Layer')
  })

  test('typed challenge appears in the rendered intro line', async ({ page }) => {
    await page.getByTestId('floor13-input').fill('our risk warehouse is a swamp')
    await page.getByTestId('floor13-generate').click()
    await expect(page.getByTestId('floor13-blueprint')).toContainText('our risk warehouse is a swamp')
  })

  test('Data dial highlights the "Take the code" sell card', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    const recommended = page.getByTestId('floor13-sellcard').filter({ hasText: 'Take the code' })
    await expect(recommended).toHaveAttribute('data-recommended', 'true')
  })

  test('three sell cards link to /labs anchors', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    const cards = page.getByTestId('floor13-sellcard')
    await expect(cards).toHaveCount(3)
    await expect(cards.nth(0).getByRole('link')).toHaveAttribute('href', '/labs#code')
    await expect(cards.nth(1).getByRole('link')).toHaveAttribute('href', '/labs#prompts')
    await expect(cards.nth(2).getByRole('link')).toHaveAttribute('href', '/labs#advisory')
  })

  test('no fetch or POST happens when generating a blueprint', async ({ page }) => {
    let networkCalls = 0
    page.on('request', (r) => {
      if (r.method() !== 'GET' || /\/api\//.test(r.url())) networkCalls++
    })
    await page.getByTestId('floor13-input').fill('any text')
    await page.getByTestId('floor13-generate').click()
    expect(networkCalls).toBe(0)
  })

  test('Anthropic and Claude do not appear on /reality', async ({ page }) => {
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/Anthropic/)
    expect(text).not.toMatch(/\bClaude\b/)
  })
})
```

- [ ] **Step 2: Run the suite — expect all to fail (page does not yet exist)**

Run: `npx playwright test tests/reality.spec.ts`
Expected: all tests fail with a 404 / `page not found`.

- [ ] **Step 3: Commit**

```bash
git add tests/reality.spec.ts
git commit -m "test(reality): add /reality page expectations (failing)"
```

---

## Task 6: Write failing Playwright tests for pillar pages

**Files:**
- Create: `tests/pillars.spec.ts`

- [ ] **Step 1: Create `tests/pillars.spec.ts`**

```typescript
import { test, expect } from '@playwright/test'

const pillars = [
  { path: '/data', eyebrow: '01 · Data', h1: 'Data', proofAlt: /schema editor/i },
  { path: '/intelligence', eyebrow: '02 · Intelligence', h1: 'Intelligence', proofAlt: /analytics/i },
  { path: '/transformation', eyebrow: '03 · Transformation', h1: 'Transformation', proofAlt: /trade board/i },
]

for (const p of pillars) {
  test.describe(p.path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(p.path)
    })

    test('returns 200 with hero eyebrow + H1 + breadcrumb', async ({ page }) => {
      await expect(page.getByText(p.eyebrow)).toBeVisible()
      await expect(page.getByRole('heading', { level: 1, name: p.h1 })).toBeVisible()
      await expect(page.getByRole('link', { name: /Back to Reality/i })).toHaveAttribute('href', '/reality')
    })

    test('"What we do" grid renders 4 cards', async ({ page }) => {
      const cards = page.getByTestId('pillar-service-card')
      await expect(cards).toHaveCount(4)
    })

    test('Floor 13 nudge is present', async ({ page }) => {
      await expect(page.getByRole('link', { name: /Generate a Reality Blueprint/i })).toHaveAttribute('href', '/#floor-13')
    })

    test('proof band has the right screenshot alt text', async ({ page }) => {
      await expect(page.getByAltText(p.proofAlt)).toBeVisible()
    })

    test('closing CTA links to /contact', async ({ page }) => {
      await expect(page.getByRole('link', { name: /Request a session/i })).toHaveAttribute('href', '/contact')
    })
  })
}
```

- [ ] **Step 2: Run — expect all to fail**

Run: `npx playwright test tests/pillars.spec.ts`
Expected: all 15 tests fail with 404.

- [ ] **Step 3: Commit**

```bash
git add tests/pillars.spec.ts
git commit -m "test(reality): add pillar page expectations (failing)"
```

---

## Task 7: Write failing Playwright tests for redirects

**Files:**
- Create: `tests/redirects.spec.ts`

- [ ] **Step 1: Create `tests/redirects.spec.ts`**

```typescript
import { test, expect } from '@playwright/test'

const redirects = [
  { from: '/cdm-platform', to: '/data' },
  { from: '/recovery-migration', to: '/transformation' },
  { from: '/m-and-a-execution', to: '/transformation' },
  { from: '/capability-enablement', to: '/transformation' },
  { from: '/how-we-work', to: '/reality' },
  { from: '/what-we-deliver', to: '/transformation' },
  { from: '/ai-ready-data', to: '/intelligence' },
  { from: '/reference-architectures', to: '/data' },
]

for (const { from, to } of redirects) {
  test(`${from} redirects to ${to}`, async ({ page }) => {
    const response = await page.goto(from)
    // SWA may serve as 200 after rewrite, so we check the final URL
    expect(page.url()).toContain(to)
    expect(response?.status()).toBeLessThan(400)
  })
}
```

**Note:** Locally (via `next dev`), redirects defined in `staticwebapp.config.json` are NOT executed by Next.js — they only fire when deployed to Azure SWA. This test is therefore a **deployment smoke test**: it will pass on the deployed test/prod environment but will fail locally. Mark the suite with a `test.skip` guard if `process.env.E2E_AGAINST_DEPLOYED !== 'true'`.

Add this guard at the top of the file (after the import):

```typescript
test.skip(
  process.env.E2E_AGAINST_DEPLOYED !== 'true',
  'Redirects are enforced by Azure SWA — only valid against deployed env. Set E2E_AGAINST_DEPLOYED=true to run.',
)
```

- [ ] **Step 2: Run locally — expect skip**

Run: `npx playwright test tests/redirects.spec.ts`
Expected: all tests skipped.

- [ ] **Step 3: Commit**

```bash
git add tests/redirects.spec.ts
git commit -m "test(reality): add redirect smoke (skipped locally; runs against deployed env)"
```

---

## Task 8: Build `RealityHero` with sepia → glitch → architecture animation

**Files:**
- Create: `src/components/RealityHero.tsx`
- Create: `public/reality/hero-sepia.svg`
- Create: `public/reality/hero-architecture.svg`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Create the sepia layer SVG**

Create `public/reality/hero-sepia.svg`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sepiabg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C9B488" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#7A5C3A" stop-opacity="0.55"/>
    </linearGradient>
    <radialGradient id="hazefade" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#EFEAE0" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0E1116" stop-opacity="0.6"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#sepiabg)"/>
  <!-- placeholder building silhouettes -->
  <g fill="#3A2D1B" opacity="0.55">
    <rect x="60" y="380" width="160" height="380"/>
    <rect x="240" y="320" width="120" height="440"/>
    <rect x="380" y="430" width="200" height="330"/>
    <rect x="600" y="280" width="140" height="480"/>
    <rect x="760" y="380" width="180" height="380"/>
    <rect x="960" y="350" width="160" height="410"/>
  </g>
  <!-- horizon line -->
  <rect x="0" y="500" width="1200" height="2" fill="#1F1810" opacity="0.4"/>
  <rect width="1200" height="800" fill="url(#hazefade)"/>
</svg>
```

- [ ] **Step 2: Create the architecture lattice SVG**

Create `public/reality/hero-architecture.svg`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <rect width="1200" height="800" fill="#0E1116"/>
  <!-- amber lattice -->
  <g stroke="#D98B3E" stroke-width="1" fill="none" opacity="0.85">
    <path d="M0 600 L1200 600"/>
    <path d="M0 660 L1200 660"/>
    <path d="M0 720 L1200 720"/>
    <path d="M150 0 L150 800"/>
    <path d="M300 0 L300 800"/>
    <path d="M450 0 L450 800"/>
    <path d="M600 0 L600 800"/>
    <path d="M750 0 L750 800"/>
    <path d="M900 0 L900 800"/>
    <path d="M1050 0 L1050 800"/>
  </g>
  <!-- structural blue nodes -->
  <g fill="#0D4D7A">
    <circle cx="300" cy="600" r="6"/>
    <circle cx="450" cy="660" r="6"/>
    <circle cx="600" cy="600" r="6"/>
    <circle cx="750" cy="720" r="6"/>
    <circle cx="900" cy="660" r="6"/>
  </g>
  <!-- amber accent nodes -->
  <g fill="#D98B3E">
    <circle cx="150" cy="660" r="8"/>
    <circle cx="1050" cy="600" r="8"/>
  </g>
  <!-- subtle radial glow -->
  <defs>
    <radialGradient id="glow" cx="50%" cy="65%" r="55%">
      <stop offset="0%" stop-color="#D98B3E" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0E1116" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#glow)"/>
</svg>
```

- [ ] **Step 3: Implement the component**

Create `src/components/RealityHero.tsx`:

```tsx
'use client'

import Link from 'next/link'

interface RealityHeroProps {
  headline: string
  lede: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export function RealityHero({ headline, lede, primaryCta, secondaryCta }: RealityHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[640px] md:min-h-[720px] flex items-center bg-bone">
      <div
        aria-hidden
        className="reality-hero-sepia absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/reality/hero-sepia.svg')",
          animation: 'hero-glitch 30s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="reality-hero-architecture absolute inset-0 bg-no-repeat bg-cover bg-center opacity-0"
        style={{
          backgroundImage: "url('/reality/hero-architecture.svg')",
          animation: 'architecture-reveal 30s ease-in-out infinite',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bone/80 via-bone/30 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-6 py-20 md:py-24">
        <h1 className="font-display text-5xl md:text-6xl lg:text-display-lg text-charcoal tracking-tight leading-[1.05] mb-6 max-w-4xl">
          {headline}
        </h1>
        <p className="text-lg md:text-subheading text-charcoal/80 max-w-2xl mb-10 leading-relaxed">
          {lede}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Export from `src/components/index.ts`**

Append:
```typescript
export { RealityHero } from './RealityHero'
```

- [ ] **Step 5: Build to verify TypeScript**

Run: `npx next build`
Expected: build succeeds. (Component is unused so no page renders it yet.)

- [ ] **Step 6: Commit**

```bash
git add src/components/RealityHero.tsx src/components/index.ts public/reality/hero-sepia.svg public/reality/hero-architecture.svg
git commit -m "feat(reality): add RealityHero with sepia→glitch→architecture animation"
```

---

## Task 9: Build `PillarGrid` (homepage §2)

**Files:**
- Create: `src/components/PillarGrid.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

Create `src/components/PillarGrid.tsx`:

```tsx
import Link from 'next/link'

interface PillarItem {
  number: string
  title: string
  body: string
  href: string
}

interface PillarGridProps {
  items: PillarItem[]
  anchor?: string
}

export function PillarGrid({ items, anchor }: PillarGridProps) {
  return (
    <div id={anchor} className="grid md:grid-cols-3 gap-6">
      {items.map((item) => (
        <article
          key={item.number}
          data-testid="reality-pillar-card"
          className="p-8 bg-white border border-charcoal/10 rounded-2xl"
        >
          <div className="text-sm font-mono text-amber mb-4" style={{ color: '#D98B3E' }}>{item.number}</div>
          <h3 className="font-display text-3xl text-charcoal tracking-tight mb-4">{item.title}</h3>
          <p className="text-charcoal/80 leading-relaxed mb-6">{item.body}</p>
          <Link href={item.href} className="text-sm font-semibold text-charcoal underline-offset-4 hover:underline">
            Explore {item.title} →
          </Link>
        </article>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { PillarGrid } from './PillarGrid'
```

- [ ] **Step 3: Build**

Run: `npx next build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/PillarGrid.tsx src/components/index.ts
git commit -m "feat(reality): add PillarGrid component"
```

---

## Task 10: Build `RealitySplit` (homepage §3)

**Files:**
- Create: `src/components/RealitySplit.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

Create `src/components/RealitySplit.tsx`:

```tsx
import Link from 'next/link'

interface Step {
  number: string
  title: string
  body: string
}

interface RealitySplitProps {
  title: string
  body: string
  cta: { label: string; href: string }
  steps: Step[]
}

export function RealitySplit({ title, body, cta, steps }: RealitySplitProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div>
        <h2 className="font-display text-4xl md:text-5xl text-charcoal tracking-tight leading-[1.05] mb-6">
          {title}
        </h2>
        <p className="text-lg text-charcoal/80 leading-relaxed mb-8 max-w-xl">{body}</p>
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {cta.label}
        </Link>
      </div>
      <ol className="space-y-4">
        {steps.map((step) => (
          <li
            key={step.number}
            className="grid grid-cols-[48px_1fr] gap-5 items-start p-5 bg-white border border-charcoal/10 rounded-xl"
          >
            <div className="w-12 h-12 grid place-items-center border-2 border-charcoal rounded-full font-bold text-charcoal">
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal mb-1">{step.title}</h3>
              <p className="text-charcoal/75 leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { RealitySplit } from './RealitySplit'
```

- [ ] **Step 3: Build**

Run: `npx next build`

- [ ] **Step 4: Commit**

```bash
git add src/components/RealitySplit.tsx src/components/index.ts
git commit -m "feat(reality): add RealitySplit component"
```

---

## Task 11: Build `FloorThirteen` (homepage §4 — the centerpiece)

**Files:**
- Create: `src/components/FloorThirteen.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement the client component**

Create `src/components/FloorThirteen.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

type PillarId = 'data' | 'intelligence' | 'transformation'
type Selection = PillarId | 'custom' | null

interface Dial {
  id: PillarId
  title: string
  body: string
  cta: string
}

interface Blueprint {
  title: string
  intro: string
  bullets: string[]
}

interface SellCard {
  id: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

interface FloorThirteenProps {
  anchor?: string
  badge: string
  title: string
  intro: string
  dials: Dial[]
  inputPlaceholder: string
  inputCta: string
  blueprints: {
    data: Blueprint
    intelligence: Blueprint
    transformation: Blueprint
    custom: Blueprint
  }
  sellCardsHeading: string
  recommendation: Record<PillarId, string>
  sellCards: SellCard[]
  closingCta: { label: string; href: string }
}

export function FloorThirteen({
  anchor,
  badge,
  title,
  intro,
  dials,
  inputPlaceholder,
  inputCta,
  blueprints,
  sellCardsHeading,
  recommendation,
  sellCards,
  closingCta,
}: FloorThirteenProps) {
  const [selected, setSelected] = useState<Selection>(null)
  const [customText, setCustomText] = useState('')

  const handleDial = (id: PillarId) => {
    setSelected(id)
  }

  const handleGenerate = () => {
    if (!selected && customText.trim()) {
      setSelected('custom')
    }
  }

  const activeBlueprint: Blueprint | null = selected ? blueprints[selected] : null

  const recommendedSellId =
    selected && selected !== 'custom' ? recommendation[selected] : null

  const introText =
    activeBlueprint && customText.trim()
      ? `${activeBlueprint.intro} Your stated challenge: "${customText.trim()}".`
      : activeBlueprint?.intro

  return (
    <section
      id={anchor}
      className="px-6 section-spacing"
      style={{ backgroundColor: '#0E1116', color: '#EFEAE0' }}
    >
      <div className="max-w-container mx-auto">
        <div className="mb-10 md:mb-14">
          <div className="mb-5 text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: '#D98B3E' }}>
            {badge}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight mb-5 leading-[1.05]">
            {title}
          </h2>
          <p className="text-lg md:text-subheading leading-relaxed max-w-3xl opacity-80">{intro}</p>
        </div>

        {/* Switchboard */}
        <div className="grid md:grid-cols-3 gap-5">
          {dials.map((dial) => {
            const isActive = selected === dial.id
            const isData = dial.id === 'data'
            return (
              <div
                key={dial.id}
                data-testid="floor13-dial"
                className="p-6 border border-dashed rounded-xl"
                style={{
                  borderColor: isActive ? (isData ? '#0D4D7A' : '#D98B3E') : 'rgba(239,234,224,0.3)',
                  backgroundColor: isActive ? 'rgba(239,234,224,0.04)' : 'transparent',
                }}
              >
                <h3 className="text-xl font-bold mb-3">{dial.title}</h3>
                <p className="opacity-80 mb-5 leading-relaxed">{dial.body}</p>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleDial(dial.id)}
                  className="w-full px-4 py-2.5 text-sm font-semibold rounded-full transition-colors border-2"
                  style={{
                    borderColor: '#EFEAE0',
                    color: isActive ? '#0E1116' : '#EFEAE0',
                    backgroundColor: isActive ? '#EFEAE0' : 'transparent',
                  }}
                >
                  {dial.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Input row */}
        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-3">
          <input
            data-testid="floor13-input"
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={inputPlaceholder}
            className="px-4 py-3 rounded-full bg-transparent border border-bone/30 text-bone placeholder:text-bone/50 focus:outline-none focus:border-bone"
          />
          <button
            data-testid="floor13-generate"
            type="button"
            onClick={handleGenerate}
            className="px-6 py-3 text-sm font-semibold text-ink bg-bone rounded-full"
          >
            {inputCta}
          </button>
        </div>

        {/* Blueprint panel */}
        {activeBlueprint && (
          <div
            data-testid="floor13-blueprint"
            aria-live="polite"
            className="mt-10 p-8 rounded-xl border"
            style={{ borderColor: 'rgba(184,215,239,0.4)', backgroundColor: 'rgba(7,25,38,0.6)' }}
          >
            <h3 className="text-2xl font-bold mb-4">{activeBlueprint.title}</h3>
            <p className="opacity-90 leading-relaxed mb-6">{introText}</p>
            <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-3">
              The hidden architecture
            </h4>
            <ul className="space-y-2 mb-8">
              {activeBlueprint.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span style={{ color: '#D98B3E' }}>•</span>
                  <span className="opacity-90 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-4">
              {sellCardsHeading}
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {sellCards.map((card) => {
                const isRecommended = card.id === recommendedSellId
                return (
                  <div
                    key={card.id}
                    data-testid="floor13-sellcard"
                    data-recommended={isRecommended ? 'true' : 'false'}
                    className="p-5 rounded-xl border-2"
                    style={{
                      borderColor: isRecommended ? '#D98B3E' : 'rgba(239,234,224,0.2)',
                      backgroundColor: 'rgba(239,234,224,0.04)',
                    }}
                  >
                    <h5 className="text-lg font-bold mb-2">{card.title}</h5>
                    <p className="text-sm opacity-80 leading-relaxed mb-4">{card.body}</p>
                    <Link
                      href={card.ctaHref}
                      className="text-sm font-semibold"
                      style={{ color: isRecommended ? '#D98B3E' : '#EFEAE0' }}
                    >
                      {card.ctaLabel}
                    </Link>
                  </div>
                )
              })}
            </div>

            <Link
              href={closingCta.href}
              className="inline-flex items-center text-sm font-semibold opacity-80 hover:opacity-100"
              style={{ color: '#EFEAE0' }}
            >
              {closingCta.label} →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { FloorThirteen } from './FloorThirteen'
```

- [ ] **Step 3: Build**

Run: `npx next build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/FloorThirteen.tsx src/components/index.ts
git commit -m "feat(reality): add FloorThirteen client component with state machine + sell cards"
```

---

## Task 12: Add anchor IDs to existing `/labs` engagement cards

**Files:**
- Modify: `src/components/LabsEngagementCard.tsx`
- Modify: `src/app/labs/page.tsx`

- [ ] **Step 1: Add optional `id` prop to `LabsEngagementCard`**

Open `src/components/LabsEngagementCard.tsx`. Locate the props interface and the JSX root.

Change the props interface to:

```typescript
interface LabsEngagementCardProps {
  number: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
  id?: string
}
```

Change the function signature:

```typescript
export function LabsEngagementCard({ number, title, body, ctaLabel, ctaHref, id }: LabsEngagementCardProps) {
```

Add `id={id}` to the wrapping `<div>`:

```tsx
    <div
      id={id}
      data-testid="labs-engagement-card"
      className="..."
    >
```

- [ ] **Step 2: Pass anchor IDs from `/labs/page.tsx`**

Open `src/app/labs/page.tsx`. Find the §10 Engagement section (around line 137-141):

```tsx
        <div className="grid md:grid-cols-3 gap-6">
          {labs.engagement.cards.map((c) => (
            <LabsEngagementCard key={c.number} {...c} />
          ))}
        </div>
```

The existing copy block already has `id: 'code'` / `'prompts'` / `'advisory'` keys in `site.ts > pages.labs.engagement.cards` — check it does. Open `src/content/site.ts`, find `labs.engagement.cards`. If the items only have `number`, `title`, `body`, `ctaLabel`, `ctaHref` — add an `id` key to each:

```typescript
        cards: [
          { id: 'code', number: '01', title: 'Take the code.', /* … */ },
          { id: 'prompts', number: '02', title: 'Take the prompts.', /* … */ },
          { id: 'advisory', number: '03', title: 'Take the advisory.', /* … */ },
        ],
```

The `LabsEngagementCard` already spreads `{...c}` so the `id` will flow through.

- [ ] **Step 3: Add a Playwright assertion to existing `tests/labs.spec.ts`**

Append a new test inside the `test.describe('/labs page', …)` block in `tests/labs.spec.ts`:

```typescript
  test('engagement cards have anchor IDs', async ({ page }) => {
    await expect(page.locator('#code')).toBeVisible()
    await expect(page.locator('#prompts')).toBeVisible()
    await expect(page.locator('#advisory')).toBeVisible()
  })
```

- [ ] **Step 4: Build + run the labs test**

Run:
```bash
npx next build
npx playwright test tests/labs.spec.ts -g "anchor IDs"
```
Expected: build succeeds; new test passes.

- [ ] **Step 5: Commit**

```bash
git add src/components/LabsEngagementCard.tsx src/app/labs/page.tsx src/content/site.ts tests/labs.spec.ts
git commit -m "feat(labs): add #code/#prompts/#advisory anchor IDs to engagement cards"
```

---

## Task 13: Build `PillarHero`

**Files:**
- Create: `src/components/PillarHero.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

Create `src/components/PillarHero.tsx`:

```tsx
import Link from 'next/link'

interface PillarHeroProps {
  eyebrow: string
  title: string
  definition: string
  positioning: string
  breadcrumbHref: string
  breadcrumbLabel: string
  isDataPillar?: boolean
}

export function PillarHero({
  eyebrow,
  title,
  definition,
  positioning,
  breadcrumbHref,
  breadcrumbLabel,
  isDataPillar = false,
}: PillarHeroProps) {
  const accentColor = isDataPillar ? '#0D4D7A' : '#D98B3E'
  return (
    <section className="px-6 pt-24 md:pt-32 pb-16 md:pb-20 bg-bone">
      <div className="max-w-container mx-auto">
        <Link href={breadcrumbHref} className="inline-block text-sm text-charcoal/70 mb-8 hover:text-charcoal">
          {breadcrumbLabel}
        </Link>
        <div
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
          style={{ color: accentColor }}
        >
          {eyebrow}
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-display-lg text-charcoal tracking-tight leading-[1.05] mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-subheading text-charcoal/80 max-w-2xl mb-4 leading-relaxed">
          {definition}
        </p>
        <p className="text-base md:text-lg text-charcoal/70 max-w-2xl leading-relaxed">
          {positioning}
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { PillarHero } from './PillarHero'
```

- [ ] **Step 3: Build**

Run: `npx next build`

- [ ] **Step 4: Commit**

```bash
git add src/components/PillarHero.tsx src/components/index.ts
git commit -m "feat(reality): add PillarHero component"
```

---

## Task 14: Build `PillarServiceGrid`

**Files:**
- Create: `src/components/PillarServiceGrid.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

Create `src/components/PillarServiceGrid.tsx`:

```tsx
interface ServiceCard {
  title: string
  body: string
}

interface PillarServiceGridProps {
  cards: ServiceCard[]
}

export function PillarServiceGrid({ cards }: PillarServiceGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {cards.map((card) => (
        <article
          key={card.title}
          data-testid="pillar-service-card"
          className="p-7 bg-white border border-charcoal/10 rounded-xl"
        >
          <h3 className="text-xl font-bold text-charcoal tracking-tight mb-3">{card.title}</h3>
          <p className="text-charcoal/80 leading-relaxed">{card.body}</p>
        </article>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { PillarServiceGrid } from './PillarServiceGrid'
```

- [ ] **Step 3: Build + commit**

Run: `npx next build`

```bash
git add src/components/PillarServiceGrid.tsx src/components/index.ts
git commit -m "feat(reality): add PillarServiceGrid component"
```

---

## Task 15: Build `LabsTeaser`

**Files:**
- Create: `src/components/LabsTeaser.tsx`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Implement**

Create `src/components/LabsTeaser.tsx`:

```tsx
import Image from 'next/image'
import Link from 'next/link'

interface LabsTeaserProps {
  title: string
  body: string
  screenshot: string
  screenshotAlt: string
  cta: { label: string; href: string }
}

export function LabsTeaser({ title, body, screenshot, screenshotAlt, cta }: LabsTeaserProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className="rounded-2xl overflow-hidden border border-charcoal/10">
        <Image
          src={screenshot}
          alt={screenshotAlt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      <div>
        <h2 className="font-display text-3xl md:text-4xl text-charcoal tracking-tight leading-[1.1] mb-5">
          {title}
        </h2>
        <p className="text-lg text-charcoal/80 leading-relaxed mb-8 max-w-xl">{body}</p>
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Export**

Append to `src/components/index.ts`:
```typescript
export { LabsTeaser } from './LabsTeaser'
```

- [ ] **Step 3: Add placeholder pillar screenshots**

Until Terry supplies real labs.atheryon.ai screenshots, copy the existing `/labs` ops screenshot as a stand-in for all three pillar pages so the build doesn't 404 on missing images:

```bash
cp public/labs/screenshots/ops-board.png public/reality/labs-screenshot-data.png
cp public/labs/screenshots/ops-board.png public/reality/labs-screenshot-intelligence.png
cp public/labs/screenshots/ops-board.png public/reality/labs-screenshot-transformation.png
```

(Real screenshots will replace these in Task 21 — Terry copy review pass.)

- [ ] **Step 4: Build + commit**

Run: `npx next build`

```bash
git add src/components/LabsTeaser.tsx src/components/index.ts public/reality/*.png
git commit -m "feat(reality): add LabsTeaser component + placeholder pillar screenshots"
```

---

## Task 16: Build `/reality/page.tsx`

**Files:**
- Create: `src/app/reality/page.tsx`

- [ ] **Step 1: Implement**

Create `src/app/reality/page.tsx`:

```tsx
import type { Metadata } from 'next'
import {
  Section,
  SectionDivider,
  RealityHero,
  PillarGrid,
  RealitySplit,
  FloorThirteen,
  LabsTeaser,
} from '@/components'
import Link from 'next/link'
import { site } from '@/content/site'

const { reality } = site.pages

export const metadata: Metadata = {
  title: reality.title,
  description: reality.description,
  openGraph: { title: reality.title, description: reality.description },
}

export default function RealityPage() {
  return (
    <main className="bg-bone">
      {/* §1 Hero */}
      <RealityHero
        headline={reality.hero.headline}
        lede={reality.hero.lede}
        primaryCta={reality.hero.primaryCta}
        secondaryCta={reality.hero.secondaryCta}
      />

      <SectionDivider />

      {/* §2 Pillars */}
      <Section badge={reality.pillars.badge} title={reality.pillars.title} description={reality.pillars.intro}>
        <PillarGrid items={reality.pillars.items} anchor={reality.pillars.anchor} />
      </Section>

      <SectionDivider />

      {/* §3 Narrative transition */}
      <Section badge={reality.transition.badge}>
        <RealitySplit
          title={reality.transition.title}
          body={reality.transition.body}
          cta={reality.transition.cta}
          steps={reality.transition.steps}
        />
      </Section>

      <SectionDivider />

      {/* §4 Floor 13 */}
      <FloorThirteen {...reality.floor13} />

      <SectionDivider />

      {/* §5 Methodology */}
      <Section
        badge={reality.methodology.badge}
        title={reality.methodology.title}
        className=""
      >
        <div id={reality.methodology.anchor} />
        <ul className="space-y-6 max-w-3xl">
          {reality.methodology.principles.map((p) => (
            <li key={p.title}>
              <h3 className="text-lg font-bold text-charcoal tracking-tight mb-1">{p.title}</h3>
              <p className="text-charcoal/80 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      {/* §6 Proof — /labs */}
      <Section badge={reality.proof.badge}>
        <LabsTeaser
          title={reality.proof.title}
          body={reality.proof.body}
          screenshot={reality.proof.screenshot}
          screenshotAlt={reality.proof.screenshotAlt}
          cta={reality.proof.cta}
        />
      </Section>

      <SectionDivider />

      {/* §7 Closing */}
      <Section badge={reality.closing.badge} title={reality.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {reality.closing.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link
            href={reality.closing.primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {reality.closing.primaryCta.label}
          </Link>
          <Link
            href={reality.closing.secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
          >
            {reality.closing.secondaryCta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
```

- [ ] **Step 2: Build**

Run: `npx next build`
Expected: `/reality` appears in the route list. Build succeeds.

- [ ] **Step 3: Run the reality test suite**

Run: `npx next dev` in one terminal; in another:
```bash
npx playwright test tests/reality.spec.ts
```
Expected: all 11 tests pass. (Stop the dev server when done.)

If any test fails, debug — most likely culprits: missing `data-testid` on a component, copy mismatch in `site.ts`, or anchor ID typo.

- [ ] **Step 4: Commit**

```bash
git add src/app/reality/page.tsx
git commit -m "feat(reality): add /reality page route"
```

---

## Task 17: Build the three pillar pages from the shared template

**Files:**
- Create: `src/app/data/page.tsx`
- Create: `src/app/intelligence/page.tsx`
- Create: `src/app/transformation/page.tsx`

The three pages are structurally identical — the only difference is which `site.pages.<pillar>` they read and a single `isDataPillar` flag.

- [ ] **Step 1: Create `src/app/data/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Section,
  SectionDivider,
  PillarHero,
  PillarServiceGrid,
  LabsTeaser,
} from '@/components'
import { site } from '@/content/site'

const { data } = site.pages

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  openGraph: { title: data.title, description: data.description },
}

export default function DataPage() {
  return (
    <main className="bg-bone">
      <PillarHero {...data.hero} isDataPillar />

      <SectionDivider />

      <Section badge={data.hiddenReality.badge} title={data.hiddenReality.title}>
        <ul className="space-y-3 max-w-2xl">
          {data.hiddenReality.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-charcoal/60">—</span>
              <span className="text-charcoal/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      <Section badge={data.whatWeDo.badge} title={data.whatWeDo.title}>
        <PillarServiceGrid cards={data.whatWeDo.cards} />
      </Section>

      <SectionDivider />

      <Section badge={data.proof.badge}>
        <LabsTeaser
          title={data.proof.title}
          body={data.proof.body}
          screenshot={data.proof.screenshot}
          screenshotAlt={data.proof.screenshotAlt}
          cta={data.proof.cta}
        />
      </Section>

      <SectionDivider />

      <Section centered>
        <p className="text-base text-charcoal/70 mb-4">{data.floor13Nudge.body}</p>
        <Link
          href={data.floor13Nudge.cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {data.floor13Nudge.cta.label}
        </Link>
      </Section>

      <SectionDivider />

      <Section badge={data.closing.badge} title={data.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {data.closing.body}
        </p>
        <div className="flex justify-center">
          <Link
            href={data.closing.cta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {data.closing.cta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
```

- [ ] **Step 2: Create `src/app/intelligence/page.tsx`**

Copy the file from Step 1 verbatim, then change:
- `const { data } = site.pages` → `const { intelligence } = site.pages`
- `data.hero` etc. → `intelligence.hero` etc. (search-and-replace `data.` → `intelligence.` in the file body)
- `<PillarHero {...data.hero} isDataPillar />` → `<PillarHero {...intelligence.hero} />` (drop the flag)
- `function DataPage` → `function IntelligencePage`

- [ ] **Step 3: Create `src/app/transformation/page.tsx`**

Same as Step 2 but with `transformation` substituted, and no `isDataPillar` flag:

- `const { transformation } = site.pages`
- search-and-replace `data.` → `transformation.`
- `function TransformationPage`

- [ ] **Step 4: Build**

Run: `npx next build`
Expected: `/data`, `/intelligence`, `/transformation` all appear in the route list.

- [ ] **Step 5: Run pillar tests**

```bash
npx playwright test tests/pillars.spec.ts
```
Expected: all 15 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/app/data src/app/intelligence src/app/transformation
git commit -m "feat(reality): add /data /intelligence /transformation pillar pages"
```

---

## Task 18: Replace homepage `src/app/page.tsx` with /reality content

**Files:**
- Modify: `src/app/page.tsx` (full rewrite — the existing homepage is being retired)

- [ ] **Step 1: Replace the file contents**

Overwrite `src/app/page.tsx` with:

```tsx
import RealityPage from './reality/page'
export { metadata } from './reality/page'
export default RealityPage
```

This re-exports the `/reality` page, so `/` and `/reality` render identical content from a single source of truth.

- [ ] **Step 2: Build**

Run: `npx next build`
Expected: `/` and `/reality` both appear in the route list.

- [ ] **Step 3: Update `tests/homepage.spec.ts`**

Open `tests/homepage.spec.ts`. Replace any expectations that assert the old "Decision-grade data platforms…" H1 or related copy with the new homepage expectations:

```typescript
import { test, expect } from '@playwright/test'

test.describe('homepage /', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the /reality hero', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /Reality is built on data/i })).toBeVisible()
  })

  test('Floor 13 switchboard is reachable', async ({ page }) => {
    await expect(page.getByTestId('floor13-dial')).toHaveCount(3)
  })
})
```

(Replace the entire file — keep any unrelated tests if they exist.)

- [ ] **Step 4: Run the homepage tests**

```bash
npx playwright test tests/homepage.spec.ts
```
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx tests/homepage.spec.ts
git commit -m "feat(reality): / homepage now renders /reality content"
```

---

## Task 19: Delete legacy app routes + retire video

**Files:**
- Delete: `src/app/cdm-platform/`, `src/app/recovery-migration/`, `src/app/m-and-a-execution/`, `src/app/capability-enablement/`, `src/app/how-we-work/`, `src/app/what-we-deliver/`, `src/app/ai-ready-data/`, `src/app/reference-architectures/`
- Delete: `public/atheryon-logo-animation.mp4`
- Modify: `src/content/site.ts` — remove the corresponding `pages.{home, cdmPlatform, recoveryMigration, mAndAExecution, capabilityEnablement, howWeWork, whatWeDeliver, aiReadyData, referenceArchitectures}` keys

- [ ] **Step 1: Delete the 8 legacy route directories**

Run:
```bash
rm -rf src/app/cdm-platform
rm -rf src/app/recovery-migration
rm -rf src/app/m-and-a-execution
rm -rf src/app/capability-enablement
rm -rf src/app/how-we-work
rm -rf src/app/what-we-deliver
rm -rf src/app/ai-ready-data
rm -rf src/app/reference-architectures
```

- [ ] **Step 2: Delete the retired video**

Run:
```bash
rm public/atheryon-logo-animation.mp4
```

- [ ] **Step 3: Remove legacy `pages.*` keys from `site.ts`**

Open `src/content/site.ts`. Locate and **delete** these top-level keys inside the `pages:` object:

- `home: { … }`
- `cdmPlatform: { … }`
- `recoveryMigration: { … }`
- `mAndAExecution: { … }`
- `capabilityEnablement: { … }`
- `howWeWork: { … }`
- `whatWeDeliver: { … }`
- `aiReadyData: { … }`
- `referenceArchitectures: { … }`

Keep: `labs`, `reality`, `data`, `intelligence`, `transformation`, `about`, `contact`, `programs`, `mibInsight`, `mibInsightThanks` (and any other surviving page).

- [ ] **Step 4: Build — fix any references**

Run: `npx next build`

Expected: build succeeds. If it fails, the most likely cause is a residual import. Search for orphan references:

```bash
grep -rE "(pages\.(home|cdmPlatform|recoveryMigration|mAndAExecution|capabilityEnablement|howWeWork|whatWeDeliver|aiReadyData|referenceArchitectures))" src/
```

If anything matches, it's referenced from a surviving file and the surviving file needs updating (likely the homepage that was just rewritten in Task 18 — but verify).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(reality): delete 8 legacy routes + atheryon-logo-animation.mp4 + legacy site.ts blocks"
```

---

## Task 20: Update Header, Footer, sitemap, and `staticwebapp.config.json`

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `staticwebapp.config.json`
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Update `src/components/Header.tsx`**

Open `src/components/Header.tsx`. Locate the `mainNav` array (around lines 9-15 — the version after `/labs` was added). Replace with:

```typescript
const mainNav = [
  { label: 'Reality', href: '/reality' },
  { label: 'Data', href: '/data' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Transformation', href: '/transformation' },
  { label: 'Labs', href: '/labs' },
  { label: 'About', href: '/about' },
]
```

If the file has a CTA button anywhere in the header (e.g. "Book a session" or "Enter Floor 13" — check around lines 60-80), **remove** it. The spec calls for no header CTA.

- [ ] **Step 2: Update `src/components/Footer.tsx`**

Open `src/components/Footer.tsx`. Strip the resource columns (Services / Reference Architectures / etc. links). Keep only:

- The Atheryon name/logo
- A single line: `Contact · Privacy · LinkedIn`
- `© <current year>`

Skeleton:

```tsx
import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-bone border-t border-charcoal/10 py-10">
      <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center justify-between text-sm text-charcoal/70">
        <div className="font-display text-xl text-charcoal">Atheryon</div>
        <nav className="flex gap-6">
          <Link href="/contact" className="hover:text-charcoal">Contact</Link>
          <Link href="/privacy" className="hover:text-charcoal">Privacy</Link>
          <a href="https://www.linkedin.com/company/atheryon" className="hover:text-charcoal">LinkedIn</a>
        </nav>
        <div>© {year} Atheryon</div>
      </div>
    </footer>
  )
}
```

(Verify the LinkedIn URL — if the existing Footer has a different one, preserve it.)

- [ ] **Step 3: Update `staticwebapp.config.json`**

Open `staticwebapp.config.json`. Replace the `routes` array with:

```json
  "routes": [
    { "route": "/", "rewrite": "/index.html" },
    { "route": "/reality", "rewrite": "/reality.html" },
    { "route": "/data", "rewrite": "/data.html" },
    { "route": "/intelligence", "rewrite": "/intelligence.html" },
    { "route": "/transformation", "rewrite": "/transformation.html" },
    { "route": "/labs", "rewrite": "/labs.html" },
    { "route": "/about", "rewrite": "/about.html" },
    { "route": "/contact", "rewrite": "/contact.html" },
    { "route": "/programs", "rewrite": "/programs.html" },
    { "route": "/programs/mib-insight", "rewrite": "/programs/mib-insight.html" },
    { "route": "/programs/mib-insight/thanks", "rewrite": "/programs/mib-insight/thanks.html" },
    { "route": "/integration/*", "allowedRoles": ["sp-clients"] },
    { "route": "/privacy", "rewrite": "/privacy.html" },
    { "route": "/terms", "rewrite": "/terms.html" },

    { "route": "/cdm-platform",           "redirect": "/data",                "statusCode": 301 },
    { "route": "/recovery-migration",     "redirect": "/transformation",      "statusCode": 301 },
    { "route": "/m-and-a-execution",      "redirect": "/transformation",      "statusCode": 301 },
    { "route": "/capability-enablement",  "redirect": "/transformation",      "statusCode": 301 },
    { "route": "/how-we-work",            "redirect": "/reality#methodology", "statusCode": 301 },
    { "route": "/what-we-deliver",        "redirect": "/transformation",      "statusCode": 301 },
    { "route": "/ai-ready-data",          "redirect": "/intelligence",        "statusCode": 301 },
    { "route": "/reference-architectures","redirect": "/data",                "statusCode": 301 }
  ],
```

Leave `navigationFallback`, `responseOverrides`, `globalHeaders`, `mimeTypes` unchanged.

- [ ] **Step 4: Update `public/sitemap.xml`**

Replace the contents of `public/sitemap.xml` with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://atheryon.com.au/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://atheryon.com.au/reality</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://atheryon.com.au/data</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://atheryon.com.au/intelligence</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://atheryon.com.au/transformation</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://atheryon.com.au/labs</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://atheryon.com.au/about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://atheryon.com.au/contact</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://atheryon.com.au/programs</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://atheryon.com.au/programs/mib-insight</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>
```

- [ ] **Step 5: Build + manual smoke**

Run: `npx next build && npx next dev`

In a browser, visit:
- `http://localhost:3000/` — homepage renders /reality content
- `http://localhost:3000/reality` — same
- `http://localhost:3000/data`, `/intelligence`, `/transformation` — all render
- Header has the 6 nav links, no CTA
- Footer is stripped

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx src/components/Footer.tsx staticwebapp.config.json public/sitemap.xml
git commit -m "feat(reality): wire nav, footer, sitemap, SWA redirects for new IA"
```

---

## Task 21: Final verification + push + PR

- [ ] **Step 1: Lint + build**

Run:
```bash
npx next lint
npx next build
```
Expected: clean lint, build succeeds.

- [ ] **Step 2: Run the full Playwright suite**

```bash
npx playwright test
```
Expected: all tests pass except the redirect smoke (which is correctly skipped without `E2E_AGAINST_DEPLOYED=true`).

If any test fails, fix the underlying issue. Common culprits at this stage: stale data-testid in a refactored component, copy-block typo, missing `id` prop on a card.

- [ ] **Step 3: Manual checks**

Run `npx next dev` and verify:

- `/` and `/reality` render identical content (compare both URLs in two tabs)
- Hero animation plays once and loops; no visual flash of unstyled content
- Floor 13: click each dial, type into the input, generate; sell-card recommendation switches; sell-card CTAs link to `/labs#code|prompts|advisory`
- Each pillar page renders, breadcrumb links back to `/reality`, Labs teaser shows the screenshot, Floor 13 nudge link works
- Header has 6 links, no CTA, no dropdown
- Footer is stripped
- View at 375 / 768 / 1280px — no horizontal overflow
- `prefers-reduced-motion: reduce` (system setting on macOS: Accessibility > Display > Reduce Motion ON) — hero shows the architecture state without animation

Stop the dev server.

- [ ] **Step 4: Verify no token/route violations**

Run:
```bash
grep -rE "(pages\.(home|cdmPlatform|recoveryMigration|mAndAExecution|capabilityEnablement|howWeWork|whatWeDeliver|aiReadyData|referenceArchitectures))" src/ && echo "VIOLATION" || echo "clean: no legacy page references"

grep -rE "atheryon-logo-animation" src/ public/ && echo "VIOLATION: video still referenced" || echo "clean: video reference removed"
```
Expected: both echo "clean".

- [ ] **Step 5: Push branch**

```bash
git push -u origin feat/reality-13th-floor
```

- [ ] **Step 6: Open the PR**

```bash
gh pr create --title "feat(reality): /reality 13th Floor IA + 3 pillars + Floor 13 switchboard" \
  --body "$(cat <<'EOF'
## Summary
- New `/reality` long-scroll homepage (also rendered at `/`) — campaign pitch with hero, three pillars, narrative transition, Floor 13 switchboard, methodology, Labs proof, closing CTA.
- Three new pillar pages: `/data`, `/intelligence`, `/transformation`.
- Floor 13 switchboard funnels visitors into the existing /labs §10 sell triad (Take the code / prompts / advisory) via new `/labs#code|prompts|advisory` anchors.
- Brand integration: 13th Floor + BR2049 palette (sodium amber `#D98B3E`, bone `#EFEAE0`, ink `#0E1116`, structural blue `#0D4D7A`) added as new tokens; legacy tokens kept for /labs and unchanged components (cleanup is v2).
- 8 legacy URLs 301-redirect to relevant pillars; 8 legacy app routes deleted; `atheryon-logo-animation.mp4` retired.

## Spec
`docs/superpowers/specs/2026-05-10-reality-13th-floor-design.md`

## Plan
`docs/superpowers/plans/2026-05-10-reality-13th-floor.md`

## Test plan
- [x] /reality returns 200, hero CTAs visible above fold
- [x] All 3 pillar pages return 200
- [x] Floor 13: dials swap content, text input personalises intro, sell-card recommendation matches pillar, sell-cards link to /labs anchors
- [x] No fetch/POST happens from Floor 13 (no lead capture)
- [x] Anthropic/Claude do not appear on /reality (only on /labs)
- [x] /labs#code, #prompts, #advisory anchors resolve
- [x] Lint + build succeed; full Playwright suite green (redirects spec skipped locally)
- [ ] Manual: smoke against deployed test env after CI completes — `E2E_AGAINST_DEPLOYED=true npx playwright test tests/redirects.spec.ts`
- [ ] Manual: prefers-reduced-motion fallback verified
- [ ] Manual: Lighthouse SEO + performance within 5pt of baseline
EOF
)"
```

- [ ] **Step 7: Verify on test environment**

After CI deploys, smoke-test `https://icy-tree-093dcc800.6.azurestaticapps.net`:

- Visit `/`, `/reality`, `/data`, `/intelligence`, `/transformation`
- Visit each of the 8 legacy URLs and confirm 301 redirect (browser shows the new pillar URL)
- Click through Floor 13 → /labs#code anchor scroll
- Run the deployed-only redirect smoke:

```bash
E2E_AGAINST_DEPLOYED=true PLAYWRIGHT_BASE_URL=https://icy-tree-093dcc800.6.azurestaticapps.net npx playwright test tests/redirects.spec.ts
```

Expected: 8 tests pass.

- [ ] **Step 8: Promote to production**

After Terry approval and test-env smoke:

```bash
gh pr review --approve <PR-NUM>
gh pr merge --merge <PR-NUM>
```

Watch the GitHub Actions deploy job. Smoke-test prod (`https://www.atheryon.com.au`) once deploy succeeds.

---

## Self-review checklist

- [x] Spec §1 problem framing → covered by Task 3 hero copy + Task 16 page render
- [x] Spec §2 goal — homepage replacement → Task 18 (re-export pattern)
- [x] Spec §2 goal — 3 pillar pages → Tasks 4, 13, 14, 17
- [x] Spec §2 goal — Floor 13 funnels into /labs sell triad → Tasks 11, 12
- [x] Spec §2 goal — brand integration → Task 2
- [x] Spec §2 goal — hard cut migration → Tasks 19, 20
- [x] Spec §4.1 header nav → Task 20
- [x] Spec §4.3 8 redirects → Tasks 7 (test), 20 (impl)
- [x] Spec §4.4 footer strip → Task 20
- [x] Spec §5 7-section /reality structure → Task 16
- [x] Spec §6 Floor 13 component spec → Task 11 (state machine, accessibility, recommendation mapping all explicitly implemented)
- [x] Spec §6.5 /labs anchors → Task 12
- [x] Spec §6.7 no tracking → Task 5 test asserts no fetch/POST
- [x] Spec §6.8 accessibility → Task 11 (`aria-pressed`, `aria-live`)
- [x] Spec §7 brand integration → Task 2 (palette + keyframes), Task 8 (hero motion)
- [x] Spec §7.4 video retired → Task 19
- [x] Spec §7.7 OOS list → not implemented (correct — explicitly out of scope)
- [x] Spec §8 pillar template → Tasks 13, 14, 15, 17
- [x] Spec §9 file structure → matches plan File Structure section
- [x] Spec §11 test plan → Tasks 5, 6, 7 (Playwright); Task 21 manual + Lighthouse
- [x] Spec §12 done criteria → Task 21 verification
- [x] Spec §14 open questions → flagged inline (placeholder screenshots in Task 15; final copy refinements during Task 17/18; no plan blocking)
- [x] Placeholder scan: no TBD/TODO; placeholder screenshots are explicitly marked as such with replacement task; no "implement later" handwaves
- [x] Type consistency: `Selection`, `PillarId`, `Dial`, `Blueprint`, `SellCard` consistently named across Tasks 3, 11, 16
- [x] Frequent commits: 21 separate commits, one per logical unit of work
