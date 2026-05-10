export const site = {
  name: 'Atheryon',
  tagline: 'Decision-grade data platforms for regulated markets.',
  email: 'info@atheryon.com.au',

  nav: [
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Recovery & Migration', href: '/recovery-migration' },
    { label: 'Capability Enablement', href: '/capability-enablement' },
    { label: 'M&A Execution', href: '/m-and-a-execution' },
    { label: 'CDM Platform', href: '/cdm-platform' },
    { label: 'Reference Architectures', href: '/reference-architectures' },
    { label: 'AI-Ready Data', href: '/ai-ready-data' },
    { label: 'About', href: '/about' },
  ],

  // Services dropdown items (used in Header)
  servicesNav: [
    { label: 'CDM Platform', href: '/cdm-platform' },
    { label: 'Recovery & Migration', href: '/recovery-migration' },
    { label: 'M&A Execution', href: '/m-and-a-execution' },
    { label: 'Capability Enablement', href: '/capability-enablement' },
  ],

  cta: {
    label: 'Request a confidential discussion',
    href: '/contact',
  },

  // Core copy blocks from spec
  copy: {
    headline: 'Decision-grade data platforms for regulated markets.',
    subheadline: 'Atheryon builds decision-grade data platforms for capital markets and institutional banking — where data must be trusted, governance is non-negotiable, and business risk is real.',
    philosophy: 'Senior practitioners who have carried the risk, building platforms that withstand regulatory scrutiny.',
    proofFraming: 'We are engaged when data programs have consumed significant investment but failed to produce outputs the business can trust under regulatory or operational pressure. Our work stabilises delivery, enforces semantic clarity, and leaves behind governed platforms that reduce the cost of future change.',
    migrationFraming: 'We treat migration as a modelling and validation problem, not a transport problem. The goal is to preserve meaning, reduce downstream rewrites, and create regulator-credible assets.',
  },

  pages: {
    home: {
      title: 'Atheryon | Decision-grade data platforms for regulated markets',
      description: 'Atheryon builds decision-grade data platforms for capital markets and institutional banking — regulator-credible, production-grade, senior-led.',
      hero: {
        headline: 'Decision-grade data platforms under pressure',
        subheadline: 'Platforms that accelerate regulated delivery, reduce operational and regulatory risk, and provide trusted data for critical decisions.',
        primaryCta: { label: 'Request a confidential discussion', href: '/contact' },
        secondaryCta: { label: 'How we deliver', href: '/how-we-work' },
      },
      whoWeAreFor: {
        badge: 'Who We Help',
        title: 'Built for high-stakes environments',
        forClients: [
          'Tier-1 banks and investment banks',
          'Capital markets and trading infrastructure',
          'Institutional banking and asset management',
          'Regulators, central agencies, and market operators',
        ],
        notForClients: [
          'Data cannot be trusted for regulatory reporting or risk decisions',
          'No single source of truth — inconsistent definitions across front, middle, and back office',
          'Regulatory exposure increasing due to data quality or lineage gaps',
          'Programs stalled after significant investment — no production outcomes',
          'Delivery too slow — teams cannot ship governed capability under time pressure',
        ],
      },
      problemLeadIn: {
        badge: 'The reality',
        title: 'The problem we see before we\u2019re engaged',
        description:
          'Most regulated organisations accumulate point solutions over time. Data moves, but meaning erodes. Definitions diverge across teams. Governance becomes reactive. Delivery slows. Risk rises.',
      },
      problemsWeSolve: {
        badge: 'The Problem',
        title: 'The problem we solve',
        cards: [
          {
            title: 'Data cannot be trusted',
            description: 'Regulatory reporting, risk calculations, and trade surveillance rely on data that no one has confidence in.',
          },
          {
            title: 'No single source of truth',
            description: 'Inconsistent definitions across front, middle, and back office. Every team maintains its own version.',
          },
          {
            title: 'Regulatory exposure',
            description: 'Data quality and lineage gaps create material regulatory risk. Scrutiny is increasing.',
          },
          {
            title: 'Stalled programs',
            description: 'Significant investment consumed. No production outcomes. Executive confidence eroding.',
          },
          {
            title: 'Delivery too slow',
            description: 'Teams cannot ship governed, regulator-credible capability under real time pressure.',
          },
        ],
      },
      whatWeDo: {
        badge: 'Outcomes',
        title: 'What we deliver',
        columns: [
          {
            title: 'Data the business can trust',
            description: 'Decision-grade platforms where regulatory reporting, risk, and trade surveillance operate on a single governed truth.',
          },
          {
            title: 'Regulator-credible governance',
            description: 'Lineage, ownership, and controls that withstand regulatory scrutiny — built in, not bolted on.',
          },
          {
            title: 'Programs that reach production',
            description: 'Stalled initiatives recovered. New capability shipped under real constraints. Institutional confidence restored.',
          },
        ],
      },
      howWeWorkTeaser: {
        badge: 'Our Method',
        title: 'How we work',
        steps: [
          'Strategy — define outcomes, constraints, and what "done" means',
          'Architecture — semantic alignment, governance model, platform design',
          'Delivery — build, validate, ship to production under pressure',
        ],
        link: { label: 'Learn more about our method', href: '/how-we-work' },
      },
      credibility: {
        badge: 'Our Track Record',
        title: 'Credibility without logos',
        quote: 'We are engaged when data programs have consumed significant investment but failed to produce outputs the business can trust under regulatory or operational pressure. Our work stabilises delivery, enforces semantic clarity, and leaves behind governed platforms that reduce the cost of future change.',
        bullets: [
          'Recovering stalled programs in live trading and regulatory environments',
          'Building decision-grade platforms under regulatory scrutiny',
          'Senior-led delivery — principals on the ground, not juniors with slide decks',
        ],
      },
      referenceArchitecturesTeaser: {
        badge: 'Reference Architectures',
        title: 'Artefacts, not claims',
        cards: [
          {
            title: 'Canonical data model layer',
            description: 'Shared semantics that enable reuse across capabilities.',
          },
          {
            title: 'Bronze/Silver/Gold pipelines',
            description: 'Progressive refinement with validation at each stage.',
          },
          {
            title: 'Governance + AI consumption',
            description: 'Controlled access patterns for safe AI integration.',
          },
        ],
        link: { label: 'View reference architectures', href: '/reference-architectures' },
      },
      servicesSection: {
        badge: 'Our Services',
        title: 'How we help',
        cards: [
          {
            title: 'Recovery & Migration',
            description: 'Recover stalled data programs and execute migrations that preserve meaning — regulator-credible, production-grade.',
            href: '/recovery-migration',
          },
          {
            title: 'M&A Execution',
            description: 'Separation and integration delivery where operational continuity and regulatory obligations cannot be interrupted.',
            href: '/m-and-a-execution',
          },
          {
            title: 'Capability Enablement',
            description: 'Turn delivered platforms into durable business capability with governance, ownership, and operating models that endure.',
            href: '/capability-enablement',
          },
        ],
      },
      finalCta: {
        text: 'If data issues are visible at executive level, regulatory scrutiny is increasing, or a program is failing to land outcomes — we should talk.',
        cta: { label: 'Request a confidential discussion', href: '/contact' },
      },
    },

    howWeWork: {
      title: 'How We Work | Atheryon',
      description: 'Two delivery models for complex data, regulatory, and M&A initiatives under real execution pressure.',
      hero: {
        headline: 'How we work',
        subheadline: 'Two delivery models, one outcome: governed capability in production.',
      },
      intro: {
        title: 'Choose your delivery model',
        description: 'Data & AI delivery for platform initiatives. M&A execution for transactions and integrations.',
        ctas: [
          { label: 'Data & AI Delivery', href: '#data-delivery' },
          { label: 'M&A Execution', href: '#ma-execution' },
        ],
      },
      transition: {
        badge: 'When the delivery motion changes',
        title: 'For transactions, execution is different',
        description: 'M&A requires deal-timetable delivery, continuity, and controlled migration where needed.',
      },
      methods: [
        {
          id: 'data-delivery',
          badge: 'Data & AI Delivery',
          title: 'From strategy to production capability',
          subheadline: 'For complex data, AI, and regulatory initiatives under delivery pressure.',
          steps: [
            {
              number: 1,
              title: 'Define outcomes and constraints',
              description: 'Agree the business outcome, delivery constraints (regulatory, technical, organisational), and what "done" means.',
            },
            {
              number: 2,
              title: 'Align definitions and ownership',
              description: 'Establish shared definitions and ownership—so teams trust what the data represents.',
            },
            {
              number: 3,
              title: 'Build pipelines with validation',
              description: 'Build the pipeline with automated checks—reject bad data early.',
            },
            {
              number: 4,
              title: 'Ship production capability',
              description: 'Deliver the working capability into production with runbooks, controls, and operational ownership.',
            },
            {
              number: 5,
              title: 'Package reusable data products',
              description: 'Document and govern the assets so future initiatives reuse what\'s built.',
            },
          ],
          done: {
            title: 'What done looks like',
            bullets: [
              'Production capability live with operational ownership',
              'Quality controls, lineage, and governance in place',
              'Reusable data products published for future delivery',
            ],
          },
        },
        {
          id: 'ma-execution',
          badge: 'M&A Execution',
          title: 'From deal intent to operational reality',
          subheadline: 'For acquisitions, separations, and integrations where execution risk is material.',
          steps: [
            {
              number: 1,
              title: 'Pre-deal execution readiness',
              description: 'Assess execution implications before signing—scope, cost, data, operational continuity, and regulatory requirements.',
            },
            {
              number: 2,
              title: 'Stand up the execution team',
              description: 'Provide hands-on delivery leadership and teams aligned to the deal timetable—delivery, not slideware.',
            },
            {
              number: 3,
              title: 'Execute separation or integration',
              description: 'Plan and run separation or integration across technology, data, operations, and governance under time pressure.',
            },
            {
              number: 4,
              title: 'Manage data migrations where required',
              description: 'Design and deliver migrations only where they enable the deal outcome—controlled, auditable, regulator-ready.',
            },
          ],
          done: {
            title: 'What done looks like',
            bullets: [
              'Deal timetable protected with clear execution governance',
              'Operational and regulatory continuity maintained through transition',
              'Data migrations completed only where required, with audit trail',
            ],
          },
        },
      ],
      // Used by homepage teaser
      whatDoneLooksLike: {
        title: 'What done looks like',
        items: [
          'Schema documented and versioned',
          'Validation rules explicit and enforced',
          'Ownership and lineage clear',
          'Consumption patterns defined and controlled',
        ],
      },
    },

    recoveryMigration: {
      title: 'Recovery & Migration | Atheryon',
      description: 'We recover stalled data programs and execute model-led migrations that preserve meaning under regulatory and operational pressure.',
      hero: {
        headline: 'Recovery & migration',
        subheadline: 'When data initiatives stall or migrations lose meaning, we help.',
      },
      whenClientsCallUs: {
        badge: 'When Clients Call Us',
        title: 'Triggers for engagement',
        items: [
          'Platform exists but nobody trusts the outputs',
          'Stalled initiative after major spend',
          'Vendor platform too rigid or opaque',
          'Migration required but semantics unclear',
          'Pilots exist but cannot be operationalised',
        ],
      },
      recovery: {
        badge: 'Recovery',
        title: 'How we recover stalled initiatives',
        description: 'Stabilise, simplify, extract usable data products. We are vendor-agnostic—we work with what you have.',
        items: [
          'Assess current state without blame',
          'Identify what can be salvaged',
          'Clarify semantics and ownership',
          'Extract reusable data products',
          'Create path to production',
        ],
      },
      migration: {
        badge: 'Model-Led Migration',
        title: 'Migration as a modelling problem',
        quote: 'We treat migration as a modelling and validation problem, not a transport problem. The goal is to preserve meaning, reduce downstream rewrites, and create reusable assets.',
        items: [
          'Map source semantics to target model',
          'Validate transformations before execution',
          'Preserve lineage through migration',
          'Test meaning, not just row counts',
        ],
      },
      whatWeLeave: {
        title: 'What we leave behind',
        items: [
          'Canonical model aligned to business terms',
          'Validated migration pipelines',
          'Documented transformation logic',
          'Reusable data products for future capabilities',
        ],
      },
    },

    capabilityEnablement: {
      title: 'Capability Enablement | Atheryon',
      description: 'Turn delivered platforms into durable business capability with embedded ownership, governance, and operating models that withstand regulatory scrutiny.',
      hero: {
        headline: 'Capability Enablement',
        subheadline: 'Turn delivered platforms into durable business capability.',
      },
      intro: {
        text: 'Most organisations can deliver platforms. Far fewer succeed in enabling real capability.\n\nCapability Enablement focuses on embedding ownership, governance, delivery patterns, and operating models so data, analytics, and AI capabilities continue to deliver outcomes under real-world and regulatory pressure.',
      },
      capabilities: [
        {
          title: 'Regulatory & Risk Capability',
          description: 'Enable end-to-end regulatory and risk capabilities that are production-grade, traceable, and defensible under scrutiny.',
        },
        {
          title: 'Data Product Capability',
          description: 'Establish repeatable, governed data products with shared semantics, clear contracts, and embedded quality controls.',
        },
        {
          title: 'Governance Built In',
          description: 'Embed ownership, lineage, and access controls directly into platforms and delivery models — not bolted on later.',
        },
        {
          title: 'Analytics & AI Foundations',
          description: 'Enable query-ready analytics and AI consumption patterns that operate safely within defined guardrails.',
        },
        {
          title: 'Delivery Capability',
          description: 'Build internal delivery capability across business, data, and technology so success can be repeated.',
        },
      ],
    },

    maExecution: {
      title: 'M&A Execution | Atheryon',
      description: 'Separation and integration delivery.',
      hero: {
        headline: 'M&A Execution',
        subheadline: 'Separation and integration delivery.',
      },
      intro: {
        text: 'M&A success is determined after the deal is signed.\n\nWe support organisations through separation and integration execution where timelines are fixed, operational risk is high, and regulatory obligations must continue uninterrupted. We preserve meaning in data and processes while enabling Day-1 readiness and clean transition to the target operating model.',
      },
      whenClientsCallUs: {
        badge: 'When Clients Call Us',
        title: 'Triggers for engagement',
        items: [
          'Pre-deal planning deficits',
          'Execution capability gaps',
          'High-stakes transaction delivery',
          'Data migration risk in M&A',
        ],
      },
      execution: {
        badge: 'Execution',
        title: 'How we execute separation & integration',
        description: 'Plan, sequence, and execute with control. We work with what you have and deliver to deadlines.',
        items: [
          'Establish separation/integration plan tied to deal outcomes',
          'Define Day-1 requirements and transition operating model',
          'Map critical data, reporting, and control dependencies',
          'Execute separation/integration waves with clear contracts',
          'Reduce TSA scope and drive clean exit to target state',
        ],
      },
      capabilities: [
        {
          title: 'Separation & Integration Strategy',
          description: 'Pragmatic strategy aligned to deal objectives, constraints, and delivery reality.',
        },
        {
          title: 'Day-1 / Day-2 Readiness',
          description: 'Design and deliver operating readiness with clear transition sequencing.',
        },
        {
          title: 'Data & Platform Separation',
          description: 'Separate or integrate data and platforms while preserving meaning and controls.',
        },
        {
          title: 'TSA Reduction & Exit',
          description: 'Reduce TSA scope and duration through disciplined delivery and target-state design.',
        },
        {
          title: 'Post-Sign Delivery Leadership',
          description: 'Hands-on execution leadership through to completion and value realisation.',
        },
      ],
      outcomes: {
        title: 'What we deliver',
        description: 'Execution that protects value, reduces dependency, and preserves regulatory continuity.',
        items: [
          'Clean separation/integration delivered to timeline',
          'Reduced TSA cost and duration',
          'Lower operational disruption and delivery risk',
          'Regulatory continuity across reporting and controls',
          'Value realised post-sign, not eroded',
        ],
      },
    },

    cdmPlatform: {
      title: 'CDM Platform | Atheryon',
      description: 'Transform your derivatives operations with an AI-powered ISDA CDM validation and transformation platform.',
      hero: {
        headline: 'Transform Your Derivatives Operations',
        subheadline: 'An AI-powered platform for ISDA CDM validation, transformation, and regulatory compliance—built for enterprise scale.',
      },
      challenge: {
        badge: 'The Challenge',
        title: 'Why derivatives data management is broken',
        cards: [
          {
            title: 'Manual Reconciliation',
            description: 'Over 50% of operations time spent on data quality issues and manual reconciliation across systems.',
          },
          {
            title: 'Inconsistent Formats',
            description: 'Multiple trade representations, proprietary formats, and siloed data preventing straight-through processing.',
          },
          {
            title: 'Regulatory Complexity',
            description: 'Different rules across 8+ jurisdictions (CFTC, EMIR, MAS, etc.) with constantly evolving requirements.',
          },
          {
            title: 'Integration Friction',
            description: 'Point-to-point integrations create brittle architectures that are expensive to maintain and extend.',
          },
        ],
      },
      solution: {
        badge: 'The Solution',
        title: 'Enterprise-grade CDM platform',
        description: 'A unified platform built on FINOS CDM standards that automates validation, transformation, and regulatory reporting.',
        stats: [
          { value: '77', label: 'Platform Components' },
          { value: '12', label: 'Microservices' },
          { value: '6', label: 'Applications' },
          { value: '44', label: 'AI Agents' },
        ],
      },
      capabilities: {
        badge: 'Core Capabilities',
        title: 'What the platform does',
        sections: [
          {
            title: 'CDM Validation Engine',
            description: 'Production-grade validation with full FINOS CDM compliance.',
            features: [
              { title: 'Schema Validation', description: 'JSON Schema, XSD, and FpML format validation with detailed error reporting.' },
              { title: 'Business Rules', description: 'Configurable validation rules for trade economics, dates, and party structures.' },
              { title: 'Real-time Processing', description: 'Sub-second validation for high-volume trade flows.' },
            ],
          },
          {
            title: 'Transformation Services',
            description: 'Bidirectional conversion between formats with semantic preservation.',
            features: [
              { title: 'Multi-format Support', description: 'FpML, JSON, CSV, and proprietary formats with extensible adapters.' },
              { title: 'Semantic Mapping', description: 'Intelligent field mapping that preserves business meaning across transformations.' },
              { title: 'Batch & Streaming', description: 'Process individual trades or high-volume batch files with equal reliability.' },
            ],
          },
          {
            title: 'AI-Powered Analysis',
            description: 'Machine learning for pattern recognition and anomaly detection.',
            features: [
              { title: 'Anomaly Detection', description: 'Identify unusual trade patterns, pricing outliers, and data quality issues.' },
              { title: 'Document Understanding', description: 'Extract structured data from trade confirmations and legal documents.' },
              { title: 'Predictive Validation', description: 'Learn from historical corrections to prevent recurring issues.' },
            ],
          },
          {
            title: 'Knowledge Graph',
            description: 'Connected data model for relationship discovery and lineage.',
            features: [
              { title: 'Entity Resolution', description: 'Unified view of counterparties, instruments, and legal entities.' },
              { title: 'Impact Analysis', description: 'Understand downstream effects of data changes before they propagate.' },
              { title: 'Regulatory Mapping', description: 'Trace data lineage from source systems through to regulatory reports.' },
            ],
          },
        ],
      },
      regulatory: {
        badge: 'Regulatory Compliance',
        title: 'Multi-jurisdiction support',
        description: 'Pre-configured rules for major regulatory frameworks with continuous updates.',
        jurisdictions: [
          { name: 'CFTC', region: 'United States' },
          { name: 'EMIR', region: 'European Union' },
          { name: 'MAS', region: 'Singapore' },
          { name: 'JFSA', region: 'Japan' },
          { name: 'HKMA', region: 'Hong Kong' },
          { name: 'ASIC', region: 'Australia' },
          { name: 'FCA', region: 'United Kingdom' },
          { name: 'OSFI', region: 'Canada' },
        ],
        features: [
          '65+ pre-built validation rules per jurisdiction',
          'Automated submission formatting',
          'Regulatory change impact analysis',
          'Audit trail and compliance reporting',
        ],
      },
      performance: {
        badge: 'Performance',
        title: 'Built for enterprise scale',
        stats: [
          { value: '<100ms', label: 'API Response Time' },
          { value: '10,000+', label: 'Trades/Second' },
          { value: '99.5%', label: 'Match Rate' },
          { value: '99.9%', label: 'Uptime SLA' },
        ],
      },
      personas: {
        badge: 'Who It\'s For',
        title: 'Built for your team',
        items: [
          { title: 'Risk Managers', description: 'Real-time exposure visibility with validated, consistent data across all positions.' },
          { title: 'Compliance Officers', description: 'Automated regulatory validation with audit trails and exception management.' },
          { title: 'Quantitative Analysts', description: 'Clean, normalized data in standard CDM format for models and analytics.' },
          { title: 'Operations Teams', description: 'Reduced manual reconciliation with intelligent matching and exception handling.' },
          { title: 'Technology Teams', description: 'Modern APIs, containerized deployment, and extensible architecture.' },
        ],
      },
      standards: {
        badge: 'Standards & Technology',
        title: 'Built on open standards',
        items: [
          { name: 'FINOS CDM', description: 'ISDA Common Domain Model' },
          { name: 'FpML', description: 'Financial Products Markup Language' },
          { name: 'ISO 20022', description: 'Financial Messaging Standard' },
          { name: 'Rosetta DSL', description: 'Domain-Specific Language' },
          { name: 'OpenAPI', description: 'REST API Specification' },
          { name: 'GraphQL', description: 'Query Language' },
        ],
      },
    },

    whatWeDeliver: {
      title: 'What We Deliver | Atheryon',
      description: 'Decision-grade outcomes for capital markets and institutional banking — governed platforms, recovered programs, and regulator-credible capability.',
      hero: {
        headline: 'What we deliver',
        subheadline: 'Governed platforms, recovered programs, and regulator-credible capability — delivered under real pressure.',
      },
      outcomes: {
        badge: 'Outcomes',
        title: 'What our clients walk away with',
        items: [
          {
            title: 'Data the business can trust',
            description: 'Decision-grade platforms where regulatory reporting, risk, and trade surveillance operate on a single governed truth.',
          },
          {
            title: 'Regulator-credible governance',
            description: 'Lineage, ownership, and controls that withstand regulatory scrutiny — built in, not bolted on.',
          },
          {
            title: 'Programs that reach production',
            description: 'Stalled initiatives recovered. New capability shipped under real constraints. Institutional confidence restored.',
          },
          {
            title: 'Reduced cost of future change',
            description: 'Reusable data products and shared semantics that compound — so the next initiative starts ahead, not from scratch.',
          },
        ],
      },
      deliverables: {
        badge: 'Deliverables',
        title: 'What we leave behind',
        items: [
          'Canonical data model aligned to business terms',
          'Validated pipelines with quality controls at every stage',
          'Documented transformation logic and lineage',
          'Operational runbooks and ownership models',
          'Reusable data products for future capabilities',
          'Governance frameworks that enable, not block',
        ],
      },
      engagementShapes: {
        badge: 'Engagement Models',
        title: 'How we engage',
        items: [
          {
            title: 'Recovery & Stabilisation',
            duration: '8–16 weeks',
            description: 'Assess, stabilise, and extract usable capability from stalled programs. Vendor-agnostic — we work with what you have.',
          },
          {
            title: 'Platform Delivery',
            duration: '3–9 months',
            description: 'Strategy through to production capability. Governed data platforms built under real constraints with senior practitioners.',
          },
          {
            title: 'M&A Execution',
            duration: 'Deal-timetable aligned',
            description: 'Separation and integration delivery where operational continuity and regulatory obligations cannot be interrupted.',
          },
        ],
      },
    },

    referenceArchitectures: {
      title: 'Reference Architectures | Atheryon',
      description: 'Production-tested architecture patterns for enterprise data platforms.',
      hero: {
        headline: 'Reference architectures',
        subheadline: 'Artefacts over claims.',
      },
      intro: {
        text: 'We share architecture patterns that we have used in production. These are not theoretical—they represent approaches we have implemented and operated.',
      },
      architectures: [
        {
          title: 'Canonical data model layer',
          description: 'A shared semantic layer that enables reuse across capabilities. Business terms mapped to technical implementations. Versioned, documented, governed.',
        },
        {
          title: 'Bronze/Silver/Gold pipelines',
          description: 'Progressive data refinement with validation at each stage. Raw data (bronze) through cleansed (silver) to business-ready (gold). Clear contracts between stages.',
        },
        {
          title: 'Validation and controls',
          description: 'Rules applied at ingestion and transformation. Schema validation, business rule checks, anomaly detection. Bad data rejected early.',
        },
        {
          title: 'Governance integration',
          description: 'Ownership, lineage, and access controls built into the platform. Not bolted on later. Governance that enables rather than blocks.',
        },
        {
          title: 'AI consumption patterns',
          description: 'Query-ready interfaces for analytics. Embedding-ready corpora for retrieval. Safe agent patterns over governed data. AI that operates within guardrails.',
        },
      ],
    },

    aiReadyData: {
      title: 'AI-Ready Data | Atheryon',
      description: 'Creating decision-grade data foundations that enable AI to operate reliably in regulated environments.',
      hero: {
        headline: 'AI-ready data',
        subheadline: 'AI fails when data fails. We build the governed data platforms that make AI reliable in regulated environments.',
      },
      whyAiFails: {
        badge: 'Why AI Fails',
        title: 'Why AI fails in enterprises',
        items: [
          {
            title: 'Inconsistent semantics',
            description: 'Same terms mean different things in different systems. AI inherits the confusion.',
          },
          {
            title: 'Ungoverned data',
            description: 'No clear ownership, lineage, or access controls. AI operates in the dark.',
          },
          {
            title: 'Brittle pipelines',
            description: 'Data flows break. AI outputs become unreliable. Trust erodes.',
          },
        ],
      },
      whatAiReadyMeans: {
        badge: 'What AI-Ready Means',
        title: 'What AI-ready actually means',
        items: [
          'Consistent model—shared semantics across the enterprise',
          'Validation—rules that enforce data quality at ingestion',
          'Provenance—clear lineage from source to consumption',
          'Stable access patterns—APIs and interfaces that AI can rely on',
        ],
      },
      howWeEnable: {
        badge: 'How We Enable AI',
        title: 'How Atheryon enables AI',
        items: [
          {
            title: 'Query layer',
            description: 'Structured access to governed data. AI can ask questions and get reliable answers.',
          },
          {
            title: 'Embedding-ready corpora',
            description: 'Documents and data prepared for retrieval-augmented generation. Semantics preserved.',
          },
          {
            title: 'Safe agent patterns',
            description: 'AI agents that operate over governed data with appropriate guardrails. Auditable actions.',
          },
        ],
      },
      disclaimer: {
        text: 'We do not promise ROI. We create conditions for repeatable deployment.',
      },
    },

    about: {
      title: 'About | Atheryon',
      description: 'Senior practitioners who have carried the risk — building decision-grade data platforms for capital markets and institutional banking.',
      hero: {
        headline: 'Built by practitioners who\'ve carried the risk',
        subheadline: 'Senior-led. Regulator-credible. Production-grade.',
      },
      whatWeAre: {
        title: 'What Atheryon is',
        description: 'A practitioner-led firm that builds decision-grade data platforms for capital markets and institutional banking. We combine decades of delivery leadership in regulated environments with modern architecture and governance to ship capability that the business can trust and regulators can scrutinise.',
      },
      whyWeExist: {
        title: 'Why Atheryon exists',
        description: 'High-stakes environments — trading, risk, regulatory reporting — depend on data that is governed, consistent, and trusted. Too many platform programs consume significant investment and fail to produce outputs the business can rely on. Atheryon exists to close that gap: strategy, architecture, and delivery under real pressure.',
      },
      credibilityBoxes: [
        {
          title: '20+ Years in Capital Markets',
          description: 'Over two decades of delivery leadership across global capital markets — London and Australia. Tier-one banks, market infrastructure, and regulatory environments. Front-to-back data, risk, and regulatory reporting capability delivered under sustained operational and regulatory pressure.\n\nHands-on leadership across live trading, market risk, credit risk, product control, payments, and regulatory reporting aligned to APRA, ASIC, MiFID II, EMIR, and Dodd-Frank. Senior-led — principals on the ground, not juniors with slide decks.',
        },
        {
          title: 'M&A Execution & Integration',
          description: 'M&A introduces the highest execution risk organisations face — compressed timelines, regulatory continuity requirements, and complex data dependencies. We execute separation and integration programs where capital markets platforms, reporting obligations, and data integrity must continue uninterrupted.\n\nPre-deal execution planning, post-sign delivery leadership, and complex data migration where required — protecting value while enabling the target operating model.',
        },
      ],
      whatExperienceMeans: {
        title: 'What experience means to us',
        items: [
          'Delivery under constraint—regulatory pressure, legacy systems, organisational complexity',
          'Recovery work—we have seen what fails and know how to fix it',
          'Hands-on engineering—we build, not just advise',
        ],
      },
      principles: {
        title: 'Our principles',
        items: [
          {
            title: 'Production over demos',
            description: 'We ship capabilities that operate in production, not proofs of concept.',
          },
          {
            title: 'Reuse over point solutions',
            description: 'We build data products that compound, not one-off fixes.',
          },
          {
            title: 'Clarity over complexity',
            description: 'We simplify. We document. We make things understandable.',
          },
        ],
      },
    },

    contact: {
      title: 'Contact | Atheryon',
      description: 'Request a confidential discussion about a high-stakes data challenge in capital markets or institutional banking.',
      hero: {
        headline: 'Request a confidential discussion',
        subheadline: 'You should speak with us if data issues are now visible at executive level, regulatory scrutiny is increasing, or a program is failing to land outcomes.',
      },
      form: {
        fields: {
          name: { label: 'Name', placeholder: 'Your name', required: true },
          email: { label: 'Email', placeholder: 'your@email.com', required: true },
          company: { label: 'Company', placeholder: 'Your company', required: false },
          message: { label: 'What\'s the problem?', placeholder: 'Describe the challenge you\'re facing...', required: true },
        },
        submitLabel: 'Request a discussion',
      },
      whatToInclude: {
        title: 'What to include',
        items: [
          'Current state—what data, platforms, or programs exist today',
          'Pressure—regulatory exposure, risk visibility, or executive scrutiny',
          'Constraints—timeline, compliance obligations, organisational complexity',
        ],
      },
      alternative: {
        text: 'Prefer email?',
        email: 'info@atheryon.com.au',
      },
    },

    programs: {
      title: 'Programs | Atheryon',
      description: 'Industry IP programs for AI agents — bootstrap a market-platform prototype with your AI agent in days.',
      hero: {
        headline: 'Industry IP for AI agents',
        subheadline: 'Atheryon programs hand you agent-ready IP — prompts, schemas, designs, and reference architectures — so your AI agent can bootstrap a market-platform prototype in days.',
      },
      section: {
        badge: 'Programs',
        title: 'Choose your program',
      },
      programs: [
        {
          name: 'MiB Insight Program',
          tagline: 'Show your client a credible market-platform vision in days, not months.',
          access: 'Use within 30 days',
          price: '$14,000 AUD + GST',
          status: 'available',
          href: '/programs/mib-insight',
          ctaLabel: 'Learn more',
        },
        {
          name: 'MiB Build Program',
          tagline: 'Implement MiB-derived solutions for your client.',
          access: '12-month access',
          price: 'Coming soon',
          status: 'coming',
          href: '#',
          ctaLabel: 'Coming soon',
        },
        {
          name: 'MiB Run Program',
          tagline: 'Run MiB-derived solutions in your client’s production environment.',
          access: 'Multi-year access',
          price: 'Coming soon',
          status: 'coming',
          href: '#',
          ctaLabel: 'Coming soon',
        },
      ],
    },

    mibInsight: {
      title: 'MiB Insight Program | Atheryon',
      description: 'Industry IP ready for AI agents. Bootstrap a market-platform prototype with your AI agent in days. Use within 30 days. $14,000 AUD + GST.',
      hero: {
        eyebrow: 'MiB Insight Program',
        headline: 'Industry IP ready for AI agents',
        subheadline: 'Bootstrap a market-platform prototype with your AI agent in days. 20 years of markets knowledge synthesised into agent-ready IP modules across trading, operations, and compliance — front to back, used within 30 days of purchase.',
        price: '$14,000 AUD',
        priceFootnote: 'Plus GST. One-time. Use within 30 days. Expensable as professional development.',
        ctaLabel: 'Get access',
        ctaHref: 'https://buy.stripe.com/bJe9AMbRFf525kZbp02Fa00',
      },
      whoItsFor: {
        badge: 'Who this is for',
        title: 'Built for teams building market-platform solutions',
        items: [
          'Consultants and SI architects building client engagements',
          'Capital-markets and fintech product teams (trading, post-trade, market-data, OMS/EMS, compliance vendors)',
          'AI and developer-tool companies serving financial services',
          'Innovation labs at incumbents — banks, exchanges, CCPs, custodians',
        ],
        commonThread: 'Common thread: you already use AI coding agents, and you want to skip 6–12 months of domain ramp-up.',
      },
      whatsIncluded: {
        badge: 'What you get',
        title: 'Five agent-ready IP modules',
        intro: 'Each module distils 20 years of markets knowledge into a self-contained bundle your AI agent can consume directly. Drop the prompts into Claude or Cursor, feed in the schemas, and produce tailored artifacts for your engagement.',
        artifactTypes: [
          { title: 'Prompts pack', description: '10–30 ready-to-use prompts per module — build a screen, generate a schema, produce test data, write a demo script.' },
          { title: 'Schemas', description: 'CDM model excerpts, JSON Schema, and OpenAPI specs your agent can ingest.' },
          { title: 'Design specs', description: 'Annotated screens, design tokens, and Figma exports your agent can adapt.' },
          { title: 'Reference architectures', description: 'Mermaid diagrams and ADRs in machine-readable form.' },
          { title: 'Example transcripts', description: 'Recorded Claude/Cursor sessions showing the IP in action — proof it works.' },
          { title: 'Sample data', description: 'Synthetic but realistic CSV and JSON for end-to-end demos.' },
          { title: 'Walkthrough', description: 'Short human-facing doc — read once, then drive the agent.' },
        ],
      },
      outcomes: {
        badge: 'Outcomes',
        title: 'What you can do within 30 days',
        items: [
          'Generate a tailored client demo or product prototype with your agent in a day.',
          'Produce a credible market-platform reference architecture for a client meeting or product spec.',
          'Bootstrap a working prototype your agent can extend into a real engagement or feature.',
        ],
      },
      curriculum: {
        badge: 'Curriculum',
        title: 'Five modules, front to back',
        modules: [
          { name: 'Foundations', description: 'Market-structure primer, CDM glossary, and a "how to use this IP with your AI agent" guide.' },
          { name: 'Front Office: Trading', description: 'Orders, execution, booking, and positions.' },
          { name: 'Middle Office: Lifecycle & Risk', description: 'Lifecycle events, settlement, valuation.' },
          { name: 'Back Office: Books & Operations', description: 'Records, reconciliation, corporate actions.' },
          { name: 'Compliance & Reporting', description: 'Regulatory reporting, surveillance, audit trail.' },
        ],
      },
      faq: {
        badge: 'FAQ',
        title: 'Common questions',
        items: [
          {
            question: 'How is this expensed?',
            answer: 'The Insight Program is a professional-development purchase — typically expensable on a corporate card or out of an L&D budget. The receipt reads "MiB Insight Program — 30-day use".',
          },
          {
            question: 'Is this a software license?',
            answer: 'No. The Insight Program is an industry-IP and education program. You receive program materials — prompts, schemas, designs, reference architectures, sample data, and walkthroughs — not a software product.',
          },
          {
            question: 'What happens at day 30?',
            answer: 'Your access to the program materials ends. You can extend, or move up to the Build Program for ongoing access plus implementation IP.',
          },
          {
            question: 'Can I add team members?',
            answer: 'Yes — each additional seat is priced separately. Reply to your welcome email and we will add them.',
          },
          {
            question: 'Do you offer a discount?',
            answer: 'Yes — reach out and we will arrange one. The list price anchors the program; many buyers receive a personal promotion code at checkout.',
          },
          {
            question: 'What if I need a refund?',
            answer: 'Because program materials are delivered immediately on purchase, we do not offer refunds once access is granted. Exceptions are at our discretion.',
          },
        ],
      },
      finalCta: {
        title: 'Ready to bootstrap your next prototype?',
        subtitle: 'Use within 30 days. $14,000 AUD + GST, one-time. Promotion code applied at checkout.',
        ctaLabel: 'Get access',
        ctaHref: 'https://buy.stripe.com/bJe9AMbRFf525kZbp02Fa00',
      },
    },
    mibInsightThanks: {
      title: 'Welcome to the MiB Insight Program | Atheryon',
      description: 'Thank you for joining the MiB Insight Program. Your welcome email is on the way.',
      headline: 'Welcome to the MiB Insight Program',
      message: 'Thank you for joining. You will receive a welcome email shortly with access details and a 15-minute Foundations module to get started. If anything is unclear, reply to that email — it goes straight to Terry.',
    },

    labs: {
      title: 'Atheryon Labs — Pitch Pack',
      description: 'A senior capital-markets data leader using AI to turn 20+ years of tacit banking delivery knowledge into a working, inspectable reference platform.',
      hero: {
        headlineLine1: 'Most capital-markets platforms take a decade and a thousand engineers.',
        headlineLine2: 'This one took one banker, directing AI.',
        body: 'Atheryon Labs is a CDM-native reference implementation across trading, post-trade, risk, treasury, compliance, and mortgage workflows — built by Terry Tsakiris with AI as a coding partner. Twenty years inside Credit Suisse, CBA, Westpac, Barclays, applied to a working artifact you can inspect.',
        disclaimer: 'It is not a production bank platform. It is proof that senior domain judgment plus AI-assisted engineering compresses discovery, architecture, and working delivery into weeks.',
        primaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
        secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
        tertiaryCta: { label: 'Request a confidential discussion', href: '/contact' },
      },
      credibility: {
        badge: 'Twenty years on the inside',
        title: 'A career inside tier-1 banks',
        photo: '/labs/terry-headshot.jpg',
        photoAlt: 'Terry Tsakiris',
        body: "I'm Terry Tsakiris. At Credit Suisse I built the bank's first near-real-time front-office risk system, then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates. At Commonwealth Bank I owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance. At Westpac Institutional Banking I rescued a distressed $84M data program and stood up a Data Products capability that delivered ten times faster than the bank's prior baseline. Atheryon Labs is the next iteration of that method: the same delivery muscle, paired with AI.",
      },
      stats: {
        badge: 'At a glance',
        title: 'The shape of what was built',
        items: [
          { value: '8', label: 'banking functions covered' },
          { value: '1', label: 'CDM data model — ISDA-compliant, end to end' },
          { value: '31', label: 'flagship surfaces shipped' },
          { value: 'Live', label: 'at labs.atheryon.ai' },
        ],
      },
      bankMap: {
        badge: 'The bank, mapped',
        title: 'Eight functions, one model',
        caption: 'The bank as I have worked it. Each section maps to a function I have shipped inside a tier-1 institution.',
        boxes: [
          'Operational Data Store',
          'Front Office',
          'Operations',
          'Compliance & Reporting',
          'Market Risk',
          'Credit Risk',
          'Treasury',
          'Mortgages',
        ],
      },
      flagships: {
        badge: 'Three deep-dives',
        title: 'What the platform actually does',
        items: [
          {
            number: '01',
            name: 'Trade Board + Operations',
            screenshot: '/labs/screenshots/ops-board.png',
            screenshotAlt: 'Atheryon Labs trade board and operations surface',
            problem: 'Operations teams in capital markets reconcile breaks, manage confirmations, and process lifecycle events end-of-day under hard regulatory deadlines. Most platforms model this as a workflow tool. The result is reconciliation that misses the underlying CDM event.',
            howItWorks: 'The /ops board is built directly on the CDM event model: every break, confirmation, and lifecycle action is an event with a typed payload. Operators triage breaks, run lifecycle actions, and the audit trail is the event stream itself — not an after-the-fact log.',
            metric: 'CV anchor: CBA Markets ODS — Reg Trade Reporting, MiFID II, Surveillance.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.',
          },
          {
            number: '02',
            name: 'Risk Pricer + IRRBB',
            screenshot: '/labs/screenshots/risk-pricer.png',
            screenshotAlt: 'Atheryon Labs risk pricer and IRRBB surface',
            problem: 'Front-office and middle-office risk teams need pricing and risk views that are fast, correct, and inspectable. Most platforms separate the pricer from the risk view, then reconcile them downstream. The reconciliation is where errors live.',
            howItWorks: '/risk/pricer and /risk/irrbb call a typed atheryon-risk client over a shared CDM trade payload. Pricing and Greeks come from the same source; IRRBB views layer balance-sheet sensitivity on top. One model, one wire format, one source of truth for explain.',
            metric: 'CV anchor: Credit Suisse FOBO risk + Global P&L Attribution.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.',
          },
          {
            number: '03',
            name: 'Schema Editor + CDM Intelligence',
            screenshot: '/labs/screenshots/schema-editor.png',
            screenshotAlt: 'Atheryon Labs schema editor and CDM intelligence surfaces',
            problem: 'The hardest part of any banking data platform is keeping the data model honest under change. Most platforms treat the schema as a database concern. The result is silent drift between the model the business agrees to and the model the system enforces.',
            howItWorks: '/build/schema-editor edits CDM types directly. /explore/graph walks instances of those types. Reg Submissions reverse-map regulator artefacts back to CDM, so the schema and the regulator are always in the same conversation.',
            metric: 'CV anchor: the data-modelling thesis — the Atheryon differentiator.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · directed by Terry, executed in AI-pair mode.',
          },
        ],
      },
      vignettes: {
        badge: "What AI couldn't know without the banker",
        title: 'Five places domain judgment changed the implementation',
        intro: 'In each of these, the AI proposed something plausible. Twenty years on the trading floor changed the answer. The point of this section is not that AI is bad. The point is that the durable artefact is the human directing it.',
        items: [
          {
            title: 'Lifecycle state model',
            aiProposed: 'The AI proposed modelling a trade as a row that moves through statuses — pending, confirmed, settled, terminated. Standard CRUD with a lifecycle column.',
            bankerCorrected: 'CDM events are not trade states. Operations does not reconcile rows; it reconciles events — partial terminations, increases, novations, exercise — each one a typed payload with its own controls. The data model was rebuilt event-first, with the trade as a projection.',
          },
          {
            title: 'Regulatory Trade Reporting evidence',
            aiProposed: 'The AI generated reporting endpoints that emitted the regulator-required fields. Functionally complete by the spec.',
            bankerCorrected: 'MiFID II and EMIR audits do not ask for the report; they ask for the *evidence chain* — what was reported, what changed, who approved, when. The platform was extended to emit a per-submission evidence artefact alongside the report. Reg Submissions is built around that artefact.',
          },
          {
            title: 'Risk view granularity',
            aiProposed: 'The AI built a risk view that aggregated P&L explain by risk type — delta, gamma, vega, theta. Textbook taxonomy.',
            bankerCorrected: 'FOBO P&L breaks if you do not separate explain types the way the trading floor separates them — market move, new trades, amendments, lifecycle, parameters, residual. The Greeks taxonomy came second; the FOBO taxonomy came first, and it is what reconciles.',
          },
          {
            title: 'Schema modelling — extend vs wrap',
            aiProposed: 'The AI defaulted to extending CDM types whenever a bank-specific field was needed. Inheritance, by the textbook.',
            bankerCorrected: 'Goldman SecDB taught the opposite: extend when the concept is genuinely a CDM concept with one more attribute; wrap when the concept is a bank-internal artefact that happens to reference CDM. The schema editor encodes both modes, and the rule for choosing.',
          },
          {
            title: 'Ops exception handling at 5pm Sydney',
            aiProposed: 'The AI built an exception queue with severity, owner, and SLA. Tidy.',
            bankerCorrected: 'At 5pm Sydney, operations does not work an SLA queue. It works a *deadline*: what must be in the regulator before market open in Frankfurt. The queue was redesigned around deadline-to-cutoff, with a cutoff calendar that knows the holiday schedule of every relevant venue.',
          },
        ],
      },
      method: {
        badge: 'The 10× method',
        title: 'How a banker directs AI',
        principles: [
          {
            title: 'Built from banking controls, not user stories.',
            body: 'Where most AI demos start "as a user I want…", this started with the regulatory artefact, the operational control, the risk view. Controls drive surfaces; surfaces do not drive controls.',
          },
          {
            title: 'Started from the product / event / data model, not the screen.',
            body: 'CDM-first, then surfaces. The data model is the contract. Every screen is a projection of it.',
          },
          {
            title: 'Generate variants, then narrow them.',
            body: 'Three implementation candidates per surface. AI generates them in minutes. Banking judgment rejects, corrects, and chooses.',
          },
          {
            title: 'Every surface traceable to a banking function, CDM concept, and operating control.',
            body: 'The labs IA enforces this. If a surface cannot be mapped, it does not ship.',
          },
          {
            title: 'The deliverable is a working decision surface, not a slide deck.',
            body: 'Inspectable, deployable, extendable. A reader who is technical can fork it tonight.',
          },
        ],
        artifact: {
          heading: 'One real prompt, one real correction',
          promptShown: '{{TERRY_PROMPT_EXAMPLE_PROMPT}}',
          correctionShown: '{{TERRY_PROMPT_EXAMPLE_CORRECTION}}',
          prLink: '{{TERRY_PROMPT_EXAMPLE_PR_URL}}',
        },
        disclosure: "Atheryon Labs is currently built using Anthropic's Claude. The method is model-agnostic by design — the durable artefact is how a banker directs AI, not which AI is on the other side of the chat.",
      },
      engagement: {
        badge: 'Three ways to use what is here',
        title: 'Code, prompts, advisory',
        cards: [
          {
            number: '01',
            title: 'Take the code.',
            body: "Fork the labs-platform repo. Inspect, deploy, extend. Suitable for technology partners and engineering teams who want to study the reference implementation. Includes architecture map, CDM model, and read-only access to a hosted instance.",
            ctaLabel: 'Inspect',
            ctaHref: '/contact?topic=labs-code',
          },
          {
            number: '02',
            title: 'Take the prompts.',
            body: "A curated archive of the prompts, corrections, and architectural decisions that produced the platform — paired with Terry's reasoning per surface. Not a generic prompt library; the banker's directorial track.",
            ctaLabel: 'License',
            ctaHref: '/contact?topic=labs-prompts',
          },
          {
            number: '03',
            title: 'Take the advisory.',
            body: 'Atheryon Advisory engagements: 30-day diagnostic, prototype sprint, or full data-platform recovery. Continuing the method that rescued the $84M Westpac program — now amplified.',
            ctaLabel: 'Engage',
            ctaHref: '/contact?topic=labs-advisory',
          },
        ],
      },
      closing: {
        badge: 'Available for select engagements',
        title: 'Atheryon partners with a small number of institutions per year.',
        body: 'If what you have just read maps to a problem on your desk, the next step is a confidential conversation.',
        primaryCta: { label: 'Request a confidential discussion', href: '/contact' },
        secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
        tertiaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
      },
    },

    reality: {
      title: 'Atheryon — Architects of Your Reality',
      description: 'Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.',
      hero: {
        headline: 'Reality is built on data. Architect yours.',
        lede: 'Atheryon helps enterprises structure their data, activate intelligence, and transform how decisions, systems, and operations work.',
        primaryCta: { label: 'Enter Floor 13', href: '#floor-13' },
        secondaryCta: { label: 'Explore the pillars', href: '#pillars' },
      },
      pillars: {
        anchor: 'pillars',
        badge: 'Three pillars',
        title: 'Data. Intelligence. Transformation.',
        intro: 'A simple three-pillar explanation of how we architect reality.',
        items: [
          {
            number: '01',
            title: 'Data',
            body: 'Foundations: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.',
            href: '/data',
          },
          {
            number: '02',
            title: 'Intelligence',
            body: 'Decision advantage: analytics, AI implementation, forecasting, automation, insight products.',
            href: '/intelligence',
          },
          {
            number: '03',
            title: 'Transformation',
            body: 'Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.',
            href: '/transformation',
          },
        ],
      },
      transition: {
        badge: 'The hidden reality',
        title: 'Beneath every enterprise is a hidden operating reality.',
        body: 'Fragmented systems create fragmented decisions. Atheryon makes the underlying architecture visible, intelligent, and ready for transformation.',
        cta: { label: 'Reveal the hidden layer', href: '#floor-13' },
        steps: [
          { number: '1', title: 'Fragmented data', body: 'Disconnected sources, inconsistent reporting, unclear ownership.' },
          { number: '2', title: 'Structured intelligence', body: 'Reliable pipelines, models, dashboards, AI readiness, decision systems.' },
          { number: '3', title: 'Real transformation', body: 'Cloud, AI, and operating change aligned to measurable business outcomes.' },
        ],
      },
      floor13: {
        anchor: 'floor-13',
        badge: 'Floor 13',
        title: 'Choose the issue that best describes your current reality.',
        intro: 'The switchboard generates a Reality Blueprint below.',
        dials: [
          { id: 'data', title: 'Data pain', body: '"Our data is fragmented, inconsistent, or inaccessible."', cta: 'Plug into Data' },
          { id: 'intelligence', title: 'Intelligence pain', body: '"We have data, but not enough predictive or decision value."', cta: 'Plug into Intelligence' },
          { id: 'transformation', title: 'Transformation pain', body: '"We need change, but the roadmap and operating model are unclear."', cta: 'Plug into Transformation' },
        ],
        inputPlaceholder: 'Optional: type your biggest data or transformation challenge',
        inputCta: 'Generate Blueprint',
        blueprints: {
          data: {
            title: 'Reality Blueprint: Data Foundation',
            intro: 'Your current reality appears to be constrained by fragmented data sources, inconsistent visibility, or unclear data ownership.',
            bullets: [
              'Map critical data sources and business decision points.',
              'Design a unified architecture across cloud, governance, pipelines, and reporting.',
              'Prioritise the first high-value data product that can prove momentum.',
            ],
          },
          intelligence: {
            title: 'Reality Blueprint: Intelligence Layer',
            intro: 'Your organisation may have data available, but the intelligence layer is not yet turning it into prediction, automation, or better decisions.',
            bullets: [
              'Assess analytics maturity and AI readiness.',
              'Identify use cases where models, automation, or decision dashboards can create measurable value.',
              'Build an intelligence layer connected to trusted enterprise data foundations.',
            ],
          },
          transformation: {
            title: 'Reality Blueprint: Transformation Pathway',
            intro: 'Your transformation challenge appears to be less about ambition and more about architecture, roadmap, ownership, and execution.',
            bullets: [
              'Define the target operating reality and the systems required to support it.',
              'Sequence data, cloud, AI, process, and adoption initiatives into a practical roadmap.',
              'Connect transformation activity to measurable business outcomes.',
            ],
          },
          custom: {
            title: 'Reality Blueprint: Custom Challenge',
            intro: 'Your custom challenge has been captured.',
            bullets: [
              'Classify the challenge across data, intelligence, and transformation.',
              'Generate recommended first moves based on the selected pain point.',
              'Continue the conversation in a Reality Architecture Session.',
            ],
          },
        },
        sellCardsHeading: 'Your next moves',
        recommendation: {
          data: 'code',
          intelligence: 'prompts',
          transformation: 'advisory',
        },
        sellCards: [
          { id: 'code', title: 'Take the code', body: 'Fork the labs-platform repo. Inspect, deploy, extend.', ctaLabel: 'Inspect →', ctaHref: '/labs#code' },
          { id: 'prompts', title: 'Take the prompts', body: "A curated archive of the prompts and corrections that produced the platform — paired with Terry's reasoning.", ctaLabel: 'License →', ctaHref: '/labs#prompts' },
          { id: 'advisory', title: 'Take the advisory', body: 'Atheryon Advisory engagements: 30-day diagnostic, prototype sprint, or full data-platform recovery.', ctaLabel: 'Engage →', ctaHref: '/labs#advisory' },
        ],
        closingCta: { label: 'Or — book a Reality Architecture Session', href: '/contact' },
      },
      methodology: {
        anchor: 'methodology',
        badge: 'How we architect reality',
        title: 'Built from controls, not user stories.',
        principles: [
          { title: 'Built from regulatory artefacts and operational controls.', body: 'Most platforms start "as a user I want…". We start with the artefact, the control, the risk view.' },
          { title: 'Started from the data model, not the screen.', body: 'CDM-first, then surfaces. Every screen is a projection of the contract.' },
          { title: 'Generate variants, then narrow.', body: 'AI generates implementation candidates in minutes. Senior judgment chooses, corrects, and ships.' },
          { title: 'Working decision surface, not a slide deck.', body: 'Inspectable, deployable, extendable. Proof, not promise.' },
        ],
      },
      proof: {
        badge: 'Proof — Atheryon Labs',
        title: 'We use this method. Here is the artifact.',
        body: 'Atheryon Labs is a CDM-native reference platform across eight banking functions, built using the /reality approach. A working artefact you can inspect.',
        screenshot: '/labs/screenshots/ops-board.png',
        screenshotAlt: 'Atheryon Labs trade board screenshot',
        cta: { label: 'See the artefact →', href: '/labs' },
      },
      closing: {
        badge: 'Available for select engagements',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation to identify the hidden architecture beneath your data estate and define the first transformation move.',
        primaryCta: { label: 'Request a session', href: '/contact' },
        secondaryCta: { label: 'See the artefact', href: '/labs' },
      },
    },

    data: {
      title: 'Data — Atheryon',
      description: 'The foundation: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.',
      hero: {
        eyebrow: '01 · Data',
        title: 'Data',
        definition: 'The foundation: cloud architecture, governance, pipelines, modelling, platforms, unified visibility.',
        positioning: 'Most enterprises have data. Few have a foundation that intelligence and transformation can stand on. We build that foundation.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most enterprise data programs stall.',
        bullets: [
          'Fragmented sources with no shared ownership or model.',
          'Governance written as policy, not encoded in the platform.',
          'Schemas drift between what the business agrees and what the system enforces.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'From fragmented sources to a decision-grade foundation.',
        cards: [
          { title: 'CDM Platform', body: 'ISDA Common Domain Model implementations — schemas, validators, transforms, governance — for capital-markets data estates.' },
          { title: 'Reference Architectures', body: 'Cloud-native architectures for trading, risk, ops, and reporting — built on CDM, deployable into your estate.' },
          { title: 'Data Foundations', body: 'Pipelines, modelling, governance, lineage, and unified visibility across your enterprise data estate.' },
          { title: 'Schema Modelling', body: 'CDM-first schema design with extension and wrapping patterns for bank-internal artefacts.' },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See the data foundation in Labs.',
        body: 'The Schema Editor, ODS, and Validators in Atheryon Labs are the data layer in action — 2,043 CDM types, 44 ISO 20022 messages, 14 FpML schemas.',
        screenshot: '/reality/labs-screenshot-data.png',
        screenshotAlt: 'Atheryon Labs schema editor and ODS surfaces',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Not sure where to start?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation focused on your data foundation.',
        cta: { label: 'Request a session', href: '/contact' },
      },
    },
    intelligence: {
      title: 'Intelligence — Atheryon',
      description: 'Decision advantage: analytics, AI implementation, forecasting, automation, insight products.',
      hero: {
        eyebrow: '02 · Intelligence',
        title: 'Intelligence',
        definition: 'Decision advantage: analytics, AI implementation, forecasting, automation, insight products.',
        positioning: 'Data alone does not improve decisions. We build the intelligence layer that turns trusted data into prediction, automation, and decision support.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most AI initiatives stall.',
        bullets: [
          'Models built on ungoverned data fail audits and lose stakeholder trust.',
          'Insight projects deliver dashboards, not decision change.',
          'Automation gets bolted on instead of designed into the operating model.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'Decision advantage from foundations you trust.',
        cards: [
          { title: 'AI Readiness', body: 'Assess data maturity, governance, and model lifecycle readiness before AI investment.' },
          { title: 'Analytics & ML', body: 'Production analytics dashboards, ML pipelines, and the data quality controls that make them trustworthy.' },
          { title: 'Insight Products', body: 'Decision surfaces — not dashboards. Built around the choices the business actually has to make.' },
          { title: 'AI-Augmented Decisioning', body: 'Workflow-level AI integration with human-in-the-loop controls and audit trails.' },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See the intelligence layer in Labs.',
        body: 'The Analytics Dashboard and ML Workbench in Atheryon Labs show the intelligence layer running on top of governed CDM data — including 11 AI-detected operational patterns.',
        screenshot: '/reality/labs-screenshot-intelligence.png',
        screenshotAlt: 'Atheryon Labs analytics dashboard and ML workbench',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Not sure where to start?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation focused on your intelligence layer.',
        cta: { label: 'Request a session', href: '/contact' },
      },
    },
    transformation: {
      title: 'Transformation — Atheryon',
      description: 'Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.',
      hero: {
        eyebrow: '03 · Transformation',
        title: 'Transformation',
        definition: 'Operating change: roadmaps, workflow redesign, adoption support, measurable outcomes.',
        positioning: 'Capability is not change. Transformation is the operating shift that connects new platforms and intelligence to measurable business outcomes — and to the people who must adopt them.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most transformations stall mid-program.',
        bullets: [
          'Roadmaps bought from a deck rarely survive contact with the operating model.',
          'New platforms ship without the workflow redesign that makes them load-bearing.',
          'Adoption is treated as comms instead of as workflow integration.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'From distressed program to delivered outcome.',
        cards: [
          { title: 'Recovery & Migration', body: 'Diagnose distressed programs, restructure delivery, migrate critical data and platforms safely.' },
          { title: 'M&A Execution', body: 'Day-1 readiness, Day-100 integration, divestiture carve-outs — the data and platform spine of M&A.' },
          { title: 'Capability Enablement', body: 'Build internal data, AI, and platform capability in the institutions we serve, not on top of them.' },
          { title: 'Engagement Shapes', body: '30-day diagnostic, prototype sprint, or full platform engagement — matched to the risk profile of the work.' },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See transformation in Labs.',
        body: 'The Trade Board, Operations, and lifecycle surfaces in Atheryon Labs are the operating change in action — break triage, confirmations, lifecycle management, and SSI on a unified CDM event model.',
        screenshot: '/reality/labs-screenshot-transformation.png',
        screenshotAlt: 'Atheryon Labs trade board and operations surfaces',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Not sure where to start?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'Book a Reality Architecture Session.',
        body: 'A 45-minute consultation focused on your transformation pathway.',
        cta: { label: 'Request a session', href: '/contact' },
      },
    },
  },

  footer: {
    description: 'Decision-grade data platforms for capital markets and institutional banking. Senior-led. Regulator-credible. Production-grade.',
    links: {
      services: [
        { label: 'How We Work', href: '/how-we-work' },
        { label: 'Recovery & Migration', href: '/recovery-migration' },
        { label: 'M&A Execution', href: '/m-and-a-execution' },
        { label: 'Capability Enablement', href: '/capability-enablement' },
        { label: 'CDM Platform', href: '/cdm-platform' },
      ],
      resources: [
        { label: 'Programs', href: '/programs' },
        { label: 'Reference Architectures', href: '/reference-architectures' },
        { label: 'AI-Ready Data', href: '/ai-ready-data' },
      ],
      company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    legal: {
      copyright: 'Atheryon. All rights reserved.',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  },
}

export type Site = typeof site
