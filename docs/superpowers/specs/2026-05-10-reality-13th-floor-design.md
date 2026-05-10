# Atheryon `/reality` — 13th Floor direction — design spec

**Date:** 2026-05-10
**Author:** Terry Tsakiris (with Abi)
**Repo (implementation target):** `atheryon-ai/atheryon-website` — Next.js 14 App Router, Tailwind, Azure Static Web Apps. All copy lives in `src/content/site.ts`.
**Prototype source:** `~/Desktop/atheryon_low_fidelity_website_prototype.html` (2026-05-10) — wireframe of the 13th Floor concept.
**Companion reference:** `~/Desktop/Atheryon Labs — CDM Intelligence Platform.webarchive` — labs.atheryon.ai/themes (the proof artifact).
**Status:** design approved (Q1–Q5 + §1–§6 walkthrough) — pending implementation plan via `/superpowers:writing-plans`.

---

## 1. Problem

The current homepage and Services dropdown reads as senior-bank advisory in a tier-1 register: "Decision-grade data platforms under pressure", four service pages (CDM Platform / Recovery & Migration / M&A Execution / Capability Enablement). It works for the existing bank-buyer conversation but does not carry a marketable, campaign-able pitch suitable for paid media, OOH, or general enterprise audiences beyond banks.

The 13th Floor direction provides that campaign-able pitch: *Reality is built on data. Architect yours.* It compresses the firm into three legible pillars (**Data · Intelligence · Transformation**), positions Atheryon as **"Architects of Your Reality"**, and adds a conversion mechanic — the **Floor 13 switchboard** — that turns the cinematic concept into a practical first step for visitors.

The proof of the firm's method already exists at `/labs` (shipped 2026-05-08, PR #11). `/reality` is the *general pitch*; `/labs` is the *artifact*. Visitors flow `/reality` → Floor 13 diagnostic → `/labs` sell triad (Take the code / Take the prompts / Take the advisory).

## 2. Goal

Replace the current homepage and four legacy service pages with a coherent 13th Floor IA:

- **`/` (homepage) = `/reality`** — the long-scroll campaign pitch. Same content rendered at both URLs.
- **Three pillar pages** — `/data`, `/intelligence`, `/transformation` — replace the old Services dropdown.
- **Floor 13** — an interactive switchboard on `/reality` that generates a "Reality Blueprint" and funnels into the existing `/labs` sell triad.
- **Brand integration** — adopt the BR2049 × 1920s register from the 2026-05-08 logo brief (sodium amber `#D98B3E`, bone `#EFEAE0`, ink `#0E1116`) **plus** a structural blue accent `#0D4D7A` from the 13th Floor prototype, kept as the "data layer" tint.
- **Hard cut migration** — eight legacy URLs 301-redirect to the appropriate pillar; eight legacy app routes are deleted from the repo. Single sprint, single PR.

## 3. Positioning

> **Reality is built on data. Architect yours.**
>
> Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.

The voice is **enterprise-broad, cinematic, restrained** — not bank-only. The current `/labs` page (banker-talking-to-bankers) sits inside this pitch as the proof, not the front door.

The three pillars frame everything:

- **Data** — foundations: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.
- **Intelligence** — decision advantage: analytics, AI implementation, forecasting, automation, insight products.
- **Transformation** — operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.

The visual hook: a sepia-tinted business world that **glitches open** to reveal the underlying data architecture in sodium amber and structural blue. Direct visual reference to *The 13th Floor* (1999) — simulated reality, hidden architecture.

## 4. Information architecture

### 4.1 Header navigation

```
[A logo]  Reality  Data  Intelligence  Transformation  Labs  About
```

- `/` and `/reality` render the same page (alias). Paid media and OOH QR codes use `/reality` for stable, brandable URLs.
- **No header CTA slot.** Just nav links.
- Floor 13 is **not** in the header — it is reachable as section §4 of `/reality`.
- `/programs`, `/programs/mib-insight`, `/about`, `/contact` stay live; only `/about` is in the header (commerce flow stays at `/programs/mib-insight`, accessible by direct URL).

### 4.2 Routes — final state after this sprint

