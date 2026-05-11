# IA Issues Triage & Sequencing Roadmap — Design

**Date:** 2026-05-11
**Source:** `docs/ia-issues.md` (22 issues from the 2026-05-11 IA review, branch `claude/review-site-ia-seBMs`, merged via PR #17)
**Brainstorming partner critique:** Codex consult, session `019e154b-2dd9-79b3-8f0e-e4c0cbcb5775`
**Goal:** Convert 22 raw IA/content issues into a coherent execution roadmap of nine bundles across four waves, optimised for parallel-agent execution on feature branches, ranked under a brand/credibility positioning lens.

---

## 1. Framing

### Site role (next 2–3 months)
The Atheryon website's primary job is **brand and credibility positioning** — passing the CRO-trust test ("would a senior decision-maker trust these people"). Not inbound lead generation, not direct sales-pitch support. This frame drives every priority call below.

### Execution model
Parallel agents on feature branches. Optimise for branch isolation; accept minor narrative incoherence between PRs (and reconcile in a deliberate editorial pass at the end).

### Issues dropped from this roadmap
- **Issue 16** (blog / insights hub) — not credibility-critical at this time horizon.

Issues 15 and 17 from the source doc were initially dropped, then **reinstated in re-scoped form** (see §2) on Codex's argument that buyer-objection handling and engagement-model clarity are credibility-adjacent even if generic SEO-FAQ and price-range publication are not.

### Priorities
The P0–P3 ranking in `docs/ia-issues.md` was generic and not trusted for this roadmap. All 22 issues were re-ranked under the credibility lens, then bundled.

---

## 2. Re-prioritised issue list

21 issues across four tiers.

| Tier | Issues | Notes |
|---|---|---|
| **Wave 0 (gating)** | 21 (logo/stats verification) | Promoted from P3. Subsumed into the claims ledger. Must complete before B2 or B6 can run. |
| **High** | 1, 7, 8, 9, 10, 12, 18, 19 | 18 (define Reference Architectures) and 19 (Labs positioning) promoted from P2 — both are proof-mechanism credibility, not clarity polish. |
| **Medium** | 2, 3, 4, 5, 6, 13, 14, 17, 20, 22 | 14 and 22 demoted from doc's P2/P3 boundary per Codex (form already works; acronyms are buying-committee aid, not core credibility). 17 reinstated as engagement-model-clarity (not pricing publication). |
| **Low** | 11, 15 | 15 reinstated as 2–3 pointed buyer objections per major service, not generic FAQ. |

### Re-ranking rationale (notable moves)
- **21 → Wave 0.** If named logos or headline stats are not real or not approved for use, every downstream credibility win is moot. Verification is the gate, not an afterthought.
- **8 → High.** "Senior practitioners" is Atheryon's central differentiator. No team profiles on `/about` directly contradicts the claim.
- **7 → High.** Service pages assert outcomes (50+ programs recovered, etc.) with no named proof. Either anonymised cases land here, or the claims soften.
- **18 → High.** Site leans on "artefacts, not claims." If the artefact (Reference Architecture) is undefined, the proof mechanism is undefined.
- **19 → High.** Labs reads ambiguously as demo / product / credibility prop / distraction. Ambiguity weakens the brand story.
- **14 → Medium.** Helps buying committees. Not core credibility unless the "regulator-credible" claim itself is at stake (handled in 12).
- **22 → Medium.** `/contact` already has a real Formspree form; remaining issue is region/time-zone copy.
- **17 reinstated.** No price ranges, but copy explaining how engagements start, typical shapes, decision process, why pricing is bespoke. CRO trust includes "I know what working with you looks like."
- **15 reinstated.** Lean, 2–3 buyer objections per major service. Not SEO-FAQ sludge.

---

## 3. Bundle definitions

Nine bundles. Each is sized to one PR / one agent.

### B0 — Claims ledger (Wave 0, sequential, you only)
**Issues:** 21 (verification phase — implementation moves to B2)
**Output:** `docs/claims-ledger.md` plus `docs/site-vocabulary.md` (or appended).
**Work:** Catalog every named client, logo, headline stat, credential, case claim, regulatory claim currently on the site. For each, mark verdict: `approved` (keep as-is), `anonymise` (use generic descriptor), `soften` (reduce specificity), or `remove`. Also produce canonical phrasings for service names, jargon, CTAs, and proof language — this is the vocabulary contract every Wave 1+ agent reads before editing.
**Blocker:** You. No code yet.
**Why first:** Without this, B2 and B6 invent reality. Agents preserve dubious claims, replace inconsistently, or produce polished pages that still fail the CRO-trust test.
**Note on Issue 21:** This issue spans two bundles by design — B0 produces verdicts (decision artifact, no code), B2 applies them (code rewrite). Do not double-count.

### B1 — Site hygiene
**Issues:** 1 (broken `/privacy` and `/terms`), 2 (sitemap mismatch), 22 (contact form region copy)
**Files:** NEW `src/app/privacy/page.tsx`, NEW `src/app/terms/page.tsx`, `public/sitemap.xml`, `src/app/contact/page.tsx`, `src/content/site.ts` (footer region, `pages.contact`)
**Blocker:** None
**Wave:** 1, parallel

### B2 — Proof rewrite
**Issues:** 21 (implementation)
**Files:** `src/components/ClientLogos.tsx`, `src/components/CaseStudy.tsx`, `src/content/site.ts` everywhere proof claims appear — footer trust strip, hero, `pages.about`, `pages.labs`, service pages, homepage stats
**Blocker:** B0 complete and merged
**Wave:** 1, parallel
**Sizing risk:** Heaviest bundle. If the claims ledger produces 50+ change sites, this may need to split during execution.

### B3a — Jargon copy
**Issues:** 9 (define CDM), 10 (Bronze/Silver/Gold worked example), 12 (define "regulator-credible"), 14 (regulator acronyms), 18 (define Reference Architectures)
**Files:** `src/content/site.ts` (`pages.cdmPlatform`, `pages.referenceArchitectures`, `pages.howWeWork`, acronym strings)
**Blocker:** None (consumes B0 vocabulary contract)
**Wave:** 1, parallel
**Note:** Copy-only edits. No new components.

### B3b — Tooltip / `<abbr>` UI affordance
**Issues:** 14 (UI portion of acronym handling)
**Files:** NEW `src/components/Tooltip.tsx` (or `<abbr>` styling in `globals.css`), site.ts wrap usage at acronym first-mentions
**Blocker:** B3a (needs the definitions to exist before wrapping them)
**Wave:** 1, sequential after B3a

### B5 — IA migration + Labs positioning + engagement model
**Issues:** 3 (orphaned `/what-we-deliver` — keep or delete decision), 4 (services dropdown gaps), 5 (overlapping top-nav buckets), 6 (cross-linking dead-ends), 17 (engagement-model clarity), 19 (Labs positioning)
**Files:** `src/components/Header.tsx` (currently hard-codes `mainNav`), `src/components/Footer.tsx`, `src/content/site.ts` (`nav`, `servicesNav`, Labs copy, engagement-model copy, taxonomy unification), NEW `src/components/RelatedLinks.tsx`, 6 service `page.tsx` files
**Blocker:** You — taxonomy decision and engagement-model copy. Then sequential agent work.
**Wave:** 2
**Scope note:** This bundle absorbs three concerns because all three share the same blocker (your decisions) and intersect — the taxonomy decides where Labs sits; engagement-model copy is service-page copy that the taxonomy reshapes. **Header.tsx, site.ts `nav`, site.ts `servicesNav`, and Footer.tsx today represent three separate nav models**; B5's first sub-task is to unify them into a single taxonomy contract before migrating rendering.

### B6 — Credibility content + FAQ-lite
**Issues:** 7 (case studies on service pages), 8 (team bios on `/about`), 15 (2–3 buyer objections per major service)
**Files:** `src/app/about/page.tsx`, service `page.tsx` files, `src/components/CaseStudy.tsx`, `src/content/site.ts` (`pages.about`, service-page sections, new FAQ-lite sections)
**Blocker:** B0 (proof verdicts) + you (bios, headshots, anonymised case content, objection answers)
**Wave:** 2, parallel with B5

### B7 — Page clarity cleanup
**Issues:** 11 (MiB acronym expansion), 13 (plain-English subheadings under service hero headlines)
**Files:** `src/content/site.ts`, service `page.tsx` files, `src/app/programs/**`
**Blocker:** B5 (subheadings reference final taxonomy names)
**Wave:** 3, sequential

### B4 — SEO metadata audit
**Issues:** 20
**Files:** All `src/app/**/page.tsx` metadata exports, `src/app/layout.tsx`
**Blocker:** B5 and B7 (metadata should reflect final positioning and taxonomy)
**Wave:** 3, sequential after B7
**Timing rationale:** Codex's pushback — metadata that ships in Wave 1 would be invalidated by Wave 2 taxonomy changes and Wave 3 subheading copy.

### B8 — Editorial integration pass
**Issues:** None directly. Closes the roadmap.
**Files:** All public pages
**Work:** Read every public page in order. Fix vocabulary drift across bundles. Enforce consistent service names, jargon, CTAs, proof phrasing. File follow-up issues for anything outside scope rather than expand.
**Blocker:** B1–B7 all merged
**Wave:** 3, sequential, final

---

## 4. Wave DAG

```
WAVE 0 — you only, sequential, ~1 day
└── B0: Claims ledger + vocabulary contract       (no code; source-of-truth docs)

       ↓ B0 merged

WAVE 1 — 3 parallel agents
├── B1: Site hygiene                              (independent)
├── B2: Proof rewrite                             (consumes B0)
└── B3a: Jargon copy                              (independent, consumes B0 vocab)
     ↓
     B3b: Tooltip UI                              (sequential after B3a within wave)

       ↓ wave 1 merged

WAVE 2 — 2 parallel agents
├── B5: IA migration + Labs + engagement model    (blocked on your decisions, sequential agent)
└── B6: Credibility content + FAQ-lite            (consumes B0 + your bios/cases/objections)

       ↓ wave 2 merged

WAVE 3 — sequential, 1 agent
└── B7 (clarity) → B4 (SEO metadata) → B8 (editorial integration)
```

**Critical path:** B0 → B2 → B6 → B8. Your content provisioning (claims-ledger verdicts, taxonomy decision, bios, cases, objection answers, engagement-model copy) is the long pole. Agents are fast; you are the bottleneck. Front-load content prep during B0 wherever possible.

**Estimated timeline (rough):**
- Wave 0: ~1 day of your time.
- Wave 1: 1 working session, ~90 min wall-clock with 3 agents in parallel.
- Wave 2: 2–4 days depending on content production speed.
- Wave 3: ~2 hours total.

---

## 5. File-conflict strategy

`src/content/site.ts` is a single nested object touched by B1, B2, B3a, B5, B6, B7. Naive parallelisation produces constant merge conflicts and semantic drift.

### Hotspot map

| File | Touched by | Conflict severity |
|---|---|---|
| `src/content/site.ts` | B1, B2, B3a, B5, B6, B7 | High |
| `src/components/Footer.tsx` | B1 (footer links), B5 (footer taxonomy) | Medium |
| `public/sitemap.xml` | B1 (cleanup), B5 (potentially new routes) | Low |
| `src/components/CaseStudy.tsx` | B2 (homepage stats), B6 (service cases) | Medium |
| All `src/app/**/page.tsx` | B4 metadata + B3a/B5/B6/B7 content | Low |
| NEW components (Tooltip, RelatedLinks) | B3b, B5 | None |

### Known intra-wave overlaps
- **Wave 1: B2 ∩ B3a on `pages.cdmPlatform` and `pages.referenceArchitectures`.** B2 rewrites proof claims, B3a adds definitions. Same parent key, different child keys — mergeable if commits stay surgical.
- **Wave 2: B5 ∩ B6 on service-page sections.** B5 may rename services or move pages; B6 adds case studies and FAQ-lite. Sequence within wave if conflicts surface.

### Three mitigation rules

1. **Vocabulary contract from B0.** Beyond verdicts on individual claims, B0 outputs canonical service names, jargon phrasings, CTA language, and proof language. Every Wave 1+ agent reads it before editing. This is the fix for Codex's narrative-drift point.

2. **Region ownership declared in agent prompts.** Each agent's prompt names the specific `pages.*` keys they own. Example for B3a: "You own `pages.cdmPlatform.whatItIs`, `pages.referenceArchitectures.medallionExample`, `pages.howWeWork.regulatorCredible`, and the acronym string lists. Do not edit any other key in `site.ts`." Different child keys under a shared parent merge cleanly.

3. **Surgical commits, merge-first-wins.** Each agent commits one key-path per commit. Within a wave, first agent to ship merges to main; subsequent agents rebase and resolve. No batched unrelated edits.

### What this still does not fix
- **Semantic drift across bundles.** If B2 removes a "Microsoft Partner" claim per the ledger, B3a's branch may still reference the claim in a sentence. Mechanical rebase will not catch this. Mitigation: B3a's prompt explicitly says "do not introduce new proof claims; if you need to reference one, check the vocabulary contract." The B8 editorial pass is the final safety net.
- **Renames mid-flight.** If B3a renames a site.ts key while B3b assumes the old name, B3b breaks. Mitigation: B3b sequential after B3a (already in DAG).

---

## 6. Execution recipe

### Branch naming
```
feat/ia-bundle-<ID>-<short-name>
```
Examples: `feat/ia-bundle-b1-site-hygiene`, `feat/ia-bundle-b3a-jargon-copy`, `feat/ia-bundle-b5-ia-migration`.

### Per-bundle agent prompt template

Every spawned agent starts with the same five-step shape. Pre-flight (steps 1–2) is mandatory because the site is being updated in parallel and the spec may have drifted since the bundle was written.

```
You are implementing IA roadmap bundle <ID> — <name>.

1. PRE-FLIGHT: VERIFY CURRENT STATE
   The site is being updated in parallel. Before any edit:
   - Run `git fetch origin && git log origin/main..HEAD --oneline` to confirm
     your branch's base.
   - Run `git diff origin/main -- <files in your scope>` to see what already
     changed on main since the spec was written.
   - Re-read every file in your declared scope (listed below).
   - Re-read `docs/ia-issues.md` for your assigned issue numbers. If an
     issue has already been resolved on main, mark it RESOLVED in the PR
     description and skip it.
   - Re-read `docs/claims-ledger.md` and `docs/site-vocabulary.md` (from B0).
     These are your source of truth for proof claims and canonical language.

2. SCOPE CONFIRMATION
   You own these and ONLY these:
   - Files: <list>
   - In src/content/site.ts: keys <pages.foo.bar, pages.baz.*>
   Do not edit any other site.ts key. If you discover work requiring edits
   outside this scope, STOP and report — do not silently expand.

3. IMPLEMENT
   Resolve issues <#N, #M, #P> per the acceptance criteria in ia-issues.md.
   Commit each key-path as a separate atomic commit (surgical edits — see
   §5 conflict strategy).

4. VERIFY
   - `npx next build` — must pass (typecheck + static build).
   - For UI-affecting bundles: `npx next dev` and inspect changed pages.
   - For B4 (SEO metadata): inspect generated <head> for each route.

5. SHIP
   - Push to `feat/ia-bundle-<ID>-<short-name>`.
   - Open PR titled `feat(ia): <bundle name> [B<ID>]`.
   - PR body lists: issues resolved, files touched, claims-ledger entries
     consumed, anything found RESOLVED during pre-flight.
   - Request review from abigail-atheryon.

If pre-flight finds your scope assumptions broken (file moved, key renamed,
issue already fixed, claims-ledger says to remove something that is not
present), STOP and report. Do not improvise.
```

### Wave-by-wave execution order

| Wave | Step | Mode |
|---|---|---|
| 0 | B0: claims ledger + vocabulary contract | You, sequential, no agent |
| 1 | Spawn B1, B2, B3a as 3 parallel agents on separate branches | Parallel |
| 1 | After B3a merged: spawn B3b | Sequential |
| 2 | After Wave 1 merged: you produce taxonomy decision (for B5) and bios/cases/objection answers (for B6). These can land at different times. | You |
| 2 | Spawn B5 as soon as taxonomy decision is ready. Spawn B6 as soon as content is ready. They run in parallel if both unblock together; otherwise spawn whichever unblocks first. | Parallel where possible |
| 3 | After Wave 2 merged: spawn B7 → B4 → B8 sequentially | Sequential |

### Cleanup between waves
After every wave merges:
- `git checkout main && git pull`
- Delete merged feature branches locally and on remote
- Confirm `npx next build` passes on main
- Then proceed to next wave

### Failure recovery
- **Agent reports SCOPE BROKEN** → re-issue prompt with corrected scope, or split the bundle.
- **Build fails post-merge** → revert the merge commit; the responsible bundle re-opens its PR.
- **Vocabulary drift detected in B8** → B8 fixes inline. If the fix balloons B8's scope, file a follow-up issue rather than expand the bundle.

---

## 7. Open risks (un-mitigated)

1. **B2 sizing.** If the claims ledger surfaces 50+ change sites across the site, B2 becomes too large for one agent. Mitigation deferred — split during execution if needed.
2. **Your content production speed.** Wave 2 cannot start until you produce taxonomy decisions, bios, cases, objection answers, and engagement-model copy. This is the critical path. Front-loading prep during Wave 0/1 is the lever.
3. **Concurrent main updates.** Other work on main during this roadmap may invalidate bundle scope. Pre-flight per bundle catches the obvious cases; semantic conflicts may still slip through to B8.
4. **Codex disagreed-with calls.** Two calls were taken against Codex's recommendation (Issue 22 demoted further; Issue 14 staying Medium not Low). If subsequent work reveals either was the wrong call, re-bundle inside Wave 3.

---

## 8. Next step

Hand off to `superpowers:writing-plans` to produce a detailed implementation plan for execution. The plan should specify, per bundle: full agent prompt with file scope and `pages.*` key ownership, verification commands, PR title and body template, and merge-order constraints.
