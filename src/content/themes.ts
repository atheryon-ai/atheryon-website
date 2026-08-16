// src/lib/themes/themes.ts
//
// Typed source of truth for the /themes discovery page.
//
// MSX twin-page entries (the /msx/* surfaces and the t-msx-hub theme) were
// removed from this catalog on 2026-05-06. The /msx namespace continues to
// serve on the MSX host (msx.dev.atheryon.ai / msx.atheryon.ai) but is no
// longer surfaced on /themes. Twin-page operational routes still live under
// src/app/(msx)/msx/*; only the theme-catalog references were stripped.
//
// Two top-level domains: ODS (Operational Data Store — data plane,
// engineering surface) and BUSINESS (the operational/user surface,
// internally subdivided into the standard banking functions).
//
// Five business units, banking-canonical:
//   - front-office     — origination, sales, execution
//   - risk-analytics   — market risk, credit risk, analytics & ML
//   - operations       — back-office post-trade processing
//   - compliance       — regulatory + control surfaces
//   - treasury         — liquidity, payments, GL, finance
//
// 31 themes / 121 pages total. Sums enforced by the contract test in
// __tests__/themes.test.ts.

export type Domain = 'ODS' | 'BUSINESS';

export type BusinessFunction =
  | 'front-office'
  | 'risk-analytics'
  | 'operations'
  | 'compliance'
  | 'treasury'
  | 'mortgages';

export interface ThemeRoute {
  label: string;
  href: string;
}

export interface Theme {
  id: string;
  title: string;
  shortTitle: string;
  pages: number;
  blurb: string;
  thumb: string;
  primaryRoute: string;
  routes: readonly ThemeRoute[];
  domain: Domain;
  /** Required when domain === 'BUSINESS'. */
  primaryFunction?: BusinessFunction;
  /** Soft cross-links surfaced as `[also: …]` pills on the card. */
  secondaryFunctions?: readonly BusinessFunction[];
}

export const FUNCTION_META: Record<
  BusinessFunction,
  { label: string; blurb: string; office: 'FO' | 'MO' | 'BO' | 'cross' }
> = {
  'front-office': {
    label: 'Front Office',
    blurb:
      'Origination, sales, execution — orders, RFQ, trade board, KYC and pre-trade compliance.',
    office: 'FO',
  },
  'risk-analytics': {
    label: 'Risk & Analytics',
    blurb:
      'Market risk, credit risk, collateral, pricing, analytics & ML — measurement and decision support.',
    office: 'MO',
  },
  operations: {
    label: 'Operations',
    blurb:
      'Post-trade processing — confirmations, lifecycle events, netting, SSI, recs, commodities.',
    office: 'BO',
  },
  compliance: {
    label: 'Compliance',
    blurb:
      'Regulatory pipelines, controls, trade repository submissions across CFTC / EMIR / MiFID II / SFTR.',
    office: 'cross',
  },
  treasury: {
    label: 'Treasury / Finance',
    blurb: 'Liquidity, settlements, funding, payments oversight, general ledger.',
    office: 'cross',
  },
  mortgages: {
    label: 'Mortgages',
    blurb:
      'Loan origination, LIXI2 ingestion, portfolio, pricing, and IFRS 9 expected credit loss for residential mortgages.',
    office: 'cross',
  },
};

export const FUNCTION_ORDER: readonly BusinessFunction[] = [
  'front-office',
  'risk-analytics',
  'operations',
  'compliance',
  'treasury',
  'mortgages',
];

const t = (id: string) => `/menu-themes-thumbs/${id}.png`;