| Route | Purpose | Status after sprint |
|---|---|---|
| `/` | Homepage (renders /reality content) | Replaced |
| `/reality` | Alias of `/` for paid-media URLs | New |
| `/data` | Data pillar | New |
| `/intelligence` | Intelligence pillar | New |
| `/transformation` | Transformation pillar | New |
| `/labs` | Proof artifact, 3 sell options | Unchanged from PR #11 |
| `/about` | Existing | Unchanged |
| `/contact` | Existing | Unchanged |
| `/programs` | Programs hub | Unchanged, removed from header |
| `/programs/mib-insight` | MiB Insight storefront (live commerce) | Unchanged |
| `/programs/mib-insight/thanks` | Post-purchase | Unchanged |

### 4.3 Routes retired (301 redirects, source files deleted)

| Legacy URL | Redirects to | Reason |
|---|---|---|
| `/cdm-platform` | `/data` | CDM is data-foundation work |
| `/recovery-migration` | `/transformation` | Operating-change service |
| `/m-and-a-execution` | `/transformation` | Operating-change service |
| `/capability-enablement` | `/transformation` | Operating-change service |
| `/how-we-work` | `/reality#methodology` | Methodology folds into the pitch |
| `/what-we-deliver` | `/transformation` | Engagement shapes |
| `/ai-ready-data` | `/intelligence` | AI-readiness lives here |
| `/reference-architectures` | `/data` | Architecture diagrams as proof |

### 4.4 Footer

Stripped to: `Atheryon` · `Contact` · `Privacy` · `LinkedIn` · `© <year>`.
Resource columns removed.

## 5. `/reality` page structure

Long-scroll, 7 sections. All copy in `site.pages.reality`.

### §1 — Hero

> # Reality is built on data. Architect yours.
>
> Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.
>
> **CTAs:** *Enter Floor 13* (anchor to §4) · *Explore the pillars* (anchor to §2)

Hero visual: sepia → glitch → structural lattice (see §7 brand for treatment). Above-the-fold target at 1280×720 with both CTAs visible.

### §2 — Three pillars

Three numbered cards (01 Data, 02 Intelligence, 03 Transformation) — each links to its pillar page. One sentence per card. Sub-eyebrow: *"A simple three-pillar explanation of how we architect reality."*

### §3 — Narrative transition

Two-column split:

> **Beneath every enterprise is a hidden operating reality.**
>
> Fragmented systems create fragmented decisions. Atheryon makes the underlying architecture visible, intelligent, and ready for transformation.

Right column: 3-step timeline (Fragmented data → Structured intelligence → Real transformation).

### §4 — Floor 13 switchboard

The conversion centerpiece. See §6 below for the full component spec.

### §5 — Methodology

3-4 principles condensed from `/how-we-work`. Terse. The point of this section is *"how we architect reality"* — keeps the methodology visible without a separate page.

### §6 — Proof — `/labs`

Single full-width band. One screenshot from `labs.atheryon.ai`, 1-paragraph caption: *"We use the /reality approach to build /labs — a CDM-native reference platform across eight banking functions."* CTA: *See the artifact* → `/labs`.

### §7 — Closing CTA

> **Book a Reality Architecture Session.** A 45-minute consultation to identify the hidden architecture beneath your data estate and define the first transformation move.

Form or link to `/contact`. Same close as on every pillar page (consistency).

## 6. Floor 13 component spec

Lives as section §4 of `/reality`. Client component (`'use client'`).

### 6.1 Visual frame

- Dark band (`#0E1116` background, `#EFEAE0` text), full-bleed within the page.
- Three "dial" cards on a switchboard panel. Subtle radial-gradient highlights suggest old-world elevator brass without literal photoreal dials.
- Dashed `1px` borders on the dial cards reference the wireframe-prototype aesthetic but are restrained.

### 6.2 State machine

```
[idle]
  ↓ user clicks one of 3 dial buttons (Plug into Data / Intelligence / Transformation)
[selected:<pillar>]
  ↓ blueprint panel reveals below switchboard, scroll-into-view
[selected:<pillar>]
  ↓ user re-clicks another dial → swap content (not stack)
  ↓ OR user types into optional input + clicks "Generate Blueprint"
[selected:custom + user-text] OR [selected:<pillar> + user-text]
```

