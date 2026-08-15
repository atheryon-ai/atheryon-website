# Functions and Sectors IA

Date: 2026-08-15
Status: draft for Terry review
Supersedes: the rev 5 arms model in `docs/superpowers/plans/2026-08-09-exec-first-ia-restructure.md` (two arms named M&A and Capital Markets over a shared `DATA · TRANSFORMATION · AI` strip)
Decided by: Terry, 2026-08-15
Branch context: `ia/kill-the-choosers`

## 1. Decision record

Atheryon has **two functions**, not two desks, and **four sectors**. Both functions serve every sector.

| Layer | What it is | Public names |
|---|---|---|
| Function 1 | The transaction motion | **M&A Transaction Services** (short, always: **M&A Services**) → `/ma` |
| Function 2 | Technology, data and AI delivery | **Data, Transformation, AI** (header: `DATA & AI`) → `/data-ai` |
| Sectors | Who both functions serve. Not pages. | Capital markets · Banking · Wealth management · Non-bank financial institutions |

Sectors are an audience line. They are never routes, never nav items, never empty catalogues.

This reverses three 2026-08-09 decisions, deliberately:

- **Capital Markets is no longer a function name.** It is one of four sectors. The old `/capital-markets` arm 301s into `/data-ai`.
- **`DATA · TRANSFORMATION · AI` is no longer the shared strip under both arms.** It is function 2. The bronze strip on the poster becomes the four sectors.
- **AI may appear in the function-2 name.** The 2026-08-09 rule “never in an arm name” applied to a third arm called AI. Function 2 is the three-discipline name Terry chose. Prose still keeps the “data-enabled and AI-assisted” register. AI is never a third function.

This does **not** revive the rejected Transformation pillar. Transformation is one word inside function 2, not a sibling of M&A.

Content-separation (rev 7) still holds, renamed: **do not mix function 1 with function 2.** Transaction material stays on `/ma`. Standalone data, transformation and AI material stays on `/data-ai`. Each page carries exactly one cross-link to the other. M&A service line 04 (Technology, Data & Migration Readiness) stays on `/ma`; it is function-2 work *inside a deal*, not a reason to merge the pages.

Public copy says **function**, not arm. Component names (`ArmSubNav`) may stay until a later cleanup.

Anna leads function 1. Terry leads function 2. Order is always function 1 then function 2.

### Rejected alternatives

- Renaming function 2 “Banking” or “Capital Markets”. The work is a function; banking and capital markets are sectors.
- Sector pages (`/banking`, `/wealth`, `/nbfi`, `/capital-markets` as a sector landing). No approved per-sector service catalogue exists outside markets. Empty sector pages are the same overclaim as the Banking rename.
- Keeping `/capital-markets` and `/data-ai` as sibling L2 pages. That is the current three-item chooser (M&A / Capital Markets / Data & AI) with new labels.
- Putting sectors only on function 2. Terry: functions are across all sectors.

## 2. Label register

Use these strings and no others. Short form is for the header and other space-constrained chrome. Full form is for the poster, page titles, banners, footer, 404, and body.

| Role | Full | Short |
|---|---|---|
| Function 1 | M&A Transaction Services | M&A Services |
| Function 2 | Data, Transformation, AI | DATA & AI |
| Sector 1 | Capital markets | CAPITAL MARKETS |
| Sector 2 | Banking | BANKING |
| Sector 3 | Wealth management | WEALTH |
| Sector 4 | Non-bank financial institutions | NBFIs |

Never use bare “M&A” as a label. The short form is always **M&A Services**, so it cannot be read as the deal itself. Header, mobile menu, active-state tests, 404 tags, and breadcrumbs that need a short name all use `M&A Services`. Full form stays on the poster, function landing, footer, contact select, and body.

“Data, Transformation, AI” keeps the three-term punctuation already on `/data-ai` (not “Data Transformation and AI”). Body copy uses **wealth management**; the poster strip uses `WEALTH`. Body copy spells out non-bank financial institutions on first use; the poster strip uses `NBFIs`.

Header CTA is unchanged: `DISCUSS A SITUATION` / `DISCUSS` → destination is context-sensitive (see §5).

## 3. Target sitemap

Live routes only. Redirects in §8. Retired routes stay retired.

