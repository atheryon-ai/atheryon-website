# Atheryon — Design System

Single source of truth for the visual system. Anything in this file overrides
inline styles, ad-hoc Tailwind classes, and legacy tokens in
`tailwind.config.ts` or `src/app/globals.css`.

The driving principle is from the project constitution: **Atheryon is a capital
markets AI systems firm, not a marketing brand. The site must read as system
architecture to both enterprise buyers and AI agents.**

Architectural document, not brochure. Reference: `src/app/system/page.tsx` is
the canonical implementation of this system.

## Aesthetic posture

**DEPRECATED — 2026-05-16.** The bone/charcoal "architectural document"
system documented in this section is no longer in use. The site now runs a
single dark navy AI platform system site-wide (see "Dark navy site system"
section at the bottom of this file). The tokens, type scale, and patterns
below are retained as a record of the previous aesthetic; do NOT use them
for new work.

- Architectural document, terminal/dossier energy, low decorative load.
- Information density beats whitespace theater.
- The page should look like it could be printed and filed.
- Closer peer references (interior pages): Bloomberg terminal docs, S&P
  Capital IQ surfaces, sell-side research portals, McKinsey/BCG plainness,
  Palantir enterprise/government posture.
- Wrong peer set anywhere: Apple-keynote AI particles, OpenAI/Anthropic
  launch aesthetics, generic SaaS hero. (Databricks/Snowflake polish is
  permitted on the homepage only — see "Dark navy homepage system".)

## Color tokens

| Token             | Value                       | Use                                              |
| ----------------- | --------------------------- | ------------------------------------------------ |
| `bone`            | `#EFEAE0`                   | Page background. Body color.                     |
| `bone-deep`       | `#E8E2D5`                   | Hover state for cards/pills.                     |
| `paper`           | `#F6F2E9`                   | Slightly lighter inset surface (diagrams).       |
| `charcoal`        | `#15171A`                   | Body text. Primary borders. Dark inverse band.   |
| `ink`             | `#0E1116`                   | Deepest dark for inverse band hover only.        |
| `hair`            | `rgba(21,23,26,0.15)`       | All hairline borders (section dividers, cards).  |
| `hair-strong`     | `rgba(21,23,26,0.30)`       | Stronger hairline (component edges, framing).    |
| `muted`           | `rgba(21,23,26,0.60)`       | Section labels, captions, mono small text.       |
| `muted-soft`      | `rgba(21,23,26,0.45)`       | Pending/placeholder mono text.                   |
| `soft`            | `rgba(21,23,26,0.80)`       | Body text on bone (slightly softer than full).   |

The only colors used on the site. No brand-orange. No brand-blue accents. No
gradients. No drop shadows. No glow.

## Typography

| Family            | Stack                                                              | Use                                                |
| ----------------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| Display (serif)   | `Fraunces`, Georgia, Cambria, serif                                | All headings (h1-h6), firm names, pill titles.     |
| Body (sans)       | `Inter Tight`, Inter, system-ui, sans-serif                        | Body copy, lede paragraphs, descriptions.          |
| Mono              | `JetBrains Mono`, ui-monospace, SFMono-Regular, monospace          | Section labels, captions, code-style metadata.     |

### Type scale

| Role              | Size                        | Family   | Weight  | Tracking      |
| ----------------- | --------------------------- | -------- | ------- | ------------- |
| Hero h1           | `clamp(40px, 5.6vw, 76px)`  | Fraunces | 500     | `-0.015em`    |
| Section h2        | `clamp(28px, 3vw, 40px)`    | Fraunces | 500     | `-0.015em`    |
| Card h3           | `24px`                      | Fraunces | 600     | `-0.015em`    |
| Sub-h4 (label)    | `11px`                      | Mono     | 500     | `0.20em` upper |
| Body lede         | `clamp(16px, 1.4vw, 19px)`  | Inter T. | 400     | `-0.005em`    |
| Body              | `15-16px`                   | Inter T. | 400     | `0.005em`     |
| Section label     | `12px`                      | Mono     | 500     | `0.18em` upper |
| Caption / meta    | `10-11px`                   | Mono     | 500     | `0.18-0.20em` upper |

Line height: `1.55-1.7` for body; `1.04-1.2` for display.

### Mono section label pattern

All section labels follow the pattern:

```
atheryon / <surface> / <slug>
```

Examples: `atheryon / home / identity`, `atheryon / system / orchestration`,
`atheryon / foundation`, `atheryon / system / end-of-document`.

This is human trust signal AND machine-readable breadcrumb at once.

### Editorial italics

Use Fraunces italic sparingly to mark a single emphasized noun phrase in a
headline (e.g. "...using *AI agents*."). Never to color or accent — italic is
the accent. Do not combine italic with a color change.

