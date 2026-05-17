export const site = {
  name: 'Atheryon',
  email: 'info@atheryon.com.au',

  nav: [
    { label: 'System', href: '/system' },
    { label: 'Approach', href: '/approach' },
    { label: 'Engagements', href: '/engagements' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // site.pages.* holds data for the preserved routes (/labs/*, /programs/*).
  // The v2 IA (/, /system, /approach, /engagements, /workflows, /about,
  // /contact) renders from `v2` (declared further down). New copy goes in v2.
  pages: {
    // /contact form field labels. Metadata (title/description) and page
    // copy now come from v2.pages.contact.
    contact: {
      form: {
        fields: {
          name: { label: 'Name', placeholder: 'Your name', required: true },
          email: { label: 'Email', placeholder: 'your@email.com', required: true },
          company: { label: 'Company', placeholder: 'Your company', required: false },
          message: { label: 'What’s the problem?', placeholder: 'Describe the challenge you’re facing...', required: true },
        },
        submitLabel: 'Book system assessment',
      },
    },

    mibInsightThanks: {
      title: 'Welcome — MiB Insight Program',
      description: 'Thank you for joining the MiB Insight Program. Your welcome email is on the way.',
      headline: 'Welcome to the MiB Insight Program',
      message: 'Thank you for joining. You will receive a welcome email shortly with access details and a 15-minute Foundations module to get started. If anything is unclear, reply to that email — it goes straight to Terry.',
    },

    labs: {
      title: 'Atheryon Labs — Marketplace-bound banking platform',
      description: 'A working CDM-native banking reference platform, built by one capital-markets expert directing AI. Buy the code. License the prompts. Engage the builder.',
      hero: {
        headlineLine1: 'Atheryon Labs',
        headlineLine2: 'The banking platform built by AI.',
        body: 'Atheryon Labs is a marketplace-bound CDM-native banking platform — a working reference today, packaged for cloud marketplace distribution as it matures. Built by one capital-markets expert directing AI, it demonstrates how complex financial data can be modelled, linked, structured, and turned into usable banking software that institutions can license, deploy, and extend.',
        primaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
        tertiaryCta: { label: 'Request a confidential discussion', href: '/contact' },
      },
      whyCredible: {
        badge: 'Why this is credible',
        title: 'Atheryon is the integration partner for S&P TeraHelix.',
        paragraphs: [
          'Atheryon works in the same problem space that serious financial institutions are now prioritising: data modelling, linking, interoperability, and AI-ready enterprise data.',
          'S&P Global completed its acquisition of TeraHelix in June 2025 to strengthen advanced data modelling and linking capabilities. S&P described TeraHelix as helping solve complex enterprise-scale data challenges by structuring data models for interoperability across platforms, systems, and storage architectures.',
          'Atheryon Labs applies that same class of thinking to banking software: CDM-native data structures, expert-directed prompts, AI-assisted engineering, and practical platform surfaces across trading, operations, risk, treasury, compliance, and mortgages.',
          'The result: a working banking AI platform you can inspect, license, or learn how to build.',
        ],
      },
      offersPreview: {
        badge: 'Three ways to use this work',
        title: 'Code, prompts, advisory',
        items: [
          {
            title: 'Take the code.',
            oneLiner: 'The reference implementation as a case study or co-marketed proof point.',
            anchorHref: '#code',
          },
          {
            title: 'Take the prompts.',
            oneLiner: 'The directorial archive — packaged as a method asset for your tooling or vertical playbook.',
            anchorHref: '#prompts',
          },
          {
            title: 'Take the advisory.',
            oneLiner: 'Architecture and delivery advisory for AI labs operating in regulated finance.',
            anchorHref: '#advisory',
          },
        ],
      },
      evidence: {
        badge: 'At a glance',
        title: 'What was built, how fast',
        statsItems: [
          { value: '8', label: 'banking functions covered' },
          { value: '1', label: 'CDM data model — compliant with ISDA (International Swaps and Derivatives Association), end to end' },
          { value: '31', label: 'flagship surfaces shipped' },
          { value: 'Live', label: 'at atheryon.com.au' },
          { value: 'Weeks', label: 'vs. multi-year consultancy programmes' },
        ],
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
        caption: 'The bank as Terry has worked it. Each function maps to a domain shipped inside a tier-1 institution.',
        partners: [
          { name: 'Microsoft Partner' },
          { name: 'S&P Global Partner' },
        ],
        partnersCaption: 'Already inside the AI and financial-data ecosystem AI labs care about.',
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
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · vs. typical multi-year programmes for an equivalent scope.',
          },
          {
            number: '02',
            name: 'Risk Pricer + IRRBB',
            screenshot: '/labs/screenshots/risk-pricer.png',
            screenshotAlt: 'Atheryon Labs risk pricer and IRRBB surface',
            problem: 'Front-office and middle-office risk teams need pricing and risk views that are fast, correct, and inspectable. Most platforms separate the pricer from the risk view, then reconcile them downstream. The reconciliation is where errors live.',
            howItWorks: '/risk/pricer and /risk/irrbb call a typed atheryon-risk client over a shared CDM trade payload. Pricing and Greeks come from the same source; IRRBB views layer balance-sheet sensitivity on top. One model, one wire format, one source of truth for explain.',
            metric: 'CV anchor: Credit Suisse FOBO risk + Global P&L Attribution.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · vs. typical multi-year programmes for an equivalent scope.',
          },
          {
            number: '03',
            name: 'Schema Editor + CDM Intelligence',
            screenshot: '/labs/screenshots/schema-editor.png',
            screenshotAlt: 'Atheryon Labs schema editor and CDM intelligence surfaces',
            problem: 'The hardest part of any banking data platform is keeping the data model honest under change. Most platforms treat the schema as a database concern. The result is silent drift between the model the business agrees to and the model the system enforces.',
            howItWorks: '/build/schema-editor edits CDM types directly. /explore/graph walks instances of those types. Reg Submissions reverse-map regulator artefacts back to CDM, so the schema and the regulator are always in the same conversation.',
            metric: 'CV anchor: the data-modelling thesis — the Atheryon differentiator.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · vs. typical multi-year programmes for an equivalent scope.',
            sidebarVignette: {
              title: 'Schema modelling — extend vs wrap',
              aiProposed: 'The AI defaulted to extending CDM types whenever a bank-specific field was needed. Inheritance, by the textbook.',
              bankerCorrected: 'Colleagues who built Goldman SecDB taught the opposite: extend when the concept is genuinely a CDM concept with one more attribute; wrap when the concept is a bank-internal artefact that happens to reference CDM. The schema editor encodes both modes, and the rule for choosing.',
            },
          },
        ],
      },
      bankerWedge: {
        badge: 'Why banking judgment matters in AI direction',
        title: 'AI in regulated finance needs the rare expert in the loop',
        intro: 'AI labs competing with the global SIs in regulated verticals hit the same wall: plausible models, missing domain judgement. Atheryon Labs is the working artefact of an ontology-driven banking platform — semantics, lineage, validation, and access control modelled in from day one, then handed to AI as the operating ground. The two corrections below show why that loop matters.',
        photo: '/labs/terry-headshot.jpg',
        photoAlt: 'Terry Tsakiris',
        bio: "I’m Terry Tsakiris. At Credit Suisse I built the bank’s first near-real-time front-office risk system, then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates. At Commonwealth Bank I owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance. At Westpac Institutional Banking I rescued a distressed $84M data programme and stood up a Data Products capability that delivered ten times faster than the bank’s prior baseline — the same compression AI labs need to compete with the consultancies that defended that baseline. Atheryon is a Microsoft partner and S&P Global partner; the platform is the next iteration of that method, paired with AI.",
        vignettes: [
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
        ],
      },
      method: {
        badge: 'The 10× method',
        title: 'How a banker directs AI',
        principles: [
          {
            title: 'Built from banking controls, not user stories.',
            body: 'Where most AI demos start “as a user I want…”, this started with the regulatory artefact, the operational control, the risk view. Controls drive surfaces; surfaces do not drive controls.',
          },
          {
            title: 'Started from the product / event / data model, not the screen.',
            body: 'CDM-first, then surfaces. The data model is the contract. Every screen is a projection of it.',
          },
          {
            title: 'Generate variants, then narrow them.',
            body: 'Three implementation candidates per surface. AI generates them in minutes. Banking judgement rejects, corrects, and chooses.',
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
        economics: {
          heading: 'What this method displaces — and what it produces',
          body: 'A tier-1 systems integrator scopes a regulated-banking platform as a multi-year, eight-figure engagement — armies of analysts running discovery, change requests, and reconciliation cycles. The five rules above are the operating system that compresses that scope into weeks. The licensable asset has two halves: the directorial track (how a banker directs AI to produce shipped code) and the platform IP it produces (CDM connectors, regulatory schema mapping, banking surfaces) — designed for cloud marketplace distribution once the partner channel is in place.',
        },
        artifact: {
          heading: 'One real prompt, one real correction',
          promptShown: '{{TERRY_PROMPT_EXAMPLE_PROMPT}}',
          correctionShown: '{{TERRY_PROMPT_EXAMPLE_CORRECTION}}',
          prLink: '{{TERRY_PROMPT_EXAMPLE_PR_URL}}',
        },
        disclosure: "Atheryon Labs is currently built using Anthropic’s Claude. The method is model-agnostic by design — the durable artefact is how a banker directs AI, not which model is on the other side of the chat.",
      },
      engagement: {
        badge: 'Three ways to use what is here',
        title: 'Code, prompts, advisory',
        cards: [
          {
            id: 'code',
            number: '01',
            title: 'Buy the code.',
            body: 'License the Atheryon Labs platform code as a working banking reference implementation. Best for: data vendors, AI firms, banks, consultancies, cloud partners, and fintechs that need a credible vertical platform asset.',
            ctaLabel: 'Buy the code',
            ctaHref: '/offers/code',
            anchorId: 'code',
          },
          {
            id: 'prompts',
            number: '02',
            title: 'License the prompts.',
            body: 'License the prompt archive that directed the AI build. This includes the instructions, corrections, domain constraints, architecture decisions, and banking reasoning used to turn AI from a generic code generator into a useful regulated-finance build partner.',
            ctaLabel: 'License the prompts',
            ctaHref: '/offers/prompts',
            anchorId: 'prompts',
          },
          {
            id: 'advisory',
            number: '03',
            title: 'Engage the builder.',
            body: 'Work with Terry to apply the same method to your own data, product, platform, client opportunity, or S&P TeraHelix integration path. This is where integration-partner credibility matters most.',
            ctaLabel: 'Engage the builder',
            ctaHref: '/offers/consult',
            anchorId: 'advisory',
          },
        ],
      },
      closing: {
        badge: 'Available for select engagements',
        title: 'Atheryon partners with a small number of institutions per year.',
        body: 'If what you have just read maps to a problem on your desk — or to a deal you are pitching — the next step is a confidential conversation.',
        primaryCta: { label: 'Request a confidential discussion', href: '/contact' },
        tertiaryCta: { label: 'See it live', href: 'https://www.atheryon.com.au' },
      },
    },

    offers: {
      code: {
        title: 'Buy the code — Atheryon Labs',
        description: 'License the Atheryon Labs platform code as a working banking reference implementation.',
        hero: {
          eyebrow: '01 / Code',
          headline: 'Buy the Labs code.',
          lede: 'License the Atheryon Labs platform code as a working banking reference implementation — CDM-native, 8 banking functions, 31 surfaces, deployable.',
        },
        whatYouGet: {
          badge: 'What you get',
          title: 'A complete, CDM-native reference banking platform.',
          items: [
            'The full labs-platform monorepo as a licensable codebase — Trade Board, Operations, Risk Pricer, IRRBB, Schema Editor, CDM Intelligence, Reg Submissions, and more.',
            // Counts sourced from labs-platform: CDM types per `src/components/ods/DataModelsFoundation.tsx`
            // (CDM v7.0 = 1,019 types), ISO 20022 + FpML per `docs/requirements/REQ-schema-explorer-dynamic-data.md`
            // (working-set counts from the schema browser DB). Verifiable by clicking through to /explore/schema.
            'CDM-native data model — 1,019 CDM types, 42 ISO 20022 messages, 14 FpML schemas, end-to-end ISDA Common Domain Model alignment.',
            '31 flagship surfaces shipped across trading, post-trade, risk, treasury, compliance, and mortgages.',
            'Deployment notes: built on Azure-friendly stack (Next.js + Python services). Deployable into your estate.',
            'Source paired with the directorial track (see License the prompts for the matching prompt archive).',
          ],
        },
        bestFor: {
          badge: 'Best for',
          title: 'Buyers who already have a credible vertical platform need.',
          items: [
            'Data vendors and market-data firms building a banking-side platform asset',
            'AI firms with banking customers who need a vertical reference',
            'Banks needing a credible internal reference implementation to anchor a build',
            'Consultancies and SI partners scoping client platform engagements',
            'Cloud partners standing up vertical reference platforms',
            'Fintechs that need a credible production-grade banking platform to extend',
          ],
        },
        pricing: {
          badge: 'Pricing',
          title: 'Bespoke. Scoped to use case and rights.',
          body: 'Code licensing is priced per scope: which modules, what rights (read-only, deploy, modify, redistribute), what level of ongoing engineering support, and what level of S&P TeraHelix integration assistance you need. Send a short note about your context and we will come back with a tailored proposal.',
        },
        cta: {
          label: 'Talk to us about code licensing',
          href: '/contact?topic=labs-code',
        },
      },

      prompts: {
        title: 'License the prompts — Atheryon Labs',
        description: 'License the prompt archive that directed the AI build — the directorial track that makes the model ship.',
        hero: {
          eyebrow: '02 / Prompts',
          headline: 'License the prompts.',
          lede: 'License the prompt archive that directed the AI build — instructions, corrections, domain constraints, architecture decisions, and banking reasoning paired with the resulting code.',
        },
        whatYouGet: {
          badge: 'What you get',
          title: 'The directorial track, not a prompt library.',
          items: [
            'The complete prompt archive used to build the labs-platform — every prompt paired with the correction that turned plausible AI output into shipped banking code.',
            'Five worked corrections explained in detail: lifecycle events vs trade states, MiFID evidence chains, FOBO P&L taxonomy, CDM extend-vs-wrap, Sydney 5pm cutoff calendars.',
            'Architecture decisions and design constraints documented as prompts, not as slides.',
            "Each prompt paired with the banker's reasoning and the resulting code in the labs-platform repo, so the relationship between intent and output is explicit.",
            'Model-agnostic — the durable artefact is how a banker directs AI, not which model is on the other side of the chat.',
          ],
        },
        bestFor: {
          badge: 'Best for',
          title: 'Teams turning AI into a regulated-finance build partner.',
          items: [
            'AI teams at banks needing a working example of senior-domain-expertise directing frontier AI',
            'Research teams studying how AI ships regulated systems versus how AI ships demos',
            'Consultancies building practice methodology around AI-pair engineering',
            'Product teams scoping AI-assisted platform builds in regulated verticals',
          ],
        },
        pricing: {
          badge: 'Pricing',
          title: 'Bespoke. Scoped to rights and exclusivity.',
          body: 'Prompt licensing is priced per scope: read-only access, internal-use rights, derivative-work rights, or exclusivity in a vertical. Send a short note about your intended use and we will come back with a tailored proposal.',
        },
        frontOfficeBundle: {
          badge: 'Productized bundle',
          title: 'Front Office bundle',
          price: '$14,000 AUD',
          body: 'A pre-packaged curriculum + IP slice for Front Office trading workflows — five modules, sample data, schemas, design specs, reference architectures, example transcripts. Used within 30 days of purchase.',
          modules: [
            'Foundations',
            'Front Office: Trading',
            'Middle Office: Lifecycle & Risk',
            'Back Office: Books & Operations',
            'Compliance & Reporting',
          ],
          artifactTypes: [
            'Prompts pack (10–20 ready-to-use)',
            'Schemas (CDM-aware, JSON Schema, OpenAPI)',
            'Design specs (annotated diagrams, Figma exports)',
            'Reference architectures',
            'Example transcripts (recorded Claude/Cursor sessions)',
            'Sample data (synthetic + real)',
            'Walkthrough video',
          ],
          cta: { label: 'Request the bundle →', href: '/contact?topic=front-office-bundle' },
        },
        cta: {
          label: 'Talk to us about prompt licensing',
          href: '/contact?topic=labs-prompts',
        },
      },

      consult: {
        title: 'Engage the builder — Atheryon Labs',
        description: 'Engage Terry Tsakiris to apply the Atheryon method to your own data, platform, or S&P TeraHelix integration path.',
        hero: {
          eyebrow: '03 / Advisory',
          headline: 'Engage the builder.',
          lede: "Work with Terry Tsakiris to apply the same method to your own data, product, platform, client opportunity, or S&P TeraHelix integration path.",
        },
        whatYouGet: {
          badge: 'What you get',
          title: 'Engagement directed by the architect of Atheryon Labs.',
          items: [
            'Direct engagement with Terry Tsakiris (architect of the Labs platform) — no junior hand-offs.',
            'The Atheryon method applied to your specific problem — CDM-first modelling, controls-before-user-stories, AI-pair engineering.',
            'S&P TeraHelix integration paths where applicable — Atheryon is the integration partner for S&P TeraHelix.',
            'Engagement shapes: 30-day diagnostic, 6-12 week prototype sprint, or multi-quarter platform recovery / build.',
            'Capital markets delivery across live trading, market risk, credit risk, product control, payments, and regulatory reporting.',
          ],
        },
        bestFor: {
          badge: 'Best for',
          title: 'Programs where capital markets architecture judgment matters most.',
          items: [
            'Banks with a distressed platform programme that needs a credible recovery',
            'Buy-side and sell-side institutions needing a CDM-native reference for build or vendor selection',
            'S&P clients who want help operationalising their TeraHelix integration',
            'AI labs that need capital markets architecture direction on a regulated-vertical build',
            'Boards and CDOs scoping a multi-year platform programme who want architecture and delivery experience from day one',
          ],
        },
        pricing: {
          badge: 'Pricing',
          title: 'Bespoke. Engagement-shape and duration drive scope.',
          body: 'Advisory engagements are priced per shape and duration. A 30-day diagnostic is fixed-fee; sprint and platform engagements are scoped after the diagnostic. Send a short note about your context and we will come back with a tailored proposal.',
        },
        cta: {
          label: 'Talk to us about advisory engagement',
          href: '/contact?topic=labs-advisory',
        },
      },
    },

    themes: {
      title: 'Themes — Atheryon Labs',
      description: '26 themes · 111 pages across the Atheryon labs platform — the live discovery surface for ODS, front office, risk & analytics, operations, compliance, and treasury.',
      badge: 'Discovery',
      headline: 'Explore the labs surface',
      intro: 'A public preview of the Atheryon labs discovery surface — every theme and every sub-page that lives at labs.atheryon.ai, rendered here as a static map. Click any tile to open the live theme on the labs subdomain in a new tab. The lattice mirrors the operational shape of a tier-1 capital-markets bank: an Operational Data Store (schemas, validators, lifecycle, entity intelligence, ops and dev tools) plus five business-unit surfaces — Front Office, Risk & Analytics, Operations, Compliance, and Treasury / Finance.',
      countsLine: '26 themes · 111 pages · 6 surfaces (1 ODS data store + 5 business units)',
      businessDividerLabel: 'Business Units',
    },
  },

  footer: {
    links: {
      pillars: [
        { label: 'System', href: '/system' },
        { label: 'Workflows', href: '/workflows' },
      ],
      resources: [
        { label: 'Labs', href: '/labs' },
      ],
      company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    legal: {
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  },
}

export type Site = typeof site

// =============================================================================
// v2 — Atheryon Manifest (canonical content, 2026-05-15)
// =============================================================================
// Source of truth for the 7-route IA. Renders verbatim into pages. Do not
// simplify or expand. See memory/atheryon_website_constitution.md for the
// hard rules governing this content.
//
// Identity: Atheryon designs and delivers production-grade capital markets
// systems and data platforms using AI agents.
// =============================================================================

export const v2 = {
  identity:
    'Atheryon designs and delivers production-grade capital markets systems and data platforms using AI agents.',

  audience: {
    headline: 'Built for enterprise buyers and AI agents.',
    note: 'Architecture clarity > marketing copy.',
  },

  // Core Domains
  domains: [
    {
      id: 'capital-markets-systems',
      name: 'Capital Markets Systems',
      qualifier: 'front-to-back',
    },
    {
      id: 'data-platforms',
      name: 'Data Platforms',
      qualifier: '',
    },
    {
      id: 'ai-agent-systems',
      name: 'AI Agent Systems',
      qualifier: '',
    },
  ] as const,

  // Engagement Model (4 tiers, increasing execution responsibility)
  // Bodies are verbatim from user spec 2026-05-15. No overlap between tiers.
  engagement: [
    {
      id: 'advisory',
      name: 'Advisory',
      body: 'System strategy and capital markets AI architecture design.',
    },
    {
      id: 'enablement',
      name: 'Enablement',
      body: 'Reference architectures, AI agent workflows, and implementation components.',
    },
    {
      id: 'delivery',
      name: 'Delivery',
      body: 'End-to-end production system design and deployment in client environments.',
    },
    {
      id: 'licensed-system',
      name: 'Licensed System',
      body: 'Reusable reference system architecture for enterprise deployment.',
    },
  ] as const,

  // Ecosystem
  ecosystem: [
    {
      id: 'azure',
      name: 'Microsoft Azure AI infrastructure',
    },
    {
      id: 's-and-p-global',
      name: 'S&P Global data integration',
    },
    {
      id: 'lineage',
      name: 'Banking experience',
      detail:
        'Goldman Sachs, Credit Suisse, Barclays Capital — as architectural lineage, not claims of employment or system ownership.',
    },
  ] as const,

  // Page intents (verbatim from user spec). Pages render these as the
  // primary content slot. No invented prose.
  pages: {
    home: {
      route: '/',
      title: 'Atheryon — Capital Markets AI Systems',
      intent: 'Home',
      description:
        'Atheryon designs and delivers production-grade capital markets AI systems using AI agents. Front-to-back systems and data platforms.',
      // Section structure (user-locked 2026-05-15). Do not reorder. Do not add sections.
      // Bodies marked {{PENDING_*}} are intentional placeholders — the user
      // gave directives, not literal prose. Components hide containers with
      // {{PENDING_*}} content until the user provides the copy.
      sections: {
        hero: {
          // Verbatim from user spec.
          headline:
            'Atheryon designs and delivers production-grade capital markets AI systems using AI agents.',
          subhead: 'Includes front-to-back systems and data platforms.',
        },
        transformation: {
          badge: 'Transformation',
          // Directive transcribed verbatim as title; body awaits user prose.
          title:
            'From decades-long banking system build cycles to ~18 months using AI agents.',
          body: '{{PENDING_TRANSFORMATION_BODY}}',
        },
        capabilityOverview: {
          badge: 'Capability Overview',
          title: '',
          cards: [
            { name: 'Capital Markets Systems', qualifier: 'front-to-back', href: '/system' },
            { name: 'Data Platforms', qualifier: '', href: '/system' },
            { name: 'AI Agent Systems', qualifier: '', href: '/workflows' },
          ],
        },
        proofSystem: {
          badge: 'Proof',
          // Directive transcribed verbatim as title; body awaits user prose.
          title: 'A working end-to-end capital markets AI reference system.',
          body: '{{PENDING_PROOFSYSTEM_BODY}}',
          cta: { label: 'Explore the reference architecture', href: '/system' },
        },
        engagementModelPreview: {
          badge: 'Engagement Model',
          // Verbatim from user spec.
          title: 'Advisory · Enablement · Delivery · Licensed System.',
          fullLink: { label: 'See full engagement model', href: '/engagements' },
        },
        ecosystemStack: {
          badge: 'Ecosystem',
          // Verbatim from user spec.
          title: 'Microsoft Azure AI infrastructure + S&P Global integration.',
          items: [
            { name: 'Microsoft Azure AI infrastructure' },
            { name: 'S&P Global data integration' },
          ],
        },
        cta: {
          // Verbatim from user spec.
          primary: { label: 'Book System Assessment', href: '/contact' },
          secondary: { label: 'Explore Architecture', href: '/system' },
        },
      },
      v3: {
        hero: {
          eyebrow: 'Capital Markets AI Systems',
          headlineLeading: 'Designing and delivering capital markets AI systems using',
          headlineAccent: 'AI agents.',
          lede:
            'Atheryon builds production-grade, front-to-back systems and data platforms that transform how financial institutions operate.',
          primaryCta: { label: 'EXPLORE THE SYSTEM ARCHITECTURE', href: '/system' },
          secondaryCta: { label: 'BOOK SYSTEM ASSESSMENT', href: '/contact' },
        },
        builtFor: {
          headline: 'Built for the complexity of capital markets',
        },
        strip: {
          experience: {
            label: 'Proven Capital Markets Experience',
            body:
              'Deep experience building large-scale capital markets systems at leading global institutions.',
          },
          ecosystem: { label: 'Ecosystem Partners' },
          engagement: { label: 'Engagement Model' },
        },
        cta: {
          title: 'A Reference System. Proven Architecture.',
          body:
            'Our end-to-end capital markets AI reference system demonstrates how AI agents, data and workflows come together in production.',
          link: { label: 'SEE THE SYSTEM ARCHITECTURE', href: '/system' },
        },
      },
    },
    system: {
      route: '/system',
      title: 'System — Reference Architecture',
      intent: 'Reference architecture (core proof)',
      description:
        'Reference architecture: capital markets systems, data platforms, AI agent systems — built on Microsoft Azure AI infrastructure with S&P Global data integration.',
      // Section structure (user-locked 2026-05-15). Do not reorder. Do not add sections.
      // Must feel like a system architecture interface. No marketing language, no storytelling tone.
      sections: {
        hero: {
          label: 'atheryon / system / reference-architecture',
          title: 'System',
          body: 'Reference architecture (core proof).',
        },
        architectureDiagram: {
          label: '§01 / Architecture',
          title: 'Architecture diagram',
          stages: [
            {
              id: 'data-sources',
              name: 'Data Sources',
              detail: 'S&P Global + enterprise bank systems',
            },
            {
              id: 'data-platform-layer',
              name: 'Data Platform Layer',
              detail: 'Bespoke capital-markets data model · industry-anchored · field-level lineage',
            },
            {
              id: 'ai-agent-orchestration-layer',
              name: 'AI Agent Orchestration Layer',
              detail: 'Multi-agent orchestrator · CDM-typed payloads · directorial archive',
            },
            {
              id: 'capital-markets-systems-layer',
              name: 'Capital Markets Systems Layer',
              detail: 'trade lifecycle · regulatory reporting · risk · analytics',
            },
            {
              id: 'operational-outputs',
              name: 'Operational Outputs',
              detail: 'risk, trading, reporting',
            },
          ],
        },
        dataFlowLayer: {
          label: '§02 / Data Flow Layer',
          title: 'Data Flow Layer',
          body:
            'A bespoke capital-markets data model, industry-anchored (ISDA, ISO 20022, FpML conventions) and shaped by 20+ years of front-to-back banking experience. 1,019 type definitions, 42 ISO 20022 message types, and 14 FpML schemas — all parseable, queryable, and validatable at runtime. Source feeds from S&P Global, internal ledgers, and counterparty channels are mapped to typed payloads on ingest, with field-level lineage tracked from origin through every transformation. The Schema Editor (extend / wrap patterns) lets domain experts model real bank-specific extensions on top of the canonical core without forking.',
        },
        aiAgentLayer: {
          label: '§03 / AI Agent Layer',
          title: 'AI Agent Layer',
          body:
            'A multi-agent orchestrator routes work to function-specialised agents (trading, post-trade, risk, compliance, analytics). Azure OpenAI is the inference runtime; the orchestrator owns routing, payload typing, retry, and audit. Each agent generates candidate implementations against the loaded schemas; a senior capital-markets expert selects, edits, and signs off. Every prompt, context, correction, and resulting code change is captured to the directorial archive — every agent decision is replayable and auditable.',
        },
        workflowExamples: {
          label: '§04 / Workflow Examples',
          title: 'Workflow examples',
          items: [
            {
              id: 'trade-lifecycle-automation',
              name: 'Trade lifecycle automation',
              body:
                'Match firm-vs-counterparty confirmations on economic terms; surface exceptions with field-level diffs. Electronic confirmation via MarkitWire and DTCC CTM; affirmation T+0, confirmation T+1/T+2. Aging analysis with SLA breach alerts.',
              href: '/workflows#trade-lifecycle-automation',
            },
            {
              id: 'risk-reporting-generation',
              name: 'Risk reporting generation',
              body:
                'Score each trade against per-regime field-completeness rules (EMIR Refit, MiFID II, ASIC, CFTC 43/45, SFTR, Dodd-Frank — six regulatory regimes). Generate the report payload in the regime’s prescribed format. Scheduled daily/T+1 runs into the submission queue with one-click trade-repository submission.',
              href: '/workflows#risk-reporting-generation',
            },
            {
              id: 'portfolio-analytics-pipeline',
              name: 'Portfolio analytics pipeline',
              body:
                'Aggregate live positions; attribute P&L; detect anomalies in trade quality and counterparty data. KPI tiles, trend charts (7d / 30d / 90d), and anomaly feed with severity and recommended action. Drill-down into anomaly detection, data quality, and pattern mining.',
              href: '/workflows#portfolio-analytics-pipeline',
            },
            {
              id: 'financial-data-ingestion-and-structuring',
              name: 'Financial data ingestion workflow',
              body:
                'Map source fields (S&P Global, internal ledgers, counterparty feeds) to ISDA CDM types. Validate against CDM, ISO 20022, and FpML schemas. Per-counterparty data-quality scoring with longitudinal trend; field-level lineage from origin to operational data store.',
              href: '/workflows#financial-data-ingestion-and-structuring',
            },
          ],
        },
        deploymentModel: {
          label: '§05 / Deployment Model',
          title: 'Deployment model',
          body:
            'Azure-native. Azure OpenAI as the agent runtime, Postgres for the operational data store, Container Apps for the service mesh, Microsoft Entra ID for identity. APRA CPS 234-aligned operational-controls baseline. Marketplace-bound reference implementation: deployable into your Azure tenant, licensed as a reference platform, or operated under managed-service terms. Fully inspectable, extendable, and externally testable today — no demoware.',
        },
        proofArtifacts: {
          label: '§06 / Proof Artifacts',
          title: 'Proof artifacts',
          // Directive transcribed verbatim; body awaits user prose.
          directive:
            'Reference system described as a working architecture (not screenshots or UI gallery).',
          body:
            'The reference system runs at labs.atheryon.ai. 26 themes across 111 pages span six operational surfaces: the Operational Data Store (schemas, validators, lineage, entity intelligence) plus five business units (Front Office, Risk & Analytics, Operations, Compliance, Treasury / Finance). Every surface is reachable, browsable, and verifiable — a working architecture, not a screenshot gallery. A detailed reference-architecture briefing — covering core services, agent clusters, deployment topology, and operational evidence — is available under MNDA.',
        },
      },
    },
    approach: {
      route: '/approach',
      title: 'Approach — How Atheryon Builds Systems',
      intent: 'How Atheryon builds systems',
      description:
        'How Atheryon designs and delivers production-grade capital markets systems using AI agents.',
    },
    engagements: {
      route: '/engagements',
      title: 'Engagements — Advisory · Enablement · Delivery · Licensed System',
      intent: 'Advisory / Enablement / Delivery / Licensed System',
      description:
        'Four engagement models: Advisory, Enablement, Delivery, Licensed System.',
    },
    workflows: {
      route: '/workflows',
      title: 'Workflows — AI Capital Markets Workflows',
      intent: 'AI agents applied to capital markets workflows.',
      description:
        'AI agent systems applied to front-to-back capital markets workflows. Each workflow follows a deterministic pipeline: Input → AI agents → Processing → Output.',
      // Section structure (user-locked 2026-05-15). Deterministic and structured.
      // No marketing language. No vague AI descriptions.
      sections: {
        hero: {
          label: 'atheryon / workflows / capital-markets',
          title: 'Workflows',
          body: 'AI agents applied to capital markets workflows.',
        },
        schema: {
          label: '§00 / Pipeline Schema',
          title: 'Pipeline schema',
          stages: ['Input', 'AI agents', 'Processing', 'Output'] as const,
          note: 'All workflows follow this deterministic pipeline.',
        },
        items: [
          {
            id: 'trade-lifecycle-automation',
            label: '§01',
            name: 'Trade lifecycle automation',
            input:
              'Trade execution events, counterparty confirmations, lifecycle messages (FpML, MarkitWire, DTCC CTM).',
            agents:
              'Match firm-vs-counterparty confirmations on economic terms; triage exceptions; surface aging breaches.',
            processing:
              'Affirmation (T+0) → confirmation (T+1/T+2) → exception queue → resolution.',
            output:
              'Confirmed trade book with audit chain; aged exception list with field-level diffs.',
          },
          {
            id: 'risk-reporting-generation',
            label: '§02',
            name: 'Risk reporting generation',
            input:
              'Trade events under EMIR Refit, MiFID II, ASIC, and CFTC reporting regimes.',
            agents:
              'Score each trade against per-regime field-completeness rules; generate the report payload in the regime’s prescribed format.',
            processing:
              'Per-regime ruleset → field validation → numeric compliance score → report generation → submission queue.',
            output:
              'Submission-ready reports + per-trade compliance scores + remediation list.',
          },
          {
            id: 'portfolio-analytics-pipeline',
            label: '§03',
            name: 'Portfolio analytics pipeline',
            input:
              'Live trade positions, market data, counterparty feeds.',
            agents:
              'Aggregate exposures, attribute P&L, detect anomalies in trade quality and counterparty data.',
            processing:
              'Position roll-up → scenario application → anomaly detection → KPI tile generation.',
            output:
              'Real-time dashboards with drill-down; trend charts; anomaly feed; aggregate compliance posture.',
          },
          {
            id: 'financial-data-ingestion-and-structuring',
            label: '§04',
            name: 'Financial data ingestion and structuring',
            input:
              'Raw market data, internal ledger extracts, counterparty feeds, unstructured documents.',
            agents:
              'Map source fields to CDM types; validate against ISDA CDM, ISO 20022, and FpML schemas; flag schema drift.',
            processing:
              'Source field → CDM-typed payload → validator → operational data store.',
            output:
              'CDM-typed trade dataset with lineage; validation report; field-level data quality scoring.',
          },
          {
            id: 'research-summarisation-workflow',
            label: '§05',
            name: 'Research summarisation workflow',
            input:
              'Trade dataset, analytics outputs, anomaly events, weekly performance data.',
            agents:
              'Generate natural-language summaries; surface predictive insights (settlement-failure risk, trade quality classification); explain model decisions.',
            processing:
              'Statistical roll-up → ML scoring → NL synthesis → explainability artifacts.',
            output:
              'Plain-English weekly summary + per-prediction explanations + risk-prioritised action list.',
          },
        ],
      },
    },
    about: {
      route: '/about',
      title: 'About — Atheryon',
      intent: 'Capital markets AI systems firm.',
      description:
        'Atheryon is a capital markets AI systems firm. Banking lineage: Goldman Sachs, Credit Suisse, Barclays Capital — as experience environments, not claims of employment or system ownership.',
      // Section structure (user-locked 2026-05-15). Do not reorder. Do not add sections.
      // Tone: institutional, not narrative or personal. Do not imply ownership of banking systems.
      sections: {
        whatAtheryonIs: {
          label: '§01 / Identity',
          title: 'What Atheryon is',
          descriptor: 'Capital markets AI systems firm.',
          // Body renders v2.identity verbatim.
        },
        bankingLineage: {
          label: '§02 / Banking Lineage',
          title: 'Banking lineage',
          framing:
            'Goldman Sachs, Credit Suisse, Barclays Capital — as experience environments.',
          // Explicit disclaimer enforcing rule: do not imply ownership.
          disclaimer:
            'Not claims of employment or system ownership.',
          institutions: ['Goldman Sachs', 'Credit Suisse', 'Barclays Capital'],
        },
        systemPhilosophy: {
          label: '§03 / System Philosophy',
          title: 'System philosophy',
          // Verbatim from user spec.
          formula: 'AI agents + capital markets infrastructure.',
          body: '{{PENDING_ABOUT_SYSTEM_PHILOSOPHY_BODY}}',
        },
        whyNow: {
          label: '§04 / Why Now',
          title: 'Why now',
          // Verbatim from user spec.
          descriptor: 'AI compressing system delivery cycles.',
          body: '{{PENDING_ABOUT_WHY_NOW_BODY}}',
        },
      },
    },
    contact: {
      route: '/contact',
      title: 'Contact — Book System Assessment',
      intent: 'Book system assessment',
      description: 'Book a system assessment with Atheryon.',
      cta: 'Book system assessment',
    },
  },

  cta: {
    label: 'Book system assessment',
    href: '/contact',
  },
} as const

// =============================================================================
// v2Mortgages — Mortgages practice stub (2026-05-17)
// =============================================================================
// Mortgages = retail mortgage origination automation. NOT CDM-native — see
// the practice-toggle plan addendum. The capability narrative is "same
// AI-velocity, different vertical." Status: BUILDING (stub only).
// =============================================================================

export const v2Mortgages = {
  home: {
    route: '/mortgages',
    title: 'Mortgages — Atheryon',
    intent: 'Retail mortgage origination automation.',
    description:
      'The same AI-velocity that runs our CDM-native capital markets work also runs retail mortgage origination automation — same capability, different vertical.',
    status: 'building' as const,
    sections: {
      hero: {
        label: 'atheryon / mortgages / practice-overview',
        title: 'Mortgages',
        body: 'Retail mortgage origination automation.',
      },
      thesis: {
        label: '§01 / Thesis',
        title: 'Same AI-velocity, different vertical',
        body:
          'The same AI-velocity that runs our CDM-native capital markets work also runs retail mortgage origination automation. Senior capital-markets architects directing AI agents that do the build, delivering in weeks what traditionally takes 6–18 months. The capability transfers; the vertical changes. Capital markets uses ISDA CDM as the canonical data model; mortgages uses LIXI (AU) and MISMO (US/intl) — different schemas, same architectural pattern: a typed data plane, an agent orchestration layer, and deterministic pipelines from ingest to operational output.',
      },
      scope: {
        label: '§02 / Scope',
        title: 'Where the capability applies',
        items: [
          {
            id: 'origination',
            name: 'Origination',
            body: 'Application intake, document classification, income/expense extraction, eligibility scoring, conditional-approval pipelines.',
          },
          {
            id: 'servicing',
            name: 'Servicing',
            body: 'Lifecycle events, hardship workflows, arrears triage, variation processing, customer-facing decisioning.',
          },
          {
            id: 'risk-reporting',
            name: 'Risk & reporting',
            body: 'Portfolio analytics, regulatory reporting (APRA ARS 220, RBA CLF/SCV), stress testing, climate-risk overlay.',
          },
        ],
      },
      status: {
        label: '§03 / Status',
        title: 'BUILDING',
        body:
          'Practice stub is live. Reference architecture, agent topology, and pricing in active development. First engagement window: 2026 H2.',
      },
      cta: {
        label: 'Talk about a mortgages engagement',
        href: '/contact?topic=mortgages',
      },
    },
  },
  roadmap: {
    // Aggregated by /roadmap. Single item for the stub state.
    id: 'mortgages-practice',
    name: 'Mortgages practice',
    status: 'building' as const,
    blurb: 'Retail mortgage origination automation — full mode launches after Phase 2 stub.',
    href: '/mortgages',
  },
} as const

export type V2Mortgages = typeof v2Mortgages

export type V2 = typeof v2
