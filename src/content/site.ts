export const site = {
  name: 'Atheryon',
  tagline: 'From AI potential to production reality.',
  email: 'info@atheryon.com.au',

  nav: [
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'What We Deliver', href: '/what-we-deliver' },
    { label: 'Recovery & Migration', href: '/recovery-migration' },
    { label: 'Reference Architectures', href: '/reference-architectures' },
    { label: 'AI-Ready Data', href: '/ai-ready-data' },
    { label: 'About', href: '/about' },
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
        headline: 'Struggling to deliver business outcomes and strategic data & AI initiatives?',
        subheadline: 'We help organisations turn strategic intent into delivered capability — stabilising cost, scope, timelines, and regulatory risk when large, complex programs stall.',
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

    whatWeDeliver: {
      title: 'What We Deliver | Atheryon',
      description: 'Production-grade capabilities and reusable data products for regulated enterprises.',
      hero: {
        headline: 'What we deliver',
        subheadline: 'Production capabilities and the data products that power them.',
      },
      outcomes: {
        badge: 'Business Outcomes',
        title: 'Outcomes we enable',
        items: [
          {
            title: 'Regulatory reporting readiness',
            description: 'Trusted data for timely, accurate regulatory submissions.',
          },
          {
            title: 'Risk & exposure aggregation',
            description: 'Consolidated views across positions, counterparties, and limits.',
          },
          {
            title: 'Trade lifecycle data foundations',
            description: 'Clean data from execution through settlement and reporting.',
          },
          {
            title: 'Data cost reduction',
            description: 'Rationalised pipelines, reduced duplication, governed reuse.',
          },
        ],
      },
      deliverables: {
        badge: 'Deliverables',
        title: 'What we always leave behind',
        items: [
          'Canonical model artefacts',
          'Validated datasets (bronze/silver/gold)',
          'Pipelines and transformation logic',
          'Governance hooks (ownership, lineage)',
          'AI-ready interfaces (query-ready, embeddings-ready)',
        ],
      },
      engagementShapes: {
        badge: 'Engagement Shapes',
        title: 'How we engage',
        items: [
          {
            title: 'Recovery sprint',
            duration: '2–4 weeks',
            description: 'Stabilise a stalled initiative. Clarify semantics. Extract usable data products.',
          },
          {
            title: 'Capability delivery',
            duration: '6–12 weeks',
            description: 'Deliver a specific business capability with underlying data products.',
          },
          {
            title: 'Foundation build',
            duration: 'Multi-quarter',
            description: 'Build enterprise data foundations that support multiple capabilities.',
          },
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
        { label: 'What We Deliver', href: '/what-we-deliver' },
        { label: 'Recovery & Migration', href: '/recovery-migration' },
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
