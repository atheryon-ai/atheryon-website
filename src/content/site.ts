import { metrics } from './metrics'

export const site = {
  name: 'Atheryon',
  email: 'info@atheryon.com.au',

  nav: [
    { label: 'System', href: '/system' },
    { label: 'Themes', href: '/themes' },
    { label: 'Offers', href: '/offers' },
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
        body: 'Atheryon Labs is a CDM-native banking platform: a working reference today, packaged for cloud marketplace distribution as it matures. One capital-markets expert directed AI to build it, and the platform itself is the evidence that complex financial data can be modelled, linked, and turned into banking software institutions can license, deploy, and extend.',
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
          'What that produces is a working banking AI platform you can inspect, license, or learn how to build.',
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
          { value: String(metrics.bankingFunctions), label: 'banking functions covered' },
          { value: '1', label: 'CDM data model — compliant with ISDA (International Swaps and Derivatives Association), end to end' },
          { value: String(metrics.flagshipSurfaces), label: 'flagship surfaces shipped' },
          { value: 'Live', label: 'at labs.atheryon.ai' },
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
          { name: 'Powered by Claude (Anthropic)' },
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
            problem: 'End-of-day in a capital markets operations team means breaks to reconcile, confirmations to chase, and lifecycle events to process before a regulatory deadline. Platforms that treat this as workflow tooling reconcile the paperwork and miss the underlying CDM event.',
            howItWorks: 'The /ops board is built directly on the CDM event model. Every break, confirmation, and lifecycle action is an event with a typed payload, so when an operator triages a break or runs a lifecycle action, the event stream is the audit trail. There is no separate log to reconcile against.',
            metric: 'Same problem class I owned on CBA Markets ODS: Reg Trade Reporting, MiFID II, Surveillance.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · vs. typical multi-year programmes for an equivalent scope.',
          },
          {
            number: '02',
            name: 'Risk Pricer + IRRBB',
            screenshot: '/labs/screenshots/risk-pricer.png',
            screenshotAlt: 'Atheryon Labs risk pricer and IRRBB surface',
            problem: 'When the pricer and the risk view are separate systems, someone downstream reconciles them, and that reconciliation is where the errors live. Anyone who has run a FOBO break process knows the pattern: two numbers, both defensible, neither explainable.',
            howItWorks: '/risk/pricer and /risk/irrbb call the same typed atheryon-risk client over a shared CDM trade payload. Pricing and Greeks come from a single source, and the IRRBB views layer balance-sheet sensitivity on top of it. When a number needs explaining, there is exactly one place to look.',
            metric: 'I ran this reconciliation at Credit Suisse: FOBO risk and Global P&L Attribution.',
            footer: 'Built in {{WEEKS}} weeks · {{PRS}} PRs · vs. typical multi-year programmes for an equivalent scope.',
          },
          {
            number: '03',
            name: 'Schema Editor + CDM Intelligence',
            screenshot: '/labs/screenshots/schema-editor.png',
            screenshotAlt: 'Atheryon Labs schema editor and CDM intelligence surfaces',
            problem: 'Every banking data platform drifts. The model the business signs off and the model the system enforces start identical, then diverge one change request at a time, silently, because the schema lives in a database migration nobody reads. Keeping the two honest under change is the hardest problem in the stack.',
            howItWorks: '/build/schema-editor edits CDM types directly, and /explore/graph walks live instances of those types. Reg Submissions reverse-map regulator artefacts back to CDM, which keeps the schema and the regulator in the same conversation instead of six months apart.',
            metric: 'The schema discipline here comes from colleagues who built Goldman SecDB. The vignette below is one of their rules.',
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
          body: 'A tier-1 systems integrator scopes a regulated-banking platform as a multi-year, eight-figure engagement: analysts running discovery, change requests, and reconciliation cycles. Working to the five rules above, one expert directing AI compressed that scope into weeks. The licensable asset has two halves. The directorial track is how a banker directs AI to produce shipped code; the platform IP is what that produces — CDM connectors, regulatory schema mapping, banking surfaces — packaged for cloud marketplace distribution once the partner channel is in place.',
        },
        artifact: {
          heading: 'One real prompt, one real correction',
          promptShown: '{{TERRY_PROMPT_EXAMPLE_PROMPT}}',
          correctionShown: '{{TERRY_PROMPT_EXAMPLE_CORRECTION}}',
          prLink: '{{TERRY_PROMPT_EXAMPLE_PR_URL}}',
        },
        disclosure: "Atheryon Labs is currently built using Anthropic’s Claude. The method itself is model-agnostic: the prompts, corrections, and design constraints transfer to whichever frontier model is on the other side of the chat.",
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
        tertiaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
      },
    },

    offers: {
      code: {
        title: 'Buy the code — Atheryon Labs',
        description: 'License the Atheryon Labs platform code as a working banking reference implementation.',
        // Short card copy for the /offers overview. Deliberately different from
        // hero.lede, which opens the sub-page itself.
        overviewBlurb:
          'The working platform as a licensable asset: the CDM-native codebase, deployable into your own estate, with licensing scoped to modules and rights.',
        hero: {
          eyebrow: '01 / Code',
          headline: 'Buy the Labs code.',
          lede: `License the Atheryon Labs platform code as a working banking reference implementation — CDM-native, ${metrics.bankingFunctions} banking functions, ${metrics.flagshipSurfaces} surfaces, deployable.`,
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
            `${metrics.flagshipSurfaces} flagship surfaces shipped across trading, post-trade, risk, treasury, compliance, and mortgages.`,
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
        overviewBlurb:
          'The record of how the platform was directed into existence. For teams who want the method and the reasoning, with or without the code.',
        hero: {
          eyebrow: '02 / Prompts',
          headline: 'License the prompts.',
          lede: 'License the prompt archive that directed the AI build. Each prompt is paired with the correction and the banking reasoning that turned model output into shipped code.',
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
          badge: 'Productised bundle',
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
        overviewBlurb:
          'Senior-led engagement with the architect of the platform, from a 30-day diagnostic through to a multi-quarter build.',
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
      description: `${metrics.labs.themes} themes · ${metrics.labs.pages} pages across the Atheryon labs platform — the live discovery surface for ODS, front office, risk & analytics, operations, compliance, and treasury.`,
      badge: 'Discovery',
      headline: 'Explore the labs surface',
      intro: 'A public preview of the Atheryon labs discovery surface — every theme and every sub-page that lives at labs.atheryon.ai, rendered here as a static map. Click any tile to open the live theme on the labs subdomain in a new tab. The lattice mirrors the operational shape of a tier-1 capital-markets bank: an Operational Data Store (schemas, validators, lifecycle, entity intelligence, ops and dev tools) plus five business-unit surfaces — Front Office, Risk & Analytics, Operations, Compliance, and Treasury / Finance.',
      countsLine: `${metrics.labs.themes} themes · ${metrics.labs.pages} pages · ${metrics.labs.surfaces} surfaces (1 ODS data store + ${metrics.labs.businessUnits} business units)`,
      businessDividerLabel: 'Business Units',
    },
  },

  footer: {
    links: {
      pillars: [
        { label: 'System', href: '/system' },
        { label: 'Themes', href: '/themes' },
      ],
      whatsNext: [
        { label: 'Roadmap', href: '/roadmap' },
      ],
      resources: [
        { label: 'Labs', href: '/labs' },
        { label: 'Writing', href: '/blog' },
      ],
      company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    // M&A practice footer — practice-correct wayfinding for /ma/* pages.
    // Cross-practice link back to Capital Markets is deliberate: the two
    // practices share one brand, so the footer is where the other practice
    // stays reachable without polluting the M&A nav.
    maLinks: [
      { label: 'M&A Overview', href: '/ma' },
      { label: 'Approach', href: '/ma/approach' },
      { label: 'Offers', href: '/ma/offers' },
      { label: 'Contact', href: '/ma/contact' },
      { label: 'Capital Markets', href: '/' },
    ],
    // Practice-lead LinkedIn per mode. The M&A practice is led by Anna
    // Contos, so /ma/* pages show her profile, not Terry's. URL provided
    // by Terry 2026-08-07. Empty string = Footer hides the link.
    maLinkedin: 'https://www.linkedin.com/in/anna-contos-7685a7/',
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
      title: 'Atheryon — Capital Markets Engineering & M&A',
      intent: 'Home',
      description:
        'Atheryon is a capital markets engineering and M&A integration advisory firm delivering institutional systems and data platforms with AI agents.',
      sections: {
        hero: {
          label: 'atheryon / capital markets & m&a / overview',
          headline: 'ATHERYON CAPITAL MARKETS | M&A',
          subhead:
            'A capital markets engineering and M&A integration advisory firm. Atheryon designs and delivers institutional systems and data platforms using AI agents, compressing multi-year delivery cycles into weeks.',
        },
        selectedWork: {
          label: '§01 / Selected Work',
          title: 'Selected work',
          entries: [
            {
              id: 'tier-1-australian-banking-divestment',
              index: '01',
              title: 'Tier-1 Australian Banking Divestment & TSA Exit',
              details: [
                {
                  label: 'Context',
                  body:
                    'A multi-billion dollar wealth management carve-out requiring structural separation from legacy core banking infrastructure.',
                },
                {
                  label: 'Execution',
                  body:
                    'Deployed automated AI agents to index corporate system architecture, reducing traditional analyst dependency mapping timelines from 6 months to 4 weeks.',
                },
                {
                  label: 'Outcome',
                  body:
                    'Achieved clean Day-1 readiness under APRA CPS 234-aligned controls, eliminating post-deal TSA cost overruns.',
                },
              ],
            },
            {
              id: 'front-to-back-cdm-implementation',
              index: '02',
              title: 'Front-to-Back Common Domain Model (CDM) Implementation',
              details: [
                {
                  label: 'Context',
                  body:
                    'Modernisation of an institutional trading and market risk data lifecycle.',
                },
                {
                  label: 'Execution',
                  body:
                    'Structured a marketplace-bound reference implementation using custom-orchestrated AI agent pipelines rather than legacy middleware.',
                },
                {
                  label: 'Outcome',
                  body:
                    'Re-engineered front-office to back-office P&L taxonomy, cutting system delivery cycles by 60%.',
                },
              ],
            },
          ],
        },
        practiceHierarchy: {
          label: '§02 / Services',
          title: 'Services',
          entries: [
            {
              index: '01',
              title: 'M&A Separation & Integration Advisory',
              body:
                'Post-deal execution, pre-sign execution reviews, and control tracing led by veteran institutional banking executives. Focus on Day-1 readiness, TSA tracking, carve-outs, and migration sequencing.',
              href: '/ma',
            },
            {
              index: '02',
              title: 'Capital Markets System Engineering',
              body:
                'Direct implementation of data platforms for trading businesses, from risk taxonomy design through declarative compliance architecture.',
              href: '/system',
            },
            {
              index: '03',
              title: 'Proprietary Technology & IP Licensing',
              body:
                'Commercial access to the Atheryon Labs reference implementation platform, core CDM code assets, and the prompt archive that directed the AI build.',
              href: '/offers',
            },
          ],
        },
      },
    },
    system: {
      route: '/system',
      title: 'System — Reference Architecture',
      intent: 'Reference architecture (core proof)',
      description:
        'Reference architecture: capital markets systems, data platforms, and AI agent systems — built on Anthropic’s Claude and deployed on Microsoft Azure, with S&P Global data integration.',
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
          dataSources: {
            name: 'Data Sources',
            detail: 'S&P Global · enterprise bank systems · counterparty feeds',
          },
          etlAgents: {
            label: 'ETL agents',
            caption: 'CDM-native modelling · validation · ingestion',
            output: 'validated · field-level lineage',
          },
          ods: {
            name: 'Operational Data Store (ODS)',
            detail: 'the CDM-typed foundation — validated · field-level lineage',
            scale: '1,019 type defs · 42 ISO 20022 · 14 FpML',
          },
          operationsAgents: {
            label: 'Operations agents',
            caption: 'per business unit — run the workflows on the ODS',
            units: [
              { name: 'Front Office', detail: 'trade lifecycle' },
              { name: 'Risk & Analytics', detail: 'P&L · limits · anomalies' },
              { name: 'Operations', detail: 'confirms · settlement' },
              { name: 'Compliance', detail: 'reg reporting · surveillance' },
              { name: 'Treasury / Finance', detail: 'liquidity · funding' },
            ],
          },
          control: {
            orchestrator: { name: 'Orchestrator', detail: 'routes · types · retries · audits', runtime: 'built on Claude' },
            signOff: { name: 'Expert sign-off', detail: 'senior capital-markets expert selects · edits · signs off every output' },
            archive: { name: 'Directorial archive', detail: 'every agent decision replayable & auditable' },
            deployment: 'deployed on Azure (Container Apps · Entra ID · Postgres)',
          },
          outputs: {
            name: 'Operational Outputs',
            detail: 'capital-markets systems · risk · trading · regulatory reporting',
          },
          mndaCaption:
            'Specialist agents — independently deployable / licensable. Detailed reference-architecture briefing — agent clusters, deployment topology, operational evidence — available under MNDA.',
          legend: {
            data: 'data flow',
            control: 'control / audit',
            orchestrator: 'navy = orchestrator',
            signoff: 'double-rule = expert sign-off',
          },
        },
        dataFlowLayer: {
          label: '§02 / Data Flow Layer',
          title: 'Data Flow Layer',
          body:
            'A bespoke capital-markets data model, industry-anchored (ISDA, ISO 20022, FpML conventions) and shaped by 20+ years of front-to-back banking experience. 1,019 type definitions, 42 ISO 20022 message types, and 14 FpML schemas, each parseable, queryable, and validatable at runtime. Source feeds from S&P Global, internal ledgers, and counterparty channels are mapped to typed payloads on ingest, with field-level lineage tracked from origin through every transformation. The Schema Editor (extend / wrap patterns) lets domain experts model real bank-specific extensions on top of the canonical core without forking.',
        },
        aiAgentLayer: {
          label: '§03 / AI Agent Layer',
          title: 'AI Agent Layer',
          body:
            'Two classes of specialist agent, coordinated by a multi-agent orchestrator. ETL agents build the CDM-typed Operational Data Store: CDM-native modelling, validation, and ingestion with field-level lineage. Operations agents run the workflows on top of it, one set per business unit (front office, risk & analytics, operations, compliance, treasury / finance). The agents run on Anthropic’s Claude via the Claude Agent SDK; the orchestrator owns routing, payload typing, retry, and audit, and nothing in the design binds it to one model. Each agent generates candidate implementations against the loaded schemas; a senior capital-markets expert selects, edits, and signs off. Every prompt, context, correction, and resulting code change lands in the directorial archive for replay and audit.',
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
              href: '/themes/middle-office-ops#workflow',
            },
            {
              id: 'risk-reporting-generation',
              name: 'Risk reporting generation',
              body:
                'Score each trade against per-regime field-completeness rules (EMIR Refit, MiFID II, ASIC, CFTC 43/45, SFTR, Dodd-Frank — six regulatory regimes). Generate the report payload in the regime’s prescribed format. Scheduled daily/T+1 runs into the submission queue with one-click trade-repository submission.',
              href: '/themes/compliance-surveillance#workflow',
            },
            {
              id: 'portfolio-analytics-pipeline',
              name: 'Portfolio analytics pipeline',
              body:
                'Aggregate live positions; attribute P&L; detect anomalies in trade quality and counterparty data. KPI tiles, trend charts (7d / 30d / 90d), and anomaly feed with severity and recommended action. Drill-down into anomaly detection, data quality, and pattern mining.',
              href: '/themes/risk-analytics#workflow',
            },
            {
              id: 'financial-data-ingestion-and-structuring',
              name: 'Financial data ingestion workflow',
              body:
                'Map source fields (S&P Global, internal ledgers, counterparty feeds) to ISDA CDM types. Validate against CDM, ISO 20022, and FpML schemas. Per-counterparty data-quality scoring with longitudinal trend; field-level lineage from origin to operational data store.',
              href: '/themes/foundation-ods#workflow',
            },
          ],
        },
        deploymentModel: {
          label: '§05 / Deployment Model',
          title: 'Deployment model',
          body:
            'Azure-native. Claude (Anthropic) as the agent runtime, Postgres for the operational data store, Container Apps for the service mesh, Microsoft Entra ID for identity. APRA CPS 234-aligned operational-controls baseline. The reference implementation is marketplace-bound: deployable into your Azure tenant, licensed as a reference platform, or operated under managed-service terms. Everything is inspectable, extendable, and externally testable today. No demoware.',
        },
        proofArtifacts: {
          label: '§06 / Proof Artifacts',
          title: 'Proof artifacts',
          // Directive transcribed verbatim; body awaits user prose.
          directive:
            'Reference system described as a working architecture (not screenshots or UI gallery).',
          body:
            `The reference system runs at labs.atheryon.ai. ${metrics.labs.themes} themes across ${metrics.labs.pages} pages span ${metrics.labs.surfaces} operational surfaces: the Operational Data Store (schemas, validators, lineage, entity intelligence) plus ${metrics.labs.businessUnits} business units (Front Office, Risk & Analytics, Operations, Compliance, Treasury / Finance). Every surface is reachable, browsable, and verifiable in a running system rather than a screenshot gallery. A deeper briefing on core services, agent clusters, deployment topology, and operational evidence is available under MNDA.`,
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
        'Principal biographies for Terry Tsakiris, Founder & Systems Principal, and Anna Contos, Head of M&A Separation & Integration Advisory.',
      hero: {
        label: 'atheryon / about / leadership',
        title: 'About',
        body: 'Capital markets engineering and M&A execution leadership.',
      },
      principals: [
        {
          id: 'terry-tsakiris',
          label: 'Principal Biography',
          name: 'Terry Tsakiris',
          role: 'Founder & Systems Principal',
          paragraphs: [
            'Terry Tsakiris is the founder and technical architect of Atheryon. He has spent over two decades engineering core data infrastructure, front-office risk taxonomies, and algorithmic trading systems across the world’s leading financial environments, including Goldman Sachs, Credit Suisse, and Barclays Capital.',
            'As an expert in capital markets reference data architectures, Terry formerly designed enterprise-scale data strategies, including integration vectors with platforms like S&P TeraHelix. At Atheryon, he directs the engineering of marketplace-bound, CDM-native banking platforms. His work focuses on leveraging LLM orchestration layers to render declarative compliance boundaries and eliminate the multi-million dollar overheads of traditional tier-1 system integrators.',
          ],
        },
        {
          id: 'anna-contos',
          label: 'Principal Biography',
          name: 'Anna Contos',
          role: 'Head of M&A Separation & Integration Advisory',
          paragraphs: [
            'Anna Contos leads the M&A Separation and Integration Practice at Atheryon, bringing unprecedented institutional execution credibility to high-stakes corporate transactions. She is an elite corporate integration specialist with a proven track record of steering complex, highly regulated financial carve-outs.',
            "Prior to joining Atheryon, Anna served as the Head of Separation & Integration Advisory at Westpac (2023–2025). She previously held the position of Head of Divestment Execution at Commonwealth Bank (CBA). Throughout her career at Australia's major tier-1 institutions, Anna has successfully commanded multi-billion dollar post-deal integrations, regulatory risk tracking under APRA mandates, and complex Transition Service Agreement (TSA) exits. At Atheryon, she pairs her deep institutional deal scar-tissue with AI-accelerated system mapping to ensure buyer execution is bulletproof before and after signing.",
          ],
        },
      ],
    },
    contact: {
      route: '/contact',
      // Title is intentionally neutral — /contact is reached from both CM and
      // M&A practices (with ?topic= param). Static export cannot emit different
      // <title> per query string, so a practice-specific title would mislabel
      // half the visitors.
      title: 'Contact — Atheryon',
      intent: 'Talk to Atheryon',
      description: 'Talk to Atheryon about a capital-markets system assessment or M&A execution review.',
      cta: 'Talk to Atheryon',
    },
  },

  // Firm-wide page-end CTA label (rev 4) — DocFooter default for the legacy
  // L3 pages that still read v2.cta.
  cta: {
    label: 'Discuss a situation',
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

// =============================================================================
// v2Ma — M&A practice (2026-05-17)
// =============================================================================
// M&A practice is post-deal execution + pre-sign execution review. NOT M&A
// advisory (no deal sourcing/valuation/negotiation). Consulting practice, not
// platform. Led by Anna Contos. Status: shipped (full prose pre-written).
// =============================================================================

export const v2Ma = {
  home: {
    route: '/ma',
    title: 'M&A — Atheryon',
    description:
      'M&A success is determined before the deal is signed. Senior execution specialists pre-sign and post-sign. AI agents accelerating dependency mapping, control tracing, TSA tracking — Day-1 readiness in weeks, not quarters.',
    status: 'shipped' as const,
    sections: {
      hero: {
        label: 'atheryon / m-and-a / execution',
        title: 'M&A Execution',
        subtitle: 'M&A success is determined before the deal is signed.',
      },
      thesis: {
        label: '§01 / Thesis',
        title: 'Talk to us before signing',
        body:
          'M&A success is determined before the deal is signed. The clauses you agree shape what is and isn’t executable on Day-1 — and most of the operational, data, and regulatory traps in an M&A deal are visible at the term-sheet stage to a specialist who has run separations and integrations through to completion. Most firms don’t have this voice in the pre-sign room. We are that voice.\n\nPre-sign execution advice is the leverage. Delivery execution is the substance — the eighty percent of our practice. Once the deal lands, we drive the separation/integration plan as senior specialists in the delivery seat: reading the perimeter, sequencing the waves, mapping the controls, tracking the TSAs to clean exit. AI agents accelerate the dependency mapping, control tracing, and TSA tracking that traditionally consume the most analyst hours. Senior specialists set direction; agents do the volume work.\n\nDay-1 readiness in weeks. Clean exit to target operating model. Regulatory continuity preserved. Value realised post-sign, not eroded.\n\nThis is execution-specialist work, not deal advisory. We don’t price the deal, find the partner, or negotiate the terms — bankers and lawyers own that. We tell you what’s executable. Then we deliver.',
      },
      triggers: {
        label: '§02 / When clients call us',
        title: 'Triggers for engagement',
        items: [
          {
            id: 'pre-sign-negotiation',
            name: 'Late-stage deal negotiation — the highest-leverage moment to engage us',
            body:
              'Draft terms are forming. The execution implications need a specialist read before signing. Most clients don’t engage us here; this is the single most valuable moment to.',
          },
          {
            id: 'transaction-delivery',
            name: 'High-stakes transaction delivery — the most common engagement',
            body:
              'Deal is signed; integration or separation is underway. Specialist execution leadership in the delivery seat. AI-velocity on dependency mapping, control tracing, TSA tracking.',
          },
          {
            id: 'capability-gaps',
            name: 'Execution capability gaps',
            body:
              'Internal team is competent but stretched. We embed senior specialists alongside, with agent acceleration on the analytical work.',
          },
          {
            id: 'planning-deficits',
            name: 'Pre-deal planning deficits',
            body:
              'Day-1 plan is thin; carve-out perimeter unclear; control continuity undefined. We rebuild it fast, then drive the delivery.',
          },
          {
            id: 'data-migration-risk',
            name: 'Data migration risk in M&A',
            body:
              'Data is the dependency layer. Mapping, lineage, separation strategy. See /ma/approach §02.',
          },
        ],
      },
      execution: {
        label: '§03 / How we execute',
        title: 'Six capabilities',
        items: [
          'Pre-sign execution review (the wedge)',
          'Separation/integration plan tied to deal outcomes',
          'Day-1 requirements and transition operating model',
          'Critical data, reporting, and control dependencies mapped',
          'Separation/integration waves executed with clear contracts',
          'TSA scope reduced; clean exit to target state',
        ],
      },
      outcomes: {
        label: '§04 / What we deliver',
        title: 'Outcomes',
        items: [
          'Pre-sign execution clarity — sign with the traps already in your register',
          'Clean separation/integration delivered to timeline',
          'Reduced TSA cost and duration',
          'Lower operational disruption and delivery risk',
          'Regulatory continuity across reporting and controls',
          'Value realised post-sign, not eroded',
        ],
      },
      cta: {
        label: 'Book an M&A execution review',
        href: '/ma/contact',
        supportingLine: 'Pre-sign or post-sign. Senior specialist on call.',
      },
    },
  },
  approach: {
    route: '/ma/approach',
    title: 'M&A Approach — Atheryon',
    description:
      'How Atheryon delivers M&A execution. Senior consulting practice, AI data specialist work with S&P Global and Microsoft Azure, three M&A workflows, embedded delivery, led by Anna Contos.',
    sections: {
      hero: {
        label: 'atheryon / m-and-a / approach',
        title: 'M&A Approach',
        subtitle: 'How we deliver. Senior specialists, AI velocity, embedded.',
      },
      approach: {
        label: '§01 / Approach',
        title: 'Consulting practice, not a platform',
        body:
          'M&A execution is consulting work. Senior specialists in the term-sheet review room before signing, then senior specialists in the delivery seat from Day-1 through TSA exit. AI agents are tools we use to compress the analytical volume work — not a platform you license. The value is the specialist who reads the deal, sets direction, and owns the outcome. Atheryon does not sell M&A software. We sell senior execution capacity, augmented with AI velocity.\n\nThree lifecycle stages: pre-sign (term-sheet review for execution traps), Day-1/Day-2 readiness, and TSA exit. We are in those rooms. The eighty percent of our practice is post-sign delivery; the wedge is the pre-sign conversation that prevents the worst traps from being signed in.',
      },
      dataSpecialist: {
        label: '§02 / AI Data Specialist Work',
        title: 'Partners: S&P Global, Microsoft Azure',
        body:
          'Data is the dependency layer in any M&A deal. Carve-out perimeters are defined in legal entities; the operating reality is defined in data flows. Atheryon brings AI data specialist capability to the deal-execution data work: separation lineage, migration sequencing, regulatory continuity mapping, control re-anchoring.\n\nWe work with S&P Global for market and reference data continuity across the separation boundary, and on Microsoft Azure as the runtime for the AI agent work that traces dependencies, projects migration windows, and flags meaning-loss risks before they reach the wave plan. The same partner stack that runs Atheryon’s capital-markets practice runs the M&A data work — shared infrastructure, shared directorial archive, M&A-specific agent topology.',
      },
      workflowExamples: {
        label: '§03 / Workflow Examples',
        title: 'Three M&A workflows — pre-sign + delivery',
        intro:
          'Each workflow follows our standard pipeline — Input → AI agents → Processing → Output — adapted for M&A execution data and decisions. One is pre-sign execution review; two cover the spine and exit of post-sign delivery.',
        stages: ['Input', 'AI agents', 'Processing', 'Output'] as const,
        items: [
          {
            id: 'pre-sign-execution-review',
            label: '§3a',
            name: 'Pre-Sign Execution Review',
            input:
              'Draft deal terms, target perimeter definitions, data flow inventories, existing control map.',
            agents:
              'Clause-to-execution-risk mapping; TSA scope projection; control-continuity scoring.',
            processing:
              'Traps register → mitigations register → risk-weighted recommendation.',
            output:
              'Pre-sign execution risk report + mitigations playbook. Delivered before ink.',
          },
          {
            id: 'separation-integration-planning',
            label: '§3b',
            name: 'Separation/Integration Planning',
            input:
              'Signed deal terms, perimeter definitions, target operating model.',
            agents:
              'Dependency tracing; wave-window sequencing; Day-1 requirements derivation; data lineage mapping.',
            processing:
              'Dependency graph → wave plan → Day-1 readiness checklist → data migration sequence.',
            output:
              'Separation/integration plan with contractual wave commitments, Day-1 readiness pack, data migration plan with field-level lineage.',
          },
          {
            id: 'tsa-tracking-reduction',
            label: '§3c',
            name: 'TSA Tracking & Reduction',
            input:
              'TSA scope, time-boxed obligations, exit criteria, ongoing delivery status.',
            agents:
              'TSA dependency analysis; exit-criteria projection; scope-creep detection; control assurance verification.',
            processing:
              'TSA register → reduction roadmap → exit scenarios → executive surface.',
            output:
              'TSA exit plan with milestone gates and scope-creep alarms; delivery dashboard with audit trail to closure.',
          },
        ],
      },
      embeddedDelivery: {
        label: '§04 / Embedded Delivery',
        title: 'Senior specialist + AI agents, embedded',
        body:
          'Atheryon deploys M&A as embedded execution specialists. Senior specialists alongside your in-house team — pre-sign if you bring us in early, then continuous through Day-1, Day-2, and TSA exit. Typical engagement: 6–18 months from term sheet to clean exit. AI agents run on Atheryon infrastructure; outputs surface in your team’s tools.\n\nAzure-native. Azure OpenAI as the agent runtime. APRA CPS 234-aligned operational-controls baseline. Auditable directorial archive — every agent decision is replayable.\n\nNot a licensed platform. Not a marketplace product. Embedded consulting with AI velocity, delivered by people you can call.',
      },
      seniorSpecialist: {
        label: '§05 / Senior Specialist',
        title: 'Led by Anna Contos',
        body:
          'Atheryon’s M&A practice is led by Anna Contos — 25+ years in financial-services execution across Australia, the UK, and the US, with the recent two decades focused on M&A separations, integrations, divestments, and large-scale transformation.\n\nMost recently Head of Separation and Integration Advisory at Westpac Group (2023–2025), executive-leading separation and integration programs across Westpac’s divestment and acquisition initiatives. Prior: Head of Divestment Execution at Commonwealth Bank for the Wealth division (2018–2020), running the portfolio of finance programs that delivered CBA’s Count Financial divestment and the CommInsure sale. Earlier: Take to Market Lead for the BT Panorama platform launches; business consulting and strategy roles at Deutsche Bank, Deutsche Pfandbriefbank, Credit Suisse, and Capco across investment banking, wealth, and retail.\n\nTrack record across the deal lifecycle: separation/integration strategy, planning, commercial structuring, business readiness, execution, and stabilisation. Carve-outs, demergers, end-to-end transition management — in highly regulated, politically sensitive environments.\n\nThe M&A practice is structured around her as senior specialist. AI agents do the volume work; Anna sets direction and owns the outcome.',
      },
      cta: {
        label: 'Book an M&A execution review',
        href: '/ma/contact',
      },
    },
  },
  offers: {
    route: '/ma/offers',
    title: 'M&A Offers — Atheryon',
    description:
      'How to engage Atheryon’s M&A practice. One way: embedded execution specialists. Pre-sign through post-sign, led by Anna Contos.',
    sections: {
      hero: {
        label: 'atheryon / m-and-a / offers',
        title: 'How to engage the M&A practice',
        subtitle: 'One way to engage. Embedded consulting.',
      },
      offer: {
        label: '§01 / The offer',
        title: 'Embedded Execution Specialists',
        body:
          'Atheryon’s M&A practice is sold one way: embedded execution specialists alongside your in-house team — pre-sign if you bring us in early, then continuous through Day-1, Day-2, and TSA exit.\n\nSenior specialists set direction. AI agents do the volume work. Outputs surface where your team can use them. Azure-native infrastructure. APRA CPS 234-aligned operational-controls baseline. Auditable directorial archive.\n\nAnna Contos leads the practice. Typical engagement: 6–18 months from term sheet to clean TSA exit. Pre-sign sprints possible as a stand-alone wedge or a precursor to full delivery.',
        outcomeListIntro:
          'What we deliver:',
        outcomes: [
          'Pre-sign execution clarity — sign with the traps already in your register',
          'Clean separation/integration delivered to timeline',
          'Reduced TSA cost and duration',
          'Lower operational disruption and delivery risk',
          'Regulatory continuity across reporting and controls',
          'Value realised post-sign, not eroded',
        ],
        cta: {
          label: 'Book an M&A execution review',
          href: '/ma/contact',
        },
      },
      codeAndPrompts: {
        label: '§02 / Code and Prompts',
        title: 'Not offered for M&A',
        body:
          'Atheryon’s capital-markets practice offers two productised paths alongside Consult: license the code (the deployable banking reference implementation) or license the prompts (the directorial archive — methodology IP transfer). See /offers for both.\n\nFor M&A, the value is the senior specialist plus AI velocity, both inside the same embedded engagement. We do not productise M&A separately. The practice is sold as consulting, not as code or methodology IP.',
        cmOffersLink: {
          label: 'See capital-markets offers →',
          href: '/offers',
        },
      },
    },
  },
} as const

// =============================================================================
// v3 — Executive-first IA (2026-08-09).
// Source: docs/superpowers/plans/2026-08-09-exec-first-ia-restructure.md REV 2.
// Appendix A content verbatim; Appendix B positioning verbatim. Figures gated
// by TODO(anna) sign-off before dev → main promotion (see docs/claims-ledger.md).
// =============================================================================

export const v3 = {
  // Appendix B, adopted verbatim (statement per rev 3 Brief 2 wording). The
  // "operational, technology and data" triad is load-bearing per the port note.
  positioning: {
    statement:
      'Atheryon is a specialist advisory firm helping organisations understand and execute complex transactions, transformations and technology-driven change where operational, technology and data dependencies materially impact outcomes.',
    narrative:
      'Transactions and transformations increasingly succeed or fail based on operational, technology and data complexity. Atheryon combines deep transaction execution experience with technology, data and AI expertise to help organisations understand complexity earlier, reduce execution risk and deliver outcomes with confidence.',
    principle:
      'Transaction value is protected when separation and integration requirements are understood early.',
  },

  // CTA (rev 4, spec §2): page-end CTAs "Discuss a situation".
  cta: {
    label: 'Discuss a situation',
    href: '/contact',
  },

  // Firm footer (phase 2): CM legacy pages regroup under a Technology heading.
  footer: {
    groups: [
      {
        heading: 'Firm',
        links: [
          { label: 'M&A', href: '/ma' },
          { label: 'Capital Markets', href: '/capital-markets' },
          { label: 'Experience', href: '/experience' },
          { label: 'Approach', href: '/approach' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        heading: 'Technology',
        links: [
          { label: 'System', href: '/system' },
          { label: 'Labs', href: '/labs' },
          { label: 'Themes', href: '/themes' },
          { label: 'Offers', href: '/offers' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Writing', href: '/blog' },
          { label: 'Roadmap', href: '/roadmap' },
        ],
      },
    ],
  },

  pages: {
    home: {
      route: '/',
      title: 'Atheryon — Making Complex Change Executable',
      description:
        'Atheryon is a specialist advisory firm helping organisations understand and execute complex transactions, transformations and technology-driven change where operational, technology and data dependencies materially impact outcomes.',
      sections: {
        // Root hero — rev 6: viewport 1 reproduces the approved poster
        // (docs/superpowers/specs/atheryon-poster-2026-08-09.svg). Three
        // serif lines, warm white on deep navy, arms + bronze foundation
        // strip in the band. Supporting copy opens section 2 (Appendix B
        // verbatim). Subheading fragments are display type only.
        hero: {
          lines: ['Making', 'Complex Change', 'Executable.'],
          subheading: 'Understanding implications early. Executing with confidence.',
          supporting:
            'Atheryon helps organisations navigate transactions, transformation, capital markets, data and technology initiatives by bringing clarity to critical decisions and leadership to execution.',
          primaryCta: { label: 'Discuss a situation', href: '/contact' },
          secondaryCta: { label: 'Explore M&A', href: '/ma' },
        },
        proof: {
          items: [
            {
              id: 'rams',
              value: '$21.4bn',
              detail: 'RAMS mortgage portfolio acquisition — integration leadership',
            },
            {
              id: 'divestment-programs',
              value: '>$1bn',
              detail: 'Divestment and integration programs at a major Australian bank',
            },
            {
              id: 'sectors',
              value: 'Four sectors',
              detail: 'Retail banking, business banking, wealth management and non-bank financial institutions',
            },
            {
              id: 'jurisdictions',
              value: 'Four jurisdictions',
              detail: 'Australia, Europe, the United Kingdom and the United States',
            },
          ],
        },
        why: {
          label: '§01 / Why Atheryon',
          title: 'Why Atheryon',
          body:
            'Many transactions encounter avoidable challenges because the operational implications of separation or integration are not fully understood before commercial commitments are made.\n\nSeparation requirements are underestimated. Integration challenges emerge late. Transitional Service Arrangements (TSAs) become larger and longer than anticipated. Costs increase, timelines extend and value is delayed or eroded.\n\nAtheryon brings separation and integration expertise into the transaction process early, helping clients understand what will be required and where the risks sit before decisions are locked in.',
          helpIntro: 'We help clients:',
          helpItems: [
            'Understand operational implications before signing',
            'Identify execution risks earlier',
            'Build appropriate commercial protections and execution considerations into transaction agreements',
            'Reduce reliance on TSAs',
            'Accelerate operational independence',
            'Improve transaction certainty',
            'Protect and realise transaction value',
          ],
        },
        // Core IP statement: featured ONCE site-wide, here, in large type,
        // framed as the founding observation (rev 5 §1).
        principle: {
          label: '§02 / Our Principle',
          framing: 'Atheryon was founded on a simple observation:',
          statement:
            'Transaction value is protected when separation and integration requirements are understood early.',
          support:
            'The earlier these requirements are understood, the greater the opportunity to structure the transaction appropriately and reduce execution risk.',
        },
        values: {
          label: '§03 / How we work',
          title: 'How we work',
          items: [
            {
              id: 'early-insight',
              name: 'Early Insight',
              body: 'Understanding the operational implications of separation and integration before commitments are made.',
            },
            {
              id: 'commercial-discipline',
              name: 'Commercial Discipline',
              body: 'Practical advice aligned to commercial outcomes and stakeholder priorities.',
            },
            {
              id: 'execution-focus',
              name: 'Execution Focus',
              body: 'Translating transaction strategy into operational reality.',
            },
            {
              id: 'leadership-under-pressure',
              name: 'Leadership Under Pressure',
              body: 'Navigating complex stakeholder and regulatory environments with clarity and confidence.',
            },
            {
              id: 'trusted-partnership',
              name: 'Trusted Partnership',
              body: 'Operating with discretion and accountability throughout the transaction lifecycle.',
            },
          ],
        },
        // Arms (rev 6): rendered inside the viewport-1 poster band as label
        // rows with bronze ticks — M&A always first. Both link (phase 2
        // shipped /capital-markets).
        arms: {
          items: [
            { id: 'ma', label: 'M&A', href: '/ma' },
            { id: 'capital-markets', label: 'CAPITAL MARKETS', href: '/capital-markets' },
          ],
          underpinning: {
            items: ['DATA', 'TRANSFORMATION', 'AI'],
          },
        },
        // Primary credibility block (rev 5): one line per co-founder, no
        // employer names. Links to /about.
        founders: {
          label: '§05 / Founders',
          title: 'Co-founders',
          items: [
            {
              id: 'anna-contos',
              name: 'Anna Contos',
              line: 'Transactions, Separation & Integration, Transformation',
            },
            {
              id: 'terry-tsakiris',
              name: 'Terry Tsakiris',
              line: 'Capital Markets, Data, Technology & AI',
            },
          ],
          href: '/about',
          ctaLabel: 'About the co-founders',
        },
      },
    },

    ma: {
      route: '/ma',
      title: 'M&A — Atheryon',
      description:
        'The M&A arm: transaction readiness, separation and integration strategy, execution leadership, and technology, data and migration readiness.',
      sections: {
        hero: {
          label: 'atheryon / ma',
          title: 'Making Transactions Executable',
          subtitle:
            'The M&A arm, led by Anna Contos. Advisory and execution leadership for transactions and the transformations they set in motion, where execution risk can materially impact outcomes.',
        },
        lines: {
          label: '§01 / Service Lines',
          title: 'Service lines',
          items: [
            {
              id: 'transaction-readiness',
              index: '01',
              name: 'Transaction Readiness',
              tagline: 'Understanding execution requirements before transaction commitments are made.',
              items: [
                'Operational feasibility assessments',
                'Separation and integration diligence',
                'Bid-phase separation and integration support',
                'Transaction readiness reviews',
                'TSA strategy',
                'Execution risk assessments',
                'Pre-sign operational dependency analysis',
              ],
              body:
                'We help clients understand the operational, technology, data and organisational requirements that can materially influence transaction outcomes before commitments are made.',
            },
            {
              id: 'separation-integration-strategy',
              index: '02',
              name: 'Separation & Integration Strategy',
              tagline: 'Designing practical pathways to Day 1 readiness and operational independence.',
              items: [
                'Separation and integration strategy',
                'Operating model design',
                'Day 1 readiness planning',
                'Transition sequencing',
                'TSA design and exit planning',
              ],
              body:
                'Our focus is on creating executable strategies that align commercial objectives with operational realities.',
            },
            {
              id: 'execution-leadership',
              index: '03',
              name: 'Execution Leadership',
              tagline: 'Leading complex transitions from signing through implementation.',
              items: [
                'Program mobilisation and governance',
                'Executive stakeholder engagement',
                'Contractual planning and milestone alignment',
                'Risk and issue management',
                'Day 1 execution',
                'TSA establishment and exit management',
                'Delivery oversight and execution assurance',
              ],
              body:
                'We provide experienced leadership across transactions where execution certainty is critical to achieving intended outcomes.',
            },
            {
              id: 'technology-data-migration',
              index: '04',
              name: 'Technology, Data & Migration Readiness',
              tagline:
                'Helping clients understand and plan for the information, technology and migration challenges that often determine transaction success.',
              items: [
                'Structured data separation and migration assessments',
                'Unstructured data and content migration analysis',
                'Application and platform landscape assessments',
                'Data quality, ownership and reconciliation planning',
                'Migration readiness and cutover support',
                'Operational readiness analysis',
                'Technology separation and integration planning',
                'Analysis of the data dependencies that drive TSA scope',
              ],
              body:
                'Data is often one of the most significant drivers of separation and integration effort. Understanding what information exists, where it resides, how it is used and what must transition can materially influence execution timelines, TSA requirements, operational readiness and transaction value.\n\nAtheryon leverages data-enabled and AI-assisted techniques to help clients identify dependencies, assess migration complexity, improve visibility of risks and support informed decision-making throughout planning and execution.',
            },
          ],
        },
        // Commercial shape decided 2026-08-09 (spec §8.3): embedded model
        // kept, stated durations dropped.
        engagement: {
          label: '§02 / Engagement',
          title: 'How we engage',
          body:
            'Atheryon engages as embedded senior specialists, working alongside your team from pre-sign review through Day 1 to operational independence and TSA exit. Pre-sign work can stand alone or lead into full delivery.',
        },
      },
    },

    experience: {
      route: '/experience',
      title: 'Representative Experience — Atheryon',
      description:
        'Representative transaction and transformation experience across financial services, led by Atheryon and its principals.',
      sections: {
        hero: {
          label: 'atheryon / experience',
          title: 'Representative Experience',
          subtitle:
            'Selected transactions and transformations across financial services.',
        },
        cases: {
          label: '§01 / Selected Cases',
          title: 'Selected cases',
          provenance:
            'Representative experience spans Atheryon engagements and programs led by Atheryon principals in prior senior roles.',
          items: [
            {
              id: 'rams-portfolio-acquisition',
              index: '01',
              name: 'Landmark RAMS Mortgage Portfolio Acquisition',
              client: 'Specialist Mortgage Servicer',
              engagement: 'Integration Leadership',
              details: [
                {
                  label: 'Context',
                  body:
                    'A landmark transaction valued at approximately $21.4 billion at signing and recognised as one of the largest loan portfolio acquisitions in Australian history. The transaction involved compressed delivery timeframes, complex separation requirements, multiple service providers, significant operational dependencies and no seller TSA arrangements.',
                },
                {
                  label: 'Role',
                  body:
                    'Atheryon leadership played a key role in the transition and integration of the RAMS mortgage portfolio acquisition.',
                },
                {
                  label: 'Outcome',
                  body:
                    'Led the successful transition to a new servicing environment, delivering Day 1 operational readiness, seamless customer migration and ongoing regulatory compliance. Despite the scale and complexity of the transaction, timelines were achieved and hypercare issues remained exceptionally low, enabling immediate operational stand-up and value realisation.',
                },
              ],
            },
            {
              id: 'enterprise-divestment-advisory',
              index: '02',
              name: 'Enterprise-Wide Divestment & Separation Advisory',
              client: 'Major Australian Bank',
              engagement: 'Separation & Integration Advisory',
              details: [
                {
                  label: 'Context',
                  body: 'Divestment and integration programs exceeding $1 billion in transaction value.',
                },
                {
                  label: 'Role',
                  body: 'Led separation and integration advisory across the divestment and integration programs.',
                },
                {
                  label: 'Outcome',
                  body:
                    'Reduced separation complexity, accelerated readiness and materially limited TSA exposure across multiple strategic transactions.',
                },
              ],
            },
            {
              id: 'financial-advice-sale-separation',
              index: '03',
              name: 'Sale & Separation of a Major Financial Advice Business',
              client: 'Leading Retail Bank',
              engagement: 'Separation Execution',
              details: [
                {
                  label: 'Context',
                  body: 'The sale of a major financial advice business requiring pre-sign and post-sign separation execution.',
                },
                {
                  label: 'Role',
                  body: 'Led pre-sign and post-sign separation execution for the sale.',
                },
                {
                  label: 'Outcome',
                  body:
                    'Completed transaction execution within four months and achieved full operational separation within ten months, with minimal transitional arrangements.',
                },
              ],
            },
            {
              id: 'wealth-demerger-insurance-divestment',
              index: '04',
              name: 'Wealth Demerger & Insurance Divestment',
              client: 'Major Financial Services Organisation',
              engagement: 'Separation Design & Readiness',
              details: [
                {
                  label: 'Context',
                  body: 'Significant wealth and insurance transactions requiring separation design and implementation readiness.',
                },
                {
                  label: 'Role',
                  body: 'Led separation design and implementation readiness activities supporting the transactions.',
                },
                {
                  label: 'Outcome',
                  body: 'Enabled standalone operation while meeting regulatory, financial and operational requirements.',
                },
              ],
            },
            {
              id: 'operating-model-transformation',
              index: '05',
              name: 'Operating Model Transformation',
              client: 'Global Investment Bank',
              engagement: 'Transformation Leadership',
              details: [
                {
                  label: 'Context',
                  body: 'A large-scale operating model transformation across merged wealth and asset management businesses.',
                },
                {
                  label: 'Role',
                  body: 'Led the operating model transformation program.',
                },
                {
                  label: 'Outcome',
                  body:
                    'Improved execution certainty, restored stakeholder confidence and re-established momentum on a strategically important initiative.',
                },
              ],
            },
          ],
        },
        // TODO(terry): 1–2 technology-side case facts (spec §8.6) — facts only,
        // no invention. Block hidden by the isPending guard until supplied.
        technologyCases: {
          label: '§02 / Technology & Transformation',
          title: 'Technology and transformation experience',
          body: '{{TECH_EXPERIENCE_CASES}}',
        },
      },
    },

    approach: {
      route: '/approach',
      title: 'Our Approach — Atheryon',
      description:
        'Method and governance across the transaction lifecycle: pre-sign insight, Day 1 readiness, and the path to operational independence and TSA exit.',
      sections: {
        hero: {
          label: 'atheryon / approach',
          title: 'Our Approach',
          subtitle: 'Method and governance across the transaction lifecycle.',
        },
        lifecycle: {
          label: '§01 / Lifecycle',
          title: 'From pre-sign to operational independence',
          body:
            'Atheryon works across three stages of the transaction lifecycle. Before signing, we review the transaction for execution risk so commercial terms reflect operational reality. From signing, we lead readiness for Day 1 and the early period of operation. Beyond Day 1, we manage the path to operational independence and TSA exit.\n\nThe earlier the engagement begins, the more options remain open. Pre-sign work shapes the agreement itself; post-sign work protects the value already committed. Transformation work draws on the same data and AI foundation that underpins both arms.',
        },
        governance: {
          label: '§02 / Governance',
          title: 'Governance and regulatory posture',
          body:
            'Engagements run under program governance with executive stakeholder engagement, milestone alignment and structured risk and issue management. Atheryon works in regulated environments and plans for regulatory continuity across reporting and controls through separation and integration.\n\nWhere the work benefits from scale, Atheryon applies data-enabled and AI-assisted techniques under the same governance, with senior specialists directing the work and owning the outcome.',
        },
      },
    },

    about: {
      route: '/about',
      title: 'About — Atheryon',
      description:
        'The story of Atheryon and biographies of co-founders Anna Contos and Terry Tsakiris.',
      sections: {
        hero: {
          label: 'atheryon / about',
          title: 'About Atheryon',
          body:
            'Transactions and transformations increasingly succeed or fail based on operational, technology and data complexity. Atheryon combines deep transaction execution experience with technology, data and AI expertise to help organisations understand complexity earlier, reduce execution risk and deliver outcomes with confidence.',
        },
        positioning: {
          label: '§01 / Positioning',
          title: 'What Atheryon is',
          statement:
            'Atheryon is a specialist advisory firm helping organisations understand and execute complex transactions, transformations and technology-driven change where operational, technology and data dependencies materially impact outcomes.',
          audience:
            'We work with Boards, executive teams, investors, private equity sponsors and corporate development teams.',
        },
        story: {
          label: '§02 / Our Story',
          title: 'Our story',
          body:
            'Anna Contos spent more than two decades leading major separation, integration and transformation programs and watched the same pattern repeat: commercial decisions made before operational implications were fully understood. Together with Terry Tsakiris, she established Atheryon to bring that understanding into the process earlier.\n\nWe help clients understand what a transaction or transformation will require before decisions are locked in. When execution begins, we provide the leadership needed to navigate complexity and deliver the intended outcomes. A signed deal is only the start; success is operational independence, value realised and outcomes delivered.',
        },
        // Bios genericised per rev 5 §1 (Brief 2): no named employers; the
        // "global investment banking" / "major Australian banks" register.
        // Facts sourced from the earlier signed-off material; RAMS (a named,
        // signed-off transaction) lives on /experience.
        founders: {
          label: '§03 / Co-Founders',
          title: 'Co-founders',
          items: [
            {
              id: 'anna-contos',
              name: 'Anna Contos',
              role: 'Co-Founder, M&A',
              paragraphs: [
                'Anna Contos co-founded Atheryon and leads the M&A arm. She brings more than 25 years in financial-services execution across Australia, the UK and the US, with the recent two decades focused on separations, integrations, divestments and large-scale transformation.',
                'Anna has led separation and integration advisory at executive level for one of Australia’s major banks, spanning its divestment and acquisition initiatives, and previously headed divestment execution for the wealth division of another major Australian bank, running the portfolio of programs that delivered a landmark financial-advice divestment and the sale of a major insurance business. Earlier roles include platform take-to-market leadership and business consulting and strategy positions across global investment banking, wealth and retail.',
                'Her track record spans the deal lifecycle in highly regulated and politically sensitive environments: separation and integration strategy, planning, commercial structuring, business readiness, execution and stabilisation, including carve-outs, demergers and end-to-end transition management.',
              ],
              linkedin: 'https://www.linkedin.com/in/anna-contos-7685a7/',
            },
            {
              id: 'terry-tsakiris',
              name: 'Terry Tsakiris',
              role: 'Co-Founder, Capital Markets',
              paragraphs: [
                'Terry Tsakiris co-founded Atheryon and leads the Capital Markets arm. He has spent more than two decades engineering core data infrastructure, front-office risk systems and data platforms inside global investment banks and major Australian banks.',
                'He built a bank’s first near-real-time front-office risk system and a global P&L attribution platform across fixed income, equities, FX and rates. He owned a markets operational data store powering regulatory trade reporting, MiFID II and trade surveillance. He also rescued a distressed $84M data program at a major Australian institutional bank, standing up a data products capability that delivered ten times faster than the bank’s prior baseline.',
                'At Atheryon, Terry directs the Capital Markets arm: capital markets systems, data platforms, separation and migration analysis, and the AI-assisted delivery methods used across both arms.',
              ],
              linkedin: 'https://www.linkedin.com/in/terencetsakiris/',
            },
          ],
        },
      },
    },

    capitalMarkets: {
      route: '/capital-markets',
      title: 'Capital Markets — Atheryon',
      description:
        'The Capital Markets arm: capital markets systems, data and migration readiness, platform transition and AI-enabled analysis, engaged inside transactions and standalone.',
      sections: {
        hero: {
          label: 'atheryon / capital-markets',
          title: 'Capital Markets',
          subtitle:
            'The Capital Markets arm, led by Terry Tsakiris. Engaged inside transactions and standalone.',
        },
        outcomes: {
          label: '§01 / What the arm delivers',
          title: 'What the arm delivers',
          items: [
            'Technology and data separation for divestments and carve-outs',
            'Migration planning and delivery across structured and unstructured data',
            'Platform transition and application rationalisation',
            'AI-enabled analysis of dependencies, complexity and risk',
            'Delivery acceleration for transformation programs',
            'Capital markets systems and platform delivery',
            'Market data environments and reference data',
          ],
          body:
            'The arm covers enterprise architecture, data platforms and the migration work that determines transaction timelines. Inside a transaction it runs the Technology, Data & Migration Readiness service line of the M&A arm. Outside transactions it is engaged standalone for technology and data programs.',
        },
        workflows: {
          label: '§02 / Workflows',
          title: 'Three delivery workflows',
          intro:
            'AI sits inside the arm, never in front of it. Three workflows show how data-enabled and AI-assisted delivery works on a transaction. Each follows the same pipeline of input, AI agents, processing and output. Senior specialists direct the work and own the outcome.',
        },
        delivery: {
          label: '§03 / Delivery',
          title: 'Embedded delivery',
          body:
            'Delivery is embedded: senior specialists alongside your team, with AI agents running on Atheryon infrastructure and outputs surfacing in your tools. The operational-controls baseline is APRA CPS 234-aligned, and every agent decision lands in an auditable archive that can be replayed.',
        },
        depth: {
          label: '§04 / Platform Depth',
          title: 'Under the arm',
          intro:
            'The arm is backed by a working reference implementation and its supporting material.',
          links: [
            { label: 'System', href: '/system', note: 'Reference architecture for the capital markets platform work' },
            { label: 'Labs', href: '/labs', note: 'The working reference platform' },
            { label: 'Themes', href: '/themes', note: 'Platform themes by banking function' },
            { label: 'Offers', href: '/offers', note: 'License the code, license the prompts, or consult' },
          ],
        },
        // Decided 2026-08-09 (spec §8.4): no partner section on this page.
        // If partners appear in body copy anywhere, S&P Global is the data
        // partner and Microsoft Azure the technology runtime; detail stays on
        // the L3 legacy pages.
      },
    },

    contact: {
      route: '/contact',
      title: 'Contact — Atheryon',
      description: 'Talk to Atheryon about executing a complex transaction or transformation.',
      sections: {
        hero: {
          label: 'atheryon / contact',
          title: 'Contact',
          body: 'Tell us about the transaction or transformation you are considering. Enquiries are treated as confidential.',
        },
        disclosure: {
          title: 'How your enquiry is handled',
          items: [
            'Enquiries are treated as confidential.',
            'Only the details entered in the form are submitted: name, company, email and message.',
            'Submissions are processed by Formspree on Atheryon’s behalf.',
          ],
          privacyLink: { label: 'Privacy Policy', href: '/privacy' },
        },
      },
    },
  },
} as const

export type V2Ma = typeof v2Ma

export type V2Mortgages = typeof v2Mortgages

export type V2 = typeof v2

export type V3 = typeof v3