Re-clicking a dial swaps the panel content; does not lose state. Custom text overlays the visitor's stated challenge into the blueprint intro line.

### 6.3 Reality Blueprint panel

Reveals below the switchboard:

```
┌─────────────────────────────────────────────────┐
│ Your Reality Blueprint: <Pillar>                │
│                                                  │
│ <intro paragraph per pillar>                    │
│                                                  │
│ The hidden architecture                          │
│ • bullet 1                                       │
│ • bullet 2                                       │
│ • bullet 3                                       │
│                                                  │
│ Your next moves                                  │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Take the    │ │ Take the    │ │ Take the    │ │
│ │ code        │ │ prompts     │ │ advisory    │ │
│ │ [highlighted│ │             │ │             │ │
│ │  if matches │ │             │ │             │ │
│ │  pillar]    │ │             │ │             │ │
│ │ Inspect →   │ │ License →   │ │ Engage →    │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                  │
│ Or — book a Reality Architecture Session →      │
└─────────────────────────────────────────────────┘
```

### 6.4 Pillar → recommended sell-card mapping

- **Data** → "Take the code" (highlighted with sodium-amber border)
- **Intelligence** → "Take the prompts" (highlighted)
- **Transformation** → "Take the advisory" (highlighted)
- **Custom** (user-typed challenge with no dial selected) → none highlighted; all three shown equally

### 6.5 Anchors added to `/labs`

- `/labs#code` → "Take the code" card
- `/labs#prompts` → "Take the prompts" card
- `/labs#advisory` → "Take the advisory" card

`LabsEngagementCard` gets an optional `id` prop; the existing `/labs` page passes `id="code"`, `id="prompts"`, `id="advisory"` to its three engagement cards.

### 6.6 Copy data shape

`site.pages.reality.floor13` contains:

```typescript
{
  badge: 'Floor 13',
  title: 'Choose the issue that best describes your current reality.',
  intro: 'The switchboard generates a low-fidelity Reality Blueprint below.',
  dials: [
    { id: 'data', title: 'Data pain', body: '"Our data is fragmented…"', cta: 'Plug into Data' },
    { id: 'intelligence', title: 'Intelligence pain', body: '"We have data, but…"', cta: 'Plug into Intelligence' },
    { id: 'transformation', title: 'Transformation pain', body: '"We need change, but…"', cta: 'Plug into Transformation' },
  ],
  inputPlaceholder: 'Optional: type your biggest data or transformation challenge',
  inputCta: 'Generate Blueprint',
  blueprints: {
    data: { title: 'Reality Blueprint: Data Foundation', intro: '…', bullets: [...] },
    intelligence: { title: 'Reality Blueprint: Intelligence Layer', intro: '…', bullets: [...] },
    transformation: { title: 'Reality Blueprint: Transformation Pathway', intro: '…', bullets: [...] },
    custom: { title: 'Reality Blueprint: Custom Challenge', intro: '…', bullets: [...] },
  },
  sellCards: { /* references /labs sell-card content */ },
  closingCta: 'Or — book a Reality Architecture Session →',
  closingCtaHref: '/contact',
}
```

Initial copy seeded from the prototype's `blueprintData` JS object (verbatim), refined by Terry in the implementation plan.

### 6.7 No tracking, no lead capture, no API

Pure client-side reveal. Optional input is **not sent anywhere** — it only personalises the rendered intro line. (Confirmed Q4(a). Lead capture and AI-generated blueprints are explicitly out of scope; both are candidates for a v2 follow-up.)

### 6.8 Accessibility

- Dials are `<button>` elements, not styled `<div>`s.
- Active dial: `aria-pressed="true"`.
- Blueprint panel uses `aria-live="polite"` so screen readers announce the reveal.
- Smooth-scroll respects `prefers-reduced-motion: reduce` (instant scroll if user prefers).

## 7. Brand integration

The BR2049 × 1920s register (logo brief 2026-05-08) is the *style*; the 13th Floor is the *story expressed in that style*.

### 7.1 Palette (5 tokens — 2 surface + 1 text + 2 accent)

