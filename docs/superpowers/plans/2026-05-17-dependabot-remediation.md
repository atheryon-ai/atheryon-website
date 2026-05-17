# Dependabot Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve all 16 open Dependabot alerts on the atheryon-website default branch without regressing the static-export build, Playwright tests, or Azure SWA deploys.

**Architecture:** Three changes do the entire job. (1) Bump `next` from 14.2.35 → 15.5.16, which closes 14 of the 16 alerts in one shot — this is the only path because there is no `next@14.x` backport (the `next-14` dist-tag is frozen at 14.2.35; CVEs are only patched in 15.5.16+). The 14 → 15 hop is a major bump and is handled as a single dedicated task with migration verification. (2) Add an `overrides` block in `package.json` to force `postcss@>=8.5.10` and `glob@>=10.5.0` deep in the tree (postcss is pulled by next, glob by `@next/eslint-plugin-next`). (3) Final verification task confirms zero open alerts. Every change is committed atomically with the CVE in the message.

**Tech Stack:** Next.js 14 (target: 15.5.16) static export, npm (lockfileVersion 3), Playwright 1.57 (Chromium-only), GitHub Actions deploy to Azure Static Web Apps (Node 20 runner).

**Constraint reminders (from `/Users/terencetsakiris/GitHub/atheryon-website/CLAUDE.md`):**
- `package.json` and `package-lock.json` are CODEOWNERS-protected (`@terencetsakiris`). All commits in this plan need owner approval on the PR before merging into `dev` → `main`.
- Site is `output: 'export'`, `images.unoptimized: true`, no API routes, no middleware. This makes 8 of the Next.js CVEs unexploitable at runtime (server-only attack surfaces) — they are still remediated, but the urgency rating is lower than raw severity suggests.
- Workflows are SHA-pinned (`Azure/static-web-apps-deploy@1a947af9...`). Do NOT modify workflows in this plan.
- `npm test` is a Playwright suite ~15 min. Use targeted `npx playwright test tests/<file> --project=chromium` for per-task verification; reserve the full suite for the final task.

---

## Alerts Summary

All 16 alerts are OPEN on the default branch. Counts match Dependabot UI: **6 high / 8 moderate / 2 low**.

