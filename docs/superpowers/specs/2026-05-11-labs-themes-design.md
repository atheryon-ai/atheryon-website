# Atheryon `/labs/themes` — labs surface discovery — design spec

**Date:** 2026-05-11
**Author:** Terry Tsakiris (with Abi)
**Repo (implementation target):** `atheryon-ai/atheryon-website` — Next.js 14 App Router, Tailwind, static export. All page copy lives in `src/content/site.ts`.
**Source:** `labs-platform/src/app/themes/` (the live `https://labs.atheryon.ai/themes` discovery dashboard) — 29 themes / 147 pages organised into ODS (data store) + 5 banking-canonical business units.
**Status:** design approved (Q1 = marketing showcase, Q2 = hybrid skin) — pending implementation plan via `/superpowers:writing-plans`.

---

## 1. Problem

`https://labs.atheryon.ai/themes` is the discovery dashboard for the labs platform. It shows the full surface area: 7 ODS surfaces (schemas, validators, market data, lifecycle engine, entity intelligence, ops/dev tools, MSX workshop deck) + 22 business surfaces grouped under 5 banking functions (front office, risk & analytics, operations, compliance, treasury). It is the single most compressed evidence artefact for "what is actually built."

That artefact lives behind the labs subdomain. Visitors to `atheryon.com.au` who do not already have the labs URL cannot see it, and the existing `/labs` marketing page describes the labs *programme* (offers, evidence, flagships, banker-wedge, method, engagement) — not the surface itself.

`/labs/themes` on the public website ports the discovery dashboard as a marketing showcase: the breadth of capability becomes browsable from the front door, every card deep-links into the live labs platform.

## 2. Goal

Add a new public route `/labs/themes` that:

- Renders all 29 themes across 6 bands (ODS + 5 business functions) as a static, server-rendered page.
- Skins the page header in the website's marketing voice (uses `<Section>`, brand-orange badge, drops the technical chrome) but keeps the dashboard-style band/card grid (this is what shows breadth).
- Links every card out to `https://labs.atheryon.ai{primaryRoute}` in a new tab. **No sub-routes are ported.**
- Carries no interactivity — no filtering, no admin link, no Zustand store. Show-everything-always.
- Adds a single discoverability link from the existing `/labs` page: "Browse the surface →".

## 3. Out of scope

- ❌ Porting any of the 147 sub-pages (`/orders/eoi`, `/risk/var`, `/post-trade/confirmations`, etc.) — those stay on `labs.atheryon.ai`.
- ❌ The visibility store (`useMenuVisibilityStore`, `themesHidden`, `l3Hidden`) and the `/admin/menu` configurator.
- ❌ The technical header chrome from labs: the `/MENU-BY-BU` eyebrow, the right-side `ODS·N·Np / BUSINESS·N·Np` chips, the `⚙ Configure` link.
- ❌ Adding `/labs/themes` to the top-level header navigation (entry point is the `/labs` page link only).
- ❌ Any backend, data fetching, or client-side state. Static export must continue to work (`npx next build` → `out/`).

## 4. Information architecture

### 4.1 Route

| URL | Source | Notes |
|-----|--------|-------|
| `/labs/themes` | `src/app/labs/themes/page.tsx` (new) | Server component. Static. |

`/labs` (the existing marketing page) gets a new outbound link to `/labs/themes` — likely inside or adjacent to the existing `labs.offersPreview` section. Final placement is an implementation detail; the requirement is that `/labs` users can find `/labs/themes` in one click.

### 4.2 Page sections

```
<main>
  <Section badge="Discovery" title="Explore the labs surface">
    <intro paragraph + counts line>
  </Section>

  <SectionDivider />

  <ThemeBand kind="ods" themes={ODS_THEMES} />          ← 7 themes / 56 pages

  <BusinessUnitsDivider count={22} pages={91} />

  <ThemeBand kind="business" function="front-office" />  ← 3 themes / 13 pages
  <ThemeBand kind="business" function="risk-analytics" /> ← 5 themes / 13 pages
  <ThemeBand kind="business" function="operations" />     ← 9 themes / 44 pages
  <ThemeBand kind="business" function="compliance" />     ← 3 themes / 17 pages
  <ThemeBand kind="business" function="treasury" />       ← 2 themes / 4 pages
</main>
```

Counts above are derived from the source (`pageCountFor` over the imported taxonomy) and must match the contract test in `labs-platform/src/lib/themes/__tests__/themes.test.ts`. We do not re-validate the contract on the website; we assume the source is authoritative.

## 5. Components

All components are server components (no `'use client'`). All styling via Tailwind — labs CSS modules are not ported.

### 5.1 `src/components/ThemeCard.tsx`

```tsx
interface ThemeCardProps { theme: Theme }
```

Renders one card. Outer element is `<a href="https://labs.atheryon.ai{theme.primaryRoute}" target="_blank" rel="noopener">`. Card body:

- `<img>` thumbnail (`/menu-themes-thumbs/{id}.png`, 16:10 aspect, `loading="lazy"`).
- Title row: `<h3>{theme.title}</h3>` + `<span>{theme.pages}p</span>`.
- Blurb paragraph.
- First 3 routes as a bordered list, plus `+N more` if `theme.routes.length > 3`. Routes are display-only on the card (not individually clickable; the whole card is the link).
- Optional `also: <chip>` row when `theme.secondaryFunctions` is non-empty, using `FUNCTION_META[fn].label`.

