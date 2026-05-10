# Atheryon — `/labs` update bundle (credibility + themes surface) — design spec

**Date:** 2026-05-11
**Author:** Terry Tsakiris (with Claude / Abi)
**Repo (implementation target):** `atheryon-ai/atheryon-website` — Next.js 14 App Router, Tailwind, Azure Static Web Apps. All page copy lives in `src/content/site.ts`.
**Source artefacts:**
- `labs-platform/src/app/themes/` (the live `https://labs.atheryon.ai/themes` discovery dashboard — 29 themes / 147 pages organised into ODS + 5 banking-canonical business units).
- Public S&P Global announcement of the TeraHelix acquisition (June 2025) — used verbatim language for the credibility section.
**Status:** design approved (brainstorming sessions 2026-05-11) — pending implementation plan via `/superpowers:writing-plans`.
**Supersedes:** `2026-05-11-sp-terahelix-credibility-design.md` and `2026-05-11-labs-themes-design.md` (both deleted in the same commit that introduces this file).

---

## 1. Problem

Two separate gaps on the public site, both centred on `/labs` and shippable in the same cycle:

**A. Credibility.** The current `/labs` page positions Atheryon as "the banker × AI artefact" but does not lean on the most defensible enterprise-data credential available: that Atheryon is the integration partner for **S&P TeraHelix** (acquired by S&P Global in June 2025 to strengthen advanced data modelling and linking capabilities). That credential maps directly to the platform story — CDM-native data structures, modelling, linking, interoperability, AI-readiness. A Coseer integration claim is **not** factually solid this round and is dropped entirely.

**B. Surface visibility.** `https://labs.atheryon.ai/themes` is the most compressed evidence artefact for "what is actually built" — 7 ODS surfaces + 22 business surfaces grouped under 5 banking functions. It lives behind the labs subdomain and is invisible to visitors who land on `atheryon.com.au`. The existing `/labs` marketing page describes the labs *programme* (offers, evidence, flagships, banker-wedge, method, engagement) — not the surface itself.

## 2. Goal

Two related workstreams, one PR / one cycle.

**Workstream A — Credibility (§5–§6):**
- `/reality` (homepage): light edit — partner strip below hero CTAs reading `S&P TeraHelix integration partner · Microsoft partner`. Pillars / Floor 13 / methodology / proof / closing unchanged.
- `/labs`: hero rewrite (`Atheryon Labs / The banking platform built by AI.`, drop the disclaimer slot); new "Why this is credible" section between hero and offers preview; engagement cards adopt `Buy / License / Engage` verbs at the moment-of-decision (offers preview keeps the softer `Take the …` voice).

**Workstream B — Themes surface (§7–§9):**
- New public route `/labs/themes` rendering all 29 themes across 6 bands (ODS + 5 business functions) as a static, server-rendered page.
- Cards link out to `https://labs.atheryon.ai{primaryRoute}` in a new tab. No sub-routes are ported, no interactivity, no admin link.
- One discoverability link from `/labs` → `/labs/themes` ("Browse the surface →"). No top-nav entry.

The two workstreams converge on a single edit to `src/app/labs/page.tsx` (Workstream A inserts a new section between hero and offers preview; Workstream B adds a "Browse the surface" link adjacent to the offers preview) and a single edit to `src/content/site.ts` (both add new keys under `site.pages`).

## 3. Decisions captured (Workstream A)

| Decision | Choice |
|---|---|
| Where the new positioning lands | Both surfaces: `/reality` hero light edit + `/labs` rework |
| Partner claim used | **S&P TeraHelix integration partner** (Coseer dropped — not defensible) |
| Brand frame for `/labs` | "Soft middle" — Atheryon Labs is named, but framed as the working platform from Atheryon |
| Offer verbs | **Hybrid** — `offersPreview` keeps `Take the …`; `engagement` cards switch to `Buy / License / Engage` |
| `/reality` hero placement | Partner strip below CTAs |
| Existing `/labs` partner badges | **Keep as-is** — `S&P Global Partner` and `Microsoft Partner` remain in `evidence.partners` and `bankerWedge.bio` |
| Hero line 2 | `The banking platform built by AI.` (no partner reference; partner story moves to next section) |
| Hero disclaimer | **Removed** — `LabsHero` `disclaimer` prop becomes optional |

