# IA Roadmap Closeout

**Date completed:** 2026-05-11
**Spec:** `docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md`
**Plan:** `docs/superpowers/plans/2026-05-11-ia-issues-triage-roadmap.md`
**Original source:** `docs/ia-issues.md` (22 issues from the 2026-05-11 IA review)

## TL;DR

The roadmap was planned as a 9-bundle, 4-wave operation against the pre-pivot site IA. While the spec was being written, ~65 commits landed on `main` that performed a significant IA pivot upstream — 8 legacy routes deleted (`/how-we-work`, `/reference-architectures`, `/cdm-platform`, `/recovery-migration`, `/m-and-a-execution`, `/capability-enablement`, `/ai-ready-data`, `/what-we-deliver`) and replaced with a new pillar structure (`/reality` as homepage, `/data`, `/ai-direction`, `/transformation`, `/labs/themes`).

The roadmap was narrowed to the 3 bundles that remained applicable (B1, B4, B8) and executed against the new IA. All 3 shipped successfully.

## What shipped

| Bundle | PR | Commit on main | Description |
|---|---|---|---|
| B1 | [#21](https://github.com/atheryon-ai/atheryon-website/pull/21) | `e93789b` | Site hygiene — `/privacy` and `/terms` pages, dead-nav cleanup in site.ts, `pages.contact.coverage` region statement |
| B4 | [#25](https://github.com/atheryon-ai/atheryon-website/pull/25) | `c7654c8` | Per-route SEO metadata audit — Twitter cards + canonical URLs on all 14 routes, missing metadata added to `/contact`, `metadataBase` set on layout |
| B8 | [#26](https://github.com/atheryon-ai/atheryon-website/pull/26) | `3a20427` | Editorial integration pass — Goldman SecDB framing softened per claims-ledger, 5 unused client logo SVGs deleted (Barclays, CBA, Credit Suisse, Microsoft, Westpac) |

## Wave 0 artifacts

| Artifact | Status | Commit |
|---|---|---|
| `docs/claims-ledger.md` | Complete — 114 verdicts (101 approved, 5 soften, 8 remove) | `e149e97` |
| `docs/site-vocabulary.md` | Deferred — was for the obsolete bundles (B3a jargon, B5 IA taxonomy). Not needed for B1+B4+B8. | n/a |

The claims ledger is now an archival snapshot of the pre-pivot site claims. Some of its `Where it appears` line references are obsolete (homepage was rewritten to a re-export of `/reality`), but the per-claim verdicts were applied by B8 wherever the claim still exists on current main.

## Issue resolution matrix (original 22 issues)

| Issue | Description | Status | Resolved by |
|---|---|---|---|
| 1 | Footer links to `/privacy` and `/terms` — both 404 | **Shipped** | B1 — created both pages |
| 2 | `sitemap.xml` lists non-existent `/mergers-acquisitions/` | **Resolved upstream** | Pivot already updated sitemap to new routes |
| 3 | `/what-we-deliver` orphaned route | **Resolved upstream** | Pivot deleted the route |
| 4 | Services dropdown missing AI-Ready Data, Reference Architectures, Labs, Programs | **Resolved upstream** | Pivot removed Services dropdown entirely; pillars in top nav |
| 5 | Top-level nav has five overlapping buckets | **Resolved upstream** | Pivot rebuilt nav structure |
| 6 | Service pages are dead ends — no cross-linking | **Deferred** | Service pages no longer exist (deleted upstream); replaced by pillar pages. Cross-linking within new structure is a future concern. |
| 7 | No case studies on service pages | **Deferred** | Service pages no longer exist. New pillar pages may need case-study sections; that's a separate decision. |
| 8 | `/about` has no team / leadership bios | **Deferred** | Out of narrowed scope. Requires content provisioning. |
| 9 | Define "Canonical Data Model" / CDM on first use | **Deferred** | `/cdm-platform` page deleted; CDM still mentioned as a sub-capability on `/data`. Definition would attach there in a future bundle. |
| 10 | Define Bronze / Silver / Gold pipeline tiers | **Deferred** | `/reference-architectures` page deleted. B8 confirmed B/S/G not referenced in body copy currently — may not be needed. |
| 11 | Expand the "MiB" acronym | **Deferred** | Out of narrowed scope. Affects /programs/mib-insight only. |
| 12 | Define "regulator-credible" | **Deferred** | Operational definition was planned for the vocabulary contract (Task 2); skipped when scope narrowed. Phrase still appears on current site. |
| 13 | Plain-English subheadings on jargon-heavy service pages | **Resolved upstream** | Service pages deleted. New pillar pages have their own copy patterns. |
| 14 | Tooltips/footnotes for regulator acronyms | **Deferred** | Out of narrowed scope (B3a/B3b deferred). |
| 15 | No FAQ on service pages | **Resolved upstream** | Service pages deleted; FAQ remains on homepage |
| 16 | No insights / blog / resources hub | **Dropped** | Explicitly dropped from this roadmap as not credibility-critical |
| 17 | No engagement-economics or pricing guidance | **Deferred** | Out of narrowed scope. Engagement-model copy was planned for B5 (deferred). |
| 18 | Clarify what "Reference Architectures" actually are | **Resolved upstream** | Page deleted. RAs no longer a named site concept. |
| 19 | Clarify Labs positioning | **Resolved upstream** | Labs page rewritten by pivot with explicit positioning |
| 20 | Per-page SEO metadata audit | **Shipped** | B4 — Twitter cards + canonical URLs on all 14 routes |
| 21 | Confirm client-logo and case-study content is real | **Shipped** | B0 (claims-ledger verdicts) + B8 (5 unused logos deleted, Goldman framing softened) |
| 22 | Verify Contact page provides a form and region coverage | **Shipped** | B1 — verified Formspree form, added region/timezone copy |

### Status summary
- **Shipped:** 5 (#1, #20, #21, #22, partial #21 verdicts via B8)
- **Resolved upstream:** 8 (#2, #3, #4, #5, #13, #15, #18, #19)
- **Deferred:** 8 (#6, #7, #8, #9, #10, #11, #12, #14, #17)
- **Dropped:** 1 (#16)

## Follow-up issues filed

| # | Title | Source |
|---|---|---|
| [#22](https://github.com/atheryon-ai/atheryon-website/issues/22) | Wire Header.tsx and Footer.tsx to consume site.ts arrays (or delete the arrays) | B1 code review |
| [#23](https://github.com/atheryon-ai/atheryon-website/issues/23) | DRY: replace 17 inline bullet duplications in /privacy and /terms with BulletList component | B1 code review |
| [#24](https://github.com/atheryon-ai/atheryon-website/issues/24) | Document deliberate carve-out for legal page content (not in site.ts) | B1 code review |
| [#27](https://github.com/atheryon-ai/atheryon-website/issues/27) | Tests reference deleted Services dropdown and dead routes (buttons.spec.ts) | B8 surprise findings |

## Notes for any future IA roadmap

1. **The original ia-issues.md is now substantially obsolete.** Any future IA work should start with a fresh review against the current pillar structure (`/reality` + Data / AI Direction / Transformation + Labs / Programs / About), not reuse this document.

2. **Deferred issues (#6, #7, #8, #9, #11, #12, #14, #17) are real credibility gaps under the new IA too.** Team bios, defining "regulator-credible" operationally, MiB acronym expansion, engagement-model clarity — all still apply to the new site. Worth a dedicated cycle when content provisioning is ready.

3. **The DataVisualization component is now dead code** (exported, not consumed by any page). Worth deleting in a cleanup pass.

4. **Header.tsx and Footer.tsx hardcode their nav and links.** The `site.ts` arrays we cleaned up in B1 are not consumed by anything. Wire them up or delete them.

5. **The claims-ledger workflow proved valuable.** A 114-row inventory with verdicts is a useful artifact even when the site changes around it — verdicts on specific claim text survive page restructuring. Worth reusing the pattern for the next pivot.

## Final state verification

```bash
git log --oneline -5
# 3a20427 fix(ia): editorial integration pass [B8] (#26)
# c7654c8 feat(seo): per-route metadata audit [B4] (#25)
# e93789b feat(ia): site hygiene [B1] — privacy/terms pages, dead-nav cleanup, contact region (#21)

npm run build
# PASS — 17/17 static routes generated
```
