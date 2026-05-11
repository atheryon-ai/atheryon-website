# Atheryon Website — IA & Content Issues

Drafted from the 2026-05-11 IA review on branch `claude/review-site-ia-seBMs`. Each section is shaped to paste directly into a GitHub issue: copy the heading as the title, the labels line, and the body underneath.

---

## P0 — Broken links and orphaned routes

### Issue 1: Footer links to `/privacy` and `/terms` but neither page exists

**Labels:** `bug`, `legal`, `p0`

**Problem**
`src/content/site.ts:1171-1172` adds Privacy Policy and Terms of Service to the footer, but there are no `src/app/privacy/` or `src/app/terms/` routes. Both footer links 404.

**Acceptance criteria**
- [ ] `/privacy` renders a Privacy Policy page (real content, not Lorem).
- [ ] `/terms` renders a Terms of Service page.
- [ ] Both pages are added to `sitemap.xml` and to `site.pages`.
- [ ] Footer links resolve with 200 in `npx next build` output.

**Files**
- `src/content/site.ts:1168-1173`
- `src/app/privacy/page.tsx` (new)
- `src/app/terms/page.tsx` (new)
- `public/sitemap.xml`

---

### Issue 2: `sitemap.xml` lists non-existent `/mergers-acquisitions/` route

**Labels:** `bug`, `seo`, `p0`

**Problem**
`public/sitemap.xml:23` advertises `https://atheryon.com.au/mergers-acquisitions/` but the actual route is `/m-and-a-execution/`. Crawlers hit a 404 and the page may not be indexed.

**Acceptance criteria**
- [ ] Replace `/mergers-acquisitions/` with `/m-and-a-execution/` in `sitemap.xml`.
- [ ] Audit every other `<loc>` in `sitemap.xml` against `src/app/` to confirm parity.
- [ ] Add any missing pages (e.g. `/programs`, `/programs/mib-insight`, `/cdm-platform`).

**Files**
- `public/sitemap.xml`

---

### Issue 3: `/what-we-deliver` is in the sitemap but missing from header nav

**Labels:** `ia`, `navigation`, `p0`

**Problem**
The page exists (`src/app/what-we-deliver/page.tsx`) and is in `sitemap.xml:14`, but it is not in `Header.tsx` `mainNav` or in `site.servicesNav`. The only way to reach it is by typing the URL.

**Acceptance criteria**
- [ ] Decide: keep the page and add it to nav, or delete it.
- [ ] If kept: add to header nav (top-level or Services dropdown) with a coherent label.
- [ ] If deleted: remove from `sitemap.xml` and from `site.pages`.

**Files**
- `src/components/Header.tsx:9-23`
- `src/content/site.ts:18-23`
- `src/app/what-we-deliver/page.tsx`

---

## P1 — Navigation taxonomy

### Issue 4: Services dropdown is missing AI-Ready Data, Reference Architectures, Labs, and Programs

**Labels:** `ia`, `navigation`, `p1`

**Problem**
`site.servicesNav` (`site.ts:18-23`) lists only CDM Platform, Recovery & Migration, M&A Execution, Capability Enablement. AI-Ready Data, Reference Architectures, Labs, and Programs are full pages but never surface in the Services menu, so visitors on one of those pages cannot navigate sideways to peer offerings.

**Acceptance criteria**
- [ ] Establish a content model: Services vs. IP/Products vs. Resources.
- [ ] Either expand `servicesNav` to include all service-shaped pages, or introduce a second dropdown (e.g. "Resources" or "Platform").
- [ ] Each service page links to at least two peer pages (cross-linking).

**Files**
- `src/content/site.ts:18-23`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`

---

### Issue 5: Top-level nav has five overlapping buckets

**Labels:** `ia`, `navigation`, `p1`

**Problem**
"How We Work", "What We Deliver", "Services", "Programs", and "Reference Architectures" all live in the top nav with no clear distinction. A first-time visitor has no mental model for which bucket to click.

**Acceptance criteria**
- [ ] Define the role of each bucket in a short internal note (one sentence each).
- [ ] Rename or consolidate so any item belongs in exactly one place.
- [ ] Mobile and desktop nav reflect the same taxonomy.

**Files**
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/content/site.ts`

---

### Issue 6: Service pages are dead ends — no cross-linking

**Labels:** `ia`, `content`, `p1`

**Problem**
`/recovery-migration`, `/capability-enablement`, `/m-and-a-execution`, `/cdm-platform`, `/ai-ready-data` do not link to each other or to related Reference Architectures. Users who land via search have no way to explore adjacent offerings.

**Acceptance criteria**
- [ ] Every service page includes a "Related" section linking to at least two peer pages.
- [ ] Each service page links to at least one Reference Architecture where applicable.

**Files**
- All `src/app/*/page.tsx` under the service routes
- Possibly a new `RelatedLinks` component

---

## P1 — Missing proof and credibility

### Issue 7: No case studies on service pages

