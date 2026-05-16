# Build `/offers` pages and retire MiB Insight — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current `/labs/{code,prompts,advisory}` + `/programs/mib-insight` commercial pages with a unified `/offers/{code,prompts,consult}` IA. Fold the MiB Insight $14k bundle into `/offers/prompts` as a productized Front Office bundle (not a separate brand). Redirect every legacy route via Azure SWA config so no inbound link breaks.

**Architecture:**
- This is a Next.js 14 static export (`output: 'export'`, `images.unoptimized: true`). No server-side redirects exist — all 301s live in `staticwebapp.config.json`.
- Content stays in `src/content/site.ts` under a new `site.pages.offers.*` block. Existing `labsCode` / `labsPrompts` / `labsAdvisory` blocks get renamed (not copied) to `offers.code` / `offers.prompts` / `offers.consult`.
- New routes at `src/app/offers/{,code,prompts,consult}/page.tsx`. Old pages at `src/app/labs/{code,prompts,advisory}/page.tsx` and `src/app/programs/mib-insight/page.tsx` are deleted. SWA serves 301 redirects.
- Nav update: HomeNav's "INSIGHTS" entry (currently pointing to `/labs`) is replaced with "OFFERS" pointing to `/offers`. `/labs` stays accessible from the footer.
- Playwright smoke tests cover: each new route returns 200, each old route's redirect target resolves at 200 in the static export's `out/` dir, mobile viewport renders without horizontal overflow.

**Tech Stack:** Next.js 14, TypeScript, Tailwind v3, Azure Static Web Apps, Playwright (existing chromium-only suite).

---

## File Structure

### Create
- `src/app/offers/page.tsx` — index page showing 3 offer cards + intro
- `src/app/offers/code/page.tsx` — "Buy the code" offer page
- `src/app/offers/prompts/page.tsx` — "License the prompts" offer page (absorbs MiB Front Office bundle)
- `src/app/offers/consult/page.tsx` — "Consult" offer page (renamed from advisory)
- `tests/offers.spec.ts` — Playwright smoke tests for new routes

### Modify
- `src/content/site.ts` — rename `labsCode` → `offers.code` (and prompts/advisory analogues), add MiB Front Office bundle subsection to `offers.prompts`, update home engagement card `ctaHref`s, update footer pillars + resources links, drop MiB Insight footer entry
- `src/components/home/HomeNav.tsx` — replace `{ label: 'INSIGHTS', href: '/labs' }` with `{ label: 'OFFERS', href: '/offers' }`
- `staticwebapp.config.json` — add 4 redirects (`/labs/code` → `/offers/code`, `/labs/prompts` → `/offers/prompts`, `/labs/advisory` → `/offers/consult`, `/programs/mib-insight` → `/offers/prompts`) and 4 rewrites for new offer routes
- `public/sitemap.xml` — drop `/programs/mib-insight` entry, add `/offers/*` entries

### Delete
- `src/app/labs/code/page.tsx`
- `src/app/labs/prompts/page.tsx`
- `src/app/labs/advisory/page.tsx`
- `src/app/programs/mib-insight/page.tsx`
- `src/app/programs/mib-insight/thanks/page.tsx` (transactional confirmation only reachable from MiB purchase flow; if you keep the $14k bundle alive on `/offers/prompts`, repoint its Stripe success URL to `/offers/prompts/thanks` — out of scope for this plan, deletion is fine if MiB Stripe is paused)

---

## Pre-flight: confirm working tree + branch

- [ ] **Step 0.1: Verify clean working tree on `dev` branch**

Run:
```bash
git status --porcelain
git branch --show-current
```

Expected: empty `git status` output, branch name `dev`. If not, stop and reconcile (commit, stash, or pull).

- [ ] **Step 0.2: Verify last commit is the CDM fix**

Run:
```bash
git log --oneline -1
```

Expected: `510e57f fix(content): correct CDM/ISO 20022/FpML counts on /labs/code + themes` (or newer if other work landed since).

---

## Task 1: Rename `labsCode` content block to `offers.code` in `site.ts`

**Files:**
- Modify: `src/content/site.ts` (the `labsCode` block under `site.pages`)

- [ ] **Step 1.1: Find the existing `labsCode` block**

