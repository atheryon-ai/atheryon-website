// buyerThemes.ts — the 7-row CM buyer matrix (addendum 2026-05-17).
//
// Each row joins to v2.pages.workflows.items[workflowId] in site.ts when a
// proven workflow exists. workflowId === null means the workflow is still on
// the roadmap; the theme page renders a "ROADMAP — planned" marker.
//
// 3 themes carry status="roadmap": treasury, front-office-trading,
// entity-intelligence — their workflows are not yet built.
//
// Foundation / ODS is a TECH SELL (CDO/CTO/Architect buyers), not a
// business-line desk. Its offerFramings reflect platform language.

import type { Status } from '@/components/StatusBadge'

export type OfferKey = 'code' | 'prompts' | 'consult'

export type BuyerTheme = {
  id: string
  name: string
  status: Status
  buyerTitles: readonly string[]
  pain: string
  /**
   * The theme's proof point, rendered under the pain line on /themes and
   * /themes/[id]. No longer a uniform speed claim: each theme carries a
   * structurally different proof (failure mode, shipped artefact, FTE
   * arithmetic, named regulation, or the platform itself).
   */
  speedPitch: string
  /** Matches an id in v2.pages.workflows.items, or null for roadmap themes. */
  workflowId:
    | 'trade-lifecycle-automation'
    | 'risk-reporting-generation'
    | 'portfolio-analytics-pipeline'
    | 'research-summarisation-workflow'
    | 'financial-data-ingestion-and-structuring'
    | null
  offerFramings: Record<OfferKey, string>
}

