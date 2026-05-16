/**
 * Snapshot of labs-platform/src/lib/themes/themes.ts (date: 2026-05-11).
 * Dependency-free copy for the marketing site. Manual re-sync required if
 * the source taxonomy changes — there is no build-time link between repos.
 */

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
// 26 themes / 111 pages total. Sums enforced by the contract test in
// __tests__/themes.test.ts (labs-platform).

export type Domain = 'ODS' | 'BUSINESS';

export type BusinessFunction =
  | 'front-office'
  | 'risk-analytics'
  | 'operations'
  | 'compliance'
  | 'treasury';

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
};

export const FUNCTION_ORDER: readonly BusinessFunction[] = [
  'front-office',
  'risk-analytics',
  'operations',
  'compliance',
  'treasury',
];

const t = (id: string) => `/menu-themes-thumbs/${id}.png`;

// ── ODS · Operational Data Store · 6 themes · 37 pages ────────────
export const ODS_THEMES: readonly Theme[] = [
  {
    id: 't-schema-model',
    title: 'Schema Modelling & Browser',
    shortTitle: 'Schema Modelling',
    pages: 12,
    blurb:
      // Counts match the working-set in the labs-platform schema browser
      // (CDM v7.0 = 1,019 types; ISO 20022 / FpML per the schema-explorer DB).
      '1,019 CDM types · 42 ISO 20022 messages · 14 FpML schemas. Editor, browser, graph explorer, comparer, samples, mappings library, Legend Studio.',
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
];

// ── BUSINESS · 20 themes · 74 pages ──────────────────────────────
const FRONT_OFFICE: readonly Theme[] = [
  {
    id: 't-trade-board',
    title: 'Trade Board (Home)',
    shortTitle: 'Trade Board',
    pages: 3,
    blurb:
      'The platform home — 1,480 live trades on a 5-stage ribbon (Validate → Execute → Confirm → Clear → Settle), capability views, per-trade SLA dots.',
    thumb: t('t-trade-board'),
    primaryRoute: '/ops',
    routes: [
      { label: 'Trade Board', href: '/ops' },
      { label: 'Commodity Forward Demo', href: '/ops/demo/commodity-forward' },
      { label: 'Inbox', href: '/ops/inbox' },
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
    primaryRoute: '/post-trade/integration',
    routes: [
      { label: 'Break Triage', href: '/post-trade/integration' },
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
    primaryRoute: '/post-trade/confirmations',
    routes: [
      { label: 'Confirmations (D2)', href: '/post-trade/confirmations' },
      { label: 'Confirmations — Physical', href: '/post-trade/confirmations/physical' },
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
    primaryRoute: '/post-trade-ops/lifecycle',
    routes: [
      { label: 'Lifecycle Management (D3)', href: '/post-trade-ops/lifecycle' },
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
      '$73.2B gross / $24.7B net · 66% benefit. Compression simulator and physical commodity netting.',
    thumb: t('t-netting'),
    primaryRoute: '/post-trade/netting-compression',
    routes: [
      { label: 'Netting / Compression (D4)', href: '/post-trade/netting-compression' },
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
      '50 SSIs · DVP/FOP/PVP/RVP · real BICs (CHASUS33XXX, GLOSGB2LXXX). Management, exception handling, physical commodity SSIs.',
    thumb: t('t-ssi'),
    primaryRoute: '/post-trade/ssi-management',
    routes: [
      { label: 'SSI Management (D5)', href: '/post-trade/ssi-management' },
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
    primaryRoute: '/post-trade/portfolio-reconciliation',
    routes: [
      { label: 'Portfolio Recon (alt)', href: '/post-trade/portfolio-reconciliation' },
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
    primaryRoute: '/post-trade/nostro-reconciliation',
    routes: [
      { label: 'Nostro Reconciliation (D8)', href: '/post-trade/nostro-reconciliation' },
      { label: 'Nostro — Analytics', href: '/post-trade/nostro-reconciliation/analytics' },
      { label: 'Nostro — Audit', href: '/post-trade/nostro-reconciliation/audit' },
      { label: 'Nostro — Triage', href: '/post-trade/nostro-reconciliation/triage' },
      { label: 'Nostro — Physical', href: '/post-trade/nostro-reconciliation/physical' },
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
    primaryRoute: '/commodities/dashboard',
    routes: [
      { label: 'Commodities Trade Capture', href: '/commodities/trade-capture' },
      { label: 'Delivery Points', href: '/commodities/delivery-points' },
      { label: 'Commodities Dashboard', href: '/commodities/dashboard' },
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
    primaryRoute: '/post-trade-ops/settlements',
    routes: [
      { label: 'Settlements (D7)', href: '/post-trade-ops/settlements' },
    ],
    domain: 'BUSINESS',
    primaryFunction: 'treasury',
    secondaryFunctions: ['operations'],
  },
];

export const BUSINESS_THEMES_BY_FUNCTION: Record<BusinessFunction, readonly Theme[]> = {
  'front-office': FRONT_OFFICE,
  'risk-analytics': RISK_ANALYTICS,
  operations: OPERATIONS,
  compliance: COMPLIANCE,
  treasury: TREASURY,
};

export const ALL_THEMES: readonly Theme[] = [
  ...ODS_THEMES,
  ...FRONT_OFFICE,
  ...RISK_ANALYTICS,
  ...OPERATIONS,
  ...COMPLIANCE,
  ...TREASURY,
];

export const ALL_THEME_IDS: readonly string[] = ALL_THEMES.map((th) => th.id);

export const ALL_THEME_PRIMARY_ROUTES: readonly string[] = ALL_THEMES.map(
  (th) => th.primaryRoute,
);

export function pageCountFor(themes: readonly Theme[]): number {
  return themes.reduce((sum, th) => sum + th.pages, 0);
}
