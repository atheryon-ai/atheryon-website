# System Architecture Page (`/system/`) — Design Spec

**Date:** 2026-05-03
**Author:** Terry Tsakiris (with Claude)
**Status:** ⚠️ **SUPERSEDED** — see `labs-platform/docs/superpowers/specs/2026-05-03-system-architecture-page-design.md`
**Reason:** DNS verification revealed `dev.atheryon.ai` resolves to the `labs-platform` Azure Container App (`ca-labs-dev`), not atheryon-website's Static Web App. The deploy target is `labs-platform`, not `atheryon-website`. Architecture changes substantially: in-tree for Atheryon+ATLP posters (only CDM remains cross-repo), middleware bypass needed for public access, Next.js 16 dynamic (not static export), no PAT needed for two of three sources.
**Target site:** [atheryon-website](https://github.com/atheryon-ai/atheryon-website) — Next.js 14 static export on Azure Static Web Apps
**Target URL:** `dev.atheryon.ai/system/` (test env), eventually `www.atheryon.com.au/system/` (prod)

---

## 1. Problem

Atheryon has three carefully designed A3-print architecture posters that capture the platform's structure at a point in time:

1. **Atheryon Platform** (umbrella) — 4 pages, system overview, agent inventory, risk/AFIM/mortgages, infrastructure
2. **Atheryon Trade Lifecycle Platform (ATLP)** — 5 pages, front-to-back greenfield architecture
3. **CDM Platform** — 4 pages, FINOS/ISDA Common Domain Model monorepo

Today these live as standalone HTML files: one on the author's Desktop, two committed inside their respective product repos. They are not visible to anyone outside the workspace, and they go stale silently because there is no link between the source files and any deployed surface.

We want a single web entry point — `dev.atheryon.ai/system/` — that hosts all three posters, refreshes from source on every build, and tells the reader honestly when the snapshot was last updated.

## 2. Decision summary

| Decision | Choice |
|---|---|
| Combine mode | Hub page + 3 linked subpages (each poster keeps its own identity and prints A3) |
| Access control | Public on dev only, **unlisted** (not in main nav, robots disallow) |
| Implementation | Static drop-in for posters + Next.js hub route in `atheryon-website` |
| Source-of-truth sync | Pre-build script fetches latest from each source repo |
| Auth model | Single fine-grained PAT secret in atheryon-website CI |
| Freshness trigger | Every push to `dev`/`main` + daily scheduled cron at 06:00 UTC |
| Failure mode | Build fails loudly on fetch error — never serves stale silently |

## 3. URL structure & routing

| Pretty URL | Resolves to | Source |
|---|---|---|
| `/system` | `out/system.html` | Next.js hub page (App Router) |
| `/system/atheryon` | `public/system/atheryon-architecture-poster.html` | Azure SWA rewrite |
| `/system/atlp` | `public/system/atlp-architecture-poster.html` | Azure SWA rewrite |
| `/system/cdm` | `public/system/cdm-platform-architecture-poster.html` | Azure SWA rewrite |

Rewrites added to `staticwebapp.config.json` `routes` array:

```jsonc
{ "route": "/system",          "rewrite": "/system.html" },
{ "route": "/system/atheryon", "rewrite": "/system/atheryon-architecture-poster.html" },
{ "route": "/system/atlp",     "rewrite": "/system/atlp-architecture-poster.html" },
{ "route": "/system/cdm",      "rewrite": "/system/cdm-platform-architecture-poster.html" }
```

The existing `navigationFallback.exclude` already covers `*.html` indirectly (SWA serves files in `out/system/` before applying the SPA fallback). No exclude changes needed.

## 4. Hub page (`/system/page.tsx`)

The hub is a small Next.js App Router page that uses the site's existing component library so it visually belongs to atheryon.com.au.

**Page structure:**

```
SimpleHero
  title: "System Architecture"
  description: "Three printable A3 posters covering the Atheryon platform,
                the Trade Lifecycle Platform (ATLP), and the FINOS CDM Platform."

SectionDivider

Section
  Grid (md:grid-cols-3)
    Card → /system/atheryon  (target=_blank)
    Card → /system/atlp      (target=_blank)
    Card → /system/cdm       (target=_blank)

SectionDivider

Section (small, muted)
  "Snapshot dated <build-time-stamp>. For current state see each repo's
   ARCHITECTURE.md / CLAUDE.md."
```

**Content lives in `src/content/site.ts`** under a new `site.pages.system` block. No inline strings in TSX (per the project's content discipline; see CLAUDE.md).

```ts
system: {
  title: 'System Architecture',
  description: 'Atheryon platform architecture, in three printable A3 posters.',
  hero: {
    title: 'System Architecture',
    description:
      'Three printable A3 posters covering the Atheryon platform, the Trade Lifecycle Platform (ATLP), and the FINOS CDM Platform.',
  },
  posters: [
    {
      slug: 'atheryon',
      title: 'Atheryon Platform',
      description:
        'Umbrella view: 7 core services, 34 agents, 18 route groups across labs.atheryon.ai, risk.atheryon.ai, and AFIM.',
      meta: '4 pages · A3 landscape',
    },
    {
      slug: 'atlp',
      title: 'ATLP — Trade Lifecycle Platform',
      description:
        'Front-to-back greenfield: 16 business services across the trade lifecycle, on Foundation Platforms F1–F5.',
      meta: '5 pages · A3 landscape',
    },
    {
      slug: 'cdm',
      title: 'CDM Platform',
      description:
        'ISDA/FINOS Common Domain Model monorepo: services, frontends, agents, regulatory coverage matrix.',
      meta: '4 pages · A3 landscape',
    },
  ],
  snapshotNotePrefix: 'Snapshot dated',
  snapshotNoteSuffix:
    '. For current state see each repo\'s ARCHITECTURE.md / CLAUDE.md.',
}
```

**Metadata:**

```ts
export const metadata: Metadata = {
  title: site.pages.system.title,
  description: site.pages.system.description,
  robots: { index: false, follow: false }, // unlisted on dev, will stay unlisted in prod
}
```

**Snapshot stamp source:** the prebuild sync script writes a `config/system-posters.lock.json` containing the fetch timestamp and source SHAs per poster. The hub page imports the lock file at build time and renders the most recent timestamp into the snapshot note. The lock file is committed alongside other config so the rendered date matches the deployed posters byte-for-byte.

**Link behaviour:** `target="_blank" rel="noopener"`. Posters are heavyweight A3 artifacts; opening them in a new tab keeps the hub available for jumping between them.

## 5. Static posters

The three poster HTML files are served unchanged from `public/system/`. Their inline `<style>` blocks remain isolated from the site's globals — there is no Tailwind processing, no Next.js wrapping. Print fidelity (A3 landscape) is preserved exactly as the source produced it.

**Defense-in-depth `<head>` hardening** added by the sync script (single regex insertion, before `</head>`):

```html
<meta name="robots" content="noindex,nofollow">
```

## 6. Build-time sync architecture

### 6.1 Source-of-truth registry

`config/system-posters.json` (committed):

```jsonc
{
  "posters": [
    {
      "slug": "atheryon",
      "title": "Atheryon Platform",
      "destFilename": "atheryon-architecture-poster.html",
      "source": {
        "type": "in-tree",
        "path": "public/system-source/atheryon-architecture-poster.html"
      }
    },
    {
      "slug": "atlp",
      "title": "ATLP — Trade Lifecycle Platform",
      "destFilename": "atlp-architecture-poster.html",
      "source": {
        "type": "github",
        "repo": "atheryon-ai/labs-platform",
        "path": "docs/superpowers/specs/2026-05-01-atlp-architecture-poster.html",
        "ref": "main"
      }
    },
    {
      "slug": "cdm",
      "title": "CDM Platform",
      "destFilename": "cdm-platform-architecture-poster.html",
      "source": {
        "type": "github",
        "repo": "atheryon-ai/cdm-platform",
        "path": "docs/architecture/2026-05-01-cdm-platform-architecture-poster.html",
        "ref": "main"
      }
    }
  ]
}
```

The Atheryon umbrella poster has no repo home today; it gets committed into atheryon-website itself at `public/system-source/` (separate from `public/system/` so the source distinction is visible in the tree). atheryon-website becomes the authority for that file going forward — natural because it is the umbrella view of atheryon.ai.

### 6.2 Pre-build script (`scripts/sync-system-posters.mjs`)

Pure Node, no extra dependencies (uses `fetch`, `fs/promises`).

Behaviour per poster entry:

1. Resolve `source.type`:
   - `in-tree`: read the local file; SHA is the local file's SHA-1 of contents
   - `github`: fetch via Contents API: `GET /repos/{repo}/contents/{path}?ref={ref}`, decode base64; SHA comes from the API response
2. Inject `<meta name="robots" content="noindex,nofollow">` into `<head>` if not present
3. Insert a sync-stamp HTML comment **immediately after the `<!DOCTYPE html>` line** (placement matters — some parsers fail on comments before the doctype): `<!-- synced 2026-05-03T06:00:12Z from <repo>@<sha> -->`
4. Write to `public/system/<destFilename>`

After processing all posters, regenerate `config/system-posters.lock.json` (one object per poster, rewritten on every run):

```jsonc
{
  "version": 1,
  "lastSync": "2026-05-03T06:00:12Z",
  "posters": [
    { "slug": "atheryon", "sha": "...", "fetchedAt": "...", "sourceUrl": "..." },
    { "slug": "atlp",     "sha": "...", "fetchedAt": "...", "sourceUrl": "..." },
    { "slug": "cdm",      "sha": "...", "fetchedAt": "...", "sourceUrl": "..." }
  ]
}
```

Failure modes:

| Failure | Handling |
|---|---|
| 404 (path moved) | `process.exit(1)` with a clear error naming the poster slug and source path |
| 401/403 (auth) | Same as above; suggests checking `POSTER_SOURCE_TOKEN` |
| Network error | Retry once with 2-second backoff, then fail |
| Hash unchanged from previous lock | Log "no change", still rewrite (idempotent) |

The script never falls back to a previously-vendored copy. Stale-without-knowing is the failure mode we are eliminating.

### 6.3 Hook into build

`package.json`:

```jsonc
"scripts": {
  "prebuild": "node scripts/sync-system-posters.mjs",
  "build": "next build",
  ...
}
```

Local dev flow: `npm run dev` does **not** trigger `prebuild`. For local testing run `node scripts/sync-system-posters.mjs && npm run dev` once, or `npm run preview` (which is `build && serve`).

### 6.4 Auth — fine-grained PAT

A single fine-grained PAT named `POSTER_SOURCE_TOKEN`:

- **Owner:** atheryon-ai org service account (or Terry's account if no service account exists)
- **Repository access:** `atheryon-ai/labs-platform`, `atheryon-ai/cdm-platform`
- **Repository permissions:** `Contents: Read-only`
- **Expiry:** 90 days, calendar reminder set 14 days before expiry to rotate
- **Storage:** GitHub Actions secret on `atheryon-ai/atheryon-website` (visible to both Test and Production environments)

The script reads the token from `process.env.POSTER_SOURCE_TOKEN`. Both deploy workflows must explicitly pass the secret through to the build step's environment (GitHub Actions does not auto-inject secrets into job env):

```yaml
- name: Build Next.js
  run: npm run build
  env:
    NODE_ENV: production
    COMMIT_SHA: ${{ github.sha }}
    POSTER_SOURCE_TOKEN: ${{ secrets.POSTER_SOURCE_TOKEN }}
```

This applies to both `.github/workflows/deploy-test.yml` (dev) and `.github/workflows/deploy-production.yml` (prod, currently disabled but will inherit when enabled).

### 6.5 Freshness triggers

| Trigger | Mechanism |
|---|---|
| Push to `dev` or `test` | Existing — `deploy-test.yml` runs `npm run build` → prebuild fetches fresh |
| Push to `main` | Existing — `deploy-production.yml` runs `npm run build` → prebuild fetches fresh |
| Pull request to `dev` | Existing — preview build runs prebuild, validates fetches succeed |
| **Daily cron** (new) | New file `.github/workflows/sync-posters-daily.yml` runs at 06:00 UTC, executes the sync script, and if **any per-poster `sha` in the resulting lock file differs from the committed one** (timestamps alone are ignored), opens a PR to `dev` titled `chore(system): refresh poster snapshots <date>`. |

The cron uses `github-actions[bot]` as the PR author via `peter-evans/create-pull-request`. The workflow needs `permissions: { contents: write, pull-requests: write }`. The PR is opened for human review; auto-merge is **not** enabled by default (operator can opt in later via the standard GitHub auto-merge UI per repo). This is enough freshness for content that changes weekly at most.

A `repository_dispatch` from source repos for minutes-fresh updates is **out of scope** for v1; revisit if posters start changing daily.

## 7. robots & SEO

`public/robots.txt`:

```diff
 User-agent: *
 Allow: /
+Disallow: /system/

 Sitemap: https://atheryon.com.au/sitemap.xml
```

`public/sitemap.xml` — unchanged. `/system/` deliberately omitted.

The Next.js page already declares `robots: { index: false, follow: false }`. Each poster carries the same `<meta>` tag injected by the sync script. This is deliberate redundancy — robots.txt is advisory, the meta tag is authoritative.

## 8. File inventory

| Action | Path |
|---|---|
| NEW | `src/app/system/page.tsx` |
| MOD | `src/content/site.ts` (add `site.pages.system` block) |
| NEW | `config/system-posters.json` |
| NEW | `config/system-posters.lock.json` (generated, committed) |
| NEW | `scripts/sync-system-posters.mjs` |
| NEW | `public/system-source/atheryon-architecture-poster.html` (one-time copy from Desktop) |
| NEW | `public/system/atheryon-architecture-poster.html` (generated by sync script) |
| NEW | `public/system/atlp-architecture-poster.html` (generated by sync script) |
| NEW | `public/system/cdm-platform-architecture-poster.html` (generated by sync script) |
| NEW | `.github/workflows/sync-posters-daily.yml` |
| MOD | `.github/workflows/deploy-test.yml` (pass `POSTER_SOURCE_TOKEN`) |
| MOD | `.github/workflows/deploy-production.yml` (pass `POSTER_SOURCE_TOKEN`) |
| MOD | `staticwebapp.config.json` (add 4 routes) |
| MOD | `public/robots.txt` (add `Disallow: /system/`) |
| MOD | `package.json` (add `prebuild` script) |
| MOD | `.gitignore` — no change; lock file IS committed |

## 9. Testing

### 9.1 Local

- `node scripts/sync-system-posters.mjs` — succeeds with `POSTER_SOURCE_TOKEN` set in `.env.local` (untracked)
- `npm run build` — emits `out/system.html`, `out/system/*.html`
- `npm run preview` — visit:
  - `localhost:3000/system` — hub renders, three cards visible, snapshot date shown
  - `localhost:3000/system/atheryon` — page 1 of Atheryon poster renders
  - `localhost:3000/system/atlp` — page 1 of ATLP poster renders
  - `localhost:3000/system/cdm` — page 1 of CDM poster renders
- Browser print preview on each poster — A3 landscape layout intact
- View source on each poster — `<meta name="robots" content="noindex,nofollow">` present, sync comment present

### 9.2 Sync script unit tests

Lightweight tests in `scripts/sync-system-posters.test.mjs` (run via `node --test`):

- Returns non-zero on 404 from GitHub
- Returns non-zero on missing `POSTER_SOURCE_TOKEN` for github sources
- Idempotent: running twice with same source SHA produces identical output
- Lock file structure matches expected schema

### 9.3 Playwright e2e (`tests/system.spec.ts`)

Two cases:

1. `/system` returns 200, page contains text "System Architecture", three card links present
2. `/system/atheryon`, `/system/atlp`, `/system/cdm` each return 200 and contain their poster `<title>`

Wired into existing `playwright.config.ts`. Runs locally and on PR builds.

### 9.4 Build-fail-on-fetch-error verification

Manual one-time test before merging:

- Set `POSTER_SOURCE_TOKEN` to an invalid value
- Run `npm run build`
- Confirm build fails with a clear message naming which poster failed

## 10. Deploy path

1. Branch off `dev`: `feat/system-architecture-page`
2. Add `POSTER_SOURCE_TOKEN` secret in atheryon-website GitHub Actions settings
3. Implement files per inventory in §8
4. Local verification per §9.1
5. Open PR to `dev`
6. Preview build runs in CI (validates the fetch + build pipeline end-to-end)
7. Merge to `dev` → SWA Test deploy → live at `dev.atheryon.ai/system/`
8. Manual verification on dev per §9.1 (hub renders, three posters render at their pretty URLs, `robots.txt` includes `Disallow: /system/`, snapshot date matches the lock file)
9. Once §9.1 verification passes on dev, the work is complete for this spec. A separate `dev → main` PR for prod is out of scope here (see §12).

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Source repo renames the poster file | Sync script fails build with a clear error → operator updates `config/system-posters.json` path. This is the desired behaviour; better than silent staleness. |
| Source repo dates the next poster `2026-06-01-...` | Same as above — operator updates the manifest. Follow-up: ask source repos to publish a stable undated path (deferred). |
| PAT expires or gets rotated | Daily cron will start failing first → CI alert visible in source-of-truth dashboard. 90-day expiry with 14-day reminder mitigates. |
| Source repo turned public later | No change required — public-readable Contents API still works with the same token. |
| Inline poster styles drift visually with new browser versions | Posters are point-in-time print artifacts; refreshing them is itself the fix. Snapshot date on hub keeps reader expectation grounded. |
| Daily PR noise from cron | PR is opened only when the lock file changes (i.e., a source poster actually changed). Quiet weeks → zero PRs. |

## 12. Out of scope

- Download-as-PDF buttons on each poster (browsers print to PDF natively)
- Mobile reflow (these are A3 print artifacts; mobile gets pinch-to-zoom)
- Sidebar navigation across the three posters (each is its own self-contained artifact)
- Auth-gating (`/system/` stays public-but-unlisted on dev)
- Adding `/system` to main nav header/footer
- Production deploy (`main` branch) — separate PR, separate timing
- `repository_dispatch` from source repos for minutes-fresh sync — defer to v2
- Source-side workflow to publish stable undated paths — coordinated separately with each source repo

## 13. Follow-up obligations (called out, not in this spec)

These are dependencies on other repos that the implementer should track, not implement:

1. **labs-platform**: publish ATLP poster at a stable, undated path (e.g., `docs/architecture/atlp-poster.html`) so the manifest URL doesn't break on each new dated snapshot. Sync script's manifest gets updated then.
2. **cdm-platform**: same — stable path for the CDM poster.
3. **CODEOWNERS** entries on the poster paths in both repos so downstream deploys are visible to the owning teams.
