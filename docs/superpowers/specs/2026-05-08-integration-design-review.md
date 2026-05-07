# /integration design review (with Option C IA consolidation)

**Date:** 2026-05-08
**Branch:** `feat/sp-integration-pitch`
**Scope:** /integration page on http://localhost:3000
**Companion doc:** `2026-05-08-integration-ia-review.md` (Option C plan)

---

## First impression

The page communicates **competence and density, but no priority**. My eye goes to: 1) the orange hero badge, 2) the headline, 3) the next "WHY ENTERPRISE DATA PROGRAMS STALL" badge. The first three things I notice are *three identical badges* — the page is set up like a stack of equally-weighted sections, not a pitch with a punchline.

If I had to describe it in one word: **flat**.

For an S&P-anchored leverage pitch, the section that says *"TeraHelix is the lever"* should hit hardest. It doesn't. It looks identical to "Why enterprise data programs stall."

---

## Inferred design system

| Token | Value | Notes |
|---|---|---|
| Display font | Inter (system-ui fallback) | Used site-wide. On the AI-slop watch list. Not /integration-specific. |
| Body font | Inter | Same |
| Brand accent | `#FF9900` (orange) | Coherent, used for badges + CTAs |
| Slate body | `rgb(15,23,42)` | Standard |
| Warm surface | `rgb(247,246,243)` | Used for disclosure card |
| H1 size | **48px** | |
| H2 size | **48px** | **Same as H1 — visual hierarchy collapse** |
| H3 size | 20px / 18px | |
| Color count | ~12 distinct | Acceptable |
| Load time | 453ms total | Excellent |

---

## Findings

### HIGH severity

