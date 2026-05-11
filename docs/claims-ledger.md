# Atheryon Claims Ledger

**Date:** 2026-05-11
**Purpose:** Source of truth for every named client, logo, headline stat, credential, case claim, and regulatory claim on atheryon.com.au. Consumed by B2 (proof rewrite) and B6 (credibility content).

## Verdict codes
- `approved` — keep as-is, verified accurate
- `anonymise` — replace with generic descriptor (e.g. "tier-one investment bank")
- `soften` — keep direction, reduce specificity (e.g. "20 years" → "two decades of senior delivery")
- `remove` — delete from the site entirely

## Filling instructions for Abigail
Every row below has a TBD verdict. Replace TBD with one of the four verdict codes. For non-`approved` rows, fill in the Replacement column with the exact copy to substitute.

---

## Named clients

Specific named-bank / named-vendor / named-partner references that appear as marketing copy (not as regulator names, which sit in the regulatory section below).

| # | Claim text | Where it appears | Verdict | Replacement copy |
|---|---|---|---|---|
| 1 | `Microsoft Partner • Delivering for S&P Global` | src/components/ClientLogos.tsx:13 | TBD | TBD |
| 2 | `Microsoft Partner • Delivering for S&P Global` (duplicate, hardcoded on CDM page) | src/app/cdm-platform/page.tsx:284 | TBD | TBD |
| 3 | `Twenty years inside Credit Suisse, CBA, Westpac, Barclays, applied to a working artifact you can inspect.` | src/content/site.ts:971 | TBD | TBD |
| 4 | `At Credit Suisse I built the bank's first near-real-time front-office risk system, then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates.` | src/content/site.ts:982 | TBD | TBD |
| 5 | `At Commonwealth Bank I owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance.` | src/content/site.ts:982 | TBD | TBD |
| 6 | `At Westpac Institutional Banking I rescued a distressed $84M data program and stood up a Data Products capability that delivered ten times faster than the bank's prior baseline.` | src/content/site.ts:982 | TBD | TBD |
| 7 | `CV anchor: CBA Markets ODS — Reg Trade Reporting, MiFID II, Surveillance.` | src/content/site.ts:1020 | TBD | TBD |
| 8 | `CV anchor: Credit Suisse FOBO risk + Global P&L Attribution.` | src/content/site.ts:1030 | TBD | TBD |
| 9 | `Goldman SecDB taught the opposite: extend when the concept is genuinely a CDM concept…` | src/content/site.ts:1068 | TBD | TBD |
| 10 | `Continuing the method that rescued the $84M Westpac program — now amplified.` | src/content/site.ts:1131 | TBD | TBD |
| 11 | `Tier-1 banks and investment banks` (in who-we-help list) | src/content/site.ts:53 | TBD | TBD |
| 12 | `Tier-one banks, market infrastructure, and regulatory environments.` | src/content/site.ts:758 | TBD | TBD |
| 13 | `A career inside tier-1 banks` (Labs credibility section title) | src/content/site.ts:979 | TBD | TBD |
| 14 | `Each section maps to a function I have shipped inside a tier-1 institution.` | src/content/site.ts:997 | TBD | TBD |
| 15 | `We work with tier-one banks, asset managers, market operators, and regulators…` | src/components/FAQ.tsx:55 | TBD | TBD |

## Logos

All logo files currently in the repo. Note: in `ClientCanvas.tsx` every client logo currently has `enabled: false`, so they are not rendered on the live site at present — but the files are committed and the trust line at ClientLogos.tsx:13 still names Microsoft and S&P Global. Tech-partner logos (Microsoft Azure, Snowflake, Databricks, Microsoft Fabric, Synapse, ISDA CDM, FINOS) are hardcoded as inline SVGs in `TechPartners.tsx` and `ClientLogos.tsx` and are rendered live.

