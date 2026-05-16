# /labs update bundle (credibility + themes surface) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the S&P TeraHelix credibility layer to `/reality` + `/labs` (Phase A) and ship a new public `/labs/themes` discovery surface mirroring the live labs platform (Phase B).

**Spec:** `docs/superpowers/specs/2026-05-11-labs-update-design.md` (commit `ff2021f`).

**Architecture:** Two independent phases sharing `src/content/site.ts` and `src/app/labs/page.tsx`. Phase A is content/copy + small prop additions to existing components. Phase B adds one new route, two new components, one new data file, and 29 thumbnail images. Phase A is fully shippable on its own — Phase B can be paused/deferred without breaking Phase A.

**Tech stack:** Next.js 14 App Router (static export), TypeScript, Tailwind CSS, Playwright for tests, all page copy in `src/content/site.ts`.

**Sibling repo (Phase B source):** `/Users/terencetsakiris/GitHub/labs-platform/` — taxonomy at `src/lib/themes/themes.ts`, thumbnails at `public/menu-themes-thumbs/`. Verify presence in B1 before starting Phase B.

---

## File map

### Phase A — Credibility

**Modified:**
- `src/content/site.ts` — add `reality.hero.partnerStrip`, rewrite `labs.hero`, add `labs.whyCredible`, rewrite `labs.engagement.cards`, rename `labs.offersPreview.items[].anchorHref`, update `labs.title` / `labs.description`.
- `src/components/RealityHero.tsx` — add optional `partnerStrip` prop.
- `src/components/LabsHero.tsx` — make `disclaimer` prop optional.
- `src/app/reality/page.tsx` — pass `partnerStrip` prop through.
- `src/app/labs/page.tsx` — drop `disclaimer` prop, insert new `whyCredible` Section between hero and offers preview.
- `tests/routing.spec.ts` — line 22 H1 regex.
- `tests/labs.spec.ts` — delete obsolete disclaimer test (lines 7-13).

### Phase B — Themes surface

**New:**
- `src/app/labs/themes/page.tsx` — server component, static.
- `src/content/themes.ts` — typed taxonomy snapshot (verbatim copy minus external imports).
- `src/components/ThemeCard.tsx` — server component.
- `src/components/ThemeBand.tsx` — server component.
- `public/menu-themes-thumbs/*.png` — 29 PNGs copied from labs-platform.

**Modified:**
- `src/content/site.ts` — add `pages.themes` block.
- `src/components/index.ts` — export `ThemeCard`, `ThemeBand`.
- `src/app/labs/page.tsx` — add "Browse the full surface →" link as the last child of the existing `offersPreview` Section.
- `tests/routing.spec.ts` — add `/labs/themes` to the route table.

---

## End-state section order on `/labs`

Once both phases are done, `/labs/page.tsx` reads top-to-bottom:

```
<LabsHero />                                               ← no disclaimer prop
<SectionDivider />
<Section> Why this is credible </Section>                  ← Phase A (new)
<SectionDivider />
<Section> Three ways to use this work
  └─ existing 3 preview cards (unchanged copy)
  └─ "Browse the full surface →" link → /labs/themes       ← Phase B (new)
</Section>
<SectionDivider />
<Section> Evidence (unchanged) </Section>
<SectionDivider />
<Section> Flagships (unchanged) </Section>
<SectionDivider />
<Section> Banker × AI (unchanged) </Section>
<SectionDivider />
<Section> Method (unchanged) </Section>
<SectionDivider />
<Section> Engagement (3 cards w/ new copy + new anchorIds) + closing </Section>
```

---

# PHASE A — Credibility

## Task A1: Update `src/content/site.ts` — content edits

**Files:**
- Modify: `src/content/site.ts`

This task makes all six content edits to `site.ts` in sequence. Commit after each edit so individual changes are reviewable.

- [ ] **Step 1: Add `reality.hero.partnerStrip` field**

In `src/content/site.ts`, locate the `reality.hero` block (around line 469-474). Add a `partnerStrip` field as the new last property of `reality.hero`:

```ts
hero: {
  headline: 'Reality is built on data. Architect yours.',
  lede: 'Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.',
  primaryCta: { label: 'Enter Floor 13', href: '#floor-13' },
  secondaryCta: { label: 'Explore the pillars', href: '#pillars' },
  partnerStrip: {
    partners: [
      { name: 'S&P TeraHelix integration partner' },
      { name: 'Microsoft partner' },
    ],
  },
},
```

- [ ] **Step 2: Verify typecheck still passes**

