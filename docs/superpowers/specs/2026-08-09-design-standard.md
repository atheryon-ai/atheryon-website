# Atheryon Design Standard v2

Derived from the approved homepage format (rev 6 poster-as-homepage) and the poster reference
asset `docs/superpowers/specs/atheryon-poster-2026-08-09.svg`. This document is the styling
contract for every new page. Typefaces are role-based until §8 TODO 7 of the IA brief is
answered.

## 0. Revision note

**v1 (2026-08-09)** described a two-register system: a navy statement band on homepage
viewport 1, and a bone (cream) document register everywhere else. That is no longer what the
site renders. `src/app/globals.css` was subsequently given a global override block that remaps
the bone and charcoal Tailwind utilities to dark navy equivalents, so every page now renders on
the dark ground. Terry confirmed on 2026-08-12 that the dark system is the intent and the
colours stay as they are, which made the specification the thing that had to change rather than
the code.

**v2 (2026-08-12)** rewrites §1, §2, §5 and §7 to describe the system that exists, records the
palette actually in force, and adds §9 documenting the override block. Nothing in the rendered
output changed with this revision. The v1 text is preserved in git history; the substantive
decisions it recorded (bronze as a structural accent, one CTA per viewport, § numbers in
display order, function 1 before function 2, no imagery beyond `BrandMark`) all survive intact.

## 1. The format: one ground, statement moments

The site renders on a single dark navy ground. There is no second surface register.