```
L1  /
    Firm landing. Two functions, then four sectors.

L2  Functions
    /ma                              Function 1 — M&A Transaction Services
    ├── /ma/experience
    ├── /ma/approach
    └── /ma/contact

    /data-ai                         Function 2 — Data, Transformation, AI
    ├── /data-ai/experience
    ├── /data-ai/approach
    ├── /data-ai/contact
    └── /data-ai/supply-chain        Application of function 2 to physical
                                     operations (pharma / health). Not a sector.

L2  Firm (not functions)
    /experience                      Both functions' cases, stacked, F1 first
    /approach                        Both functions' method, stacked, F1 first
    /about                           Story + co-founders
    /contact                         Firm form. Practice select is the two functions.

L3  Function-2 depth (not in the header)
    /system
    /labs
    ├── /labs/themes
    /themes
    ├── /themes/front-office-trading
    ├── /themes/middle-office-ops
    ├── /themes/compliance-surveillance
    ├── /themes/risk-analytics
    ├── /themes/treasury
    ├── /themes/entity-intelligence
    └── /themes/foundation-ods
    /offers
    ├── /offers/code
    ├── /offers/prompts
    │   └── /offers/prompts/thanks   Deliberately orphaned from nav (existing)
    └── /offers/consult

L2  Writing
    /blog
    └── /blog/why-claude

L2  Legal
    /privacy
    /terms

Auth
    /integration/*                   sp-clients role (unchanged)

404 by decision (no redirect)
    /roadmap                         Mortgages practice retired 2026-08-15
```

### What is not a route

- `/capital-markets` and `/capital-markets/{experience,approach,contact}` — 301 into `/data-ai` equivalents.
- `/banking`, `/wealth`, `/nbfi`, `/sectors` — not built.
- `/mortgages` — already gone.
- A third function.

### Logical shape (not the URL tree)

```
Atheryon
│
├── Function 1: M&A Transaction Services          ──┐
│     Transaction readiness                         │
│     Separation and integration                    │  both functions
│     Execution leadership                          │  across
│     Technology, data and migration (inside a deal)│
│                                                   │
├── Function 2: Data, Transformation, AI          ──┤
│     Data · Transformation · AI                    │
│     Markets depth (existing CM service lines)     │
│     Platform depth (system, labs, themes, offers) │
│     Supply chain application                      │
│                                                   │
└── Sectors (audience, not pages)                 ──┘
      Capital markets
      Banking
      Wealth management
      Non-bank financial institutions
```

A bank deal is function 1. A bank data program is function 2. Same pairing for capital markets, wealth management, and NBFIs.

## 4. Page roles

### `/` — firm

Viewport 1 (StatementBand, still once site-wide):

```
Making
Complex Change
Executable.

Understanding implications early. Executing with confidence.

✓  M&A TRANSACTION SERVICES          → /ma
✓  DATA, TRANSFORMATION, AI          → /data-ai
————————
CAPITAL MARKETS · BANKING · WEALTH · NBFIs

DISCUSS A SITUATION                  → /contact
```

The bronze `FoundationRule` carries the four sectors. It is no longer `DATA · TRANSFORMATION · AI`.

Section 2 supporting copy names the two functions and the four sectors. It replaces the current “transactions, transformation, capital markets, data and technology initiatives” list. Explore drops from three links to two:

- Explore M&A Transaction Services → `/ma`
- Explore Data, Transformation, AI → `/data-ai`

The explore grid becomes two columns, not three.

Then two function proof sections, F1 first:

- **M&A Transaction Services** — existing transaction proof strip (retail and business banking sit under Banking; wealth management is now its own sector; NBFIs stay). Do not invent a capital-markets transaction proof.
- **Data, Transformation, AI** — existing `$84M` data-program recovery. The line under it describes the function (data, transformation and AI programs), not “capital markets systems…”.

Founders:

- Anna Contos — Transactions, Separation & Integration. Drop “Transformation” from her line: that word now names function 2.
- Terry Tsakiris — Data, Transformation, AI. Drop “Capital Markets, Data, Technology & AI”.

### `/ma` — function 1

Existing transaction page, retitled. Hero label `atheryon / ma`. Subtitle keeps Anna as lead and the transaction scope. Arm sub-nav stays: Overview · Experience · Approach · Contact on `/ma/*`.

Service lines 01–04 stay. Line 04 stays the one place function-2 technique appears inside a deal. Add (or retarget) one cross-link: standalone data, transformation and AI programs live on `/data-ai`.

Do not add a sector list as cards. A single audience sentence is enough: the function is engaged across capital markets, banking, wealth management and non-bank financial institutions.