Run:
```bash
grep -n "labsCode: {" src/content/site.ts
```

Expected: a single line number where `labsCode: {` begins (the start of the labsCode object inside `site.pages`).

- [ ] **Step 1.2: Wrap it in a new `offers` namespace**

Replace the existing `labsCode: { ... }`, `labsPrompts: { ... }`, and `labsAdvisory: { ... }` keys inside `site.pages` with a single `offers: { code: { ... }, prompts: { ... }, consult: { ... } }` block.

Concretely: the existing three top-level keys move into the nested `offers` namespace, and `labsAdvisory` becomes `consult` (renamed). All internal field names (`title`, `description`, `hero`, `whatYouGet`, `bestFor`, `pricing`, `cta`) stay the same so the page components need minimal changes.

For each block, also update internal references:
- `labsCode.cta.href` is currently `'/contact'` (or similar). Leave as `'/contact'` if so — that's the conversion target.
- Internal labels like `'atheryon / labs / code'` in the DocBanner label can be updated by the page component; not here.

- [ ] **Step 1.3: Update home `engagement.cards[].ctaHref` values**

Find:
```bash
grep -n "ctaHref: '/labs/code'\|ctaHref: '/labs/prompts'\|ctaHref: '/labs/advisory'" src/content/site.ts
```

Replace:
- `ctaHref: '/labs/code'` → `ctaHref: '/offers/code'`
- `ctaHref: '/labs/prompts'` → `ctaHref: '/offers/prompts'`
- `ctaHref: '/labs/advisory'` → `ctaHref: '/offers/consult'`

Also rename the third card's label from "Engage the builder" → "Consult" if matching the new offer name reads better. Optional polish, not required.

- [ ] **Step 1.4: Update footer links**

Find:
```bash
grep -n "/labs/code\|/labs/prompts\|/labs/advisory\|/programs/mib-insight" src/content/site.ts
```

In the `footer.links` section:
- Remove the MiB Insight entry (`{ label: 'MiB Insight', href: '/programs/mib-insight' }`) entirely
- If any explicit `/labs/code` / `/labs/prompts` / `/labs/advisory` entries exist in resources, update to `/offers/code` / `/offers/prompts` / `/offers/consult`

- [ ] **Step 1.5: Typecheck**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors. If the existing `/labs/code/page.tsx`, `/labs/prompts/page.tsx`, `/labs/advisory/page.tsx`, `/programs/mib-insight/page.tsx` files reference the now-removed `labsCode` / `labsPrompts` / `labsAdvisory` / `mibInsight` keys, you'll see compile errors. That's expected — they get fixed in Task 2.

- [ ] **Step 1.6: Commit**

```bash
git add src/content/site.ts
git commit -m "refactor(content): rename labs* + retire mib-insight content into site.pages.offers.{code,prompts,consult}"
```

---

## Task 2: Migrate the MiB Front Office bundle content into `offers.prompts`

**Files:**
- Read: `src/app/programs/mib-insight/page.tsx` (149 lines — the current MiB sales page)
- Modify: `src/content/site.ts` — append a `frontOfficeBundle` subsection inside `offers.prompts`

- [ ] **Step 2.1: Read the existing MiB page**

Run:
```bash
cat src/app/programs/mib-insight/page.tsx
```

Identify these content elements:
- Hero headline + lede
- The $14k price tag and what it includes
- "5 modules" curriculum
- "5 outcomes" / "7 artifact types"
- FAQ items
- Any embedded form / purchase action URL

Keep the price + curriculum content. Discard generic "MiB" framing (that's the brand we're retiring) — refer to it as "Front Office bundle" or "Front Office prompts pack".

- [ ] **Step 2.2: Append `frontOfficeBundle` to `offers.prompts` in `site.ts`**

In the `offers.prompts` block (from Task 1), add a new field after `pricing`:

```ts
frontOfficeBundle: {
  badge: 'Productized bundle',
  title: 'Front Office bundle',
  price: '$14,000 AUD',
  body: 'A pre-packaged curriculum + IP slice for Front Office trading workflows — five modules, sample data, schemas, design specs, reference architectures, example transcripts. Used within 30 days of purchase.',
  modules: [
    'Foundations',
    'Front Office: Trading',
    'Middle Office: Lifecycle & Risk',
    'Back Office: Books & Operations',
    'Compliance & Reporting',
  ],
  artifactTypes: [
    'Prompts pack (10–20 ready-to-use)',
    'Schemas (CDM-aware, JSON Schema, OpenAPI)',
    'Design specs (annotated diagrams, Figma exports)',
    'Reference architectures',
    'Example transcripts (recorded Claude/Cursor sessions)',
    'Sample data (synthetic + real)',
    'Walkthrough video',
  ],
  cta: { label: 'Request the bundle →', href: '/contact?topic=front-office-bundle' },
},
```

- [ ] **Step 2.3: Typecheck**

Run:
```bash
npx tsc --noEmit
```

Expected: no new errors beyond the still-broken `/labs/*` and `/programs/mib-insight` pages.

- [ ] **Step 2.4: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(content): add Front Office bundle subsection to offers.prompts"
```

---

## Task 3: Create `/offers` index page

**Files:**
- Create: `src/app/offers/page.tsx`

- [ ] **Step 3.1: Verify the directory does not exist yet**

Run:
```bash
ls src/app/offers 2>&1
```

Expected: `ls: src/app/offers: No such file or directory`. If the directory exists, list it and reconcile before proceeding.

- [ ] **Step 3.2: Create the index page**

Create `src/app/offers/page.tsx` with the following content:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection } from '@/components'
import { site } from '@/content/site'

const { offers } = site.pages

export const metadata: Metadata = {
  title: 'Offers — Atheryon',
  description: 'Three commercial paths into the Atheryon platform: license the code, license the prompt archive, or engage Terry for a consult.',
  openGraph: {
    title: 'Offers — Atheryon',
    description: 'Three commercial paths into the Atheryon platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offers — Atheryon',
    description: 'Three commercial paths into the Atheryon platform.',
  },
  alternates: { canonical: 'https://atheryon.com.au/offers' },
}

const OFFER_LINKS = [
  { href: '/offers/code', number: '01', title: 'Buy the code', blurb: offers.code.hero.lede },
  { href: '/offers/prompts', number: '02', title: 'License the prompts', blurb: offers.prompts.hero.lede },
  { href: '/offers/consult', number: '03', title: 'Consult', blurb: offers.consult.hero.lede },
] as const

export default function OffersPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers"
        title="Three commercial paths"
        body="The Atheryon platform is available as licensable code, as a directorial prompt archive, or as a senior-led consult engagement. Pick the one that matches how you want to absorb the work."
      />
      <DocSection label="§01 / Choose your path" title="">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {OFFER_LINKS.map((o) => (
            <li key={o.href} className="bg-bone p-6 flex flex-col">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                {o.number}
              </div>
              <Link
                href={o.href}
                className="font-display text-2xl font-medium text-charcoal tracking-tight underline-offset-4 hover:underline mb-3"
              >
                {o.title}
              </Link>
              <p className="text-base text-charcoal/80 leading-relaxed">{o.blurb}</p>
            </li>
          ))}
        </ul>
      </DocSection>
    </DocPage>
  )
}
```

Note: `offers.code.hero.lede` / `offers.prompts.hero.lede` / `offers.consult.hero.lede` must exist in `site.ts` after Task 1's rename. If field shapes differ (e.g., the lede field is named `body` not `lede`), adjust the references here. Run `grep -A2 "hero: {" src/content/site.ts | head -20` to confirm field names.

- [ ] **Step 3.3: Typecheck**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors related to `src/app/offers/page.tsx`. Errors still expected in the to-be-deleted `/labs/*` pages.

- [ ] **Step 3.4: Commit**

```bash
git add src/app/offers/page.tsx
git commit -m "feat(offers): add /offers index page rendering 3 commercial paths"
```

---

## Task 4: Create `/offers/code/page.tsx`

**Files:**
- Create: `src/app/offers/code/page.tsx`

- [ ] **Step 4.1: Create the page**

Create `src/app/offers/code/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { code } = site.pages.offers

export const metadata: Metadata = {
  title: code.title,
  description: code.description,
  openGraph: { title: code.title, description: code.description },
  twitter: {
    card: 'summary_large_image',
    title: code.title,
    description: code.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/offers/code' },
}

export default function OffersCodePage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / code"
        title={code.hero.headline}
        body={code.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={code.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={code.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={code.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={code.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={code.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {code.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / offers / code / end-of-document
          </div>
          <Link
            href={code.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {code.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
```

