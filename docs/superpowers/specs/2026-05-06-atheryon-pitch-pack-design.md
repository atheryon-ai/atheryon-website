# Atheryon Labs pitch pack — design spec

**Date:** 2026-05-06
**Author:** Terry Tsakiris (with Abi)
**Repo (implementation target):** `atheryon-ai/atheryon-website` — Next.js 14 App Router, Tailwind, Azure Static Web Apps. All copy lives in `src/content/site.ts`.
**Public URL:** `https://www.atheryon.com.au/labs`
**Companion:** downloadable PDF of the same content.
**Status:** design approved — pending implementation plan (see writing-plans next).

---

## 1. Problem

The Atheryon Labs platform at `https://labs.atheryon.ai` exists as a working CDM-native reference implementation across eight banking functions. Today it is locked behind Microsoft Entra sign-in. There is no public artifact a third party can read, forward internally, or quote from.

Three audiences would benefit from a public pitch:

1. **Tier-1 banks** (CRO / COO / Head of Markets / Head of Data) — to recognise Atheryon Advisory as the engagement that produces *working software, not slideware*.
2. **AI labs** (Anthropic, Google, similar) — to see Atheryon Labs as evidence of senior-domain-expert-directed AI delivery in a regulated industry; a forwardable case for "what models can do when the human is the rare expert".
3. **Technology partners** — banking-platform vendors and consultancies who recognise the reference architecture as a CDM-native blueprint.

The current `www.atheryon.com.au` is positioned tier-1-bank-first ("Decision-grade data platforms under pressure", services: Recovery & Migration / M&A Execution / Capability Enablement). The new pitch page must **slot in alongside** that positioning, not replace the homepage.

## 2. Goal

A single long-scroll page at `/labs` that:

- Establishes Terry Tsakiris's 20+ years of capital-markets credibility in the first viewport.
- Demonstrates Atheryon Labs as a working artifact, not a slide deck.
- Inoculates against the "toy demo" dismissal *early* and explicitly.
- Positions AI as a *mechanism* directed by Terry, not a vendor partnership. **Model-agnostic on the spine; one transparent line of disclosure deep in the methodology section.**
- Closes with three clean engagement modes — code, prompts, advisory.
- Exports cleanly to a PDF artifact for internal forwarding.

## 3. Positioning

**Bank-first spine. AI-lab relevance is a proof layer, not the hero.**

> A senior capital-markets data leader used AI to turn 20+ years of tacit banking delivery knowledge into a working, inspectable reference platform — in weeks.

Not "AI built a banking platform." The wedge is *human domain judgment + AI execution speed*, in a regulated domain where most AI demos fail the smell test.

## 4. Page structure

Long-scroll, deep-linkable section anchors. Section numbering matches the page order. All copy lives in `src/content/site.ts` under `site.pages.labs` per existing convention.

### §1 — Hero