| # | Logo file | Client (from filename / context) | Verdict | Replacement |
|---|---|---|---|---|
| 1 | public/logos/clients/microsoft.svg (referenced ClientCanvas.tsx:14, currently `enabled: false`) | Microsoft | TBD | TBD |
| 2 | public/logos/clients/sp-global.svg (referenced ClientCanvas.tsx:20, currently `enabled: false`) | S&P Global | TBD | TBD |
| 3 | public/logos/clients/westpac.svg (referenced ClientCanvas.tsx:26, currently `enabled: false`) | Westpac | TBD | TBD |
| 4 | public/logos/clients/cba.svg (referenced ClientCanvas.tsx:32, currently `enabled: false`) | Commonwealth Bank of Australia | TBD | TBD |
| 5 | public/logos/clients/credit-suisse.svg (referenced ClientCanvas.tsx:38, currently `enabled: false`) | Credit Suisse | TBD | TBD |
| 6 | public/logos/clients/barclays.svg (referenced ClientCanvas.tsx:44, currently `enabled: false`) | Barclays | TBD | TBD |
| 7 | Inline SVG "Microsoft Azure" (tech partner) | src/components/TechPartners.tsx:8 + src/components/ClientLogos.tsx:25 | TBD | TBD |
| 8 | Inline SVG "Snowflake" (tech partner) | src/components/TechPartners.tsx:16 + src/components/ClientLogos.tsx:33 | TBD | TBD |
| 9 | Inline SVG "Databricks" (tech partner) | src/components/TechPartners.tsx:24 + src/components/ClientLogos.tsx:41 | TBD | TBD |
| 10 | Inline SVG "Microsoft Fabric" (tech partner) | src/components/TechPartners.tsx:33 | TBD | TBD |
| 11 | Inline SVG "Synapse" (tech partner) | src/components/TechPartners.tsx:41 | TBD | TBD |
| 12 | Inline SVG "ISDA CDM" (tech partner) | src/components/ClientLogos.tsx:50 | TBD | TBD |
| 13 | Inline SVG "FINOS" (tech partner) | src/components/ClientLogos.tsx:58 | TBD | TBD |

## Headline stats

Numeric or quantified claims used as marketing proof points.

| # | Stat text | Where it appears | Verdict | Replacement |
|---|---|---|---|---|
| 1 | `50+` Programs recovered (home case-study stat) | src/app/page.tsx:217 | TBD | TBD |
| 2 | `10x` Faster to production (home case-study stat) | src/app/page.tsx:218 | TBD | TBD |
| 3 | `100%` Semantic preservation (home case-study stat) | src/app/page.tsx:219 | TBD | TBD |
| 4 | `Over 50% of operations time spent on data quality issues and manual reconciliation across systems.` | src/content/site.ts:459 | TBD | TBD |
| 5 | `Different rules across 8+ jurisdictions (CFTC, EMIR, MAS, etc.)…` | src/content/site.ts:467 | TBD | TBD |
| 6 | CDM solution stat `77` Platform Components | src/content/site.ts:480 | TBD | TBD |
| 7 | CDM solution stat `12` Microservices | src/content/site.ts:481 | TBD | TBD |
| 8 | CDM solution stat `6` Applications | src/content/site.ts:482 | TBD | TBD |
| 9 | CDM solution stat `44` AI Agents | src/content/site.ts:483 | TBD | TBD |
| 10 | `65+ pre-built validation rules per jurisdiction` | src/content/site.ts:543 | TBD | TBD |
| 11 | CDM performance stat `<100ms` API Response Time | src/content/site.ts:553 | TBD | TBD |
| 12 | CDM performance stat `10,000+` Trades/Second | src/content/site.ts:554 | TBD | TBD |
| 13 | CDM performance stat `99.5%` Match Rate | src/content/site.ts:555 | TBD | TBD |
| 14 | CDM performance stat `99.9%` Uptime SLA | src/content/site.ts:556 | TBD | TBD |
| 15 | Engagement model duration `8–16 weeks` (Recovery & Stabilisation) | src/content/site.ts:631 | TBD | TBD |
| 16 | Engagement model duration `3–9 months` (Platform Delivery) | src/content/site.ts:636 | TBD | TBD |
| 17 | Credibility box title `20+ Years in Capital Markets` | src/content/site.ts:757 | TBD | TBD |
| 18 | `Over two decades of delivery leadership across global capital markets — London and Australia.` | src/content/site.ts:758 | TBD | TBD |
| 19 | MiB Insight headline price `$14,000 AUD + GST` | src/content/site.ts:838, 866, 871, 953 | TBD | TBD |
| 20 | `20 years of markets knowledge synthesised into agent-ready IP modules…` | src/content/site.ts:870 | TBD | TBD |
| 21 | `Each module distils 20 years of markets knowledge…` | src/content/site.ts:890 | TBD | TBD |
| 22 | `you already use AI coding agents, and you want to skip 6–12 months of domain ramp-up.` | src/content/site.ts:885 | TBD | TBD |
| 23 | `A senior capital-markets data leader using AI to turn 20+ years of tacit banking delivery knowledge…` | src/content/site.ts:967 | TBD | TBD |
| 24 | `Most capital-markets platforms take a decade and a thousand engineers.` | src/content/site.ts:969 | TBD | TBD |
| 25 | Labs at-a-glance stat `8` banking functions covered | src/content/site.ts:988 | TBD | TBD |
| 26 | Labs at-a-glance stat `1` CDM data model — ISDA-compliant, end to end | src/content/site.ts:989 | TBD | TBD |
| 27 | Labs at-a-glance stat `31` flagship surfaces shipped | src/content/site.ts:990 | TBD | TBD |
| 28 | Labs at-a-glance stat `Live` at labs.atheryon.ai | src/content/site.ts:991 | TBD | TBD |
| 29 | Flagship footer template `Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.` (×3 flagship items) | src/content/site.ts:1021, 1031, 1041 | TBD | TBD |
| 30 | Labs engagement card body references `$84M Westpac program` | src/content/site.ts:1131 | TBD | TBD |
| 31 | DataVisualization SVG stat `99.9%` Validation Rate | src/components/DataVisualization.tsx:162 | TBD | TBD |
| 32 | DataVisualization SVG stat `5x` Faster Delivery | src/components/DataVisualization.tsx:166 | TBD | TBD |
| 33 | DataVisualization SVG stat `100%` Lineage Tracked | src/components/DataVisualization.tsx:170 | TBD | TBD |
| 34 | FAQ engagement duration `Recovery sprints take 2-4 weeks. Capability deliveries run 6-12 weeks. Foundation builds are multi-quarter.` | src/components/FAQ.tsx:67 | TBD | TBD |