This mirrors the existing `/labs/code/page.tsx` structure exactly, with three changes: import path (`site.pages.offers.code` not `site.pages.labsCode`), DocBanner label (`atheryon / offers / code`), and canonical URL.

- [ ] **Step 4.2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors in `src/app/offers/code/`.

- [ ] **Step 4.3: Commit**

```bash
git add src/app/offers/code/page.tsx
git commit -m "feat(offers): add /offers/code page (migrated from /labs/code)"
```

---

## Task 5: Create `/offers/prompts/page.tsx` (with Front Office bundle)

**Files:**
- Create: `src/app/offers/prompts/page.tsx`

- [ ] **Step 5.1: Create the page**

Create `src/app/offers/prompts/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { prompts } = site.pages.offers

export const metadata: Metadata = {
  title: prompts.title,
  description: prompts.description,
  openGraph: { title: prompts.title, description: prompts.description },
  twitter: {
    card: 'summary_large_image',
    title: prompts.title,
    description: prompts.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/offers/prompts' },
}

export default function OffersPromptsPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / prompts"
        title={prompts.hero.headline}
        body={prompts.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={prompts.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={prompts.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={prompts.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={prompts.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={prompts.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {prompts.pricing.body}
        </p>
      </DocSection>

      <DocSection
        label="§04 / Front Office bundle"
        title={prompts.frontOfficeBundle.title}
      >
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
            {prompts.frontOfficeBundle.badge} · {prompts.frontOfficeBundle.price}
          </div>
          <p className="text-base text-charcoal/85 leading-relaxed mb-6">
            {prompts.frontOfficeBundle.body}
          </p>
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-charcoal/60 mb-2">
            Modules
          </div>
          <DocBullets items={prompts.frontOfficeBundle.modules} />
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-charcoal/60 mt-6 mb-2">
            Artifact types
          </div>
          <DocBullets items={prompts.frontOfficeBundle.artifactTypes} />
          <div className="mt-6">
            <Link
              href={prompts.frontOfficeBundle.cta.href}
              className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              {prompts.frontOfficeBundle.cta.label}
            </Link>
          </div>
        </div>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / offers / prompts / end-of-document
          </div>
          <Link
            href={prompts.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {prompts.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
```

- [ ] **Step 5.2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors in `src/app/offers/prompts/`.

- [ ] **Step 5.3: Commit**

```bash
git add src/app/offers/prompts/page.tsx
git commit -m "feat(offers): add /offers/prompts page absorbing MiB Front Office bundle"
```

---

## Task 6: Create `/offers/consult/page.tsx`

**Files:**
- Create: `src/app/offers/consult/page.tsx`

- [ ] **Step 6.1: Create the page**

Create `src/app/offers/consult/page.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { consult } = site.pages.offers

export const metadata: Metadata = {
  title: consult.title,
  description: consult.description,
  openGraph: { title: consult.title, description: consult.description },
  twitter: {
    card: 'summary_large_image',
    title: consult.title,
    description: consult.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/offers/consult' },
}

export default function OffersConsultPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / consult"
        title={consult.hero.headline}
        body={consult.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={consult.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={consult.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={consult.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={consult.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={consult.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {consult.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / offers / consult / end-of-document
          </div>
          <Link
            href={consult.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {consult.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
```

- [ ] **Step 6.2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors in `src/app/offers/consult/`.

- [ ] **Step 6.3: Commit**

```bash
git add src/app/offers/consult/page.tsx
git commit -m "feat(offers): add /offers/consult page (relabeled from /labs/advisory)"
```

---

## Task 7: Delete legacy `/labs/{code,prompts,advisory}` pages

**Files:**
- Delete: `src/app/labs/code/page.tsx`
- Delete: `src/app/labs/prompts/page.tsx`
- Delete: `src/app/labs/advisory/page.tsx`

- [ ] **Step 7.1: Confirm new pages exist**

```bash
ls src/app/offers/code/page.tsx src/app/offers/prompts/page.tsx src/app/offers/consult/page.tsx
```