**The ground** is `--homev3-bg` (#0E2A3A), set on `body` and reasserted by the override block
on every `bg-bone` container. Document chrome sits directly on it: § numbered sections, mono
breadcrumbs and section labels, prose in warm white at graded opacities, slate hairlines.

**Elevated panels** lift blocks off the ground without introducing a register. `bg-paper`
resolves to `--homev3-surface` (#16394C) for cards, diagram nodes and form fields;
`bg-bone-deep` resolves to `--homev3-bg-soft` (#123243) for headers and secondary strips. These
add depth within the single register.

**Statement moments** are marked by typography and scale alone. This matters and is easy
to get wrong: the homepage `StatementBand` uses `bg-navy`, which is #0E2A3A, the same value as
the ground. The band no longer separates itself by colour. It separates itself by scale (serif
display at 5xl to 7xl), by the bronze ticks on the arms, by the foundation rule, and by its
word budget of roughly twenty. The pull-quote opening `/data-ai` does the same work at
smaller scale with serif display at 3xl to 5xl and no section label.

The brand argument is unchanged from v1: executive clarity up front, disciplined execution
beneath. What carries it is now typography and scale rather than a surface swap.

`StatementBand` still renders exactly once site-wide, on homepage viewport 1. The re-theme
turned that into a rule about the component and its typography, since the colour it once
depended on is now the site ground, and `scripts/design-lint.mjs` rule 5 fails the build if a
second usage appears.

## 2. Colour tokens

The live palette is the `--homev3-*` custom properties declared in `src/app/globals.css:9-35`,
plus bronze and slate from `tailwind.config.ts`.

| Token / variable | Value | Use |
|---|---|---|
| `--homev3-bg` | #0E2A3A | The page ground. Also the value behind `bg-navy` and `bg-bone`. |
| `--homev3-bg-soft` | #123243 | Recessed strips, panel headers. Reached via `bg-bone-deep`. |
| `--homev3-surface` | #16394C | Elevated panels, cards, diagram nodes. Reached via `bg-paper` and `bg-white`. |
| `--homev3-surface-2` | #1B4459 | Hover state for elevated panels. |
| `--homev3-border` | rgba(147,165,180,0.22) | Hairline dividers. |
| `--homev3-border-strong` | rgba(147,165,180,0.45) | Emphasised borders, panel outlines. |
| `--homev3-blue` | #52718E | Practice accent (`--mode-accent`). Not for text on the ground; it measures about 2.9:1. |
| `--homev3-blue-bright` | #8FAECB | Accent text and focus rings. 6.4:1 on the ground. |
| `--homev3-blue-deep` | #3E5A75 | Button fills that carry warm-white labels. 6.8:1. |
| warm white | #FAF9F7 | Primary text, graded down through the `--homev3-text-*` variables and the `text-charcoal/NN` scale. |
| bronze | #B08D57 | Structural accent: ticks, rules, small-caps strips, labels. Never body text. 4.8:1 on the ground. |
| slate | #93A5B4 | Secondary text and hairline dividers. |
| `brand-amber-light` | #E5A862 | Status badges only. See the named exception in §7. |

### Reading `bone` and `charcoal`

`bone` and `charcoal` are still live Tailwind tokens, still declared in `tailwind.config.ts`
with their original cream and near-black values, and still written across roughly twelve page
files. They no longer render as those colours. The override block described in §9 intercepts
every utility they generate.

**Read them as role names; the rendered colour comes from the §9 override.** `bg-bone` means
"document surface" and renders navy. `text-charcoal` means "document text" and renders warm
white. `text-charcoal/60` means "document text at 60 per cent" and renders warm white at 60 per
cent. Anyone writing new markup should use them for those roles and expect the dark result.
Every contrast calculation must be done against the dark ground. Getting this backwards is how
the status badge contrast defect of 2026-08-12 happened.

No gradients, no shadows, no additional colours. The logo mark renders in the header lockup
only (Terry's ruling 2026-08-10); `BrandMark.tsx` is the sole imagery exception in the firm
shell, enforced by the design lint.

## 3. Typography roles

| Role | Face | Treatment |
|---|---|---|
| Claim (serif display) | TODO 7 — interim: site display font | Statement headlines. Homepage: three stacked lines. Sentence case with full stop ("Executable."). |
| Wordmark / arms / labels | sans | Uppercase, letterspaced (0.1–0.2em). Weight 600. |
| Foundation strip | sans | Small caps, letterspaced 0.25em+, bronze. Pattern: `DATA · TRANSFORMATION · AI` (middle dots). |
| Document chrome | existing mono | Breadcrumbs (`ATHERYON / SECTION`), § labels (`§01 / LABEL`), end-of-document line. |
| Body prose | existing body font | CLAUDE.md copy rules apply. |

Typography carries the design; if a layout needs decoration to work, the layout is wrong. With
the surface distinction gone, this is load-bearing rather than aspirational: type and scale are
now the only things separating a statement from a paragraph.

**Open inconsistency, recorded here for tracking.** The lede paragraph under a page title renders mono
on `/themes` and `/blog`, and body sans on `/about`, `/data-ai`, `/contact`,
`/privacy` and `/offers`. The rule in this table is that mono belongs to chrome and prose
belongs to the body font, so the mono ledes are the deviation. The mechanical cause is that
pages routed through the shared `DocBanner` component get sans (`src/components/Doc.tsx:50`),
while pages that hand-roll their own banner markup chose mono independently (for example
`src/app/(cm)/themes/page.tsx:33`). Tracked in §8; see review finding 6.

## 4. Structural devices

- **Bronze tick**: 40×2px rule above a label. Marks an arm or a column head.
- **Foundation rule**: 1.5px bronze at 60% opacity, full content width, with a small-caps
  strip beneath. Encodes "arms above, underpinning below". One per page maximum.
- **Hairline divider**: 1px slate at 35% opacity, or `--homev3-border`. Separates blocks.
- **Proof strip**: figure (large) + one-line descriptor (small), 4–6 entries. Figures lead.
- **§ chrome**: sections numbered §01…§NN in DISPLAY ORDER, ascending, no gaps. Breadcrumb
  at page top, `atheryon / <section> / end-of-document` label at page end. `DocPage` derives
  the numbers from render order, so they cannot drift.
- **CTA**: one primary per viewport. That primary is the header **CONTACT US** control
  (label OR shortLabel by breakpoint, never both). There is no page-end CTA.

## 5. Page anatomies

**Homepage** (`src/app/(cm)/page.tsx`): nav → statement band (claim 3 lines, subheading,
functions + sector foundation strip; contact is header-only) → supporting copy with two
explore links → §01 M&A Transaction Services with proof strip → §02 Data, Transformation, AI
with proof strip → §03 Founders → end-of-document label. Three numbered sections in total.

**Function page** (`/ma`, `/data-ai`): document chrome throughout. Breadcrumb, serif claim,
lede, § sections, end-of-document label. Function sub-nav is Overview · Experience · Approach
(firm URLs with hashes). `/data-ai` may open with an unlabelled serif pull-quote before its
first numbered section. Function landings never restate the foundation strip; it belongs to
the homepage and the poster.

**Document page** (`/experience`, `/approach`, `/about`, `/contact`): document chrome only,
no statement moment. `/experience` and `/approach` stack both functions, F1 first, with
`#ma` / `#data-ai` section anchors. Case entries use tag line (small caps) + client
descriptor (small caps) + Context / Role / Outcome.

## 6. Copy registers

Statement moments: ≤ ~20 words visible, no body prose, fragments permitted as display type.
Document prose: Australian spelling, CLAUDE.md banned constructions enforced, tone words per
IA brief §1 (avoid disruptive/revolutionary/next generation/game changing/cutting edge). AI
appears in the foundation strip and body copy only, never in a claim.

## 7. Do / don't

- Do let whitespace and type scale carry hierarchy. With one ground, scale is the separator.
- Do keep function 1 (M&A Transaction Services) first wherever both functions appear.
- Do calculate every contrast ratio against the dark ground. Text on the page ground is being
  checked against #0E2A3A, and text inside an elevated panel against #16394C.
- Do use `bg-bone` and `text-charcoal` as the document surface and document text roles, and
  expect the dark result described in §2 and §9.
- Do reach for `bg-paper` or `bg-bone-deep` when a block needs to lift off the ground, rather
  than inventing a surface.
- Don't render `StatementBand` anywhere except homepage viewport 1; the design lint enforces it.
- Don't reuse the foundation rule as decoration.
- Don't introduce imagery, icons, gradients, cards with shadows, or a new accent colour.
- Don't write raw hex in TSX; colours come from tokens.
- Bronze measures 4.8:1 on both the ground and the elevated panels, so v1's restriction on
  bronze text below ~12px is retired. It existed for the cream surface, which is gone.
- Don't let § numbers drift out of display order. Use `DocPage`, which derives them.

**Named exception to the accent rule.** Amber is sanctioned for status badges (Terry,
2026-08-12) via `text-brand-amber-light` (#E5A862) with low-opacity amber fills, carrying the
building and roadmap states in `StatusBadge.tsx`. The rule against a further accent still
stands everywhere else; amber outside status badges is a violation.

**Named exception to the imagery rule.** Real labs-platform screenshots are sanctioned on the
`/labs/themes` theme cards (Terry, 2026-08-15), rendered from the preformed `theme.thumb`
paths in `src/content/themes.ts` (assets in `public/menu-themes-thumbs/`, synced by hand from
the labs-platform repo). The dark platform UI sits on the navy ground behind a hairline
border. Scope is the theme cards on that page: no illustration, no stock imagery, no
screenshots elsewhere in the firm shell, and `BrandMark.tsx` remains the sole imagery in the
shared shell components the lint watches.

## 8. Open items

- TODO 7 (IA brief §8): serif/sans pair + final palette sign-off.
- Lede typography inconsistent, mono versus sans, per §3. Likely fix is to route the
  hand-rolled banners through `DocBanner`. Review finding 6.
- `/system` runs two conflicting § schemes: a DocSection labelled §01 / ARCHITECTURE whose
  diagram nodes carry their own §01–§05. Review finding 7.
- The page files still carry `bone` and `charcoal` class names that mean the opposite of what
  they say. Accepted debt with no scheduled conversion. See §9.
- `scripts/design-lint.mjs`'s header comment still describes "two surfaces, one accent" from
  v1. The rules it enforces are all still correct; only the wording is stale.
- TODO(terry): should the bone and charcoal tokens eventually be renamed to role names
  (`surface`, `document-text`) so the class names stop contradicting the rendered result, or
  does the §9 interception stay permanent?

## 9. The globals.css override block

`src/app/globals.css` (the block headed "Dark navy global theme — interior page Tailwind class
overrides") is what makes the whole site dark. Anyone who reads `bg-bone` in a component and
expects cream needs this section.

**What it does.** Tailwind emits literal rules for its utilities, such as
`.bg-bone { background-color: #EFEAE0; }`. The block redeclares those same selectors with
`!important` and dark values, so `bg-bone` paints `--homev3-bg`, `text-charcoal` paints
#FAF9F7, `bg-paper` and `bg-white` paint `--homev3-surface`, and the whole `text-charcoal/NN`
opacity ladder inverts to warm white at matching opacities. Borders, dividers, placeholders,
hover states and form fields are remapped the same way. Specificity is sufficient because
Tailwind utilities are flat single-class selectors.

**Why it exists.** The interior pages were built against the bone and charcoal palette. The
override converts them at one point instead of editing roughly twelve page files. The anchor is
`DocPage` in `src/components/Doc.tsx:21,30`, which hardcodes `bg-bone` on its wrapper, so every
document page inherits the ground from this block whether or not its own markup mentions a
surface.

**Its status.** Converting the page files to name the dark tokens directly is accepted debt. It
is not scheduled work, and it should not be done opportunistically as part of an unrelated
change, because the conversion touches every page at once and the override currently keeps them
consistent by construction. Until someone decides otherwise, the block is the design system's
colour layer and this specification treats it as intentional.

**The trap it sets.** The class names now say the opposite of what they render. Any reasoning
that starts from the literal token value, most obviously a contrast calculation against a cream
background, will reach the wrong answer. The 2026-08-12 status badge defect was exactly this:
the badge foregrounds had been darkened for legibility on cream, and after the re-theme they sat
at roughly 1.6:1 on navy. Check §2 before trusting a colour name.
