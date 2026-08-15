# MECE and Navigation Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the live site match the two-function, four-sector model: one map, no duplicate pages, no repeated sermons.

**Architecture:** Keep the two function landings (`/ma`, `/data-ai`) as the offer. Collapse Experience, Approach and Contact to one URL each. Make header, function row, footer and 404 describe the same tree. Cut copy that restates the same idea under a new heading.

**Tech Stack:** Next.js 15.5 static export, `v3` in `src/content/site.ts`, Azure SWA redirects in `staticwebapp.config.json`, Playwright Chromium.

**Spec:** `docs/superpowers/specs/2026-08-15-functions-and-sectors-ia-design.md` (rev 2). This plan supersedes spec §3 target sitemap and §5 header CTA / contact destinations where they still describe three contact pages and three experience pages.

## Global Constraints

- Copy rules in `CLAUDE.md`: never invent a number, client, date, timeline, credential or capability; Australian spelling; third person except Terry on `/about` and `/labs`; max one “not X — Y” per page; max one em dash per page; no “actually”.
- Design standard: one dark ground, tokens not hexes, bronze structural only, one CTA per viewport (the header Contact Us), M&A Transaction Services before Data, Transformation, AI.
- Short function-1 label is always **M&A Services**, never bare `M&A`.
- Header CTA label is **CONTACT US**. It lives only in the header (and the mobile menu, which is the header).
- Sectors stay an audience line, not pages. Do not invent banking, wealth or NBFI catalogues.
- Static export: all redirects go in `staticwebapp.config.json`, never Next redirects.
- Do not touch Formspree, auth, or deploy topology.

## Decision record (locked for this plan)

These close the forks the spec left open, and the MECE / nav review of 2026-08-15.

1. **One Experience.** Canonical URL is `/experience`. It already stacks both functions, M&A first. It must carry the full Context / Role / Outcome cases (today those live only on `/ma/experience` and `/data-ai/experience`). Those two URLs 301 to `/experience#ma` and `/experience#data-ai`. Function sub-nav Experience points at those hashes.
2. **One Approach.** Canonical URL is `/approach`. It already stacks both functions. It must carry the full method copy (today on `/ma/approach` and `/data-ai/approach`). Those URLs 301 to `/approach#ma` and `/approach#data-ai`. Function sub-nav Approach points at those hashes.
3. **One Contact.** Canonical URL is `/contact`. Header Contact Us always goes to `/contact`. Inside a function it may add `?topic=ma-execution` or `?topic=data-ai` so the form presets. `/ma/contact` 301s to `/contact?topic=ma-execution`. `/data-ai/contact` 301s to `/contact?topic=data-ai`.
4. **Header** is `M&A SERVICES · DATA & AI · ABOUT` plus Contact Us. Never bare `M&A`.
5. **Footer Firm** lists unique URLs only: the two functions (full names), Experience, Approach, About. No second Contact row (header owns it).
6. **Footer Technology** (function-2 surfaces only): Labs, System, Offers. **Themes leaves the footer.** `/themes` is renamed **Buyer themes** in the page title and any remaining links. `/labs/themes` stays a child of Labs and is called **Platform themes** on that page. Same word is no longer used for both.
7. **`/ma` landing** is hero, principle, four boxes, how we engage, collapsed workflows. Drop Why Clients Choose Atheryon, How we work, and Our Belief.
8. **`/data-ai` landing** is hero, principle, four markets boxes, one Labs link, one M&A line-04 link, one Supply chain link. Drop the three discipline cards (Data / Transformation / AI) and the “Where it shows up” restatement that repeats those links as a third index.
9. **Sectors** stay on the homepage bronze strip and as one audience sentence on each function landing. No sector pages. No new cases.

### Target sitemap

```
/                         Firm. Two functions, four sectors, two proof strips, founders.

/ma                       Function 1 offer (boxes + engage)
/data-ai                  Function 2 offer (boxes + three links)
/data-ai/supply-chain     Application, not a sector

/experience               Both functions' cases, full CRO, F1 first
/approach                 Both functions' method, full copy, F1 first
/about                    Story + bios
/contact                  The only form

/labs                     Platform artefact
/labs/themes              Platform themes (not in footer)
/system                   Reference architecture
/themes                   Buyer themes (not in footer)
/offers                   How to license the artefact
  /offers/code
  /offers/prompts
  /offers/prompts/thanks
  /offers/consult

/blog
/blog/why-claude
/privacy
/terms
```

