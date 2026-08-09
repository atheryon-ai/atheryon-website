# Atheryon Design Standard v1

Derived from the approved homepage format (rev 6 poster-as-homepage) and the poster reference
asset `docs/superpowers/specs/atheryon-poster-2026-08-09.svg`. This document is the acceptance
spec for phase 4 and the styling contract for every new page. Typefaces are role-based until
§8 TODO 7 of the IA brief is answered.

## 1. The format: two registers

Every page is built from two visual registers.

**Statement register** — the poster. Deep navy surface, large serif claim, letterspaced
small-caps structure, bronze accents, no imagery, word budget ~20. It says what the firm is.
Full-band use is reserved for the homepage viewport 1. No other page gets a navy band.

**Document register** — the working document. Bone surface, § numbered sections, mono
document chrome (breadcrumb, section labels, end-of-document footer), prose in charcoal.
It shows how the firm works. Every page below the fold, and every page other than the
homepage top, is document register.

The pairing is the brand argument: executive clarity up front, disciplined execution beneath.
The seam between the two registers is a single bronze rule.

## 2. Colour tokens

| Token | Hex | Use |
|---|---|---|
| navy | #0E2A3A | Statement surface only. Never as text. |
| warm-white | #FAF9F7 | Text on navy. |
| bronze | #B08D57 | Structural accent: ticks, rules, small-caps strips, labels on navy. Never body text, never long text, never on bone at small sizes without a contrast check. |
| slate | #93A5B4 | Secondary text on navy; hairline dividers at 35% opacity. |
| bone | existing site token | Document surface (unchanged). |
| charcoal / ink | existing site tokens | Document text (unchanged). |

Two surfaces, one accent. No gradients, no shadows, no additional colours. The legacy
gradient logo mark does not appear on firm pages; the wordmark is type only.

## 3. Typography roles

| Role | Face | Treatment |
|---|---|---|
| Claim (serif display) | TODO 7 — interim: site display font | Statement headlines. Homepage: three stacked lines. Sentence case with full stop ("Executable."). |
| Wordmark / arms / labels | sans | Uppercase, letterspaced (0.1–0.2em). Weight 600. |
| Foundation strip | sans | Small caps, letterspaced 0.25em+, bronze. Pattern: `DATA · TRANSFORMATION · AI` (middle dots). |
| Document chrome | existing mono | Breadcrumbs (`ATHERYON / SECTION`), § labels (`§01 / LABEL`), end-of-document line. |
| Body prose | existing body font | Document register only. CLAUDE.md copy rules apply. |

Typography carries the design; if a layout needs decoration to work, the layout is wrong.

## 4. Structural devices

- **Bronze tick**: 40×2px rule above a label. Marks an arm or a column head.
- **Foundation rule**: 1.5px bronze at 60% opacity, full content width, with a small-caps
  strip beneath. Encodes "arms above, underpinning below". One per page maximum.
- **Hairline divider**: 1px slate at 35% opacity. Separates blocks inside a register.
- **Proof strip**: figure (large) + one-line descriptor (small), 4–6 entries. Figures lead.
- **§ chrome**: sections numbered §01…§NN in DISPLAY ORDER, ascending, no gaps. Breadcrumb
  at page top, `atheryon / <section> / end-of-document` + CTA at page end.
- **CTA**: one primary per viewport. Header button renders label OR shortLabel (breakpoint
  choice), never both. Page-end CTA is the sentence form ("Discuss a situation →").

## 5. Page anatomies

**Homepage**: nav → navy statement band (claim 3 lines, subheading, arms + foundation strip,
primary CTA) → bronze seam → document register: supporting copy, proof strip, §01 founders,
§02 principle feature, §03 why, §04 how we work, end-of-document CTA.

**Arm page** (/ma, /capital-markets): document register throughout. Breadcrumb, serif claim
in charcoal ("Making Transactions Executable" on /ma), one-paragraph lede, § sections,
end-of-document CTA. Arms never restate the foundation strip; it belongs to the homepage
and the poster.

**Document page** (/experience, /approach, /about, /contact): pure document register.
Case entries use tag line (small caps) + client descriptor (small caps) + Context / Role /
Outcome.

## 6. Copy registers

Statement register: ≤ ~20 words visible, no body prose, fragments permitted as display type.
Document register: prose, Australian spelling, CLAUDE.md banned constructions enforced,
tone words per IA brief §1 (avoid disruptive/revolutionary/next generation/game changing/
cutting edge). AI appears in the foundation strip and body copy only, never in a claim.

## 7. Do / don't

- Do let whitespace carry hierarchy; the navy band earns attention by being the only one.
- Do keep M&A first wherever the arms appear.
- Don't put the navy band on interior pages, don't reuse the foundation rule as decoration.
- Don't introduce imagery, icons, gradients, cards with shadows, or a third accent colour.
- Don't render bronze text below ~12px on bone (contrast).
- Don't let § numbers drift out of display order (current live defect).

## 8. Open items

- TODO 7 (IA brief §8): serif/sans pair + final palette sign-off before full-site re-token.
- Live defect 2026-08-09: homepage document register renders unstyled on the test SWA —
  suspected Tailwind content-glob miss on new component paths; header shows both CTA labels;
  legacy gradient logo still in the header. Fix against this standard.