| Token | Value | Use |
|---|---|---|
| **Ink** (primary surface dark) | `#0E1116` | Floor 13 band, footer, dark sections. Deakins-night black, not pure `#000`. |
| **Bone** (primary surface light) | `#EFEAE0` | Body background. Aged-paper, not pristine ivory. Replaces current `#F7F6F3`. |
| **Charcoal** (text on light) | `#15171A` | Body text, headings, mark. *Text-only token, not an accent.* |
| **Sodium amber** (primary accent) | `#D98B3E` | Hero accent, recommended-card border, dial-active state, pillar-page eyebrow underline. **Replaces** the current bright `#FF9900`. |
| **Structural blue** (secondary accent) | `#0D4D7A` | "Data layer" tint — used on `/data` pillar page hero, Floor 13 Data dial active state, post-glitch lattice elements, schema/architecture diagrams. |

**Note:** This consciously overrides the BR2049 brief's "3 colours never 4" rule. Blue earns its place as the structural-data accent that distinguishes the Data pillar visually.

### 7.2 Tailwind changes

- `tailwind.config.ts`:
  - Rename `brand.orange` (`#FF9900`) → `brand.amber` (`#D98B3E`)
  - Add `brand.blue` (`#0D4D7A`)
  - Rename `warm.200` (`#F7F6F3`) → `bone` (`#EFEAE0`)
  - Add `ink` (`#0E1116`) and `charcoal` (`#15171A`) tokens
- `src/app/globals.css`: update CSS custom properties to match
- All references to `bg-brand-orange` / `text-brand-orange` get a search-and-replace to `brand-amber` (covered in implementation plan)

### 7.3 Type system (no change)

- Display: **Fraunces** (already shipped 2026-05-08, keep)
- Body: **Inter Tight** (already shipped 2026-05-08, keep)
- Wordmark in lockup: **Bodoni Moda** (per logo brief) — **out of scope for this sprint**, ships when wordmark-candidate review completes

### 7.4 Logo

**No logo replacement in this sprint.** Existing logo + favicon stay. The wordmark-candidate sheet (`docs/superpowers/specs/wordmark-candidates/wordmark-v2.html`) is a separate track.

The `public/atheryon-logo-animation.mp4` video element on the homepage is **retired** — replaced by the sepia → glitch → architecture hero treatment.

### 7.5 Hero motion (the one cinematic piece)

A single full-bleed background canvas in §1.

- **Initial state:** sepia-tinted still composition (low-contrast, warm haze — feels like a 1990s/early-2000s business photograph). Asset: `public/reality/hero-sepia.svg`.
- **Glitch sweep:** ~800ms CSS keyframe, triggered on scroll OR after 3 seconds of idle.
- **Reveal state:** restrained line-art "data architecture" lattice in sodium amber on charcoal, with structural-blue accents. Asset: `public/reality/hero-architecture.svg`.
- Loops back to sepia subtly every ~30s. Never aggressive.
- **Pure CSS + a small JS scroll/idle trigger.** No Lottie file, no video.
- `prefers-reduced-motion: reduce` → static composed image of the post-glitch state, no animation.
- Total weight target: <50KB combined.

### 7.6 Card chrome

The recent F-001..F-009 design pass already moved away from SaaS card chrome (editorial uppercase eyebrows, no card outlines except where structural, tighter rhythm). `/reality` and the pillar pages inherit this language — no new card patterns introduced.

### 7.7 Out of scope (next sprint, not this one)

- Logo / favicon / wordmark replacement
- Bodoni Moda font integration
- Floor 13 lead capture (Mailchimp / SendGrid)
- AI-generated blueprint (Claude API call)
- `/floor-13` standalone deep-link route
- Rebranding `/labs` to match new tokens (it currently uses bright orange — kept for v1, retuned in a follow-up)
- `/programs/mib-insight` rebranding (live commerce — do not destabilise this sprint)
- `/about`, `/contact` get palette token swaps only; full content rewrites are separate

## 8. Pillar pages — common template

Three pages, **same template, swapped content**. Long-scroll, ~3 viewport scrolls.

