# Executive-First IA Restructure — Implementation Brief

Date: 2026-08-09
Status: approved for implementation on `dev`
Revision: 2 (2026-08-09) — hybrid two-capability structure adopted from external positioning feedback, with amendments recorded in §1
Decided by: Terry (with external positioning feedback); content authored by Anna
Implementer: Claude Code
Source content: Appendix A (verbatim); adopted positioning language: Appendix B

## 1. Decision record

- The site restructures to executive-first progressive disclosure: L1 executive landing (outcomes, risk, proof), L2 services and evidence, L3 method and technology depth. Buyers are executives in highly regulated financial-services environments; technical detail must be reachable but never lead.
- Structure: **hybrid — one front door, one narrative, two capabilities.** The transaction story owns the root. Two named practices sit under it: **Transaction Advisory & Execution** (flagship, led by Anna) and **Technology & Data** (led by Terry). The second is a real practice page at `/technology`, sellable for standalone engagements, not just proof behind a service line. The CM legacy pages (/system, /labs, /themes, /offers) remain L3 depth beneath it.
- Presentation is asymmetric everywhere: the flagship leads; Technology & Data is framed as the strategic capability behind it, with one line noting it is also engaged standalone. Equal-weight capability cards are explicitly out — they recreate the "which business are you" confusion.
- Hero stays **"Making Transactions Executable"**. "Complex Change. Executed." was considered and rejected as category-generic; the proof strip is transaction proof, so the claim stays transaction-anchored. "Transformation" appears in capabilities and experience copy, not the hero. Firm positioning statement and connective narrative: Appendix B.
- Rejected alternatives, for the record: (a) two sibling brands ("Atheryon M&A" / "Atheryon AI") — two businesses sharing a logo; (b) AI-led positioning — commoditised claim; Anna's separation and carve-out record is the scarcer asset and leads.
- Anna Contos and Terry Tsakiris are **co-founders** (fact confirmed by Terry 2026-08-09). Any "Founded by Anna Contos" phrasing in the source content must be ported as co-founders. Anna leads the transaction advisory practice; Terry leads technology (wording per existing bios in `site.ts`).
- AI positioning: never the headline. Landing and flagship pages use the "data-enabled and AI-assisted" register at most. AI lives inside the Technology & Data practice copy — not in the practice name, not in the hero. Agent workflows, partner detail and CPS 234 material sit on `/technology` and the CM legacy pages beneath it.

## 2. Target IA

```
/                 L1  executive landing (new)
├── /services     L2  flagship practice: Transaction Advisory & Execution (new)
├── /technology   L2  practice: Technology & Data (new; ships phase 2)
│   └── links to /system · /labs · /themes · /offers  (existing pages, URLs kept,
│       removed from nav and homepage; linked only from /technology and footer)
├── /experience   L2  case studies, both practices (new)
├── /approach     L2  method + governance, exec tone (new)
├── /about        L2  story + co-founder bios (rework of existing)
└── /contact      L2  single CTA target (existing root page, reworked copy)

/blog, /roadmap, /privacy, /terms, /mortgages, /integration/* — unchanged.
/ma, /ma/approach, /ma/offers, /ma/contact — retired via 301 (phase 3).
```

Header nav (single shell): phase 1 `SERVICES · EXPERIENCE · APPROACH · ABOUT`; phase 2 inserts `TECHNOLOGY` after SERVICES (five items, same count as the current CM nav). CTA button → `/contact`.
CTA label: `TODO(terry): CTA wording — "BOOK M&A REVIEW" is practice-speak; needs executive phrasing.` Interim label until answered: `CONTACT` (neutral, makes no claim).
The PracticeToggle disappears from the header (one front door). Do not delete the component in phase 1; stop rendering it.

## 3. Content mapping (source block → target, with required fixes)

The IA review of the source content found duplication and gaps. These fixes are mandatory during port, not optional polish.

