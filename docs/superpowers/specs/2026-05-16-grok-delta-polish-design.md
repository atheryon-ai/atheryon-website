# Grok delta polish (cherry-picked) — Design

**Topic:** Apply the non-conflicting items from `grok_report-4.pdf` to atheryon-website.
**Date:** 2026-05-16
**Author:** Abi (via Claude Code brainstorming session)

## Context

The user shared a Grok-generated "delta polish" document (`grok_report-4.pdf`) listing 6 proposed changes to atheryon-website. Several conflict with decisions locked earlier in this session — specifically the 3-offer matrix IA, the brand-blue accent palette, and the no-unverified-claims rule for the footer. The user picked **path A — cherry-pick** the items that don't conflict.

The accepted set is six items: two SVG diagram conversions, a `/workflows` polish pass, a `/contact` field-order tweak, a footer email surface, and a CTA + hover sweep. The biggest visual change is the `/system` §01 and `/workflows` §00 architecture diagrams moving from styled Tailwind boxes to inline SVG flows with electric-blue arrows.

**Why this is worth doing:** the box-layout diagrams currently look like wireframes. Tier-1 buyers expect proper architecture diagrams. The polish items close the small inconsistencies that accumulated over the recent IA work.

## Scope

### In scope (6 items)

1. **SVG diagram — `/system` §01 Architecture diagram.** Replace 5-stage Tailwind box layout with inline SVG. Arrows between stages. §03 (AI Agent Orchestration) highlighted as the value-add layer. Vertical stack on mobile (< 768px).

2. **SVG diagram — `/workflows` §00 Pipeline schema.** Same SVG treatment for the 4-stage pipeline (Input → AI agents → Processing → Output).

3. **`/workflows` polish (per-workflow rows kept).** Keep current section-per-workflow layout (5 sections, each with a 4-cell Input/AI agents/Processing/Output row inside). Add subtle electric-blue dividers between cells. Add a small monogram icon next to each stage label inside each cell.