## Layout

- Max content width: `1280px` container, `24px` horizontal padding.
- Section divider: `1px solid var(--hair)`. Stack sections with shared border,
  no extra margin.
- Vertical rhythm: surface sections use `96px` top/bottom padding desktop, `64px`
  mobile. Hero uses `80px / 96px`.
- Grids and lists use hairline rules over background color to define cells; no
  background tints, no shadows.

## Borders

- Default: `1px solid var(--hair)` (subtle divider).
- Component edge: `1px solid var(--hair-strong)` (cards, pills, framed
  diagrams).
- Active/emphasis edge: `1px solid var(--charcoal)` (primary button, focused
  orchestrator center, focused state).
- All borders are 1px. No 2px. No rounded corners. **Border radius is 0** unless
  there is a deliberate reason — and currently there isn't.

## Buttons & links

- Primary CTA: `background: charcoal; color: bone; border: 1px solid charcoal;
  padding: 14px 22px;` Mono 11px uppercase 0.20em tracking. No radius.
- Secondary CTA: `background: transparent; color: charcoal; border: 1px solid
  charcoal;` Same metrics. Hover inverts to charcoal/bone.
- Inline link: underline-from-bottom via `border-bottom: 1px solid hair-strong`,
  not `text-decoration: underline`. Mono uppercase.
- Arrow CTAs: terminal-style `→` glyph at end, translates 2-3px on hover.

## Components

### Card (hairline, no shadow)

```
border: 1px solid var(--hair-strong);
background: var(--bone);
padding: 28-36px;
/* No box-shadow. No border-radius. */
/* Hover: background: var(--bone-deep); */
```

### Pill (input/output node in diagrams)

```
display: grid; grid-template-columns: 28px 1fr; gap: 12px;
border: 1px solid var(--hair-strong);
padding: 14px 16px;
/* Title: Fraunces 14px 600. Subtitle: Mono 10px 0.10em upper. */
```

### Diagram frame

Use a `--paper` background inset (slightly lighter than bone) with a `hair-strong`
border. Float the mono section label across the top edge as a "specimen card"
title — `position: absolute; top: -10px; left: 16px; background: var(--bone);
padding: 0 8px;`.

### Inverse band (dark section)

Used sparingly — currently only the bottom reference band on the homepage.
`background: var(--charcoal); color: var(--bone);` Same hairline discipline,
border colors at `rgba(239, 234, 224, 0.4)`. Never use for hero, never as a
primary surface. One inverse band per page maximum.

## Motion

- Transitions: `120-160ms ease` for color, border-color, background-color,
  transform.
- Arrow translate: `transform: translateX(2-3px)` on hover.
- No: keyframe animations, parallax, scroll-jacking, motion blobs, lottie,
  glow pulses, particle effects.
- Respect `prefers-reduced-motion` — disable all transitions ≤ 0.01ms.

## Forbidden patterns

Direct mappings to the constitution memory. Anything matching this list is a
bug.

| Forbidden                             | Why                                                    |
| ------------------------------------- | ------------------------------------------------------ |
| Gradients (any direction)             | Marketing visual; reads as SaaS hero.                  |
| Drop shadows on cards/buttons         | Reads as SaaS card.                                    |
| Glass cards / backdrop blur           | AI-startup aesthetic, not institutional.               |
| Border radius > 0px                   | Reads as consumer product, not document.               |
| Orange `#FF9900` `#D98B3E` accents    | Legacy `bg-warm` palette. Replaced by bone discipline. |
| Bright blue `#0A84FF` `#007AFF`       | Reads as Apple/SaaS. Off-brand.                        |
| Glow / particles / luminous trails    | "AI demo-day" energy. Not capital markets.             |
| Lorem ipsum / "Your text here"        | Constitution rule: never invented prose.               |
| "Senior-led delivery" eyebrow         | Constitution forbids; consulting fluff.                |
| Generic 3-col feature grids with icons| AI-slop blacklist.                                     |
| Stock photos                          | No photography on the site at all.                     |
| Decorative blobs / waves              | No.                                                    |
| Marketing hype, startup language      | Constitution rule.                                     |
| Emoji as visual element               | No.                                                    |

## Voice rules (applies to all copy)

- Architectural, institutional, precise. Not warm, not playful, not energetic.
- Preferred vocabulary: systems, architecture, deployment, front-to-back, data
  platforms, AI agents.
- Avoid: senior-led delivery, decision-grade, non-negotiable, carried the risk,
  delve, crucial, robust, comprehensive, nuanced, foster, showcase, pivotal,
  landscape, tapestry, vibrant, intricate, multifaceted.