| Source block | Target | Port instructions |
|---|---|---|
| Hero + firm intro (7 paras) | `/` | Compress. Pattern per existing heroes: one-line claim ("Making Transactions Executable"), 2–3 line subtitle naming audience (Boards, executive teams, investors, PE sponsors, corp dev). Proof strip immediately after: RAMS $21.4bn integration, >$1bn separation programs, four FS sectors, four jurisdictions. Two CTAs: primary → /contact, secondary → /services. Subtitle may use the Appendix B positioning statement. Remaining intro paragraphs move to /about. |
| Why Atheryon + Our Principle | `/` section | Problem statement + the 7-bullet "We help clients" list. The principle is stated ONCE site-wide (here). Cut the near-verbatim restatement that appears in Our Story. |
| Our Approach (5 values) | `/` strip (or /approach intro) | These are values, not method — landing material, one line each. Not a page. |
| (no source — Appendix B) | `/` capabilities section | Two entries, asymmetric: Transaction Advisory & Execution first and visually dominant → /services; Technology & Data second → /technology, with a one-line standalone-engagements note. Not equal cards. Phase 1: hide the Technology & Data entry behind an `isPending` guard until /technology ships in phase 2 — no dead links. |
| Services (4 lines) | `/services` | Page titled as the flagship practice: Transaction Advisory & Execution. TSA items currently appear in all four lines; dedupe so each line owns distinct TSA scope (readiness: TSA strategy; strategy: TSA design/exit planning; execution: TSA establishment/exit management; technology: TSA-driving data dependencies). Add an engagement section at page end: embedded senior specialists alongside the client team, pre-sign through operational independence. No stated durations (decided 2026-08-09: drop "6–18 months"). |
| Representative Experience (5 cases) | `/experience` | Normalise schema: every case gets Context / Role / Outcome. RAMS first. Others keep anonymised client descriptors as written. Add technology-side outcomes (capital markets transformation, platform delivery): `TODO(terry): supply 1–2 technology case facts — do not invent`. |
| Our Story | `/about` | Merge with co-founder bios: Anna (source: `v2Ma.approach.sections.seniorSpecialist`) and Terry (source: `v2.about` principals). Co-founder framing per §1. Story narrative only — the "value lost too late" argument lives on `/`. |
| (no source) | `/approach` | Method + governance in executive tone: lifecycle stages (pre-sign → Day 1 → operational independence/TSA exit), governance and regulatory posture. Light AI mention only. Salvage from `v2Ma.approach` §01/§04 prose, stripped of agent/platform detail. |
| (no source — Appendix B) | `/technology` | Practice page: Technology & Data. Executive-tone outcomes (technology and data separation, migration, platform transition, application rationalisation, AI-enabled analysis, delivery acceleration); practitioner nouns (enterprise architecture, data platforms) belong in body copy, not headings. States the practice is engaged standalone as well as inside transactions. Carries the demoted v2Ma AI content (3 workflows, embedded delivery detail) and links to /system, /labs, /themes. Partner names stay off this page (decided 2026-08-09). If partners are referenced in body copy anywhere: S&P Global is a data partner, Microsoft Azure the technology runtime; detail remains on the L3 legacy pages. |
| (no source) | `/contact` | Keep the root page and Formspree form. Rewrite copy for firm-level executive audience. /ma/contact's `defaultTopic="ma-execution"` becomes the default enquiry path. |

Every page ends with a CTA to `/contact` (existing DocFooter/end-of-document pattern). The source content contains zero CTAs; add them.

## 4. Copy rules — port hazards

CLAUDE.md copy rules apply in full. Specific hazards found in the source content:

- "successful transactions are not defined by signing a deal. They are defined by…" — banned "not X — Y" corrective contrast; rewrite.
- Rhythmic three-item lists throughout ("separations, integrations and complex business transitions"; "discretion, accountability and professionalism"; several more). Vary or trim.
- Australian spelling is already correct in the source; keep it.
- Em dashes: max one per page after port.
- **Never invent numbers or clients.** All figures come from Appendix A verbatim. Anything missing gets `TODO(terry): …`.

Sign-off: figures ($21.4bn, "one of the largest loan portfolio acquisitions in Australian history", >$1bn, four months / ten months, hypercare claim) confirmed for public use — Terry, 2026-08-09. The main-promotion gate is lifted.