## Credentials / regulatory claims

Self-described credentials, "regulator-credible" framings, and explicit references to named regulators or regulatory frameworks (CFTC, EMIR, MAS, JFSA, HKMA, ASIC, FCA, OSFI, APRA, MiFID II, Dodd-Frank) and to standards (ISDA, FpML, FINOS, ISO 20022, Rosetta).

| # | Claim text | Where it appears | Verdict | Replacement |
|---|---|---|---|---|
| 1 | `Senior practitioners who have carried the risk, building platforms that withstand regulatory scrutiny.` | src/content/site.ts:34 | TBD | TBD |
| 2 | `…regulator-credible, production-grade, senior-led.` | src/content/site.ts:42 | TBD | TBD |
| 3 | `Teams cannot ship governed, regulator-credible capability under real time pressure.` | src/content/site.ts:94 | TBD | TBD |
| 4 | `Regulator-credible governance` (whatWeDo column title) | src/content/site.ts:107 | TBD | TBD |
| 5 | `Lineage, ownership, and controls that withstand regulatory scrutiny — built in, not bolted on.` | src/content/site.ts:108 | TBD | TBD |
| 6 | `Recovering stalled programs in live trading and regulatory environments` | src/content/site.ts:131 | TBD | TBD |
| 7 | `Building decision-grade platforms under regulatory scrutiny` | src/content/site.ts:132 | TBD | TBD |
| 8 | `Senior-led delivery — principals on the ground, not juniors with slide decks` | src/content/site.ts:133 | TBD | TBD |
| 9 | `…execute migrations that preserve meaning — regulator-credible, production-grade.` | src/content/site.ts:161 | TBD | TBD |
| 10 | Migration framing `…create regulator-credible assets.` | src/content/site.ts:36 | TBD | TBD |
| 11 | `Enable end-to-end regulatory and risk capabilities that are production-grade, traceable, and defensible under scrutiny.` | src/content/site.ts:358 | TBD | TBD |
| 12 | CDM jurisdiction row `CFTC` / United States | src/content/site.ts:533 | TBD | TBD |
| 13 | CDM jurisdiction row `EMIR` / European Union | src/content/site.ts:534 | TBD | TBD |
| 14 | CDM jurisdiction row `MAS` / Singapore | src/content/site.ts:535 | TBD | TBD |
| 15 | CDM jurisdiction row `JFSA` / Japan | src/content/site.ts:536 | TBD | TBD |
| 16 | CDM jurisdiction row `HKMA` / Hong Kong | src/content/site.ts:537 | TBD | TBD |
| 17 | CDM jurisdiction row `ASIC` / Australia | src/content/site.ts:538 | TBD | TBD |
| 18 | CDM jurisdiction row `FCA` / United Kingdom | src/content/site.ts:539 | TBD | TBD |
| 19 | CDM jurisdiction row `OSFI` / Canada | src/content/site.ts:540 | TBD | TBD |
| 20 | `Pre-configured rules for major regulatory frameworks with continuous updates.` | src/content/site.ts:531 | TBD | TBD |
| 21 | Standards row `FINOS CDM — ISDA Common Domain Model` | src/content/site.ts:574 | TBD | TBD |
| 22 | Standards row `FpML — Financial Products Markup Language` | src/content/site.ts:575 | TBD | TBD |
| 23 | Standards row `ISO 20022 — Financial Messaging Standard` | src/content/site.ts:576 | TBD | TBD |
| 24 | Standards row `Rosetta DSL — Domain-Specific Language` | src/content/site.ts:577 | TBD | TBD |
| 25 | `…regulator-credible capability — delivered under real pressure.` | src/content/site.ts:589 | TBD | TBD |
| 26 | `Governed data platforms built under real constraints with senior practitioners.` | src/content/site.ts:637 | TBD | TBD |
| 27 | About hero `Senior-led. Regulator-credible. Production-grade.` | src/content/site.ts:745 | TBD | TBD |
| 28 | `Built by practitioners who've carried the risk` (About hero headline) | src/content/site.ts:744 | TBD | TBD |
| 29 | `Senior practitioners who have carried the risk — building decision-grade data platforms…` | src/content/site.ts:742 | TBD | TBD |
| 30 | `…decades of delivery leadership in regulated environments…` (About) | src/content/site.ts:749 | TBD | TBD |
| 31 | `Hands-on leadership across live trading, market risk, credit risk, product control, payments, and regulatory reporting aligned to APRA, ASIC, MiFID II, EMIR, and Dodd-Frank.` | src/content/site.ts:758 | TBD | TBD |
| 32 | `Senior-led — principals on the ground, not juniors with slide decks.` (About) | src/content/site.ts:758 | TBD | TBD |
| 33 | Footer description `…Senior-led. Regulator-credible. Production-grade.` | src/content/site.ts:1149 | TBD | TBD |
| 34 | FAQ `Yes. As part of delivery leadership, we meet regulators on behalf of our clients to demonstrate control, progress, and production readiness.` | src/components/FAQ.tsx:59 | TBD | TBD |
| 35 | FAQ `We are practitioner-led — senior people who have carried delivery risk in live trading and regulatory environments. We deliver decision-grade platforms, not slide decks. And our work is regulator-credible…` | src/components/FAQ.tsx:63 | TBD | TBD |
| 36 | Reg-vignette `MiFID II and EMIR audits do not ask for the report; they ask for the *evidence chain*…` | src/content/site.ts:1058 | TBD | TBD |