Run: `npx next build`
Expected: build succeeds (the new field is read by `RealityHero` only after Task A2 lands; before that the field is unused but doesn't break anything).

- [ ] **Step 3: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(reality): add partnerStrip data to hero (S&P TeraHelix · Microsoft)"
```

- [ ] **Step 4: Rewrite `labs.hero` block**

In `src/content/site.ts`, replace the entire `labs.hero` object (currently lines 268-276 — the block starting `hero: { headlineLine1: 'Most capital-markets platforms...` through the closing `},` of that block) with:

```ts
hero: {
  headlineLine1: 'Atheryon Labs',
  headlineLine2: 'The banking platform built by AI.',
  body: 'Atheryon Labs is a working CDM-native banking reference platform built by one capital-markets expert directing AI. It demonstrates how complex financial data can be modelled, linked, structured, and turned into usable banking software.',
  primaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
  secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
  tertiaryCta: { label: 'Request a confidential discussion', href: '/contact' },
},
```

Two important details: (1) the `disclaimer` key is removed entirely (not set to empty string). (2) `primaryCta.href` flips from `https://www.atheryon.com.au` to `https://labs.atheryon.ai` per spec §5.2.

- [ ] **Step 5: Verify typecheck fails — expected**

Run: `npx next build`
Expected: typecheck **fails** with an error in `src/app/labs/page.tsx` complaining that `labs.hero.disclaimer` does not exist on the type. This is expected — `labs/page.tsx` will be fixed in Task A6.

This is the only task that intentionally leaves the build broken. Phase A's later tasks restore green.

- [ ] **Step 6: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(labs): rewrite hero data (Atheryon Labs · banking platform built by AI)"
```

- [ ] **Step 7: Add `labs.whyCredible` block**

In `src/content/site.ts`, immediately after the `labs.hero` block (now ending at the closing `},` you just edited) and before `labs.offersPreview`, add a new `whyCredible` block:

```ts
whyCredible: {
  badge: 'Why this is credible',
  title: 'Atheryon is the integration partner for S&P TeraHelix.',
  paragraphs: [
    'Atheryon works in the same problem space that serious financial institutions are now prioritising: data modelling, linking, interoperability, and AI-ready enterprise data.',
    'S&P Global completed its acquisition of TeraHelix in June 2025 to strengthen advanced data modelling and linking capabilities. S&P described TeraHelix as helping solve complex enterprise-scale data challenges by structuring data models for interoperability across platforms, systems, and storage architectures.',
    'Atheryon Labs applies that same class of thinking to banking software: CDM-native data structures, expert-directed prompts, AI-assisted engineering, and practical platform surfaces across trading, operations, risk, treasury, compliance, and mortgages.',
    'The result: a working banking AI platform you can inspect, license, or learn how to build.',
  ],
},
```

- [ ] **Step 8: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(labs): add whyCredible content block (S&P TeraHelix credibility)"
```

- [ ] **Step 9: Rewrite `labs.engagement.cards` per-card content**

In `src/content/site.ts`, locate `labs.engagement.cards` (the array starts around line 426). Replace each of the three card objects with the new per-card content. The exact replacements:

Card 01 — replace:
```ts
{
  id: 'code',
  number: '01',
  title: 'Take the code.',
  body: 'Fork the labs-platform repo as a reference implementation — co-marketed proof that AI labs ship regulated-banking platforms in weeks, not years. Suitable as a case study, a partner showcase, or a vertical proof point in your enterprise pitch. Includes architecture map, CDM model, and read-only access to a hosted instance.',
  ctaLabel: 'Inspect',
  ctaHref: '/contact?topic=labs-code',
  anchorId: 'offers-code',
},
```
with:
```ts
{
  id: 'code',
  number: '01',
  title: 'Buy the code.',
  body: 'License the Atheryon Labs platform code as a working banking reference implementation. Best for: data vendors, AI firms, banks, consultancies, cloud partners, and fintechs that need a credible vertical platform asset.',
  ctaLabel: 'Buy the code',
  ctaHref: '/contact?topic=labs-code',
  anchorId: 'code',
},
```

Card 02 — replace:
```ts
{
  id: 'prompts',
  number: '02',
  title: 'Take the prompts.',
  body: "License the directorial archive — the prompts, corrections, and architectural decisions paired with Terry's reasoning per surface. Package it as a vertical playbook for your tooling, a method asset for your enterprise customers, or training data for your own banking-domain agents. Not a generic prompt library; the banker's directorial track.",
  ctaLabel: 'License',
  ctaHref: '/contact?topic=labs-prompts',
  anchorId: 'offers-prompts',
},
```
with:
```ts
{
  id: 'prompts',
  number: '02',
  title: 'License the prompts.',
  body: 'License the prompt archive that directed the AI build. This includes the instructions, corrections, domain constraints, architecture decisions, and banking reasoning used to turn AI from a generic code generator into a useful regulated-finance build partner.',
  ctaLabel: 'License the prompts',
  ctaHref: '/contact?topic=labs-prompts',
  anchorId: 'prompts',
},
```

Card 03 — replace:
```ts
{
  id: 'advisory',
  number: '03',
  title: 'Take the advisory.',
  body: 'Atheryon Advisory engagements delivered under your AI banner in regulated finance — 30-day diagnostic, prototype sprint, or full data-platform recovery, paired with your model on the other side of the chat. Continuing the method that rescued the $84M Westpac programme — now amplified.',
  ctaLabel: 'Engage',
  ctaHref: '/contact?topic=labs-advisory',
  anchorId: 'offers-advisory',
},
```
with:
```ts
{
  id: 'advisory',
  number: '03',
  title: 'Engage the builder.',
  body: 'Work with Terry to apply the same method to your own data, product, platform, client opportunity, or S&P TeraHelix integration path. This is where integration-partner credibility matters most.',
  ctaLabel: 'Engage the builder',
  ctaHref: '/contact?topic=labs-advisory',
  anchorId: 'advisory',
},
```

- [ ] **Step 10: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(labs): rewrite engagement cards (Buy/License/Engage + drop offers- anchor prefix)"
```

- [ ] **Step 11: Rename `labs.offersPreview.items[].anchorHref` values**

In `src/content/site.ts`, locate `labs.offersPreview.items` (around lines 282-296). Change three `anchorHref` values:

- `anchorHref: '#offers-code'` → `anchorHref: '#code'`
- `anchorHref: '#offers-prompts'` → `anchorHref: '#prompts'`
- `anchorHref: '#offers-advisory'` → `anchorHref: '#advisory'`

Titles, oneLiners, and section title stay unchanged.

- [ ] **Step 12: Update `labs.title` and `labs.description` metadata**

In `src/content/site.ts`, locate the `labs` block start (around lines 266-267):

Replace:
```ts
title: 'Atheryon Labs — The Banker × AI Artefact',
description: 'Proof that one senior capital-markets leader, directing AI, ships in weeks what consultancies scope as multi-year, eight-figure programmes. The working artefact AI labs use to close regulated-banking deals.',
```
with:
```ts
title: 'Atheryon Labs — Banking AI platform from the S&P TeraHelix integration partner',
description: 'A working CDM-native banking reference platform, built by one capital-markets expert directing AI. Buy the code. License the prompts. Engage the builder.',
```

- [ ] **Step 13: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(labs): rename offersPreview anchorHrefs + update page metadata"
```

---

## Task A2: `RealityHero` component — add optional `partnerStrip` prop

**Files:**
- Modify: `src/components/RealityHero.tsx`
- Modify: `src/app/reality/page.tsx`

- [ ] **Step 1: Update `RealityHero` interface and JSX**

In `src/components/RealityHero.tsx`, replace the entire file contents with:

```tsx
'use client'

import Link from 'next/link'

interface RealityHeroProps {
  headline: string
  lede: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  partnerStrip?: { partners: { name: string }[] }
}

export function RealityHero({ headline, lede, primaryCta, secondaryCta, partnerStrip }: RealityHeroProps) {
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
        {partnerStrip && partnerStrip.partners.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              Ecosystem
            </span>
            {partnerStrip.partners.map((p, i) => (
              <span key={p.name} className="flex items-center gap-x-4 text-sm text-charcoal">
                {i > 0 && <span aria-hidden className="text-charcoal/40">·</span>}
                {p.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire `/reality` page to pass the prop**

In `src/app/reality/page.tsx`, locate the `<RealityHero …>` element. Replace:

```tsx
<RealityHero
  headline={reality.hero.headline}
  lede={reality.hero.lede}
  primaryCta={reality.hero.primaryCta}
  secondaryCta={reality.hero.secondaryCta}
/>
```
with:
```tsx
<RealityHero
  headline={reality.hero.headline}
  lede={reality.hero.lede}
  primaryCta={reality.hero.primaryCta}
  secondaryCta={reality.hero.secondaryCta}
  partnerStrip={reality.hero.partnerStrip}
/>
```

- [ ] **Step 3: Verify build still failing on `/labs` (expected) but `/reality` is clean**

Run: `npx next build`
Expected: still fails with the same `labs.hero.disclaimer` error from Task A1. The new `RealityHero` change should compile cleanly. If a new error appears in `RealityHero` or `reality/page.tsx`, fix it before proceeding.

- [ ] **Step 4: Commit**

```bash
git add src/components/RealityHero.tsx src/app/reality/page.tsx
git commit -m "feat(reality): RealityHero renders optional partnerStrip below CTAs"
```

---

## Task A3: `LabsHero` component — make `disclaimer` optional + restore green build

**Files:**
- Modify: `src/components/LabsHero.tsx`
- Modify: `src/app/labs/page.tsx`

- [ ] **Step 1: Make `disclaimer` prop optional in LabsHero**

In `src/components/LabsHero.tsx`, replace the entire file contents with:

```tsx
import Link from 'next/link'

interface LabsHeroProps {
  headlineLine1: string
  headlineLine2: string
  body: string
  disclaimer?: string
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
        <h1 className="text-4xl md:text-5xl lg:text-display font-bold tracking-tight mb-8 leading-[1.1]">
          <span className="block text-neutral-900 mb-2">{headlineLine1}</span>
          <span className="block text-brand-orange">{headlineLine2}</span>
        </h1>

        <p className="text-lg md:text-subheading text-neutral-700 max-w-3xl mb-6 leading-relaxed">
          {body}
        </p>

        {disclaimer && (
          <p className="text-base md:text-lg italic text-neutral-600 max-w-3xl mb-10 leading-relaxed">
            {disclaimer}
          </p>
        )}

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

- [ ] **Step 2: Drop `disclaimer` prop in `/labs` page**

In `src/app/labs/page.tsx`, locate the `<LabsHero …>` element. Remove the line `disclaimer={labs.hero.disclaimer}`. The element should now read:

```tsx
<LabsHero
  headlineLine1={labs.hero.headlineLine1}
  headlineLine2={labs.hero.headlineLine2}
  body={labs.hero.body}
  primaryCta={labs.hero.primaryCta}
  secondaryCta={labs.hero.secondaryCta}
  tertiaryCta={labs.hero.tertiaryCta}
/>
```

- [ ] **Step 3: Verify build is now green**

Run: `npx next build`
Expected: build **succeeds**. If it doesn't, the typecheck error message points at the offending file.

- [ ] **Step 4: Commit**

```bash
git add src/components/LabsHero.tsx src/app/labs/page.tsx
git commit -m "feat(labs): LabsHero disclaimer optional; drop disclaimer prop on /labs page"
```

---

## Task A4: Insert `whyCredible` Section in `/labs` page

**Files:**
- Modify: `src/app/labs/page.tsx`

- [ ] **Step 1: Insert the new section between hero and offersPreview**

In `src/app/labs/page.tsx`, locate the existing `<SectionDivider />` between `<LabsHero …/>` and the `offersPreview` Section. Insert the new whyCredible section between that divider and the offersPreview Section:

```tsx
<LabsHero
  /* …props… */
/>

<SectionDivider />

{/* §1.5 Why this is credible */}
<Section badge={labs.whyCredible.badge} title={labs.whyCredible.title}>
  <div className="space-y-5 max-w-3xl">
    {labs.whyCredible.paragraphs.map((p) => (
      <p key={p.slice(0, 24)} className="text-lg text-neutral-700 leading-relaxed">{p}</p>
    ))}
  </div>
</Section>

<SectionDivider />

{/* §2 Offers preview — surfaced early so the AI-co reader sees the ask in <30s */}
<Section badge={labs.offersPreview.badge} title={labs.offersPreview.title}>
  /* …existing offers preview unchanged… */
</Section>
```

The result is one extra Section + one extra SectionDivider in the page tree.

- [ ] **Step 2: Verify build still green**

Run: `npx next build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/labs/page.tsx
git commit -m "feat(labs): render whyCredible Section between hero and offers preview"
```

---

## Task A5: Update Phase A Playwright tests

**Files:**
- Modify: `tests/routing.spec.ts`
- Modify: `tests/labs.spec.ts`

- [ ] **Step 1: Update `/labs` H1 regex in routing test**

In `tests/routing.spec.ts`, find the `/labs` row in the `routes` table (around line 22). Replace:

```ts
{ path: '/labs', title: /Labs/, h1: /Most capital-markets platforms/i },
```
with:
```ts
{ path: '/labs', title: /Labs/, h1: /Atheryon Labs/i },
```

- [ ] **Step 2: Delete obsolete disclaimer test**

In `tests/labs.spec.ts`, delete the entire `test('hero disclaimer renders above the fold', …)` block (lines 7-13 in the current file):

Remove this block:
```ts
test('hero disclaimer renders above the fold', async ({ page }) => {
  const disclaimer = page.getByText(/It is not a production bank platform/i);
  await expect(disclaimer).toBeVisible();
  const box = await disclaimer.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(900);
});
```

The next test in the file (`'three hero CTAs are present'`) becomes the first test in the describe block.

- [ ] **Step 3: Run Playwright tests for Phase A surfaces**

Build the static site first so Playwright has a target:

Run: `npx next build && npx next start &`
Then in a separate command (or after the server starts):
Run: `npx playwright test tests/routing.spec.ts tests/labs.spec.ts`

Expected: tests pass. If `tests/labs.spec.ts:17` fails because the live `See it live` href doesn't match `https://labs.atheryon.ai`, double-check Task A1 step 4 (the `primaryCta.href` flip). If `tests/labs.spec.ts:64-69` fails because `#code` / `#prompts` / `#advisory` aren't visible, double-check Task A1 step 9 (the `anchorId` rename).

If you don't have the dev server running and prefer the static-export check, use Playwright's webServer config — `playwright.config.ts` already wires it to `npm run build && npx serve out` or similar; just run `npx playwright test`.

Stop the dev server when done: `kill %1` (or close the background process).

- [ ] **Step 4: Commit**

```bash
git add tests/routing.spec.ts tests/labs.spec.ts
git commit -m "test(labs): update routing H1 regex; delete obsolete disclaimer test"
```

---

## Phase A — Verification gate

Before continuing to Phase B, manually verify:

- [ ] `npx next build` exits cleanly.
- [ ] Run dev server (`npx next dev`) and load `/`. Confirm: partner strip appears below the CTA buttons, reads `Ecosystem · S&P TeraHelix integration partner · Microsoft partner` (with the eyebrow label and middle-dot separators).
- [ ] Load `/labs`. Confirm: hero shows `Atheryon Labs` (dark) over `The banking platform built by AI.` (orange); body paragraph is the new four-sentence one; **no italic disclaimer** appears below the body.
- [ ] On `/labs`, confirm a new "Why this is credible" section appears immediately after the hero, with the four paragraphs from §5.3 of the spec.
- [ ] Scroll to the engagement cards. Confirm titles read `Buy the code. / License the prompts. / Engage the builder.`, bodies match §5.5, CTA labels read `Buy the code / License the prompts / Engage the builder`.
- [ ] Click the offers-preview "Jump to detail ↓" links — confirm they scroll to the engagement cards (the `#code` / `#prompts` / `#advisory` deep links work).
- [ ] Open `/` (Reality) and click the Floor 13 sell cards' "Inspect →" / "License →" / "Engage →" buttons. They navigate to `/labs#code` / `/labs#prompts` / `/labs#advisory`. Confirm each lands at the matching engagement card.

If all green, Phase A is shippable. Phase B is optional from this point.

---

# PHASE B — Themes surface

## Task B1: Verify sibling repo and create `src/content/themes.ts`

**Files:**
- Verify: `/Users/terencetsakiris/GitHub/labs-platform/src/lib/themes/themes.ts`
- Create: `src/content/themes.ts`

- [ ] **Step 1: Verify labs-platform source exists**

Run:
```bash
ls -la /Users/terencetsakiris/GitHub/labs-platform/src/lib/themes/themes.ts
```

Expected: file exists, ~25KB. If it does not exist or the path is different, **stop and ask** — Phase B cannot proceed without it.

- [ ] **Step 2: Read the source**

Read `/Users/terencetsakiris/GitHub/labs-platform/src/lib/themes/themes.ts` in full. Note: any imports referencing labs-platform internals (e.g. `@/lib/...`, store paths, test helpers) must be removed for the snapshot.

- [ ] **Step 3: Create `src/content/themes.ts` as a dependency-free snapshot**

Create the new file `src/content/themes.ts` containing:

- All type exports: `Domain`, `BusinessFunction`, `ThemeRoute`, `Theme`.
- `FUNCTION_META`, `FUNCTION_ORDER` constants.
- `ODS_THEMES` (7 entries), `BUSINESS_THEMES_BY_FUNCTION` (5 keys), `ALL_THEMES`.
- `pageCountFor()` helper.

The file must be a self-contained TypeScript module: no relative imports beyond standard library types. Replace any non-portable imports (e.g. labs-platform Zustand stores, route helpers, environment-aware constants) with inline values or remove them entirely. If a piece of the source genuinely depends on labs-platform-only behavior, document it as a `// removed: <reason>` comment and verify the consumers in this plan don't need it.

The file SHOULD start with a header:
```ts
/**
 * Snapshot of labs-platform/src/lib/themes/themes.ts (date: YYYY-MM-DD).
 * Dependency-free copy for the marketing site. Manual re-sync required if
 * the source taxonomy changes — there is no build-time link between repos.
 */
```

- [ ] **Step 4: Verify counts match the spec**

The spec asserts 7 ODS themes, 22 business themes, and 147 total pages (with a 56/13/13/44/17/4 page split across ODS/FO/Risk/Ops/Compliance/Treasury). After creating the file, run a quick mental check or an inline script to verify:

```bash
node -e "
const m = require('./src/content/themes.ts');
console.log('ODS:', m.ODS_THEMES.length);
console.log('Business:', Object.values(m.BUSINESS_THEMES_BY_FUNCTION).flat().length);
console.log('Total pages:', m.ALL_THEMES.reduce((s, t) => s + (t.pages || 0), 0));
"
```

Expected: ODS = 7, Business = 22, Total = 147.

(Node may not be able to require a TS file directly without ts-node. If so, run `npx ts-node --transpile-only src/content/themes.ts` after adding a temporary `console.log` at the bottom, or run `npx next build` and trust the typecheck. Don't create a permanent test file just for this — the build is the contract.)

- [ ] **Step 5: Verify typecheck passes**

Run: `npx next build`
Expected: build still passes (the new file isn't imported by anything yet).

- [ ] **Step 6: Commit**

```bash
git add src/content/themes.ts
git commit -m "feat(themes): port labs-platform taxonomy to dependency-free snapshot"
```

---

## Task B2: Add `pages.themes` block to `src/content/site.ts`

**Files:**
- Modify: `src/content/site.ts`

- [ ] **Step 1: Add the `themes` block under `pages`**

In `src/content/site.ts`, locate the closing of the `pages` object (around the line where `transformation: { … }` ends and just before the `pages` object's closing `}`). Add a new `themes` field after `transformation`:

```ts
themes: {
  title: 'Labs Surface | Atheryon',
  description: '29 themes · 147 pages across the Atheryon labs platform — the live discovery surface for ODS, front office, risk & analytics, operations, compliance, and treasury.',
  badge: 'Discovery',
  headline: 'Explore the labs surface',
  intro: 'A public preview of the Atheryon labs discovery surface — every theme and every sub-page that lives at labs.atheryon.ai, rendered here as a static map. Click any tile to open the live theme on the labs subdomain in a new tab. The lattice mirrors the operational shape of a tier-1 capital-markets bank: an Operational Data Store (schemas, validators, lifecycle, entity intelligence, ops and dev tools) plus five business-unit surfaces — Front Office, Risk & Analytics, Operations, Compliance, and Treasury / Finance.',
  countsLine: '29 themes · 147 pages · 6 surfaces (1 ODS data store + 5 business units)',
  businessDividerLabel: 'Business Units',
},
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npx next build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(themes): add pages.themes copy block (Discovery surface)"
```

---

## Task B3: Copy 29 thumbnail PNGs

**Files:**
- Create: `public/menu-themes-thumbs/*.png` (29 files)

- [ ] **Step 1: Verify source directory has 29 referenced thumbs**

Run:
```bash
ls /Users/terencetsakiris/GitHub/labs-platform/public/menu-themes-thumbs/ | wc -l
```

Expected: 30. The 30th file is the orphan `t-risk-pricing.png` which is **not** referenced by any theme — it must be skipped.

- [ ] **Step 2: Build a "referenced thumbs" list from the new themes.ts**

Read `src/content/themes.ts` (which Task B1 just created). Each theme has an `id` (e.g. `schemas`, `validators`). The expected thumb filename is `t-{id}.png`. Build the list of 29 expected filenames.

- [ ] **Step 3: Copy only referenced thumbs**

```bash
mkdir -p public/menu-themes-thumbs
# For each id in ALL_THEMES, copy t-{id}.png:
# (run this script, replacing the for-loop with the actual ids — easiest to grep them out of themes.ts)
for id in $(grep -oE "id: '[a-z-]+'" src/content/themes.ts | sed -E "s/id: '(.*)'/\1/" | sort -u); do
  cp "/Users/terencetsakiris/GitHub/labs-platform/public/menu-themes-thumbs/t-${id}.png" "public/menu-themes-thumbs/t-${id}.png" || echo "MISSING: t-${id}.png"
done
```

If any `MISSING:` lines print, **stop** — either the themes.ts has an id without a matching thumb, or the source directory is missing a file. Resolve before continuing.

- [ ] **Step 4: Verify the orphan was not copied**

Run:
```bash
ls public/menu-themes-thumbs/ | wc -l
ls public/menu-themes-thumbs/ | grep risk-pricing && echo "OOPS: orphan was copied" || echo "orphan correctly skipped"
```

Expected: 29 files; orphan correctly skipped.

- [ ] **Step 5: Commit**

```bash
git add public/menu-themes-thumbs/
git commit -m "feat(themes): add 29 theme thumbnail assets"
```

---

## Task B4: Create `ThemeCard` component

**Files:**
- Create: `src/components/ThemeCard.tsx`

- [ ] **Step 1: Create `src/components/ThemeCard.tsx`**

Create the new file with:

```tsx
import type { Theme } from '@/content/themes'
import { FUNCTION_META } from '@/content/themes'

interface ThemeCardProps {
  theme: Theme
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const visibleRoutes = theme.routes.slice(0, 3)
  const overflow = theme.routes.length - visibleRoutes.length

  return (
    <a
      href={`https://labs.atheryon.ai${theme.primaryRoute}`}
      target="_blank"
      rel="noopener"
      className="block bg-white border border-neutral-500/10 rounded-2xl overflow-hidden hover:shadow-card transition-shadow"
    >
      <div className="aspect-[16/10] bg-warm-200 overflow-hidden">
        <img
          src={`/menu-themes-thumbs/t-${theme.id}.png`}
          alt={theme.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-neutral-900 tracking-tight">{theme.title}</h3>
          <span className="text-xs text-neutral-500 whitespace-nowrap">{theme.pages}p</span>
        </div>
        {theme.blurb && (
          <p className="text-sm text-neutral-700 leading-relaxed mb-3">{theme.blurb}</p>
        )}
        {visibleRoutes.length > 0 && (
          <ul className="border border-neutral-500/10 rounded-lg divide-y divide-neutral-500/10 mb-3">
            {visibleRoutes.map((r) => (
              <li key={r.path} className="px-3 py-1.5 text-xs font-mono text-neutral-700">
                {r.path}
              </li>
            ))}
            {overflow > 0 && (
              <li className="px-3 py-1.5 text-xs italic text-neutral-500">+{overflow} more</li>
            )}
          </ul>
        )}
        {theme.secondaryFunctions && theme.secondaryFunctions.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-neutral-500">also:</span>
            {theme.secondaryFunctions.map((fn) => (
              <span
                key={fn}
                className="text-xs font-semibold text-brand-orange bg-brand-orange/10 rounded-full px-2 py-0.5"
              >
                {FUNCTION_META[fn]?.label ?? fn}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
```

If the actual `Theme` type from your snapshot uses different field names (e.g. `description` instead of `blurb`, or `secondaryFunctions` is named something else), adjust the field accesses to match. Do not invent fields.

- [ ] **Step 2: Verify typecheck passes**

Run: `npx next build`
Expected: succeeds. If TS complains about `Theme` shape mismatches, reconcile by reading `src/content/themes.ts` and adjusting the field names in `ThemeCard.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeCard.tsx
git commit -m "feat(themes): add ThemeCard server component"
```

---

## Task B5: Create `ThemeBand` component

**Files:**
- Create: `src/components/ThemeBand.tsx`

- [ ] **Step 1: Create `src/components/ThemeBand.tsx`**

Create the new file with:

```tsx
import type { Theme } from '@/content/themes'
import { ThemeCard } from './ThemeCard'

interface ThemeBandProps {
  testId: string
  tagLabel: string
  tagTone?: 'ods' | 'business'
  title: string
  blurb: string
  themes: readonly Theme[]
}

export function ThemeBand({ testId, tagLabel, tagTone = 'business', title, blurb, themes }: ThemeBandProps) {
  const totalPages = themes.reduce((s, t) => s + (t.pages || 0), 0)
  const tagClass =
    tagTone === 'ods'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
      : 'bg-warm-200 text-neutral-800 border-neutral-500/10'

  return (
    <section data-testid={testId} className="max-w-container mx-auto px-6 py-12">
      <div className="flex flex-wrap items-baseline gap-3 mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border ${tagClass}`}>
          {tagLabel}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">{title}</h2>
        <span className="text-sm text-neutral-500">
          {themes.length} themes · {totalPages}p
        </span>
      </div>
      {blurb && <p className="text-base text-neutral-700 max-w-3xl mb-8 leading-relaxed">{blurb}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {themes.map((t) => (
          <ThemeCard key={t.id} theme={t} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npx next build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeBand.tsx
git commit -m "feat(themes): add ThemeBand server component"
```

---

## Task B6: Export new components from the barrel index

**Files:**
- Modify: `src/components/index.ts`

- [ ] **Step 1: Add ThemeCard and ThemeBand exports**

In `src/components/index.ts`, add the two new exports alongside the existing ones. The exact location doesn't matter as long as they're at the top level of the barrel:

```ts
export { ThemeCard } from './ThemeCard'
export { ThemeBand } from './ThemeBand'
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npx next build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/index.ts
git commit -m "feat(themes): export ThemeCard and ThemeBand from barrel"
```

---

## Task B7: Create `/labs/themes` page

**Files:**
- Create: `src/app/labs/themes/page.tsx`

- [ ] **Step 1: Create the directory and the page file**

```bash
mkdir -p src/app/labs/themes
```

Create `src/app/labs/themes/page.tsx` with:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionDivider, ThemeBand } from '@/components'
import { site } from '@/content/site'
import {
  ODS_THEMES,
  BUSINESS_THEMES_BY_FUNCTION,
  FUNCTION_META,
  FUNCTION_ORDER,
} from '@/content/themes'

const { themes } = site.pages

export const metadata: Metadata = {
  title: themes.title,
  description: themes.description,
  openGraph: { title: themes.title, description: themes.description },
}

const businessThemeCount = Object.values(BUSINESS_THEMES_BY_FUNCTION).reduce(
  (s, list) => s + list.length,
  0,
)
const businessPageCount = Object.values(BUSINESS_THEMES_BY_FUNCTION).reduce(
  (s, list) => s + list.reduce((ss, t) => ss + (t.pages || 0), 0),
  0,
)

export default function ThemesPage() {
  return (
    <main>
      <div className="max-w-container mx-auto px-6 pt-8 pb-2">
        <Link href="/labs" className="text-sm font-semibold text-brand-orange hover:underline">
          ← Back to Labs
        </Link>
      </div>

      <Section badge={themes.badge} title={themes.headline} description={themes.intro}>
        <p className="text-sm text-neutral-500">{themes.countsLine}</p>
      </Section>

      <SectionDivider />

      <ThemeBand
        testId="theme-band-ods"
        tagLabel="ODS"
        tagTone="ods"
        title="Operational Data Store"
        blurb="Schemas, validators, market data, lifecycle engine, entity intelligence, ops and dev tools."
        themes={ODS_THEMES}
      />

      <div className="max-w-container mx-auto px-6 py-6">
        <div className="border-t border-neutral-500/10 pt-6 flex items-baseline gap-3 justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {themes.businessDividerLabel}
          </span>
          <span className="text-sm text-neutral-500">
            · {businessThemeCount} themes · {businessPageCount}p
          </span>
        </div>
      </div>

      {FUNCTION_ORDER.map((fn) => {
        const list = BUSINESS_THEMES_BY_FUNCTION[fn]
        if (!list || list.length === 0) return null
        const meta = FUNCTION_META[fn]
        return (
          <ThemeBand
            key={fn}
            testId={`theme-band-${fn}`}
            tagLabel={meta?.tag ?? fn}
            tagTone="business"
            title={meta?.label ?? fn}
            blurb={meta?.blurb ?? ''}
            themes={list}
          />
        )
      })}
    </main>
  )
}
```

If `FUNCTION_META` doesn't have `.tag` / `.label` / `.blurb` fields, swap to whatever the snapshot defines. Do not invent fields.

- [ ] **Step 2: Verify build succeeds and emits the static route**

Run: `npx next build`
Expected: succeeds. The build log mentions `/labs/themes` as one of the routes prerendered. The output `out/labs/themes/index.html` should exist.

- [ ] **Step 3: Verify the static HTML was emitted**

```bash
ls out/labs/themes/index.html
```
Expected: file exists.

- [ ] **Step 4: Commit**

```bash
git add src/app/labs/themes/page.tsx
git commit -m "feat(themes): add /labs/themes discovery page"
```

---

## Task B8: Add "Browse the full surface →" link inside the offersPreview Section

**Files:**
- Modify: `src/app/labs/page.tsx`

- [ ] **Step 1: Append the link inside the offersPreview Section**

In `src/app/labs/page.tsx`, locate the existing offersPreview Section (the one with `badge={labs.offersPreview.badge}`). After the closing `</div>` of the 3-card grid (and before the closing `</Section>`), add the link block:

```tsx
<Section badge={labs.offersPreview.badge} title={labs.offersPreview.title}>
  <div className="grid md:grid-cols-3 gap-6">
    {labs.offersPreview.items.map((item) => (
      /* …existing card mapping unchanged… */
    ))}
  </div>

  {/* Phase B addition — link to discovery surface */}
  <div className="mt-10 pt-6 border-t border-neutral-500/10">
    <Link href="/labs/themes" className="inline-flex items-center text-sm font-semibold text-brand-orange hover:underline">
      Browse the full surface — 29 themes · 147 pages →
    </Link>
  </div>
</Section>
```

`Link` is already imported in `labs/page.tsx`; if not, add `import Link from 'next/link'` to the top of the file.

- [ ] **Step 2: Verify build succeeds**

Run: `npx next build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/labs/page.tsx
git commit -m "feat(labs): browse-the-surface link in offers preview section"
```

---

## Task B9: Add `/labs/themes` to routing test + final verification

**Files:**
- Modify: `tests/routing.spec.ts`

- [ ] **Step 1: Add a route table entry for `/labs/themes`**

In `tests/routing.spec.ts`, find the `routes` array and add a new entry right after the `/labs` row:

```ts
{ path: '/labs/themes', title: /Labs Surface/, h1: /Explore the labs surface/i },
```

- [ ] **Step 2: Build and run all Playwright tests**

Run: `npx next build`
Then run the full test suite: `npx playwright test`

Expected: all tests pass. Tests that were stale before this plan (covered in Task A5) are now updated; the new `/labs/themes` route test passes against the freshly-built static output.

If any unrelated tests fail, that's outside this plan's scope — flag the failure to the user without fixing.

- [ ] **Step 3: Commit**

```bash
git add tests/routing.spec.ts
git commit -m "test(themes): add /labs/themes route to routing.spec.ts"
```

---

## Final verification gate

Before opening a PR or shipping, manually verify against the spec's §14 acceptance criteria:

- [ ] `npx next build` exits cleanly.
- [ ] `out/labs/themes/index.html` exists in the static output.
- [ ] All 29 thumbnails resolve under `out/menu-themes-thumbs/t-*.png` in the build output. Run: `ls out/menu-themes-thumbs/ | wc -l` → 29.
- [ ] `/` (Reality) renders the partner strip below CTAs (`Ecosystem · S&P TeraHelix integration partner · Microsoft partner`).
- [ ] `/reality`'s pillars / Floor 13 / methodology / proof / closing sections are visually identical to before this plan.
- [ ] `/labs` hero displays `Atheryon Labs` (dark) over `The banking platform built by AI.` (orange), followed by the new body paragraph and the three existing CTAs. **No italic disclaimer paragraph appears.**
- [ ] On `/labs`, "Why this is credible" section appears between the hero and offers preview, with the four spec paragraphs.
- [ ] On `/labs`, "Browse the full surface →" link appears as the last child of the offers preview section and routes to `/labs/themes`.
- [ ] On `/labs`, engagement section's three cards display the new titles (`Buy the code.` / `License the prompts.` / `Engage the builder.`), the new bodies, and the new CTA labels.
- [ ] `/labs` `offersPreview` section is visually identical to before, except `Jump to detail ↓` links now use `#code` / `#prompts` / `#advisory`.
- [ ] `/labs` `evidence`, `flagships`, `bankerWedge`, `method`, and `closing` sections are visually identical to before.
- [ ] `/labs/themes` renders all 29 themes across 6 bands. Open the page in dev or against the static build:
  - 1 ODS band (7 themes / 56 pages)
  - 5 business bands: Front Office (3/13), Risk & Analytics (5/13), Operations (9/44), Compliance (3/17), Treasury (2/4).
  - Every card opens `https://labs.atheryon.ai/...` in a new tab.
  - Mobile (≤640px viewport) bands stack to single column.
  - Click "← Back to Labs" — confirm it returns to `/labs`.
- [ ] `/reality`'s Floor 13 sell cards' "Inspect →" / "License →" / "Engage →" links navigate to `/labs#code` / `/labs#prompts` / `/labs#advisory` and land on the matching engagement card.
- [ ] `npx playwright test` passes with no stale-string failures.

If all green, the bundle is ready to ship.

---

## Risks captured (from spec §13)

These are the known unknowns the implementer should monitor during execution:

- **Themes drift** — `src/content/themes.ts` is a one-time copy of `labs-platform/src/lib/themes/themes.ts`. There is no build-time link. If labs-platform adds or renames a theme between this plan being written and being executed, re-do Task B1.
- **TS shape changes** at `Site['pages']['labs']['hero']` (removed `disclaimer`), `Site['pages']['reality']['hero']` (new `partnerStrip`), and `Site['pages']` (new `themes`) could cascade if any other consumer reads those fields. Verified call sites at plan time: only `src/app/labs/page.tsx` reads `labs.hero.*`, only `src/app/reality/page.tsx` reads `reality.hero.*`, and `themes` is brand-new. `npx next build` is the safety net.
- **Hero line ambiguity** — `The banking platform built by AI.` can be read as "AI built it autonomously," contradicting the rest of the page's "banker directing AI" thesis. Accepted by the author; not modified by this plan.
- **Internal copy inconsistencies** — `/labs` evidence partners strip still says `S&P Global Partner`; `bankerWedge.bio` still says "Atheryon is a Microsoft partner and S&P Global partner". Not fixed in this plan; flagged for a future pass.
- **S&P language attribution** — the `whyCredible` paragraph 2 paraphrases the public S&P announcement. The plan does not introduce a citation block or link. If legal pushes back, replace that paragraph with a citation-light alternative.