## 5. staticwebapp.config.json changes

Phase 1 (required for /approach to work):
- **Delete** `{ "route": "/approach", "redirect": "/system", "statusCode": 301 }` — it shadows the new page.
- Add rewrites following the existing pattern: `/services`, `/experience`, `/approach` → their `.html` files.

Phase 2:
- Add the `/technology` rewrite when the page ships.

Phase 3:
- `/ma` → `/` 301; `/ma/approach` → `/approach`; `/ma/offers` → `/services`; `/ma/contact` → `/contact`.
- Retarget existing `/ma/system` and `/ma/workflows` entries from `/ma/approach` to `/approach`.
- Note: this file is CODEOWNERS-protected; changes go through PR review.

## 6. Implementation notes

- Branch: `dev`. Promote to `main` via merge PR per CLAUDE.md git workflow, gated on the Anna sign-off above.
- Content lives in `src/content/site.ts` as a new `v3` generation export (pattern: `site` → `v2` → `v2Ma` → `v3`). Leave `v2`/`v2Ma` in place until the routes that read them retire.
- Use `{{PLACEHOLDER}}` markers + `isPending` guards (pattern in `(cm)/labs/page.tsx`) for any copy awaiting a TODO answer.
- New pages use the `Doc*` component family. Landing may need new `home/*`-style components; existing CM homepage components are not reused.
- Voice: third person throughout the new pages (first person remains only on /labs and /blog/why-claude per CLAUDE.md).
- Route groups: the `(cm)` group becomes the firm shell (update `shellConfig.cm`). `ma` group untouched until phase 3. `mortgages` untouched.
- Footer: CM links (system, labs, themes, offers) regroup under a "Technology" heading; legal links unchanged.
- After code changes: `graphify update .`

## 7. Phases and acceptance

**Phase 1 — re-shell the root.** `v3` content, new `/`, `/services`, `/experience`, `/approach`, reworked `/about` + `/contact`, nav swap, config edits per §5.
AC: `npx next build` green; targeted Playwright for new routes; `npm run verify:production-ready` passes; `/ma/*` untouched and still renders; `/approach` serves the new page (redirect removed).

**Phase 2 — /technology practice page + CM demotion.** Technology & Data practice page, `TECHNOLOGY` nav item inserted after SERVICES, CM links out of nav/homepage, footer regroup, `/technology` rewrite added.
AC: /system, /labs, /themes, /offers all still 200 and reachable from /technology and footer; TECHNOLOGY nav link live.

**Phase 3 — retire /ma.** Redirects per §5, remove `ma` route group pages, drop PracticeToggle component.
AC: all four /ma URLs 301 to correct targets on the test SWA.

## 8. Open TODOs (blocking copy, not structure)

1. RESOLVED (rev 2): firm descriptor is the Appendix B positioning statement ("specialist advisory firm…"); execution is carried in the flagship practice name.
2. `TODO(terry)`: CTA label (header button + page-end CTAs). Interim: `CONTACT`.
3. RESOLVED 2026-08-09: embedded engagement model kept; stated durations dropped (§3).
4. RESOLVED 2026-08-09: no partner names on /technology; S&P Global = data partner, Azure = technology runtime if referenced in body copy; detail stays at L3 (§3).
5. RESOLVED 2026-08-09: figures confirmed for public use (Terry); `main` gate lifted (§4).
6. `TODO(terry)`: technology-side experience cases for /experience (§3) — real engagements, facts only, no invention. Candidate to consider: the S&P Global TeraHelix cloud-migration engagement already referenced publicly in `v2` offers copy — confirm client consent for a named case entry.

---

## Appendix A — source content (verbatim, Terry 2026-08-09)

ATHERYON

Making Transactions Executable