Styling matches the website palette: white surface, `border-neutral-500/10`, `rounded-2xl`, `hover:shadow-card`, brand-orange used sparingly for hover accent and the `also:` chips.

### 5.2 `src/components/ThemeBand.tsx`

```tsx
interface ThemeBandProps {
  testId: string
  tagLabel: string         // 'ODS' | 'FO' | 'MO' | 'BO' | 'cross'
  tagTone?: 'ods' | 'business'
  title: string
  blurb: string
  themes: readonly Theme[]
}
```

Renders one band: header row (tag chip + title + per-band count `N themes · Mp`), blurb, then a `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6` of `<ThemeCard>`s. ODS tag uses a green tone; business tags use the website's neutral/brand palette. No "hidden count" — we never hide.

### 5.3 `BusinessUnitsDivider`

Inline element inside `page.tsx`, not its own file. Renders the centred "Business Units · 22 themes · 91p" rule between the ODS band and the function bands.

## 6. Data

### 6.1 New file: `src/content/themes.ts`

Ports the typed taxonomy from `labs-platform/src/lib/themes/themes.ts` **verbatim**:

- `Domain`, `BusinessFunction`, `ThemeRoute`, `Theme` types.
- `FUNCTION_META`, `FUNCTION_ORDER`.
- `ODS_THEMES` (7 entries), `BUSINESS_THEMES_BY_FUNCTION` (5 keys), `ALL_THEMES`.
- `pageCountFor()` helper.

This is a one-time copy. If labs-platform adds/edits a theme, the website must be re-synced manually. The spec accepts this drift cost rather than introducing a build-time fetch or a shared package.

**Convention deviation flagged:** `CLAUDE.md` says "All copy/text goes in `site.ts`." This file is **structured taxonomy** (~700 lines), not page copy. Putting it in `site.ts` would push that file past 1500 lines and make it harder to maintain. Page copy (badge, title, intro paragraph, metadata) still goes in `site.ts` under `site.pages.themes`.

### 6.2 Modified: `src/content/site.ts`

Add under `pages`:

```ts
themes: {
  title: 'Labs Surface | Atheryon',
  description: '29 themes · 147 pages across the Atheryon labs platform — the live discovery surface for ODS, front office, risk & analytics, operations, compliance, and treasury.',
  badge: 'Discovery',
  headline: 'Explore the labs surface',
  intro: 'A public preview of the Atheryon labs discovery surface — every theme and every sub-page that lives at labs.atheryon.ai, rendered here as a static map. Click any tile to open the live theme on the labs subdomain in a new tab. The lattice mirrors the operational shape of a tier-1 capital-markets bank: an Operational Data Store (schemas, validators, lifecycle, entity intelligence, ops/dev tools, the MSX workshop deck) plus five business-unit surfaces — Front Office, Risk & Analytics, Operations, Compliance, and Treasury / Finance.',
  countsLine: '29 themes · 147 pages · 6 surfaces (1 ODS data store + 5 business units)',
  businessDividerLabel: 'Business Units',
}
```

### 6.3 Asset copy

Copy all 29 PNGs from `labs-platform/public/menu-themes-thumbs/` to `atheryon-website/public/menu-themes-thumbs/`. Filenames preserved (`t-{id}.png`). The orphan `t-risk-pricing.png` in the source directory is **not** referenced by any theme — skip it.

Each thumb is ~50–150 KB; total static payload added to the site is roughly 2–4 MB. Acceptable for a discovery page; not lazy-loaded above-the-fold but lazy-loaded everywhere else (`loading="lazy"` on the `<img>`).

## 7. Linking strategy

- **Cards** link to `https://labs.atheryon.ai{theme.primaryRoute}` with `target="_blank" rel="noopener"`. The `noopener` is non-negotiable (security); `noreferrer` is left off so labs analytics can attribute the website as referrer.
- **Routes inside a card** are display-only. They show "what's inside this theme" but do not become 30+ outbound links per card. Whole-card click = open the theme's primary route.
- **No internal links** from this page to anywhere else on the website except the breadcrumb back to `/labs`.

## 8. Files to add / modify

**New:**
- `src/app/labs/themes/page.tsx`
- `src/content/themes.ts`
- `src/components/ThemeCard.tsx`
- `src/components/ThemeBand.tsx`
- `public/menu-themes-thumbs/*.png` (29 files)

**Modified:**
- `src/content/site.ts` — add `pages.themes` block.
- `src/components/index.ts` (if it exists as a barrel) — export `ThemeCard`, `ThemeBand`.
- `src/app/labs/page.tsx` — add a "Browse the surface →" link to `/labs/themes`.

**Verification:**
- `npx next build` succeeds and emits `out/labs/themes/index.html`.
- All 29 thumbnails resolve under `/menu-themes-thumbs/`.
- Card outbound links open `https://labs.atheryon.ai/...` in a new tab.
- `/labs/themes` is reachable from `/labs`.
- Mobile (≤640px): bands stack to single column; cards remain readable.

## 9. Open questions

None at design time.