## Case-study / outcome claims

Specific Atheryon-attributed outcomes, recoveries, or delivery results — beyond generic methodology statements.

| # | Claim text | Where it appears | Verdict | Replacement |
|---|---|---|---|---|
| 1 | Case-study block title `We recover what others abandon` (home page) | src/app/page.tsx:211 | TBD | TBD |
| 2 | Case-study image alt `Case study — program recovery results` | src/app/page.tsx:215 | TBD | TBD |
| 3 | Credibility quote: `We are engaged when data programs have consumed significant investment but failed to produce outputs the business can trust under regulatory or operational pressure. Our work stabilises delivery, enforces semantic clarity, and leaves behind governed platforms that reduce the cost of future change.` | src/content/site.ts:129 (also lines 35, used as `proofFraming`) | TBD | TBD |
| 4 | `Stalled initiatives recovered. New capability shipped under real constraints. Institutional confidence restored.` | src/content/site.ts:112, 605 | TBD | TBD |
| 5 | `built the bank's first near-real-time front-office risk system` | src/content/site.ts:982 | TBD | TBD |
| 6 | `then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates.` | src/content/site.ts:982 | TBD | TBD |
| 7 | `owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance.` | src/content/site.ts:982 | TBD | TBD |
| 8 | `rescued a distressed $84M data program and stood up a Data Products capability that delivered ten times faster than the bank's prior baseline.` | src/content/site.ts:982 | TBD | TBD |
| 9 | Flagship #1 (Trade Board + Operations) CV anchor `CBA Markets ODS — Reg Trade Reporting, MiFID II, Surveillance.` | src/content/site.ts:1020 | TBD | TBD |
| 10 | Flagship #2 (Risk Pricer + IRRBB) CV anchor `Credit Suisse FOBO risk + Global P&L Attribution.` | src/content/site.ts:1030 | TBD | TBD |
| 11 | Flagship #3 (Schema Editor + CDM Intelligence) CV anchor `the data-modelling thesis — the Atheryon differentiator.` | src/content/site.ts:1040 | TBD | TBD |
| 12 | Vignette: Goldman SecDB taught the opposite approach to schema extension | src/content/site.ts:1068 | TBD | TBD |
| 13 | Engagement card `Continuing the method that rescued the $84M Westpac program — now amplified.` | src/content/site.ts:1131 | TBD | TBD |
| 14 | Labs hero body `Twenty years inside Credit Suisse, CBA, Westpac, Barclays, applied to a working artifact you can inspect.` | src/content/site.ts:971 | TBD | TBD |
| 15 | Labs hero `This one took one banker, directing AI.` (implicit outcome claim) | src/content/site.ts:970 | TBD | TBD |
| 16 | Labs disclaimer `It is not a production bank platform. It is proof that senior domain judgment plus AI-assisted engineering compresses discovery, architecture, and working delivery into weeks.` | src/content/site.ts:972 | TBD | TBD |

