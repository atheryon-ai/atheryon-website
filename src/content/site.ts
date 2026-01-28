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
        subheadline: 'We build data platforms for capital markets and institutional banking — where data must be trusted, governance is non-negotiable, and business risk is real. Strategy. Architecture. Delivery. Senior practitioners, end to end.',
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
        { label: 'Reference Architectures', href: '/reference-architectures' },
        { label: 'AI-Ready Data', href: '/ai-ready-data' },
      ],
      company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    legal: {
      copyright: '2025 Atheryon. All rights reserved.',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  },
}

export type Site = typeof site
