# MiB Insight Program — Storefront Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public storefront that lets buyers purchase the MiB Insight Program via a Stripe Payment Link, with manual fulfillment by Terry (Approach 1 from the spec). End state: a real buyer can land on `/programs/mib-insight/`, click "Get access", complete a Stripe checkout for $19,999 USD (with a personal promo code), and Terry has a documented runbook to fulfill the order.

**Architecture:**
- Pure additive changes to the existing Next.js 14 static site. No backend, no API routes, no Functions. The "Get access" CTA is a plain anchor to a Stripe Payment Link URL.
- Stripe-hosted Checkout (Payment Link) handles payment, custom-field collection (GitHub username), promo codes, and tax. Stripe is the source of truth for payments.
- Manual fulfillment: Terry receives Stripe email → invites buyer as read-only collaborator on a private materials repo → sends welcome email → tracks in a sheet → revokes access at day 90.
- Out of scope for this plan (separate work): the private materials repo + `PROGRAM_TERMS.md`, and the actual content authoring (5 module bundles). This plan ships the *storefront and ops setup* only — the materials repo is created during Stripe setup and a placeholder repo is sufficient until real content lands.

**Tech Stack:** Next.js 14 (App Router, static export), TypeScript, Tailwind CSS, Playwright E2E, Stripe Payment Links, Stripe Tax, Stripe Promotion Codes.

**Source spec:** `docs/superpowers/specs/2026-04-27-mib-insight-program-design.md`

---

## File Structure

### Files to create

| Path | Purpose |
|------|---------|
| `src/app/programs/page.tsx` | Programs index page; lists Insight Program (Build & Run shown as "coming") |
| `src/app/programs/mib-insight/page.tsx` | MiB Insight Program product page (hero + sections + CTA) |
| `src/app/programs/mib-insight/thanks/page.tsx` | Post-purchase thank-you page (Stripe redirects here) |
| `tests/programs.spec.ts` | Playwright E2E tests for the new pages |
| `docs/superpowers/runbooks/stripe-setup.md` | Step-by-step Stripe dashboard runbook (for Terry) |
| `docs/superpowers/runbooks/ops-setup.md` | Manual fulfillment ops checklist + email templates (for Terry) |

### Files to modify

| Path | Change |
|------|--------|
| `src/content/site.ts` | Add `site.pages.programs`, `site.pages.mibInsight`, `site.pages.mibInsightThanks`; add Programs entry to `site.footer.links.resources` |
| `src/components/Header.tsx` | Add Programs link to desktop and mobile nav (refactor `mainNav` rendering to map-based to keep the file maintainable) |
| `tests/routing.spec.ts` | Add `/programs/` and `/programs/mib-insight/` to the routes table |

### Out of scope for this plan

- Private materials repo (created in Stripe setup runbook as a placeholder; real content authoring is a separate effort)
- `PROGRAM_TERMS.md` (drafted in the materials repo — not in `atheryon-website`)
- Build Program / Run Program tier pages (only "coming" placeholders in the index)
- Any backend automation (that's Approach 2, deferred)

---

## Language Discipline (read this first)

Every customer-facing surface uses **program / materials / IP** language, never software language. Apply to all copy added in `site.ts`, page metadata, page H1s, all visible text, and the Stripe configuration. The wordlist:

| Don't say | Say instead |
|-----------|-------------|
| Software, license, code, source, repo, GitHub, deployment, hosting, install, runtime | Program, materials, IP, agent-ready artifacts, environment, walkthrough |
| "Software license agreement" | "Program Terms of Use" |
| "Source code included" | "Agent-ready IP modules included" |

Before each commit that touches `site.ts` or page content, grep your diff for the don't-say words. They should not appear anywhere on a public surface. (They may appear in *internal* docs and runbooks — that's fine.)

---

## Task 1: Add Programs copy structures to `site.ts`

**Files:**
- Modify: `src/content/site.ts`

This task adds three new keys under `site.pages` and one entry to the footer resources column. No page renders yet — this is just the typed copy that subsequent tasks consume.

- [ ] **Step 1: Add `programs` index page copy**

Open `src/content/site.ts`. Inside the `pages: { ... }` block, after the existing entries and before the closing `}` of `pages`, add:

```ts
    programs: {
      title: 'Programs | Atheryon',
      description: 'Industry IP programs for AI agents — bootstrap a market-platform pitch and prototype with your AI agent in days.',
      hero: {
        headline: 'Industry IP for AI agents',
        subheadline: 'Atheryon programs hand you agent-ready IP — prompts, schemas, designs, and reference architectures — so your AI agent can bootstrap a market-platform pitch, prototype, or proposal in days.',
      },
      programs: [
        {
          name: 'MiB Insight Program',
          tagline: 'Show your client a credible market-platform vision in days, not months.',
          access: '90-day access',
          price: '$19,999',
          status: 'available',
          href: '/programs/mib-insight',
          ctaLabel: 'Learn more',
        },
        {
          name: 'MiB Build Program',
          tagline: 'Implement MiB-derived solutions for your client.',
          access: '12-month access',
          price: 'Coming soon',
          status: 'coming',
          href: '#',
          ctaLabel: 'Coming soon',
        },
        {
          name: 'MiB Run Program',
          tagline: 'Deploy MiB-derived solutions in your client’s production environment.',
          access: 'Multi-year access',
          price: 'Coming soon',
          status: 'coming',
          href: '#',
          ctaLabel: 'Coming soon',
        },
      ],
    },
```