---

## Notes for Abigail

A few items worth flagging while filling verdicts:

1. **The trust line `Microsoft Partner • Delivering for S&P Global` is duplicated in two places** (ClientLogos.tsx:13 and a hardcoded copy on cdm-platform/page.tsx:284). Whatever verdict you give it, both copies must move together. Recommend consolidating to a single source in `site.ts` as part of the rewrite.
2. **The client-logo carousel is currently dark.** Every entry in `ClientCanvas.tsx` (Microsoft, S&P Global, Westpac, CBA, Credit Suisse, Barclays) has `enabled: false`, so the carousel renders empty. Logos are still committed in `public/logos/clients/`. If the verdict is `remove` for any of these, the SVG files should be deleted from the repo, not just left disabled.
3. **The named-bank list "Credit Suisse, CBA, Westpac, Barclays"** appears multiple times across the Labs page (rows: named clients #3, #4, #5, #6, #7; case claims #5–#10, #14). Verdicts on each occurrence should likely be consistent — recommend deciding once for each bank and applying everywhere.
4. **`$84M Westpac program`** appears twice (site.ts:982 and site.ts:1131). Same point — keep the two occurrences in sync.
5. **CDM platform stats (77 components, 12 microservices, 6 apps, 44 AI agents, <100ms, 10,000+ trades/sec, 99.5% match, 99.9% uptime, 65+ rules)** read as a product spec sheet. If the CDM platform is a separate product with its own engineering verification, these may all be `approved`; if they're marketing extrapolation, several are candidates for `soften` or `remove`.
6. **DataVisualization.tsx contains three SVG stats (99.9% / 5x / 100%) that are not currently routed through `site.ts`** — they're hardcoded inside the component. Whatever verdict applies will need a code edit in the component, not just a content swap.
7. **The Labs "31 flagship surfaces shipped" and "8 banking functions covered" stats** are specific and falsifiable. If accurate at time of writing they're probably `approved`; if they've drifted they need a current count.
8. **`Tier-1` / `tier-one` framing** appears six times (rows 11–15 in Named clients, plus the FAQ). Treat as a single editorial decision — anonymising one and keeping another would read as inconsistent.
9. **`MiFID II and EMIR audits…`** (credentials row 36) is presented as an authoritative claim about how audits actually work. If accurate, `approved`; if defensible only as an opinion, consider rewording.
10. **The five vignettes in `labs.vignettes.items`** (site.ts:1049–1075) are framed as "what AI didn't know without the banker." They name Goldman SecDB explicitly (vignette 4) and describe specific banker corrections. Each is effectively a mini case-study claim — worth a row each if you want fine-grained verdicts.