| # | Alert# | Package | Current | Patched | Severity | Direct/Trans | Runtime/Dev | Breaking? | Exploitable in static export? | Task |
|---|--------|---------|---------|---------|----------|--------------|-------------|-----------|-------------------------------|------|
| 1 | 34 | next (GHSA-c4j6-fc7j-m34r, CVE-2026-44578, SSRF via WebSocket upgrades) | 14.2.35 | 15.5.16 | high | direct | runtime | yes (14→15 major) | No — needs server runtime with WebSocket upgrade handler; static export has none | Task 1 |
| 2 | 32 | next (GHSA-36qx-fr4f-26g5, CVE-2026-44573, Middleware/Proxy bypass in Pages Router i18n) | 14.2.35 | 15.5.16 | high | direct | runtime | yes (14→15) | No — no middleware, no Pages Router, no i18n | Task 1 |
| 3 | 31 | next (GHSA-8h8q-6873-q5fj, content disclosure / cache class) | 14.2.35 | 15.5.16 | high | direct | runtime | yes (14→15) | No — needs server runtime | Task 1 |
| 4 | 27 | next (GHSA-q4gf-8mx6-v5v3) | 14.2.35 | 15.5.15 | high | direct | runtime | yes (14→15) | No — needs server runtime | Task 1 |
| 5 | 3 | next (GHSA-h25m-26qc-wcjf) | 14.2.35 | 15.0.8 | high | direct | runtime | yes (14→15) | No — needs server runtime | Task 1 |
| 6 | 1 | glob (GHSA-5j98-mcp5-4vw2, CVE-2025-64756, glob CLI command injection via `-c`/`--cmd`) | 10.3.10 | 10.5.0 | high | transitive (via `@next/eslint-plugin-next` → `eslint-config-next`) | dev | no | No — vulnerability is in the `glob` CLI binary; we never invoke it. Pure dev-tree transitive. | Task 3 |
| 7 | 38 | next (GHSA-ffhc-5mcf-pf4q, CVE-2026-44581, XSS in App Router CSP nonces) | 14.2.35 | 15.5.16 | medium | direct | runtime | yes (14→15) | No — static export emits HTML at build, no per-request CSP nonces | Task 1 |
| 8 | 36 | next (GHSA-gx5p-jg67-6x7h, CVE-2026-44580, XSS in `beforeInteractive` scripts with untrusted input) | 14.2.35 | 15.5.16 | medium | direct | runtime | yes (14→15) | Conditional — would only apply if a page passed untrusted input into a `<Script strategy="beforeInteractive">`. Audit step in Task 1. | Task 1 |
| 9 | 35 | next (GHSA-h64f-5h5j-jqjh, CVE-2026-44577, DoS in Image Optimization API) | 14.2.35 | 15.5.16 | medium | direct | runtime | yes (14→15) | No — `images.unoptimized: true` per CLAUDE.md; advisory explicitly says "If you are using `images.unoptimized: true`, you are NOT impacted." | Task 1 |
| 10 | 33 | next (GHSA-wfc6-r584-vfw7, CVE-2026-44576, cache poisoning in RSC responses) | 14.2.35 | 15.5.16 | medium | direct | runtime | yes (14→15) | No — no server runtime serving RSC | Task 1 |
| 11 | 29 | postcss (GHSA-qx2v-qp2m-jg93, CVE-2026-41305, XSS via unescaped `</style>` in stringify output) | 8.4.31 (inside next) | 8.5.10 | medium | transitive (via next 14.2.35) | runtime | no | No — PostCSS runs at build time only on our own Tailwind input; output is static CSS shipped to users. Vuln requires running PostCSS on attacker-controlled CSS, which we don't. Closing for hygiene + to keep Dependabot quiet. | Task 1 (resolved by next bump) + Task 2 (override as belt-and-braces) |
| 12 | 20 | next (GHSA-3x4c-7xq6-9pq8, CVE-2026-27980, unbounded next/image disk cache growth) | 14.2.35 | 15.5.14 | medium | direct | runtime | yes (14→15) | No — `images.unoptimized: true` means next/image cache is never populated | Task 1 |
| 13 | 19 | next (GHSA-ggv3-7p47-pfv8, CVE-2026-29057, HTTP request smuggling in rewrites) | 14.2.35 | 15.5.13 | medium | direct | runtime | yes (14→15) | No — no rewrites at runtime (static export); SWA routes handled by `staticwebapp.config.json`, not next | Task 1 |
| 14 | 2 | next (GHSA-9g9p-9gw9-jx7f, CVE-2025-59471, DoS via Image Optimizer remotePatterns) | 14.2.35 | 15.5.10 | medium | direct | runtime | yes (14→15) | No — `images.unoptimized: true` | Task 1 |
| 15 | 39 | next (GHSA-3g8h-86w9-wvmq, CVE-2026-44572, Middleware/Proxy redirects cache-poisoning) | 14.2.35 | 15.5.16 | low | direct | runtime | yes (14→15) | No — no middleware | Task 1 |
| 16 | 37 | next (GHSA-vfv6-92ff-j949, CVE-2026-44582, cache poisoning via RSC cache-buster collisions) | 14.2.35 | 15.5.16 | low | direct | runtime | yes (14→15) | No — no RSC at runtime | Task 1 |

**Bottom line:**
- 13 of 16 alerts (rows 1–5, 7–10, 12–16) are all the same fix: `next@15.5.16`.
- Row 11 (`postcss`) is also resolved by the `next` bump because the only PostCSS copy in the dev tree at 8.4.31 is the one bundled by next@14.2.35. After bumping next to 15.5.16, all PostCSS copies will be ≥8.5.x. An override in Task 2 keeps Dependabot satisfied if it scans the lockfile before the next-15 dedupe lands.
- Row 6 (`glob`) requires a separate `overrides` entry (Task 3) because its parent is `@next/eslint-plugin-next` (under `eslint-config-next@14.2.35`), which we are not bumping.

**Direct vs transitive:** 14 direct (all next), 2 transitive (postcss, glob).
**Runtime vs dev:** 15 runtime (14 next + 1 postcss), 1 dev (glob).
**Static-export exploitability:** Of the 16 alerts, only Alert #36 (XSS in `beforeInteractive` scripts) has any conceivable path to runtime exposure in a static-export site — and only if a page wires untrusted input into a `<Script strategy="beforeInteractive">`. Task 1 includes a grep audit for this.