- [ ] **Step 2: Add `mibInsight` product-page copy**

Immediately after the `programs` entry above, add:

```ts
    mibInsight: {
      title: 'MiB Insight Program | Atheryon',
      description: 'Industry IP ready for AI agents. Bootstrap a market-platform pitch and prototype with your AI agent in days. 90-day access, $19,999.',
      hero: {
        eyebrow: 'MiB Insight Program',
        headline: 'Industry IP ready for AI agents',
        subheadline: 'Bootstrap a market-platform pitch, proposal, or prototype with your AI agent in days. 90-day access to agent-ready IP modules covering trading, operations, and compliance — front to back.',
        price: '$19,999',
        priceFootnote: 'One-time. 90-day access. Expensable as professional development.',
        ctaLabel: 'Get access',
        ctaHref: 'https://buy.stripe.com/REPLACE_ME',
      },
      whoItsFor: {
        badge: 'Who this is for',
        title: 'Built for teams pitching or building market-platform solutions',
        items: [
          'Consultants and SI architects building client engagements',
          'Capital-markets and fintech product teams (trading, post-trade, market-data, OMS/EMS, compliance vendors)',
          'AI and developer-tool companies serving financial services',
          'Innovation labs at incumbents — banks, exchanges, CCPs, custodians',
        ],
        commonThread: 'Common thread: you already use AI coding agents, and you want to skip 6–12 months of domain ramp-up.',
      },
      whatsIncluded: {
        badge: 'What you get',
        title: 'Five agent-ready IP modules',
        intro: 'Each module is a self-contained bundle your AI agent can consume directly. Drop the prompts into Claude or Cursor, feed in the schemas, and produce tailored artifacts for your engagement.',
        artifactTypes: [
          { title: 'Prompts pack', description: '10–30 ready-to-use prompts per module — build a screen, generate a schema, produce test data, write a demo script.' },
          { title: 'Schemas', description: 'CDM model excerpts, JSON Schema, and OpenAPI specs your agent can ingest.' },
          { title: 'Design specs', description: 'Annotated screens, design tokens, and Figma exports your agent can adapt.' },
          { title: 'Reference architectures', description: 'Mermaid diagrams and ADRs in machine-readable form.' },
          { title: 'Example transcripts', description: 'Recorded Claude/Cursor sessions showing the IP in action — proof it works.' },
          { title: 'Sample data', description: 'Synthetic but realistic CSV and JSON for end-to-end demos.' },
          { title: 'Walkthrough', description: 'Short human-facing doc — read once, then drive the agent.' },
        ],
      },
      outcomes: {
        badge: 'Outcomes',
        title: 'What you can do after 90 days',
        items: [
          'Generate a tailored client demo or product prototype with your agent in a day.',
          'Produce a credible market-platform reference architecture for a client meeting or product spec.',
          'Bootstrap a working prototype your agent can extend into a real engagement or feature.',
        ],
      },
      curriculum: {
        badge: 'Curriculum',
        title: 'Five modules, front to back',
        modules: [
          { name: 'Foundations', description: 'Market-structure primer, CDM glossary, and a "how to use this IP with your AI agent" guide.' },
          { name: 'Front Office: Trading', description: 'Orders, execution, booking, and positions.' },
          { name: 'Middle Office: Lifecycle & Risk', description: 'Lifecycle events, settlement, valuation.' },
          { name: 'Back Office: Books & Operations', description: 'Records, reconciliation, corporate actions.' },
          { name: 'Compliance & Reporting', description: 'Regulatory reporting, surveillance, audit trail.' },
        ],
      },
      faq: {
        badge: 'FAQ',
        title: 'Common questions',
        items: [
          {
            question: 'How is this expensed?',
            answer: 'The Insight Program is a professional-development purchase — typically expensable on a corporate card or out of an L&D budget. The receipt reads "MiB Insight Program — 90-day access".',
          },
          {
            question: 'Is this a software license?',
            answer: 'No. The Insight Program is an industry-IP and education program. You receive program materials — prompts, schemas, designs, reference architectures, sample data, and walkthroughs — not a software product.',
          },
          {
            question: 'What happens at day 90?',
            answer: 'Your access to the program materials ends. You can extend, or move up to the Build Program for ongoing access plus implementation IP.',
          },
          {
            question: 'Can I add team members?',
            answer: 'Yes — each additional seat is priced separately. Reply to your welcome email and we will add them.',
          },
          {
            question: 'Do you offer a discount?',
            answer: 'Yes — reach out and we will arrange one. The list price anchors the program; many buyers receive a personal promotion code at checkout.',
          },
          {
            question: 'What if I need a refund?',
            answer: 'Because program materials are delivered immediately on purchase, we do not offer refunds once access is granted. Exceptions are at our discretion.',
          },
        ],
      },
      finalCta: {
        title: 'Ready to bootstrap your next pitch?',
        subtitle: '90-day access. $19,999, one-time. Promotion code applied at checkout.',
        ctaLabel: 'Get access',
        ctaHref: 'https://buy.stripe.com/REPLACE_ME',
      },
    },
    mibInsightThanks: {
      title: 'Welcome to the MiB Insight Program | Atheryon',
      description: 'Thank you for joining the MiB Insight Program. Your welcome email is on the way.',
      headline: 'Welcome to the MiB Insight Program',
      message: 'Thank you for joining. You will receive a welcome email shortly with access details and a 15-minute Foundations module to get started. If anything is unclear, reply to that email — it goes straight to Terry.',
    },
```