// ── ODS · Operational Data Store · 7 themes · 56 pages ────────────
export const ODS_THEMES: readonly Theme[] = [
  {
    id: 't-schema-model',
    title: 'Schema Modelling & Browser',
    shortTitle: 'Schema Modelling',
    pages: 12,
    blurb:
      '2,043 CDM types · 44 ISO 20022 messages · 14 FpML schemas. Editor, browser, graph explorer, comparer, samples, mappings library, Legend Studio.',
    thumb: t('t-schema-model'),
    primaryRoute: '/explore/schema',
    routes: [
      { label: 'Schema Browser', href: '/explore/schema' },
      { label: 'Schema Editor (Monaco + AST)', href: '/build/schema-editor' },
      { label: 'Create Trade / Object', href: '/build/create' },
      { label: 'Object Builder', href: '/build/object-builder' },
      { label: 'CDM Graph Explorer', href: '/explore/graph' },
      { label: 'Sample Trades', href: '/explore/samples' },
      { label: 'Cross-Schema (CDM ↔ ISO 20022)', href: '/explore/cross-schema' },
      { label: 'Schema Comparer (CDM 6 → 7)', href: '/explore/schema-comparer' },
      { label: 'Legend Studio', href: '/build/legend-studio' },
      { label: 'Physical Commodity Model', href: '/build/physical-commodity' },
      { label: 'Mappings Library', href: '/mappings' },
      { label: 'Interactive Mapper', href: '/build/mapper' },
    ],
    domain: 'ODS',
  },
  {
    id: 't-validators',
    title: 'Validators',
    shortTitle: 'Validators',
    pages: 3,
    blurb:
      'Unified · CDM · Schema-Extensions validators with field-level error reports.',
    thumb: t('t-validators'),
    primaryRoute: '/validate/unified',
    routes: [
      { label: 'Unified Validator', href: '/validate/unified' },
      { label: 'CDM Validator', href: '/validate/cdm' },
      { label: 'Schema Extensions Validator', href: '/validate/extensions' },
    ],
    domain: 'ODS',
  },
  {
    id: 't-market-data',
    title: 'Market Data',
    shortTitle: 'Market Data',
    pages: 2,
    blurb:
      'Read-only viewers for yield curves and volatility surfaces, sourced from atheryon-risk market_data / mdm endpoints.',
    thumb: t('t-market-data'),
    primaryRoute: '/data/curves',
    routes: [
      { label: 'Curves',       href: '/data/curves' },
      { label: 'Vol Surfaces', href: '/data/vol-surfaces' },
    ],
    domain: 'ODS',
  },
  {
    id: 't-lifecycle-engine',
    title: 'Lifecycle Engine & Transforms',
    shortTitle: 'Lifecycle Engine',
    pages: 6,
    blurb:
      '14 event types (amendment / novation / termination / reset / allocation / clearing / compression). Data ingest → transform → ISO pipeline → orchestration DAG.',
    thumb: t('t-lifecycle-engine'),
    primaryRoute: '/build/event-executor',
    routes: [
      { label: 'Event Executor', href: '/build/event-executor' },
      { label: 'Data Ingest', href: '/build/data-ingest' },
      { label: 'Transform Studio', href: '/build/transform' },
      { label: 'Visual Orchestration DAG', href: '/build/orchestration' },
      { label: 'ISO 20022 Pipeline', href: '/build/iso-pipeline' },
      { label: 'Trade Capture (CDM)', href: '/build/trade-capture' },
      { label: 'ATLP Trade Flow', href: '/build/atlp-flow' },
    ],
    domain: 'ODS',
  },
  {
    id: 't-entity-intelligence',
    title: 'Entity Intelligence',
    shortTitle: 'Entity Intelligence',
    pages: 9,
    blurb:
      'Reference-data hub — cross-ref, ingest, instruments, sanctions, sanctions screen, resolution queue, anomalies, patterns.',
    thumb: t('t-entity-intelligence'),
    primaryRoute: '/entity-intelligence',
    routes: [
      { label: 'Entity Hub', href: '/entity-intelligence' },
      { label: 'Cross-Reference', href: '/entity-intelligence/cross-ref' },
      { label: 'Entity Ingest', href: '/entity-intelligence/ingest' },
      { label: 'Instruments', href: '/entity-intelligence/instruments' },
      { label: 'Sanctions', href: '/entity-intelligence/sanctions' },
      { label: 'Sanctions Screen', href: '/entity-intelligence/sanctions-screen' },
      { label: 'Resolution Queue', href: '/entity-intelligence/queue' },
      { label: 'Anomalies', href: '/entity-intelligence/anomalies' },
      { label: 'Patterns', href: '/entity-intelligence/patterns' },
    ],
    domain: 'ODS',
    secondaryFunctions: ['risk-analytics'],
  },
  {
    id: 't-ops-support',
    title: 'Ops Support & Developer Tools',
    shortTitle: 'Ops Support & Dev',
    pages: 5,
    blurb:
      'Projects · agent testing · system diagnostics · task state · CI/CD pipelines.',
    thumb: t('t-ops-support'),
    primaryRoute: '/projects',
    routes: [
      { label: 'Projects', href: '/projects' },
      { label: 'Agent Testing', href: '/system/agent-testing' },
      { label: 'System Diagnostics', href: '/system/diagnostics' },
      { label: 'Task State', href: '/system/task-state' },
      { label: 'CI/CD', href: '/developers/cicd' },
    ],
    domain: 'ODS',
  },
  // MSX Workshop Deck moved to atheryon-ai/msx-docs (msx.docs.atheryon.ai)
  // on 2026-05-05. The /msx/workshop/* paths 308-redirect there from
  // src/middleware.ts.
];