---

## File Structure

This plan touches three files. No source code (`src/**`), no workflows, no `staticwebapp.config.json`.

```
atheryon-website/
├── package.json                                   # modified: next dep, +overrides
├── package-lock.json                              # modified: regenerated by npm install
└── docs/superpowers/plans/
    └── 2026-05-17-dependabot-remediation.md       # this plan (no further edits)
```

---

## Tasks

### Task 1: Bump `next` from 14.2.35 → 15.5.16 (closes 14 alerts: 5 high, 7 moderate, 2 low)

**Files:** Modify `package.json`, `package-lock.json`

**Why:** Bumps `next` past the patched line for every open Next.js CVE in one move. The `next-14` dist-tag is pinned at 14.2.35 — there is no 14.x backport, so 15.5.16 is the only patched version available without going to 16.x. This single bump closes 14 of 16 open alerts.

**Risk (real and surfaced):**
- **Major version bump (14 → 15).** Known Next 14→15 changes that could touch this repo:
  - Async request APIs (`cookies()`, `headers()`, `params`, `searchParams`). This site is static-export with no `cookies()`/`headers()` usage and no dynamic routes that read `params`/`searchParams` at runtime — but the build step still type-checks them, so any usage in `src/app/**/page.tsx` would surface as a TypeScript error during `npx next build`.
  - Caching default change: `fetch` requests are no longer cached by default. Static export means no runtime `fetch`; build-time fetches if any (none in this repo per `src/content/*.ts` being literal data) are unaffected.
  - Removal of `experimental.bundlePagesRouterDependencies` and the like — N/A, no `next.config.js` flags in use here per CLAUDE.md (verify in step 2).
- **`eslint-config-next@14.2.0`** in `devDependencies` is tied to next-14 lint rules. Next 15.5.16 ships its own ESLint plugin via `next lint`. The standalone `eslint-config-next` package is still maintained and the v14 line will usually keep working against next-15, but if `npm install next@15.5.16` produces a peer warning OR `npx next build` fails at the lint step, we bump `eslint-config-next` to `^15.0.0` as a follow-up inline (still a small bump, no taxonomy shift in rules between 14 and 15).
- **React peer dependency.** next@15.5.16 lists `react: ^18.2.0 || ^19.0.0` as a peer (verified via `npm view next@15.5.16 peerDependencies`). We're on react@18 — no change needed.
- **Node engine.** next@16 requires Node ≥20.9.0; next@15.5.16 has the same baseline. Our workflow uses Node 20 (per `.github/workflows/deploy-test.yml`). Fine.
- **Playwright tests** snapshot visual diff (see `tests/visual.spec.ts-snapshots/`). Next 15 may emit slightly different HTML or CSS hashing; snapshot drift is plausible. Step 6 specifies how to handle.

- [ ] **Step 1: Capture current state**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm list next --depth=0
npm audit --json | jq '{advisories_count: (.metadata.vulnerabilities | to_entries | map(.value) | add // 0), advisories: .metadata.vulnerabilities}'
git status --short
```

Record in execution notes:
- Current installed `next` version (expected: 14.2.35).
- Current advisory count by severity.
- Confirm working tree is clean (`git status --short` empty).

If working tree is NOT clean, STOP and surface the dirty files before proceeding.

- [ ] **Step 2: Pre-bump compatibility audit**

Verify the repo is not using Next 14 features that change behavior in Next 15. Run these greps and confirm zero matches (or document any matches before proceeding):

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
# Async request APIs (Next 15 made these async-only)
grep -rn "from 'next/headers'" src/ || echo "OK: no next/headers usage"
grep -rn "from 'next/cookies'" src/ || echo "OK: no next/cookies usage"
# Dynamic params usage (now async in Next 15)
grep -rn "params:" src/app/ | grep -v "// " || echo "OK: check any matches manually"
grep -rn "searchParams" src/app/ || echo "OK: no searchParams usage"
# beforeInteractive Script usage (CVE-2026-44580 / GHSA-gx5p-jg67-6x7h)
grep -rn "beforeInteractive" src/ || echo "OK: no beforeInteractive Script usage"
# next.config.js flags that changed
ls next.config.* 2>/dev/null && cat next.config.* 2>/dev/null
```