### `/ma/experience`, `/ma/approach`, `/ma/contact`

Keep. Titles and chrome say M&A Transaction Services where they currently say M&A, if the longer name fits the banner; the short label is **M&A Services**, including the breadcrumb (`atheryon / ma / …` may keep the URL token `ma`). Cases and method do not change.

### `/data-ai` — function 2

This is now the function-2 landing, not a shared foundation page. It gains the same sub-nav as `/ma`: Overview · Experience · Approach · Contact.

Page shape, in display order:

1. **Banner** — Data, Transformation, AI. Engaged standalone for technology, data and transformation programs. Audience sentence: the four sectors.
2. **Principle** — keep the regulated-delivery principle if it is still the function’s claim. It is no longer “the underpinning under both arms”.
3. **The three disciplines** — existing Data, Transformation, AI sections. Rewrite any sentence that calls this page the shared foundation beneath both arms. Function 2 *is* those three disciplines.
4. **Published depth: capital markets** — the four current `/capital-markets` service lines, framed as markets depth, not as the function’s name. Do not retitle them as banking, wealth, or NBFI lines. Do not invent parallel catalogues.
5. **Platform depth** — System, Labs, Themes, Offers (same four links, same notes).
6. **Where else it shows up** — two links only: M&A Transaction Services (`/ma#technology-data-migration`) for work inside a deal; Supply Chain (`/data-ai/supply-chain`) for the physical-operations application. Do not link to `/capital-markets`. Do not add Banking / Wealth / NBFI links.

CTA on this page and its sub-pages: `v3` function-2 CTA → `/data-ai/contact`.

### `/data-ai/experience`

Move the three Appendix C cases here from `/capital-markets/experience`. Page chrome uses the function name. Case clients stay as written (Financial Markets; Commodities; Institutional Banking & Markets). Do not add invented banking, wealth, or NBFI cases. `TODO(terry)` if a non-markets case is needed later.

### `/data-ai/approach`

Move the current `/capital-markets/approach` content here. Delivery examples stay; they are evidenced. Rewrite “the Capital Markets arm” to the function name. “Senior capital-markets judgement” in method copy may stay where it describes the judgement, or become “senior specialist judgement” — do not invent a broader claim.

### `/data-ai/contact`

Move `/capital-markets/contact` here. Preset topic `data-ai`. Body: technology, data or transformation program. Not “capital markets engagement” as the only frame.

### `/data-ai/supply-chain`

Unchanged role: an application of function 2, not a fifth sector and not a third function. It does not appear on the homepage sector strip. Render the function-2 sub-nav so the visitor can get back to Overview / Experience / Approach / Contact. Add the missing SWA rewrite (it is in the sitemap today and has no rewrite).

### `/experience` and `/approach`

Stay firm-level, stacked, not choosers (already true on this branch). Labels become the two function full names, F1 first. Links: `/ma/experience` and `/data-ai/experience`; `/ma/approach` and `/data-ai/approach`.

### `/about`

Positioning statement can stay (transactions, transformations, technology-driven change). Founder roles: Anna leads M&A Transaction Services; Terry leads Data, Transformation, AI. Terry’s first-person bio currently says he leads the Capital Markets arm — rewrite that sentence to the function. Do not invent new credentials.

### `/contact`

Firm form. Practice select has **two** visible options, not three:

- M&A Transaction Services (`ma-execution`)
- Data, Transformation, AI (`data-ai`)

Drop the visible Capital Markets option. Keep `TOPIC_LABELS['capital-markets']` mapped onto the function-2 label so old `?topic=capital-markets` links still pre-fill.

### L3 function-2 depth

`/system`, `/labs`, `/labs/themes`, `/themes`, `/themes/[id]`, `/offers` and the offer children stay at their URLs. They remain function-2 depth: linked from `/data-ai` and from the Technology footer column, never from the header. Labs may keep “banking platform” and “capital-markets expert” — those describe the artefact, not the firm’s function name. Do not retitle Themes as a four-sector map; the seven buyer themes are still markets functions.

### Writing and legal

`/blog`, `/blog/why-claude`, `/privacy`, `/terms` unchanged.

### 404

Two function entries, not three. Drop the separate Capital Markets row. Data & AI’s tag is no longer “the foundation under both arms”.

```
Home
M&A Transaction Services
Data, Transformation, AI
Experience
Approach
About
Writing
Contact
```