- All copy lives in `src/content/site.ts` under `site.pages.<pageName>` (except
  legal: `/privacy` and `/terms` may inline in TSX).

## Forbidden in `tailwind.config.ts` and `globals.css` (cleanup list)

Codex flagged these legacy artifacts. Remove on a dedicated cleanup pass:

- `tailwind.config.ts`
  - `colors.brand.orange`, `orange-light`, `blue`, `blue-light`, `amber*`,
    `deepblue`, `dark` (legacy palette — keep only `bone`, `ink`, `charcoal`)
  - `colors.atheryon.blue` and `blue-light`
  - `colors.warm.*` (replaced by bone palette)
  - `borderRadius.2xl 3xl 4xl` (radius is 0)
- `globals.css`
  - `.text-gradient*`, `.bg-warm*` utility classes
  - `@keyframes hero-glitch`, `@keyframes architecture-reveal` (Reality-page
    legacy; remove with the route)
  - "Social Grow" comments and any related typography scale
  - Body `background: linear-gradient(...)` (replace with solid `var(--bone)`)

## References

- Constitution memory: `atheryon-website-constitution` (hard rules, not aesthetic
  preferences)
- Canonical implementation: `src/app/system/page.tsx`
- Tokens currently encoded (partially) at: `src/app/globals.css:7-15`,
  `tailwind.config.ts:69-71` (the new bone/ink/charcoal tokens — keep these,
  delete the rest)

## How to use this file

Before any visual change:
1. Pull tokens from this file, not from `tailwind.config.ts` (which still has
   legacy crud).
2. If the change can't be expressed in these tokens, stop and ask — the
   constitution may need to change before the code does.
3. After change, verify against "Forbidden patterns." If any match, it's a
   bug.

---

## Dark navy site system (added 2026-05-15, universalized 2026-05-16)

The single visual system used across every page of atheryon-website (`/`,
`/system`, `/approach`, `/engagements`, `/workflows`, `/about`, `/contact`,
`/labs/*`, `/programs/*`, `/privacy`, `/terms`). The legacy bone/charcoal
"architectural document" system in the earlier sections of this file is
deprecated.

### Aesthetic posture (universal)

- Capital markets AI platform aesthetic. Peer set: Databricks, Snowflake,
  Palantir Gotham.
- Decorative load is deliberate: one glowing AI Agent Orchestration ring,
  one accent gradient in the page background, soft wires connecting nodes.
- The hero is the orchestration diagram, not body copy.
- Branded — the Atheryon lockup (mark + Cinzel-serif wordmark + tri-color
  tagline) is shown in the nav and again at the orchestration center.

### Color tokens (universal)

| Token             | Value                  | Use                                                 |
| ----------------- | ---------------------- | --------------------------------------------------- |
| `homev3-bg`       | `#060b1c`              | Page background (deep navy, almost black).          |
| `homev3-bg-soft`  | `#0a1228`              | Section-level slight elevation.                     |
| `homev3-surface`  | `#0e1830`              | Cards and nodes.                                    |
| `homev3-surface-2`| `#122042`              | Icon backgrounds inside cards.                      |
| `homev3-border`   | `rgba(96,165,250,.18)` | All hairline borders (cards, nodes, dividers).      |
| `homev3-border-strong` | `rgba(96,165,250,.35)` | CTA card border.                              |
| `homev3-blue`     | `#3b82f6`              | Primary accent (links, CTA, ring).                  |
| `homev3-blue-bright` | `#60a5fa`           | Hover, secondary highlights.                        |
| `homev3-blue-deep`| `#1d4ed8`              | CTA hover.                                          |
| `homev3-orange`   | `#f59e0b`              | Logo accent only (not for UI surfaces).             |
| `homev3-orange-bright` | `#fbbf24`         | Logo highlight, tagline `DATA.` word.               |

### Typography (homepage)

| Family          | Stack                                                  | Use                                  |
| --------------- | ------------------------------------------------------ | ------------------------------------ |
| Lockup serif    | `Cinzel`, Trajan Pro, Georgia, serif                   | `ATHERYON` wordmark only.            |
| Body sans       | `Inter`, system-ui, sans-serif                         | Everything else on the homepage.     |

No Fraunces, no JetBrains Mono on the homepage. Those families stay
homepage-internal; the legacy bone pages continue to use them.

### Decorative rules (universal)

- Exactly one glow source on the page — the AI Agent Orchestration ring.
- Background gradients allowed only as page-wide ambient (top-center bloom).
- Drop shadows: prohibited on cards, nodes, and CTAs. Only the glow ring
  uses `box-shadow` (for radiance, not depth).