Expected: zero hits on `next/headers`, `next/cookies`, `searchParams`, `beforeInteractive`. `next.config.*` likely contains only `output: 'export'` and `images: { unoptimized: true }` per CLAUDE.md.

If a `beforeInteractive` Script is found, note the file path in execution notes — this is the only static-export-exploitable CVE in the list, and even after the bump we want to verify the input is trusted.

- [ ] **Step 3: Bump the package**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm install next@15.5.16 --save-exact=false
```

Note: we keep the `^` caret already on `next` in `package.json` so Dependabot can patch future minors. The install should change `"next": "^14.2.0"` → `"next": "^15.5.16"`.

Expected output:
- `package.json` now reads `"next": "^15.5.16"`.
- `package-lock.json` updated; `node_modules/next` version becomes 15.5.16.
- Possible peer-dep warnings about `eslint-config-next@14.2.x` expecting `next@^14`. If warnings appear, capture the EXACT warning text in execution notes. Continue to step 4 (the eslint-config-next package generally remains compatible). Do NOT bump `eslint-config-next` preemptively — only if step 5 (build) actually fails on lint.

- [ ] **Step 4: Re-audit**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm audit --omit=dev --json | jq '.metadata.vulnerabilities'
npm audit --json | jq '.metadata.vulnerabilities'
gh api 'repos/atheryon-ai/atheryon-website/dependabot/alerts?state=open&per_page=100' --paginate | jq '[.[] | {n: .number, pkg: .dependency.package.name, sev: .security_advisory.severity}] | group_by(.pkg) | map({pkg: .[0].pkg, count: length, severities: (map(.sev) | unique)})'
```

Expected: `next` alerts disappear from the runtime audit. Total alert count drops from 16 to 2 (only `glob` and `postcss` remain; note `postcss` may also vanish if the bump dedupes it away).

If a NEW alert appears (rare — transitive flux after major-version bump), capture it and decide: either patch in this task or add an explicit deferred entry to the bottom of this plan.

- [ ] **Step 5: Build verification**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npx next build
```

Expected:
- Build completes with `out/` directory generated.
- No TypeScript errors.
- No ESLint errors. (If ESLint fails specifically with messages about `eslint-config-next` incompatibility — e.g. "Cannot find module 'next/eslint-plugin-next'" — bump `eslint-config-next` to `^15.0.0`: `npm install -D eslint-config-next@^15`, then re-run `npx next build`. Capture the original error text in execution notes before bumping.)

If build fails for any OTHER reason: STOP, capture the full error, and surface to the human before continuing. Do not work around — a Next 14→15 build failure is the signal that one of the migration risks above actually applies, and we need the human to decide whether to patch the code or roll back to Next 14 + accept the alerts (the "DEFERRED" path).

- [ ] **Step 6: Targeted test verification**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npx playwright test tests/home.spec.ts --project=chromium
npx playwright test tests/offers.spec.ts --project=chromium
npx playwright test tests/grok-polish.spec.ts --project=chromium
```

Expected: all pass. These cover the homepage, the offers pages, and the polish/visual spec — the three primary user-facing surfaces.

The `tests/visual.spec.ts-snapshots/` directory contains pixel snapshots. Next 15 may emit subtly different HTML/CSS that triggers snapshot diffs.

- If a snapshot test FAILS due to genuine pixel diff: open the diff PNG, confirm the change is intentional (Next 15 build output), then regenerate snapshots: `npx playwright test --update-snapshots --project=chromium tests/<file>`. Commit the regenerated snapshots as part of Task 1's commit (same commit).
- If a snapshot test fails due to a real visual regression (e.g. layout broken): STOP and surface to the human.

- [ ] **Step 7: Commit**

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
git add package.json package-lock.json tests/visual.spec.ts-snapshots/ 2>/dev/null
git status --short  # verify only intended files staged
git commit -m "$(cat <<'EOF'
chore(deps): bump next from 14.2.35 to 15.5.16

Resolves 14 Dependabot alerts (5 high, 7 moderate, 2 low). The next-14
line is frozen at 14.2.35 with no CVE backport, so 15.5.16 is the only
patched version available.