Note the two `https://buy.stripe.com/REPLACE_ME` placeholders. Task 8 (Stripe setup) replaces them with the real Payment Link URL.

- [ ] **Step 3: Add Programs to footer resources**

Find `footer.links.resources` (around line 833 in `site.ts`):

```ts
      resources: [
        { label: 'Reference Architectures', href: '/reference-architectures' },
        { label: 'AI-Ready Data', href: '/ai-ready-data' },
      ],
```

Replace with:

```ts
      resources: [
        { label: 'Programs', href: '/programs' },
        { label: 'Reference Architectures', href: '/reference-architectures' },
        { label: 'AI-Ready Data', href: '/ai-ready-data' },
      ],
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx next build`
Expected: build completes without TypeScript errors. (Pages don't exist yet for `/programs/` and `/programs/mib-insight/`, but that doesn't fail the build — Next.js only generates routes that exist.)

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(content): add Programs and MiB Insight Program copy to site.ts"
```

---

## Task 2: Programs index page

**Files:**
- Create: `src/app/programs/page.tsx`
- Create: `tests/programs.spec.ts`
- Modify: `tests/routing.spec.ts`

- [ ] **Step 1: Write the failing Playwright test**

Create `tests/programs.spec.ts` with:

```ts
import { test, expect } from '@playwright/test';

test.describe('Programs index page', () => {
  test('renders title, hero, and Insight Program card', async ({ page }) => {
    await page.goto('/programs');
    await expect(page).toHaveTitle(/Programs/);
    await expect(page.locator('h1').first()).toContainText('Industry IP for AI agents');
    await expect(page.getByText('MiB Insight Program').first()).toBeVisible();
    await expect(page.getByText('$19,999').first()).toBeVisible();
  });

  test('Insight Program card links to product page', async ({ page }) => {
    await page.goto('/programs');
    const link = page.getByRole('link', { name: /Learn more/i }).first();
    await expect(link).toHaveAttribute('href', '/programs/mib-insight');
  });
});

