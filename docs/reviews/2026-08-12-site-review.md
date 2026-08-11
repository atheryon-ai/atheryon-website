# Site review — dev (test SWA), 12 August 2026

Target: https://polite-flower-03ba3020f.7.azurestaticapps.net (dev branch → `atheryon-website-test`)
Lens: CLAUDE.md copy rules + `docs/superpowers/specs/2026-08-09-design-standard.md`
Method: browser walkthrough of 14 routes plus source-level grep. No build or Playwright run (sandbox unavailable this session), so nothing below is a compile or test result.

Pages walked: `/`, `/ma`, `/capital-markets`, `/about`, `/contact`, `/labs`, `/offers`, `/system`, `/themes`, `/roadmap`, `/blog`, `/privacy`.

---

## Severity summary

> **Terry's rulings, 12 Aug 2026.** Finding 1 corrected and applied: "a delivery partner", not "the integration partner". Finding 2 closed as a decision: the colours stay as they are, so the dark system is the intent and the design standard is what needs rewriting.

| # | Finding | Severity | Type |
|---|---|---|---|
| 1 | ~~"Atheryon is the integration partner for S&P TeraHelix"~~ **Fixed** | **High** | Copy / commercial risk |
| 2 | ~~Global dark re-theme contradicts the design standard~~ **Decided: colours stay** | **High** | Design governance |
| 3 | ~~Status badges fail contrast on the navy ground~~ **Fixed** | **High** | Accessibility |
| 4 | Banned copy constructions are systemic, not occasional | Medium | Copy |
| 5 | `/labs`, `/themes`, `/offers`, `/system` gated behind `/capital-markets` | Medium | IA |
| 6 | Lede typography inconsistent across pages (mono vs sans) | Medium | Design |
| 7 | `/system` runs two conflicting § numbering schemes | Medium | Design |
| 8 | Unverified counts still shipping in copy | Medium | Copy / accuracy |
| 9 | Contact page offers two arms, nav offers three | Low | IA |
| 10 | Large empty regions on `/offers`, `/roadmap`, `/contact` | Low | Design |
| 11 | CLAUDE.md and the design standard are both stale | Low | Docs |
| 12 | AU spelling inconsistency: "programs" vs "programmes" | Low | Copy |

---

## 1. "Atheryon is the integration partner for S&P TeraHelix" — High — FIXED

**Resolved 12 Aug 2026.** Terry: it is a delivery partner relationship, not *the* integration partner. Applied at `src/content/site.ts:51` and `:377`, both now reading "Atheryon is a delivery partner for S&P TeraHelix." The em dash at `:377` was replaced with a semicolon in the same edit.

One residual item, unanswered: whether S&P has consented to being named on Atheryon marketing material. Most vendor and subcontractor agreements require written approval to use the client's name publicly. Worth checking the engagement terms, since the claim is now accurate but still names them.

The original finding is kept below for the record.

---



`/labs`, §01 heading. This is a public claim about a commercial relationship with a named third party, and it is the most exposed sentence on the site.

The surrounding facts check out. S&P Global did complete the TeraHelix acquisition in June 2025, and the site's description of TeraHelix closely tracks the S&P press release, which it attributes ("S&P described TeraHelix as…"). That part is fine.

The claim about Atheryon is a different category. Nothing public supports Atheryon being S&P's integration partner, and the phrasing reads as a firm-to-firm engagement rather than an individual contractor arrangement. CLAUDE.md's first hard rule is never to invent a client or capability.

Two questions before this ships to production:

- Is the engagement contracted to Atheryon Pty Ltd, or to you personally?
- Do you have S&P's consent to name them on marketing material? Most vendor agreements require written approval for exactly this.

If either answer is no, the honest version is something like "Atheryon works in the same problem space S&P bought TeraHelix to address" — which the paragraph beneath already argues, and argues well.

## 2. Global dark re-theme contradicts the design standard — High — DECIDED

