# Executive-First IA Restructure — Implementation Brief

Date: 2026-08-09
Status: approved for implementation on `dev`
Revision: 6 (2026-08-09) — poster-as-homepage: viewport 1 of `/` reproduces the approved poster; navy/bronze hero band ships in phase 1. (Rev 5: arms model — M&A and Capital Markets over DATA · TRANSFORMATION · AI; Terry-authored hero stack; /ma reprieved; /capital-markets replaces /technology.)
Decided by: Terry (with external positioning feedback); content authored by Anna
Implementer: Claude Code
Source content: Appendix A (verbatim); adopted positioning language: Appendix B

## 1. Decision record

- The site restructures to executive-first progressive disclosure: L1 executive landing (outcomes, risk, proof), L2 services and evidence, L3 method and technology depth. Buyers are executives in highly regulated financial-services environments; technical detail must be reachable but never lead.
- Structure (rev 5 — arms model, Terry 2026-08-09): one front door; two business areas presented as arms — **M&A** (led by Anna, route `/ma`) and **Capital Markets** (led by Terry, route `/capital-markets`) — over a shared underpinning strip: `DATA · TRANSFORMATION · AI`. Transformation is reclassified from offer to underpinning (a discipline both arms use); the layered nuance (transformation drawing on data and AI) appears as one sentence on /approach, never as a diagram at L1. The CM legacy pages (/system, /labs, /themes, /offers) are L3 depth beneath /capital-markets. Supersedes the rev 2–4 practice names.
- Presentation (rev 5): the arms are equal cards on `/` (supersedes the asymmetric-cards rule); M&A listed first everywhere — order carries the flagship signal. Each arm is engaged directly; coherence comes from the shared underpinning strip and the founders section, not from hierarchy.
- Hero stack (rev 5, Terry-authored — Appendix B verbatim): hero "Making Complex Change Executable"; subheading "Understanding implications early. Executing with confidence."; supporting copy naming the five areas (transactions, transformation, capital markets, data and technology initiatives). "Making Transactions Executable" is the /ma arm hero; "Making ___ Executable" is the brand construction. The positioning statement moves to /about and page metadata; the bridge sentence is retired from the homepage (kept in Appendix B as available copy). The subheading's sentence fragments are accepted as display type only — the fragment pattern must not spread into body prose.
- Homepage viewport 1 (rev 6, Terry 2026-08-09: "should be the homepage"): reproduces the approved poster — reference asset `docs/superpowers/specs/atheryon-poster-2026-08-09.svg`. Deep navy band (#0E2A3A), serif hero in three lines (Making / Complex Change / Executable.), arms M&A · CAPITAL MARKETS with bronze ticks (#B08D57) over the bronze foundation rule and `DATA · TRANSFORMATION · AI` strip. Additions a webpage needs that the poster doesn't carry: the header nav, the subheading line ("Understanding implications early. Executing with confidence."), and the DISCUSS A SITUATION button. Supporting copy and the proof strip open the next section (existing bone background). This pulls the navy/bronze palette into phase 1 for the hero band only; the full-site re-token remains phase 4, and typography uses the existing display font until §8 TODO 7 is answered.
- Rejected alternatives, for the record: (a) two sibling brands ("Atheryon M&A" / "Atheryon AI") — two businesses sharing a logo; (b) AI-led positioning — commoditised claim; Anna's separation and carve-out record is the scarcer asset and leads; (c) a standalone Transformation pillar (Brief 2) — least differentiated offer, pulls toward the management-consultancy category Brief 2 itself disclaims.
- Founder bios: genericised per Brief 2 — no named employers or logos; "global investment banking", "major Australian banks" register. Rewrite bios from the existing source material with institution names stripped. Named transactions already signed off (RAMS) are unaffected.
- Core principle treatment: featured once on `/` in large typography; referenced but never restated verbatim elsewhere.
- Insights/thought leadership: deferred — no nav item until two or three executive pieces exist; /blog remains as-is.
- Tone of voice (add to §4 rules): avoid disruptive, revolutionary, next generation, game changing, cutting edge; prefer execution, readiness, independence, complexity, delivery, outcomes, value realisation, operational certainty.
- Brand guardrail — Atheryon is not: a software company, an AI startup, a systems integrator, a traditional management consultancy, or a pure M&A advisory firm.
- Anna Contos and Terry Tsakiris are **co-founders** (fact confirmed by Terry 2026-08-09). Any "Founded by Anna Contos" phrasing in the source content must be ported as co-founders. Anna leads the transaction advisory practice; Terry leads technology (wording per existing bios in `site.ts`).
- AI positioning: never the headline and never in an arm name, but it may appear in the underpinning strip (`DATA · TRANSFORMATION · AI`) — foundation register, small type (rev 5). Prose keeps the "data-enabled and AI-assisted" register. Agent workflows, partner detail and CPS 234 material sit beneath /capital-markets.

## 2. Target IA

```
/                    L1  executive landing (new)
├── /ma              L2  arm: M&A — REPRIEVED, rebuilt as the arm page (phase 1)
├── /capital-markets L2  arm: Capital Markets (new; ships phase 2)
│   └── links to /system · /labs · /themes · /offers  (existing pages, URLs kept,
│       removed from nav and homepage; linked only from /capital-markets and footer)
├── /experience      L2  case studies, both arms (new)
├── /approach        L2  method + governance, exec tone (new; out of nav)
├── /about           L2  story + co-founder bios + positioning statement (rework)
└── /contact         L2  single CTA target (existing root page, reworked copy)

/blog, /roadmap, /privacy, /terms, /mortgages, /integration/* — unchanged.
/ma/approach, /ma/offers, /ma/contact — retired via 301 (phase 3). /ma itself stays.
/services, /technology (test-only routes from the earlier carve) — 301 to /ma and /capital-markets.
```

Header nav (single shell): phase 1 `M&A · EXPERIENCE · ABOUT`; phase 2 inserts `CAPITAL MARKETS` after M&A (four items + CTA). /approach leaves the nav — linked from body copy and footer. CTA button → `/contact`.
CTA label (rev 4): header button `DISCUSS A SITUATION`, shortLabel `DISCUSS`, page-end CTAs "Discuss a situation" → `/contact`.
The PracticeToggle disappears from the header (one front door). Do not delete the component in phase 1; stop rendering it.

## 3. Content mapping (source block → target, with required fixes)

The IA review of the source content found duplication and gaps. These fixes are mandatory during port, not optional polish.

| Source block | Target | Port instructions |
|---|---|---|
| Hero + firm intro (7 paras) | `/` | Viewport 1 = the poster band per §1 (navy, hero + subheading, arms + underpinning strip, primary CTA → /contact). Section 2 (bone) opens with the Appendix B supporting copy, then the proof strip: RAMS $21.4bn integration, >$1bn separation programs, four FS sectors, four jurisdictions (add one technology proof point when §8 TODO 6 lands); secondary CTA → /ma. Audience line and remaining intro paragraphs move to /about. |
| Why Atheryon + Our Principle | `/` section | Problem statement + the 7-bullet "We help clients" list. The principle is stated ONCE site-wide (here), framed as the founding observation, large typography. Cut the near-verbatim restatement in Our Story. Dedupe "locked in" phrasing against the bridge sentence. |
| Our Approach (5 values) | `/` strip (or /approach intro) | These are values, not method — landing material, one line each. Not a page. |
| (no source — Appendix B) | `/` arms (inside the viewport-1 poster band, §1) | Two equal entries over the underpinning strip `DATA · TRANSFORMATION · AI`: M&A first → /ma; Capital Markets second → /capital-markets. Phase 1: BOTH labels render (poster fidelity) but only M&A is a link; Capital Markets stays unlinked until phase 2 — no dead links, no hidden card. |
| Founder Story (Brief 2) | `/` founders section | Primary credibility block: two founders, one line each — Anna Contos: Transactions, Separation & Integration, Transformation; Terry Tsakiris: Capital Markets, Data, Technology & AI — link → /about. No employer names. |
| Services (4 lines) | `/ma` | M&A arm page (transformation and operating-model scope included); hero "Making Transactions Executable". TSA items currently appear in all four lines; dedupe so each line owns distinct TSA scope (readiness: TSA strategy; strategy: TSA design/exit planning; execution: TSA establishment/exit management; technology: TSA-driving data dependencies). Add an engagement section at page end: embedded senior specialists alongside the client team, pre-sign through operational independence. No stated durations (decided 2026-08-09: drop "6–18 months"). |
| Representative Experience (5 cases) | `/experience` | Normalise schema: every case gets Context / Role / Outcome. RAMS first. Others keep anonymised client descriptors as written. Add technology-side outcomes (capital markets transformation, platform delivery): `TODO(terry): supply 1–2 technology case facts — do not invent`. |
| Our Story | `/about` | Merge with co-founder bios: Anna (source: `v2Ma.approach.sections.seniorSpecialist`) and Terry (source: `v2.about` principals). Co-founder framing per §1; rewrite bios without named employers (use source material for facts, strip institution names). Also carries the Appendix B positioning statement verbatim plus the audience line. Story narrative only — the "value lost too late" argument lives on `/`. |
| (no source) | `/approach` | Method + governance in executive tone: lifecycle stages (pre-sign → Day 1 → operational independence/TSA exit), governance and regulatory posture. Light AI mention only. Salvage from `v2Ma.approach` §01/§04 prose, stripped of agent/platform detail. Include the layered-underpinning sentence: transformation work draws on the same data and AI foundation. |
| (no source — Appendix B) | `/capital-markets` | Capital Markets arm page. Executive-tone outcomes (technology and data separation, migration, platform transition, application rationalisation, capital markets systems, market data environments, AI-enabled analysis, delivery acceleration); practitioner nouns (enterprise architecture, data platforms) belong in body copy, not headings. States the practice is engaged standalone as well as inside transactions. Carries the demoted v2Ma AI content (3 workflows, embedded delivery detail) and links to /system, /labs, /themes. Partner names stay off this page (decided 2026-08-09). If partners are referenced in body copy anywhere: S&P Global is a data partner, Microsoft Azure the technology runtime; detail remains on the L3 legacy pages. |
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
- Add rewrites following the existing pattern: `/experience`, `/approach` → their `.html` files (`/ma` already has one).
- 301 the test-only route from the earlier carve: `/services` → `/ma`.

Phase 2:
- Add the `/capital-markets` rewrite when the page ships; 301 `/technology` → `/capital-markets`.

Phase 3:
- `/ma` is REPRIEVED (rev 5) — it stays live as the M&A arm. Only its children retire: `/ma/approach` → `/approach`; `/ma/offers` → `/ma`; `/ma/contact` → `/contact`.
- Retarget existing `/ma/system` and `/ma/workflows` entries from `/ma/approach` to `/ma`.
- Note: this file is CODEOWNERS-protected; changes go through PR review.

## 6. Implementation notes

- Branch: `dev`. Promote to `main` via merge PR per CLAUDE.md git workflow, gated on the Anna sign-off above.
- Content lives in `src/content/site.ts` as a new `v3` generation export (pattern: `site` → `v2` → `v2Ma` → `v3`). Leave `v2`/`v2Ma` in place until the routes that read them retire.
- Use `{{PLACEHOLDER}}` markers + `isPending` guards (pattern in `(cm)/labs/page.tsx`) for any copy awaiting a TODO answer.
- New pages use the `Doc*` component family. Landing may need new `home/*`-style components; existing CM homepage components are not reused.
- Voice: third person throughout the new pages (first person remains only on /labs and /blog/why-claude per CLAUDE.md).
- Route groups: the `(cm)` group becomes the firm shell (update `shellConfig.cm`). Rev 5: `app/ma/layout.tsx` switches to the firm shell in phase 1 (the rebuilt /ma arm page lives in the `ma` group); the old ma child pages keep rendering until phase 3. `mortgages` untouched.
- Footer: CM links (system, labs, themes, offers) regroup under a "Technology" heading; legal links unchanged.
- After code changes: `graphify update .`

## 7. Phases and acceptance

**Phase 1 — re-shell the root.** `v3` content, new `/`, rebuilt `/ma` (M&A arm page from the services content, firm shell), `/experience`, `/approach`, reworked `/about` + `/contact`, nav swap, config edits per §5. Homepage Capital Markets arm card and its nav item hidden behind `isPending` until phase 2.
AC: `npx next build` green; targeted Playwright for new routes; `npm run verify:production-ready` passes; `/ma` serves the new arm page; `/ma/approach`, `/ma/offers`, `/ma/contact` still render (they retire in phase 3); `/approach` serves the new page (redirect removed).

**Phase 2 — /capital-markets arm page + CM demotion.** Capital Markets arm page, `CAPITAL MARKETS` nav item inserted after M&A, CM links out of nav/homepage, footer regroup, `/capital-markets` rewrite + `/technology` 301 per §5.
AC: /system, /labs, /themes, /offers all still 200 and reachable from /capital-markets and footer; CAPITAL MARKETS nav link live.

**Phase 3 — retire the /ma children.** Redirects per §5 (the /ma root stays live as the arm page), remove the old ma child pages, drop PracticeToggle component.
AC: /ma still 200; /ma/approach, /ma/offers, /ma/contact 301 to correct targets on the test SWA.

**Phase 4 — design pass (type + palette only).** Primary: deep navy, charcoal, white. Secondary: slate grey, steel blue. Accent: muted copper/bronze. Premium contemporary serif for headlines, clean sans for body, mapped onto Tailwind tokens. Typography carries the design weight; flat surfaces; no gradients, no imagery program (deferred), no startup aesthetics.
AC: all pages re-tokened; WCAG AA contrast; Playwright suite green (no layout regressions).

## 8. Open TODOs (blocking copy, not structure)

1. RESOLVED (rev 2): firm descriptor is the Appendix B positioning statement ("specialist advisory firm…"); execution is carried in the flagship practice name.
2. RESOLVED (rev 4): CTA is `DISCUSS A SITUATION` / short `DISCUSS` / page-end "Discuss a situation" (§2).
3. RESOLVED 2026-08-09: embedded engagement model kept; stated durations dropped (§3).
4. RESOLVED 2026-08-09: no partner names on /technology; S&P Global = data partner, Azure = technology runtime if referenced in body copy; detail stays at L3 (§3).
5. RESOLVED 2026-08-09: figures confirmed for public use (Terry); `main` gate lifted (§4).
6. `TODO(terry)`: technology-side experience cases for /experience (§3) — real engagements, facts only, no invention. Candidate to consider: the S&P Global TeraHelix cloud-migration engagement already referenced publicly in `v2` offers copy — confirm client consent for a named case entry.
7. RESOLVED 2026-08-09 (Terry): typefaces Newsreader (display serif) + Public Sans (body sans); palette deep navy #0E2A3A, charcoal #15171A, warm white #FAF9F7, slate grey #93A5B4, steel blue #52718E (bright #8FAECB, deep #3E5A75), bronze #B08D57.

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

> Atheryon is a specialist advisory firm helping organisations understand and execute complex transactions, transformations and technology-driven change where operational, technology and data dependencies materially impact outcomes.

(Rev 3: statement updated to the Brief 2 wording — adds "understand and" plus "technology-driven change".)

Connective narrative (for `/` and `/about`):

> Transactions and transformations increasingly succeed or fail based on operational, technology and data complexity. Atheryon combines deep transaction execution experience with technology, data and AI expertise to help organisations understand complexity earlier, reduce execution risk and deliver outcomes with confidence.

Practice names:

- M&A (led by Anna Contos) — route `/ma`
- Capital Markets (led by Terry Tsakiris) — route `/capital-markets`

(Rev 5: supersedes the earlier names "Transactions & Business Change" and "Data, Technology & Capital Markets".)

Hero system (rev 5):

- Root (`/`): "Making Complex Change Executable"
- M&A arm (`/ma`): "Making Transactions Executable"
- "Making ___ Executable" is the brand construction; further variants need Terry's approval.

Root hero stack (rev 5, Terry-authored, verbatim):

> Making Complex Change Executable
>
> Understanding implications early. Executing with confidence.
>
> Atheryon helps organisations navigate transactions, transformation, capital markets, data and technology initiatives by bringing clarity to critical decisions and leadership to execution.

Arms and underpinning (homepage + poster device):

- Arms: M&A · Capital Markets (equal cards, M&A first)
- Underpinning strip: DATA · TRANSFORMATION · AI

Bridge sentence (root hero support, Brief 2 verbatim):

> Whether the challenge is a major acquisition, a divestment, a business separation, a technology modernisation, a capital markets transformation, or a data migration, success depends on understanding complexity before decisions are locked in.

Approved short form (poster, 2026-08-09): "Understanding complexity before decisions are locked in."

Core IP statement (stated once site-wide, on `/`):

> Transaction value is protected when separation and integration requirements are understood early.

Amendments applied versus the feedback as received: hero remains "Making Transactions Executable" rather than "Complex Change. Executed."; capabilities are presented asymmetrically with the flagship dominant rather than as equal cards; the technology practice name excludes "AI". Port note: the connective narrative above contains a rhythmic triad ("operational, technology and data") that is load-bearing and may stand; apply CLAUDE.md banned-construction rules to any copy derived from it.
