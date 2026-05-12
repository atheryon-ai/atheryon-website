# Phase 1 CSP Strategy — Decision Document

**Date:** 2026-05-12
**Author:** Terry Tsakiris (with strategic stress-test)
**Status:** Decided — proceed with Approach C + lightweight A
**Horizon:** 6–12 months for Phase 1 outcomes

---

## 1. Strategic Sequence (the frame all decisions roll up to)

Atheryon is pursuing a **three-phase strategy**, not a single shape:

1. **Phase 1 (now → 12 months) — CSP partnership to scale from zero revenue.** Currently zero revenue. CSP pull is the bridge to first scale.
2. **Phase 2 (12 → 30 months) — Product company.** Atheryon Labs / CDM connectors / regulatory schema mapping becomes the monetised IP. Consulting becomes the wedge that sells the product. ARR is the metric.
3. **Phase 3 (30 → 60 months) — Acquisition.** Codified methodology + ARR + partner relationships = the acquisition package. Likely buyer: GSI or mid-tier consultancy in FSI.

**Implication:** Boutique-artisan positioning is rejected — revenue is the blocker. But product IP must be preserved through Phase 1, or Phase 2/3 has nothing to sell. Every Phase 1 decision is evaluated against "does this protect or compromise the Phase 2 product IP?"

---

## 2. Trigger: Two External Analyses

Two external strategic assessments arrived simultaneously:

- **Google FSI Strategic Partnerships assessment** — proposes recruiting Atheryon as a Subject Matter Expert (SME) integration partner. Recommends Vertex AI Innovation pilot, IP-porting subsidy, FSI co-selling.
- **McKinsey-style consulting review** — four recommendations to make Atheryon "more attractive": methodology-as-product, radical cloud neutrality, codified cost-of-delay, Labs-as-SaaS.

Both were stress-tested against the strategic sequence before deciding what to act on.

---

## 3. Stress-Test Results

| Recommendation | Phase fit | Verdict |
|---|---|---|
| **MK1: Methodology-as-Product** ("de-Terry the firm") | Phase 2/3 | ✅ right rec, mostly wrong phase. Make a small Phase 1 down-payment so a partner consultant can onboard; do **not** dilute the principal-led brand now — it's the current CSP credibility wedge. |
| **MK2: Radical Cloud Neutrality** (port Labs to GCP + AWS) | Phase 1 (but wrong framing) | ⚠️ Re-framed. The goal is **visible courtability by Google**, not neutrality. One Google reference impl, not three clouds. AWS gets nothing — they're not at the table. This is a leverage play, not an engineering play. |
| **MK3: Cost-of-Delay TCO Calculator** | Phase 1 | ❌ Narrative yes, calculator no. CIOs dismiss TCO spreadsheets. Adopt "decision-grade standard" language; skip the calculator build. |
| **MK4: Labs as Licensable SaaS-Lite** | Phase 2 | ✅ Right rec, premature now. Phase 1 builds the **narrative asset** ("Labs is the platform"); Phase 2 builds the engineering asset when CSP revenue funds it. |
| **G1: Google subsidising Labs-to-GCP port** | Phase 1, conditional | ⚠️ Only accept if subsidy covers full engineering cost **and** Atheryon retains marketplace listings on at least one other cloud. Otherwise Google captures the IP cheap. |
| **G2: Stalled-program recovery co-sell** | Phase 1 | ✅ Highest-leverage item in the Google deck. Maps to existing capability; produces revenue without IP transfer. |
| **G3: "Microsoft Factor as risk" framing** | — | ❌ Reject the framing. That's *Google's* risk, not Atheryon's. Microsoft is the current revenue path; Google is optionality. Do not internalise. |

**Net Phase 1 takeaway:** Only **MK3 narrative** and a *narrow* version of **MK2** are right for Phase 1 right now. **G2 (co-sell)** is the highest-leverage Google-deck item. Everything else is correct for Phase 2/3 — do not pull forward.

---

## 4. Approaches Considered

**A — Inbound magnetism.** Reposition the website; publish public assets (Directorial AI on Vertex AI). Be findable by Google's FSI partner-sourcing team.

**B — Direct warm outreach.** Use tier-1 banking alumni network for warm intros to Google APAC FSI partnerships. Lead with co-sell hypothesis.

**C — Anchor-customer wedge.** Find a banking customer choosing GCP (paid PoC acceptable). Approach Google with deal-flow ("we have a tier-1 migrating to Vertex AI for X — want to co-sell?"). Customer is the leverage.

**Why B is rejected:** Cold-ish partnership pitches at zero revenue burn the channel. Google's partnership team selects for traction, not aspiration. One-shot risk.

---

