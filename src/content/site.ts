import { metrics } from './metrics'

export const site = {
  name: 'Atheryon',
  email: 'info@atheryon.com.au',

  nav: [
    { label: 'System', href: '/system' },
    { label: 'Themes', href: '/themes' },
    { label: 'Offers', href: '/offers' },
    { label: 'About', href: '/about' },
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
          message: { label: 'Tell us about the situation', placeholder: 'Describe the challenge you’re facing...', required: true },
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
        tertiaryCta: { label: 'Request a confidential discussion', href: '/contact' },
      },
      whyCredible: {
        badge: 'Why this is credible',
        title: 'Atheryon is a delivery partner for S&P TeraHelix.',
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
          },
          {
            number: '02',
            name: 'Risk Pricer + IRRBB',
            screenshot: '/labs/screenshots/risk-pricer.png',
            screenshotAlt: 'Atheryon Labs risk pricer and IRRBB surface',
            problem: 'When the pricer and the risk view are separate systems, someone downstream reconciles them, and that reconciliation is where the errors live. Anyone who has run a FOBO break process knows the pattern: two numbers, both defensible, neither explainable.',
            howItWorks: '/risk/pricer and /risk/irrbb call the same typed atheryon-risk client over a shared CDM trade payload. Pricing and Greeks come from a single source, and the IRRBB views layer balance-sheet sensitivity on top of it. When a number needs explaining, there is exactly one place to look.',
            metric: 'I ran this reconciliation at Credit Suisse: FOBO risk and Global P&L Attribution.',
          },
          {
            number: '03',
            name: 'Schema Editor + CDM Intelligence',
            screenshot: '/labs/screenshots/schema-editor.png',
            screenshotAlt: 'Atheryon Labs schema editor and CDM intelligence surfaces',
            problem: 'Every banking data platform drifts. The model the business signs off and the model the system enforces start identical, then diverge one change request at a time, silently, because the schema lives in a database migration nobody reads. Keeping the two honest under change is the hardest problem in the stack.',
            howItWorks: '/build/schema-editor edits CDM types directly, and /explore/graph walks live instances of those types. Reg Submissions reverse-map regulator artefacts back to CDM, which keeps the schema and the regulator in the same conversation instead of six months apart.',
            metric: 'The schema discipline here comes from colleagues who built Goldman SecDB. The vignette below is one of their rules.',
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
            'S&P TeraHelix integration paths where applicable; Atheryon is a delivery partner for S&P TeraHelix.',
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
      title: 'Platform themes — Atheryon Labs',
      description: `${metrics.labs.themes} themes · ${metrics.labs.pages} pages across the Atheryon labs platform — the live discovery surface for ODS, front office, risk & analytics, operations, compliance, and treasury.`,
      badge: 'Discovery',
      headline: 'Platform themes',
      intro: 'A public preview of the Atheryon labs discovery surface: every theme and every sub-page, rendered here as a static map. The lattice mirrors the operational shape of a tier-1 capital-markets bank. An Operational Data Store carries the schemas, validators, lifecycle, entity intelligence, ops and dev tools; five business-unit surfaces sit beside it, covering Front Office, Risk & Analytics, Operations, Compliance, and Treasury / Finance.',
      countsLine: `${metrics.labs.themes} themes · ${metrics.labs.pages} pages · ${metrics.labs.surfaces} surfaces (1 ODS data store + ${metrics.labs.businessUnits} business units)`,
      businessDividerLabel: 'Business Units',
    },
  },

  // Footer.tsx reads `legal.links` from here; the rendered column groups come
  // from `v3.footer.groups`. The older `links` / `maLinks` / `maLinkedin`
  // shapes were removed on 2026-08-12 — nothing imported them, and `maLinks`
  // still pointed at /ma/offers, a route that does not exist.
  footer: {
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
          label: 'Selected Work',
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
          label: 'Services',
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
          label: 'Architecture',
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
          label: 'Data Flow Layer',
          title: 'Data Flow Layer',
          body:
            'A bespoke capital-markets data model, industry-anchored (ISDA, ISO 20022, FpML conventions) and shaped by 20+ years of front-to-back banking experience. 1,019 type definitions, 42 ISO 20022 message types, and 14 FpML schemas, each parseable, queryable, and validatable at runtime. Source feeds from S&P Global, internal ledgers, and counterparty channels are mapped to typed payloads on ingest, with field-level lineage tracked from origin through every transformation. The Schema Editor (extend / wrap patterns) lets domain experts model real bank-specific extensions on top of the canonical core without forking.',
        },
        aiAgentLayer: {
          label: 'AI Agent Layer',
          title: 'AI Agent Layer',
          body:
            'Two classes of specialist agent, coordinated by a multi-agent orchestrator. ETL agents build the CDM-typed Operational Data Store: CDM-native modelling, validation, and ingestion with field-level lineage. Operations agents run the workflows on top of it, one set per business unit (front office, risk & analytics, operations, compliance, treasury / finance). The agents run on Anthropic’s Claude via the Claude Agent SDK; the orchestrator owns routing, payload typing, retry, and audit, and nothing in the design binds it to one model. Each agent generates candidate implementations against the loaded schemas; a senior capital-markets expert selects, edits, and signs off. Every prompt, context, correction, and resulting code change lands in the directorial archive for replay and audit.',
        },
        workflowExamples: {
          label: 'Workflow Examples',
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
          label: 'Deployment Model',
          title: 'Deployment model',
          body:
            'Azure-native. Claude (Anthropic) as the agent runtime, Postgres for the operational data store, Container Apps for the service mesh, Microsoft Entra ID for identity. APRA CPS 234-aligned operational-controls baseline. The reference implementation is marketplace-bound: deployable into your Azure tenant, licensed as a reference platform, or operated under managed-service terms. Everything is inspectable, extendable, and externally testable today. No demoware.',
        },
        proofArtifacts: {
          label: 'Proof Artifacts',
          title: 'Proof artifacts',
          // Directive transcribed verbatim; body awaits user prose.
          directive:
            'Reference system described as a working architecture (not screenshots or UI gallery).',
          body:
            `${metrics.labs.themes} themes across ${metrics.labs.pages} pages span ${metrics.labs.surfaces} operational surfaces: the Operational Data Store (schemas, validators, lineage, entity intelligence) plus ${metrics.labs.businessUnits} business units (Front Office, Risk & Analytics, Operations, Compliance, Treasury / Finance). Every surface is reachable, browsable, and verifiable in a running system rather than a screenshot gallery. A deeper briefing on core services, agent clusters, deployment topology, and operational evidence is available under MNDA.`,
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
          label: 'Pipeline Schema',
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
      // The principal biographies that used to sit here were removed on
      // 2026-08-15. Nothing rendered them (/about reads v3.pages.about), and
      // Terry's listed Goldman Sachs and Barclays Capital as employers, which
      // is wrong: he has never worked for either. The live bios are in v3.
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
    label: 'Contact us',
    href: '/contact',
  },
} as const