### Target navigation

```
Header:     M&A SERVICES · DATA & AI · ABOUT     CONTACT US → /contact
                                                      (on /ma* add ?topic=ma-execution)
                                                      (on /data-ai* and L3 add ?topic=data-ai)

On /ma:     Overview → /ma
            Experience → /experience#ma
            Approach → /approach#ma

On /data-ai: Overview → /data-ai
             Experience → /experience#data-ai
             Approach → /approach#data-ai

Footer Firm (always):
            M&A Transaction Services → /ma
            Data, Transformation, AI → /data-ai
            Experience → /experience
            Approach → /approach
            About → /about

Footer Technology (only /data-ai*, /labs*, /system, /themes*, /offers*):
            Labs · System · Offers

404:        Home, two functions (full names), Experience, Approach, About, Writing
```

Header and footer Experience are the same URL. Header and function-row Experience are the same URL with a hash. That is one map.

## File map

| File | Responsibility |
|---|---|
| `src/components/shellConfig.ts` | Header labels + CTA href `/contact` |
| `src/components/home/HomeNav.tsx` | CTA always `/contact` with optional `?topic=` |
| `src/components/ArmSubNav.tsx` | Experience/Approach hrefs become firm URLs + hash |
| `src/components/Footer.tsx` | Drop Themes from Technology; TECH_SURFACES unchanged |
| `src/content/site.ts` | Footer links, `/ma` and `/data-ai` copy cuts, `/experience` and `/approach` take full content |
| `src/app/(cm)/experience/page.tsx` | Render full CRO for both functions; section ids `ma` and `data-ai` |
| `src/app/(cm)/approach/page.tsx` | Render full method for both functions; same ids |
| `src/app/(cm)/ma/page.tsx` | Remove Why, values, belief |
| `src/app/(cm)/data-ai/page.tsx` | Remove discipline grid and restated “where it shows up” |
| `src/app/(cm)/ma/experience/page.tsx` | Delete after 301 exists |
| `src/app/(cm)/ma/approach/page.tsx` | Delete after 301 exists |
| `src/app/(cm)/ma/contact/page.tsx` | Delete after 301 exists |
| `src/app/(cm)/data-ai/experience/page.tsx` | Delete after 301 exists |
| `src/app/(cm)/data-ai/approach/page.tsx` | Delete after 301 exists |
| `src/app/(cm)/data-ai/contact/page.tsx` | Delete after 301 exists |
| `src/app/(cm)/themes/page.tsx` | Title/banner: Buyer themes |
| `src/app/(cm)/labs/themes/page.tsx` | Banner: Platform themes |
| `src/app/not-found.tsx` | Align with header + firm pages |
| `staticwebapp.config.json` | New 301s; one-hop `/technology` already → `/data-ai` |
| `public/sitemap.xml` | Drop deleted URLs; keep `/experience` and `/approach` |
| `tests/v3-ia.spec.ts`, `tests/home.spec.ts`, `tests/mobile-nav.spec.ts`, `tests/grok-polish.spec.ts` | Assert the new map |

---

### Task 1: Header labels and one Contact Us destination

**Files:**
- Modify: `src/components/shellConfig.ts`
- Modify: `src/components/home/HomeNav.tsx`
- Test: `tests/home.spec.ts`, `tests/mobile-nav.spec.ts`

**Interfaces:**
- Consumes: existing `shellConfig.cm`
- Produces: `nav[0].label === 'M&A SERVICES'`, `cta.href === '/contact'`, `HomeNav` builds `ctaHref` as `/contact` plus optional topic

- [ ] **Step 1: Point the header tests at the new labels and the single contact URL**

In `tests/home.spec.ts` the header loop must expect:

```ts
['M&A SERVICES', '/ma'],
['DATA & AI', '/data-ai'],
['ABOUT', '/about'],
```

and:

```ts
await expect(page.locator('.home-nav-cta')).toHaveAttribute('href', '/contact')
```

In `tests/mobile-nav.spec.ts` the panel labels must include `M&A SERVICES` (not `M&A`) and `CONTACT US` → `/contact`.

Add to `tests/v3-ia.spec.ts` (or home.spec):

```ts
test('Contact Us from /ma presets the M&A topic on the firm form', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute(
    'href',
    '/contact?topic=ma-execution',
  )
})

test('Contact Us from /data-ai presets the function-2 topic on the firm form', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute(
    'href',
    '/contact?topic=data-ai',
  )
})
```

