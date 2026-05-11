# IA Issues Triage Roadmap — Implementation Plan

> ## SCOPE NARROWED 2026-05-11 — upstream IA pivot
>
> Between this plan being written and execution starting, 65+ commits landed on `main` that significantly restructured the site IA. Eight legacy routes were deleted (`/how-we-work`, `/reference-architectures`, `/cdm-platform`, `/recovery-migration`, `/m-and-a-execution`, `/capability-enablement`, `/ai-ready-data`, `/what-we-deliver`) and replaced with a new pillar structure (`/reality`, `/data`, `/ai-direction`, `/transformation`, `/labs/themes`).
>
> Most of this plan was designed against the deleted route structure and is therefore **obsolete as-written**.
>
> **Bundles still relevant against current main:**
> - **B1 — Site hygiene** (privacy/terms still missing; sitemap needs re-audit against new routes; contact-form region copy still valid)
> - **B4 — SEO metadata audit** (applies to whatever routes exist; was already designed to come last)
> - **B8 — Editorial integration pass** (still useful as a final consistency sweep)
>
> **Bundles deferred / obsoleted:** B0 (claims ledger applies to a snapshot of the pre-pivot site), B2 (proof rewrite targets, B3a (jargon pages deleted), B3b (depends on B3a), B5 (IA was rewritten upstream — needs fresh review), B6 (service pages deleted), B7 (subheadings target deleted pages).
>
> Any future re-attempt at the full roadmap should start with a fresh IA review against current main, not reuse this plan.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the nine-bundle IA roadmap from `docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md` — produce Wave 0 source-of-truth docs, then spawn and merge agent-implemented bundles across three waves to resolve 21 IA/content issues.

**Architecture:** Orchestrator-driven execution. The orchestrator (Abigail or a Claude session) runs Wave 0 work directly, then spawns parallel sub-agents on persistent feature branches per wave. Each sub-agent owns a declared file/key scope; concurrent edits to `src/content/site.ts` are coordinated via region ownership and a shared vocabulary contract. The plan terminates when B8's editorial pass merges.

**Tech Stack:** Next.js 14 App Router (static export), TypeScript, content centralised in `src/content/site.ts`, components in `src/components/`, public pages under `src/app/`. Builds via `npx next build`; dev server `npx next dev`. Persistent feature branches per [CLAUDE.md] parallel-agents guidance; merge to `main` via GitHub PR with review from `abigail-atheryon`.

---

## Artifacts produced

| Artifact | Produced by | Path |
|---|---|---|
| Claims ledger | Wave 0 (orchestrator) | `docs/claims-ledger.md` |
| Vocabulary contract | Wave 0 (orchestrator) | `docs/site-vocabulary.md` |
| IA taxonomy decision | Wave 2 prep (orchestrator) | `docs/ia-taxonomy-decision.md` |
| Engagement-model copy | Wave 2 prep (orchestrator) | `docs/engagement-model-copy.md` |
| Bios + case content | Wave 2 prep (orchestrator) | `docs/credibility-content/` directory |
| PRs B1, B2, B3a, B3b | Wave 1 agents | `feat/ia-bundle-*` branches |
| PRs B5, B6 | Wave 2 agents | `feat/ia-bundle-*` branches |
| PRs B7, B4, B8 | Wave 3 agents | `feat/ia-bundle-*` branches |

---

## site.ts key ownership map (referenced by bundles)

`src/content/site.ts` structure (line ranges approximate, re-verify in pre-flight):
- `nav` (top-level array) — B5 owns
- `servicesNav` (top-level array) — B5 owns
- `cta`, `copy` (top-level) — B2 owns (proof phrasings live here)
- `pages.home` — B2 (stats), B6 (proof composition)
- `pages.howWeWork` — B3a (regulator-credible definition)
- `pages.recoveryMigration`, `pages.capabilityEnablement`, `pages.maExecution` — B6 (cases + FAQ-lite), B7 (subheadings)
- `pages.cdmPlatform` — B3a (CDM definition), B6 (case + FAQ-lite), B7 (subheading)
- `pages.whatWeDeliver` — B5 (engagement-model copy if expanded here, or new dedicated section)
- `pages.referenceArchitectures` — B3a (B/S/G example + RA definition), B7 (subheading)
- `pages.aiReadyData` — B6 (case + FAQ-lite), B7 (subheading)
- `pages.about` — B6 (team bios), B2 (proof claims if any)
- `pages.contact` — B1 (form region copy)
- `pages.programs`, `pages.mibInsight` — B7 (MiB expansion)
- `pages.labs` — B5 (Labs positioning), B2 (proof claims)
- `footer.description`, `footer.links`, `footer.legal` — B1 (legal links), B5 (footer taxonomy alignment)

---

## Task 1: Wave 0 — Claims ledger

**Files:**
- Create: `docs/claims-ledger.md`

- [ ] **Step 1: Inventory every named claim on the site**

Run a grep pass to surface candidate claims:

```bash
grep -nE 'Microsoft Partner|S&P|Bloomberg|MSCI|tier.one|20.year|two decades|50\+|programs recovered|senior practitioner|regulator-credible|ISDA|FpML|CFTC|EMIR|MAS|JFSA|HKMA|ASIC|FCA|OSFI' src/content/site.ts
```

Also inspect rendered images: `ls public/` and identify any client logos.

- [ ] **Step 2: Create the ledger file**

Create `docs/claims-ledger.md` with this exact structure:

```markdown
# Atheryon Claims Ledger

**Date:** 2026-05-11
**Purpose:** Source of truth for every named client, logo, headline stat, credential, case claim, and regulatory claim on atheryon.com.au. Consumed by B2 (proof rewrite) and B6 (credibility content).

## Verdicts
- `approved` — keep as-is, verified accurate
- `anonymise` — replace with generic descriptor (e.g. "tier-one investment bank")
- `soften` — keep direction, reduce specificity (e.g. "20 years" → "two decades of senior delivery")
- `remove` — delete from the site entirely

---

## Named clients

| Claim | Where it appears | Verdict | Replacement copy if not `approved` |
|---|---|---|---|
| [example: "Microsoft Partner"] | [example: src/content/site.ts pages.cdmPlatform line N] | TBD | TBD |

## Logos

| Logo file | Client | Verdict | Replacement |
|---|---|---|---|
| [public/logos/...] | TBD | TBD | TBD |

## Headline stats

| Stat | Where it appears | Verdict | Replacement |
|---|---|---|---|
| ["50+ programs recovered"] | [src/components/...] | TBD | TBD |
| ["20 years of markets knowledge synthesised"] | [...] | TBD | TBD |

## Credentials / regulatory claims

| Claim | Where it appears | Verdict | Replacement |
|---|---|---|---|

## Case-study claims

| Claim | Where it appears | Verdict | Replacement |
|---|---|---|---|
```

- [ ] **Step 3: Fill in verdicts**

Manually walk through every grep hit from Step 1. For each claim, fill in the verdict and replacement copy. This is decision work, not code. Do not skip rows — every named claim must have a verdict before Wave 1 starts.

- [ ] **Step 4: Commit**

```bash
git add docs/claims-ledger.md
git commit -m "docs(ia): wave 0 claims ledger — proof verdict source of truth"
```

---

## Task 2: Wave 0 — Vocabulary contract

**Files:**
- Create: `docs/site-vocabulary.md`

- [ ] **Step 1: Create the vocabulary contract**

Create `docs/site-vocabulary.md`:

```markdown
# Atheryon Site Vocabulary Contract

**Date:** 2026-05-11
**Purpose:** Canonical names and phrasings every agent reads before editing `src/content/site.ts`. Prevents narrative drift across parallel bundles.

## Service names (canonical, do not paraphrase)

| Use this | Not this |
|---|---|
| CDM Platform | Canonical Data Model service / CDM service |
| Recovery & Migration | Data Recovery / Programme Recovery |
| Capability Enablement | Skills Transfer / Training |
| M&A Execution | Mergers & Acquisitions |
| AI-Ready Data | AI Readiness / Data for AI |
| Reference Architectures | Architecture Patterns / Blueprints |
| Labs | Atheryon Labs / The Labs |
| MiB Insight Program | Market-in-a-Box Program / MiB Program |

## Jargon definitions (canonical first-use phrasing)

| Term | First-use phrasing |
|---|---|
| Canonical Data Model (CDM) | A single shared definition of every business concept — so "trade" means the same thing in trading, ops, risk, and compliance. |
| Bronze / Silver / Gold (medallion pattern) | A staged data pipeline. **Bronze:** raw feed as ingested. **Silver:** standardised, deduplicated, validated. **Gold:** governance-tracked, ready for regulatory reporting. |
| regulator-credible | [TBD: fill in canonical definition during Wave 0] |
| Reference Architecture | [TBD: fill in — is it a diagram, downloadable template, engagement artefact, or live platform module?] |

## CTAs (use verbatim)

- Primary: "Request a confidential discussion"
- Secondary: "Read the engagement shapes"
- Tertiary: "See how we work"

## Proof phrasings (after B0 verdicts applied)

[Auto-derived from claims-ledger.md `approved` rows. Fill in after the ledger is complete.]

## Tone guardrails

- No marketing fluff: "transformative", "unlock", "synergy", "robust", "comprehensive".
- Plain English under every jargon-heavy heading.
- Active voice. Concrete subjects.
- No promise of outcomes Atheryon hasn't actually delivered.
```

- [ ] **Step 2: Fill in the TBD rows**

Decide the canonical definition of "regulator-credible" (lineage / audit trails / signed controls — pick one operational definition). Decide what a Reference Architecture actually is.

- [ ] **Step 3: Fill in proof phrasings**

Once the claims ledger has verdicts, copy `approved` proof phrasings into the proof phrasings table.

- [ ] **Step 4: Commit**

```bash
git add docs/site-vocabulary.md
git commit -m "docs(ia): wave 0 vocabulary contract — canonical names and phrasings"
```

---

## Task 3: Wave 1 — Create persistent feature branches

**Files:** (no file changes — branch ops only)

- [ ] **Step 1: Pull main**

```bash
git checkout main && git pull
```

- [ ] **Step 2: Create the three Wave 1 branches**

```bash
git checkout -b feat/ia-bundle-b1-site-hygiene && git push -u origin feat/ia-bundle-b1-site-hygiene
git checkout main
git checkout -b feat/ia-bundle-b2-proof-rewrite && git push -u origin feat/ia-bundle-b2-proof-rewrite
git checkout main
git checkout -b feat/ia-bundle-b3a-jargon-copy && git push -u origin feat/ia-bundle-b3a-jargon-copy
git checkout main
```

- [ ] **Step 3: Verify branches exist on remote**

```bash
git ls-remote --heads origin 'feat/ia-bundle-b*'
```

Expected: three lines listing b1, b2, b3a branches.

---

## Task 4: Wave 1 — Spawn B1 (Site hygiene) agent

**Files:** (agent spawn — no orchestrator file changes)

- [ ] **Step 1: Spawn the B1 agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree` (so the agent works in an isolated worktree on its branch). Prompt:

```
You are implementing IA roadmap bundle B1 — Site hygiene.

Branch: feat/ia-bundle-b1-site-hygiene (already created on remote — check it out)
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issues: docs/ia-issues.md (issues 1, 2, 22)
Source of truth: docs/claims-ledger.md, docs/site-vocabulary.md

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b1-site-hygiene && git pull
   - git log origin/main..HEAD --oneline (confirm base)
   - git diff origin/main -- src/app/contact public/sitemap.xml src/content/site.ts
   - Re-read: docs/ia-issues.md (issues 1, 2, 22), docs/claims-ledger.md, docs/site-vocabulary.md
   - For each of issues 1, 2, 22: confirm the described problem still exists on main. If resolved, mark RESOLVED in PR description and skip.

2. SCOPE — you own and only own:
   - Files: NEW src/app/privacy/page.tsx, NEW src/app/terms/page.tsx, public/sitemap.xml, src/app/contact/page.tsx
   - In src/content/site.ts: keys `pages.contact.*`, `footer.legal.*`, and `footer.links.*` entries for privacy/terms only
   Do not edit any other site.ts key. If scope expansion is required, STOP and report.

3. IMPLEMENT (per ia-issues.md acceptance criteria)
   - Issue 1: Create /privacy and /terms pages with real Privacy Policy and Terms of Service content. Add both to src/content/site.ts pages mapping if your site uses one. Confirm footer.legal links resolve.
   - Issue 2: In public/sitemap.xml replace `/mergers-acquisitions/` with `/m-and-a-execution/`. Audit every <loc> entry against actual src/app/ routes. Add missing entries for /programs, /programs/mib-insight, /cdm-platform, /privacy, /terms.
   - Issue 22: Verify src/app/contact/page.tsx has a working form (Formspree per recent commits). In site.ts pages.contact, add a geographic-coverage statement (e.g. "Sydney, Australia — supporting clients across AU, APAC, and EMEA timezones"). Use language from docs/site-vocabulary.md.

   Commit each issue as a separate atomic commit.

4. VERIFY
   - npx next build (must pass)
   - npx next dev — visit /privacy, /terms, /contact, view footer on / — verify all four are accessible and styled consistently with the rest of the site.

5. SHIP
   - git push
   - gh pr create --base main --head feat/ia-bundle-b1-site-hygiene --title "feat(ia): site hygiene [B1]" --body "Resolves issues #1 (privacy/terms), #2 (sitemap), #22 (contact region coverage). See docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md §3.B1."
   - Request review from abigail-atheryon

If pre-flight reveals scope drift, STOP and report. Do not improvise.
```

- [ ] **Step 2: Note the spawned agent ID**

Save the agent ID printed by the Agent tool call. You will need it for status checks.

---

## Task 5: Wave 1 — Spawn B2 (Proof rewrite) agent

- [ ] **Step 1: Spawn the B2 agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B2 — Proof rewrite.

Branch: feat/ia-bundle-b2-proof-rewrite (already created on remote)
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issue: docs/ia-issues.md issue 21
Source of truth: docs/claims-ledger.md (REQUIRED — gates every change), docs/site-vocabulary.md

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b2-proof-rewrite && git pull
   - Confirm docs/claims-ledger.md exists on main. If missing, STOP — B0 not complete.
   - Re-read docs/claims-ledger.md end to end. The ledger is your work list.
   - git diff origin/main -- src/components/ClientLogos.tsx src/components/CaseStudy.tsx src/content/site.ts

2. SCOPE — you own and only own:
   - Files: src/components/ClientLogos.tsx, src/components/CaseStudy.tsx
   - In src/content/site.ts: every key that contains a named claim per the claims ledger. Likely surfaces: `copy.proofFraming`, `copy.philosophy`, `copy.migrationFraming`, `pages.home.*` stats and trust strips, `pages.about.credentials`, `pages.labs.*` proof claims, service-page proof claims. Use the claims ledger's "Where it appears" column as the authoritative scope list.
   Do not edit `pages.cdmPlatform.whatItIs`, `pages.referenceArchitectures.medallionExample`, `pages.howWeWork.regulatorCredible`, or any key owned by B3a/B5/B6 (see spec §3 ownership map).
   Do not edit `footer.legal` (B1 owns).

3. IMPLEMENT
   For each row in claims-ledger.md:
   - `approved`: no change required. Verify the wording matches docs/site-vocabulary.md proof phrasings.
   - `anonymise`: replace named client with the generic descriptor from the ledger's "Replacement" column.
   - `soften`: reduce specificity per the replacement copy.
   - `remove`: delete the claim entirely. Adjust surrounding sentences for grammar.

   Update ClientLogos.tsx if logos are flagged `remove` or `anonymise`. Update CaseStudy.tsx if its rendered claim is flagged.

   Commit one logical change per commit (e.g. "fix(proof): anonymise tier-one bank reference in pages.about").

4. VERIFY
   - npx next build (must pass)
   - npx next dev — eyeball home, about, labs, every service page. No removed claim should remain visible.
   - grep -nE '<flagged claim text>' src/ public/ — should return zero hits for any `remove` row.

5. SHIP
   - PR title: "fix(ia): proof rewrite per claims ledger [B2]"
   - PR body must include: count of approved/anonymise/soften/remove rows applied, list of grep verification hits (zero expected).
   - Request review from abigail-atheryon.

If the claims ledger has TBD rows, STOP — Wave 0 incomplete. If you find a claim in code that is not in the ledger, STOP and report — ledger gap.
```

- [ ] **Step 2: Note the agent ID**

---

## Task 6: Wave 1 — Spawn B3a (Jargon copy) agent

- [ ] **Step 1: Spawn the B3a agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B3a — Jargon copy.

Branch: feat/ia-bundle-b3a-jargon-copy (already created on remote)
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issues: docs/ia-issues.md issues 9, 10, 12, 14, 18
Source of truth: docs/site-vocabulary.md (REQUIRED — provides the canonical phrasings)

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b3a-jargon-copy && git pull
   - Confirm docs/site-vocabulary.md exists with non-TBD definitions for: CDM, Bronze/Silver/Gold, regulator-credible, Reference Architecture. If any are still TBD, STOP — Wave 0 incomplete.
   - Re-read issues 9, 10, 12, 14, 18 in ia-issues.md
   - git diff origin/main -- src/content/site.ts src/app/cdm-platform src/app/reference-architectures src/app/how-we-work

2. SCOPE — you own and only own:
   - In src/content/site.ts:
     - `pages.cdmPlatform.whatItIs` (or equivalent — add this key if absent, holds the CDM plain-English definition)
     - `pages.referenceArchitectures.medallionExample` (or equivalent — holds the Bronze/Silver/Gold worked example)
     - `pages.referenceArchitectures.whatItIs` (or equivalent — holds the "what is a Reference Architecture" definition)
     - `pages.howWeWork.regulatorCredible` (or equivalent — holds the regulator-credible definition)
     - Any string list of regulatory acronyms (search for `CFTC|EMIR|MAS|JFSA|HKMA|ASIC|FCA|OSFI|ISDA|FpML` to locate)
   - src/app/cdm-platform/page.tsx, src/app/reference-architectures/page.tsx, src/app/how-we-work/page.tsx (to render new definitions if structural changes are required)
   Do not edit any other site.ts key. Do not introduce or edit proof claims (B2 owns those). Do not introduce new components (B3b owns Tooltip).

3. IMPLEMENT (per ia-issues.md acceptance criteria)
   - Issue 9 (CDM): On /cdm-platform and homepage CDM teaser, add a one-sentence plain-English definition using the canonical phrasing from docs/site-vocabulary.md.
   - Issue 10 (B/S/G): On /reference-architectures, add the worked example from the vocabulary contract.
   - Issue 12 (regulator-credible): On homepage and /how-we-work, add the canonical operational definition. Use the same definition wherever the phrase appears elsewhere.
   - Issue 14 (regulator acronyms): On first mention of each acronym in site.ts, expand it (e.g. "CFTC (US Commodity Futures Trading Commission)"). Mark the first-mention key with a comment `// first-mention — wrap with <abbr> in B3b`.
   - Issue 18 (Reference Architectures definition): In /reference-architectures hero, add the canonical "what they are" sentence from the vocabulary contract.

   Commit each issue as a separate atomic commit.

4. VERIFY
   - npx next build
   - npx next dev — visit /cdm-platform, /reference-architectures, /how-we-work, / — confirm definitions render in the expected locations.

5. SHIP
   - PR title: "feat(ia): jargon definitions [B3a]"
   - PR body lists resolved issues and the canonical phrasings used.
   - Request review from abigail-atheryon.

If a vocabulary-contract definition is still TBD, STOP — do not invent definitions.
```

- [ ] **Step 2: Note the agent ID**

---

## Task 7: Wave 1 — Verify and merge B1, B2, B3a PRs

**Files:** (no orchestrator file changes — review + merge ops)

- [ ] **Step 1: Wait for all three agents to complete**

Each agent runs in the background. When each finishes it returns a result summary. Note any agent that reports STOP or scope drift — do not merge that PR until the issue is resolved.

- [ ] **Step 2: List the three open PRs**

```bash
gh pr list --state open --search "head:feat/ia-bundle-b1 head:feat/ia-bundle-b2 head:feat/ia-bundle-b3a" --json number,title,headRefName,mergeable
```

- [ ] **Step 3: Review each PR**

For each PR:
- Read the diff: `gh pr diff <number>`
- Verify pre-flight section of PR body: which issues were marked RESOLVED before pre-flight (skip those).
- Verify scope adherence: diff should only touch the files declared in the agent's scope. Flag any out-of-scope edits.
- Verify build passed in CI (or pull locally and run `npx next build`).

- [ ] **Step 4: Merge in conflict-safe order**

Merge B1 first (no site.ts conflict risk with others):

```bash
gh pr merge <B1 number> --squash --delete-branch
```

Then B3a (smaller site.ts surface than B2):

```bash
gh pr merge <B3a number> --squash --delete-branch
```

Then B2 (largest site.ts surface):

```bash
git checkout feat/ia-bundle-b2-proof-rewrite && git pull
git fetch origin main && git rebase origin/main
# Resolve any conflicts on site.ts surgically
git push --force-with-lease
gh pr merge <B2 number> --squash --delete-branch
```

- [ ] **Step 5: Pull main and verify build**

```bash
git checkout main && git pull
npx next build
```

Expected: build passes. If not, identify the offending bundle, revert its merge, re-open the PR.

---

## Task 8: Wave 1 — Spawn B3b (Tooltip UI) agent

**Files:** (agent spawn)

- [ ] **Step 1: Create B3b branch from updated main**

```bash
git checkout main && git pull
git checkout -b feat/ia-bundle-b3b-tooltip-ui && git push -u origin feat/ia-bundle-b3b-tooltip-ui
git checkout main
```

- [ ] **Step 2: Spawn the B3b agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B3b — Tooltip / <abbr> UI.

Branch: feat/ia-bundle-b3b-tooltip-ui
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Depends on: B3a (must be merged to main first)

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b3b-tooltip-ui && git pull
   - Confirm B3a has merged: grep for `// first-mention — wrap with <abbr> in B3b` comments in src/content/site.ts. If none found, STOP — B3a not merged.
   - Re-read issue 14 in docs/ia-issues.md.

2. SCOPE — you own and only own:
   - NEW src/components/Tooltip.tsx (or extend src/app/globals.css with <abbr> styling — choose one approach)
   - Render-side edits to wrap first-mention acronym strings with the new component/<abbr> tag. Edits to .tsx files only, not to site.ts string content.
   Do not change any site.ts string. Do not introduce new definitions (B3a owns those).

3. IMPLEMENT
   - Decide: <abbr title="..."> tag (minimal, semantic) OR React Tooltip component (richer hover UI).
   - For first-mention acronyms (CFTC, EMIR, MAS, JFSA, HKMA, ASIC, FCA, OSFI, ISDA, FpML, CDM, MiB), wrap with the chosen affordance using the expansion B3a already added in site.ts.
   - Remove the `// first-mention — wrap with <abbr> in B3b` comments after wrapping.

4. VERIFY
   - npx next build
   - npx next dev — hover any wrapped acronym in /cdm-platform or /how-we-work — expansion should display.

5. SHIP
   - PR title: "feat(ia): acronym tooltip UI [B3b]"
   - Request review from abigail-atheryon.
```

- [ ] **Step 3: After agent completes, review and merge**

```bash
gh pr merge <B3b number> --squash --delete-branch
git checkout main && git pull && npx next build
```

---

## Task 9: Wave 1 — Cleanup

- [ ] **Step 1: Verify all Wave 1 branches deleted**

```bash
git fetch --prune
git branch -a | grep ia-bundle-b
```

Expected: zero remote-tracking branches for b1, b2, b3a, b3b.

- [ ] **Step 2: Verify all Wave 1 issues resolved**

```bash
gh issue list --state open --search "in:title IA"
```

Cross-check resolved-issue lists from each merged PR body. File any RESOLVED-but-not-closed GitHub issues with explicit `gh issue close`.

- [ ] **Step 3: Smoke test**

```bash
npx next dev
```

Manually visit: `/`, `/privacy`, `/terms`, `/contact`, `/cdm-platform`, `/reference-architectures`, `/how-we-work`. Look for: broken links, missing definitions, claims that should have been removed, visual breakage. File any findings as new GitHub issues — do not patch inline.

---

## Task 10: Wave 2 prep — Taxonomy decision and content

**Files:**
- Create: `docs/ia-taxonomy-decision.md`
- Create: `docs/engagement-model-copy.md`
- Create: `docs/credibility-content/team-bios.md`
- Create: `docs/credibility-content/case-studies.md`
- Create: `docs/credibility-content/buyer-objections.md`

- [ ] **Step 1: Author the taxonomy decision**

Create `docs/ia-taxonomy-decision.md`:

```markdown
# IA Taxonomy Decision

**Date:** 2026-05-11
**Consumed by:** B5

## Top-nav structure (final)

[List final top-nav items. Decide: are "How We Work", "Programs", "Reference Architectures", "Labs", "About" the right five? Or consolidate?]

## Services dropdown contents (final)

[List final Services dropdown items. Currently: CDM Platform, Recovery & Migration, M&A Execution, Capability Enablement. Decide whether AI-Ready Data, Reference Architectures, Labs, Programs also belong here or in a separate dropdown.]

## /what-we-deliver — keep or delete?

[Decide. If keep: where does it sit in nav? If delete: confirm OK to remove route + sitemap entry.]

## Labs positioning sentence

One sentence under the /labs hero defining what Labs is in relation to Services and Programs. Draft below:

> Labs is [TBD: working reference platform / live demonstration / hosted reference architecture / something else].

## Cross-linking pattern

Every service page links to at least two peer pages and at least one Reference Architecture. List pairings:

| Service page | Linked peers | Linked Reference Architecture |
|---|---|---|
| /cdm-platform | TBD | TBD |
| /recovery-migration | TBD | TBD |
| /capability-enablement | TBD | TBD |
| /m-and-a-execution | TBD | TBD |
| /ai-ready-data | TBD | TBD |
```

Fill in every TBD. This is decision work; do not hand it to an agent.

- [ ] **Step 2: Author the engagement-model copy**

Create `docs/engagement-model-copy.md`:

```markdown
# Engagement-model Copy

**Date:** 2026-05-11
**Consumed by:** B5
**Source issue:** docs/ia-issues.md issue 17 (reinstated as engagement-model-clarity, not pricing)

## How conversations start

[2-3 sentences. What does the first call look like? What does Atheryon need from the prospect?]

## Typical engagement shapes (final-named)

[List the named shapes. Recovery / Migration / Platform / M&A / Capability — or whatever the taxonomy decision settled on.]

## Decision process

[2-3 sentences. From first call to signed engagement, what does the buyer experience? Diagnostic → proposal → engagement?]

## Why pricing is bespoke

[2-3 sentences. Explain *why* there are no price ranges, in a way that signals seriousness, not opacity.]
```

Fill in every section.

- [ ] **Step 3: Author bios**

Create `docs/credibility-content/team-bios.md`:

```markdown
# Team Bios — for /about

**Date:** 2026-05-11
**Consumed by:** B6
**Source issue:** docs/ia-issues.md issue 8

## Founder

**Name:** Abigail Atheryon
**Title:** [TBD]
**Photo:** [TBD — path to headshot in public/team/]
**Bio (2-3 lines):** [TBD]
**LinkedIn:** [TBD]

## Other senior practitioners

[Add 2-5 more profiles if Atheryon has a team. If senior practitioners are a network rather than a roster, write the alternative copy here instead: explain how engagement staffing works.]
```

If Atheryon is intentionally a network of senior practitioners not a fixed team, write the network-model copy here instead.

- [ ] **Step 4: Author case studies**

Create `docs/credibility-content/case-studies.md`:

```markdown
# Case Studies — for service pages

**Date:** 2026-05-11
**Consumed by:** B6
**Source issue:** docs/ia-issues.md issue 7

## /recovery-migration case

**Anonymisation level:** [approved / anonymise / soften per claims-ledger]
**Sector:** [TBD]
**Size:** [TBD]
**Problem:** [TBD]
**What Atheryon did:** [TBD]
**Outcome (named metric):** [TBD]

[Repeat for /capability-enablement, /m-and-a-execution, /cdm-platform, /ai-ready-data]

## If no case content is available
Write the NDA-friendly fallback copy: "Detailed case studies are shared under NDA on request. Contact <CTA>."
```

If no real case content is approvable, write the NDA-friendly fallback for each service page.

- [ ] **Step 5: Author buyer objections**

Create `docs/credibility-content/buyer-objections.md`:

```markdown
# Buyer Objections (FAQ-lite) — for service pages

**Date:** 2026-05-11
**Consumed by:** B6
**Source issue:** docs/ia-issues.md issue 15 (reinstated as 2-3 objections per page, not generic FAQ)

## Per service: 2-3 pointed objections

For each of /recovery-migration, /capability-enablement, /m-and-a-execution, /cdm-platform, /ai-ready-data, draft 2-3 objection-and-answer pairs that a real buyer would have.

### /recovery-migration

**Q:** [TBD: real objection]
**A:** [TBD: real, short, concrete answer]

**Q:** [TBD]
**A:** [TBD]

[Repeat for each service page.]
```

Fill in every objection.

- [ ] **Step 6: Commit all Wave 2 prep docs**

```bash
git add docs/ia-taxonomy-decision.md docs/engagement-model-copy.md docs/credibility-content/
git commit -m "docs(ia): wave 2 prep — taxonomy decision, engagement copy, credibility content"
```

---

## Task 11: Wave 2 — Spawn B5 (IA migration + Labs + engagement) agent

- [ ] **Step 1: Create the B5 branch**

```bash
git checkout main && git pull
git checkout -b feat/ia-bundle-b5-ia-migration && git push -u origin feat/ia-bundle-b5-ia-migration
git checkout main
```

- [ ] **Step 2: Spawn the B5 agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B5 — IA migration + Labs positioning + engagement model.

Branch: feat/ia-bundle-b5-ia-migration
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issues: docs/ia-issues.md issues 3, 4, 5, 6, 17, 19
Source of truth: docs/ia-taxonomy-decision.md (REQUIRED), docs/engagement-model-copy.md (REQUIRED), docs/site-vocabulary.md

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b5-ia-migration && git pull
   - Confirm docs/ia-taxonomy-decision.md and docs/engagement-model-copy.md exist with no TBD entries. If any TBD remains, STOP.
   - git diff origin/main -- src/components/Header.tsx src/components/Footer.tsx src/content/site.ts

2. SCOPE — you own and only own:
   - src/components/Header.tsx
   - src/components/Footer.tsx
   - NEW src/components/RelatedLinks.tsx
   - In src/content/site.ts: `nav`, `servicesNav`, `pages.labs.*` positioning copy, `pages.whatWeDeliver.*` (engagement-model copy lives here), `footer.links.*` taxonomy alignment
   - Service page.tsx files: src/app/recovery-migration/page.tsx, src/app/capability-enablement/page.tsx, src/app/m-and-a-execution/page.tsx, src/app/cdm-platform/page.tsx, src/app/ai-ready-data/page.tsx (to render <RelatedLinks/>)
   Do not edit `pages.cdmPlatform.whatItIs`, `pages.howWeWork.regulatorCredible`, `pages.referenceArchitectures.medallionExample` (B3a owned). Do not edit `pages.about` (B6 owns). Do not edit case-study sections (B6 owns).

3. IMPLEMENT
   - Issue 3: Per the taxonomy decision, either keep /what-we-deliver and add it to nav, or delete the route + sitemap entry.
   - Issue 4: Update servicesNav per the taxonomy decision.
   - Issue 5: Unify top-nav structure per the taxonomy decision. Note: Header.tsx currently hard-codes mainNav AND site.ts has a `nav` array. Migrate to a single source of truth — Header.tsx consumes site.nav. This is the "three nav models become one" sub-task called out in the spec §3.B5.
   - Issue 6: Build src/components/RelatedLinks.tsx. Use the pairings from docs/ia-taxonomy-decision.md "Cross-linking pattern" table. Render on each service page.
   - Issue 17: Add an "Engagement model" section to /what-we-deliver (or wherever the taxonomy decision placed engagement copy) using docs/engagement-model-copy.md verbatim.
   - Issue 19: Add the Labs positioning sentence under /labs hero. Confirm Labs sits in the correct nav location per the taxonomy.

   Commit each issue as a separate atomic commit.

4. VERIFY
   - npx next build
   - npx next dev — visit every nav item, every service page, /labs, /what-we-deliver. Verify nav is consistent across desktop and mobile. Verify RelatedLinks renders on every service page. Verify Labs positioning sentence is visible.

5. SHIP
   - PR title: "feat(ia): nav taxonomy + Labs + engagement model [B5]"
   - PR body lists which routes changed, the unified nav source-of-truth approach, and confirms no out-of-scope edits.
   - Request review from abigail-atheryon.
```

- [ ] **Step 3: Note the agent ID**

---

## Task 12: Wave 2 — Spawn B6 (Credibility content + FAQ-lite) agent

- [ ] **Step 1: Create the B6 branch**

```bash
git checkout main && git pull
git checkout -b feat/ia-bundle-b6-credibility-content && git push -u origin feat/ia-bundle-b6-credibility-content
git checkout main
```

- [ ] **Step 2: Spawn the B6 agent**

Spawn in parallel with B5 if both prep docs are ready. Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B6 — Credibility content + FAQ-lite.

Branch: feat/ia-bundle-b6-credibility-content
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issues: docs/ia-issues.md issues 7, 8, 15
Source of truth: docs/credibility-content/team-bios.md, docs/credibility-content/case-studies.md, docs/credibility-content/buyer-objections.md, docs/claims-ledger.md, docs/site-vocabulary.md

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b6-credibility-content && git pull
   - Confirm all three credibility-content docs exist with no TBD entries. If any TBD remains, STOP.
   - git diff origin/main -- src/app/about src/content/site.ts src/components/CaseStudy.tsx

2. SCOPE — you own and only own:
   - src/app/about/page.tsx
   - src/components/CaseStudy.tsx (extend for service-page reuse if needed)
   - In src/content/site.ts: `pages.about.team` (or equivalent — add this key), case-study sections on `pages.recoveryMigration`, `pages.capabilityEnablement`, `pages.maExecution`, `pages.cdmPlatform`, `pages.aiReadyData`, and FAQ-lite sections on the same five pages
   - Service page.tsx files only to render added case-study / FAQ-lite components, not to modify other content
   Do not edit `nav`, `servicesNav`, `pages.whatWeDeliver` (B5 owns). Do not edit jargon definitions (B3a owned). Do not edit proof claims outside the credibility ledger (B2 owned).

3. IMPLEMENT
   - Issue 8: On /about, render team profiles per docs/credibility-content/team-bios.md. Use a clean grid; headshots from public/team/ (or add placeholders if files missing — DO NOT invent photo paths that don't exist).
   - Issue 7: On each of the five service pages, render a case-study block using content from docs/credibility-content/case-studies.md. If a service's row says "NDA-friendly fallback", use that copy.
   - Issue 15: On each of the five service pages, render a buyer-objections section (2-3 Q/A pairs) using content from docs/credibility-content/buyer-objections.md.

   Commit each issue as a separate atomic commit. Within an issue, commit each service page as its own commit (e.g. "feat(credibility): add /recovery-migration case study").

4. VERIFY
   - npx next build
   - npx next dev — visit /about (bios render), visit each of the five service pages (case-study block + FAQ-lite section both render).
   - Verify no claim in B6 conflicts with claims-ledger verdicts.

5. SHIP
   - PR title: "feat(ia): team bios, case studies, buyer objections [B6]"
   - Request review from abigail-atheryon.
```

- [ ] **Step 3: Note the agent ID**

---

## Task 13: Wave 2 — Verify and merge B5, B6 PRs

- [ ] **Step 1: Wait for both agents to complete**

- [ ] **Step 2: Review each PR**

```bash
gh pr list --state open --search "head:feat/ia-bundle-b5 head:feat/ia-bundle-b6" --json number,title,mergeable
gh pr diff <B5 number>
gh pr diff <B6 number>
```

Verify:
- Each PR only touches the files declared in its scope.
- B5 successfully unified Header.tsx mainNav with site.ts nav (no duplicate source of truth).
- B6 case-study and FAQ-lite content matches the source docs exactly.

- [ ] **Step 3: Merge B5 first (taxonomy is foundational)**

```bash
gh pr merge <B5 number> --squash --delete-branch
git checkout main && git pull
npx next build
```

- [ ] **Step 4: Rebase B6 onto updated main and merge**

```bash
git checkout feat/ia-bundle-b6-credibility-content
git fetch origin main && git rebase origin/main
# Resolve any site.ts conflicts (likely service-page sections where B5 and B6 both edited)
git push --force-with-lease
gh pr merge <B6 number> --squash --delete-branch
git checkout main && git pull && npx next build
```

---

## Task 14: Wave 2 — Cleanup

- [ ] **Step 1: Verify branches pruned**

```bash
git fetch --prune
git branch -a | grep ia-bundle-b
```

- [ ] **Step 2: Smoke test**

```bash
npx next dev
```

Visit every public route. Verify new taxonomy, RelatedLinks on services, team bios on /about, case studies + FAQ-lite on services, engagement-model copy on /what-we-deliver or wherever taxonomy placed it. File any visual or content issues as new GitHub issues.

---

## Task 15: Wave 3 — Spawn B7 (Page clarity cleanup) agent

- [ ] **Step 1: Create the B7 branch**

```bash
git checkout main && git pull
git checkout -b feat/ia-bundle-b7-page-clarity && git push -u origin feat/ia-bundle-b7-page-clarity
git checkout main
```

- [ ] **Step 2: Spawn the B7 agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B7 — Page clarity cleanup.

Branch: feat/ia-bundle-b7-page-clarity
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issues: docs/ia-issues.md issues 11, 13
Source of truth: docs/site-vocabulary.md (canonical service names — must match B5's final taxonomy on main)

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b7-page-clarity && git pull
   - Confirm B5 has merged (look for unified Header.tsx + site.ts nav source-of-truth on main).
   - Re-read issues 11, 13 in ia-issues.md.

2. SCOPE — you own and only own:
   - In src/content/site.ts: subheading copy on `pages.recoveryMigration.subheading`, `pages.capabilityEnablement.subheading`, `pages.maExecution.subheading`, `pages.cdmPlatform.subheading`, `pages.referenceArchitectures.subheading`, `pages.aiReadyData.subheading`, plus MiB expansion strings on `pages.programs.*` and `pages.mibInsight.*`
   - Service page.tsx files only if structural changes are needed to render subheadings
   Do not edit any other content.

3. IMPLEMENT
   - Issue 13: For each of the four jargon-heavy service pages (Capability Enablement, Recovery & Migration, Reference Architectures, AI-Ready Data) plus CDM Platform, add a one-sentence "what this is" subheading directly under the hero headline. Use plain English. No acronyms. Canonical names from docs/site-vocabulary.md.
   - Issue 11: Expand "MiB" to "Market-in-a-Box" on first mention in /programs and /programs/mib-insight. Keep "MiB Insight" as the program name after first expansion.

   Commit each issue as a separate atomic commit.

4. VERIFY
   - npx next build
   - npx next dev — visit each of the five service pages. Subheading should render directly under hero headline.

5. SHIP
   - PR title: "feat(ia): page subheadings + MiB expansion [B7]"
   - Request review from abigail-atheryon.
```

- [ ] **Step 3: Wait for agent, review, merge**

```bash
gh pr merge <B7 number> --squash --delete-branch
git checkout main && git pull && npx next build
```

---

## Task 16: Wave 3 — Spawn B4 (SEO metadata audit) agent

- [ ] **Step 1: Create the B4 branch**

```bash
git checkout main && git pull
git checkout -b feat/ia-bundle-b4-seo-metadata && git push -u origin feat/ia-bundle-b4-seo-metadata
git checkout main
```

- [ ] **Step 2: Spawn the B4 agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B4 — SEO metadata audit.

Branch: feat/ia-bundle-b4-seo-metadata
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source issue: docs/ia-issues.md issue 20
Source of truth: docs/site-vocabulary.md (canonical names for title metadata)

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b4-seo-metadata && git pull
   - Confirm B5 and B7 have merged on main (final taxonomy + final subheadings).
   - Re-read issue 20 in ia-issues.md.

2. SCOPE — you own and only own:
   - Every `src/app/**/page.tsx` file (export const metadata)
   - src/app/layout.tsx (root metadata template, OG defaults, canonical-URL helper if needed)
   Do not edit any content in site.ts. Do not edit any page body — only the metadata exports.

3. IMPLEMENT (per ia-issues.md issue 20 acceptance criteria)
   For every route in src/app/:
   - Add or update `export const metadata: Metadata = { ... }` with unique `title`, `description`, and OG tags.
   - Title should use canonical service names from docs/site-vocabulary.md.
   - Description should be 1-2 sentences derived from the page's actual hero/subheading content (not boilerplate).
   - Canonical URL should resolve correctly for atheryon.com.au (use the App Router canonical pattern).
   - OG image: confirm a default exists in layout.tsx; per-page OG image only if a route-specific asset exists.

   Commit per-route (one commit per page.tsx).

4. VERIFY
   - npx next build
   - Run a static check: for every src/app/*/page.tsx and src/app/**/page.tsx, grep for `export const metadata`. Every route must have one.

   ```bash
   for f in $(find src/app -name 'page.tsx'); do
     if ! grep -q 'export const metadata' "$f"; then echo "MISSING: $f"; fi
   done
   ```

   Expected: zero MISSING lines.

5. SHIP
   - PR title: "feat(seo): per-route metadata audit [B4]"
   - PR body lists the routes touched and the canonical-URL pattern used.
```

- [ ] **Step 3: Wait, review, merge**

```bash
gh pr merge <B4 number> --squash --delete-branch
git checkout main && git pull && npx next build
```

---

## Task 17: Wave 3 — Spawn B8 (Editorial integration pass) agent

- [ ] **Step 1: Create the B8 branch**

```bash
git checkout main && git pull
git checkout -b feat/ia-bundle-b8-editorial-pass && git push -u origin feat/ia-bundle-b8-editorial-pass
git checkout main
```

- [ ] **Step 2: Spawn the B8 agent**

Use the Agent tool with `subagent_type: general-purpose` and `isolation: worktree`. Prompt:

```
You are implementing IA roadmap bundle B8 — Editorial integration pass.

Branch: feat/ia-bundle-b8-editorial-pass
Spec: docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md
Source of truth: docs/site-vocabulary.md, docs/claims-ledger.md
Goal: Find and fix vocabulary drift, language inconsistency, and small editorial issues that B1-B7 introduced or failed to clean up.

1. PRE-FLIGHT
   - git fetch origin && git checkout feat/ia-bundle-b8-editorial-pass && git pull
   - Confirm B1-B7 have all merged on main.

2. SCOPE
   You may edit any string in src/content/site.ts or any visible copy in src/app/**/page.tsx, src/components/*.tsx — but only to enforce consistency with docs/site-vocabulary.md and docs/claims-ledger.md. You may NOT add new features, new pages, new components, or change any structural code. If you discover work that requires more than copy edits, file a GitHub issue rather than expand scope.

3. IMPLEMENT
   - Read every public page in dev (npx next dev): /, /how-we-work, every service page, /reference-architectures, /labs, /programs, /programs/mib-insight, /what-we-deliver, /about, /contact, /privacy, /terms.
   - For each page, verify:
     a. Service names match docs/site-vocabulary.md exactly.
     b. Jargon expansions match docs/site-vocabulary.md exactly.
     c. CTAs use the verbatim phrasings from docs/site-vocabulary.md.
     d. No proof claim contradicts a claims-ledger verdict.
     e. No "TBD" / "TODO" / placeholder copy remains.
     f. Active voice, plain English.
   - Fix inconsistencies inline. One commit per logical fix.
   - Maintain a list of fixes in the PR body.

4. VERIFY
   - npx next build
   - npx next dev — final read-through of every page.

5. SHIP
   - PR title: "fix(ia): editorial integration pass [B8]"
   - PR body lists every fix with file path and line.
   - Request review from abigail-atheryon.
```

- [ ] **Step 3: Wait, review, merge**

```bash
gh pr merge <B8 number> --squash --delete-branch
git checkout main && git pull && npx next build
```

---

## Task 18: Final verification and roadmap closeout

**Files:** (no file changes — verification + closeout)

- [ ] **Step 1: Confirm every issue from ia-issues.md is resolved**

```bash
gh issue list --state open --search "in:title IA"
```

For each of issues 1-22 (excluding 16 which was dropped), confirm either:
- It has a closing PR linked, OR
- It was marked RESOLVED in a bundle's pre-flight (already fixed on main before the roadmap started), OR
- It was explicitly deferred (issue 16) — record in the closeout note.

- [ ] **Step 2: Final smoke test**

```bash
npx next build
npx next dev
```

Manually visit every public route. Confirm:
- No 404s.
- Sitemap entries all resolve.
- Privacy and Terms pages render.
- Contact form submits.
- Every service page has: subheading, definitions, case study (or NDA-friendly fallback), FAQ-lite, RelatedLinks.
- /about has team bios.
- /labs has positioning sentence.
- All acronyms are wrapped with `<abbr>` or Tooltip on first mention.

- [ ] **Step 3: Commit closeout note**

Create `docs/ia-roadmap-closeout.md`:

```markdown
# IA Roadmap Closeout

**Date:** [completion date]
**Spec:** docs/superpowers/specs/2026-05-11-ia-issues-triage-roadmap-design.md

## Issues resolved

| Issue | Bundle | PR | Notes |
|---|---|---|---|
| 1 | B1 | #N | |
| 2 | B1 | #N | |
| 3 | B5 | #N | [keep / delete decision] |
| 4 | B5 | #N | |
| 5 | B5 | #N | |
| 6 | B5 | #N | |
| 7 | B6 | #N | |
| 8 | B6 | #N | |
| 9 | B3a | #N | |
| 10 | B3a | #N | |
| 11 | B7 | #N | |
| 12 | B3a | #N | |
| 13 | B7 | #N | |
| 14 | B3a + B3b | #N | |
| 15 | B6 | #N | Reinstated as FAQ-lite |
| 16 | — | — | Dropped (not credibility-critical) |
| 17 | B5 | #N | Reinstated as engagement-model |
| 18 | B3a | #N | |
| 19 | B5 | #N | |
| 20 | B4 | #N | |
| 21 | B0 + B2 | #N | Verdicts in claims ledger |
| 22 | B1 | #N | |

## Follow-up issues filed

[List any GitHub issues filed during the roadmap for work outside scope.]

## What I would do differently next time

[Optional: notes for future roadmaps.]
```

Commit:

```bash
git add docs/ia-roadmap-closeout.md
git commit -m "docs(ia): roadmap closeout — 21 issues resolved across 4 waves"
```

