# Prompt: reconcile the design docs to the dark system

Paste everything below the line into Claude Code.

---

The governing documents in this repo describe a visual system the code no longer implements. Your job is to make the documents true. Do not change what the site looks like.

## Background

`src/app/globals.css` (the block titled "Dark navy global theme — interior page Tailwind class overrides", currently around lines 410-496) remaps the bone/charcoal Tailwind utilities to navy with `!important`:

```css
.bg-bone       { background-color: var(--homev3-bg) !important; }
.text-charcoal { color: #FAF9F7 !important; }
```

The whole site therefore renders dark. The design standard still describes a two-register system where only the homepage's first viewport is navy and everything else is a bone document register. That spec is now wrong, and CLAUDE.md instructs every future edit to follow it, so both documents actively produce incorrect work.

Terry ruled on 2026-08-12 that the colours stay as they are. The dark system is the intent. The documents are what change.

Full context: `docs/reviews/2026-08-12-site-review.md`, findings 2 and 11.

## Scope

Documentation and comments only. Two exceptions where code may change, both listed explicitly below.

### 1. `docs/superpowers/specs/2026-08-09-design-standard.md`

Rewrite so it describes the system that exists. Bump the title to v2 and add a short revision note recording that v1 described the bone/navy two-register system, that the site was globally re-themed to dark navy, and that Terry confirmed the dark system as intent on 2026-08-12.

Sections needing work:

- **§1 "The format: two registers"** — no longer accurate. There is one surface. Decide with the evidence in front of you whether the honest replacement is "one register with statement moments" (the homepage band and the `/capital-markets` pull-quote both still do statement-register work on a slightly different navy) or something else. Read the actual pages before you write this.
- **§2 Colour tokens** — the table lists bone as the document surface and navy as "statement surface only, never as text". Both are now false. Document the real palette: `--homev3-*` variables from `globals.css:9-35`, plus bronze and slate. State plainly that `bone` and `charcoal` still exist as Tailwind tokens but are intercepted by the override block, and that authors should read them as "document text" and "document surface" role names rather than as literal colours.
- **§3 Typography roles** — mostly still correct. Note the live inconsistency: the lede paragraph renders mono on `/themes`, `/roadmap` and `/blog` but body sans on `/about`, `/capital-markets`, `/contact`, `/privacy` and `/offers`. Do not fix it here; record it as an open item.
- **§5 Page anatomies** — the homepage anatomy listed (§01 founders, §02 principle, §03 why, §04 how we work) does not match the live page (§01 M&A, §02 Capital Markets, §03 Founders). Correct it against what actually renders.
- **§7 Do / don't** — "Don't put the navy band on interior pages" is now unfollowable. Rewrite the list so each item is a rule someone could actually obey. Keep the ones that still hold: no gradients, no shadows, no imagery beyond `BrandMark`, M&A before Capital Markets, bronze structural only.
  - On the third-accent rule: amber is now sanctioned for status badges (Terry, 2026-08-12) via `text-brand-amber-light`. Document that as a named exception rather than deleting the rule.
- **§8 Open items** — replace the resolved 2026-08-09 caching defect narrative with the current open list.

Add a new section documenting the override block: what it does, why it exists (one conversion point instead of ~12 page files), and that converting the page files properly is accepted debt, not scheduled work. Anyone reading `bg-bone` in a component needs to find this explanation.

### 2. `CLAUDE.md`

- **"Design standard (HARD RULES)" block** — currently says "Two registers only. Navy statement band = homepage viewport 1, nowhere else. Everything else is the bone document register." Replace with rules matching the rewritten spec. Keep the parts that still hold: tokens not hexes, bronze structural only, § numbers ascend in display order, one CTA per viewport, M&A before Capital Markets.
- **"Key paths"** — stale in several places:
  - `src/app/ma/` is now `src/app/(cm)/ma/`. There is no separate `ma` route group.
  - `src/content/site.ts` exports a third generation, `v3`, used by `/data-ai`. The doc mentions only `site` and `v2`.
  - Missing routes: `/data-ai`, `/experience`, `/approach`, `/capital-markets`, `/capital-markets/{experience,approach,contact}`, `/ma/{experience,approach,contact}`, `/blog`.
  - Verify the whole list against `src/app/**/page.tsx` rather than trusting this summary.

### 3. Stale code comments (the two permitted code changes)

- `src/components/Doc.tsx:7` — "Aesthetic: bone bg, charcoal hairlines". Update to describe the dark ground.
- `src/components/shellConfig.ts:2-5` — references `app/ma/layout.tsx` and `app/mortgages/layout.tsx` as separate route-group layouts. The `ma` one no longer exists. Correct it.

Comments only. Do not change any logic in these files.

## Do not

- Change any colour value, Tailwind token, CSS rule or class name.
- Remove the override block or convert the page files.
- Touch `src/components/StatusBadge.tsx` — its contrast fix and comment landed 2026-08-12 and are current.
- Fix the mono-lede inconsistency, the `/system` double § scheme, or any copy. Those are separate tracked findings.
- Delete the design standard's history. Amend it, and record what changed and why.

## Acceptance

1. `npx next build` passes.
2. `git diff` shows changes confined to `docs/superpowers/specs/2026-08-09-design-standard.md`, `CLAUDE.md`, and comment lines in `Doc.tsx` and `shellConfig.ts`.
3. Zero rendered output changes. If a diff touches anything that could alter a pixel, stop and explain.
4. Grep the rewritten spec and CLAUDE.md for "bone" and "charcoal": every remaining mention describes them as intercepted role names, never as a literal cream surface.
5. A developer reading only CLAUDE.md and the spec would write code that renders correctly on the dark ground.

## Working notes

- Read the live pages before writing about them. The test deploy is https://polite-flower-03ba3020f.7.azurestaticapps.net — `/`, `/ma`, `/capital-markets`, `/themes` and `/roadmap` cover the range.
- Where you cannot establish a fact, write `TODO(terry): <question>` rather than guessing. Per CLAUDE.md, twenty TODOs beat one confident fabrication.
- CLAUDE.md's own copy rules apply to what you write: Australian spelling, at most one em dash per page, no "not X, Y" corrective contrast.