**F-1. H1 and H2 collide at 48px.** The hero headline carries the same visual weight as every section header. There's no "this is the page" vs "this is a section" distinction. The first-impression effect is a stack of equal-weight sections rather than a pitch with a top-line claim.
- Site-wide issue, not /integration-only — flag so we know what we're shipping.
- Fix: bump H1 to `text-5xl md:text-6xl lg:text-display-xl` (matches `Hero.tsx`'s pattern), keep H2 at `text-4xl/5xl`. Or accept it as a global decision and move on.

**F-2. Repeating 3-column feature grid is the dominant page pattern.** Counting body sections: Problem (3 cards), Specialism principles (3 cards), TeraHelix capabilities (3 cards), Engagement modes (3 cards). **4 of 6 content sections are the same layout** — badge → big H2 → 3 white cards with gray icon-less heading + body. This is the #1 pattern on the AI-slop blacklist.
- **Option C fixes 50% of this** by cutting Specialism principles + Outcomes-as-grid duplicates. Net after Option C: 2 of 4 content sections are 3-card grids (Problem one-line + TeraHelix expanded + Engagement). Better, but TeraHelix and Engagement still mirror each other.
- Additional fix: differentiate TeraHelix visually (see F-3).

**F-3. The leverage block (TeraHelix) has no visual privilege.** This is the unique value of the page — it's why a reader stays. Currently same badge, same H2 size, same 3-card grid as the generic problem block. No diagram, no logo, no example, no callout.
- Option C says "expand" but doesn't prescribe layout. Recommendation: replace the 3-card grid with a diagram or a numbered worked example. Even a simple flow ("S&P data product → TeraHelix model → your decision surface") gives the reader a mental picture.
- Fallback if no diagram: full-width dark band (`bg-neutral-900 text-white`, available on `Section dark`) so the section reads as the page's anchor.

**F-4. No CTAs above the fold.** The hero is a SimpleHero — headline + subheadline + badge — with no buttons. The reader scrolls 5 sections before reaching "Request a confidential discussion / Download the pitch pack". A gated visitor arrived from a direct share; they may want the deck immediately.
- Fix: add primary + secondary CTA to the hero ("Download the pitch pack" / "Request a discussion"). The labs branch already has a `LabsHero` with three CTAs — same pattern would work here.

### MEDIUM severity

**F-5. Engagement card duration badges collide on mobile.** "30 days" pill wraps into the title space at 375px. Visible in `integration-mobile.png`.
- Fix: reduce title size on mobile, or stack the duration above the title rather than top-right.

**F-6. No visual proof.** No diagrams, no screenshots, no logos, no architecture sketch. For a pitch about *integrating data*, this is a notable gap. The labs branch screenshots prove the platform works; /integration has nothing visual.
- Fix candidates: a small "Atheryon ↔ TeraHelix ↔ S&P data products ↔ your estate" architecture diagram in the TeraHelix section. Or one annotated sketch of a sample data flow.
- Lower-effort: real S&P/TeraHelix logos (with disclosure already in place) in a "References" strip — visual variety + signals legitimacy.

**F-7. Footer leaks public-site links onto a gated page.** The reader who got an invite to /integration sees the standard footer with links to Services / Reference Architectures / etc. They aren't supposed to navigate away — they're supposed to engage.
- Fix: a stripped footer for the /integration route (just contact + legal + disclosure). Or accept the leak — minor.

### POLISH

**F-8. All section badges are identical.** Orange dot + grey pill text. Seven occurrences. Visual monotony.
- Fix: vary one or two by using the dark variant on `Section dark` for the TeraHelix anchor (ties into F-3).

**F-9. Hero headline wrap is awkward.** "S&P data is only as valuable as your ability to operationalise it" — currently 4 lines on desktop, breaks mid-clause. `text-wrap: balance` on H1 would help.

**F-10. Disclosure block reads as polite throat-clearing.** Currently a soft warm-cream card; appropriate but visually weak. Could be 1px slate hairline + 14px text — looks more "legal note", less "afterthought".

---

## Scoring

| Category | Grade | After Option C + F-1/F-3/F-4 fixes |
|---|---|---|
| Visual Hierarchy | C | B+ |
| Typography | B- | B+ |
| Color & Contrast | B+ | B+ |
| Spacing & Layout | B | B+ |
| Interaction States | B | B |
| Responsive | C+ | B |
| Content (overlap with rest of site) | C | A- |
| **AI Slop** | **D** | **B-** |
| Performance | A | A |

**Design Score (current): C+**
**Design Score (with Option C + design fixes): B+**

**AI Slop Score (current): D — repeated 3-column feature grid + Inter as primary + uniform badges**
**AI Slop Score (with fixes): B- — TeraHelix becomes the visual anchor, fewer 3-card grids, dark-variant breaks the rhythm**

---

## Recommended fix sequence (Option C + design)

In dependency order, smallest blast radius first:

1. **F-4 — Hero CTAs.** Add primary + secondary CTA to the integration hero. ~10 min. Pure additive.
2. **Option C IA cuts.** Remove Specialism principles grid + condense Outcomes block + rename engagement modes to "S&P-prefixed". Edits in `site.ts` + `page.tsx`. ~20 min.
3. **F-3 — TeraHelix visual privilege.** Replace 3-card grid with either (a) a numbered 4-step flow, or (b) wrap the section in `Section dark` for a black band. ~20 min. Recommendation: try (b) first; cheap, high impact.
4. **F-9 — text-wrap balance** on hero H1. Two-line change. 1 min.
5. **F-5 — mobile engagement card.** Title responsive sizing. 5 min.
6. **F-1 — H1/H2 hierarchy.** Defer — site-wide change, separate PR.
7. **F-6 — visual proof.** Defer — needs a real diagram, that's a design exercise not a code change.
8. **F-7 — gated footer.** Defer — minor.

Total in-scope: ~60 min of edits + a PDF regen.

---

## Status: report only

No fixes applied. Working tree has only the IA review doc + this design review doc committed. The /integration code is unchanged from the original ship.

If you say "apply Option C" or "apply the high-severity fixes" I'll execute steps 1–4 above on this branch in one go and regenerate the PDF.