- [ ] **Step 2: Run the header assertions and confirm they fail on the current `M&A` label and `/ma/contact` deep-link**

Run: `npx playwright test tests/home.spec.ts tests/mobile-nav.spec.ts --project=chromium`

Expected: fail on `M&A SERVICES` and/or the `/contact` href.

- [ ] **Step 3: Change the chrome**

`shellConfig.ts` nav:

```ts
{ label: 'M&A SERVICES', href: '/ma' },
{ label: 'DATA & AI', href: '/data-ai' },
{ label: 'ABOUT', href: '/about' },
```

CTA stays `{ label: 'CONTACT US', shortLabel: 'CONTACT US', href: '/contact' }`.

`HomeNav.tsx` `ctaHref`:

```ts
const ctaHref = isWithin('/ma')
  ? '/contact?topic=ma-execution'
  : isWithin('/data-ai') || FUNCTION_2_DEPTH.some(isWithin)
    ? '/contact?topic=data-ai'
    : config.cta.href
```

Do not link to `/ma/contact` or `/data-ai/contact`.

- [ ] **Step 4: Re-run the header tests**

Run: `npx playwright test tests/home.spec.ts tests/mobile-nav.spec.ts tests/v3-ia.spec.ts -g "Contact Us" --project=chromium`

Expected: the new assertions pass. Ignore unrelated stale failures in the same files until later tasks.

- [ ] **Step 5: Commit**

```bash
git add src/components/shellConfig.ts src/components/home/HomeNav.tsx tests/home.spec.ts tests/mobile-nav.spec.ts tests/v3-ia.spec.ts
git commit -m "fix(nav): M&A Services in the header, Contact Us to /contact"
```

---

### Task 2: One Experience page, one Approach page

**Files:**
- Modify: `src/app/(cm)/experience/page.tsx`
- Modify: `src/app/(cm)/approach/page.tsx`
- Modify: `src/components/ArmSubNav.tsx`
- Modify: `src/content/site.ts` (`v3.pages.experience`, `v3.pages.approach`)
- Delete after redirects (Task 5): `src/app/(cm)/ma/experience/page.tsx`, `src/app/(cm)/ma/approach/page.tsx`, `src/app/(cm)/data-ai/experience/page.tsx`, `src/app/(cm)/data-ai/approach/page.tsx`
- Test: `tests/v3-ia.spec.ts`

**Interfaces:**
- Consumes: `v3.pages.maExperience.sections.cases`, `v3.pages.cmExperience.sections.cases`, `v3.pages.maApproach.sections`, `v3.pages.cmApproach.sections`
- Produces: `/experience` sections with `id="ma"` and `id="data-ai"`; `/approach` same ids; `ArmSubNav` links to `/experience#ma` etc.

- [ ] **Step 1: Rewrite the stacked-page tests so they assert full content and the new sub-nav hrefs**

Replace the current `/experience` “links through to `/ma/experience`” test with:

```ts
test('/experience is the only cases page and carries full CRO for both functions', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.locator('#ma')).toBeVisible()
  await expect(page.locator('#data-ai')).toBeVisible()
  await expect(page.getByText('Context').first()).toBeVisible()
  await expect(page.getByText('more than $20 billion at signing', { exact: false })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Recovery of a Failed $84M Data & Analytics Program' })).toBeVisible()
  await expect(page.locator('main').locator('a[href="/ma/experience"]')).toHaveCount(0)
})

test('/approach is the only method page and carries both functions in full', async ({ page }) => {
  await page.goto('/approach')
  await expect(page.locator('#ma')).toBeVisible()
  await expect(page.locator('#data-ai')).toBeVisible()
  await expect(page.getByText('From pre-sign to operational independence')).toBeVisible()
  await expect(page.getByText('APRA CPS 234', { exact: false })).toBeVisible()
  await expect(page.locator('main').locator('a[href="/ma/approach"]')).toHaveCount(0)
})

test('function sub-nav Experience and Approach point at the firm pages', async ({ page }) => {
  await page.goto('/ma')
  const nav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(nav.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#ma')
  await expect(nav.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '/approach#ma')
  await page.goto('/data-ai')
  const nav2 = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(nav2.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#data-ai')
  await expect(nav2.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '/approach#data-ai')
})
```