**Resolved 12 Aug 2026.** Terry: leave the colours as they are. The dark system is therefore the intent, and the spec is the thing that is wrong.

That closes the design question and opens a documentation one. Design standard §1, §2, §5 and §7 still describe a two-register bone/navy system that no longer exists, and CLAUDE.md still instructs every future edit to use it. Until those are rewritten, anyone writing `bg-bone` or `text-charcoal` in good faith gets navy, and any contrast reasoning done against the bone ground is wrong. Tracked as part of finding 11.

The original finding is kept below for the record.

---



`src/app/globals.css:410-496` adds a block titled "Dark navy global theme — interior page Tailwind class overrides" that remaps the bone/charcoal utilities to navy with `!important`:

```css
.bg-bone     { background-color: var(--homev3-bg) !important; }
.text-charcoal { color: #FAF9F7 !important; }
```

The comment is candid about why: convert once here rather than in ~12 page files. As a tactic that is defensible. The problem is that the governing documents were never updated, so the repo now states two contradictory rules:

| Design standard §1, §7 | Live implementation |
|---|---|
| Two registers; bone document register below the fold | One register; navy everywhere |
| Navy band on homepage viewport 1, "no other page gets a navy band" | Every page is navy |
| Bone/charcoal are the document tokens | Bone/charcoal are dead, silently remapped |

The practical cost is that anyone (you, me, a contractor) following CLAUDE.md will write `bg-bone` / `text-charcoal` in good faith and get navy. Every accessibility rationale written against the bone ground is also now void, which is exactly how finding 3 happened.

Recommendation: pick one. Either rewrite §1, §2 and §5 of the design standard to describe the dark system as the intent and retire the bone tokens, or treat the override block as debt and schedule the page-level conversion. Leaving it as is means the spec actively misleads.

## 3. Status badges fail contrast on navy — High — FIXED

**Resolved 12 Aug 2026.** Terry: fix the legibility, keep the hues. Blue still means shipped, amber still means building and roadmap; only the lightness moved, so no palette change and no new colours.

Applied in `src/components/StatusBadge.tsx`:

| State | Was | Now | Contrast on the #16394C panel |
|---|---|---|---|
| shipped | `text-homev3-blue-deep` | `text-homev3-blue-bright` | ~1.6:1 → 4.7:1 |
| building | `text-amber-800`, 18% fill | `text-brand-amber-light`, 10% fill | ~1.6:1 → 5.1:1 |
| roadmap | `text-amber-800`, 8% fill | `text-brand-amber-light`, 8% fill | ~1.6:1 → 5.3:1 |

The BUILDING fill came down from 0.18 to 0.10 because at 0.18 the amber blend warmed the ground enough to pull the text to about 4.4:1, marginally under AA for 10px. Both foregrounds are existing Tailwind tokens, so the no-raw-hex rule still holds. The stale comment explaining the old cream-background rationale has been replaced with the current measurements.

Not yet verified in a browser — the sandbox was down, so no build ran. Worth a look at `/roadmap` and `/themes` after the next deploy.

The original finding is kept below for the record.

---



`src/components/StatusBadge.tsx`. The component's own comment (lines 8-14) explains that foregrounds were darkened "to meet WCAG AA contrast on the cream `bg-bone` background that hosts the badges." That background no longer exists — finding 2 remapped it to navy.

Result, visible on `/roadmap` and `/themes`:

- `shipped` uses `text-homev3-blue-deep` (#3E5A75) on #0E2A3A → roughly 1.6:1
- `building` / `roadmap` use `text-amber-800` on the same ground → similar territory

WCAG AA needs 4.5:1 for text this size. On `/roadmap` the BUILDING badge next to "Mortgages practice" is close to unreadable. Fix is to invert the logic the comment describes and use the light-on-dark foregrounds the rest of the site already uses.

Secondary point: the amber fill `rgba(245, 158, 11, …)` is a third accent colour, which design standard §7 rules out ("Don't introduce… a third accent colour"). Worth deciding whether amber is now sanctioned or should become bronze.

## 4. Banned copy constructions are systemic — Medium

CLAUDE.md caps em dashes and "not X — Y" corrective contrast at one per page and calls the latter "the single biggest AI tell on this site."

- **Em dashes:** 76 occurrences inside string literals in `src/content/site.ts` alone (226 across `src/`, though many of those are code comments and don't ship).
- **Corrective contrast:** at least a dozen in shipping copy. `src/content/site.ts:1097` reads `'Consulting practice, not a platform'` — CLAUDE.md quotes that exact string as a banned example. Also `site.ts:1003` "Day-1 readiness in weeks, not quarters", plus `site.ts:173, 177, 189, 308, 312, 314`.

This is a rewrite pass, not a quick fix. Suggest working `site.ts` page-by-page rather than globally, so the one-per-page allowance is used deliberately.

## 5. Gated routes — Medium — CORRECTED 12 Aug

**I had this wrong on first pass.** I recorded `/labs`, `/themes`, `/offers` and `/system` as orphaned with no inbound links. They are not orphaned. They are gated, which is a different problem with a different fix.

`src/components/Footer.tsx:12` defines the gate:

```ts
const TECH_SURFACES = ['/capital-markets', '/system', '/labs', '/themes', '/offers']
```

The footer's Technology column, which holds the only links to those four pages, renders only when the current path is one of those five or a child of one. The comment above it explains the intent (council review 2026-08-10: the Technology links are Capital Markets material and must not appear on M&A or neutral surfaces). That reasoning is sound.

The consequence is not. Of the five gate paths, four are the destinations themselves, so `/capital-markets` is the single doorway. Reaching `/offers` from a cold visit requires: land on the homepage, click Capital Markets in the header, scroll past the full arm page to the footer, notice a third column that was not there a moment ago, click Offers. Once inside, the column self-sustains, because every destination is also a gate path.

So the commercial surface is two hops and a full-page scroll behind a nav item that does not advertise it, and it is invisible from the homepage entirely.

Worth deciding whether that is the intended level of discoverability for `/offers` in particular. Options, roughly in order of effort: add a body-copy link from `/capital-markets` above the fold; add `/offers` to the Firm column so it always renders; or widen `TECH_SURFACES` to include `/` and `/data-ai`.

Separately, `src/content/site.ts:441` points at `/ma/offers`, which has no route. It sits in the superseded `v2Ma` generation and does not render today, so it is latent rather than live, but it will 404 if that generation is ever revived.

## 6. Lede typography inconsistent — Medium

The paragraph under the page title renders in **mono** on `/themes`, `/roadmap` and `/labs`-adjacent surfaces, and in **body sans** on `/about`, `/capital-markets`, `/contact`, `/privacy`, `/offers`.

Design standard §3 assigns mono to document chrome only — breadcrumbs, § labels, end-of-document lines — with body prose in the body font. The mono ledes read as chrome and lose the register distinction.

## 7. `/system` runs two § schemes — Medium

The page has a DocSection labelled "§01 / ARCHITECTURE". Inside it, the architecture diagram uses §01 (Data Sources), §02 (ODS), §03 (Orchestrator, on the left rail) and "§04 → §05" (Operational Outputs) as node labels.

Two numbering systems, one page, and the diagram's own numbers don't ascend in display order (§03 sits vertically alongside §01/§02). Design standard §4 reserves § chrome for page sections in display order and §7 lists drift as a live defect. Suggest the diagram nodes use plain numerals or names.

## 8. Unverified counts still shipping — Medium

`src/content/metrics.ts:32-34` is explicit:

```
// TODO(terry): unverified marketing counts — see header note.
bankingFunctions: 8,
flagshipSurfaces: 31,
```

The header note says there is no backing data for either number in this repo, and that this vocabulary does not reconcile with the derived 26 themes / 111 pages / 6 surfaces. Both numbers appear in `/labs` and `/offers/code` copy.

Separately, `/system` renders "1,619 type defs · 42 ISO 20022 · 14 FpML" — I could not find the source for those in this repo either. Worth confirming or retiring before production.

The `{{PLACEHOLDER}}` guards themselves are working correctly — `/data-ai` hides its principle block via `isPending`, matching the documented pattern.

## 9. Contact offers two arms, nav offers three — Low

`/contact` lists M&A and Capital Markets. The header lists M&A, Capital Markets and Data & AI. A Data & AI visitor reaching contact finds no path that matches what they clicked.

## 10. Empty regions — Low

`/offers`, `/roadmap` and `/contact` each end with a large blank navy area — roughly a full viewport on `/offers`. On `/roadmap` no end-of-document CTA appears at all, where `/blog` and `/` both have one. Partly a consequence of the `isPending` guards hiding blocks, but the visual result reads as unfinished.

## 11. Docs are stale — Low

Both governing documents have drifted from the code:

- CLAUDE.md says `src/app/ma/` is a separate route group. It is now `src/app/(cm)/ma/`.
- CLAUDE.md says `site.ts` exports two generations, `site` and `v2`. There is now a `v3` (used by `/data-ai`).
- CLAUDE.md's key-paths list omits `/data-ai`, `/experience`, `/approach`, `/capital-markets/*`, `/ma/{experience,approach,contact}`, `/blog`.
- Design standard §5 describes a homepage anatomy (§01 founders, §02 principle, §03 why, §04 how we work) that does not match the live page (§01 M&A, §02 Capital Markets, §03 Founders).
- `shellConfig.ts:2-5` references `app/ma/layout.tsx`, which no longer exists.

## 12. AU spelling — Low

`/about` and `/capital-markets` use "programs"; `site.ts` labs copy uses "programmes". Both are defensible in Australian business usage, but the site should pick one. Everything else scanned clean — no -ize endings, no "color"/"behavior"/"center" in copy.

---

## What held up well

Worth recording, since a review that only lists faults is misleading:

- **No raw hex in any TSX component.** Zero matches across `src/**/*.tsx`. Token discipline is genuinely holding.
- **§ numbering ascends correctly** on `/`, `/ma`, `/about`, `/capital-markets` — the DocPage derivation in `Doc.tsx:20-31` does its job.
- **M&A precedes Capital Markets** everywhere it appears: homepage sections, header nav, footer, contact.
- **Placeholder guards work.** No `{{…}}` leaked to any rendered page.
- **`/privacy` is solid** — specific, plainly written, names Formspree as a processor, dated 11 May 2026.
- **`/ma` is the strongest page on the site.** Long, concrete, well-structured, and free of the constructions flagged in finding 4.

---

## Suggested order

Done 12 Aug: 1 (copy corrected), 2 (decided, colours stay), 3 (badge legibility fixed).

Remaining:

1. **Rewrite the design standard and CLAUDE.md (11).** Now the highest-value item, because finding 2 was resolved by keeping the code and not the spec. Sections §1, §2, §5 and §7 of the standard describe a bone document register that no longer exists, and CLAUDE.md's design non-negotiables instruct every future edit to use it. Until this is done, both documents will keep producing wrong work.
2. **Confirm or retire the unverified counts (8)** — the 8/31 pair, and the `/system` type-def figures.
3. **Check the S&P naming consent** — the claim is accurate now, but they are still named on a public page.
4. **Copy pass on `site.ts` (4)**, page by page, for em dashes and the "X, not Y" construction.
5. **IA decisions (5, 9)** — whether the orphaned routes should be linked, and whether Data & AI belongs on `/contact`.
6. **Typography and § cleanup (6, 7)**.

## Not verified this session

The Linux sandbox failed to mount, so none of the following ran: `npx next build`, `npm test`, `npm run verify:production-ready`. The two edits made today (`site.ts`, `StatusBadge.tsx`) are typechecked by eye only. Run a build before promoting dev to main.
