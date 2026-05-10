# S&P TeraHelix credibility layer — `/reality` hero strip + `/labs` rework — design spec

**Date:** 2026-05-11
**Author:** Terry Tsakiris (with Claude)
**Repo (implementation target):** `atheryon-ai/atheryon-website` — Next.js 14 App Router, Tailwind, Azure Static Web Apps. All copy lives in `src/content/site.ts`.
**Status:** design approved (brainstorming session 2026-05-11) — pending implementation plan via `/superpowers:writing-plans`.

---

## 1. Problem

Atheryon needs a stronger credibility layer on the public site. The current `/labs` page positions Atheryon as "the banker × AI artefact" and lists "Microsoft Partner" and "S&P Global Partner" in an ecosystem strip, but does not lean on the most defensible enterprise-data credential available: that Atheryon is the integration partner for S&P TeraHelix (acquired by S&P Global in June 2025 to strengthen advanced data modelling and linking capabilities).

That credential maps directly to the Atheryon Labs platform story — CDM-native data structures, modelling, linking, interoperability, AI-readiness — and gives buyers a reason to trust the platform claim beyond Terry's CV.

A Coseer integration claim is **not** factually solid this round and is dropped entirely from the copy.

## 2. Goal

Two surface changes, both focused on positioning, no new components:

- **`/reality` (homepage) — light edit:** add a small partner strip below the hero CTAs reading `S&P TeraHelix integration partner · Microsoft partner`. The Reality narrative (pillars, Floor 13, methodology, proof, closing) is otherwise unchanged.
- **`/labs` — full rework of three areas:**
  - **Hero copy** rewritten to lead with `Atheryon Labs / The banking platform built by AI.`, dropping the existing disclaimer slot.
  - **New "Why this is credible" section** inserted between the hero and the offers preview, anchoring the S&P TeraHelix integration-partner claim in public S&P announcement language.
  - **Engagement section (full triad cards)** rewritten to adopt new commercial verbs — `Buy the code.` / `License the prompts.` / `Engage the builder.` — at the moment-of-decision. The earlier `offersPreview` section keeps the softer existing `Take the code / Take the prompts / Take the advisory` voice.

Everything else on `/labs` (`evidence`, `flagships`, `bankerWedge`, `method`, `closing`) is left untouched and continues to function as proof for the new pitch.

## 3. Decisions captured

| Decision | Choice |
|---|---|
| Where the new positioning lands | Both surfaces: `/reality` hero light edit + `/labs` full rework |
| Partner claim used | **S&P TeraHelix integration partner** (Coseer dropped entirely; not currently defensible) |
| Brand frame for `/labs` | "Soft middle" — Atheryon Labs is named, but framed as the working platform from Atheryon (no separate sub-brand promotion in nav, OG, etc.) |
| Offer verbs | **Hybrid** — `offersPreview` keeps `Take the …`; `engagement` cards switch to `Buy / License / Engage` |
| `/reality` hero placement | Partner strip below CTAs |
| Existing `/labs` partner badges | **Keep as-is** — `S&P Global Partner` and `Microsoft Partner` remain in the `evidence.partners` strip and `bankerWedge.bio` |
| Hero line 2 | `The banking platform built by AI.` (no partner reference; partner story moves to the next section) |
| Hero disclaimer | **Removed** — `LabsHero` `disclaimer` prop becomes optional |

### Known inconsistencies (intentional, per decision above)

1. `/labs` hero says `S&P TeraHelix integration partner` (in the `whyCredible` section), while the same page's `evidence.partners` strip and `bankerWedge.bio` still say `S&P Global Partner`. Defensible — the partners strip is an ecosystem credential bar; the new section is a specific positioning claim — but worth a future-pass cleanup if it reads odd live.
2. `bankerWedge.bio` still says `Atheryon is a Microsoft partner and S&P Global partner.` Not changed in this round.

## 4. Out of scope

- Coseer (entirely)
- Nav, footer, header, sitemap changes
- New components — only props on existing components and content edits
- Copy changes to `/reality` pillars, transition, Floor 13, methodology, proof, closing
- Copy changes to `/labs` `evidence`, `flagships`, `bankerWedge`, `method`, `closing`
- OG image updates beyond `labs.title` / `labs.description` text
- Cleanup of the two known inconsistencies above (`S&P Global Partner` badge, `bankerWedge.bio` sentence)
- Pricing, Stripe, or commercial-model wiring beyond the visible card copy and CTA labels

## 5. Content changes — `src/content/site.ts`

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

Consumed by `RealityHero` (see §6.1). Rendered below the existing primary/secondary CTAs.

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

