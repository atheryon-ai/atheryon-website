# Claude Code Launch Prompt — Executive-First IA + Critique QA

**Prepared:** 2026-08-09  
**Repository:** `/Users/terencetsakiris/repos/atheryon-website`  
**Target branch:** `dev`  
**Canonical implementation specification:** `docs/superpowers/plans/2026-08-09-exec-first-ia-restructure.md`

## Assignment

Implement the approved **Executive-First IA Restructure** in the canonical specification above. Treat that document—including its decision record, target IA, Appendix A source content, phase boundaries, TODO gates, and acceptance criteria—as authoritative.

This launch prompt adds verified live-site evidence, implementation safety boundaries, and QA requirements from the 2026-08-09 site critique. It does not replace the approved specification. If the two documents appear to conflict, the approved Executive-First IA specification wins; record the conflict and follow its decision.

Do the implementation locally and leave a fully verified handoff. Do not push, deploy, merge, open a PR, or promote `dev` to `main` unless separately instructed.

## Mandatory startup

1. Read completely, in this order:

   - `AGENTS.md`
   - `CLAUDE.md` if present
   - `docs/superpowers/plans/2026-08-09-exec-first-ia-restructure.md`
   - `docs/claims-ledger.md`

2. Inventory the checkout before editing:

   ```bash
   git status --short --branch
   git log -3 --oneline --decorate
   git diff --stat
   ```

3. Preserve commit `2cb9cc2 home: apply homepage critique fixes`. At handoff finalisation, both `HEAD` and `origin/dev` resolved to that commit.

4. Preserve all modified and untracked work. Do not reset, rebase, stash, amend, or overwrite concurrent changes.

5. Because the repository has a Graphify graph, begin codebase analysis with:

   ```bash
   graphify query "How do the current route groups, HomeNav, PracticeToggle, shellConfig, Doc components, homepage, offers, about, contact, metadata, and static web app routes connect?"
   ```

6. Compare the current implementation with `2cb9cc2` before editing. That commit already:

   - removes “Commanded” from the first homepage case context;
   - simplifies the old homepage services heading;
   - adds an end-of-document homepage CTA;
   - improves the existing short CTA accessible name;
   - updates focused homepage assertions.

   Keep any of those changes that remain relevant under the approved v3 IA. Do not mechanically preserve obsolete v2 structure where the approved plan replaces it.

## Approved decisions that must not be reopened

- One executive-first front door owns `/`.
- The root positioning is transaction execution and value protection for Boards, executive teams, investors, private equity sponsors, and corporate-development teams.
- Capital Markets system and Labs material moves to L3 behind `/technology`.
- Anna Contos and Terry Tsakiris are co-founders; Anna leads transaction advisory and Terry leads technology.
- AI is a supporting fact, not the landing-page identity.
- `/services`, `/experience`, `/approach`, `/about`, `/contact`, and `/technology` form the new primary IA.
- The CM implementation pages remain reachable through `/technology` and the footer.
- The separate `/ma/*` routes retire only in Phase 3 through the approved redirects.
- Any unresolved copy fact uses the approved TODO/placeholder pattern; do not invent an answer.

## Live-site critique evidence to carry into implementation

The reviewed test snapshot was <https://polite-flower-03ba3020f.7.azurestaticapps.net/>. It predated or was still catching up with commit `2cb9cc2`; recheck live state before treating any live/local difference as current.

Verified strengths to preserve:

- institutional deep-navy dossier treatment;
- strong serif hierarchy, numbered sections, and restrained rule system;
- quantified context / execution / outcome proof pattern;
- named, high-density leadership biographies;
- strong sampled colour contrast and visible focus styling;
- responsive content with no horizontal overflow;
- existing privacy and legal content;
- static-export architecture.

Verified problems now addressed principally by the approved IA:

- the old site presented three competing identities: transaction advisory, capital-markets engineering, and code/prompt licensing;
- old CM navigation foregrounded `THEMES` and `OFFERS` before the core practice;
- `/offers` led with code and prompts before consulting;
- Labs repeated “Code, prompts, advisory,” making technology look like the company-level offer;
- the homepage lacked a sufficiently clear executive conversion journey;
- proof attribution did not always distinguish Atheryon engagements, principal experience, and platform demonstrations;
- the About copy used promotional superlatives where factual authority would be stronger.

## QA addendum to the approved phases

These requirements supplement the phase acceptance criteria in the canonical plan.

### 1. Mobile navigation is a Phase 1 requirement

The current CSS hides `.home-nav-links` at `<=768px`, leaving only the brand and short CTA. The approved single-shell header must not reproduce that failure.

Required behaviour:

- provide an accessible mobile menu containing `SERVICES`, `EXPERIENCE`, `APPROACH`, `ABOUT`, and the final approved CTA;
- use a real button with `aria-expanded`, `aria-controls`, and a clear accessible name;
- support keyboard opening, navigation, closing, and `Escape`;
- close after route selection;
- keep applicable interactive targets at least 44px;
- prevent horizontal overflow and, for an overlay, background scrolling while open;
- do not add a UI component library solely for the menu.

Required tests:

- open/closed state at 390×844;
- keyboard and `Escape` operation;
- exact executive navigation contents;
- CTA presence;
- no horizontal overflow at 390px and 768px.

### 2. Claims and provenance are release gates

- Reconcile all new Appendix A figures and post-May claims with `docs/claims-ledger.md`.
- Add ledger rows for any claim not already represented.
- Preserve the canonical plan’s `TODO(anna)` sign-off gate for the RAMS `$21.4bn`, `>$1bn`, four-month, ten-month, and hypercare claims.
- Test-site publication does not constitute approval for production.
- Never imply that principal institutional experience was an Atheryon client engagement.
- Normalise `/experience` cases to `Context / Role / Outcome` as specified, with a compact provenance classification where needed.
- Do not expose confidential names or records to substantiate anonymised proof.
- Do not carry the stale live Labs count of `26 themes · 111 pages` into v3. Re-derive current counts from `src/content/themes.ts` and the sibling `labs-platform` source described in `AGENTS.md`; re-sync the manual snapshot if required before publishing a count.

### 3. Leadership authority must remain factual and dense

Preserve full co-founder biographies. Replace or avoid unsupported promotional language such as:

- `unprecedented institutional execution credibility`;
- `elite corporate integration specialist`;
- `bulletproof`;
- `eliminate the multi-million dollar overheads`.

Use titles, dates, mandate types, scope, jurisdictions, and approved outcomes. Add existing verified professional-profile links where useful. Add portraits only if suitable, cleared local assets exist for both co-founders; do not create an uneven or scraped treatment.

### 4. Contact trust belongs beside the form

Keep the existing Formspree endpoint and static form. Add concise, nearby disclosure covering:

- enquiries are treated as confidential;
- which fields are submitted;
- Formspree processes the submission;
- a direct `/privacy` link.

State a response time only if Terry approves an explicit commitment. Do not add unnecessary required fields or submit test PII.

Review the privacy policy’s overseas-service-provider and individual-rights language when changing the collection notice. Flag legal uncertainty rather than inventing a statutory deletion right or an unsupported hosting/data-residency statement.

### 5. Social metadata and test indexing must be explicit

The reviewed homepage emitted a `summary_large_image` Twitter card but no actual Open Graph image and no JSON-LD. The test host returned `robots.txt` with `Allow: /` and no `X-Robots-Tag: noindex`.

Add, without inventing credentials:

- a static 1200×630 Open Graph image using the existing brand system;
- the image in Open Graph and Twitter metadata;
- conservative `Organization` and `ProfessionalService` JSON-LD;
- test-build `noindex, nofollow` metadata and restrictive `robots.txt`;
- production-build indexable metadata and the production sitemap.

