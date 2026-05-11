# Follow-up Issues Parallel Dispatch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the four follow-up issues filed during the 2026-05-11 IA roadmap closeout (#22, #23, #24, #27) by dispatching four parallel agents — one per issue — on isolated feature branches, each producing its own PR.

**Architecture:** Four issues, four independent agents, four independent branches, four independent PRs. Zero file overlap across the four issues (verified during brainstorming: #22 = Header/Footer/site.ts; #23 = privacy/terms pages; #24 = CLAUDE.md; #27 = tests/buttons.spec.ts), so all four can run truly in parallel with no merge-conflict risk. Each agent owns its scope end-to-end including build verification and PR creation. Per-issue design forks were resolved during brainstorming using each issue's body recommendation as the default.

**Tech Stack:** Next.js 14 App Router (static export), TypeScript, content in `src/content/site.ts`, components in `src/components/`, Playwright tests in `tests/`, project conventions in `/Users/abigail/repos/atheryon-website/CLAUDE.md`. Branches: persistent feature branches per [home CLAUDE.md] parallel-agents guidance. Tool: `Agent` with `isolation: worktree` so each agent works in its own isolated git worktree.

---

## Design decisions (from brainstorming, all approved)

| Issue | Title | Fork chosen | Rationale |
|---|---|---|---|
| **#22** | Wire Header/Footer to consume site.ts arrays | Wire both (Footer + Header) | Closes the loop on B1's array cleanup; makes the dead config live |
| **#23** | BulletList DRY in /privacy and /terms | Split usage: hand-roll rich bullets, use `BulletList` for plain-string lists | Doesn't require extending BulletList; minimum API change |
| **#24** | Document the legal-page content carve-out | Document in project CLAUDE.md (not move legal content into site.ts) | Issue's own recommendation; small change |
| **#27** | Stale Playwright tests reference deleted nav | Delete stale tests + add minimal new-top-nav coverage | Both delete and add per issue's recommendation; full coverage |

## File ownership (zero overlap, parallel-safe)

| Agent | Branch | Owns |
|---|---|---|
| #22 agent | `feat/issue-22-wire-nav` | `src/components/Header.tsx`, `src/components/Footer.tsx` |
| #23 agent | `feat/issue-23-bulletlist-dry` | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| #24 agent | `feat/issue-24-claude-md-carveout` | `/Users/abigail/repos/atheryon-website/CLAUDE.md` |
| #27 agent | `feat/issue-27-test-cleanup` | `tests/buttons.spec.ts` |

`site.ts` is read-only for all four — none of these issues require edits to it (B1 already aligned the arrays).

---

## Task 1: Create four persistent feature branches

**Files:** none (branch operations only)

- [ ] **Step 1: Confirm on clean main**

Run:
```bash
git checkout main && git pull
git status
```
Expected: `nothing to commit, working tree clean` and `Your branch is up to date with 'origin/main'`. If not clean, stop and reconcile manually before continuing.

- [ ] **Step 2: Create all four branches on remote**

Run:
```bash
git checkout -b feat/issue-22-wire-nav && git push -u origin feat/issue-22-wire-nav && git checkout main
git checkout -b feat/issue-23-bulletlist-dry && git push -u origin feat/issue-23-bulletlist-dry && git checkout main
git checkout -b feat/issue-24-claude-md-carveout && git push -u origin feat/issue-24-claude-md-carveout && git checkout main
git checkout -b feat/issue-27-test-cleanup && git push -u origin feat/issue-27-test-cleanup && git checkout main
```
Expected: four `[new branch]` outputs from `git push`, ending on `main`.

- [ ] **Step 3: Verify**

Run:
```bash
git ls-remote --heads origin 'feat/issue-*'
```
Expected: four lines listing `feat/issue-22-wire-nav`, `feat/issue-23-bulletlist-dry`, `feat/issue-24-claude-md-carveout`, `feat/issue-27-test-cleanup`.

---

## Task 2: Spawn all four agents in parallel

**Files:** none (agent dispatch only)

**Strategy:** Send ONE message containing FOUR `Agent` tool calls. Each agent gets its own isolated worktree via `isolation: worktree`. All four run concurrently.

- [ ] **Step 1: Dispatch agent for issue #22 (wire nav)**

Use `Agent` tool with `subagent_type: general-purpose`, `isolation: worktree`. Prompt:

```
You are implementing GitHub issue #22 — Wire Header.tsx and Footer.tsx to consume src/content/site.ts arrays.

## Branch
`feat/issue-22-wire-nav` (already created on origin)

## Working directory and pre-flight

```bash
cd /Users/abigail/repos/atheryon-website   # or your worktree path
git fetch origin
git checkout feat/issue-22-wire-nav
git pull
git log origin/main..HEAD --oneline   # should be empty
```

## Context

The previous bundle (B1) cleaned up `site.ts` so that `nav`, `servicesNav`, and `footer.links` now reflect the post-pivot IA (Reality/Data/AI Direction/Transformation/Labs/About; pillars in footer; etc.). But nothing currently consumes those arrays — `Header.tsx` hardcodes its own `mainNav` constant and `Footer.tsx` hardcodes three links inline (Contact, Privacy, LinkedIn).

## Scope — you own and only own
- `src/components/Header.tsx`
- `src/components/Footer.tsx`

Do not edit `src/content/site.ts`. Do not edit any other file. If you need to add a type or helper, do it inside the component you're editing.

## What to implement

### 1. Header.tsx — read from `site.nav`
The current file (lines 9-16) hardcodes:
```typescript
const mainNav = [
  { label: 'Reality', href: '/reality' },
  { label: 'Data', href: '/data' },
  { label: 'AI Direction', href: '/ai-direction' },
  { label: 'Transformation', href: '/transformation' },
  { label: 'Labs', href: '/labs' },
  { label: 'About', href: '/about' },
]
```

Replace with:
```typescript
const mainNav = site.nav
```

(The `site` import is already at the top of the file.)

Verify `site.nav` in `src/content/site.ts` matches the same shape (each item has `label` and `href`). The rendering loop at line 58 already uses `item.label` and `item.href`, so no template changes needed.

### 2. Footer.tsx — read from `site.footer.links`
The current file (lines 9-13) hardcodes three links inside a single `<nav>`:
```tsx
<nav className="flex gap-2 -mx-3">
  <Link href="/contact" className="inline-block px-3 py-3 hover:text-charcoal">Contact</Link>
  <Link href="/privacy" className="inline-block px-3 py-3 hover:text-charcoal">Privacy</Link>
  <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-charcoal">LinkedIn</a>
</nav>
```

The new `site.footer.links` has three arrays: `pillars`, `resources`, `company` (each is `{label, href}[]`). Plus `site.footer.legal` has `copyright` and `links` (privacy/terms).

Replace the hardcoded `<nav>` with a footer that renders the four groups (pillars, resources, company, legal) plus the LinkedIn external link as a separate item (since LinkedIn isn't in the site.ts arrays — keep it inline as currently done).

Suggested shape (adjust styling to match existing footer aesthetic — single row on desktop, stacked on mobile, same `text-charcoal/70` text, `hover:text-charcoal`):

```tsx
import Link from 'next/link'
import { site } from '@/content/site'

export function Footer() {
  const year = new Date().getFullYear()
  const { pillars, resources, company } = site.footer.links
  const { links: legalLinks } = site.footer.legal

  return (
    <footer className="bg-bone border-t border-charcoal/10 py-10">
      <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between text-sm text-charcoal/70">
        <div className="font-display text-xl text-charcoal">{site.name}</div>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 -mx-3">
          {[...pillars, ...resources, ...company, ...legalLinks].map((item) => (
            <Link key={item.href} href={item.href} className="inline-block px-3 py-3 hover:text-charcoal">
              {item.label}
            </Link>
          ))}
          <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-charcoal">
            LinkedIn
          </a>
        </nav>
        <div>© {year} {site.name}</div>
      </div>
    </footer>
  )
}
```

Note: don't import `site.name` for the `© {year} Atheryon` — use `site.name` since you're already importing site. The existing footer hardcoded `Atheryon`; replacing with `site.name` is a small improvement.

## Out of scope (do NOT do)
- Do NOT edit site.ts.
- Do NOT change the visual design beyond the minimum to render the new link sets.
- Do NOT add new components.
- Do NOT push to main.

## Commit discipline
2 commits:
1. `refactor(header): consume site.nav instead of hardcoded mainNav`
2. `refactor(footer): consume site.footer.links and site.footer.legal`

## Verification

```bash
npm install --no-audit --no-fund   # if node_modules absent
npm run build
```
Build must pass.

```bash
npx next dev &
DEV_PID=$!
sleep 5
curl -s http://localhost:3000/ > /tmp/home.html
grep -c "Reality\|Data\|AI Direction\|Transformation\|Labs\|About" /tmp/home.html   # expect >= 6 (one per nav item in Header)
grep -c "Privacy Policy\|Terms of Service" /tmp/home.html   # expect >= 2 (footer legal links)
kill $DEV_PID
```
Or visually inspect by visiting `http://localhost:3000/` in a browser. Verify:
- Top nav shows: Reality / Data / AI Direction / Transformation / Labs / About
- Footer shows all pillars (Data, AI Direction, Transformation) + resources (Labs, Programs, MiB Insight) + company (About, Contact) + legal (Privacy Policy, Terms of Service) + LinkedIn

## Ship

```bash
git push origin feat/issue-22-wire-nav
gh pr create --base main --head feat/issue-22-wire-nav \
  --title "refactor(ia): wire Header and Footer to consume site.ts arrays (#22)" \
  --body "Closes #22.

Header.tsx now reads from site.nav instead of a hardcoded mainNav constant.
Footer.tsx now renders site.footer.links (pillars, resources, company) and
site.footer.legal (privacy, terms) plus the LinkedIn external link.

## Build verification
- npm run build: PASS
- Manual: top nav and footer render the expected items in dev

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

## Report
Status (DONE/etc.), commit SHAs, build result, PR URL, anything unexpected.
```

- [ ] **Step 2: Dispatch agent for issue #23 (BulletList DRY)**

Use `Agent` tool with same shape. Prompt:

```
You are implementing GitHub issue #23 — DRY refactor of bullet markup in /privacy and /terms.

## Branch
`feat/issue-23-bulletlist-dry`

## Pre-flight
```bash
git fetch origin
git checkout feat/issue-23-bulletlist-dry
git pull
git log origin/main..HEAD --oneline   # empty
```

## Context

`src/app/privacy/page.tsx` and `src/app/terms/page.tsx` (added by B1) contain ~17 inline duplications of the same bullet marker:
```tsx
<li className="flex items-start gap-3">
  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5" />
  <span>...content...</span>
</li>
```

`src/components/Checklist.tsx` already exports `BulletList` with the identical styling, but it takes `items: string[]` — it does not support rich content (bold labels, embedded links). Some legal-page bullets contain rich content.

## Design fork (already decided)
**Split usage:** use `BulletList` from Checklist.tsx for plain-string lists; hand-roll only the rich bullets. Do NOT extend `BulletList` to take `ReactNode[]`.

## Scope — you own and only own
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`

Do not edit `src/components/Checklist.tsx`. Do not edit site.ts. Do not change visible output.

## What to implement

1. Read both pages and inventory every `<ul>` block.
2. For each `<ul>`:
   - If every `<li>` is plain text (no `<strong>`, no `<Link>`, no embedded JSX), replace the whole `<ul>` with `<BulletList items={['...', '...', '...']} />` — import `BulletList` from `@/components` (or wherever the barrel re-exports it; check `src/components/index.ts`).
   - If any `<li>` contains rich children, leave the `<ul>` hand-rolled — but extract the inline `<li>` markup into a small local component inside the same file (e.g., `function RichBullet({ children })`) so the duplicated markup is reduced to one definition per page.

3. Visually verify both pages render identically after the refactor (`npx next dev` and inspect /privacy and /terms).

## Out of scope
- Do NOT change any prose. Same words, same order.
- Do NOT add new dependencies.
- Do NOT extend BulletList's API.

## Commit discipline
2 commits:
1. `refactor(privacy): use BulletList for plain lists, extract RichBullet for rich ones`
2. `refactor(terms): use BulletList for plain lists, extract RichBullet for rich ones`

## Verification

```bash
npm install --no-audit --no-fund   # if needed
npm run build   # must PASS

# Diff stats — should show line reduction:
git diff main --stat src/app/privacy/page.tsx src/app/terms/page.tsx
# Visual check:
npx next dev   # then visit /privacy and /terms
```

The visible output before and after should be identical. If `git diff main src/app/privacy/page.tsx` shows fewer added lines than removed (negative net), and the page renders identically, the refactor succeeded.

## Ship

```bash
git push origin feat/issue-23-bulletlist-dry
gh pr create --base main --head feat/issue-23-bulletlist-dry \
  --title "refactor(ia): DRY bullet markup in /privacy and /terms (#23)" \
  --body "Closes #23.

Replaced inline dot-marker bullets with BulletList (Checklist.tsx) for plain-string lists.
Extracted a local RichBullet component in each page for bullets with rich content (<strong>, <a>).

## Build verification
- npm run build: PASS
- Visual: /privacy and /terms render identically to before

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

## Report
Status, commit SHAs, build result, PR URL, line-count delta, anything unexpected.
```

- [ ] **Step 3: Dispatch agent for issue #24 (CLAUDE.md carve-out)**

Use `Agent` tool with same shape. Prompt:

```
You are implementing GitHub issue #24 — Document the legal-page content carve-out in project CLAUDE.md.

## Branch
`feat/issue-24-claude-md-carveout`

## Pre-flight
```bash
git fetch origin
git checkout feat/issue-24-claude-md-carveout
git pull
git log origin/main..HEAD --oneline   # empty
```

## Context

CLAUDE.md (the project one at `/Users/abigail/repos/atheryon-website/CLAUDE.md`) currently states:
> "All copy/text goes in `site.ts` under `site.pages.<pageName>`, not inline in TSX."

PR #21 (B1) deliberately violated this by inlining content in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`. The carve-out reasoning: legal prose is long, structured (h2 + bullets + paragraphs + external links), and rarely changed.

## Design fork (already decided)
**Document the carve-out in CLAUDE.md.** Do NOT move legal content into site.ts.

## Scope — you own and only own
- `/Users/abigail/repos/atheryon-website/CLAUDE.md`

Do not touch any other file.

## What to implement

Update CLAUDE.md to formalise the exception. In the "Patterns" section, the current bullet reads:
> - All copy/text goes in `site.ts` under `site.pages.<pageName>`, not inline in TSX

Replace with:
> - All copy/text goes in `site.ts` under `site.pages.<pageName>`, not inline in TSX
> - **Exception — legal pages:** `/privacy` and `/terms` may inline their content in TSX rather than `site.ts`. Reason: legal prose is long, deeply structured (sections, sub-sections, mixed rich bullets, external links), and changes rarely. Inlining keeps the content readable next to its rendering and avoids inventing a complex `site.pages.legal.{...}` shape that won't pay off for two pages.

Keep the rest of the file untouched. Match existing markdown style (no emoji, no trailing periods on bullet endings).

## Out of scope
- Do NOT change the home directory CLAUDE.md (`/Users/abigail/CLAUDE.md`). Only the project-level one in this repo.
- Do NOT reorganise or rewrite other sections.

## Commit discipline
1 commit:
- `docs(claude): formalise carve-out for legal-page content inlining`

## Verification

```bash
cat CLAUDE.md | head -50   # spot-check that the new bullet rendered correctly
git diff main CLAUDE.md    # confirm only one bullet was added
```

No build verification needed — docs-only change.

## Ship

```bash
git push origin feat/issue-24-claude-md-carveout
gh pr create --base main --head feat/issue-24-claude-md-carveout \
  --title "docs(claude): formalise legal-page content carve-out (#24)" \
  --body "Closes #24.

Adds an explicit exception to the 'all copy goes in site.ts' rule for /privacy
and /terms, since PR #21 (B1) inlined their content deliberately.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

## Report
Status, commit SHA, PR URL.
```

- [ ] **Step 4: Dispatch agent for issue #27 (test cleanup)**

Use `Agent` tool with same shape. Prompt:

```
You are implementing GitHub issue #27 — Replace stale Playwright tests for deleted nav with tests for the current top nav.

## Branch
`feat/issue-27-test-cleanup`

## Pre-flight
```bash
git fetch origin
git checkout feat/issue-27-test-cleanup
git pull
git log origin/main..HEAD --oneline   # empty
```

## Context

`tests/buttons.spec.ts` contains tests for a Services dropdown that no longer exists (Header.tsx removed it during the IA pivot). Specifically lines 140-151 test a CDM Platform link via a hover-then-click flow:

```typescript
test('services dropdown "CDM Platform" link works', async ({ page, isMobile }) => {
  if (isMobile) { test.skip(); return; }
  await page.goto('/');
  await page.locator('nav button:has-text("Services")').hover();
  await page.waitForTimeout(300);
  await page.locator('nav >> a:has-text("CDM Platform")').click();
  await expect(page).toHaveURL(/\/cdm-platform/);
});
```

There are adjacent tests for Recovery & Migration and similar deleted routes. There are also tests for a mobile Services submenu near the bottom of the file.

After the pivot, the top nav contains: `Reality` / `Data` / `AI Direction` / `Transformation` / `Labs` / `About`. No Services dropdown.

## Design fork (already decided)
**Delete stale tests AND add minimal new top-nav coverage.** One test per new top-nav item that asserts the link navigates to the expected URL.

## Scope — you own and only own
- `tests/buttons.spec.ts`

Do not touch any other file.

## What to implement

1. Read `tests/buttons.spec.ts` end to end.
2. **Delete:**
   - Any test that references `Services` dropdown (the entire `test.describe('Mobile Menu Services', ...)` block too if present)
   - Any test that asserts navigation to `/cdm-platform`, `/recovery-migration`, `/m-and-a-execution`, `/capability-enablement`, `/ai-ready-data`, `/reference-architectures`, `/how-we-work`, or `/what-we-deliver`
3. **Add** (matching the existing test style in the file — same imports, same Playwright patterns, same `test.describe` grouping if used):

```typescript
test.describe('Top nav links (post-pivot IA)', () => {
  const NAV_ITEMS: { label: string; path: string }[] = [
    { label: 'Reality', path: '/reality' },
    { label: 'Data', path: '/data' },
    { label: 'AI Direction', path: '/ai-direction' },
    { label: 'Transformation', path: '/transformation' },
    { label: 'Labs', path: '/labs' },
    { label: 'About', path: '/about' },
  ];

  for (const item of NAV_ITEMS) {
    test(`top nav "${item.label}" link navigates to ${item.path}`, async ({ page, isMobile }) => {
      if (isMobile) { test.skip(); return; }   // desktop only — matches the file's existing pattern
      await page.goto('/');
      await page.locator(`nav >> a:has-text("${item.label}")`).first().click();
      await expect(page).toHaveURL(new RegExp(item.path.replace(/\//g, '\\/')));
    });
  }
});
```

Place this `test.describe` block where the deleted Services tests used to be (so the file's logical organisation is preserved).

## Out of scope
- Do NOT actually run the Playwright test suite. (Heavy; requires browser binaries; may not be set up in your worktree.)
- Do NOT touch other test files.
- Do NOT add tests beyond simple navigation assertions per nav item.

## Commit discipline
2 commits:
1. `test(buttons): delete stale Services-dropdown and dead-route tests`
2. `test(buttons): add navigation tests for current top-nav items`

## Verification

```bash
npm install --no-audit --no-fund   # if needed
npx tsc --noEmit                   # type-check; tests should parse
# Optionally: npx playwright test --list   # lists tests without running them
```

Both must succeed. Do NOT run `npx playwright test` (the full run). The plan defers full execution to CI.

## Ship

```bash
git push origin feat/issue-27-test-cleanup
gh pr create --base main --head feat/issue-27-test-cleanup \
  --title "test(ia): replace stale dropdown tests with current top-nav coverage (#27)" \
  --body "Closes #27.

Deleted Playwright tests that referenced the Services dropdown and deleted routes
(/cdm-platform, /recovery-migration, etc. — all removed during the IA pivot).
Added new tests covering the six current top-nav items (Reality, Data, AI Direction,
Transformation, Labs, About).

## Verification
- npx tsc --noEmit: PASS
- Full Playwright run deferred to CI

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

## Report
Status, commit SHAs, type-check result, PR URL, count of tests deleted/added.
```

---

## Task 3: Wait for all four agent reports and inspect

**Files:** none

- [ ] **Step 1: Collect reports**

Each agent will return DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT. For any non-DONE status, address the blocker before proceeding (provide more context and re-dispatch, or escalate to user).

- [ ] **Step 2: List the four open PRs**

```bash
gh pr list --state open --search "head:feat/issue-22 head:feat/issue-23 head:feat/issue-24 head:feat/issue-27" --json number,title,headRefName,mergeable
```
Expected: four entries, all `MERGEABLE`.

- [ ] **Step 3: Per-PR diff inspection**

For each of the four PRs:
```bash
gh pr diff <number> | head -100
```
Verify:
- The diff touches only the file(s) declared in the agent's scope
- The commit count matches the prompt's commit-discipline expectation
- The PR body lists the closed-by reference (e.g., `Closes #22`)

If any PR is out of scope or commit messages are wrong, send back to the agent for fixes.

---

## Task 4: Skip formal spec/code-quality reviewer dispatches (or run them if desired)

**Files:** none

**Default:** skip formal review subagent dispatches for these four PRs. Reasoning: each PR is small (~50-100 lines), scope is unambiguous, design forks already resolved upfront in brainstorming. Inspecting the diffs (Task 3 Step 3) is faster and provides equivalent quality assurance.

**Alternative:** if the user wants formal review, dispatch a spec compliance reviewer per PR using `superpowers:subagent-driven-development`'s `spec-reviewer-prompt` template. Code quality is best handled by skimming the diff yourself or via `superpowers:requesting-code-review`.

- [ ] **Step 1: Decide review level with user**

Ask the user (if continuing past Task 3 without an explicit instruction): "Skip formal review and merge directly, or dispatch spec compliance reviewers per PR?" Default: skip.

---

## Task 5: Merge the four PRs

**Files:** none

The four PRs have zero file overlap, so they can merge in any order without conflicts. Each is independently shippable.

- [ ] **Step 1: Merge each PR**

For each PR in `[#22, #23, #24, #27]`:
```bash
gh pr merge <number> --squash --delete-branch
```

Note: `--delete-branch` may fail if a worktree still holds the branch locally. If so:
```bash
git worktree list | grep <branch-name>
git worktree remove <worktree-path> -f -f
git branch -D <branch-name>
git push origin --delete <branch-name>   # only if not already deleted by gh
```

- [ ] **Step 2: Pull main and verify build**

```bash
git checkout main && git pull
npm run build
```
Expected: PASS, all routes still prerendered.

---

## Task 6: Cleanup and verification

**Files:** none

- [ ] **Step 1: Confirm all four issues closed**

```bash
gh issue view 22 --json state -q .state
gh issue view 23 --json state -q .state
gh issue view 24 --json state -q .state
gh issue view 27 --json state -q .state
```
Expected: all four print `CLOSED` (GitHub auto-closes them because each PR title contains `Closes #N`).

If any is still `OPEN`, close explicitly:
```bash
gh issue close <number> --comment "Closed via PR #<pr-number>"
```

- [ ] **Step 2: Prune local worktrees**

```bash
git worktree list   # confirm no agent-* worktrees linger
git worktree prune
```

- [ ] **Step 3: Smoke test the live site**

```bash
npx next dev
```
Manually visit `/`, `/privacy`, `/terms`. Verify:
- Top nav renders new items from `site.nav` (#22 effect)
- Footer renders pillars + resources + company + legal + LinkedIn (#22 effect)
- /privacy and /terms render identically to before the refactor (#23 effect, no visual regression)

---

## Task 7: Closeout

**Files:**
- Create: `docs/followup-bundle-closeout.md` (optional — only if you want a record beyond the PRs themselves)

- [ ] **Step 1: Decide whether to write a closeout doc**

If the four PRs landed cleanly, a closeout doc is not strictly needed — the PR descriptions plus the closed issues are sufficient record. The previous roadmap closeout (`docs/ia-roadmap-closeout.md`) only existed because the roadmap was substantial and partially deferred.

For this bundle (four small atomic PRs), no closeout doc is required. Skip this step unless you want one for project-history reasons.

- [ ] **Step 2: Final state summary**

Report to user:
- Four PRs merged: #22, #23, #24, #27 (squashed onto main)
- Four issues closed
- Build passes
- Any unexpected findings during agent work