CVEs closed:
- CVE-2026-44578 (GHSA-c4j6-fc7j-m34r, high) — SSRF via WebSocket upgrades
- CVE-2026-44573 (GHSA-36qx-fr4f-26g5, high) — Middleware/Proxy bypass i18n
- GHSA-8h8q-6873-q5fj (high)
- GHSA-q4gf-8mx6-v5v3 (high)
- GHSA-h25m-26qc-wcjf (high)
- CVE-2026-44581 (GHSA-ffhc-5mcf-pf4q, medium) — XSS App Router CSP nonces
- CVE-2026-44580 (GHSA-gx5p-jg67-6x7h, medium) — XSS beforeInteractive scripts
- CVE-2026-44577 (GHSA-h64f-5h5j-jqjh, medium) — DoS Image Optimization API
- CVE-2026-44576 (GHSA-wfc6-r584-vfw7, medium) — RSC cache poisoning
- CVE-2026-27980 (GHSA-3x4c-7xq6-9pq8, medium) — Unbounded next/image cache
- CVE-2026-29057 (GHSA-ggv3-7p47-pfv8, medium) — HTTP smuggling in rewrites
- CVE-2025-59471 (GHSA-9g9p-9gw9-jx7f, medium) — DoS Image Optimizer remotePatterns
- CVE-2026-44572 (GHSA-3g8h-86w9-wvmq, low) — Middleware redirects cache-poisoning
- CVE-2026-44582 (GHSA-vfv6-92ff-j949, low) — RSC cache-buster collisions

Static-export site (output: 'export', images.unoptimized: true, no
middleware, no API routes), so most of these are not exploitable at
runtime. Bumping anyway to clear Dependabot and stay on a supported
major.
EOF
)"
```

If the `tests/visual.spec.ts-snapshots/` directory was regenerated in step 6, the commit message should include a trailing line: `Regenerated Playwright visual snapshots for Next 15 output.`

---

### Task 2: Add `overrides` entry for `postcss` to dedupe at ≥8.5.10 (closes 1 alert)

**Files:** Modify `package.json` (add `overrides` block), `package-lock.json`

**Why:** Alert #29 flags `postcss@8.4.31` (transitive via `next@14.2.35`). After Task 1, `next@15.5.16` should pull `postcss@^8.5.x`, which already moots this alert. This task adds an explicit `overrides` block to make the constraint permanent: any future direct or transitive bump that drags in an older PostCSS will be auto-bumped at install time. Belt and braces — the actual remediation is Task 1; this is the durable guarantee.

**Risk:** PostCSS 8.5.x is fully compatible with 8.4.x for plugin consumers (autoprefixer, tailwindcss, etc.) — same major. Overrides bypass parent compat checks, but the same-major constraint here makes that irrelevant.

- [ ] **Step 1: Capture current postcss tree**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm list postcss
```

Expected after Task 1: all `postcss` instances at ≥8.5.10. If still 8.4.x somewhere, proceed to step 2.

- [ ] **Step 2: Add overrides block**

Edit `package.json` to add (after `devDependencies`):

```json
  "overrides": {
    "postcss": "^8.5.10"
  }
```

(If Task 3 has already run and added a `glob` override, merge them into one `overrides` block — there is only one allowed per package.json.)

- [ ] **Step 3: Reinstall to apply overrides**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
rm -rf node_modules
npm install
npm list postcss
```

Expected: every `postcss` entry in the tree at ≥8.5.10.

- [ ] **Step 4: Re-audit**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm audit --json | jq '.metadata.vulnerabilities'
```

Expected: `postcss` alert (GHSA-qx2v-qp2m-jg93) no longer present.

- [ ] **Step 5: Build verification**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npx next build
```

Expected: build succeeds (Tailwind/PostCSS pipeline still resolves; same major version).

- [ ] **Step 6: Targeted test verification**

PostCSS affects CSS output. Run the visual/polish test that exercises rendered CSS:

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npx playwright test tests/grok-polish.spec.ts --project=chromium
npx playwright test tests/home.spec.ts --project=chromium
```

Expected: pass. No snapshot drift expected (same major), but if any drift appears apply the same regeneration approach as Task 1 step 6.

- [ ] **Step 7: Commit**

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
chore(deps): pin postcss >=8.5.10 via overrides (CVE-2026-41305, medium)