Implement test/production indexing differences through build/deployment configuration. Do not accidentally ship `noindex` to production. Read both SHA-pinned workflows before editing any CODEOWNERS-protected file.

### 6. Accessibility and semantic structure

- Preserve existing focus-visible styling and sampled contrast performance.
- Use sequential page heading structure on all new pages.
- Do not rely on 9px text for meaningful practice or navigation information.
- Keep accessible names concise; decorative arrows must be `aria-hidden`.
- Run Axe on the new root at 1440×900 and 390×844. The reviewed old homepage produced zero automated Axe violations at both sizes; do not regress it.
- Perform manual keyboard review because automated Axe does not validate navigation usefulness.

## Phase-aligned execution

Follow the canonical plan’s phases exactly.

### Phase 1 — Executive shell and L1/L2 pages

Implement v3 content, the new root, `/services`, `/experience`, `/approach`, revised `/about` and `/contact`, the single-shell navigation, required SWA route changes, mobile menu, near-form privacy disclosure, and relevant metadata.

Do not retire `/ma/*` in this phase. Confirm those pages still render.

### Phase 2 — Technology depth

Implement `/technology`, demote existing CM/Labs/Offers pages from the primary navigation, and regroup technology links in the footer. Ensure `/system`, `/labs`, `/themes`, and `/offers` remain reachable and return 200.

Do not re-promote code or prompt licensing into the executive-level narrative.

### Phase 3 — Retire the old M&A routes

Apply only the redirects approved in the canonical plan, update affected tests and internal links, and verify real 301 behaviour on the test SWA before any production promotion.

## Non-goals and safety boundaries

- Do not redesign the logo, colour palette, or dossier design language.
- Do not turn biographies into anonymous or abbreviated team cards.
- Do not add API routes, middleware, server actions, or other non-static features.
- Do not change the Formspree endpoint.
- Do not create claims, clients, figures, reviews, partnerships, or authorisations.
- Do not sync from `labs-platform` unless a concrete taxonomy/thumb mismatch is discovered.
- Do not remove old v2/v2Ma content before the approved phase retires every consumer.
- Do not bypass TODO gates merely to make the production-placeholder check pass; use the established hidden-block pattern.
- Do not commit, push, deploy, merge, or open a PR unless separately instructed.

## Required verification

Run focused checks after each phase, then the repository gates:

```bash
npm run verify:production-ready
npx next build
npx playwright test tests/home.spec.ts tests/practice-toggle.spec.ts
git diff --check
graphify update .
```

Add or update focused Playwright coverage for:

- every new L1/L2 route;
- target header and footer IA;
- mobile navigation and keyboard behaviour;
- Context / Role / Outcome case structure;
- co-founder identity and roles;
- executive CTA routes;
- contact privacy/Formspree disclosure;
- `/technology` reachability of retained CM routes;
- approved Phase 3 redirects;
- test-versus-production robots metadata where locally testable.

If focused tests pass and the environment permits, run:

```bash
npm test
```

Perform visual QA at 1440×900 and 390×844 on:

- `/`
- `/services`
- `/experience`
- `/approach`
- `/about`
- `/contact`
- `/technology`

During Phases 1 and 2, also inspect `/ma`. Remove temporary screenshot tests and artifacts after inspection. Report browser/setup failures separately from application failures.

## Final handoff

Return a self-contained report with:

1. phases completed and files changed;
2. final IA and redirect map;
3. Appendix A content mapped, trimmed, or deferred;
4. claims-ledger changes and every unresolved `TODO(terry)` / `TODO(anna)` gate;
5. mobile navigation and accessibility behaviour;
6. exact verification commands and pass/fail counts;
7. visual-QA pages and viewports inspected;
8. any CODEOWNERS, production, or approval gate;
9. confirmation that commit `2cb9cc2` and concurrent user work were preserved;
10. confirmation that nothing was pushed or deployed.
