# /integration IA Review — bringing the S&P pitch into the site

**Date:** 2026-05-08
**Branch:** `feat/sp-integration-pitch`
**Goal:** Reconcile the new gated `/integration` page with the rest of the public site. Eliminate copy that repeats existing pages, sharpen the parts that are genuinely S&P/TeraHelix-specific, and decide what stays standalone vs links out.

---

## 1. Site IA today (current branch)

| Group | Routes |
|---|---|
| **Top-level public** | `/` · `/how-we-work` · `/programs` · `/reference-architectures` · `/about` · `/contact` |
| **Services (dropdown)** | `/cdm-platform` · `/recovery-migration` · `/m-and-a-execution` · `/capability-enablement` |
| **Footer-only resources** | `/what-we-deliver` · `/ai-ready-data` |
| **Programs (sub)** | `/programs/mib-insight` · `/programs/mib-insight/thanks` |
| **Gated (new)** | `/integration` (role: `sp-clients`) |

Observations on the wider IA, separate from /integration:
- `/what-we-deliver` and `/ai-ready-data` are useful but buried in footer. Either promote them or merge their content into adjacent pages.
- `/how-we-work` and the Services dropdown overlap conceptually — Services lists *what we sell*; how-we-work lists *how we deliver*. Acceptable, but worth flagging.

---

## 2. Block-by-block overlap matrix

`/integration` blocks against existing pages:

| /integration block | S&P-specific? | Duplicates which existing page(s)? | Severity |
|---|---|---|---|
| `hero` — "S&P data is only as valuable as your ability to operationalise it" | **Yes** | None | Keep |
| `problem` — "Why enterprise data programs stall" (3 cards: fragmented, AI on broken foundations, slow time to insight) | No | `/` problemsWeSolve · `/ai-ready-data` whyAiFails | **High** |
| `specialism` — "Integration specialist for S&P clients" + 20-year banking CV | Mixed | `/about` credibility (same biographical claim) · `/` philosophy | Medium |
| `specialism.principles` — model-first / governance built in / production by default | No | `/` whatWeDo · site-wide proofFraming · `/recovery-migration` migrationFraming | **High** |
| `teraHelix` — what TeraHelix is + capabilities | **Yes** | None | Keep |
| `competitive` — Bloomberg/MSCI context | **Yes** | None | Keep |
| `outcomes` — smoother workflows, faster insights, governed AI, regulator-credible | No | `/` whatWeDo · `/what-we-deliver` outcomes | **High** |
| `engagement` — diagnostic 30d / sprint 6w / platform 2+ quarters | Mixed | `/what-we-deliver` engagementShapes (Recovery / Platform / M&A) | Medium |
| `disclosure` — independence statement | **Yes** | None | Keep (legal must-have) |
| `cta` | Mixed | Site-wide CTA | Keep |

**Result:** 4 of 9 content blocks restate copy that already lives elsewhere on the site. The S&P-specific spine (hero, teraHelix, competitive, disclosure) is only ~40% of the page weight.

---

## 3. Consolidation recommendations

### Strategy options

**Option A — Slim & link out.** Strip generic blocks. Replace with one-line nods that link to canonical pages (`/about`, `/what-we-deliver`, `/ai-ready-data`). Page becomes shorter, sharper, and S&P-anchored.

**Option B — Keep self-contained.** Gated visitors arrive from an S&P referral and may never browse the rest of the site. Duplication is acceptable.

**Option C — Hybrid (recommended).** Keep the *narrative spine* end-to-end (visitor shouldn't need to leave), but cut duplicated copy down to one-sentence summaries that lean on the canonical pages for anyone who wants the long form. Promote the S&P-specific blocks (TeraHelix, competitive context) — those are currently thin.

### Per-block decisions (Option C)

| Block | Action | Reason |
|---|---|---|
| `hero` | **Keep as-is** | Anchors the entire page |
| `problem` | **Compress to 2 sentences + one statline.** Drop the 3-card grid. | Already on `/` and `/ai-ready-data`; gated visitor doesn't need it re-explained |
| `specialism` (intro paragraph) | **Keep but cut to 3 sentences.** | Important context; current version is 4 sentences and recapitulates `/about` |
| `specialism.principles` (3 cards) | **Cut entirely.** Replace with one line: "Atheryon's delivery method — *Decision-grade data platforms for regulated markets* — applied to S&P client estates." Link to `/how-we-work`. | These principles are sitewide and weaken when restated |
| `teraHelix` | **Expand.** Add concrete examples of what TeraHelix-backed integration looks like (one diagram or numbered example). This is the unique value block; it's currently the same length as the generic blocks. | The S&P-specific spine should be the heaviest content, not equal-weight |
| `competitive` | **Keep.** Maybe tighten one sentence. | Sharpest unique block |
| `outcomes` | **Cut to 4 bullets, no surrounding copy.** Rename badge "What changes for your clients" (currently identical to homepage). | Single-screen list is fine; current intro is filler |
| `engagement` | **Keep but rename to S&P-specific names.** "S&P Integration Diagnostic" / "S&P Data Sprint" / "S&P Data Platform Engagement". | Differentiates from `/what-we-deliver` shapes which are vendor-agnostic |
| `disclosure` | **Keep verbatim.** | Legal |
| `cta` | **Keep.** | Standard |

### Net effect (Option C)

- Page length drops ~30%.
- S&P-specific content (TeraHelix + competitive + named engagements) becomes the visible majority.
- Generic positioning gets one-line summaries with links to canonical pages.
- `/integration` becomes coherent with the rest of the site instead of duplicating it.

---

## 4. Link strategy — what /integration outbound-links to

The page is gated, so outbound links go to **public pages**. From `/integration`, link out to:

| /integration block | Link target | Anchor text |
|---|---|---|
| Specialism (intro) | `/about` | "Senior practitioners — see Atheryon's full credentials" |
| Specialism (principles → cut) | `/how-we-work` | "How we deliver" |
| Outcomes | `/what-we-deliver` | "Detailed engagement outcomes" |
| TeraHelix capabilities (AI-ready foundations bullet) | `/ai-ready-data` | "Why AI fails on ungoverned data" |
| Engagement modes | `/what-we-deliver#engagement-shapes` | "Standard engagement shapes" |

Inbound to `/integration`: **none from public site** (gated). Access happens via direct URL share or post-login redirect.

---

## 5. Broader IA observations (out of scope for this PR but worth noting)

1. **`/what-we-deliver` is buried.** It's the natural landing page for "what does engaging Atheryon look like" — should be in main nav or Services dropdown.
2. **`/ai-ready-data` is footer-only.** AI is the buying motion right now; this page should be one click from anywhere. Consider promoting to main nav.
3. **`/cdm-platform` reads as a product page, not a service.** Worth a separate review on whether it sits inside Services or breaks out as its own top-level.
4. **No "industry" page.** /integration is the first page that targets a specific institutional context (S&P clients). If this pattern repeats (e.g., LSEG clients, Bloomberg clients) we'll want a `/clients` or `/partners` IA pattern, not ad-hoc gated pages.

---

## 6. Recommended next actions

If accepted:

1. Implement Option C edits to `pages.integration` in `src/content/site.ts` and `src/app/integration/page.tsx`.
2. Add the 5 outbound links from §4.
3. Expand the `teraHelix` block with one concrete example or visual.
4. Rename engagement modes to S&P-prefixed names.
5. Re-run build, regenerate PDF from updated `pitch-deck.md`, eyeball the page in dev.

Estimated scope: ~30 minutes of edits, mostly in `site.ts`.