4. **`/contact` form tweak.** Reorder fields to Name → Company → Email → Message (Grok's order; matches form-flow convention). Add `info@atheryon.com.au` direct-email link below the submit button. Keep Formspree backend, keep current button label "Book system assessment".

5. **Footer email surface.** Add `info@atheryon.com.au` mailto entry alongside the existing quick links + LinkedIn entry.

6. **CTA + hover sweep.** Audit Home, About, Labs for an end-of-document "Book system assessment →" CTA; add where missing. Sweep card + button hover states across the site for consistent electric-blue treatment using existing `--homev3-blue` / `--homev3-blue-bright` tokens.

### Out of scope (rejected from Grok delta, recorded for audit)

| Rejected | Reason |
|---|---|
| Nav swap (drop OFFERS, restore Labs + Home + Contact in primary nav) | Contradicts the locked 3-offer matrix decision (Phase 2 shipped) |
| Cyan `#00D4FF` accent across the site | Current `--homev3-blue` (`#3b82f6`) is the locked brand accent; cyan reads tech-bro |
| Microsoft Partner + S&P Global footer badges | Unverified claims; falls under the `feedback_marketing_no_tech_disclosure` rule |
| Home hero conversion to linear-flow SVG | Existing `OrchestrationDiagram` component (orchestration-wheel pattern) is more distinctive than a linear flow |
| `/workflows` 2-column-of-workflows restructure | Cramming 5 workflows into 2 columns hurts readability; current per-row layout reads better with substantive content |

## Per-item design

### 1. `/system` §01 — Architecture diagram SVG

**Files:** `src/app/system/page.tsx` (replace the `<ol>` of stage cards with an inline `<svg>` block).

**Visual spec:**
- ViewBox: `0 0 920 200` for the desktop SVG; CSS sets `max-width: 100%; height: auto` so it scales.
- 5 boxes, equal width (~160 × 80 px in viewBox units), 25px gaps, vertically centered around y=100.
- §03 (AI Agent Orchestration) gets a stronger fill (`rgba(96,165,250,0.18)`) and stronger border (`#60a5fa`, stroke-width 1.6) to indicate it's the value-add layer.
- Other 4 boxes use a subtle vertical gradient fill (`rgba(96,165,250,0.10)` → `rgba(96,165,250,0.02)`) with `#3b82f6` border at stroke-width 1.4.
- Arrows: simple lines from box-right to next box-left, with an SVG `<marker>` triangle head, stroked `#60a5fa` width 1.4. One arrow between each pair (4 arrows total).
- Each box has 3 text elements: `§ NN` label (mono, blue, letter-spaced), title (white, semibold 13px), 1-line detail subtitle (rgba white 0.55, 10px). Pull title + detail strings from existing `v2.pages.system.sections.architectureDiagram.stages[i].name` + `.detail` — content unchanged, only the rendering.

**Mobile behavior:**
At viewport < 768px the SVG would be too narrow to fit 5 horizontal boxes legibly. Switch to a stacked vertical layout — one box per row, arrows become downward `↓` glyphs between boxes. Either render two SVGs and toggle with CSS media query, or render a CSS-styled fallback for mobile that mirrors the current vertical Tailwind boxes (simpler — no SVG on small screens).

Pick the second option. Mobile keeps the current vertical box layout (no regression); SVG appears at `md:` and up.

**Accessibility:**
- The `<svg>` element gets `role="img"` and an `<title>` child describing the diagram.
- Each stage's text content remains in DOM and screen-reader-accessible.
- The CSS-fallback mobile version uses semantic HTML (`<ol>` with `<li>` per stage) for non-SVG agents.

### 2. `/workflows` §00 — Pipeline schema SVG

**Files:** `src/app/workflows/page.tsx` (the §00 section currently renders a `grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]` row of Input | ↓ | AI agents | ↓ | Processing | ↓ | Output).

**Visual spec:**
- ViewBox: `0 0 760 140`. Same arrow + gradient conventions as §01.
- 4 boxes (~160 × 80 px), no special highlighting (all 4 stages are equally important here).
- 3 arrows between the 4 stages.

**Mobile behavior:** same as `/system` §01 — keep the current vertical box layout at < 768px, render SVG at `md:` and up.

### 3. `/workflows` polish — dividers + icons

**Files:** `src/app/workflows/page.tsx`, `src/app/globals.css` (optional new utility class).

**Spec:**
- Inside each `<StageCell>` (the Input / AI agents / Processing / Output cells inside each workflow row), add an inline monogram icon left of the stage label. Use simple inline `<svg>` glyphs:
  - Input: arrow-into-circle
  - AI agents: lattice / node-graph
  - Processing: gear or recursive arrows
  - Output: arrow-out-of-circle
- Icon size 14×14 px, stroke `#60a5fa`, 1.5 stroke-width, no fill.
- Each cell gets a 1px-bottom electric-blue gradient divider visible at sm+ where the cell is in the middle of a row (i.e., not the last column). Use `border-right: 1px solid rgba(96,165,250,0.18)` on `nth-child(1..3)` of the OL inside each workflow.
- **Keep the existing per-workflow section layout.** This polish does NOT restructure the OL.

### 4. `/contact` form tweak

**Files:** `src/content/site.ts` (the `site.pages.contact.form.fields` object), `src/app/contact/page.tsx` (if field order is hard-coded there) or the form component used by `/contact`.

**Spec:**
- Reorder the fields shown in the form: Name → Company → Email → Message. The current order is Name → Email → Company → Message; only Company and Email swap positions.
- Add an `<a href="mailto:info@atheryon.com.au">` link below the submit button: `Or email us directly at info@atheryon.com.au`. Style as `font-mono text-xs text-charcoal/70 underline-offset-4`.
- Keep all other behaviour: Formspree backend, "Book system assessment" button label, current placeholder text, current required-field logic.

### 5. Footer email surface

**Files:** `src/components/Footer.tsx`.

**Spec:**
- The current footer renders pillars + resources + company + legal links plus a LinkedIn entry. Add an `info@atheryon.com.au` mailto link, styled identically to the LinkedIn link, in the same `<nav>` row.
- Insert position: after LinkedIn, before the copyright line.
- Do NOT add Microsoft Partner / S&P Global badges — per rejection list.

### 6. CTA + hover sweep

**Files:** Various page components (Home `RealitySystemCTA`, `/labs`, `/about`); `src/app/globals.css` for hover token consistency.

**Spec:**

CTA audit:
- `/` (home): already renders `RealitySystemCTA` at the bottom — verify it links to `/contact` with "Book System Assessment →" label.
- `/system`: already has the end-of-document CTA. ✓ no change.
- `/workflows`: already has the end-of-document CTA via `v2.cta.label`. ✓ no change.
- `/labs`: confirm via reading; add CTA at bottom if missing.
- `/about`: confirm via reading; add CTA at bottom if missing.

Hover sweep:
- Audit existing card + button hover effects (`/labs/themes` ThemeBlock cards, `/offers/*` end-of-doc CTA, HomeStrip Offer cards, footer nav items).
- Where hover state is missing, add a transition for `background-color` and `border-color` toward `--homev3-blue` / `--homev3-blue-bright`.
- Use existing tokens; do not introduce new colour variables.

## Implementation order + commit shape

**Commit 1: `feat(diagrams): replace /system §01 and /workflows §00 box layouts with inline SVG flow`**
- Items 1 + 2 (both SVG diagrams).
- One commit because both edits use the same SVG conventions; testing both at once.
- Includes the CSS-fallback mobile branch for both pages.

**Commit 2: `feat(polish): /contact field order + footer email + bottom-CTA sweep + hover consistency`**
- Items 3 + 4 + 5 + 6 (all the small polish).
- One commit because each piece is small and they share no architectural risk.

## Verification

After both commits land + push to test SWA:

```bash
# Typecheck + build
npx tsc --noEmit
npx next build  # expect 17/17 static pages

TEST=https://polite-flower-03ba3020f.7.azurestaticapps.net

# /system §01 SVG should render at desktop
B="$HOME/.claude/skills/gstack/browse/dist/browse"
"$B" viewport 1280x800
"$B" goto "$TEST/system?v=$(date +%s)"
"$B" js "JSON.stringify({hasSvg: document.querySelectorAll('svg[role=img]').length, scrollWidth: document.documentElement.scrollWidth})"
# expect hasSvg >= 1, scrollWidth <= 1280

# Mobile fallback works (no SVG, vertical stack)
"$B" viewport 375x812
"$B" goto "$TEST/system?v=$(date +%s)"
"$B" js "JSON.stringify({scrollWidth: document.documentElement.scrollWidth})"
# expect {"scrollWidth":375}

# /workflows §00 SVG
"$B" viewport 1280x800
"$B" goto "$TEST/workflows?v=$(date +%s)"
"$B" js "JSON.stringify({hasSvg: document.querySelectorAll('svg[role=img]').length})"
# expect hasSvg >= 1

# /contact form field order + mailto
curl -s "$TEST/contact?v=$(date +%s)" | grep -oE "Full Name|Name|Company|Email|Message|mailto:info@atheryon.com.au"
# expect Name, Company, Email, Message in that DOM order, mailto present

# Footer email present
curl -s "$TEST/?v=$(date +%s)" | grep -c "mailto:info@atheryon.com.au"
# expect >= 1 (footer)

# Existing Playwright suite unaffected
npx playwright test --project=chromium 2>&1 | tail -5
# expect all passing
```

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| SVG diagram breaks at mobile viewport | Mobile renders the current vertical Tailwind box fallback (no SVG below 768px) — no regression possible |
| Field-order change in `/contact` confuses returning users | Order change is minor (Company/Email swap); placeholder text unchanged; no functional change |
| Hover sweep introduces inconsistent timings | Reuse a single CSS variable for transition duration (`160ms ease`) used elsewhere |
| Footer email link looks crowded next to LinkedIn | Match the existing LinkedIn link's styling exactly — same px-3 py-3 hover treatment |
| Existing Playwright tests reference old DOM structure of `/system` §01 | If a test asserts on the `<ol>` element specifically, update the assertion to look for the new SVG instead — bundle that update with commit 1 |

## Open questions

None. The scope is locked, the rejected items are documented, the visual style is grounded in existing brand tokens, and the implementation order is clear.

## Next step

Implementation plan via `superpowers:writing-plans` after user reviews this spec.