GHSA-qx2v-qp2m-jg93: PostCSS XSS via unescaped </style> in CSS stringify
output. Already moot at runtime (we only run PostCSS at build time on our
own Tailwind input, output is static CSS), but the override ensures any
future transitive bump can't regress to <8.5.10.
EOF
)"
```

---

### Task 3: Add `overrides` entry for `glob` to force ≥10.5.0 (closes 1 alert)

**Files:** Modify `package.json` (extend `overrides` block), `package-lock.json`

**Why:** Alert #1 flags `glob@10.3.10` (transitive: `eslint-config-next@14.2.35` → `@next/eslint-plugin-next@14.2.35` → `glob`). The vulnerability (GHSA-5j98-mcp5-4vw2, CVE-2025-64756) is command injection in the `glob` CLI's `-c`/`--cmd` flag — we never invoke the glob CLI; this is a pure dev-tree transitive. Patched in 10.5.0. We don't bump `eslint-config-next` (it's still at 14.x and works with the post-Task-1 next@15.5.16), so we force-bump glob via overrides.

**Risk:** Overrides bypass parent compatibility tests. `@next/eslint-plugin-next` uses glob for file matching internally; glob 10.3.x → 10.5.0 is same-major (10.x) and the changelog is patch-level fixes for the CLI flag. Low risk.

- [ ] **Step 1: Capture current glob tree**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm list glob
```

Expected: `glob@10.3.10` under `@next/eslint-plugin-next`. (Other `glob` instances like 7.2.3 under `rimraf` are a different major — Dependabot did not alert on them.)

- [ ] **Step 2: Extend overrides block**

Edit `package.json` to add (or extend the existing `overrides` from Task 2):

```json
  "overrides": {
    "postcss": "^8.5.10",
    "glob": "^10.5.0"
  }
```

If only Task 3 runs first (out of order), the block is just `{ "glob": "^10.5.0" }`.

- [ ] **Step 3: Reinstall to apply override**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
rm -rf node_modules
npm install
npm list glob
```

Expected: `glob@10.5.0` (or higher 10.x) under `@next/eslint-plugin-next`. Other unrelated glob copies (e.g. `glob@7.2.3` under `rimraf`) are unaffected — the override only applies to instances that match major 10.x because the override is `^10.5.0`.

- [ ] **Step 4: Re-audit**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm audit --json | jq '.metadata.vulnerabilities'
```

Expected: glob alert (GHSA-5j98-mcp5-4vw2) cleared.

- [ ] **Step 5: Build verification**

`glob` is used by `@next/eslint-plugin-next` during `next lint`, which runs as part of `next build`.

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npx next build
```

Expected: build succeeds, lint step passes, `out/` generated.

- [ ] **Step 6: Targeted test verification**

`glob` doesn't affect runtime output. The build success in step 5 is the meaningful verification, but run one quick smoke test to confirm nothing broke:

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npx playwright test tests/home.spec.ts --project=chromium
```

Expected: pass.

- [ ] **Step 7: Commit**

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
chore(deps): pin glob >=10.5.0 via overrides (CVE-2025-64756, high)

GHSA-5j98-mcp5-4vw2: glob CLI command injection via -c/--cmd flag.
Transitive via @next/eslint-plugin-next; we never invoke the glob
CLI, but pinning via overrides closes the alert and prevents
regression. Dev-tree only.
EOF
)"
```

---

### Task 4 (final): Verify all alerts cleared and run full test suite

**Files:** None (verification only)

- [ ] **Step 1: Full Playwright suite**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm test
```

Expected: all tests pass across Chromium. ~5–15 min depending on machine. (Note: `playwright.config.ts` currently only defines the Chromium project despite CLAUDE.md mentioning "5 browsers" — the config is the source of truth, so full suite is Chromium-only here.)

If failures: stop and surface. Likely cause is one of the Next 15 behavior changes — either patch the code or surface for human decision.

- [ ] **Step 2: Production-ready check**

Run:
```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
npm run verify:production-ready
```

Expected: prints `✓ No REPLACE_ME placeholders.`

- [ ] **Step 3: Dependabot alert count**

Run:
```bash
gh api 'repos/atheryon-ai/atheryon-website/dependabot/alerts?state=open&per_page=100' --paginate | jq 'length'
```