**Labels:** `content`, `credibility`, `p1`

**Problem**
`CaseStudy.tsx` is rendered only on the homepage. Service pages claim outcomes ("we recover what others abandon", "50+ programs recovered") with no named proof. Even an NDA-friendly anonymised case (sector, size, problem, outcome, metric) would help.

**Acceptance criteria**
- [ ] Add at least one case study (anonymised if needed) to `/recovery-migration`, `/capability-enablement`, `/m-and-a-execution`, `/cdm-platform`.
- [ ] If real case data is unavailable, state explicitly that detailed case studies are shared under NDA on request.

**Files**
- `src/components/CaseStudy.tsx`
- Service `page.tsx` files
- `src/content/site.ts`

---

### Issue 8: `/about` has no team / leadership bios

**Labels:** `content`, `credibility`, `p1`

**Problem**
About references "senior practitioners" as the core differentiator, but lists no names, photos, or bios beyond the founder. For a senior-led consultancy this directly undermines the pitch.

**Acceptance criteria**
- [ ] Add named team profiles (photo, role, 2-3 line bio, LinkedIn) to `/about`.
- [ ] If team is intentionally a network rather than a roster, say so explicitly and explain how engagement staffing works.

**Files**
- `src/app/about/page.tsx`
- `src/content/site.ts` (around `pages.about`)

---

## P1 — Undefined jargon

### Issue 9: Define "Canonical Data Model" / CDM on first use

**Labels:** `content`, `clarity`, `p1`

**Problem**
CDM is central to the offering but never defined in plain language. A CFO landing on `/cdm-platform` cannot tell what it is or why they need one.

**Acceptance criteria**
- [ ] On `/cdm-platform` and on the homepage CDM teaser, add a one-sentence plain-English definition (e.g. "A single shared definition of every business concept — so 'trade' means the same thing in trading, ops, risk, and compliance.")
- [ ] Linked tooltip or inline definition on first mention site-wide.

**Files**
- `src/content/site.ts` (search for "Canonical Data Model")
- `src/app/cdm-platform/page.tsx`

---

### Issue 10: Define Bronze / Silver / Gold pipeline tiers with a concrete example

**Labels:** `content`, `clarity`, `p1`

**Problem**
The Bronze/Silver/Gold pattern is referenced on the homepage and `/reference-architectures` as if universally known. Current description is abstract.

**Acceptance criteria**
- [ ] Add a worked example on `/reference-architectures` (e.g. "Bronze: raw trade feed from exchange. Silver: standardised and deduplicated. Gold: governance-tracked, ready for regulatory reporting.")
- [ ] Tooltip/footnote on first mention elsewhere.

**Files**
- `src/content/site.ts` (`referenceArchitecturesTeaser`)
- `src/app/reference-architectures/page.tsx`

---

### Issue 11: Expand the "MiB" acronym

**Labels:** `content`, `clarity`, `p1`

**Problem**
"MiB Insight" appears in nav and on `/programs/mib-insight` but the acronym is never expanded. Implied to mean "Market-in-a-Box" but never stated.

**Acceptance criteria**
- [ ] Define MiB on first use on `/programs` and `/programs/mib-insight`.
- [ ] Consider a `/programs` index page if more programs are planned.

**Files**
- `src/content/site.ts` (`pages.programs`, `pages.mibInsight`)
- `src/app/programs/page.tsx`
- `src/app/programs/mib-insight/page.tsx`

---

### Issue 12: Define "regulator-credible"

**Labels:** `content`, `clarity`, `p1`

**Problem**
"Regulator-credible" is a recurring differentiator (homepage tagline, multiple service pages) but never defined operationally. Means what — lineage? audit trails? signed controls?

**Acceptance criteria**
- [ ] Add a one-line definition on the homepage and on `/how-we-work`.
- [ ] Use the same definition consistently across pages.

**Files**
- `src/content/site.ts` (search for "regulator-credible")
- `src/app/how-we-work/page.tsx`

---

### Issue 13: Add plain-English subheadings to jargon-heavy service names

**Labels:** `content`, `clarity`, `p1`

**Problem**
"Capability Enablement", "Recovery & Migration", "Reference Architectures", "AI-Ready Data" are insider terms. Each page should have a single plain-English subheading under the hero so a non-specialist understands within five seconds.

**Acceptance criteria**
- [ ] Each of the four pages has a one-sentence "what this is" subheading directly under the hero headline.
- [ ] Subheadings use no acronyms or undefined terms.

**Files**
- `src/app/capability-enablement/page.tsx`
- `src/app/recovery-migration/page.tsx`
- `src/app/reference-architectures/page.tsx`
- `src/app/ai-ready-data/page.tsx`
- `src/content/site.ts`

---

### Issue 14: Tooltips or footnotes for regulator acronyms

**Labels:** `content`, `clarity`, `p2`