## 5. Decision: Approach C + Lightweight A (concurrent)

### C — Anchor-customer hunt (the real motion)

**6–12 month horizon means this is active, not passive.**

- **Target list:** Australian banks with public GCP signal — ANZ (GCP analytics history), NAB (GCP data platform work), and second-tier banks where decision velocity is higher (Macquarie, Suncorp, Bank of Queensland).
- **Wedge offering:** "Stalled program recovery on GCP" — the G2 item from the Google deck, packaged as a fixed-scope engagement. *Distinction:* this is customer-funded delivery work *on the customer's GCP environment*. It is NOT a port of Atheryon Labs to GCP. Atheryon consultants ramp on Vertex AI / BigQuery / Looker as a billable cost on the engagement, not as internal R&D.
- **Acceptable minimum:** Paid PoC at any size. The point is a logo + an outcome to put in front of Google, not engagement revenue.
- **Acceleration mechanisms (non-pitch ways to get warm with Google):**
  - Attend Google Cloud Financial Services events in APAC
  - Join Google Cloud Partner Advantage at the entry tier (self-service program enrolment, not partner sales conversation) — gets Atheryon into Google's partner directory and unlocks training credits without requiring a sponsor
  - Publish on Google Cloud Financial Services Medium / blog as a guest contributor
  - Apply for Google for Startups Cloud Program if eligibility allows

### A (lightweight) — Make the website Google-legible in 2–4 weeks

The website is the second-order signal Google's scouts check after a customer reference. Five surgical changes — no IA rebuild:

| Page | Change | Why |
|---|---|---|
| `/reality` (home) | Narrative reframe: "recovery" → "decision-grade standard". Keep "weeks vs years" anchor. **No** TCO calculator. | MK3 narrative shift. Free. |
| `/ai-direction` | Add visible Vertex AI / Gemini reference alongside Anthropic. Frame "Directorial AI" as model-agnostic AND cloud-agnostic. Don't remove Anthropic. | MK2 narrow version. Signal Google literacy. |
| `/labs` | Reposition Labs from "proof of method" → "marketplace-bound platform". Pure narrative; no engineering. | Phase 2 product runway. |
| `/transformation` (or `/programs`) | Add a "Partner co-sell" engagement track without naming Google. | Signals to Google scouts: co-sell-ready. |
| Microsoft positioning | **Preserve unchanged.** Do not reduce. | MS is current revenue path; Google is optionality. |

---

## 6. What This Decision Explicitly Excludes (anti-scope)

- ❌ **No AWS reference architecture.** AWS isn't at the table; effort there is wasted.
- ❌ **No TCO calculator build.** Use the narrative, skip the tool.
- ❌ **No "de-Terry" branding push.** Principal-led credibility is the current CSP wedge — don't dilute pre-deal.
- ❌ **No Labs-as-SaaS engineering build.** Narrative repositioning only in Phase 1. Engineering when revenue funds it.
- ❌ **No direct cold outreach to Google partnerships.** Burns the channel. Wait for anchor customer.
- ❌ **No reduction of Microsoft positioning.** Preserve current MS partner status as anchor revenue.
- ❌ **No website IA rebuild.** Five surgical page changes. No new sections.

---

## 7. Open Questions / Next Steps

**Open questions to resolve before execution:**

1. **Anchor-customer hunt — who owns it?** Terry (founder-led sales) or is there a BD partner / advisor? This determines pace.
2. **Microsoft relationship status** — is there a formal Microsoft Partner Network agreement that constrains GCP-facing positioning? Need to check terms before publishing GCP/Vertex content.
3. **Existing pipeline** — are there any current banking conversations where GCP could be steered into the architecture? Cheapest path to the anchor customer.
4. **Google subsidy scenario** — if Google offers to fund Labs-to-GCP port (G1), what's the IP-retention bar? Decide this *before* the conversation, not in the room.

**Immediate next steps (if approved):**

1. **Website spec for the five surgical changes.** Use `/superpowers:writing-plans` to produce a per-page implementation plan.
2. **Anchor-customer target list with warm-intro paths** for top 5 banks.
3. **Microsoft partnership review** — read existing MPN agreement for GCP-facing restrictions.
4. **One-page Google-readiness summary** — a 1-page asset that goes out *with* the customer reference when the time comes. Not used as cold pitch.

---

## 8. Decision Owner & Review Cadence

- **Decision owner:** Terry Tsakiris
- **Review trigger:** First anchor customer signs paid PoC, OR Google initiates contact, OR 6 months elapse without movement on C.
- **Phase 2 trigger:** First CSP-sourced revenue closes. At that point, re-evaluate MK1 (methodology codification) and MK4 (Labs engineering build).