### Known inconsistencies (intentional — per decision above)

1. `/labs` hero / `whyCredible` says **S&P TeraHelix integration partner** while the same page's `evidence.partners` strip and `bankerWedge.bio` still say **S&P Global Partner**. Defensible — different rhetorical roles — but flagged for a future cleanup pass.
2. `bankerWedge.bio` still says "Atheryon is a Microsoft partner and S&P Global partner." Not changed in this round.

## 4. Out of scope (both workstreams)

- Coseer (entirely)
- Nav / footer / header / sitemap structural changes
- Adding `/labs/themes` to the top-level header navigation (entry point is the `/labs` page link only)
- New components beyond those listed in §6.1 and §8.1
- Copy changes to `/reality` pillars, transition, Floor 13, methodology, proof, closing
- Copy changes to `/labs` `evidence`, `flagships`, `bankerWedge`, `method`, `closing`
- Cleanup of the two known inconsistencies above (`S&P Global Partner` badge, `bankerWedge.bio` sentence)
- OG image updates beyond `labs.title` / `labs.description` text
- Pricing, Stripe, or commercial-model wiring beyond the visible card copy and CTA labels
- Porting any of the 147 sub-pages from `labs.atheryon.ai` (`/orders/eoi`, `/risk/var`, `/post-trade/confirmations`, etc.)
- The labs visibility store (`useMenuVisibilityStore`, `themesHidden`, `l3Hidden`) and the `/admin/menu` configurator
- The technical labs header chrome (`/MENU-BY-BU` eyebrow, ODS / BUSINESS chips, `⚙ Configure`)
- Backend / data-fetching / client-side state on `/labs/themes` — static export must continue to work (`npx next build` → `out/`)

---

# Workstream A — Credibility

## 5. Content changes (Workstream A) — `src/content/site.ts`

### 5.1 `reality.hero.partnerStrip` — new field

Add a new field to `site.pages.reality.hero`:

```ts
partnerStrip: {
  partners: [
    { name: 'S&P TeraHelix integration partner' },
    { name: 'Microsoft partner' },
  ],
}
```

Consumed by `RealityHero` (see §6.2). Rendered below the existing primary/secondary CTAs.

### 5.2 `labs.hero` — rewrite

Replace `site.pages.labs.hero` content with:

| Slot | Value |
|---|---|
| `headlineLine1` | `Atheryon Labs` |
| `headlineLine2` | `The banking platform built by AI.` |
| `body` | `Atheryon Labs is a working CDM-native banking reference platform built by one capital-markets expert directing AI. It demonstrates how complex financial data can be modelled, linked, structured, and turned into usable banking software.` |
| `disclaimer` | **removed from data** (key deleted) |
| `primaryCta` | unchanged — `{ label: 'See it live', href: 'https://www.atheryon.com.au' }` |
| `secondaryCta` | unchanged — `{ label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' }` |
| `tertiaryCta` | unchanged — `{ label: 'Request a confidential discussion', href: '/contact' }` |

Visual mapping in `LabsHero`: `headlineLine1` renders in dark text, `headlineLine2` in `text-brand-orange`. Putting `Atheryon Labs` in the dark slot and the value-prop in the orange slot lands the "soft middle" brand frame — Atheryon Labs is identified, but the visual emphasis is on the platform statement, not on elevating Labs as a separate sub-brand.

### 5.3 `labs.whyCredible` — new block