Atheryon is a specialist transaction advisory firm focused on separations, integrations and complex business transitions where execution risk can materially impact transaction outcomes.
We help organisations navigate the operational realities of acquisitions, divestments, carve-outs, demergers and strategic exits, ensuring transaction decisions are informed by a clear understanding of what execution will require.
Our role is to help clients make better decisions before transaction commitments are made and provide experienced leadership from signing through to operational independence.
Founded by Anna Contos, Atheryon brings more than two decades of separation, integration and transformation experience gained across Australia, Europe, the United Kingdom and the United States. Anna has led and advised on acquisitions, divestments, carve-outs, demergers and strategic exits across some of the most regulated and operationally complex sectors of financial services, including retail banking, business banking, wealth management and non-bank financial institutions.
[Port note: co-founder framing per §1 overrides the "Founded by" line above.]
We work with Boards, executive teams, investors, private equity sponsors and corporate development teams to structure transactions, prepare organisations for change and execute with confidence.
As transactions become increasingly shaped by technology, data and digital operating environments, Atheryon combines deep transaction expertise with data-enabled and AI-assisted approaches.

WHY ATHERYON

Many transactions encounter avoidable challenges because the operational implications of separation or integration are not fully understood before commercial commitments are made.
Separation requirements are underestimated. Integration challenges emerge late. Transitional Service Arrangements (TSAs) become larger and longer than anticipated. Costs increase, timelines extend and value is delayed or eroded.
Too often, these challenges arise because the practical realities of execution have not been sufficiently understood before decisions are locked in.
Atheryon brings separation and integration expertise into the transaction process early, helping clients understand what will be required, where risks sit and how execution can be structured for success.

We help clients:

* Understand operational implications before signing
* Identify execution risks earlier
* Build appropriate commercial protections and execution considerations into transaction agreements
* Reduce reliance on TSAs
* Accelerate operational independence
* Improve transaction certainty
* Protect and realise transaction value

Our Principle

Transaction value is protected when separation and integration requirements are understood early.

The earlier these requirements are understood, the greater the opportunity to structure transactions appropriately, reduce execution risk and create a practical pathway to value realisation.

OUR APPROACH

Early Insight — Understanding the operational implications of separation and integration before commitments are made.
Commercial Discipline — Providing practical advice aligned to transaction objectives, commercial outcomes and stakeholder priorities.
Execution Focus — Translating transaction strategy into operational reality.
Leadership Under Pressure — Navigating complex stakeholder, regulatory and delivery environments with clarity and confidence.
Trusted Partnership — Operating with discretion, accountability and professionalism throughout the transaction lifecycle.

SERVICES

Transaction Readiness

Understanding execution requirements before transaction commitments are made.

* Operational feasibility assessments
* Separation and integration diligence
* Bid-phase separation and integration support
* Transaction readiness reviews
* TSA strategy and planning
* Execution risk assessments
* Pre-sign operational dependency analysis

We help clients understand the operational, technology, data and organisational requirements that can materially influence transaction outcomes before commitments are made.

Separation & Integration Strategy

Designing practical pathways to Day 1 readiness and operational independence.

* Separation and integration strategy
* Operating model design
* Day 1 readiness planning
* Transition sequencing
* TSA design and exit planning

Our focus is on creating executable strategies that align commercial objectives with operational realities.

Execution Leadership

Leading complex transitions from signing through implementation.

* Program mobilisation and governance
* Executive stakeholder engagement
* Contractual planning and milestone alignment
* Risk and issue management
* Day 1 execution
* TSA establishment and exit management
* Delivery oversight and execution assurance

We provide experienced leadership across transactions where execution certainty is critical to achieving intended outcomes.

Technology, Data & Migration Readiness

Helping clients understand and plan for the information, technology and migration challenges that often determine transaction success.

* Structured data separation and migration assessments
* Unstructured data and content migration analysis
* Application and platform landscape assessments
* Data quality, ownership and reconciliation planning
* Migration readiness and cutover support
* Operational readiness analysis
* Technology separation and integration planning

Data is often one of the most significant drivers of separation and integration effort. Understanding what information exists, where it resides, how it is used and what must transition can materially influence execution timelines, TSA requirements, operational readiness and transaction value.
Atheryon leverages data-enabled and AI-assisted techniques to help clients identify dependencies, assess migration complexity, improve visibility of risks and support informed decision-making throughout planning and execution.