// ── BUSINESS · 25 themes · 84 pages ──────────────────────────────
const FRONT_OFFICE: readonly Theme[] = [
  {
    id: 't-trade-board',
    title: 'Trade Board (Home)',
    shortTitle: 'Trade Board',
    pages: 3,
    blurb:
      'The platform home — 1,480 live trades on a 5-stage ribbon (Validate → Execute → Confirm → Clear → Settle), capability views, per-trade SLA dots.',
    thumb: t('t-trade-board'),
    primaryRoute: '/front-office/board',
    routes: [
      { label: 'Trade Board', href: '/front-office/board' },
      { label: 'Commodity Forward Demo', href: '/front-office/board/demo/commodity-forward' },
      { label: 'Inbox', href: '/front-office/board/inbox' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'front-office',
  },
  {
    id: 't-orders-rfq',
    title: 'Orders & RFQ',
    shortTitle: 'Orders & RFQ',
    pages: 6,
    blurb:
      'Pre-trade order management — EOI / blotter / RFQ / lineage / pre-allocations. From client interest to executable order.',
    thumb: t('t-orders-rfq'),
    primaryRoute: '/orders/dashboard',
    routes: [
      { label: 'Expressions of Interest', href: '/orders/eoi' },
      { label: 'Order Blotter', href: '/orders/blotter' },
      { label: 'Order Lineage', href: '/orders/lineage' },
      { label: 'Orders Dashboard', href: '/orders/dashboard' },
      { label: 'Pre-Allocations', href: '/orders/allocations' },
      { label: 'RFQ', href: '/orders/rfq' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'front-office',
  },
  {
    id: 't-pretrade-compliance',
    title: 'Pre-Trade Compliance & Onboarding',
    shortTitle: 'Pre-Trade Compl.',
    pages: 4,
    blurb:
      'Permissibility, KYC / client acceptance, pre-trade compliance and validation gates before an order is allowed to execute.',
    thumb: t('t-pretrade-compliance'),
    primaryRoute: '/pre-trade/permissibility',
    routes: [
      { label: 'Pre-Trade Compliance', href: '/orders/compliance' },
      { label: 'Pre-Trade Validation', href: '/orders/validate' },
      { label: 'Client Acceptance / KYC', href: '/pre-trade/client-acceptance' },
      { label: 'Permissibility', href: '/pre-trade/permissibility' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'front-office',
  },
];

const OPERATIONS: readonly Theme[] = [
  {
    id: 't-break-triage',
    title: 'Break Triage & Exceptions',
    shortTitle: 'Break Triage',
    pages: 3,
    blurb:
      'D10 Exception Management — break detection, integration visualiser, exception inbox covering Confirm → SSI → Nostro → Portfolio.',
    thumb: t('t-break-triage'),
    primaryRoute: '/operations/break-triage',
    routes: [
      { label: 'Break Triage', href: '/operations/break-triage' },
      { label: 'Integration Visualizer', href: '/post-trade/integration-visualizer' },
      { label: 'Exceptions', href: '/post-trade/exceptions' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-confirmations',
    title: 'Confirmations (D2)',
    shortTitle: 'Confirmations',
    pages: 2,
    blurb:
      'Trade confirmation matching — paper / electronic / physical commodity. CF-01..18 HLR coverage.',
    thumb: t('t-confirmations'),
    primaryRoute: '/operations/confirmations',
    routes: [
      { label: 'Confirmations (D2)', href: '/operations/confirmations' },
      { label: 'Confirmations — Physical', href: '/operations/confirmations/physical' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-lifecycle',
    title: 'Lifecycle Management (D3)',
    shortTitle: 'Lifecycle',
    pages: 2,
    blurb:
      'Lifecycle event flow + ops audit log. Amendments, novations, terminations, resets, allocations.',
    thumb: t('t-lifecycle'),
    primaryRoute: '/operations/lifecycle',
    routes: [
      { label: 'Lifecycle Management (D3)', href: '/operations/lifecycle' },
      { label: 'Ops Audit Log', href: '/post-trade/audit' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-netting',
    title: 'Netting & Compression (D4)',
    shortTitle: 'Netting',
    pages: 2,
    blurb:
      '$73.2B gross / $24.7B net · 66% benefit. Compression simulator, multilateral, payment netting.',
    thumb: t('t-netting'),
    primaryRoute: '/operations/netting',
    routes: [
      { label: 'Netting / Compression (D4)', href: '/operations/netting' },
      { label: 'Netting — Physical', href: '/post-trade/netting/physical' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-ssi',
    title: 'SSI Management (D5)',
    shortTitle: 'SSI',
    pages: 3,
    blurb:
      '50 SSIs · DVP/FOP/PVP/RVP · real BICs (CHASUS33XXX, GLOSGB2LXXX). Exception handling, physical commodity SSIs.',
    thumb: t('t-ssi'),
    primaryRoute: '/operations/ssi',
    routes: [
      { label: 'SSI Management (D5)', href: '/operations/ssi' },
      { label: 'SSI Exceptions', href: '/post-trade/ssi-exceptions' },
      { label: 'SSI — Physical', href: '/post-trade/ssi/physical' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-portfolio-recon',
    title: 'Portfolio Reconciliation',
    shortTitle: 'Portfolio Recon',
    pages: 4,
    blurb:
      '500 positions · 94% match · $117K disputed. ISIN-level breaks, disputes, inventory.',
    thumb: t('t-portfolio-recon'),
    primaryRoute: '/operations/portfolio-recon',
    routes: [
      { label: 'Portfolio Recon (alt)', href: '/operations/portfolio-recon' },
      { label: 'Portfolio Reconciliation', href: '/post-trade/portfolio-recon' },
      { label: 'Portfolio — Disputes', href: '/post-trade/portfolio-recon/disputes' },
      { label: 'Portfolio — Inventory', href: '/post-trade/portfolio-recon/inventory' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-nostro-recon',
    title: 'Nostro Reconciliation (D8)',
    shortTitle: 'Nostro Recon',
    pages: 5,
    blurb:
      '8 nostro accounts · 84.9% match · USD/EUR/GBP/JPY/AUD/SGD/HKD/CHF. Analytics, audit, triage, physical commodity nostros.',
    thumb: t('t-nostro-recon'),
    primaryRoute: '/operations/nostro-recon',
    routes: [
      { label: 'Nostro Reconciliation (D8)', href: '/operations/nostro-recon' },
      { label: 'Nostro — Analytics', href: '/operations/nostro-recon/analytics' },
      { label: 'Nostro — Audit', href: '/operations/nostro-recon/audit' },
      { label: 'Nostro — Triage', href: '/operations/nostro-recon/triage' },
      { label: 'Nostro — Physical', href: '/operations/nostro-recon/physical' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
  {
    id: 't-commodities',
    title: 'Commodities Operations',
    shortTitle: 'Commodities Ops',
    pages: 9,
    blurb:
      'Physical commodity twin — trade capture, dashboard, data quality, delivery, delivery-points, lifecycle, pricing, validation, REMIT reporting.',
    thumb: t('t-commodities'),
    primaryRoute: '/operations/commodities',
    routes: [
      { label: 'Commodities Trade Capture', href: '/commodities/trade-capture' },
      { label: 'Delivery Points', href: '/commodities/delivery-points' },
      { label: 'Commodities Dashboard', href: '/operations/commodities' },
      { label: 'Commodities Data Quality', href: '/commodities/quality' },
      { label: 'Commodities Delivery', href: '/commodities/delivery' },
      { label: 'Commodities Lifecycle', href: '/commodities/lifecycle' },
      { label: 'Commodities Pricing', href: '/commodities/pricing' },
      { label: 'Commodities Validate', href: '/commodities/validate' },
      { label: 'REMIT', href: '/commodities/remit' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'operations',
  },
];

const COMPLIANCE: readonly Theme[] = [
  {
    id: 't-compliance-center',
    title: 'Compliance Center & Controls',
    shortTitle: 'Compliance Center',
    pages: 5,
    blurb:
      'D11 controls hub — 76% overall · 12 jurisdictions. Regulatory scorer, validator, audit log, recon config.',
    thumb: t('t-compliance-center'),
    primaryRoute: '/compliance/center',
    routes: [
      { label: 'Compliance Center', href: '/compliance/center' },
      { label: 'Compliance Scorer', href: '/compliance/scorer' },
      { label: 'Compliance Validator', href: '/compliance/validator' },
      { label: 'Compliance Audit Log', href: '/compliance/audit-log' },
      { label: 'Recon Config', href: '/compliance/recon-config' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'compliance',
  },
  {
    id: 't-reg-pipeline',
    title: 'Regulatory Pipeline',
    shortTitle: 'Reg Pipeline',
    pages: 5,
    blurb:
      'Event pipeline → mapping → reconciliation → reporting. T+1 / T+2 batch tracking with field-level mapping engine.',
    thumb: t('t-reg-pipeline'),
    primaryRoute: '/compliance/pipeline',
    routes: [
      { label: 'Compliance Pipeline', href: '/compliance/pipeline' },
      { label: 'Event Pipeline', href: '/compliance/event-pipeline' },
      { label: 'Regulatory Reporting', href: '/compliance/reporting' },
      { label: 'Reg Field Mapping', href: '/compliance/mapping' },
      { label: 'Reg Reconciliation', href: '/compliance/reconciliation' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'compliance',
  },
  {
    id: 't-tr-submissions',
    title: 'Trade Repository Submissions',
    shortTitle: 'TR Submissions',
    pages: 7,
    blurb:
      'Per-jurisdiction submissions: ASIC/EMIR EU/UK/CFTC/MAS/JFSA/HKMA/Dodd-Frank/MiFID II/SFTR + TR lifecycle.',
    thumb: t('t-tr-submissions'),
    primaryRoute: '/compliance/submissions',
    routes: [
      { label: 'Submissions', href: '/compliance/submissions' },
      { label: 'CFTC Reporting', href: '/compliance/cftc' },
      { label: 'Dodd-Frank', href: '/compliance/dodd-frank' },
      { label: 'EMIR (EU/UK)', href: '/compliance/emir' },
      { label: 'MiFID II', href: '/compliance/mifid' },
      { label: 'SFTR', href: '/compliance/sftr' },
      { label: 'Trade Repository Lifecycle', href: '/trade-repository/lifecycle' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'compliance',
  },
];

const RISK_ANALYTICS: readonly Theme[] = [
  {
    id: 't-risk-pricer',
    title: 'Pricer',
    shortTitle: 'Pricer',
    pages: 1,
    blurb:
      'Multi-asset pricer — IR Swaps, FX (forward/option/swap), Commodity, and Exotics. Real-time pricing via the atheryon-risk proxy.',
    thumb: t('t-risk-pricer'),
    primaryRoute: '/risk/pricer',
    routes: [
      { label: 'Pricer', href: '/risk/pricer' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'risk-analytics',
  },
  {
    id: 't-risk-analytics',
    title: 'Risk Analytics',
    shortTitle: 'Risk Analytics',
    pages: 4,
    blurb:
      'IRRBB Basel scenarios (real, in-process), plus Scenarios/Stress, VaR, and Correlation (page shells, v2 wiring).',
    thumb: t('t-risk-analytics'),
    primaryRoute: '/risk/irrbb',
    routes: [
      { label: 'IRRBB',       href: '/risk/irrbb' },
      { label: 'Scenarios',   href: '/risk/scenarios' },
      { label: 'VaR',         href: '/risk/var' },
      { label: 'Correlation', href: '/risk/correlation' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'risk-analytics',
  },
  {
    id: 't-risk-pnl',
    title: 'P&L',
    shortTitle: 'P&L',
    pages: 1,
    blurb:
      'Daily P&L and advanced attribution. v1 ships the page shell with tab scaffolding; atheryon-risk pnl/pnl_advanced wiring is v2.',
    thumb: t('t-risk-pnl'),
    primaryRoute: '/risk/pnl',
    routes: [
      { label: 'P&L', href: '/risk/pnl' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'risk-analytics',
  },
  {
    id: 't-collateral',
    title: 'Collateral',
    shortTitle: 'Collateral',
    pages: 3,
    blurb:
      '$367.5M exposure · $2.7B available · $597.7M pledged. VM/IM/agreements/disputes/delivery/triparty pivots, with physical commodity variant.',
    thumb: t('t-collateral'),
    primaryRoute: '/post-trade/collateral',
    routes: [
      { label: 'Collateral', href: '/post-trade/collateral' },
      { label: 'Collateral Management', href: '/post-trade/collateral-management' },
      { label: 'Collateral — Physical', href: '/post-trade/collateral/physical' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'risk-analytics',
    secondaryFunctions: ['operations'],
  },
  {
    id: 't-analytics',
    title: 'Analytics & ML',
    shortTitle: 'Analytics & ML',
    pages: 4,
    blurb:
      'Dashboard · data quality · ML workbench · 11 AI-detected patterns (T+2 fails, SWIFT delays, EMIR gaps).',
    thumb: t('t-analytics'),
    primaryRoute: '/analyse/dashboard',
    routes: [
      { label: 'Analytics Dashboard', href: '/analyse/dashboard' },
      { label: 'Data Quality Analytics', href: '/analyse/quality' },
      { label: 'ML Workbench', href: '/analyse/ml' },
      { label: 'Pattern Analysis', href: '/analyse/pattern' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'risk-analytics',
  },
];

const TREASURY: readonly Theme[] = [
  {
    id: 't-settlements',
    title: 'Settlements (D7)',
    shortTitle: 'Settlements',
    pages: 1,
    blurb:
      '$22.5B today · 11 active runs · 8 pending tonight. PvP/DvP run tracking, cash-ladder by currency.',
    thumb: t('t-settlements'),
    primaryRoute: '/treasury/settlements',
    routes: [
      { label: 'Settlements (D7)', href: '/treasury/settlements' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'treasury',
    secondaryFunctions: ['operations'],
  },
  {
    id: 't-payments-gl',
    title: 'Payments & General Ledger',
    shortTitle: 'Payments & GL',
    pages: 1,
    blurb:
      'ISO 20022 pacs.008 / pain.001 messaging, BIC routing, GL postings. D7 PM-01..07 coverage.',
    thumb: t('t-payments-gl'),
    primaryRoute: '/treasury/payments',
    routes: [
      { label: 'Payments', href: '/treasury/payments' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'treasury',
    secondaryFunctions: ['operations'],
  },
];

const MORTGAGES: readonly Theme[] = [
  {
    id: 't-mortgages-workspace',
    title: 'Mortgages Workspace',
    shortTitle: 'Workspace',
    pages: 3,
    blurb:
      'Mortgage book overview — applications dashboard, portfolio table, and a state-machine walkthrough of an application moving through the pipeline.',
    thumb: t('t-mortgages-workspace'),
    primaryRoute: '/mortgages',
    routes: [
      { label: 'Mortgages Dashboard', href: '/mortgages' },
      { label: 'Portfolio', href: '/mortgages/portfolio' },
      { label: 'Application Explorer', href: '/mortgages/explorer' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'mortgages',
  },
  {
    id: 't-mortgages-origination',
    title: 'Origination & LIXI',
    shortTitle: 'Origination',
    pages: 3,
    blurb:
      'LIXI2 message gateway, multi-tier validation playground, and CSV migration console for bulk loan onboarding.',
    thumb: t('t-mortgages-origination'),
    primaryRoute: '/mortgages/gateway',
    routes: [
      { label: 'LIXI2 Gateway', href: '/mortgages/gateway' },
      { label: 'Validation Playground', href: '/mortgages/validate' },
      { label: 'CSV Migration', href: '/mortgages/migration' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'mortgages',
  },
  {
    id: 't-mortgages-risk',
    title: 'Mortgage Risk & Pricing',
    shortTitle: 'Risk & Pricing',
    pages: 2,
    blurb:
      'Loan pricing calculator (fixed/variable, APR, comparison rate, DV01) and IFRS 9 expected credit loss with collateral and LMI adjustments. ALM/IRRBB lives in the Risk & Analytics module.',
    thumb: t('t-mortgages-risk'),
    primaryRoute: '/mortgages/pricing',
    routes: [
      { label: 'Loan Pricing', href: '/mortgages/pricing' },
      { label: 'IFRS 9 ECL', href: '/mortgages/credit' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'mortgages',
  },
  {
    id: 't-mortgages-data',
    title: 'LIXI2 Data Model',
    shortTitle: 'LIXI2 Model',
    pages: 1,
    blurb:
      'Interactive ReactFlow visualization of the LIXI2 type graph — categories, drill-down expansion, search, layout.',
    thumb: t('t-mortgages-data'),
    primaryRoute: '/mortgages/data-model',
    routes: [{ label: 'LIXI2 Type Graph', href: '/mortgages/data-model' }],
    domain: 'BUSINESS',
    primaryFunction: 'mortgages',
  },
  {
    // Slice D — Origination workflow operator cockpit. Gated by
    // FEATURE_MORTGAGES_ORIGINATION (sidebar sub-item is conditionally
    // included in nav-config.ts; routes 404 via the route group layout
    // when the flag is off).
    id: 't-mortgages-origination-cockpit',
    title: 'Origination Cockpit',
    shortTitle: 'Cockpit',
    pages: 2,
    blurb:
      'LIXI2-native operator surface — live KPI rollup, 17-state pipeline funnel, stalled queues, and 30-day throughput for the mortgage origination workflow engine.',
    thumb: t('t-mortgages-origination-cockpit'),
    primaryRoute: '/mortgages/origination/cockpit',
    routes: [
      { label: 'Cockpit Home', href: '/mortgages/origination/cockpit' },
      { label: 'Case Queue', href: '/mortgages/origination/queue' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'mortgages',
  },
];

export const BUSINESS_THEMES_BY_FUNCTION: Record<BusinessFunction, readonly Theme[]> = {
  'front-office': FRONT_OFFICE,
  'risk-analytics': RISK_ANALYTICS,
  operations: OPERATIONS,
  compliance: COMPLIANCE,
  treasury: TREASURY,
  mortgages: MORTGAGES,
};

export const ALL_THEMES: readonly Theme[] = [
  ...ODS_THEMES,
  ...FRONT_OFFICE,
  ...RISK_ANALYTICS,
  ...OPERATIONS,
  ...COMPLIANCE,
  ...TREASURY,
  ...MORTGAGES,
];

export const ALL_THEME_IDS: readonly string[] = ALL_THEMES.map((th) => th.id);

export const ALL_THEME_PRIMARY_ROUTES: readonly string[] = ALL_THEMES.map(
  (th) => th.primaryRoute,
);

export function pageCountFor(themes: readonly Theme[]): number {
  return themes.reduce((sum, th) => sum + th.pages, 0);
}