### 5.7 Untouched on `/labs`

`evidence` (stats, bank map, partners strip, partnersCaption), `flagships`, `bankerWedge` (photo, bio, vignettes), `method` (principles, economics, artifact, disclosure), `closing`.

## 6. Component & page wiring

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

### 6.4 `src/app/labs/page.tsx`

Two edits:

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

### 6.5 No changes to other components

`LabsBankMap`, `LabsFlagship`, `LabsVignette`, `LabsEngagementCard`, `Section`, `SectionDivider`, `Header`, `Footer` are untouched.

## 7. Site type implications

`src/content/site.ts` exports `Site = typeof site`. The shape changes are:

- `Site['pages']['reality']['hero']['partnerStrip']` — new optional shape `{ partners: { name: string }[] }`.
- `Site['pages']['labs']['hero']['disclaimer']` — removed key; `LabsHeroProps.disclaimer` becomes optional in the component to match.
- `Site['pages']['labs']['whyCredible']` — new shape `{ badge: string; title: string; paragraphs: string[] }`.

`tsc` (via `npx next build`) is the source of truth for confirming the new shape compiles cleanly across all consumers.

## 8. Testing plan

- `npx next build` — typecheck and static build. Catches: new `partnerStrip` prop wiring, removed `disclaimer` data, new `whyCredible` shape access in `labs/page.tsx`.
- `npx next dev` — visual pass:
  - `/` (Reality) — partner strip renders below CTAs with correct copy and dot separator; no layout regression at mobile breakpoints.
  - `/labs` — new hero copy renders with `Atheryon Labs` (dark) and `The banking platform built by AI.` (orange); body paragraph renders; **no italic disclaimer** appears; new "Why this is credible" section appears between hero and offers preview; engagement cards show new titles, bodies, and CTA labels.
- Anchor links — confirm `#offers-code`, `#offers-prompts`, `#offers-advisory` still scroll from the (unchanged) `offersPreview` jump links into the engagement cards (whose `anchorId` values are unchanged).
- Existing tests — scan `tests/` for any Playwright assertions that match old hero strings (e.g. `"Most capital-markets platforms"`, `"This one took one banker"`), old card titles (`"Take the code"` etc.), or old card CTA labels (`"Inspect"`, `"License"`, `"Engage"`). Update or remove only the ones that are now stale; do not invent new tests in this round.

## 9. Risks

- **TS shape changes** at `Site['pages']['labs']['hero']` (removed `disclaimer`) and `Site['pages']['reality']['hero']` (new `partnerStrip`) could cascade if any other consumer reads those fields. Verified call sites at design time: only `src/app/labs/page.tsx` reads `labs.hero.*`, and only `src/app/reality/page.tsx` reads `reality.hero.*`. `npx next build` is the safety net.
- **Playwright coverage** — if the existing test suite asserts on hero or card copy, it will fail. In scope to update affected assertions in this round.
- **Hero line ambiguity** — `The banking platform built by AI.` can be read as "AI built it autonomously," which contradicts the rest of the page's "banker directing AI" thesis. Accepted by the author; not modified.
- **Internal copy inconsistencies** (`S&P Global Partner` strip + `bankerWedge.bio` sentence) — left in place per decision; flagged for a possible follow-up pass.

## 10. Acceptance criteria

The change is done when:

- `/reality` renders a partner strip beneath the CTAs reading `S&P TeraHelix integration partner · Microsoft partner` (with eyebrow label and dot separator), and `/reality`'s pillars / Floor 13 / methodology / proof / closing are visually identical to before.
- `/labs` hero displays `Atheryon Labs` (dark) over `The banking platform built by AI.` (brand-orange), followed by the new body paragraph and the three existing CTAs. No italic disclaimer paragraph appears.
- A new "Why this is credible" section appears between the `/labs` hero and the offersPreview, with the four paragraphs above and the section badge `Why this is credible`.
- The `/labs` engagement section's three cards display the new titles (`Buy the code.` / `License the prompts.` / `Engage the builder.`), the new body copy, and the new CTA labels (`Buy the code` / `License the prompts` / `Engage the builder`). `anchorId` values, hrefs, and the section header `Code, prompts, advisory` are unchanged.
- The `/labs` `offersPreview` section is visually and textually identical to before.
- `/labs` `evidence`, `flagships`, `bankerWedge`, `method`, and `closing` sections are visually and textually identical to before.
- `npx next build` passes with no type or build errors.
- Any Playwright tests still in the repo either pass or have been updated to match the new copy (no test deletions of healthy assertions; only stale-string updates).