Add a new top-level field to `site.pages.labs`:

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
}
```

### 5.4 `labs.offersPreview` — unchanged

Keep titles, oneLiners, and section title as-is. The "Take the …" voice stays as the soft top-of-page invitation.

### 5.5 `labs.engagement.cards` — rewrite per-card content; keep section title and ids

`labs.engagement.title` stays `Code, prompts, advisory` (section header is unchanged). Per-card edits:

| Card | Field | Old | New |
|---|---|---|---|
| 01 (id: `code`) | `title` | `Take the code.` | `Buy the code.` |
| 01 | `body` | (existing co-marketing language) | `License the Atheryon Labs platform code as a working banking reference implementation. Best for: data vendors, AI firms, banks, consultancies, cloud partners, and fintechs that need a credible vertical platform asset.` |
| 01 | `ctaLabel` | `Inspect` | `Buy the code` |
| 01 | `ctaHref`, `anchorId`, `number` | unchanged | unchanged |
| 02 (id: `prompts`) | `title` | `Take the prompts.` | `License the prompts.` |
| 02 | `body` | (existing directorial-archive language) | `License the prompt archive that directed the AI build. This includes the instructions, corrections, domain constraints, architecture decisions, and banking reasoning used to turn AI from a generic code generator into a useful regulated-finance build partner.` |
| 02 | `ctaLabel` | `License` | `License the prompts` |
| 02 | `ctaHref`, `anchorId`, `number` | unchanged | unchanged |
| 03 (id: `advisory`) | `title` | `Take the advisory.` | `Engage the builder.` |
| 03 | `body` | (existing senior-led-delivery language) | `Work with Terry to apply the same method to your own data, product, platform, client opportunity, or S&P TeraHelix integration path. This is where integration-partner credibility matters most.` |
| 03 | `ctaLabel` | `Engage` | `Engage the builder` |
| 03 | `ctaHref`, `anchorId`, `number` | unchanged | unchanged |

### 5.6 `labs.title` / `labs.description` — metadata

| Field | New value |
|---|---|
| `labs.title` | `Atheryon Labs — Banking AI platform from the S&P TeraHelix integration partner` |
| `labs.description` | `A working CDM-native banking reference platform, built by one capital-markets expert directing AI. Buy the code. License the prompts. Engage the builder.` |

Note: the metadata `title` mentions the S&P TeraHelix integration partner credential while the visible hero (§5.2) does not. This is **intentional** — the metadata serves search results and social-share previews, where the partner credential earns the click; the visible hero is deliberately simpler and lets the immediately-following "Why this is credible" section (§5.3) carry the partner story.

### 5.7 Untouched on `/labs` (Workstream A)

`evidence` (stats, bank map, partners strip, partnersCaption), `flagships`, `bankerWedge` (photo, bio, vignettes), `method` (principles, economics, artifact, disclosure), `closing`.

## 6. Component & page wiring (Workstream A)

### 6.1 `src/components/RealityHero.tsx`

Add one optional prop:

```ts
partnerStrip?: { partners: { name: string }[] }
```

When present, render below the CTA row:

- A small uppercase eyebrow label (e.g. `Ecosystem`) in `text-charcoal/60` with `tracking-wider text-xs font-semibold uppercase`.
- Partner names rendered in a flex row in `text-charcoal` (matches the existing `RealityHero` body register) separated by a middle-dot (`·`).
- No brand-orange. The strip should read as a quiet trust marker, not a callout.

No new component file. No changes to existing required props.

### 6.2 `src/app/reality/page.tsx`

Pass `reality.hero.partnerStrip` through to `<RealityHero …>`. One-line addition.

### 6.3 `src/components/LabsHero.tsx`

Make `disclaimer` prop optional:

```ts
disclaimer?: string
```

Render the existing italic `<p>` only when `disclaimer` is a non-empty string. No other behaviour change.

### 6.4 `src/app/labs/page.tsx` — Workstream A edits

(See §9 for the Workstream B edits to the same file. The two workstreams' edits are independent but both must end up on the page in the order shown in §10.2.)

1. Remove the `disclaimer={labs.hero.disclaimer}` prop from the `<LabsHero …>` call entirely (the data field has been deleted in §5.2, so any reference will fail typecheck).
2. Insert a new section between `LabsHero` and the existing `offersPreview` section:

```tsx
<SectionDivider />

{/* §1.5 Why this is credible */}
<Section badge={labs.whyCredible.badge} title={labs.whyCredible.title}>
  <div className="space-y-5 max-w-3xl">
    {labs.whyCredible.paragraphs.map((p) => (
      <p key={p.slice(0, 24)} className="text-lg text-neutral-700 leading-relaxed">{p}</p>
    ))}
  </div>