**Problem**
CFTC, EMIR, MAS, JFSA, HKMA, ASIC, FCA, OSFI, ISDA CDM, FpML appear listed by jurisdiction but never explained. Fine for insiders, opaque to buying committees.

**Acceptance criteria**
- [ ] First mention of each acronym has a tooltip or one-line expansion.
- [ ] Optional: a small "Glossary" section on `/about` or `/how-we-work`.

**Files**
- `src/content/site.ts` (around lines 451-580)
- Consider a `Tooltip` component or `<abbr>` usage

---

## P2 — Missing site features

### Issue 15: No FAQ on service pages

**Labels:** `content`, `p2`

**Problem**
FAQ exists only on the homepage. Deep service pages — where users have specific objections — have none.

**Acceptance criteria**
- [ ] Each service page includes a FAQ of 4-6 questions addressing real buyer objections (cost, timeline, integration, IP ownership, ongoing support).

**Files**
- `src/components/FAQ.tsx`
- Service `page.tsx` files
- `src/content/site.ts`

---

### Issue 16: No insights / blog / resources hub

**Labels:** `content`, `seo`, `p2`

**Problem**
No place for ongoing content. Limits repeat visits, SEO compounding, and thought-leadership positioning.

**Acceptance criteria**
- [ ] Decide whether to add an `/insights` or `/blog` route.
- [ ] If yes: scaffold the route, an index page, and at least one post (could be repurposed from existing case study or program content).

**Files**
- `src/app/insights/` (new) or `src/app/blog/` (new)
- `src/content/site.ts`
- `public/sitemap.xml`

---

### Issue 17: No engagement-economics or pricing guidance

**Labels:** `content`, `p2`

**Problem**
`/what-we-deliver` gives engagement *durations* but no cost framing. Only the MiB Program has a price. Buyers can't budget without contacting sales, which gates lower-intent visitors.

**Acceptance criteria**
- [ ] Add a typical engagement-cost range (or "from $X") to each service shape, or a dedicated "Engagement model" page.
- [ ] If pricing is intentionally bespoke, say so and explain the discovery process.

**Files**
- `src/app/what-we-deliver/page.tsx`
- `src/content/site.ts`

---

### Issue 18: Clarify what "Reference Architectures" actually are

**Labels:** `content`, `clarity`, `p2`

**Problem**
Are these diagrams? Downloadable templates? Products? Engagements? Page says "artefacts not claims" without defining the artefact.

**Acceptance criteria**
- [ ] Hero of `/reference-architectures` answers: what they are, whether visitors can use them, and how they're delivered (PDF, code, workshop, etc.).

**Files**
- `src/app/reference-architectures/page.tsx`
- `src/content/site.ts`

---

### Issue 19: Clarify Labs positioning

**Labels:** `content`, `clarity`, `p2`

**Problem**
Labs sits in the top nav but doubles as a flagship demo, reference platform, and pitch artefact. Its role versus Services and Programs is unclear.

**Acceptance criteria**
- [ ] One-sentence positioning in the Labs hero ("Labs is our working reference platform — a live example of the approach we ship to clients.")
- [ ] Decide whether Labs belongs in Services, Resources, or as its own bucket.

**Files**
- `src/app/labs/page.tsx`
- `src/content/site.ts`
- `src/components/Header.tsx`

---

## P3 — Polish / audits

### Issue 20: Per-page SEO metadata audit

**Labels:** `seo`, `p3`

**Problem**
Confirm every page in `src/app/*/page.tsx` exports its own `metadata` (title, description, OG image) rather than inheriting only from `layout.tsx`.

**Acceptance criteria**
- [ ] Every route has a unique `<title>` and `<meta name="description">`.
- [ ] OG/Twitter card tags present on every page.
- [ ] Canonical URL set.

**Files**
- All `src/app/**/page.tsx`
- `src/app/layout.tsx`

---

### Issue 21: Confirm client-logo and case-study content is real, not placeholder

**Labels:** `content`, `p3`

**Problem**
`ClientLogos.tsx` and `CaseStudy.tsx` exist; need to confirm they're populated with real, cleared-for-use data and that the homepage stats ("50+ Programs recovered", etc.) are defensible.

**Acceptance criteria**
- [ ] Logos are real and approved by the relevant clients.
- [ ] Headline stats can be substantiated.
- [ ] If not, remove or replace with honest equivalents.

**Files**
- `src/components/ClientLogos.tsx`
- `src/components/CaseStudy.tsx`
- `src/content/site.ts`

---

### Issue 22: Verify Contact page provides a form and region coverage

**Labels:** `content`, `p3`

**Problem**
Confirm `/contact` is a real form (not just `mailto:`) and states which regions / time zones Atheryon covers.

**Acceptance criteria**
- [ ] Contact page has a form that submits somewhere (or an honest `mailto:` with clear expectations).
- [ ] States Atheryon's geographic coverage.

**Files**
- `src/app/contact/page.tsx`
- `src/content/site.ts`