- [ ] **Step 2: Run those tests and confirm they fail**

Run: `npx playwright test tests/v3-ia.spec.ts -g "only cases page|only method page|function sub-nav" --project=chromium`

Expected: FAIL — `/experience` has no Context blocks; sub-nav still points at `/ma/experience`.

- [ ] **Step 3: Promote the function pages into the firm pages**

`experience/page.tsx`: for each function, render the same CRO block now in `ma/experience/page.tsx` (index, name, engagement, client, details). Wrap each function in `<DocSection>` whose heading wrapper has `id="ma"` or `id="data-ai"` and `className="scroll-mt-24"`. Do not add “in full” links to the old URLs.

`approach/page.tsx`: for function 1, render `maApproach` lifecycle + governance. For function 2, render `cmApproach` examples + method + delivery. Same ids.

`ArmSubNav.tsx`: stop concatenating `base + segment`. Build:

```ts
const hrefs = {
  overview: base,
  experience: base === '/ma' ? '/experience#ma' : '/experience#data-ai',
  approach: base === '/ma' ? '/approach#ma' : '/approach#data-ai',
} as const
```

Leave the Overview / Experience / Approach labels. Do not add Contact back.

- [ ] **Step 4: Re-run the three tests**

Run: `npx playwright test tests/v3-ia.spec.ts -g "only cases page|only method page|function sub-nav" --project=chromium`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/(cm)/experience/page.tsx src/app/(cm)/approach/page.tsx src/components/ArmSubNav.tsx src/content/site.ts tests/v3-ia.spec.ts
git commit -m "fix(ia): one Experience page and one Approach page"
```

---

### Task 3: Cut `/ma` and `/data-ai` so each landing has one job

**Files:**
- Modify: `src/app/(cm)/ma/page.tsx`
- Modify: `src/app/(cm)/data-ai/page.tsx`
- Modify: `src/content/site.ts` (`v3.pages.ma.sections`, `v3.pages.dataAi.sections`)
- Test: `tests/v3-ia.spec.ts`

**Interfaces:**
- Consumes: existing `s.lines`, `s.principle`, `s.engagement`, `s.workflows`, `s.depth`
- Produces: `/ma` without Why / values / belief; `/data-ai` without the three-discipline grid and without a third index titled “Where it shows up”

- [ ] **Step 1: Assert the sermons are gone and the offer remains**

```ts
test('/ma is offer then engage, not a repeated sermon', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('heading', { name: 'Transaction Readiness' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How we engage' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Why Clients Choose Atheryon' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'How we work' })).toHaveCount(0)
  await expect(page.getByText('Our Belief')).toHaveCount(0)
})

test('/data-ai is boxes plus three links, not three indexes', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.getByRole('heading', { name: 'Capital Markets Systems & Platform Delivery' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the function works' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Where it shows up' })).toHaveCount(0)
  await expect(page.locator('main').locator('a[href="/labs"]')).toHaveCount(1)
  await expect(page.locator('main').locator('a[href="/ma#technology-data-migration"]')).toHaveCount(1)
  await expect(page.locator('main').locator('a[href="/data-ai/supply-chain"]')).toHaveCount(1)
})
```

- [ ] **Step 2: Run and confirm fail**

Run: `npx playwright test tests/v3-ia.spec.ts -g "repeated sermon|three indexes" --project=chromium`

Expected: FAIL on the `toHaveCount(0)` assertions.

- [ ] **Step 3: Delete the extra sections from the pages**

`/ma`: keep DocBanner, ArmSubNav, principle, ServiceLineIndex, workflows `<details>`, engagement. Remove the Why `DocSection`, the values `DocSection`, the belief `DocSection`. Leave the content in `site.ts` if you want a git record; stop rendering it.

`/data-ai`: keep DocBanner, ArmSubNav, principle, ServiceLineIndex. Replace the discipline grid and the “Where it shows up” list with a single short list of three links (Labs, M&A Transaction Services → `/ma#technology-data-migration`, Supply chain). Do not invent new link copy; reuse the existing notes on `s.depth.links` (Labs) and `s.arms.links`.

- [ ] **Step 4: Re-run the two tests**