</Section>
```

The existing `<SectionDivider />` between `LabsHero` and `offersPreview` is kept; one additional `SectionDivider` is added between the new `whyCredible` section and `offersPreview` so spacing matches the rest of the page.

### 6.5 No other component changes (Workstream A)

`LabsBankMap`, `LabsFlagship`, `LabsVignette`, `LabsEngagementCard`, `Section`, `SectionDivider`, `Header`, `Footer` are untouched by Workstream A.

---

# Workstream B — Themes surface

## 7. Information architecture

### 7.1 Route

| URL | Source | Notes |
|-----|--------|-------|
| `/labs/themes` | `src/app/labs/themes/page.tsx` (new) | Server component. Static. |

`/labs` (the existing marketing page) gets a new outbound link to `/labs/themes` — placed immediately after the `offersPreview` section (see §9.4). The requirement is that `/labs` users can find `/labs/themes` in one click.

### 7.2 Page sections

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

## 8. Components (Workstream B)

All components are server components (no `'use client'`). All styling via Tailwind — labs CSS modules are not ported.

### 8.1 `src/components/ThemeCard.tsx`

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

### 8.2 `src/components/ThemeBand.tsx`

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

### 8.3 `BusinessUnitsDivider`

Inline element inside `page.tsx`, not its own file. Renders the centred "Business Units · 22 themes · 91p" rule between the ODS band and the function bands.

## 9. Data & wiring (Workstream B)

### 9.1 New file: `src/content/themes.ts`

Ports the typed taxonomy from `labs-platform/src/lib/themes/themes.ts` **verbatim**:

- `Domain`, `BusinessFunction`, `ThemeRoute`, `Theme` types.
- `FUNCTION_META`, `FUNCTION_ORDER`.
- `ODS_THEMES` (7 entries), `BUSINESS_THEMES_BY_FUNCTION` (5 keys), `ALL_THEMES`.
- `pageCountFor()` helper.

This is a one-time copy. If `labs-platform` adds/edits a theme, the website must be re-synced manually. The spec accepts this drift cost rather than introducing a build-time fetch or a shared package.

**Convention deviation flagged:** `CLAUDE.md` says "All copy/text goes in `site.ts`." This file is **structured taxonomy** (~700 lines), not page copy. Putting it in `site.ts` would push that file past 1500 lines and make it harder to maintain. Page copy (badge, title, intro paragraph, metadata) still goes in `site.ts` under `site.pages.themes` (§9.2).

### 9.2 Modified: `src/content/site.ts` — add `pages.themes`

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

### 9.3 Asset copy

Copy all 29 PNGs from `labs-platform/public/menu-themes-thumbs/` to `atheryon-website/public/menu-themes-thumbs/`. Filenames preserved (`t-{id}.png`). The orphan `t-risk-pricing.png` in the source directory is **not** referenced by any theme — skip it.

Each thumb is ~50–150 KB; total static payload added to the site is roughly 2–4 MB. Acceptable for a discovery page; not lazy-loaded above-the-fold but lazy-loaded everywhere else (`loading="lazy"` on the `<img>`).

### 9.4 `src/app/labs/page.tsx` — Workstream B edit

Render the discovery-surface link as the **last element inside the existing `offersPreview` Section**, immediately below the three preview cards. This keeps the existing `<SectionDivider />` rhythm intact (no new dividers are introduced) and preserves Workstream A's structure.

```tsx
<Section badge={labs.offersPreview.badge} title={labs.offersPreview.title}>
  <div className="grid md:grid-cols-3 gap-6">
    {/* …existing offersPreview.items map (unchanged)… */}
  </div>

  {/* Workstream B addition — link to discovery surface */}
  <div className="mt-10 pt-6 border-t border-neutral-500/10">
    <Link href="/labs/themes" className="inline-flex items-center text-sm font-semibold text-brand-orange hover:underline">
      Browse the full surface — 29 themes · 147 pages →
    </Link>
  </div>