Expected: all three listed.

- [ ] **Step 7.2: Delete legacy pages**

```bash
rm src/app/labs/code/page.tsx src/app/labs/prompts/page.tsx src/app/labs/advisory/page.tsx
rmdir src/app/labs/code src/app/labs/prompts src/app/labs/advisory
```

- [ ] **Step 7.3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: zero errors (the broken imports from the legacy pages are now gone).

- [ ] **Step 7.4: Commit**

```bash
git add -A src/app/labs/
git commit -m "chore(labs): remove legacy /labs/{code,prompts,advisory} pages (migrated to /offers)"
```

---

## Task 8: Delete `/programs/mib-insight` (and `/thanks` if MiB Stripe is paused)

**Files:**
- Delete: `src/app/programs/mib-insight/page.tsx`
- Delete: `src/app/programs/mib-insight/thanks/page.tsx`

- [ ] **Step 8.1: Confirm `/offers/prompts` includes the bundle**

```bash
grep -n "frontOfficeBundle" src/app/offers/prompts/page.tsx
```

Expected: at least one match (from Task 5).

- [ ] **Step 8.2: Delete legacy MiB pages**

```bash
rm src/app/programs/mib-insight/page.tsx src/app/programs/mib-insight/thanks/page.tsx
rmdir src/app/programs/mib-insight/thanks src/app/programs/mib-insight
```