Run: `npx playwright test tests/v3-ia.spec.ts -g "repeated sermon|three indexes|four service lines|markets depth" --project=chromium`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/(cm)/ma/page.tsx src/app/(cm)/data-ai/page.tsx src/content/site.ts tests/v3-ia.spec.ts
git commit -m "fix(copy): cut repeated sermons on the two function landings"
```

---

### Task 4: Footer, 404, and the two Themes

**Files:**
- Modify: `src/content/site.ts` (`v3.footer.groups`)
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/(cm)/themes/page.tsx` (h1 + description + banner label)
- Modify: `src/app/(cm)/labs/themes/page.tsx` (banner title only)
- Test: `tests/v3-ia.spec.ts`, `tests/themes.spec.ts` if it asserts the h1 “Themes”

**Interfaces:**
- Produces: footer Technology = Labs, System, Offers; `/themes` visible title **Buyer themes**; `/labs/themes` visible title includes **Platform themes**

- [ ] **Step 1: Assert the footer map and the renamed titles**

```ts
test('footer Firm matches the unique URLs and Technology has no Themes', async ({ page }) => {
  await page.goto('/')
  const firm = page.getByLabel('Footer navigation')
  await expect(firm.getByRole('link', { name: 'M&A Transaction Services', exact: true })).toHaveAttribute('href', '/ma')
  await expect(firm.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute('href', '/experience')
  await expect(firm.getByRole('link', { name: 'Contact', exact: true })).toHaveCount(0)
  await expect(firm.getByText('Technology', { exact: true })).toHaveCount(0)

  await page.goto('/labs')
  const tech = page.getByLabel('Footer navigation')
  await expect(tech.getByRole('link', { name: 'Labs', exact: true })).toBeVisible()
  await expect(tech.getByRole('link', { name: 'Themes', exact: true })).toHaveCount(0)
})

test('/themes is Buyer themes and /labs/themes is Platform themes', async ({ page }) => {
  await page.goto('/themes')
  await expect(page.getByRole('heading', { level: 1, name: 'Buyer themes' })).toBeVisible()
  await page.goto('/labs/themes')
  await expect(page.getByRole('heading', { name: /Platform themes/i })).toBeVisible()
})
```

- [ ] **Step 2: Run and confirm fail**

Run: `npx playwright test tests/v3-ia.spec.ts -g "footer Firm|Buyer themes" --project=chromium`

- [ ] **Step 3: Change the labels**

Footer Firm (already has the two functions, Experience, Approach, About — do not add Contact). Footer Technology: drop the Themes row.

`/themes` h1 → `Buyer themes`. Description line keeps “Seven buyer themes across capital markets…” so the page still explains itself.

`/labs/themes` banner title → `Platform themes` (keep the existing body).

404 list: Home, M&A Transaction Services, Data, Transformation, AI, Experience, Approach, About, Writing. No Contact row.

- [ ] **Step 4: Re-run**

Run: `npx playwright test tests/v3-ia.spec.ts tests/themes.spec.ts -g "footer Firm|Buyer themes|Themes" --project=chromium`