</Section>
```

The requirement is one clearly visible link on `/labs` to `/labs/themes`. Styling matches the site's existing inline-link voice.

### 9.5 Linking strategy

- **Cards on `/labs/themes`** link to `https://labs.atheryon.ai{theme.primaryRoute}` with `target="_blank" rel="noopener"`. The `noopener` is non-negotiable (security); `noreferrer` is left off so labs analytics can attribute the website as referrer.
- **Routes inside a card** are display-only. They show "what's inside this theme" but do not become 30+ outbound links per card. Whole-card click = open the theme's primary route.
- **No internal links** from `/labs/themes` to anywhere else on the website except the breadcrumb back to `/labs`.

---

## 10. Files to add / modify (combined)

### 10.1 File change inventory

**New (Workstream B only):**
- `src/app/labs/themes/page.tsx`
- `src/content/themes.ts`
- `src/components/ThemeCard.tsx`
- `src/components/ThemeBand.tsx`
- `public/menu-themes-thumbs/*.png` (29 files)

**Modified (overlap noted):**
- `src/content/site.ts` — Workstream A adds `reality.hero.partnerStrip`, rewrites `labs.hero`, adds `labs.whyCredible`, rewrites `labs.engagement.cards`, updates `labs.title` / `labs.description`. Workstream B adds `pages.themes`.
- `src/app/labs/page.tsx` — Workstream A inserts `whyCredible` section between hero and offers preview (§6.4); Workstream B adds a "Browse the full surface →" link as the last element *inside* the offers preview section (§9.4). Both edits are independent.
- `src/components/RealityHero.tsx` — Workstream A only: optional `partnerStrip` prop (§6.1).
- `src/components/LabsHero.tsx` — Workstream A only: `disclaimer` prop becomes optional (§6.3).
- `src/app/reality/page.tsx` — Workstream A only: pass `partnerStrip` through (§6.2).
- `src/components/index.ts` (if it exists as a barrel) — export `ThemeCard`, `ThemeBand`.

### 10.2 Final on-page section order — `/labs/page.tsx`

The end-state of `/labs/page.tsx`, after both workstreams ship, must read top-to-bottom:

```
<LabsHero …no disclaimer prop… />
<SectionDivider />
<Section> Why this is credible </Section>                              ← Workstream A (new)
<SectionDivider />
<Section> Three ways to use this work / Code, prompts, advisory
  └─ existing 3 preview cards (unchanged)
  └─ "Browse the full surface →" link → /labs/themes              ← Workstream B (new, in-section)
</Section>
<SectionDivider />
<Section> Evidence (stats / bank map / partners) </Section>            ← unchanged
<SectionDivider />
<Section> Flagships </Section>                                         ← unchanged
<SectionDivider />
<Section> Banker × AI (bio + vignettes) </Section>                     ← unchanged
<SectionDivider />
<Section> Method </Section>                                            ← unchanged
<SectionDivider />
<Section> Engagement (3 cards w/ new copy) + closing </Section>        ← Workstream A (cards rewritten)
```

## 11. Site type implications

`src/content/site.ts` exports `Site = typeof site`. The shape changes are:

- `Site['pages']['reality']['hero']['partnerStrip']` — new optional shape `{ partners: { name: string }[] }`.
- `Site['pages']['labs']['hero']['disclaimer']` — removed key; `LabsHeroProps.disclaimer` becomes optional in the component to match.
- `Site['pages']['labs']['whyCredible']` — new shape `{ badge: string; title: string; paragraphs: string[] }`.
- `Site['pages']['themes']` — new shape `{ title: string; description: string; badge: string; headline: string; intro: string; countsLine: string; businessDividerLabel: string }`.

`tsc` (via `npx next build`) is the source of truth for confirming the new shape compiles cleanly across all consumers.

## 12. Testing plan

- `npx next build` — typecheck and static build. Catches: new `partnerStrip` prop wiring, removed `disclaimer` data, new `whyCredible` shape access in `labs/page.tsx`, new `pages.themes` access in `labs/themes/page.tsx`. Must emit `out/labs/themes/index.html`.
- `npx next dev` — visual pass:
  - `/` (Reality) — partner strip renders below CTAs with correct copy and dot separator; no layout regression at mobile breakpoints.
  - `/labs` — new hero copy renders with `Atheryon Labs` (dark) and `The banking platform built by AI.` (orange); body paragraph renders; **no italic disclaimer** appears; new "Why this is credible" section appears between hero and offers preview; "Browse the surface →" link appears after offers preview; engagement cards show new titles, bodies, and CTA labels.
  - `/labs/themes` — all 29 themes render across 6 bands; counts and section headers match §7.2; thumbnails resolve under `/menu-themes-thumbs/`; cards open `https://labs.atheryon.ai/...` in a new tab; mobile (≤640px) bands stack to single column and cards remain readable.