Expected: `0`.

If any open alerts remain, list them:
```bash
gh api 'repos/atheryon-ai/atheryon-website/dependabot/alerts?state=open&per_page=100' --paginate | jq '[.[] | {n: .number, pkg: .dependency.package.name, ghsa: .security_advisory.ghsa_id, sev: .security_advisory.severity}]'
```

Confirm any remaining alerts are in the **Deferred items** block below. If they are NOT, do not consider the plan complete — either add a Task 5 to remediate, or update this plan's deferred block with reasoning before declaring done.

- [ ] **Step 4: Open the promotion PR**

Push to `dev` and open a PR to `main` (per CLAUDE.md `## Git workflow`):

```bash
cd /Users/terencetsakiris/GitHub/atheryon-website
git push origin dev
gh pr create --base main --head dev --title "chore(deps): clear all 16 Dependabot alerts (next 14→15, postcss + glob overrides)" --body "$(cat <<'EOF'
Closes 16 open Dependabot alerts on `main`.

## Summary

- Bump `next` 14.2.35 → 15.5.16 (no 14.x backport exists; closes 14 alerts).
- Add `overrides.postcss: ^8.5.10` (CVE-2026-41305, transitive).
- Add `overrides.glob: ^10.5.0` (CVE-2025-64756, dev transitive).

## Per-task commits

1. `chore(deps): bump next from 14.2.35 to 15.5.16` — 5 high, 7 moderate, 2 low.
2. `chore(deps): pin postcss >=8.5.10 via overrides` — 1 moderate.
3. `chore(deps): pin glob >=10.5.0 via overrides` — 1 high.

## Static-export context

The site is `output: 'export'`, `images.unoptimized: true`, no middleware, no API routes. Most Next.js CVEs in this batch are not exploitable at runtime, but bumping anyway clears the alert backlog and keeps us on a supported major (Next 14.x line is frozen).

## Test plan

- [x] `npx next build` succeeds (typecheck + lint + static export)
- [x] `npm test` passes (Playwright Chromium suite)
- [x] `npm run verify:production-ready` clean
- [x] `gh api repos/atheryon-ai/atheryon-website/dependabot/alerts?state=open | jq length` returns 0
- [ ] Verified test SWA at https://polite-flower-03ba3020f.7.azurestaticapps.net renders correctly post-deploy

## Approval needed

CODEOWNERS protects `package.json` + `package-lock.json` — needs `@terencetsakiris` review before merge.
EOF
)"
```

Expected: PR created. Note URL.

---

## Deferred items

None. All 16 alerts have a remediation path inside this plan.

Edge-case fallback: if Task 1 (Next 14→15) cannot complete because a hidden code dependency on Next 14 behavior is exposed during the build/test phase AND the cost to migrate is greater than the residual risk (static-export site, server-only CVEs), the explicit fallback is:

1. Roll back Task 1 (`git revert` the next-bump commit on the branch).
2. Open a GitHub issue tracking the deferral:
   ```bash
   gh issue create --title "Defer Next.js 14 → 15 migration; accept residual Dependabot alerts" --body "$(cat <<'EOF'
   Next.js 14 line is frozen at 14.2.35 with no CVE backport. Bumping to 15.5.16
   surfaced [SPECIFIC MIGRATION ISSUE — fill in]. Static-export site
   (output: 'export', images.unoptimized: true, no middleware, no API routes)
   makes all 14 remaining `next` CVEs non-exploitable at runtime, so we
   accept the alerts until the migration is scheduled.

   Re-evaluate when:
   - Next 16 LTS is announced (forces migration anyway), OR
   - The migration blocker [FILL IN] is resolved, OR
   - A `next-14` CVE backport is published (unlikely; line is frozen).

   Tracks Dependabot alerts: #2, #19, #20, #27, #31, #32, #33, #34, #35, #36, #37, #38, #39, #3.
   EOF
   )"
   ```
3. Continue with Tasks 2 and 3 (postcss + glob overrides) which are independent of the next bump and clear 2 of the 16 alerts on their own.

This fallback is the ONLY path that should leave alerts unremediated, and only with explicit human sign-off (since the human must decide that the migration is more expensive than the residual risk).