Expected: PASS, or themes.spec updated to the new h1.

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts src/app/not-found.tsx src/app/(cm)/themes/page.tsx src/app/(cm)/labs/themes/page.tsx tests
git commit -m "fix(nav): one footer map, and stop calling two pages Themes"
```

---

### Task 5: Redirects, delete the extra routes, sitemap

**Files:**
- Modify: `staticwebapp.config.json`
- Modify: `public/sitemap.xml`
- Delete: the six function-level experience / approach / contact `page.tsx` files (and empty dirs)
- Test: `tests/v3-ia.spec.ts` retired-route table; `tests/grok-polish.spec.ts` (today hits `/ma/contact`)

**Interfaces:**
- Produces: SWA 301s listed below; `next build` no longer emits the deleted HTML files

Redirects (all 301, one hop — retarget anything that still lands on `/capital-markets/*` or `/ma/contact`):

| From | To |
|---|---|
| `/ma/experience` | `/experience#ma` |
| `/ma/approach` | `/approach#ma` |
| `/ma/contact` | `/contact?topic=ma-execution` |
| `/data-ai/experience` | `/experience#data-ai` |
| `/data-ai/approach` | `/approach#data-ai` |
| `/data-ai/contact` | `/contact?topic=data-ai` |
| `/capital-markets` | `/data-ai` (already planned) |
| `/capital-markets/experience` | `/experience#data-ai` |
| `/capital-markets/approach` | `/approach#data-ai` |
| `/capital-markets/contact` | `/contact?topic=data-ai` |
| `/technology` | `/data-ai` (already one hop) |

SWA fragment identifiers in `redirect` may be dropped by some clients. That is acceptable: the destination page still stacks both functions, M&A first. Keep the hash in the `ArmSubNav` hrefs (in-app Next links honour it).

- [ ] **Step 1: Point grok-polish and v3-ia contact tests at `/contact`**

`tests/grok-polish.spec.ts` currently `goto('/ma/contact')`. Change to `goto('/contact?topic=ma-execution')`.

Remove or rewrite tests that `goto('/ma/experience')` and expect 200 — they should `goto('/experience#ma')` instead.

Add the new from/to pairs to the existing `retired-route redirects (SWA only)` table.

- [ ] **Step 2: Run the local (non-SWA) tests that still hit the old paths**

Run: `npx playwright test tests/grok-polish.spec.ts tests/v3-ia.spec.ts -g "contact|experience|approach" --project=chromium`

Expected: fail wherever a test still requires the old files as 200.

- [ ] **Step 3: Add the 301s, delete the pages, trim the sitemap**

Add the redirect objects to `staticwebapp.config.json` *above* any rewrite for those paths. Remove the `/ma/experience` etc. rewrites.

Delete the six `page.tsx` files. Leave `v3.pages.maExperience` / `cmExperience` / `maApproach` / `cmApproach` in `site.ts` — `/experience` and `/approach` still read them.

`public/sitemap.xml`: drop `/ma/experience`, `/ma/approach`, `/ma/contact`, `/data-ai/experience`, `/data-ai/approach`, `/data-ai/contact`, and any remaining `/capital-markets*`. Keep `/experience` and `/approach` at priority 0.8+.

- [ ] **Step 4: `npx next build` and the Playwright suite**

Run: `npx next build` then `npx playwright test --project=chromium`

Expected: build succeeds; no test still `goto`s a deleted path expecting 200. Visual baselines for `/` and `/experience` will change — update darwin snapshots with `--update-snapshots`. Linux snapshots wait for the usual CI refresh.

- [ ] **Step 5: Commit**

```bash
git add staticwebapp.config.json public/sitemap.xml src/app tests
git commit -m "fix(ia): 301 duplicate experience, approach and contact URLs"
```

---

### Task 6: Docs and leftover labels

**Files:**
- Modify: `docs/superpowers/specs/2026-08-15-functions-and-sectors-ia-design.md` §3 and §5 to match this plan’s sitemap and nav
- Modify: `CLAUDE.md` / `AGENTS.md` “M&A before Capital Markets” → “M&A Transaction Services before Data, Transformation, AI”; header short form M&A Services
- Modify: `docs/superpowers/specs/2026-08-09-design-standard.md` page-end CTA line (there is no page-end CTA)

- [ ] **Step 1: Search the repo for leftover public labels**

Run: `rg -n "DISCUSS A SITUATION|Discuss a situation|/ma/contact|/ma/experience|bare M&A|CAPITAL MARKETS', href" src tests CLAUDE.md AGENTS.md`

Expected: only historical comments, 301 sources, or the poster sector strip.

- [ ] **Step 2: Patch the living docs so they describe the site this plan ships**

Do not rewrite 2026-08-09 historical plans. Do rewrite CLAUDE.md, AGENTS.md, the functions spec §3/§5, and the design-standard CTA sentence.

- [ ] **Step 3: Commit**

```bash
git add docs CLAUDE.md AGENTS.md
git commit -m "docs: record one Experience, one Approach, one Contact"
```

---

## Self-review

**Spec coverage.** Functions and sectors, label register, no sector pages, content separation, `/technology` one hop, supply chain as application — all kept. Spec §3’s three experience pages and three contact pages are intentionally superseded by Tasks 2 and 5. Spec §5’s header `DISCUSS A SITUATION` was already replaced in the live site; this plan records Contact Us → `/contact`.

**Placeholders.** None. Redirect table is complete. Copy cuts name the sections to delete. No new cases or sector catalogues.

**Consistency.** Hashes are `#ma` and `#data-ai` everywhere. Topic query values stay `ma-execution` and `data-ai` (already in `ContactForm`). Footer Technology no longer contains Themes, so it cannot collide with `/labs/themes`.

**Out of scope on purpose.** Rewriting Labs, Offers, or System body copy. New sector evidence. Renaming `ArmSubNav`. A new poster SVG.