| § | Section | Component | What it does |
|---|---|---|---|
| 1 | Pillar hero | `PillarHero` | Eyebrow ("01 · Data" / "02 · Intelligence" / "03 · Transformation"), pillar name as H1, 1-line definition, 2-sentence positioning, breadcrumb back to `/reality` |
| 2 | The hidden reality | `Section` | What's broken in most enterprises in this pillar (3 bullets, terse) |
| 3 | What we do | `PillarServiceGrid` | 3-4 cards, each one offering / capability folded from legacy pages |
| 4 | Proof | `LabsTeaser` | One screenshot from `labs.atheryon.ai` matching this pillar + 1-paragraph caption + link `/labs` |
| 5 | Floor 13 nudge | `Section` | Single line: "Not sure where to start? Generate a Reality Blueprint." → links to `/reality#floor-13` |
| 6 | Closing CTA | `Section` | "Book a Reality Architecture Session" → `/contact` |

### 8.1 Per-pillar content map

| Pillar | Hero positioning | "What we do" cards (folded from) | Labs proof shown |
|---|---|---|---|
| **Data** | "The foundation: cloud architecture, governance, pipelines, modelling, platforms, unified visibility." | CDM Platform (from `/cdm-platform`); Reference Architectures (from `/reference-architectures`); Data Foundations; Data Modelling | ODS / Schema Editor screenshot |
| **Intelligence** | "Decision advantage: analytics, AI implementation, forecasting, automation, insight products." | AI Readiness (from `/ai-ready-data`); Analytics & ML; Insight Products; AI-Augmented Decisioning | Analytics Dashboard / ML Workbench screenshot |
| **Transformation** | "Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes." | Recovery & Migration (from `/recovery-migration`); M&A Execution (from `/m-and-a-execution`); Capability Enablement (from `/capability-enablement`); What We Deliver (from `/what-we-deliver`) | Trade Board / Operations screenshot |

### 8.2 Single accent across pillars

Pillars share a single sodium-amber accent (per Q3 follow-up). Pillar identity is conveyed by the "01/02/03" eyebrow numbering and content, not by per-pillar colour tints. Structural blue `#0D4D7A` appears on the `/data` pillar hero only (its lattice/diagram element), not as a hero background tint.

## 9. File structure

### 9.1 Files to create

```
src/app/reality/page.tsx
src/app/data/page.tsx
src/app/intelligence/page.tsx
src/app/transformation/page.tsx
src/components/RealityHero.tsx
src/components/PillarGrid.tsx
src/components/RealitySplit.tsx
src/components/FloorThirteen.tsx
src/components/PillarHero.tsx
src/components/PillarServiceGrid.tsx
src/components/LabsTeaser.tsx
public/reality/hero-sepia.svg
public/reality/hero-architecture.svg
public/reality/labs-screenshot-data.png
public/reality/labs-screenshot-intelligence.png
public/reality/labs-screenshot-transformation.png
tests/reality.spec.ts
tests/pillars.spec.ts
```

### 9.2 Files to modify

| Path | Change |
|---|---|
| `src/app/page.tsx` | Replace homepage content with the same component tree as `/reality/page.tsx` (or `/` re-exports `/reality/page.tsx`) |
| `src/content/site.ts` | Add `site.pages.reality`, `site.pages.data`, `site.pages.intelligence`, `site.pages.transformation`. Retire `site.pages.home`, `site.pages.cdmPlatform`, `site.pages.recoveryMigration`, `site.pages.mAndAExecution`, `site.pages.capabilityEnablement`, `site.pages.howWeWork`, `site.pages.whatWeDeliver`, `site.pages.aiReadyData`, `site.pages.referenceArchitectures` |
| `src/components/Header.tsx` | Replace `mainNav` with `[Reality, Data, Intelligence, Transformation, Labs, About]`. Remove header CTA. |
| `src/components/Footer.tsx` | Strip resource columns. Keep: `Atheryon` · `Contact` · `Privacy` · `LinkedIn` · year |
| `src/components/LabsEngagementCard.tsx` | Add optional `id` prop so `/labs#code` / `#prompts` / `#advisory` anchor correctly |
| `src/app/labs/page.tsx` | Pass `id="code"` / `"prompts"` / `"advisory"` to the three engagement cards |
| `tailwind.config.ts` | Rename `brand.orange` → `brand.amber` (`#D98B3E`); add `brand.blue` (`#0D4D7A`); rename `warm.200` → `bone` (`#EFEAE0`); add `ink` and `charcoal` tokens |
| `src/app/globals.css` | Update CSS custom properties for new palette tokens |
| `staticwebapp.config.json` | Add 8 redirect rules per §4.3 |
| `public/sitemap.xml` | Replace legacy URLs with `/`, `/reality`, `/data`, `/intelligence`, `/transformation`, `/labs`, `/about`, `/contact`, `/programs`, `/programs/mib-insight` |
| `tests/routing.spec.ts` | Drop the 8 retired routes, add `/reality`, `/data`, `/intelligence`, `/transformation` |
| `tests/homepage.spec.ts` | Rewrite expectations for the new homepage |
| `tests/buttons.spec.ts` | Update for new palette token names |
| `tests/accessibility.spec.ts` | Re-run on new pages, fix any contrast regressions |