export const buyerThemes: readonly BuyerTheme[] = [
  {
    id: 'front-office-trading',
    name: 'Front Office Trading',
    status: 'roadmap',
    buyerTitles: ['Head of Trading', 'Head of e-Trading', 'Head of Quant Trading'],
    pain: 'Pre-trade pricing and risk pipelines are slow, fragile, and quant-engineer-bound. Every new instrument or venue is a multi-quarter build.',
    // TODO(terry): previous line claimed "9–12 months → with us, 6–8 weeks" with no
    // evidence. Supply a real delivery range if you want a timeline claim here.
    speedPitch:
      'The failure mode repeats: a new instrument class lands, the pricing stack reopens, and the desk waits out another build cycle.',
    workflowId: null,
    offerFramings: {
      code: 'License the pricing/analytics pipeline scaffolding — typed payloads, agent topology, venue adapters.',
      prompts: 'Directorial prompt archive for quant-engineer + agent pairing on instrument modelling.',
      consult: 'Senior-led design of your pre-trade pricing stack and rollout path.',
    },
  },
  {
    id: 'middle-office-ops',
    name: 'Middle Office Ops',
    status: 'shipped',
    buyerTitles: ['Head of Operations', 'Head of Post-Trade', 'Head of Confirmations'],
    pain: 'Trade affirmation and confirmation breaks age across MarkitWire, DTCC CTM, and bilateral channels while manual exception triage dominates the day.',
    // TODO(terry): previous line claimed "6–9 months → with us, 4–6 weeks" with no
    // evidence. Supply a real delivery range if you want a timeline claim here.
    speedPitch:
      'The workflow behind this theme is built: match logic, exception triage and the audit chain run today in the reference platform.',
    workflowId: 'trade-lifecycle-automation',
    offerFramings: {
      code: 'License the trade lifecycle automation pipeline — match logic, exception triage, audit chain.',
      prompts: 'Directorial archive of the prompts that built the post-trade agent topology.',
      consult: 'Senior-led delivery of a confirmations + breaks pipeline tailored to your platforms.',
    },
  },
  {
    id: 'compliance-surveillance',
    name: 'Compliance & Surveillance',
    status: 'shipped',
    buyerTitles: ['Head of Regulatory Reporting', 'Head of Trade Surveillance', 'Chief Compliance Officer'],
    pain: 'EMIR Refit, MiFID II, ASIC and CFTC reporting builds eat 6+ FTE per regime, and schema drift breaks submissions monthly.',
    // TODO(terry): previous line claimed "9–18 months → with us, 6–10 weeks" with no
    // evidence. The 24-FTE figure below is arithmetic on the 6+ FTE per regime claim
    // already in the pain line; confirm that source claim is yours.
    speedPitch:
      'At 6+ FTE per regime, a four-regime estate carries upwards of 24 reporting FTE before a single rule change lands.',
    workflowId: 'risk-reporting-generation',
    offerFramings: {
      code: 'License the risk reporting generation pipeline — per-regime rulesets, scoring, submission queue.',
      prompts: 'Directorial archive of the prompts that built the per-regime field-completeness agents.',
      consult: 'Senior-led delivery of a regime-by-regime reporting pipeline and remediation surface.',
    },
  },
  {
    id: 'risk-analytics',
    name: 'Risk & Analytics',
    status: 'shipped',
    buyerTitles: ['Head of Market Risk', 'Head of Counterparty Risk', 'Head of Portfolio Analytics'],
    pain: 'Portfolio analytics and research summarisation pipelines are bespoke per desk, so anomaly detection and explanation lag the trading day.',
    // TODO(terry): previous line claimed "9–12 months → with us, 6–8 weeks" with no
    // evidence. Supply a real delivery range if you want a timeline claim here.
    speedPitch:
      'Pricer, VaR, scenario and correlation surfaces already exist in the labs platform, and the analytics workflow that feeds them is shipped.',
    workflowId: 'portfolio-analytics-pipeline',
    offerFramings: {
      code: 'License the portfolio analytics + research summarisation pipelines — aggregation, anomaly, NL explanation.',
      prompts: 'Directorial archive of the prompts that built the analytics + summarisation agents.',
      consult: 'Senior-led delivery of an analytics pipeline framed against your risk hierarchy.',
    },
  },
  {
    id: 'treasury',
    name: 'Treasury',
    status: 'roadmap',
    buyerTitles: ['Treasurer', 'Head of ALM', 'Head of Liquidity Risk', 'Head of FTP'],
    pain: 'Bank ALM (IRRBB, liquidity, FTP) lives in a patchwork of spreadsheets and vendor tools; a scenario refresh waits for the overnight batch.',
    // TODO(terry): previous line claimed "9–12 months → with us, 6–10 weeks" with no
    // evidence. Supply a real delivery range if you want a timeline claim here.
    speedPitch:
      'The scenario set that matters is the Basel IRRBB standard. The labs platform already runs those shocks; the full ALM pipeline is on the roadmap.',
    workflowId: null,
    offerFramings: {
      code: 'License the ALM scenario pipeline scaffolding (when shipped) — typed payloads, agent topology.',
      prompts: 'Directorial prompt archive for ALM analyst + agent pairing on scenario design.',
      consult: 'Senior-led design of your IRRBB / liquidity / FTP pipeline and rollout path.',
    },
  },
  {
    id: 'entity-intelligence',
    name: 'Entity Intelligence',
    status: 'roadmap',
    buyerTitles: ['Head of KYC', 'Head of Client Onboarding', 'Head of Counterparty Data'],
    pain: 'Counterparty and KYC enrichment is fragmented across vendors. Entity resolution and refresh cycles run for weeks.',
    // TODO(terry): previous line claimed "9–12 months → with us, 6–8 weeks" with no
    // evidence. Supply a real delivery range if you want a timeline claim here.
    speedPitch:
      'Every week a refresh cycle runs, AML obligations rest on stale entity data. The resolution pipeline on the roadmap exists to close that gap.',
    workflowId: null,
    offerFramings: {
      code: 'License the entity resolution + enrichment pipeline scaffolding — typed payloads, agent topology.',
      prompts: 'Directorial prompt archive for KYC analyst + agent pairing on entity refresh.',
      consult: 'Senior-led design of your counterparty + KYC automation pipeline.',
    },
  },
  {
    id: 'foundation-ods',
    name: 'Foundation / ODS',
    status: 'shipped',
    buyerTitles: ['CDO', 'CTO', 'Chief Architect', 'Head of Platform', 'Head of Data'],
    pain: 'Your operational data store is a decade of vendor-locked, partial, untyped pipelines. Every new business build pays the foundation tax.',
    // TODO(terry): previous line claimed "12–18 months → with us, 8–12 weeks" with no
    // evidence. Supply a real delivery range if you want a timeline claim here.
    speedPitch:
      'The proof is the platform itself: a CDM-native ODS with schema editor, ingestion, lineage and validators running underneath every labs surface.',
    workflowId: 'financial-data-ingestion-and-structuring',
    offerFramings: {
      code: 'License the CDM-native ODS platform — schema editor, ingestion pipeline, lineage, validators.',
      prompts: 'Directorial archive of the prompts that built the ODS platform.',
      consult: 'Senior-led delivery of a CDM-native ODS in your tenant, with downstream desk surfaces.',
    },
  },
] as const

export function getBuyerTheme(id: string): BuyerTheme | undefined {
  return buyerThemes.find((t) => t.id === id)
}