If the `mib-insight` subtree is gone, check whether `src/app/programs/page.tsx` still renders meaningful content (it's the Programs landing page). If it's now an orphan that doesn't make sense, you have two choices: keep it as-is (programs subtree may grow back later), or also delete `src/app/programs/`. Default: keep `programs/page.tsx` for now.

- [ ] **Step 8.3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: zero errors. If `src/app/programs/page.tsx` references `mibInsight` content from `site.ts` (removed in Task 1), update it to a placeholder or delete the page. Run `grep -n 'mibInsight' src/app/programs/page.tsx` first to check.

- [ ] **Step 8.4: Commit**

```bash
git add -A src/app/programs/
git commit -m "chore(programs): retire /programs/mib-insight (folded into /offers/prompts as Front Office bundle)"
```

---

## Task 9: Update HomeNav — replace INSIGHTS with OFFERS

**Files:**
- Modify: `src/components/home/HomeNav.tsx`

- [ ] **Step 9.1: Read the file**

```bash
cat src/components/home/HomeNav.tsx
```

Find the `links` array (around line 6).

- [ ] **Step 9.2: Replace the INSIGHTS entry**

Find:
```ts
{ label: 'INSIGHTS', href: '/labs' },
```

Replace with:
```ts
{ label: 'OFFERS', href: '/offers' },
```

The nav order stays: SYSTEM · APPROACH · ENGAGEMENTS · WORKFLOWS · ABOUT · **OFFERS** (was INSIGHTS). `/labs` is still accessible from the footer (Task 1 step 1.4).

Note: per the matrix-IA decisions in the strategy poster, a future cleanup will also drop APPROACH (currently a stub) and ENGAGEMENTS (folded into OFFERS conceptually). That's out of scope for this plan — it's Phase 3+ work and depends on /themes promotion. For now, keep the existing six items and just rename one.

- [ ] **Step 9.3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 9.4: Commit**

```bash
git add src/components/home/HomeNav.tsx
git commit -m "feat(nav): replace INSIGHTS->/labs with OFFERS->/offers"
```

---

## Task 10: Update `staticwebapp.config.json` — add redirects + rewrites

**Files:**
- Modify: `staticwebapp.config.json`

- [ ] **Step 10.1: Read the file**

```bash
cat staticwebapp.config.json
```

Locate the `routes` array.

- [ ] **Step 10.2: Add 4 new redirects (top of routes array)**

Insert these entries near the top of the `routes` array, immediately after the existing redirect block (after the `/reference-architectures` entry — see existing convention):

```json
{ "route": "/labs/code",            "redirect": "/offers/code",    "statusCode": 301 },
{ "route": "/labs/prompts",         "redirect": "/offers/prompts", "statusCode": 301 },
{ "route": "/labs/advisory",        "redirect": "/offers/consult", "statusCode": 301 },
{ "route": "/programs/mib-insight", "redirect": "/offers/prompts", "statusCode": 301 },
{ "route": "/programs/mib-insight/thanks", "redirect": "/offers/prompts", "statusCode": 301 },
```

- [ ] **Step 10.3: Add 4 new rewrites (in the rewrites block)**

Insert into the rewrites section (after the existing `/contact` rewrite):

```json
{ "route": "/offers",         "rewrite": "/offers.html" },
{ "route": "/offers/code",    "rewrite": "/offers/code.html" },
{ "route": "/offers/prompts", "rewrite": "/offers/prompts.html" },
{ "route": "/offers/consult", "rewrite": "/offers/consult.html" },
```

- [ ] **Step 10.4: Remove obsolete entries**

Find and remove these obsolete rewrites (no longer needed; the redirect rules above cover them):
```json
{ "route": "/programs/mib-insight",          "rewrite": "/programs/mib-insight.html" },
{ "route": "/programs/mib-insight/thanks",   "rewrite": "/programs/mib-insight/thanks.html" },
```

Leave `/labs` (the discovery page) rewrite untouched — that route is still live.

- [ ] **Step 10.5: Validate JSON**

```bash
python3 -m json.tool staticwebapp.config.json > /dev/null
```

Expected: no output (valid JSON). If parse error, fix the comma/bracket issue.

- [ ] **Step 10.6: Commit**

```bash
git add staticwebapp.config.json
git commit -m "feat(swa): redirect /labs/{code,prompts,advisory} + /programs/mib-insight to /offers/*"
```

---

## Task 11: Update sitemap.xml

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 11.1: Read the file**

```bash
cat public/sitemap.xml
```

- [ ] **Step 11.2: Remove MiB entry and add offers entries**

Remove this line (or whatever variant currently exists):
```xml
<url><loc>https://atheryon.com.au/programs/mib-insight</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

Add these four lines (place them near other `/labs` or top-level entries to keep ordering sensible):
```xml
<url><loc>https://atheryon.com.au/offers</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://atheryon.com.au/offers/code</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>https://atheryon.com.au/offers/prompts</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>https://atheryon.com.au/offers/consult</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

Also remove these if present (they're now redirects, not live URLs that crawlers should index):
```xml
<url><loc>https://atheryon.com.au/labs/code</loc>...</url>
<url><loc>https://atheryon.com.au/labs/prompts</loc>...</url>
<url><loc>https://atheryon.com.au/labs/advisory</loc>...</url>
```

- [ ] **Step 11.3: Validate XML**

```bash
xmllint --noout public/sitemap.xml
```

Expected: no output. If `xmllint` isn't installed, just verify visually that opening/closing tags balance.

- [ ] **Step 11.4: Commit**

```bash
git add public/sitemap.xml
git commit -m "chore(sitemap): add /offers/* urls + drop legacy MiB url"
```

---

## Task 12: Build smoke tests for /offers

**Files:**
- Create: `tests/offers.spec.ts`

- [ ] **Step 12.1: Look at an existing test for pattern**

```bash
ls tests/
cat tests/home.spec.ts 2>/dev/null | head -40
```

Use the same setup pattern (test, expect, page imports, baseURL convention).

- [ ] **Step 12.2: Write the failing test file**

Create `tests/offers.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

const OFFER_ROUTES = [
  '/offers',
  '/offers/code',
  '/offers/prompts',
  '/offers/consult',
]

for (const route of OFFER_ROUTES) {
  test(`${route} renders without console errors`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    expect(consoleErrors).toEqual([])
  })

  test(`${route} fits mobile viewport at 375px (no horizontal overflow)`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(route)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scrollWidth).toBeLessThanOrEqual(375)
  })
}

test('Front Office bundle is visible on /offers/prompts', async ({ page }) => {
  await page.goto('/offers/prompts')
  await expect(page.getByText('Front Office bundle')).toBeVisible()
  await expect(page.getByText('$14,000 AUD')).toBeVisible()
})

test('legacy /labs/code redirects to /offers/code', async ({ page }) => {
  const response = await page.goto('/labs/code')
  expect(response?.url()).toContain('/offers/code')
})

test('legacy /programs/mib-insight redirects to /offers/prompts', async ({ page }) => {
  const response = await page.goto('/programs/mib-insight')
  expect(response?.url()).toContain('/offers/prompts')
})
```

- [ ] **Step 12.3: Run the test — expect it to fail (next dev server not aware of static export rewrites)**

Note: Playwright's `webServer` in `playwright.config.ts` likely runs `next dev` which serves the new routes correctly but does NOT apply SWA redirects (those only run in deployed test/prod). The legacy-redirect tests will fail locally. Skip them in dev by adding a guard:

```ts
const SKIP_LOCAL_REDIRECTS = !process.env.SWA_BASE_URL
// ...
test.skip(SKIP_LOCAL_REDIRECTS, 'legacy /labs/code redirects to /offers/code', async ({ page }) => { /* ... */ })
test.skip(SKIP_LOCAL_REDIRECTS, 'legacy /programs/mib-insight redirects to /offers/prompts', async ({ page }) => { /* ... */ })
```

Wrap the two redirect tests in `test.skip(...)` instead of `test(...)` when running against `next dev`. They run only when `SWA_BASE_URL` env var points at the deployed test SWA. Or use `test.describe.skip()` to skip the whole block.

Run:
```bash
npx playwright test tests/offers.spec.ts --project=chromium
```

Expected: the 4 route-renders-and-no-overflow tests PASS, the Front Office bundle test PASSES, the 2 redirect tests SKIP locally.

- [ ] **Step 12.4: Commit**

```bash
git add tests/offers.spec.ts
git commit -m "test(offers): add smoke tests for /offers routes + legacy redirects"
```

---

## Task 13: Full local build + visual sanity check

- [ ] **Step 13.1: Run the static export build**

```bash
npx next build
```

Expected: build completes, output in `out/`. Look for these files:
- `out/offers.html`
- `out/offers/code.html`
- `out/offers/prompts.html`
- `out/offers/consult.html`

No `out/labs/code.html`, `out/labs/prompts.html`, `out/labs/advisory.html`, or `out/programs/mib-insight.html` should be produced.

- [ ] **Step 13.2: Verify with `ls`**

```bash
ls out/offers/
ls out/labs/ 2>&1 | grep -E "code|prompts|advisory"
ls out/programs/ 2>&1 | grep mib-insight
```

Expected: `out/offers/code.html prompts.html consult.html` present. Old paths absent.

- [ ] **Step 13.3: Visual check at desktop + mobile**

Start the dev server (if not already running):
```bash
npx next dev
```

In a browser (or via `$B`):
- Visit `http://localhost:3000/offers` — see 3 offer cards
- Visit `http://localhost:3000/offers/code` — see hero + 3 sections + bottom CTA
- Visit `http://localhost:3000/offers/prompts` — see hero + 3 sections + Front Office bundle section + bottom CTA
- Visit `http://localhost:3000/offers/consult` — see hero + 3 sections + bottom CTA
- Resize to mobile 375px and confirm no horizontal overflow on any page

If the gstack browse binary is available, this can be automated:
```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 1280x800
for r in /offers /offers/code /offers/prompts /offers/consult; do
  "$B" goto "http://localhost:3000$r"
  "$B" screenshot "/tmp/$(echo $r | tr / -)-desktop.png"
done
"$B" viewport 375x812
for r in /offers /offers/code /offers/prompts /offers/consult; do
  "$B" goto "http://localhost:3000$r"
  sw=$("$B" js "document.documentElement.scrollWidth" 2>/dev/null | grep -oE '[0-9]+')
  echo "$r mobile scrollWidth=$sw (target 375)"
  "$B" screenshot "/tmp/$(echo $r | tr / -)-mobile.png"
done
```

Expected: all four pages return `scrollWidth=375`. If any returns >375, find the overflowing element with the same JS audit pattern used in the prior responsive QA work and fix before continuing.

- [ ] **Step 13.4: No commit at this step** — verification only.

---

## Task 14: Push to test SWA and verify the redirects work in deployment

- [ ] **Step 14.1: Push to `dev`**

```bash
git push origin dev
```

- [ ] **Step 14.2: Watch the deploy**

```bash
gh run list --branch dev --limit 2
gh run watch <run-id-for-Deploy-to-Test-Environment> --exit-status
```

Expected: green deploy in ~1m20s.

- [ ] **Step 14.3: Verify the redirects work in production**

```bash
TEST=https://polite-flower-03ba3020f.7.azurestaticapps.net
curl -sI "$TEST/labs/code"            | grep -E "HTTP|Location"
curl -sI "$TEST/labs/prompts"         | grep -E "HTTP|Location"
curl -sI "$TEST/labs/advisory"        | grep -E "HTTP|Location"
curl -sI "$TEST/programs/mib-insight" | grep -E "HTTP|Location"
```

Expected: each returns `HTTP/2 301` (or `HTTP/1.1 301`) and a `Location:` header pointing to the new `/offers/*` URL.

- [ ] **Step 14.4: Verify the new pages render**

```bash
for r in /offers /offers/code /offers/prompts /offers/consult; do
  echo -n "$r → "
  curl -sI "$TEST$r" | head -1
done
```

Expected: all four `HTTP/2 200`.

- [ ] **Step 14.5: Run Playwright against the deployed test SWA (optional)**

```bash
SWA_BASE_URL=$TEST npx playwright test tests/offers.spec.ts --project=chromium
```

Expected: all tests pass, including the two previously-skipped redirect tests.

- [ ] **Step 14.6: No commit at this step** — verification only.

---

## Task 15: Update the strategy poster + status note

**Files:**
- Modify: `.context/strategy-poster.html`

- [ ] **Step 15.1: Mark Phase 2 shipped**

In `.context/strategy-poster.html`, find the Phase 2 entry under §05 Phasing. Change the title from:
```html
<div class="ptitle">Build /offers — three pages, each a real buying conversation</div>
```
to:
```html
<div class="ptitle">Build /offers + retire MiB <span class="ptag shipped">shipped</span></div>
```

Update the §04 Decisions made list — add a new entry:
```html
<li><strong>Phase 2 shipped.</strong> /offers/{code,prompts,consult} live on test SWA. Legacy /labs/{code,prompts,advisory} + /programs/mib-insight redirect via SWA config. HomeNav: INSIGHTS → OFFERS. <span class="ans">shipped</span></li>
```

- [ ] **Step 15.2: No commit** — `.context/` is gitignored.

---

## Self-Review Notes

**Spec coverage (against the strategy poster + this session's decisions):**

| Decision | Task |
|---|---|
| Pillars stay (Capital Markets Systems / Data Platforms / AI Agent Systems) | Untouched by this plan — preserved |
| Engagement model → 3 offers | Tasks 1-6 |
| MiB Insight retired (Option A: demote, keep brand inside Prompts) | Task 2 + Task 5 |
| HomeNav: INSIGHTS → OFFERS | Task 9 |
| Themes promoted to top-level nav | OUT OF SCOPE — Phase 3+, separate plan |
| Proof gallery per row | OUT OF SCOPE — waits for screenshot regen + Phase 3+ |
| Verify CDM numbers | Already shipped in commit `510e57f` |
| NDA redact | Already shipped in commit `0884046` |

**Placeholder scan:** No `TBD`/`TODO`/`implement later` in this plan. Every step has either code, a command, or an explicit decision.

**Type consistency:** New types referenced by name:
- `site.pages.offers.code`, `.prompts`, `.consult` — defined in Task 1 step 1.2
- `site.pages.offers.prompts.frontOfficeBundle` — defined in Task 2 step 2.2
- All page components use only fields defined in those blocks

**Field-shape risk:** Task 3 step 3.2 references `offers.code.hero.lede` / `.prompts.hero.lede` / `.consult.hero.lede`. The existing `labsCode.hero` shape needs verification — if the lede field is named differently (e.g. `body`), the executor must adjust at Task 3 step 3.2 per the embedded note.

**Tasks that depend on prior tasks:**
- Task 2 → Task 1 (renames must land first)
- Tasks 3-6 → Task 1, 2 (content must exist before pages render it)
- Task 7 → Tasks 4-6 (new pages must exist before old ones are deleted)
- Task 10 → Tasks 3-6 (rewrites need real .html files in `out/`)
- Task 13 → Tasks 1-12 (build verifies everything together)
- Task 14 → Task 13 (push only after local build is clean)
- Task 15 → Task 14 (poster shows shipped only after deploy is verified)