// The mortgages practice was retired from the public site on 2026-08-15
// (Terry). The /mortgages route went on 2026-08-12; /roadmap carried the last
// mention of the practice as a BUILDING entry, and /roadmap has now gone too,
// taking the mortgagesRoadmap export with it. The firm presents two functions:
// M&A Transaction Services and Data, Transformation, AI.

// =============================================================================
// v3 — Executive-first IA (2026-08-09).
// Source: docs/superpowers/plans/2026-08-09-exec-first-ia-restructure.md REV 2.
// Appendix A content verbatim; Appendix B positioning verbatim. Figures gated
// by TODO(anna) sign-off before dev → main promotion (see docs/claims-ledger.md).
// =============================================================================

// Approved case copy (spec Appendix C, Terry 2026-08-09, quoted verbatim from
// Terry's CV). Consumed in exactly one place: the cmExperience key, which
// renders /data-ai/experience and is pulled through by the firm-level
// /experience page via its sourceKey. Case indices are assigned at render
// time. Anonymised client descriptors are deliberate; no vendor names
// (Palantir may be named later at Terry's option). These are markets cases,
// which is honest depth for function 2 — do not add invented banking, wealth
// or NBFI cases to balance them.
const cmCases = [
  {
    id: 'data-program-recovery',
    name: 'Recovery of a Failed $84M Data & Analytics Program',
    client: 'Major Australian Bank, Financial Markets',
    engagement: 'Program Recovery & Platform Delivery',
    details: [
      {
        label: 'Context',
        body:
          'A strategic data and analytics transformation for the institutional bank’s financial markets business had failed after $84M of investment, with regulatory capabilities depending on it.',
      },
      {
        label: 'Role',
        body:
          'Program Director. Recovered the program and delivered the strategic data and analytics platform, automated trade surveillance, and trade and record reconstruction, then redefined how the bank builds and maintains its strategic data capability.',
      },
      {
        label: 'Outcome',
        body:
          'The platform and regulatory capabilities went live. The delivery approach established on the back of the recovery shipped strategic data assets at ten times prior speed, a first for the bank, with data governance stood up and APRA engagement led at executive level.',
      },
    ],
  },
  {
    id: 'front-office-risk-system',
    name: 'First Near Real-Time Front Office Risk System',
    client: 'Global Investment Bank, Commodities',
    engagement: 'Risk & Market Data Platforms',
    details: [
      {
        label: 'Context',
        body:
          'The commodities business needed front office risk at near real-time speed plus regulatory market risk capability, across desks spanning crude, natural gas and hybrids, during record crude oil volatility.',
      },
      {
        label: 'Role',
        body:
          'Global head of risk platforms. Designed, developed and delivered the system; delivered CAD2 market risk capability including Value-at-Risk and P&L attribution for trading and product control; established the market data team and its BAU function across New York, London and Zurich.',
      },
      {
        label: 'Outcome',
        body:
          'The bank’s first near real-time front office risk system in production, sustained by the market data function built alongside it.',
      },
    ],
  },
  {
    id: 'regulatory-markets-platform',
    name: 'Regulatory Markets Platform: Surveillance, Reporting, Record Keeping',
    client: 'Major Australian Bank, Institutional Banking & Markets',
    engagement: 'Regulatory Platform Delivery',
    details: [
      {
        label: 'Context',
        body:
          'The markets business faced obligations spanning regulatory trade reporting, record keeping, MiFID II and trade surveillance, with no platform to carry them.',
      },
      {
        label: 'Role',
        body:
          'Business owner and delivery lead. Led trade surveillance from inception to BAU handover; delivered the supporting platform; introduced the data modelling and engineering capability behind it.',
      },
      {
        label: 'Outcome',
        body:
          'Regulatory obligations met on a platform that transitioned into business-as-usual operation.',
      },
    ],
  },
] as const