### 9.3 Files to delete

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

### 9.4 `staticwebapp.config.json` redirect rules

```json
{ "route": "/cdm-platform",          "redirect": "/data",                "statusCode": 301 },
{ "route": "/recovery-migration",    "redirect": "/transformation",      "statusCode": 301 },
{ "route": "/m-and-a-execution",     "redirect": "/transformation",      "statusCode": 301 },
{ "route": "/capability-enablement", "redirect": "/transformation",      "statusCode": 301 },
{ "route": "/how-we-work",           "redirect": "/reality#methodology", "statusCode": 301 },
{ "route": "/what-we-deliver",       "redirect": "/transformation",      "statusCode": 301 },
{ "route": "/ai-ready-data",         "redirect": "/intelligence",        "statusCode": 301 },
{ "route": "/reference-architectures","redirect": "/data",               "statusCode": 301 }
```

## 10. Rollout sequence

Single sprint, ~6 working days. Single PR.

| Day | Work |
|---|---|
| 1 | Brand tokens (palette + Tailwind), site.ts copy authoring (all 4 new pages), `LabsEngagementCard` anchor IDs added to existing `/labs` |
| 2 | `RealityHero` + sepia→glitch animation; `PillarGrid`; `RealitySplit` |
| 3 | `FloorThirteen` component + state machine + 3 sell cards rendering inside; `tests/reality.spec.ts` passes |
| 4 | `PillarHero` + `PillarServiceGrid` + `LabsTeaser`; build all 3 pillar pages from shared template |
| 5 | Header + Footer rewrites; redirects in `staticwebapp.config.json`; sitemap update; delete 8 retired pages + `atheryon-logo-animation.mp4`; routing tests pass |
| 6 | Lighthouse + accessibility pass; manual smoke at 375/768/1280; PR review; merge to main → auto-deploys to prod via existing workflow |

## 11. Test plan

### 11.1 Playwright

- `tests/reality.spec.ts`:
  - Hero renders, both CTAs visible above the fold at 1280×720
  - Three pillar cards link to `/data` / `/intelligence` / `/transformation`
  - Floor 13: each dial click reveals the panel with the right pillar title
  - Re-clicking another dial swaps content (not appends)
  - Typed text appears in the rendered intro line
  - Matching sell card has the recommended-border treatment
  - Three sell cards link to `/labs#code` / `#prompts` / `#advisory`
- `tests/pillars.spec.ts`:
  - Each of `/data` / `/intelligence` / `/transformation` returns 200, has eyebrow + H1 + breadcrumb back to `/reality`
  - "What we do" grid renders 3-4 cards
  - Labs teaser renders with the right screenshot per pillar
- `tests/routing.spec.ts`:
  - The 8 legacy URLs each return 301 with the correct `Location` header
- `tests/homepage.spec.ts`:
  - `/` and `/reality` render identical content

### 11.2 Lighthouse

SEO and performance scores within 5 points of pre-sprint baseline. Common fixes: lazy-load pillar screenshots; preload sepia hero SVG.

### 11.3 Manual

- Read `/reality` out loud at 1280px — does the pitch → diagnostic → proof flow track?
- Visit at 375 / 768 / 1280 / 1920px — no horizontal overflow at any breakpoint
- Test Floor 13 with all 3 dials + custom text + re-clicking
- Verify `prefers-reduced-motion: reduce` disables the hero glitch animation
- Verify all 8 legacy URLs redirect correctly (curl or browser)

## 12. Done criteria