- Anchor links — confirm `#offers-code`, `#offers-prompts`, `#offers-advisory` still scroll from the (unchanged) `offersPreview` jump links into the engagement cards (whose `anchorId` values are unchanged).
- Existing tests — scan `tests/` for any Playwright assertions that match old hero strings (`"Most capital-markets platforms"`, `"This one took one banker"`), old card titles (`"Take the code"` etc.) or old card CTA labels (`"Inspect"`, `"License"`, `"Engage"`). Update only the stale matches; do not invent new tests in this round.

## 13. Risks

- **TS shape changes** at `Site['pages']['labs']['hero']` (removed `disclaimer`), `Site['pages']['reality']['hero']` (new `partnerStrip`), and `Site['pages']` (new `themes`) could cascade if any other consumer reads those fields. Verified call sites at design time: only `src/app/labs/page.tsx` reads `labs.hero.*`, only `src/app/reality/page.tsx` reads `reality.hero.*`, and `themes` is a brand-new key. `npx next build` is the safety net.
- **Playwright coverage** — if the existing test suite asserts on hero or card copy, it will fail. In scope to update affected assertions in this round.
- **Hero line ambiguity** — `The banking platform built by AI.` can be read as "AI built it autonomously," contradicting the rest of the page's "banker directing AI" thesis. Accepted by the author; not modified.
- **Internal copy inconsistencies** (`S&P Global Partner` strip + `bankerWedge.bio` sentence) — left in place per decision; flagged for a possible follow-up pass.
- **Themes drift** — `src/content/themes.ts` is a one-time copy of `labs-platform/src/lib/themes/themes.ts`. No build-time link. If labs adds a theme and the website is not re-synced, the surface map will be stale. Accepted cost.
- **Static-export payload** — adding 29 thumbnails (~2–4 MB total) increases the static site payload. All thumbs are `loading="lazy"` so above-the-fold cost is bounded. Acceptable.

## 14. Acceptance criteria

The change is done when:

- `/reality` renders a partner strip beneath the CTAs reading `S&P TeraHelix integration partner · Microsoft partner` (with eyebrow label and dot separator), and `/reality`'s pillars / Floor 13 / methodology / proof / closing are visually identical to before.
- `/labs` hero displays `Atheryon Labs` (dark) over `The banking platform built by AI.` (brand-orange), followed by the new body paragraph and the three existing CTAs. No italic disclaimer paragraph appears.
- A new "Why this is credible" section appears between the `/labs` hero and the offers preview, with the four paragraphs from §5.3 and the section badge `Why this is credible`.
- A "Browse the full surface →" link appears as the last element inside the `/labs` offers preview section and routes to `/labs/themes`.
- The `/labs` engagement section's three cards display the new titles (`Buy the code.` / `License the prompts.` / `Engage the builder.`), the new body copy (§5.5), and the new CTA labels. `anchorId` values, hrefs, and the section header `Code, prompts, advisory` are unchanged.
- The `/labs` `offersPreview` section is visually and textually identical to before.
- `/labs` `evidence`, `flagships`, `bankerWedge`, `method`, and `closing` sections are visually and textually identical to before.
- `/labs/themes` renders all 29 themes across 6 bands (1 ODS + 5 business functions) with counts matching §7.2; every card opens the corresponding `https://labs.atheryon.ai{primaryRoute}` in a new tab; the page is reachable from `/labs` in one click.
- `npx next build` passes with no type or build errors and emits `out/labs/themes/index.html`.
- All 29 thumbnails resolve under `/menu-themes-thumbs/` in the built output.
- Any Playwright tests still in the repo either pass or have been updated to match the new copy (no test deletions of healthy assertions; only stale-string updates).

## 15. Open questions

None at design time.