> # Most capital-markets platforms take a decade and a thousand engineers.
> # This one took one banker, directing AI.
>
> Atheryon Labs is a CDM-native reference implementation across trading, post-trade, risk, treasury, compliance, and mortgage workflows — built by **Terry Tsakiris** with AI as a coding partner. Twenty years inside Credit Suisse, CBA, Westpac, Barclays, applied to a working artifact you can inspect.
>
> *It is not a production bank platform. It is proof that senior domain judgment plus AI-assisted engineering compresses discovery, architecture, and working delivery into weeks.*
>
> **CTAs:** *See it live* (→ `https://labs.atheryon.ai`) · *Download the pack* (PDF) · *Request a confidential discussion* (matches existing site's primary CTA, links to `/contact`).

The italic disclaimer is the toy-demo inoculation. It must appear above the fold.

### §2 — Twenty years on the inside (credibility paragraph)

> I'm Terry Tsakiris. At **Credit Suisse** I built the bank's first near-real-time front-office risk system, then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates. At **Commonwealth Bank** I owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance. At **Westpac Institutional Banking** I rescued a distressed $84M data program and stood up a Data Products capability that delivered ten times faster than the bank's prior baseline. Atheryon Labs is the next iteration of that method: the same delivery muscle, paired with AI.

Photo of Terry inline. The paragraph is *signed* — the page is not anonymous corporate copy.

### §3 — At a glance (stats strip)

A horizontal strip, large numerals:

- **8** banking functions covered
- **1** CDM data model — ISDA-compliant, end to end
- **N** flagship surfaces shipped *(N to be set from `git log` / theme count at implementation time)*
- **Live at** `labs.atheryon.ai`

### §4 — The bank, mapped

A single visual showing the eight-section IA from the labs platform:

> **Operational Data Store** + **Front Office** · **Operations** · **Compliance & Reporting** · **Market Risk** · **Credit Risk** · **Treasury** · **Mortgages**

Pulled directly from `src/lib/themes/themes.ts` in labs-platform — the source of truth. Each box is small but legible; the visual establishes *breadth* in five seconds.

Caption: *"The bank as I have worked it. Each section maps to a function I have shipped inside a tier-1 institution."*

### §5–§7 — Three flagship deep-dives

Each flagship: one screenshot, ~80-word problem statement, ~80-word how-it-works, one-line metric footer.

| § | Flagship | What it shows | CV anchor |
|---|---|---|---|
| §5 | **Trade Board + Operations** | The `/ops` board — break triage, confirmations, lifecycle management; CDM event model under the hood | CBA Markets ODS — Reg Trade Reporting, MiFID II, Surveillance |
| §6 | **Risk Pricer + IRRBB** | `/risk/pricer` and `/risk/irrbb` — typed `atheryon-risk` client, near-real-time pricing | Credit Suisse FOBO risk + Global P&L Attribution |
| §7 | **Schema Editor + CDM Intelligence** | `/build/schema-editor`, `/explore/graph`, Reg Submissions reverse-mapping | The data-modelling thesis; the Atheryon differentiator |

Per-flagship footer (small text):

> *Built in N weeks · M PRs · directed by Terry, executed in AI-pair mode.*

Real numbers come from `git log` at implementation time. Footer wording is **AI-generic** — does not name a specific model.

### §8 — What AI couldn't know without the banker

The wedge for AI-lab readers, and the inoculation against "AI built a bank" for bank readers. Five concrete vignettes, each a place where Terry's banking context changed the implementation.

Format per vignette: **bold title** · two-sentence "the implementation AI proposed" · two-sentence "what banking context changed".

**Acceptance criterion (per Gemini critique, 2026-05-06):** each vignette must show a place where AI *under-shot, missed, or proposed an incorrect implementation* — then what banking context corrected it. "Context changed the design" is too soft. The wedge only lands if the AI's deficiency is concrete and the banker's intervention is specific. If a candidate vignette can't be told as *"AI got this wrong / partial / naive — here is what 20 years inside the trade floor saw that the model didn't"*, swap it for one that can.

1. **Lifecycle state model** — why CDM events ≠ trade states; what Operations actually reconciles end-of-day.
2. **Regulatory Trade Reporting evidence** — where MiFID II / EMIR demands artefacts the AI wouldn't think to generate, until told.
3. **Risk view granularity** — why FOBO P&L breaks if you don't separate explain types; the Greeks taxonomy that came from the trading floor, not the textbook.
4. **Schema modelling — extend vs wrap** — when CDM extension is correct, when wrapping is correct; the Goldman SecDB lesson.
5. **Ops exception handling at 5pm Sydney** — what "broken" looks like in real ops, not what a spec describes.

*(Final vignette copy comes from real PR diffs — see Open questions §13.)*

This section is the most forwardable artefact in the page. Anthropic / Google readers will quote from it.

### §9 — The 10x Method

Methodology reveal. How Terry directs AI.

- **Built from banking controls, not user stories.** Where most AI demos start "as a user I want…", this started with the regulatory artefact, the operational control, the risk view.
- **Started from the product / event / data model, not the screen.** CDM-first, then surfaces.
- **Generate variants, then narrow them.** Terry uses AI to generate three implementation candidates per surface, then rejects, corrects, and chooses based on banking judgment.
- **Every surface traceable to a banking function, CDM concept, and operating control.** The labs IA enforces this.
- **The deliverable is a working decision surface, not a slide deck.**

Embedded artifacts (for the AI-curious reader): one real prompt + Terry's correction → resulting code. One PR with the conversation in the body. *Not theatre — the actual record.*

**Disclosure line (single, plain, in this section only):**

> *Atheryon Labs is currently built using Anthropic's Claude. The method is model-agnostic by design — the durable artefact is how a banker directs AI, not which AI is on the other side of the chat.*

That is the *only* place "Claude" or "Anthropic" appears on the page. (D3: option ii.)

### §10 — Three ways to use what's here

Three cards, equal weight. The triad copy stays terse — Terry's call.

1. **Take the code.** Fork the labs-platform repo. Inspect, deploy, extend. Suitable for technology partners and engineering teams who want to study the reference implementation. *Includes architecture map, CDM model, and read-only access to a hosted instance.*
2. **Take the prompts.** A curated archive of the prompts, corrections, and architectural decisions that produced the platform — paired with Terry's reasoning per surface. *Not a generic prompt library; the banker's directorial track.*
3. **Take the advisory.** Atheryon Advisory engagements: 30-day diagnostic, prototype sprint, or full data-platform recovery. *Continuing the method that rescued the $84M Westpac program — now amplified.*

Each card has a single CTA: *Inspect* / *License* / *Engage*.

**Note on "Take the prompts":** Codex flagged this as the weakest of the three (gimmick risk if it reads as "buy a prompt pack"). The mitigation is in the copy: *the artefact being licensed is Terry's directorial track*, not raw prompts. If on review the section still reads thin, fall back to repackaging it as **"License the reference architecture"** without renumbering the page.

### §11 — Closing CTA

Restate the three CTAs from the hero, plus a primary booking widget (Calendly or similar).

> **Available for select engagements.** Atheryon partners with a small number of institutions per year. *Request a confidential discussion →*

## 5. Visual & component approach

Slot into existing atheryon-website conventions:

- **Section wrapper:** `<Section badge="" title="">` from `src/components/Section.tsx`.
- **Hero:** new variant — extend `src/components/Hero.tsx` if it doesn't already support a two-line headline + italic disclaimer subline. Likely a new variant called `LabsHero`.
- **Section dividers:** `<SectionDivider />` between every section per existing pattern.
- **Tailwind palette:** match existing site. No new design tokens.
- **Screenshots:** captured from `https://labs.atheryon.ai` at implementation time. Stored in `public/labs/` as PNG/WebP.
- **PDF:** generated via `/make-pdf` (gstack skill) from a Markdown source file. Cover page: Atheryon logo + "Atheryon Labs — Pitch Pack — May 2026". Watermark: none (this is a finished artefact, not a draft).

## 6. Implementation notes

- New route: `src/app/labs/page.tsx`.
- New copy block: `site.pages.labs` in `src/content/site.ts`. All headlines, body copy, and CTAs centralised there per repo convention.
- New components (only if existing ones can't carry it): `LabsHero`, `LabsBankMap` (the §4 visual), `LabsFlagship` (§5–§7), `LabsVignette` (§8), `LabsEngagementCard` (§10).
- Static assets: `public/labs/` for screenshots, `public/labs/atheryon-pitch-pack.pdf` for the download.
- `staticwebapp.config.json`: no changes needed (single new route).
- Sitemap: regenerate to include `/labs`.
- Header navigation: add a discreet *Labs* link, *or* keep the page unlinked from the global nav and only reachable via direct URL / email forwarding. **Decision deferred to writing-plans.**
- PDF download generated as a separate artefact — same Markdown source, rendered via `/make-pdf`.

## 7. Out of scope (explicit)

- Auth / paywall on `/labs`. Public.
- Live demo iframe of `labs.atheryon.ai`. Screenshots only — the live site is one click away via the hero CTA.
- A separate AI-lab-specific page (the rejected option C from D1). One page; AI-lab framing lives in §8 and §9.
- Updating the homepage. The bank-first homepage stays exactly as it is.
- Any change to `labs-platform` itself — this is purely a marketing artefact.

## 8. Test plan

- Playwright smoke: `/labs` returns 200, all section anchors resolve, all CTAs link to the right targets, the PDF download responds.
- Visual: at 1280px desktop, 768px tablet, 375px mobile — all sections render without overflow.
- Lighthouse: SEO and performance scores at parity with the existing site.
- Manual: read the page out loud — does the credibility-then-proof-then-method flow track without stumbling?

## 9. Risks

| Risk | Mitigation |
|---|---|
| The "1 banker + AI" headline gets dismissed as marketing | The italic disclaimer in the hero ("It is not a production bank platform…") inoculates explicitly. Codex flagged this; it's now in the spec. |
| Bank reader hits the AI angle and recoils | AI is demoted from the spine. Only one transparent disclosure line in §9. The rest of the page is a banker talking to bankers. |
| The "Take the prompts" mode reads as gimmick | Copy reframes it as licensing Terry's *directorial track*, not raw prompts. Fallback: rename to "License the reference architecture" if review still flags it. |
| Generic 10x claim sounds like every AI consultant | §3 stats strip and §5–§7 footers carry **specific numbers** (PRs, weeks, surfaces) drawn from `git log`. No bare "10x" without denominator. |
| Vendor-lock-in concern | Page is model-agnostic on the spine. The single Claude disclosure in §9 names it once and frames the method as the durable artefact. |
| Numbers in flagship footers turn out unflattering | Pull from `git log` at implementation time and review before publication. If a flagship's numbers don't tell the story, swap that flagship. |

## 10. Open questions (need Terry input before / during implementation)

1. **§3 — flagship surface count.** What number do we put? (Count from `themes.ts`? Count of "production-grade" themes only? — Terry's call.)
2. **§5–§7 — flagship picks.** Trade Board / Risk Pricer / Schema Editor proposed. Confirmed, or substitute Cross-Schema, Reg Submissions, or MSX twin pages?
3. **§8 — the five vignettes.** Each one needs a specific PR / surface to anchor to. Terry to nominate the five (or I'll propose drafts from `git log` and Terry edits).
4. **§9 — embedded artefacts.** Which prompt + correction example goes on the page? Which PR gets quoted? Needs Terry's choice — must be safe to publish.
5. **§10 — "Take the prompts" copy.** Final wording for what the prompt archive actually contains. Pricing / packaging? Or just "request access"?
6. **Header nav.** Add *Labs* to the top nav, or keep `/labs` as a direct-URL artefact only?
7. **Photo for §2.** Existing headshot, or commission?
8. **PDF cover and back-page.** Logo + tagline + contact. Anything else?

## 11. Next step

Per the brainstorming workflow, this spec is the input to `/superpowers:writing-plans`, which will produce a step-by-step implementation plan covering: copy authoring in `site.ts`, component scaffolds, screenshot capture, PDF generation, sitemap update, and the test plan in §8.

Implementation will happen in `atheryon-ai/atheryon-website`, on a new feature branch, deployed first to the test environment (`icy-tree-093dcc800.6.azurestaticapps.net`) for review before manual production promotion.