- All 8 redirects return 301 to the right pillar (verified by smoke script in CI or manual curl)
- `/`, `/reality`, `/data`, `/intelligence`, `/transformation`, `/labs` all return 200
- 8 deleted route directories no longer exist on disk
- `public/atheryon-logo-animation.mp4` deleted
- Floor 13 mechanic works in 3 viewports (375/768/1280) with all 3 dials → blueprint flow
- `/labs#code`, `/labs#prompts`, `/labs#advisory` scroll to the right card
- No reference to the `brand.orange` token anywhere in `src/`
- Lighthouse SEO ≥ existing baseline; performance within 5 points
- `prefers-reduced-motion: reduce` disables the hero glitch animation
- Playwright suite green
- PR merged to `main`, auto-deploy to `www.atheryon.com.au` succeeds, smoke-test passes on prod

## 13. Risks

| Risk | Mitigation |
|---|---|
| Sepia→glitch hero looks gimmicky / dated | Restrained timing (~800ms, idle 30s loop), pure CSS keeping weight low, easy to retune or disable post-launch. `prefers-reduced-motion` provides a graceful fallback today. |
| Pillar pages thin at launch (legacy depth lost) | Per-pillar content map (§8.1) explicitly folds the strongest existing copy from the legacy pages into "What we do" cards. Implementation plan reads each legacy page and migrates load-bearing content. |
| Brand inconsistency between `/labs` (still bright `#FF9900`) and the rest of the site (sodium amber) | Acknowledged; `/labs` retune is the first follow-up sprint. Document this clearly in the PR. Visitors arriving at `/labs` from Floor 13 will see the colour shift — minor cost vs. the time saved. |
| 4-colour palette drifts toward fragmented brand | Structural blue is reserved for the `/data` pillar lattice / hero diagram only. It is not used as a generic accent. Any drift from this rule gets fixed in design review. |
| Floor 13 ships without lead capture — no measurable conversion | Phone-2 spec already in §7.7 OOS list. Track engagement via Floor 13 click events in v2 once a lightweight analytics path is decided. |
| Hard-cut migration breaks inbound links from external sources (LinkedIn posts, decks) referencing `/cdm-platform` etc. | 301 redirects preserve link equity; 8 legacy URLs all redirect to a sensible pillar. Run a `curl` smoke script in CI to enforce. |
| `/programs/mib-insight` storefront destabilised by token rename | Excluded from this sprint's scope explicitly (§7.7). Token swaps in `tailwind.config.ts` use rename-then-replace pattern; commerce flow tested manually before merge. |
| Visitors who land on `/` and don't scroll past §1 never see Floor 13 | Conscious tradeoff — Floor 13 is on `/reality` only, not in the header (Q-follow-up). Hero CTAs anchor-link to §4 to mitigate. Track scroll depth in v2. |

## 14. Open questions (need Terry input during implementation)

1. **Floor 13 "Reality Blueprint" final copy per pillar.** Prototype copy seeds it; needs Terry's sharpening pass during Day 3.
2. **Pillar-page "What we do" card titles + bodies.** Drafts come from migrating legacy-page content; Terry confirms during Day 4.
3. **Labs screenshot picks for each pillar's proof band.** Default: ODS / Analytics Dashboard / Trade Board. Terry confirms during Day 4.
4. **Sepia hero composition.** Concept: a generic 1990s/2000s business interior. Terry to source/approve a base image (or stock reference) Day 2.
5. **Methodology section copy on `/reality` §5.** Drafts from `/how-we-work` content; Terry confirms.
6. **Footer rewording on social/links.** Confirm LinkedIn URL stays as today.

These are all in-flight tasks for the implementation plan; none block authoring.

## 15. Next step

Per the brainstorming workflow, this spec is the input to `/superpowers:writing-plans`, which will produce a step-by-step implementation plan covering: brand-token migration, copy authoring in `site.ts`, component scaffolds, hero-animation asset creation, Floor 13 mechanic, redirect wiring, page deletions, and the test plan in §11.

Implementation will happen in `atheryon-ai/atheryon-website`, on a new feature branch `feat/reality-13th-floor`, deployed first to the test environment (`icy-tree-093dcc800.6.azurestaticapps.net`) for review before merging to main.