REPRESENTATIVE EXPERIENCE

Landmark RAMS Mortgage Portfolio Acquisition
Integration Leadership | Specialist Mortgage Servicer
Context: Atheryon leadership played a key role in the transition and integration of the RAMS mortgage portfolio acquisition, a landmark transaction valued at approximately $21.4 billion at signing and recognised as one of the largest loan portfolio acquisitions in Australian history. The transaction involved compressed delivery timeframes, complex separation requirements, multiple service providers, significant operational dependencies and no seller TSA arrangements.
Outcome: Led the successful transition to a new servicing environment, delivering Day 1 operational readiness, seamless customer migration and ongoing regulatory compliance. Despite the scale and complexity of the transaction, timelines were achieved and hypercare issues remained exceptionally low, enabling immediate operational stand-up and value realisation.

Enterprise-Wide Divestment & Separation Advisory
Major Australian Bank
Led separation and integration advisory across divestment and integration programs exceeding $1 billion in transaction value.
Outcome: Reduced separation complexity, accelerated readiness and materially limited TSA exposure across multiple strategic transactions.

Sale & Separation of a Major Financial Advice Business
Leading Retail Bank
Led pre-sign and post-sign separation execution for the sale of a major financial advice business.
Outcome: Completed transaction execution within four months and achieved full operational separation within ten months, with minimal transitional arrangements.

Wealth Demerger & Insurance Divestment
Major Financial Services Organisation
Led separation design and implementation readiness activities supporting significant wealth and insurance transactions.
Outcome: Enabled standalone operation while meeting regulatory, financial and operational requirements.

Operating Model Transformation
Global Investment Bank
Led a large-scale operating model transformation across merged wealth and asset management businesses.
Outcome: Improved execution certainty, restored stakeholder confidence and re-established momentum on a strategically important initiative.

OUR STORY

Atheryon was founded on a simple observation:

Transaction value is often lost when the realities of separation and integration are understood too late.

After more than two decades leading major separation, integration and transformation programs, Anna Contos observed the same pattern repeatedly. Commercial decisions were often made before operational implications had been fully understood. Separation requirements emerged late. Integration challenges became visible only after commitments had been made.
The consequences were predictable: increased costs, delayed timelines, prolonged TSA arrangements and unrealised value.
Atheryon was established to bring experienced separation and integration thinking into the transaction process earlier.
We help clients understand what a transaction will require before decisions are locked in. We help structure practical pathways forward. And when execution begins, we provide the leadership needed to navigate complexity, maintain momentum and deliver outcomes with confidence.
We believe better transaction outcomes are achieved when operational realities inform commercial decision-making from the outset.
Because successful transactions are not defined by signing a deal.
They are defined by achieving operational independence, realising value and delivering the outcomes the transaction was intended to achieve. That belief sits at the heart of everything we do.

---

## Appendix B — adopted positioning language (external feedback 2026-08-09, adopted with amendments)

Positioning statement (firm descriptor; resolves TODO 1):

> Atheryon is a specialist advisory firm helping organisations execute complex transactions and transformations where operational, technology and data dependencies materially impact outcomes.

Connective narrative (for `/` and `/about`):

> Transactions and transformations increasingly succeed or fail based on operational, technology and data complexity. Atheryon combines deep transaction execution experience with technology, data and AI expertise to help organisations understand complexity earlier, reduce execution risk and deliver outcomes with confidence.

Practice names:

- Transaction Advisory & Execution (flagship, led by Anna Contos)
- Technology & Data (led by Terry Tsakiris; AI inside the copy, not the name)

Core IP statement (stated once site-wide, on `/`):

> Transaction value is protected when separation and integration requirements are understood early.

Amendments applied versus the feedback as received: hero remains "Making Transactions Executable" rather than "Complex Change. Executed."; capabilities are presented asymmetrically with the flagship dominant rather than as equal cards; the technology practice name excludes "AI". Port note: the connective narrative above contains a rhythmic triad ("operational, technology and data") that is load-bearing and may stand; apply CLAUDE.md banned-construction rules to any copy derived from it.