test.describe('MiB Insight product page', () => {
  test('renders hero, price, and Get access CTA', async ({ page }) => {
    await page.goto('/programs/mib-insight');
    await expect(page).toHaveTitle(/MiB Insight Program/);
    await expect(page.locator('h1').first()).toContainText('Industry IP ready for AI agents');
    await expect(page.getByText('$19,999').first()).toBeVisible();
    const cta = page.getByRole('link', { name: /Get access/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /^https:\/\/buy\.stripe\.com\//);
  });
});

test.describe('MiB Insight thanks page', () => {
  test('renders welcome message', async ({ page }) => {
    await page.goto('/programs/mib-insight/thanks');
    await expect(page.locator('h1').first()).toContainText('Welcome to the MiB Insight Program');
  });
});
```

- [ ] **Step 2: Verify the test fails**

Run: `npm run build && npx playwright test tests/programs.spec.ts --project=chromium`
Expected: 4 tests fail (404 / page not found) — none of the routes exist yet.

- [ ] **Step 3: Create the Programs index page**

Create `src/app/programs/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { SimpleHero, Section, SectionDivider } from '@/components'
import { site } from '@/content/site'

const { programs } = site.pages

export const metadata: Metadata = {
  title: programs.title,
  description: programs.description,
  openGraph: {
    title: programs.title,
    description: programs.description,
  },
}

export default function ProgramsPage() {
  return (
    <main>
      <SimpleHero
        headline={programs.hero.headline}
        subheadline={programs.hero.subheadline}
      />

      <SectionDivider />

      <Section badge="Programs" title="Choose your program">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.programs.map((program) => (
            <div
              key={program.name}
              className={`relative p-8 rounded-3xl border ${
                program.status === 'available'
                  ? 'bg-white border-neutral-500/10 shadow-card'
                  : 'bg-warm-100 border-neutral-500/10'
              }`}
            >
              {program.status === 'coming' && (
                <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Coming
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-2 tracking-tight">
                {program.name}
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">{program.tagline}</p>
              <div className="text-sm text-neutral-500 mb-2">{program.access}</div>
              <div className="text-2xl font-bold text-neutral-900 mb-6">{program.price}</div>
              {program.status === 'available' ? (
                <Link
                  href={program.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all"
                >
                  {program.ctaLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-500 bg-neutral-100 rounded-full cursor-not-allowed">
                  {program.ctaLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
```

- [ ] **Step 4: Verify Programs index test passes**

Run: `npm run build && npx playwright test tests/programs.spec.ts --project=chromium -g "Programs index"`
Expected: 2 Programs index tests pass. (MiB Insight and thanks tests still fail — those are next.)

- [ ] **Step 5: Commit**

```bash
git add src/app/programs/page.tsx tests/programs.spec.ts
git commit -m "feat(programs): add Programs index page listing the Insight Program"
```

---

## Task 3: MiB Insight Program product page — minimal hero

**Files:**
- Create: `src/app/programs/mib-insight/page.tsx`

This task ships the page with hero + final CTA only, just enough to make the basic test pass. Task 4 fleshes out the remaining sections.

- [ ] **Step 1: Create the product page (hero + final CTA)**

Create `src/app/programs/mib-insight/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Section, SectionDivider } from '@/components'
import { site } from '@/content/site'

const { mibInsight } = site.pages

export const metadata: Metadata = {
  title: mibInsight.title,
  description: mibInsight.description,
  openGraph: {
    title: mibInsight.title,
    description: mibInsight.description,
  },
}

export default function MibInsightPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-warm-50 to-warm-100">
        <div className="max-w-container mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange mb-4">
            {mibInsight.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {mibInsight.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-10">
            {mibInsight.hero.subheadline}
          </p>
          <div className="inline-flex flex-col items-center gap-3 bg-white px-8 py-6 rounded-3xl shadow-card">
            <div className="text-4xl md:text-5xl font-bold text-neutral-900">
              {mibInsight.hero.price}
            </div>
            <div className="text-sm text-neutral-600">{mibInsight.hero.priceFootnote}</div>
            <a
              href={mibInsight.hero.ctaHref}
              className="mt-2 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-button"
            >
              {mibInsight.hero.ctaLabel}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA */}
      <Section title={mibInsight.finalCta.title}>
        <div className="text-center">
          <p className="text-lg text-neutral-700 mb-8">{mibInsight.finalCta.subtitle}</p>
          <a
            href={mibInsight.finalCta.ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-button"
          >
            {mibInsight.finalCta.ctaLabel}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Section>
    </main>
  )
}
```

- [ ] **Step 2: Verify the MiB Insight test passes**

Run: `npm run build && npx playwright test tests/programs.spec.ts --project=chromium -g "MiB Insight product"`
Expected: the MiB Insight product test passes. The thanks-page test still fails — Task 5 ships that.

- [ ] **Step 3: Commit**

```bash
git add src/app/programs/mib-insight/page.tsx
git commit -m "feat(programs): add MiB Insight Program page (hero + final CTA)"
```

---

## Task 4: MiB Insight Program — flesh out all sections

**Files:**
- Modify: `src/app/programs/mib-insight/page.tsx`

This task adds the five remaining sections (Who-it's-for, What's-included, Outcomes, Curriculum, FAQ) between the hero and the final CTA.

- [ ] **Step 1: Import additional components**

In `src/app/programs/mib-insight/page.tsx`, replace the existing import line for components:

```tsx
import { Section, SectionDivider } from '@/components'
```

with:

```tsx
import { Section, SectionDivider, Card, Checklist, FAQ } from '@/components'
```

- [ ] **Step 2: Add Who-it's-for section**

Find the `<SectionDivider />` after the hero and add a new section immediately after it (before the Final CTA `Section`):

```tsx
      {/* Who it's for */}
      <Section badge={mibInsight.whoItsFor.badge} title={mibInsight.whoItsFor.title}>
        <div className="max-w-3xl mx-auto">
          <Checklist items={mibInsight.whoItsFor.items} />
          <p className="mt-8 text-neutral-600 italic text-center">{mibInsight.whoItsFor.commonThread}</p>
        </div>
      </Section>

      <SectionDivider />
```

- [ ] **Step 3: Add What's-included section**

Immediately after the Who-it's-for section's `<SectionDivider />`, add:

```tsx
      {/* What's included */}
      <Section badge={mibInsight.whatsIncluded.badge} title={mibInsight.whatsIncluded.title}>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
          {mibInsight.whatsIncluded.intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mibInsight.whatsIncluded.artifactTypes.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>

      <SectionDivider />
```

- [ ] **Step 4: Add Outcomes section**

After the previous `<SectionDivider />`, add:

```tsx
      {/* Outcomes */}
      <Section badge={mibInsight.outcomes.badge} title={mibInsight.outcomes.title}>
        <div className="max-w-3xl mx-auto">
          <Checklist items={mibInsight.outcomes.items} />
        </div>
      </Section>

      <SectionDivider />
```

- [ ] **Step 5: Add Curriculum section**

After the previous `<SectionDivider />`, add:

```tsx
      {/* Curriculum */}
      <Section badge={mibInsight.curriculum.badge} title={mibInsight.curriculum.title}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mibInsight.curriculum.modules.map((module, idx) => (
            <div key={module.name} className="bg-white p-6 rounded-2xl border border-neutral-500/10 shadow-soft">
              <div className="text-sm font-semibold text-brand-orange mb-2">Module {idx + 1}</div>
              <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3 tracking-tight">{module.name}</h3>
              <p className="text-neutral-600 leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />
```

- [ ] **Step 6: Add FAQ section**

After the previous `<SectionDivider />` (and before the Final CTA), add:

```tsx
      {/* FAQ */}
      <Section badge={mibInsight.faq.badge} title={mibInsight.faq.title}>
        <FAQ items={mibInsight.faq.items} />
      </Section>

      <SectionDivider />
```

- [ ] **Step 7: Verify build**

Run: `npx next build`
Expected: build succeeds with no TypeScript errors. (`Section`, `SectionDivider`, `Card`, `Checklist`, and `FAQ` are all already exported from `src/components/index.ts`.)

- [ ] **Step 8: Run all programs tests**

Run: `npx playwright test tests/programs.spec.ts --project=chromium`
Expected: 3 of 4 tests pass (programs index x2 + MiB Insight). Thanks-page test still fails.

- [ ] **Step 9: Manual visual check (recommended)**

Run: `npx next dev` and open `http://localhost:3000/programs/mib-insight/`. Scroll the page and confirm:
- Hero shows eyebrow, headline, subheadline, price, footnote, "Get access" button
- All five sections render below in order: Who-it's-for, What's-included, Outcomes, Curriculum, FAQ, Final CTA
- No "software", "license", "code", "repo", or "GitHub" appears anywhere on the page

Stop the dev server when done.

- [ ] **Step 10: Commit**

```bash
git add src/app/programs/mib-insight/page.tsx
git commit -m "feat(programs): flesh out MiB Insight page (who/what/outcomes/curriculum/FAQ)"
```

---

## Task 5: Thank-you page

**Files:**
- Create: `src/app/programs/mib-insight/thanks/page.tsx`

- [ ] **Step 1: Create the thank-you page**

Create `src/app/programs/mib-insight/thanks/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'

const { mibInsightThanks } = site.pages

export const metadata: Metadata = {
  title: mibInsightThanks.title,
  description: mibInsightThanks.description,
}

export default function MibInsightThanksPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-8">
          <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
          {mibInsightThanks.headline}
        </h1>
        <p className="text-lg text-neutral-700 leading-relaxed mb-10">{mibInsightThanks.message}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-900 bg-white border border-neutral-200 rounded-full hover:bg-warm-100 transition-all"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify the thanks-page test passes**

Run: `npm run build && npx playwright test tests/programs.spec.ts --project=chromium`
Expected: all 4 tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/app/programs/mib-insight/thanks/page.tsx
git commit -m "feat(programs): add MiB Insight Program thank-you page"
```

---

## Task 6: Add Programs to Header navigation

**Files:**
- Modify: `src/components/Header.tsx`

The current `Header.tsx` hardcodes `mainNav[0]`, `mainNav[1]`, `mainNav[2]` references throughout. Adding a fourth item without refactoring would mean adding four more hardcoded references in two places (desktop + mobile). Refactor the rendering loop to map over the array. This is a small focused refactor that lives within this task.

- [ ] **Step 1: Update the `mainNav` array**

In `src/components/Header.tsx`, replace:

```tsx
const mainNav = [
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Reference Architectures', href: '/reference-architectures' },
  { label: 'About', href: '/about' },
]
```

with:

```tsx
const mainNav = [
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Programs', href: '/programs' },
  { label: 'Reference Architectures', href: '/reference-architectures' },
  { label: 'About', href: '/about' },
]
```

- [ ] **Step 2: Refactor the desktop nav rendering**

In the desktop nav block, find the two trailing `<Link>` elements that come *after* the Services dropdown's closing `</div>`. They look like:

```tsx
              {/* Reference Architectures */}
              <Link href={mainNav[1].href} className="nav-link">
                {mainNav[1].label}
              </Link>

              {/* About */}
              <Link href={mainNav[2].href} className="nav-link">
                {mainNav[2].label}
              </Link>
```

Replace **both** of those blocks with this single map (which now also renders Programs):

```tsx
              {/* Other top-level nav items (Programs, Reference Architectures, About) */}
              {mainNav.slice(1).map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
```

Leave the `{/* How We Work */}` link and the entire `{/* Services Dropdown */}` block (everything between the comment and its matching closing `</div>`) exactly as they are.

- [ ] **Step 3: Refactor the mobile nav rendering**

In the mobile nav block (under `{/* Mobile Links */}`), find the two trailing `<Link>` elements that come *after* the Services expandable section and *before* the Contact link. They look like:

```tsx
                  {/* Reference Architectures */}
                  <Link
                    href={mainNav[1].href}
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {mainNav[1].label}
                  </Link>

                  {/* About */}
                  <Link
                    href={mainNav[2].href}
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {mainNav[2].label}
                  </Link>
```

Replace **both** of those blocks with this single map (which now also renders Programs):

```tsx
                  {/* Other top-level nav items (Programs, Reference Architectures, About) */}
                  {mainNav.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
```

Leave the `{/* How We Work */}` link, the `{/* Services Expandable Section */}` block, and the trailing `{/* Contact */}` link exactly as they are.

- [ ] **Step 4: Verify build**

Run: `npx next build`
Expected: build completes successfully.

- [ ] **Step 5: Update `routing.spec.ts` to include the new routes**

Open `tests/routing.spec.ts`. In the `routes` array (around line 9), add two entries:

```ts
  { path: '/programs', title: /Programs/, h1: /Industry IP for AI agents/i },
  { path: '/programs/mib-insight', title: /MiB Insight Program/, h1: /Industry IP ready for AI agents/i },
```

So the `routes` array becomes (insert the new entries near the bottom or alphabetically — placement is fine either way):

```ts
const routes = [
  { path: '/', title: /Atheryon/, h1: /Decision-grade data platforms/i },
  { path: '/contact', title: /Contact/, h1: /Let's talk/i },
  { path: '/how-we-work', title: /How We Work/, h1: /How we work/i },
  { path: '/about', title: /About/, h1: /About/i },
  { path: '/reference-architectures', title: /Reference/, h1: /Reference/i },
  { path: '/ai-ready-data', title: /AI-Ready Data/, h1: /AI-Ready Data/i },
  { path: '/recovery-migration', title: /Recovery/, h1: /Recovery/i },
  { path: '/capability-enablement', title: /Capability/, h1: /Capability/i },
  { path: '/cdm-platform', title: /CDM/, h1: /Transform Your Derivatives/i },
  { path: '/m-and-a-execution', title: /M&A/, h1: /M&A/i },
  { path: '/programs', title: /Programs/, h1: /Industry IP for AI agents/i },
  { path: '/programs/mib-insight', title: /MiB Insight Program/, h1: /Industry IP ready for AI agents/i },
];
```

- [ ] **Step 6: Run the full Playwright suite**

Run: `npm run build && npx playwright test --project=chromium`
Expected: all tests pass, including the new programs and routing entries.

- [ ] **Step 7: Manual smoke check**

Run: `npx next dev` and open `http://localhost:3000/`. Confirm:
- The Programs link appears in the desktop top nav between Services dropdown and Reference Architectures
- Clicking Programs goes to `/programs`
- Resize the browser to mobile width — open the hamburger menu, confirm Programs appears in the mobile nav

Stop the dev server when done.

- [ ] **Step 8: Commit**

```bash
git add src/components/Header.tsx tests/routing.spec.ts
git commit -m "feat(nav): add Programs link to header (desktop + mobile)"
```

---

## Task 7: Verify Footer Programs link

**Files:**
- (none — `Footer.tsx` already renders `site.footer.links.resources` dynamically; the Programs entry was added in Task 1, Step 3)

This task is verification only.

- [ ] **Step 1: Visually verify the footer**

Run: `npx next dev` and scroll to the footer on any page. Confirm "Programs" appears under the Resources column.

- [ ] **Step 2: Confirm no further changes needed**

If Programs appears, no commit is needed for this task. If it doesn't appear, confirm Task 1 Step 3 was committed; re-run `next dev` after stopping it.

---

## Task 8: Stripe configuration runbook (manual / dashboard)

**Files:**
- Create: `docs/superpowers/runbooks/stripe-setup.md`
- Modify: `src/content/site.ts` (replace `REPLACE_ME` placeholders with the real Stripe URL once configured)

This task is mostly Stripe-dashboard work performed by Terry. The runbook is a checklist Terry follows once. After the Stripe Payment Link exists, the placeholder URLs in `site.ts` are updated.

- [ ] **Step 1: Create the runbook file**

Create `docs/superpowers/runbooks/stripe-setup.md` with the following content:

````markdown
# Stripe Setup Runbook — MiB Insight Program

**One-time setup performed by Terry in the Stripe Dashboard.** Estimated time: 30–45 min.

## Pre-requisites

- Stripe account active (Atheryon)
- Bank account connected for payouts
- ABN / tax info entered for invoice/receipt compliance
- Default currency confirmed (USD recommended for global buyers)

## 1. Brand the Stripe checkout

1. Stripe Dashboard → **Settings** → **Branding**
2. Upload Atheryon logo (`public/logo.png` from this repo)
3. Set primary brand colour to match the site (`#0F172A` neutral-900) and accent to brand-orange
4. Save

## 2. Enable Stripe Tax

1. Stripe Dashboard → **Tax** → **Get started**
2. Add your tax registrations (Australia GST minimum; add others as needed)
3. Set tax behaviour: **Inclusive** or **Exclusive** depending on your preference (Exclusive is the default for B2B)
4. Save

## 3. Create the Product

1. Stripe Dashboard → **Products** → **Add product**
2. **Name:** `MiB Insight Program — Industry IP for AI Agents`
3. **Description:** `Industry IP ready for AI agents. Bootstrap a market-platform pitch and prototype with your AI agent in days. 90-day access.`
4. **Image:** upload an Atheryon-branded image (square, 512×512+)
5. **Pricing:**
   - Type: **One-time**
   - Amount: **19999.00 USD**
   - Tax behaviour: per Stripe Tax settings
6. **Tax category:** "Digital download" or "Educational service" (whichever your jurisdiction prefers; "Educational service" is preferred for the procurement-bypass framing)
7. Save the product. Note the Product ID (`prod_…`).

## 4. Create the Payment Link

1. Stripe Dashboard → **Payment Links** → **New**
2. Select the MiB Insight Program product (price: $19,999 USD)
3. **Custom fields** — add three:
   - `GitHub username` — type: text, required ✅
   - `Company name` — type: text, optional
   - `Use case (one line)` — type: text, optional
4. **Promotion codes** — toggle ON ("Allow customers to redeem promotion codes")
5. **Tax collection** — toggle ON
6. **Confirmation page** — choose "Don't show confirmation page; redirect to your website" → URL: `https://atheryon.com.au/programs/mib-insight/thanks` (replace with the production URL when known)
7. **Receipt template** — verify the line item reads exactly `MiB Insight Program — 90-day access`. If not, edit the product description and confirm Stripe propagates it.
8. Save and copy the Payment Link URL (looks like `https://buy.stripe.com/...`).

## 5. Create initial Promotion Codes

Create at least three to seed the library — you'll add per-deal codes as needed.

1. Stripe Dashboard → **Coupons** → **New coupon**
2. Examples:
   - `INSIGHT-30` — 30% off, multi-use, no expiry
   - `INSIGHT-50` — 50% off, multi-use, no expiry
   - `INSIGHT-LAUNCH` — first 5 buyers, $5,000 off, expires 30 days
3. For each coupon, click "Promotion codes" → **New** to create a customer-facing code with the same effect (Stripe keeps coupons and promotion codes as separate concepts).

## 6. Update the website with the Payment Link URL

In `src/content/site.ts`, find both occurrences of:

```ts
ctaHref: 'https://buy.stripe.com/REPLACE_ME',
```

and replace with the actual Payment Link URL from Step 4.

```bash
npx next build
git add src/content/site.ts
git commit -m "chore(programs): set Stripe Payment Link URL for MiB Insight"
```

## 7. End-to-end test using a Stripe test card

1. Switch the Stripe Dashboard to **test mode** (toggle in the top-left)
2. Create a duplicate of the Payment Link in test mode
3. Open the test Payment Link in an incognito window
4. Use card `4242 4242 4242 4242`, any future expiry, any CVC
5. Fill the GitHub username field with `test-user`
6. Apply a promotion code if you want to test the flow
7. Complete checkout
8. Verify the redirect lands at `/programs/mib-insight/thanks`
9. Check the Stripe Dashboard for the test payment + custom-field data
10. Switch back to **live mode**

## 8. Configure Stripe email notifications

Stripe Dashboard → **Settings** → **Email** → confirm `terry.tsakiris@atheryon.com.au` is set to receive successful-payment notifications. (You rely on these to trigger the manual fulfillment workflow.)
````

- [ ] **Step 2: Terry runs through the runbook (one-time)**

This is a manual checklist for Terry. After completing it, the Stripe Payment Link exists and the website's CTA hrefs are updated to point at it. Run `npx next build` after Step 6 of the runbook and commit the URL update.

- [ ] **Step 3: Commit the runbook**

```bash
git add docs/superpowers/runbooks/stripe-setup.md
git commit -m "docs(runbooks): add Stripe setup runbook for MiB Insight Program"
```

---

## Task 9: Operations setup runbook (manual)

**Files:**
- Create: `docs/superpowers/runbooks/ops-setup.md`

- [ ] **Step 1: Create the operations runbook**

Create `docs/superpowers/runbooks/ops-setup.md` with the following content:

````markdown
# MiB Insight Program — Operations Runbook

This document covers the manual fulfillment workflow Terry follows for each Insight Program sale, plus initial ops setup. Per-sale ops takes ~10 minutes.

## One-time setup

### 1. Choose and create the tracking sheet

Pick one of: Notion · Airtable · Google Sheets. Create a single tracking sheet with these columns:

| Column | Type | Notes |
|--------|------|-------|
| Stripe Payment ID | text | from Stripe email/dashboard |
| Buyer email | email | from Stripe |
| Buyer name | text | from Stripe |
| Company | text | optional, from custom field |
| GitHub username | text | from custom field |
| Use case | text | optional, from custom field |
| Purchase date | date | |
| Expiry date | date | purchase date + 90 days |
| Status | select | active / expired / extended / refunded |
| Day-85 reminder sent | checkbox | |
| Day-90 revoked | checkbox | |
| Notes | text | per-buyer notes |

Save a calendar link to this sheet somewhere accessible (Stripe email signature, browser bookmark).

### 2. Create the private materials repo

Create a new private GitHub repository (e.g., `atheryon-ai/mib-insight-program-materials`).

Initial contents (placeholder until real content authoring begins):

- `README.md` — curriculum index (5 modules, brief descriptions)
- `PROGRAM_TERMS.md` — Polyform Internal Use 1.0.0 verbatim, plus Atheryon clauses (90-day window, no redistribution, no production use)
- `modules/01-foundations/` — placeholder
- `modules/02-front-office-trading/` — placeholder
- `modules/03-middle-office/` — placeholder
- `modules/04-back-office/` — placeholder
- `modules/05-compliance-reporting/` — placeholder

(Real content authoring is a separate effort — see the spec.)

### 3. Save email templates

Save these as Gmail templates (Settings → Advanced → Templates → enable, then compose → save). Three templates total.

#### Template A: Welcome (sent immediately after invitation)

```
Subject: Welcome to the MiB Insight Program

Hi [Name],

Thanks for joining the MiB Insight Program. Your access is active for 90 days, until [DATE].

You've been added to the program materials here: [GITHUB_URL]
Please read PROGRAM_TERMS.md before you start.

Suggested first step: open the Foundations module — it shows how to use the IP with your AI agent in about 15 minutes.

Reply to this email any time.

— Terry
```

#### Template B: Day-85 nudge

```
Subject: Five days left on your MiB Insight Program access

Hi [Name],

A quick heads-up — your Insight Program access expires in 5 days, on [EXPIRY_DATE].

Two options worth considering:

  1. Extend access — 30 more days for $5,000. Reply and I'll send a code.
  2. Move up to the Build Program — implementation IP plus 12 months of access. Happy to walk you through it.

If neither fits, no problem — your access ends [EXPIRY_DATE] and you can return any time.

— Terry
```

#### Template C: Day-90 revocation + upsell

```
Subject: Your MiB Insight Program access has ended

Hi [Name],

Your 90-day Insight Program access has ended. Per PROGRAM_TERMS.md, please remove any local copies of the materials.

If you got value from the program — and want to take it further — the Build Program is the next step: implementation IP, 12-month access, and ongoing updates. Happy to walk you through it.

Either way, thanks for joining.

— Terry
```

### 4. Set up the Stripe-email watch

Make sure `terry.tsakiris@atheryon.com.au` is the email on the Stripe account so payment notifications land in the right inbox. Consider a Gmail filter to label and star Stripe payment notifications so they're hard to miss.

## Per-sale workflow (run on every Stripe payment notification)

1. **Open the Stripe Dashboard** session and confirm payment cleared
2. **Copy the buyer's GitHub username** from the Stripe custom field
3. **Add as collaborator**: GitHub repo → Settings → Collaborators → Add → set permission to **Read**
4. **Send Welcome email** (Template A) — fill in [Name], [DATE = purchase + 90 days], [GITHUB_URL = the materials repo]
5. **Log in tracking sheet**: copy Stripe Payment ID, email, name, company, GitHub username, use case, purchase date, expiry date, status = `active`
6. **Set two calendar reminders**:
   - Day 85: title "Day-85 nudge — [Buyer name]" — action: send Template B
   - Day 90: title "Day-90 revoke — [Buyer name]" — action: remove collaborator + send Template C, mark sheet `expired`

## Edge cases

- **Wrong GitHub username at checkout**: reply to Welcome email asking confirmation; ask for the correct username; update the collaborator invite.
- **Refund request**: policy is no refunds after access; exception at Terry's discretion. If granted, refund via Stripe + remove collaborator.
- **Extension request**: invoice via Stripe (use Stripe Invoicing → Customer → New invoice → "Insight Program — 30-day extension" — $5,000) and update the expiry date in the tracking sheet.
- **Add team members**: invoice each additional seat ($5,000 each) and add the additional GitHub usernames as separate collaborators.
- **Public leak of IP**: DMCA via GitHub support + notice email citing PROGRAM_TERMS.md.
- **Chargeback**: revoke collaborator immediately; respond to dispute via Stripe.

## Trigger to upgrade to Approach 2 (automation)

Move from manual to automated when **any** of:
- Sustained > 5 sales/month for two consecutive months
- A sale lands while you're asleep / travelling and fulfillment lags by hours
- Tracking-sheet drift — a day-90 reminder gets missed

Approach 2 work: ~1–2 weeks. Migrate to Stripe Checkout (custom fields collected via Checkout, not Payment Link), build an Azure SWA Function for the `checkout.session.completed` webhook, integrate the GitHub API for collaborator-add, build a scheduled SWA Function for revocation, and persist access state in Azure Table Storage.
````

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/runbooks/ops-setup.md
git commit -m "docs(runbooks): add operations runbook for MiB Insight Program fulfillment"
```

---

## Task 10: Final verification

- [ ] **Step 1: Run the full Playwright suite**

Run: `npm run build && npx playwright test`
Expected: all tests pass across all browsers.

- [ ] **Step 2: Language-discipline grep**

Run from the repo root:

```bash
grep -nE -i "software|license|source code|repository|github|deploy" src/content/site.ts
```

Review every match. **No match should fall inside the `programs`, `mibInsight`, or `mibInsightThanks` blocks** added in Task 1. (Pre-existing matches in other parts of `site.ts`, if any, are unrelated to this plan.) If any of the new blocks contain a don't-say word, edit the copy and re-run the grep until clean.

- [ ] **Step 3: Manual end-to-end with Stripe test card**

Per the Stripe runbook Step 7, run a full purchase against a test-mode Payment Link. Confirm:
- Checkout displays the GitHub-username custom field
- Promotion-code field is visible
- Successful payment redirects to `/programs/mib-insight/thanks`
- The thanks page renders the welcome message
- The Stripe dashboard shows the test payment with the custom-field data captured

- [ ] **Step 4: Confirm production readiness**

Tick the readiness checklist:

- [ ] Stripe live-mode Payment Link URL is in `site.ts` (no `REPLACE_ME`)
- [ ] All Playwright tests pass
- [ ] No don't-say words on any public surface
- [ ] Tracking sheet is created
- [ ] Email templates are saved in Gmail
- [ ] Materials repo exists (even if placeholder content)
- [ ] Stripe email notifications land in `terry.tsakiris@atheryon.com.au`
- [ ] Header and footer show Programs link

- [ ] **Step 5: Deploy**

Push to the deployment branch (or merge to `main` per the existing release flow). Verify the live site at `https://atheryon.com.au/programs/mib-insight/` after deploy.

- [ ] **Step 6: Mark the storefront launch complete**

If any items in Step 4 are unticked, return to the relevant task; otherwise this plan is done. The first sale is now possible.

---

## Open questions surfaced during planning

- **Currency**: USD assumed throughout. If Terry prefers AUD, swap "USD" for "AUD" in the Stripe runbook and the `priceFootnote` in `site.ts`.
- **Tracking-sheet platform**: Notion, Airtable, or Google Sheets — Terry's choice. The ops runbook does not assume one.
- **Materials-repo name**: `atheryon-ai/mib-insight-program-materials` is the suggested name. Update the welcome-email template if Terry chooses a different name.
- **Production domain**: the Stripe runbook references `https://atheryon.com.au/programs/mib-insight/thanks`. Confirm the production hostname before configuring the Payment Link redirect URL.

## What this plan does NOT do (separate efforts)

- Author the actual content for the 5 module bundles (prompts, schemas, designs, transcripts, sample data). That work happens in the materials repo over weeks 1–3 per the spec; treat it as a separate plan.
- Draft the full `PROGRAM_TERMS.md` file (Polyform Internal Use 1.0.0 + Atheryon clauses). Drop the Polyform text in the materials repo as a one-off task.
- Build any of Approach 2's automation (webhook, GitHub API integration, scheduled revocation). That triggers off the criteria in Task 9.
- Build Program / Run Program (Silver/Gold tier) pages. Only "coming" placeholders ship with this plan.
