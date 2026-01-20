export const site = {
  name: 'Atheryon',
  tagline: 'From AI potential to production reality.',
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
    label: 'Discuss a real delivery problem',
    href: '/contact',
  },

  // Core copy blocks from spec
  copy: {
    headline: 'From AI potential to production reality.',
    subheadline: 'Atheryon helps regulated enterprises escape AI POC purgatory by delivering production-grade capabilities built on reusable data products.',
    philosophy: 'Human and AI working hand in hand to turn potential into production reality.',
    proofFraming: 'We are often engaged when data initiatives have consumed significant investment but failed to produce trusted, reusable outputs. Our work focuses on stabilising delivery, clarifying semantics, and leaving behind governed data products that compound over time.',
    migrationFraming: 'We treat migration as a modelling and validation problem, not a transport problem. The goal is to preserve meaning, reduce downstream rewrites, and create reusable assets.',
  },

  pages: {
    home: {
      title: 'Atheryon | From AI Potential to Production Reality',
      description: 'Atheryon helps regulated enterprises escape AI POC purgatory by delivering production-grade capabilities built on reusable data products.',
      hero: {
        headline: 'From stalled strategy to delivery',
        subheadline: 'We specialise in recovering complex data, AI, and regulatory initiatives under cost, timeline, and regulatory pressure.',
        primaryCta: { label: 'Discuss your delivery challenge', href: '/contact' },
        secondaryCta: { label: 'How we deliver capability', href: '/how-we-work' },
      },
      whoWeAreFor: {
        badge: 'Who We Work With',
        title: 'Built for regulated enterprises',
        forClients: [
          'Banks and investment banks',
          'Asset managers',
          'Market infrastructure providers',
          'Regulators and central agencies',
        ],
        notForClients: [
          'Startups wanting demos',
          'Tool-first pilots',
          'UI-only AI work',
        ],
      },
      problemsWeSolve: {
        badge: 'Problems We Solve',
        title: 'The challenges we address',
        cards: [
          {
            title: 'AI POC purgatory',
            description: 'Pilots that never reach production. Proofs of concept that prove nothing.',
          },
          {
            title: 'Untrusted platforms',
            description: 'Data exists but nobody uses it. Platforms are built but outputs are not trusted.',
          },
          {
            title: 'Expensive change',
            description: 'Every change is a rewrite. No reuse, no leverage, no compounding value.',
          },
          {
            title: 'Migration meaning loss',
            description: 'Moving rows but losing semantics. Transport without understanding.',
          },
        ],
      },
      whatWeDo: {
        badge: 'What We Do',
        title: 'Two things, done well',
        columns: [
          {
            title: 'Business capabilities delivered in production',
            description: 'Not demos. Not proofs of concept. Real capabilities that operate in production, under governance, at scale.',
          },
          {
            title: 'Reusable data products built underneath',
            description: 'Canonical models, validated pipelines, governed datasets. Assets that compound and reduce the cost of future change.',
          },
        ],
      },
      howWeWorkTeaser: {
        badge: 'Our Method',
        title: 'How we work',
        steps: [
          'Frame problem & constraints',
          'Model alignment (canonical semantics)',
          'Extract/ingest + validate',
          'Deliver production capability',
          'Abstract into reusable data products',
        ],
        link: { label: 'Learn more about our method', href: '/how-we-work' },
      },
      credibility: {
        badge: 'Our Track Record',
        title: 'Credibility without logos',
        quote: 'We are often engaged when data initiatives have consumed significant investment but failed to produce trusted, reusable outputs. Our work focuses on stabilising delivery, clarifying semantics, and leaving behind governed data products that compound over time.',
        bullets: [
          'Recovering stalled programs',
          'Extracting data products from complex platforms',
          'Model-led migration that preserves meaning',
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
            description: 'Recover stalled initiatives and execute model-led migrations that preserve meaning.',
            href: '/recovery-migration',
          },
          {
            title: 'M&A Execution',
            description: 'Execute complex separations and integrations without value leakage.',
            href: '/m-and-a-execution',
          },
          {
            title: 'Capability Enablement',
            description: 'Turn delivered platforms into durable business capability with embedded governance.',
            href: '/capability-enablement',
          },
        ],
      },
      finalCta: {
        text: 'If you have a stalled initiative or a migration with unclear semantics, we should talk.',
        cta: { label: 'Discuss a real delivery problem', href: '/contact' },
      },
    },

    howWeWork: {
      title: 'How We Work | Atheryon',
      description: 'Our five-step method for delivering production-grade capabilities built on reusable data products.',
      hero: {
        headline: 'How we work',
        subheadline: 'Human and AI working hand in hand to turn potential into production reality.',
      },
      steps: [
        {
          number: 1,
          title: 'Frame problem & constraints',
          description: 'Understand the business outcome required, the constraints (regulatory, technical, organisational), and the definition of done.',
        },
        {
          number: 2,
          title: 'Model alignment',
          description: 'Establish canonical semantics. Map existing data to a shared model. Clarify what terms mean and where data originates.',
        },
        {
          number: 3,
          title: 'Extract/ingest + validate',
          description: 'Build pipelines that extract, transform, and validate data. Apply rules at ingestion. Reject bad data early.',
        },
        {
          number: 4,
          title: 'Deliver production capability',
          description: 'Ship the business capability. Regulatory reporting, risk aggregation, trade lifecycle support—whatever the outcome requires.',
        },
        {
          number: 5,
          title: 'Abstract into reusable data products',
          description: 'Extract and package the underlying data assets. Document, govern, and make available for future capabilities.',
        },
      ],
      whatDoneLooksLike: {
        title: 'What done looks like',
        items: [
          'Schema documented and versioned',
          'Validation rules explicit and enforced',
          'Ownership and lineage clear',
          'Consumption patterns defined and controlled',
        ],
      },
      whyItReducesCost: {
        title: 'Why it reduces cost of change',
        items: [
          'Reuse by design—new capabilities build on existing assets',
          'Fewer rewrites—stable semantics mean stable interfaces',
          'Governed evolution—changes are controlled, not chaotic',
        ],
      },
    },

    recoveryMigration: {
      title: 'Recovery & Migration | Atheryon',
      description: 'We recover stalled data initiatives and execute model-led migrations that preserve meaning.',
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
      description: 'Turn delivered platforms into durable business capability with embedded ownership, governance, and operating models.',
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
      description: 'Separation and integration delivery without value leakage.',
      hero: {
        headline: 'M&A Execution',
        subheadline: 'Separation and integration delivery without value leakage.',
      },
      intro: {
        text: 'M&A success is determined after the deal is signed.\n\nWe support organisations through separation and integration execution where timelines are fixed, operational risk is high, and regulatory obligations must continue uninterrupted. We preserve meaning in data and processes while enabling Day-1 readiness and clean transition to the target operating model.',
      },
      whenClientsCallUs: {
        badge: 'When Clients Call Us',
        title: 'Triggers for engagement',
        items: [
          'Acquisition, divestment, or carve-out with fixed regulatory or market deadlines',
          'Data and platforms must be separated or integrated without disrupting operations',
          'TSA scope, duration, or cost is escalating',
          'Day-1 readiness is unclear or under-resourced',
          'High risk of value leakage post-sign (customers, controls, data, reporting)',
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
      description: 'Creating the conditions for AI to work in regulated enterprises.',
      hero: {
        headline: 'AI-ready data',
        subheadline: 'AI fails when data fails. We fix the data.',
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
      description: 'An AI-native, delivery-led consultancy bridging potential and production.',
      hero: {
        headline: 'About Atheryon',
        subheadline: 'AI-native. Delivery-led.',
      },
      whatWeAre: {
        title: 'What Atheryon is',
        description: 'An AI-native, delivery-led consultancy. We combine deep enterprise experience with modern delivery practices to help regulated organisations turn AI potential into production reality.',
      },
      whyWeExist: {
        title: 'Why Atheryon exists',
        description: 'Too many organisations are stuck between AI potential and production reality. Pilots succeed but never scale. Platforms are built but data remains untrusted. Migrations move data but lose meaning. We exist to bridge that gap.',
      },
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
      description: 'Discuss a real delivery problem with Atheryon.',
      hero: {
        headline: 'Let\'s talk',
        subheadline: 'Discuss a real delivery problem.',
      },
      form: {
        fields: {
          name: { label: 'Name', placeholder: 'Your name', required: true },
          email: { label: 'Email', placeholder: 'your@email.com', required: true },
          company: { label: 'Company', placeholder: 'Your company', required: false },
          message: { label: 'What\'s the problem?', placeholder: 'Describe the challenge you\'re facing...', required: true },
        },
        submitLabel: 'Send message',
      },
      whatToInclude: {
        title: 'What to include',
        items: [
          'Current state—what exists today',
          'Constraints—security, regulatory, technical',
          'Timeline—any deadlines or drivers',
        ],
      },
      alternative: {
        text: 'Prefer email?',
        email: 'info@atheryon.com.au',
      },
    },
  },

  footer: {
    description: 'Atheryon helps regulated enterprises escape AI POC purgatory by delivering production-grade capabilities built on reusable data products.',
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