// Shared by both arm contact pages.
const contactDisclosure = {
  title: 'How your enquiry is handled',
  items: [
    'Enquiries are treated as confidential.',
    'Only the details entered in the form are submitted: name, company, email and message.',
    'Submissions are processed by Formspree on Atheryon’s behalf.',
  ],
  privacyLink: { label: 'Privacy Policy', href: '/privacy' },
} as const

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

  // Header is the only Contact Us control (Terry 2026-08-15). These
  // destinations remain for the header's context-sensitive href.
  cta: {
    label: 'Contact us',
    href: '/contact',
  },
  maCta: {
    label: 'Contact us',
    href: '/ma/contact',
  },
  cmCta: {
    label: 'Contact us',
    href: '/data-ai/contact',
  },

  // Firm footer: function-2 depth pages group under a Technology heading.
  footer: {
    groups: [
      {
        heading: 'Firm',
        links: [
          // One row per function (spec §5). The Capital Markets and
          // Data. Transformation. AI. pair collapsed into one when the
          // arm retired into function 2.
          { label: 'M&A Transaction Services', href: '/ma' },
          { label: 'Data, Transformation, AI', href: '/data-ai' },
          { label: 'Experience', href: '/experience' },
          { label: 'Approach', href: '/approach' },
          { label: 'About', href: '/about' },
        ],
      },
      {
        heading: 'Technology',
        // Themes dropped 2026-08-15: /themes and /labs/themes are different
        // surfaces (buyer vs platform) and must not share one footer label.
        links: [
          { label: 'Labs', href: '/labs' },
          { label: 'System', href: '/system' },
          { label: 'Offers', href: '/offers' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Writing', href: '/blog' },
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
            'Atheryon runs two functions: M&A Transaction Services, and Data, Transformation, AI. Both are engaged across capital markets, banking, wealth and non-bank financial institutions, bringing clarity to critical decisions and leadership to execution.',
          primaryCta: { label: 'Contact us', href: '/contact' },
          // Functions-and-sectors IA (Terry 2026-08-15, spec §4): two explore
          // links, function 1 first. The third link went when Data,
          // Transformation, AI stopped being an underpinning and became
          // function 2.
          explore: {
            items: [
              { id: 'ma', label: 'Explore M&A Transaction Services', href: '/ma' },
              { id: 'data-ai', label: 'Explore Data, Transformation, AI', href: '/data-ai' },
            ],
          },
        },
        // Terry 2026-08-09 (screenshots): the transaction proof strip and
        // the principle live INSIDE the function-1 section; the parallel
        // function-2 section carries the $84M proof point. Front page splits
        // evenly between the two functions.
        maSection: {
          label: 'M&A Transaction Services',
          title: 'M&A Transaction Services',
          // Strip rebuilt 2026-08-15 (Terry): figures lead, per the design
          // standard's proof-strip anatomy. The word-count entries (sectors,
          // jurisdictions) went; geography dropped from the strip entirely.
          // Every figure traces to published copy: $20bn+ from maExperience
          // case 01, 4 months from case 03 (Terry 2026-08-15: the sale-to-
          // separation figure is four months, not ten), 25+ years from
          // Anna's /about bio.
          proof: {
            items: [
              {
                id: 'rams',
                value: '$20bn+',
                detail: 'Mortgage portfolio acquisition, integration leadership',
              },
              {
                id: 'advice-separation',
                value: '4 months',
                detail: 'Sale to full operational separation of a major financial advice business',
              },
              {
                id: 'execution-track-record',
                value: '25+ years',
                detail: 'Financial-services transaction and transformation execution',
              },
            ],
          },
        },
        // Function 2 (spec §4). The key stays cmSection so the homepage
        // component contract is untouched; the content is now the function,
        // not the retired Capital Markets arm.
        cmSection: {
          label: 'Data, Transformation, AI',
          title: 'Data, Transformation, AI',
          proof: {
            items: [
              {
                id: 'data-program-recovery',
                value: '$84M',
                detail: 'Recovery and delivery of a failed financial markets data program',
              },
            ],
          },
          line:
            'Data platforms and the environments around them, transformation programs that follow a transaction or stand alone, and AI applied under the same governance as the rest of the delivery.',
        },
        // Poster band (spec §4): the two functions carry bronze ticks,
        // function 1 first, and the bronze foundation rule beneath them now
        // carries the four sectors. It used to carry DATA · TRANSFORMATION ·
        // AI, which became function 2's own name.
        arms: {
          items: [
            { id: 'ma', label: 'M&A TRANSACTION SERVICES', href: '/ma' },
            { id: 'data-ai', label: 'DATA, TRANSFORMATION, AI', href: '/data-ai' },
          ],
          underpinning: {
            items: ['CAPITAL MARKETS', 'BANKING', 'WEALTH', 'NBFIs'],
          },
        },
        // Primary credibility block (rev 5): one line per co-founder, no
        // employer names. Links to /about.
        founders: {
          label: 'Founders',
          title: 'Co-founders',
          items: [
            {
              id: 'anna-contos',
              name: 'Anna Contos',
              // "Transformation" drops from Anna's line (spec §4): the word
              // now names function 2.
              line: 'Transactions, Separation & Integration',
            },
            {
              id: 'terry-tsakiris',
              name: 'Terry Tsakiris',
              line: 'Data, Transformation, AI',
            },
          ],
          href: '/about',
          ctaLabel: 'About the co-founders',
        },
      },
    },

    ma: {
      route: '/ma',
      title: 'M&A Transaction Services — Atheryon',
      description:
        'M&A Transaction Services: transaction readiness, separation and integration strategy, execution leadership, and technology, data and migration readiness.',
      sections: {
        hero: {
          label: 'atheryon / ma',
          title: 'Making Transactions Executable',
          // Audience sentence, not a sector card list (spec §4).
          subtitle:
            'Advisory and execution leadership for acquisitions, divestments, separations and integrations, where execution risk can materially impact outcomes. Engaged across capital markets, banking, wealth and non-bank financial institutions.',
        },
        // The function's principle (Terry 2026-08-09: principles live with
        // the sub pages, not the homepage). Large type, founding framing.
        principle: {
          framing: 'Atheryon was founded on a simple observation:',
          statement:
            'Transaction value is protected when separation and integration requirements are understood early.',
          // The support line went on 2026-08-15 (Terry): it paraphrased the
          // statement directly above it, which is the whole point of a
          // pull-quote. The statement carries the idea once.
          support: '',
        },
        // Not rendered on /ma as of the 2026-08-15 MECE cut (landing is
        // offer then engage). Kept for git history; do not re-surface without
        // a fresh decision — it restated the principle and the four boxes.
        why: {
          label: 'Why Clients Choose Atheryon',
          title: 'Why Clients Choose Atheryon',
          paragraphs: [
            'Many organisations commit to a transaction without a clear view of the operational, technology, data and commercial requirements that delivery will demand.',
            'Execution risks then surface after the terms are agreed, when the options for dealing with them have narrowed. Costs increase, timelines extend, and value is delayed or lost.',
          ],
        },
        lines: {
          label: 'Service Lines',
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
                'Operational, technology, data and organisational requirements can materially influence a transaction outcome. We surface them while the terms are still open.',
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
                'Strategies that hold up in delivery, aligning the commercial objective with what the business can operationally sustain.',
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
                'Senior leadership held across the transaction, for the moments where execution certainty decides whether the intended outcome arrives.',
            },
            {
              id: 'technology-data-migration',
              index: '04',
              name: 'Technology, Data & Migration Readiness',
              tagline:
                'Planning for the information, technology and migration work that often decides whether a transaction lands.',
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
                'Data is one of the largest drivers of separation and integration effort. What exists, where it sits and what has to move shapes execution timelines, TSA scope and the value that survives the transaction. Atheryon works this out using data-enabled and AI-assisted techniques, with senior specialists directing the work.',
            },
          ],
        },
        // Rev 7: the three transaction workflows relocated here from
        // /capital-markets ("do not mix capital markets with transaction").
        // Rendered as collapsed secondary detail under service line 04.
        // Items ported verbatim from the superseded v2 M&A generation, which
        // was deleted on 2026-08-12 once this was its only surviving content.
        workflows: {
          summary: 'Three transaction workflows',
          subline: 'Inputs, AI agents, processing and outputs',
          intro:
            'Three points in a transaction where the operational answer arrives too late to be useful: before signing, through planning, and across the TSA period. Each workflow runs the same way, from the deal inputs available at that stage through to a deliverable the transaction can be governed against. Senior specialists direct the work, review every output and own the result.',
          stages: ['Input', 'AI agents', 'Processing', 'Output'] as const,
          items: [
            {
              id: 'pre-sign-execution-review',
              name: 'Pre-Sign Execution Review',
              input:
                'Draft SPA and transitional services terms, proposed perimeter, entity and product footprint, application and data landscape, current control environment.',
              agents:
                'Mapping deal clauses to the operational obligations they create; projecting the TSA schedule the perimeter implies; testing where regulatory and control continuity breaks at separation.',
              processing:
                'Execution risk register → stranded cost and dependency exposure → mitigations costed and assigned → position for negotiation.',
              output:
                'An execution risk assessment the deal team can act on: what the perimeter will cost to separate, which risks belong in price, warranties or conditions precedent, and which need a mitigation owner before signing.',
            },
            {
              id: 'separation-integration-planning',
              name: 'Separation & Integration Planning',
              input:
                'Signed terms and agreed perimeter, target operating model, TSA service schedules, functional and technology dependency inventories.',
              agents:
                'Tracing dependencies across entities, applications and data; sequencing work into cutover windows the business can absorb; deriving what has to be true on Day 1; mapping data lineage through migration.',
              processing:
                'Dependency map → sequenced separation plan → Day 1 readiness criteria by function → migration and cutover approach.',
              output:
                'A plan the transaction can be run against: what stands up on Day 1, what runs on a TSA and for how long, what has to be built to exit each service, and the migration sequence with lineage tracked field by field.',
            },
            {
              id: 'tsa-tracking-reduction',
              name: 'TSA Tracking & Exit',
              input:
                'Executed service schedules and charges, exit criteria, extension terms and reverse TSAs, standalone build progress by function.',
              agents:
                'Testing which services can exit and which are held up by a dependency elsewhere; projecting exit dates against the standalone build; flagging scope and charges drifting beyond the schedule; verifying the receiving controls before an exit is signed off.',
              processing:
                'Service register → exit sequence by dependency → extension and stranded cost exposure → position for the Steering Committee.',
              output:
                'A TSA exit plan with a gate per service: what has to be operational to exit it, who owns that, what an extension costs if the date moves, and evidence of control transfer at closure.',
            },
          ],
        },
        // Commercial shape decided 2026-08-09 (spec §8.3): embedded model
        // kept, stated durations dropped.
        engagement: {
          label: 'How We Engage',
          title: 'How we engage',
          body:
            'Atheryon engages as embedded senior specialists, working alongside your team from pre-sign review through Day 1 to operational independence and TSA exit. Pre-sign work can stand alone or lead into full delivery.',
        },
        // "How we work" (five values: Early Insight, Commercial Discipline,
        // Execution Focus, Leadership Under Pressure, Trusted Partnership)
        // was removed on 2026-08-15 (Terry): the five were the Why bullets
        // and the service lines again with softer nouns. Recoverable in git
        // history if a values section is ever wanted on its own page.
      },
    },

    maExperience: {
      route: '/ma/experience',
      title: 'M&A Experience — Atheryon',
      description:
        'Representative transaction and transformation experience across financial services, led by Atheryon and its principals.',
      sections: {
        hero: {
          label: 'atheryon / ma / experience',
          title: 'Representative Experience',
          subtitle:
            'Selected transactions and transformations across financial services.',
        },
        cases: {
          label: 'Selected Cases',
          title: 'Selected cases',
          provenance:
            'Representative experience spans Atheryon engagements and programs led by Atheryon principals in prior senior roles.',
          items: [
            {
              id: 'mortgage-portfolio-acquisition',
              index: '01',
              name: 'Landmark Mortgage Portfolio Acquisition',
              client: 'Specialist Mortgage Servicer',
              engagement: 'Integration Leadership',
              details: [
                {
                  label: 'Context',
                  body:
                    'A landmark transaction valued at more than $20 billion at signing and recognised as one of the largest loan portfolio acquisitions in Australian history. The transaction involved compressed delivery timeframes, complex separation requirements, multiple service providers, significant operational dependencies and no seller TSA arrangements.',
                },
                {
                  label: 'Role',
                  body:
                    'Atheryon leadership played a key role in the transition and integration of the mortgage portfolio acquisition.',
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
                  body: 'Divestment and integration programs at a major Australian bank.',
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
                    'Completed the sale and full operational separation within four months, with minimal transitional arrangements.',
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
        // Content separation (rev 7, renamed by the functions spec §1): the
        // two functions' experience does not share a page. The three cmCases
        // render on /data-ai/experience; this page carries transactions only.
      },
    },

    maApproach: {
      route: '/ma/approach',
      title: 'M&A Approach — Atheryon',
      description:
        'Method and governance across the transaction lifecycle: pre-sign insight, Day 1 readiness, and the path to operational independence and TSA exit.',
      sections: {
        hero: {
          label: 'atheryon / ma / approach',
          title: 'Our Approach',
          subtitle: 'Method and governance across the transaction lifecycle.',
        },
        lifecycle: {
          label: 'Lifecycle',
          title: 'From pre-sign to operational independence',
          body:
            'Atheryon works across three stages of the transaction lifecycle. Before signing, we review the transaction for execution risk so commercial terms reflect operational reality. From signing, we lead readiness for Day 1 and the early period of operation. Beyond Day 1, we manage the path to operational independence and TSA exit.\n\nThe earlier the engagement begins, the more options remain open. Pre-sign work shapes the agreement itself; post-sign work protects the value already committed. Transformation work draws on the same data and AI foundation that underpins both functions.',
        },
        governance: {
          label: 'Governance',
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
          label: 'Positioning',
          title: 'What Atheryon is',
          statement:
            'Atheryon is a specialist advisory firm helping organisations understand and execute complex transactions, transformations and technology-driven change where operational, technology and data dependencies materially impact outcomes.',
          audience:
            'We work with Boards, executive teams, investors, private equity sponsors and corporate development teams.',
        },
        story: {
          label: 'Our Story',
          title: 'Our story',
          body:
            'Anna Contos spent more than two decades leading major separation, integration and transformation programs and watched the same pattern repeat: commercial decisions made before operational implications were fully understood. Together with Terry Tsakiris, she established Atheryon to bring that understanding into the process earlier.\n\nWe help clients understand what a transaction or transformation will require before decisions are locked in. When execution begins, we provide the leadership needed to navigate complexity and deliver the intended outcomes. A signed deal is only the start; success is operational independence, value realised and outcomes delivered.',
        },
        // Bios genericised per rev 5 §1 (Brief 2): no named employers; the
        // "global investment banking" / "major Australian banks" register.
        // Facts sourced from the earlier signed-off material. The mortgage
        // portfolio acquisition on /ma/experience was de-named and rounded
        // to "more than $20 billion" (Terry, 2026-08-10).
        founders: {
          label: 'Co-Founders',
          title: 'Co-founders',
          items: [
            {
              id: 'anna-contos',
              name: 'Anna Contos',
              role: 'Co-Founder, M&A Transaction Services',
              photo: '/anna-contos.jpg',
              photoWidth: 533,
              photoHeight: 800,
              paragraphs: [
                'Anna Contos co-founded Atheryon and leads M&A Transaction Services. She brings more than 25 years in financial-services execution across Australia, the UK and the US, with the recent two decades focused on separations, integrations, divestments and large-scale transformation.',
                'Anna has led separation and integration advisory at executive level for one of Australia’s major banks, spanning its divestment and acquisition initiatives, and previously headed divestment execution for the wealth division of another major Australian bank, running the portfolio of programs that delivered a landmark financial-advice divestment and the sale of a major insurance business. Earlier roles include platform take-to-market leadership and business consulting and strategy positions across global investment banking, wealth and retail.',
                'Her track record spans the deal lifecycle in highly regulated and politically sensitive environments: separation and integration strategy, planning, commercial structuring, business readiness, execution and stabilisation, including carve-outs, demergers and end-to-end transition management.',
              ],
              linkedin: 'https://www.linkedin.com/in/anna-contos-7685a7/',
            },
            {
              id: 'terry-tsakiris',
              name: 'Terry Tsakiris',
              role: 'Co-Founder, Data, Transformation, AI',
              photo: '/terry-tsakiris.jpg',
              photoWidth: 400,
              photoHeight: 400,
              // First person (Terry 2026-08-15): the copy rule gives Terry his
              // own voice on /about and /labs, and this bio was still third
              // person. Employers stay genericised — home.spec.ts asserts that
              // no bank is named anywhere on the page.
              paragraphs: [
                'I co-founded Atheryon and lead Data, Transformation, AI. I have spent more than two decades engineering core data infrastructure, front-office risk systems and data platforms inside global investment banks and major Australian banks.',
                'I built a bank’s first near-real-time front-office risk system and a global P&L attribution platform across fixed income, equities, FX and rates. I owned a markets operational data store powering regulatory trade reporting, MiFID II and trade surveillance. I also rescued a distressed $84M data program at a major Australian institutional bank, standing up a data products capability that delivered ten times faster than the bank’s prior baseline.',
                'At Atheryon I direct the data, transformation and AI function: capital markets systems, data platforms, separation and migration analysis, and the AI-assisted delivery methods used across both functions.',
              ],
              linkedin: 'https://www.linkedin.com/in/terencetsakiris/',
            },
          ],
        },
      },
    },

    // Function 2 (Terry 2026-08-15, functions-and-sectors spec §4). This was
    // the shared-foundation page; it is now the function-2 landing and has
    // absorbed the retired /capital-markets arm. The markets service lines
    // below are that arm's approved copy, reframed as published depth in one
    // sector rather than as the function's name. Display order follows spec
    // §4 + MECE 2026-08-15: banner, principle, markets depth boxes, three
    // related links (Labs from depth.links, M&A + supply chain from arms).
    // Discipline grid and the "Where it shows up" index are not rendered.
    dataAi: {
      route: '/data-ai',
      title: 'Data, Transformation, AI — Atheryon',
      description:
        'Data, Transformation, AI: data platforms, transformation programs and AI-assisted delivery across capital markets, banking, wealth and non-bank financial institutions.',
      sections: {
        hero: {
          label: 'atheryon / data-ai',
          title: 'Data, Transformation, AI',
          // Audience sentence, not a sector card list (spec §4).
          subtitle:
            'Technology, data and transformation programs across capital markets, banking, wealth and non-bank financial institutions.',
        },
        // The function's principle. Reworked twice on 2026-08-15: first to
        // drop the motherhood statement, then to stop typecasting the
        // function as surveillance. Regulatory examination still grounds it;
        // surveillance stays in the markets-depth line, not the lead.
        principle: {
          framing: '',
          statement:
            'Data programs in regulated businesses have to produce the evidence an examination will ask for. Atheryon has delivered those platforms and has led APRA engagement at executive level.',
          support: '',
        },
        // Discipline grid not rendered on /data-ai (MECE 2026-08-15). Kept
        // for git history; the landing is boxes + three links.
        operatingModel: {
          label: 'Operating Model',
          title: 'How the function works',
        },
        data: {
          label: 'Data',
          title: 'Data',
          body:
            'The work starts with understanding what information exists, where it resides, how it is used and what must transition. Standalone that becomes data platforms, market data environments and reference data. Inside a transaction the same understanding drives execution timelines and TSA scope.',
        },
        transformation: {
          label: 'Transformation',
          title: 'Transformation',
          body:
            'Transformation follows a transaction or stands alone as a technology and data program, and it draws on the same data and AI foundation either way.',
        },
        ai: {
          label: 'AI',
          title: 'AI',
          body:
            'AI sits inside the work, never in front of it. Atheryon applies data-enabled and AI-assisted techniques under the same governance as the rest of the delivery, with senior specialists directing the work and owning the outcome. Reference implementations run on Microsoft Azure, and Atheryon is a Microsoft partner.',
        },
        // Published depth in one sector (spec §4.4). Ported unchanged from
        // the retired /capital-markets arm: council build 2026-08-10, from
        // cited production passages, claims-gated (no counts, no named
        // entities, no speed claims). Do not retitle these as banking,
        // wealth or NBFI lines, and do not invent parallel catalogues.
        lines: {
          label: 'Markets Depth',
          title: 'Published depth: capital markets',
          intro:
            'The deepest published record of this function is in capital markets. The same disciplines are engaged across banking, wealth and non-bank financial institutions.',
          items: [
            {
              id: 'capital-markets-systems-platform-delivery',
              index: '01',
              name: 'Capital Markets Systems & Platform Delivery',
              tagline:
                'Designing and delivering the systems a markets business runs on, from trading and risk through to operations and reporting.',
              items: [
                'Trading, risk, pricing and operations system delivery',
                'Trade lifecycle automation and confirmation matching',
                'Exception management and ageing analysis',
                'Portfolio analytics and P&L attribution',
                'Platform transition and application rationalisation',
              ],
              body:
                'A markets business runs on connected systems: pricing and risk on the desk, confirmation and settlement behind it. Analytics and reporting sit across the whole book. Atheryon designs and delivers these platforms for financial institutions, covering the trade lifecycle from execution through confirmation and settlement to the daily risk and P&L view.\n\nDelivery is senior-led from design through to production.',
            },
            {
              id: 'market-reference-data-environments',
              index: '02',
              name: 'Market Data & Reference Data Environments',
              tagline:
                'Building market data and reference data environments where every feed is typed and validated on arrival, with lineage back to its source.',
              items: [
                'Market data environment design and build',
                'Reference data platforms, static and dynamic',
                'Vendor and counterparty feed onboarding',
                'Typed payload mapping and validation on ingest',
                'Field-level lineage from origin through every transformation',
                'Alignment with industry conventions such as ISO 20022 and FpML',
              ],
              body:
                'Market data and reference data change constantly, and downstream systems inherit every inconsistency in them. Atheryon builds environments where each source feed is mapped to typed payloads on ingest and validated against industry conventions such as ISO 20022 and FpML. Field-level lineage is tracked from origin through every transformation.\n\nThe result is a data environment downstream teams can rely on without re-deriving where each number came from.\n\nAtheryon is a delivery partner to S&P Global, with integration work on TeraHelix.',
            },
            {
              id: 'data-platform-foundation',
              index: '03',
              name: 'Data Foundations',
              tagline:
                'Rebuilding the operational data foundation that every new markets build depends on.',
              items: [
                'Operational data store design and build',
                'Canonical data model design and governance',
                'Remediation of vendor-locked and untyped pipelines',
                'Data quality scoring and monitoring',
                'Reconciliation and break management',
                'Schema governance as the model changes',
              ],
              body:
                'An operational data store assembled over a decade of vendor-locked, partially typed pipelines taxes every new initiative before it starts: mapping and reconciliation effort is paid again on each build. Atheryon rebuilds that foundation as a typed and validated operational data store built around a canonical model. Data quality is scored feed by feed, with reconciliation designed in.\n\nThe hardest problem in a data platform is keeping the model the business signs off aligned with the model the system enforces. The foundation work is structured around exactly that.',
            },
            {
              id: 'regulatory-markets-platforms',
              index: '04',
              name: 'Regulatory Markets Platforms',
              tagline:
                'Delivering the platforms behind regulatory reporting and trade surveillance, with the records to evidence both.',
              items: [
                'Regulatory trade reporting across regimes including EMIR Refit, MiFID II, ASIC and CFTC',
                'Per-regime completeness and validation rules',
                'Submission workflows and evidence chains',
                'Trade surveillance data foundations',
                'Auditable evidence records for every submission',
                'Managing schema drift across reporting regimes',
              ],
              body:
                'Reporting obligations multiply by regime, and each regime tends to absorb its own build team while schema drift quietly breaks submissions. Atheryon delivers reporting platforms where every trade is scored against per-regime completeness rules and each report is generated in the regime\'s prescribed format.\n\nThe design principle comes from how these platforms are examined: an audit asks for the evidence chain behind each submission, covering what was reported, what changed, who approved it and when. Surveillance sits on the same data foundation, so the evidence exists as a by-product of the workflow rather than a reconstruction after the fact.',
            },
          ],
        },
        // Full platform-depth index not rendered on /data-ai (MECE 2026-08-15).
        // The Labs entry still supplies the note for the three related links.
        depth: {
          label: 'Platform Depth',
          title: 'Platform depth',
          intro:
            'The function maintains a working reference implementation of a capital markets platform, built with the same method it offers clients. The linked pages carry the technical depth. A deeper briefing, covering deployment topology and operational evidence, is available under MNDA.',
          links: [
            { label: 'System', href: '/system', note: 'Reference architecture for data, workflow, control and audit design' },
            { label: 'Labs', href: '/labs', note: 'The working platform and the method that built it' },
            { label: 'Themes', href: '/themes', note: 'Where the work applies, mapped by banking function' },
            { label: 'Offers', href: '/offers', note: 'Licensing and consulting paths for the platform and the method behind it' },
          ],
        },
        // M&A + supply chain notes reused on the landing as two of the three
        // related links (with Labs). Title not rendered — it was a third index.
        arms: {
          label: 'Where else it shows up',
          title: 'Where else it shows up',
          links: [
            { label: 'M&A Transaction Services', href: '/ma#technology-data-migration', note: 'The same technique inside a transaction, as service line 04' },
            { label: 'Supply Chain', href: '/data-ai/supply-chain', note: 'The function applied to physical operations, with a focus on pharmaceutical and health supply chains' },
          ],
        },
      },
    },

    // Supply chain practice page (Terry 2026-08-15): the Data & AI foundation
    // applied to physical operations, aimed at regulated health and
    // pharmaceutical supply chains. Positioning kept generic by decision (no
    // target-company names). History sourced from Terry's CV and
    // bluestarglobal.com.au; the family business is referenced generically by
    // decision (no company name, no role claims beyond "grew up in and worked
    // in"). NOTE: this page spends its one permitted corrective contrast in
    // the parallel section's lead sentence — do not add another.
    dataAiSupplyChain: {
      route: '/data-ai/supply-chain',
      title: 'Supply Chain — Atheryon',
      description:
        'Supply chain work on the Atheryon Data & AI foundation: business process re-engineering and governed AI for regulated sectors, including pharmaceutical and health.',
      sections: {
        hero: {
          label: 'atheryon / data-ai / supply-chain',
          title: 'Supply Chain',
          subtitle:
            'The Data & AI foundation applied to physical operations, with a particular focus on pharmaceutical and health supply chains.',
        },
        work: {
          label: 'The Work',
          title: 'Supply chain programmes are process and data programmes',
          body:
            'A supply chain runs on events the way a trading floor does. Purchase orders, goods receipts, stock movements and dispatches are raised in one system and consumed in another, and the operational questions that matter, starting with what is held and where, can only be answered when those systems agree. In most organisations they do not, and the disagreement is expensive. Safety stock is held to cover uncertainty that better data would remove, and product is written off because nobody saw it age.\n\nThe discipline this calls for is business process re-engineering with a data spine: map the physical flow, map the information flow beside it, close the gaps between the two, then automate what the re-engineered process supports. That discipline predates the current vocabulary of supply chain analytics. Atheryon’s principal has been applying it since the 1990s.',
        },
        history: {
          label: 'Where It Started',
          title: 'A history in physical operations',
          entries: [
            {
              name: 'Family logistics',
              body:
                'Atheryon’s principal, Terence Tsakiris, grew up in and worked in the family freight and logistics business his parents founded in Melbourne in 1987. Freight teaches the fundamentals early: goods arrive on time and intact, or the customer is on the phone.',
            },
            {
              name: 'Factory automation',
              body:
                'He trained as a mechanical engineer (BEng, Swinburne University), then founded Melbourne Systems Engineering, a start-up that automated factories. He led a company-wide business process re-engineering programme at a manufacturer and designed a high-precision automated assembly machine for Siemens. He also re-implemented the ISO9000 quality system that kept a client’s ratings in force.',
            },
            {
              name: 'National retail',
              body:
                'At ColesMyer, at the time Australia’s largest retailer, he managed risk on a programme that implemented GST overnight across 500 locations.',
            },
            {
              name: 'Regulated markets',
              // The AUD 16.5 billion is the fund's money under management and
              // belongs to the superannuation engagement alone (Terry,
              // 2026-08-15). It sits in its own sentence so the programmes
              // listed after it do not read as carrying that figure. An
              // earlier draft also put regulatory programmes "at the $70
              // million scale"; that number had no source and is gone.
              body:
                'More than two decades in financial services followed. He led organisation-wide process re-engineering for a superannuation fund managing AUD 16.5 billion in members’ money, and delivered near real-time risk platforms, automated trade surveillance and regulatory programmes inside major banks.',
            },
          ],
        },
        parallel: {
          label: 'The Parallel',
          title: 'Re-engineering under physical constraints',
          lead:
            'Atheryon does not claim a career of supply chain advisory; it claims a tested method. Supply chain transformation is business process re-engineering under physical constraints, and the record above demonstrates that discipline repeatedly.',
          entries: [
            {
              name: 'Traceability',
              body:
                'Trade surveillance and regulatory reporting are traceability problems: every event evidenced, every change attributable to a person and a time. Batch tracking and serialisation in pharmaceutical distribution demand the same evidence chain.',
            },
            {
              name: 'Live visibility',
              body:
                'A near real-time risk system exists to answer one question: what is the position now. Stock, in transit and on shelf, is a position.',
            },
            {
              name: 'Regulated delivery',
              body:
                'Pharmaceutical and health supply chains carry regulatory obligation through every movement of product. Atheryon’s platform work is built for examination, with the evidence chain designed in rather than reconstructed for the audit.',
            },
          ],
        },
        services: {
          label: 'Services',
          title: 'What Atheryon takes on',
          items: [
            'Supply chain data foundations: feeds from ERP, warehouse, transport and point-of-sale systems typed and validated on arrival, with lineage to source',
            'A reconciled view of stock position and movement across sites and systems',
            'Planning and replenishment processes re-engineered around data the business can trust',
            'Traceability and evidence chains for regulated product',
            'AI-assisted demand forecasting and exception management, governed like the rest of the delivery',
          ],
          closing: 'Delivery is senior-led from design through to production.',
        },
      },
    },

    // Firm-level pages: one experience and one approach, both functions
    // stacked in function order (spec §4). Full CRO / method copy lives here;
    // the function-path copies stay until Task 5 301s them away.
    experience: {
      route: '/experience',
      title: 'Experience — Atheryon',
      description: 'Representative experience across both functions: transaction execution, and data, transformation and AI delivery.',
      sections: {
        hero: {
          label: 'atheryon / experience',
          title: 'Experience',
          subtitle: 'Representative experience across both functions.',
        },
        arms: [
          { id: 'ma', label: 'M&A Transaction Services', sourceKey: 'maExperience' },
          { id: 'data-ai', label: 'Data, Transformation, AI', sourceKey: 'cmExperience' },
        ],
      },
    },

    approach: {
      route: '/approach',
      title: 'Approach — Atheryon',
      description: 'How each function works: method and governance for transactions, embedded delivery for data, transformation and AI programs.',
      sections: {
        hero: {
          label: 'atheryon / approach',
          title: 'Approach',
          subtitle: 'How each function works.',
        },
        arms: [
          { id: 'ma', label: 'M&A Transaction Services', sourceKey: 'maApproach' },
          { id: 'data-ai', label: 'Data, Transformation, AI', sourceKey: 'cmApproach' },
        ],
      },
    },

    contact: {
      route: '/contact',
      title: 'Contact — Atheryon',
      description: 'Talk to Atheryon: M&A transactions or capital markets technology and data programs.',
      sections: {
        // /contact carries the form itself as of 2026-08-15 (Terry). It used
        // to fork to the two arms' contact pages, which put a page between
        // the visitor and the form and could not address Data & AI at all.
        // The arm contact pages stay: inside an arm the header CTA still
        // deep-links there, and the practice is preset rather than asked.
        hero: {
          label: 'atheryon / contact',
          title: 'Contact',
          body: 'Enquiries are treated as confidential.',
        },
        disclosure: contactDisclosure,
      },
    },

    maContact: {
      route: '/ma/contact',
      title: 'Contact — M&A — Atheryon',
      description: 'Talk to the M&A arm about a transaction or transformation.',
      sections: {
        hero: {
          label: 'atheryon / ma / contact',
          title: 'Contact',
          body: 'Tell us about the transaction or transformation you are considering. Enquiries are treated as confidential.',
        },
        disclosure: contactDisclosure,
      },
    },

    // Function-2 sub-pages. The cm* key names are kept so the component
    // contracts stay put (spec §1 permits this); the routes and copy are
    // function 2's.
    cmContact: {
      route: '/data-ai/contact',
      title: 'Contact — Data, Transformation, AI — Atheryon',
      description: 'Talk to Atheryon about a technology, data or transformation program.',
      sections: {
        hero: {
          label: 'atheryon / data-ai / contact',
          title: 'Contact',
          body: 'Tell us about the technology, data or transformation program you are considering. Enquiries are treated as confidential.',
        },
        disclosure: contactDisclosure,
      },
    },

    cmExperience: {
      route: '/data-ai/experience',
      title: 'Experience — Data, Transformation, AI — Atheryon',
      description: 'Delivery experience: program recovery, front office risk, regulatory platforms.',
      sections: {
        hero: {
          label: 'atheryon / data-ai / experience',
          title: 'Experience',
          subtitle: 'Selected delivery, led by Atheryon principals in prior senior roles.',
        },
        cases: {
          label: 'Selected Cases',
          title: 'Selected cases',
          items: cmCases,
        },
      },
    },

    cmApproach: {
      route: '/data-ai/approach',
      title: 'Approach — Data, Transformation, AI — Atheryon',
      description: 'How the function delivers: embedded senior specialists and AI-assisted delivery patterns.',
      sections: {
        hero: {
          label: 'atheryon / data-ai / approach',
          title: 'Our Approach',
          subtitle: 'How the function delivers.',
        },
        // The three delivery patterns (Appendix C) in place of the
        // relocated transaction workflows.
        examples: {
          label: 'Delivery Examples',
          title: 'Delivery examples',
          items: [
            {
              id: 'program-recovery',
              name: 'Program recovery',
              body: 'Re-baseline a stalled data platform, restore delivery, hand to BAU.',
            },
            {
              id: 'risk-and-market-data',
              name: 'Front office risk and market data',
              body: 'Near real-time risk builds with the market data function to sustain them.',
            },
            {
              id: 'data-product-acceleration',
              name: 'Data product acceleration',
              body: 'Modelling, engineering and governance set up to ship at multiples of prior speed.',
            },
            // Council build 2026-08-10 (sourced from the prod reference
            // system's reporting workflow; the arm's case 03 proves it).
            {
              id: 'regulatory-reporting',
              name: 'Regulatory reporting',
              body: 'The arm stands up trade reporting across regulatory regimes: validation against each regime’s rules and submissions in the prescribed format, with an audit trail behind every report.',
            },
          ],
        },
        // Council build 2026-08-10: method principles ported from the
        // production reference-platform material, rewritten to the house
        // register and claims-gated (no counts, no named entities).
        method: {
          label: 'How The Work Is Directed',
          title: 'How the work is directed',
          intro: 'Five principles govern how the arm’s senior specialists direct AI-assisted delivery.',
          principles: [
            {
              name: 'Controls come first',
              body: 'The work starts with the regulatory obligation and the operational control rather than a feature list. Controls determine what gets built; screens follow.',
            },
            {
              name: 'The data model is the contract',
              body: 'Delivery starts from the product and event model, and every screen is a projection of it.',
            },
            {
              name: 'Generate variants, then narrow them',
              body: 'AI produces several candidate implementations for each piece of work. Senior capital-markets judgement rejects the weak ones and corrects what remains before anything ships.',
            },
            {
              name: 'Every surface is traceable',
              body: 'Each delivered surface must map to a banking function and an operating control. If it cannot be mapped, it does not ship.',
            },
            {
              name: 'The deliverable is working software',
              body: 'Engagements end in systems a client team can inspect and extend, with the decisions behind them on record.',
            },
          ],
        },
        delivery: {
          label: 'Embedded Delivery',
          title: 'Embedded delivery',
          body:
            'Delivery is embedded: senior specialists alongside your team, with AI agents running on Atheryon infrastructure and outputs surfacing in your tools. The operational-controls baseline is APRA CPS 234-aligned, and every agent decision lands in an auditable archive that can be replayed.\n\nAgents generate candidate outputs against the agreed data model; a senior capital-markets specialist reviews each one, selects the strongest, edits it where judgement is required, and signs it off before it reaches a client system.',
        },
        // Council build 2026-08-10: the arm's three engagement paths,
        // ported from the production offers and select-engagements posture.
        engage: {
          label: 'How The Arm Engages',
          title: 'How the arm engages',
          intro: 'The arm engages through three paths.',
          paths: [
            {
              name: 'Advisory assessment',
              body: 'A senior-led review of a platform or a data program, producing a clear read of dependencies and execution risk. The assessment stands alone or leads into delivery.',
            },
            {
              name: 'Embedded delivery program',
              body: 'Senior specialists work alongside the client team and lead the program end to end, under the delivery controls described on this page.',
            },
            {
              name: 'Platform licensing',
              body: 'The working reference implementation and its supporting material can be licensed; the arm’s depth pages carry the detail.',
            },
          ],
        },
      },
    },
  },
} as const

export type V2 = typeof v2

export type V3 = typeof v3