## 5. Navigation surfaces

Every surface that currently says Capital Markets or treats Data & AI as a third sibling is in scope.

### Header (`shellConfig` + `HomeNav`)

```
M&A SERVICES · DATA & AI · ABOUT     DISCUSS A SITUATION
```

Three items, not four. Capital Markets leaves the header.

Active state:

- `M&A SERVICES` is current on `/ma` and `/ma/*`.
- `DATA & AI` is current on `/data-ai` and `/data-ai/*`, **and** on L3 depth `/system`, `/labs`, `/themes`, `/offers` (the highlight that today sits on Capital Markets).
- `ABOUT` is current on `/about`.

Header CTA destination:

| Where the visitor is | CTA goes |
|---|---|
| `/ma` and `/ma/*` | `/ma/contact` |
| `/data-ai` and `/data-ai/*` | `/data-ai/contact` |
| L3 function-2 depth (`/system`, `/labs`, `/themes`, `/offers`) | `/data-ai/contact` |
| Everywhere else | `/contact` |

Today `/data-ai` deep-links to `/contact?topic=data-ai` because function 2 had no contact page. After this it does.

Mobile menu lists the same three links plus the CTA. Same labels.

### Function sub-nav (`ArmSubNav`)

```
Overview · Experience · Approach · Contact
```

`base` is `/ma` or `/data-ai`. Render on every function page including `/data-ai/supply-chain`. Do not add Supply Chain as a fifth sub-nav item.

### Footer

**Firm** column (always):

- M&A Transaction Services → `/ma`
- Data, Transformation, AI → `/data-ai`
- Experience → `/experience`
- Approach → `/approach`
- About → `/about`
- Contact → `/contact`

One row per function. The current pair (Capital Markets **and** Data. Transformation. AI.) collapses to one.

**Technology** column (function-2 surfaces only): System, Labs, Themes, Offers. Show it when the path is `/data-ai`, `/system`, `/labs`, `/themes`, `/offers`, or a child of those. Today’s `TECH_SURFACES` lists `/capital-markets`; replace with `/data-ai`. Still hidden on `/ma`, `/`, `/about`, `/experience`, `/approach`, `/contact`, legal, blog.

**Resources:** Writing → `/blog`.

Legal row unchanged.

### Homepage poster and explore

Described in §4 `/`. Poster function labels use the full names (or the three-term function-2 form already designed for the strip). Sector line uses the short sector register.

### Contact form

Described in §4 `/contact`. Arm contact pages keep a hidden preset topic and do not show the practice select.

### Internal cross-links that must move

| Current | After |
|---|---|
| `/capital-markets` anywhere in copy | `/data-ai` |
| `/capital-markets/experience` | `/data-ai/experience` |
| `/capital-markets/approach` | `/data-ai/approach` |
| `/capital-markets/contact` and `v3.cmCta` | `/data-ai/contact` |
| `/data-ai` “Where it shows up” → Capital Markets | remove (that content is now on this page) |
| `/data-ai` “Where it shows up” → M&A | keep, label M&A Transaction Services |
| `/capital-markets` cross-link → `/ma#technology-data-migration` | keep, on `/data-ai` |
| `/technology` | 301 to `/data-ai` (one hop) |

## 6. Journeys

These are the paths the IA must support. If a path needs a new page that is not in §3, the IA is wrong.

1. **Bank (or wealth, or NBFI) executive with a deal.** `/` → M&A Transaction Services → `/ma` → Discuss → `/ma/contact`. Sectors are visible on `/` so they recognise themselves. They never have to pick “Capital Markets”.
2. **Same executive with a data or platform program.** `/` → Data, Transformation, AI → `/data-ai` → Discuss → `/data-ai/contact`.
3. **Markets COO who still types `/capital-markets`.** 301 to `/data-ai`. They see the function, then the markets service lines they already knew.
4. **Visitor on `/ma` who realises the work is a standalone data program.** One cross-link to `/data-ai`. Header still says M&A Services until they leave.
5. **Visitor on `/data-ai` whose work is inside a deal.** One cross-link to `/ma#technology-data-migration`.
6. **Visitor who wants the platform artefact.** `/data-ai` platform depth, or the Technology footer on a function-2 page → `/labs` / `/system` / `/themes` / `/offers`. Header highlights DATA & AI. CTA goes to `/data-ai/contact`.
7. **Pharma / health supply-chain visitor.** Only from `/data-ai` (or a direct URL / sitemap). Not on the homepage sector strip. Sub-nav can return them to function 2.
8. **Neutral visitor, header Discuss.** Lands on `/contact`, picks one of the two functions. No third choice.
9. **404.** Two functions, then firm pages. No dead Capital Markets link.
10. **Old `/technology` bookmark.** One hop to `/data-ai`.

There is no journey that starts at a sector. Sectors do not have URLs.

## 7. Claims and copy

- Never invent a number, client, date, timeline, credential, or capability. No banking, wealth, or NBFI service lines or cases unless Terry supplies them.
- Australian spelling. Transformation, organise, summarise.
- Function 1 before function 2 wherever both appear. Replaces “M&A before Capital Markets”. Short labels: M&A Services before DATA & AI.
- One “not X — Y” corrective contrast per page, max. One em dash per page, max. No “actually”.
- Do not call function 2 a platform, a product, or Labs. Labs stays L3.
- Do not call the four sectors “practices” or “arms”.
- Homepage M&A proof already names retail banking, business banking, wealth management, NBFIs. Map retail + business → Banking; keep Wealth management and NBFIs. Do not silently drop wealth management. Do not add a capital-markets bullet to that strip without an approved transaction fact.
- Function-2 `$84M` case stays; it is a financial-markets data program and is honest markets depth, not a problem.

## 8. Redirects and SWA

New 301s (Azure SWA, `staticwebapp.config.json` — static export has no Next redirects):

| From | To |
|---|---|
| `/capital-markets` | `/data-ai` |
| `/capital-markets/experience` | `/data-ai/experience` |
| `/capital-markets/approach` | `/data-ai/approach` |
| `/capital-markets/contact` | `/data-ai/contact` |
| `/technology` | `/data-ai` (change from `/capital-markets`; one hop) |

Existing redirects that currently land on `/capital-markets` must be retargeted so nothing chains. Existing redirects onto `/ma`, `/offers`, `/system`, `/themes`, `/blog` stay.

New rewrites for the static files:

- `/data-ai/experience`, `/data-ai/approach`, `/data-ai/contact`
- `/data-ai/supply-chain` (live today, missing from SWA)

Remove the `/capital-markets` rewrites once the 301s exist.

`public/sitemap.xml`: drop the four `/capital-markets` URLs; add the three new `/data-ai/*` function pages; keep `/data-ai/supply-chain`; raise `/data-ai` to the same priority as `/ma` (0.9).

## 9. Implementation surface (for the later plan, not this spec’s job to sequence)

In scope when this spec is approved:

- `src/content/site.ts` (`v3` home, ma, capitalMarkets → dataAi merge, dataAi, experience, approach, contact, about, footer, CTAs)
- Move `src/app/(cm)/capital-markets/**` to `src/app/(cm)/data-ai/{experience,approach,contact}/` and fold the landing content into `data-ai/page.tsx`
- `shellConfig.ts`, `HomeNav.tsx`, `ArmSubNav.tsx`, `Footer.tsx`, `ContactForm.tsx`, `not-found.tsx`
- `StatementBand` / homepage explore layout (two columns)
- `staticwebapp.config.json`, `public/sitemap.xml`
- Tests: `tests/home.spec.ts`, `tests/v3-ia.spec.ts`, `tests/mobile-nav.spec.ts`, and any other `/capital-markets` assertions
- Copy/design rules: `CLAUDE.md`, `AGENTS.md`, design standard §0 / any “M&A before Capital Markets” line

Out of scope:

- New sector pages or sector-specific service catalogues
- Rewriting Labs, Themes, Offers, or System copy to drop “banking” / “capital markets” where those words describe the artefact
- A new poster SVG (the 2026-08-09 asset becomes historical; `StatementBand` data is the live poster)
- Renaming the `ArmSubNav` component
- Changing Formspree, auth, or deploy topology

## 10. Spec self-review

- No TBDs. Wealth management is in. Sectors are firm-level. Function 2 URL is `/data-ai`.
- Rev 7 separation is preserved under the new names. M&A line 04 stays on `/ma`.
- One implementation plan can cover this: it is a rename, a merge of two L2s, and a nav collapse. It does not need a platform rewrite.
- Ambiguity closed: header short forms (M&A Services, never bare M&A); wealth management is the full sector name; NBFI strip abbreviation; supply chain is an application; L3 URLs stay; contact select has two options; `/technology` is one hop.
