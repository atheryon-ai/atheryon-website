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

    programs: {
      title: 'Programs — Atheryon',
      description: 'Industry IP programs for AI agents — bootstrap a market-platform prototype with your AI agent in days.',
      hero: {
        headline: 'Industry IP for AI agents',
        subheadline: 'Atheryon Market-in-a-Box (MiB) programs hand you agent-ready IP — prompts, schemas, designs, and reference architectures — so your AI agent can bootstrap a market-platform prototype in days.',
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
      title: 'MiB Insight Program — Atheryon',
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
        { label: 'Approach', href: '/approach' },
        { label: 'Engagements', href: '/engagements' },
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
          // Tiers rendered from canonical v2.engagement via <EngagementModel />.
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
              detail: '',
            },
            {
              id: 'ai-agent-orchestration-layer',
              name: 'AI Agent Orchestration Layer',
              detail: '',
            },
            {
              id: 'capital-markets-systems-layer',
              name: 'Capital Markets Systems Layer',
              detail: '',
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
          body: '{{PENDING_SYSTEM_DATAFLOW_BODY}}',
        },
        aiAgentLayer: {
          label: '§03 / AI Agent Layer',
          title: 'AI Agent Layer',
          body: '{{PENDING_SYSTEM_AIAGENT_BODY}}',
        },
        workflowExamples: {
          label: '§04 / Workflow Examples',
          title: 'Workflow examples',
          items: [
            'trade lifecycle automation',
            'risk reporting generation',
            'portfolio analytics pipeline',
            'financial data ingestion workflow',
          ],
        },
        deploymentModel: {
          label: '§05 / Deployment Model',
          title: 'Deployment model',
          body: '{{PENDING_SYSTEM_DEPLOYMENT_BODY}}',
        },
        proofArtifacts: {
          label: '§06 / Proof Artifacts',
          title: 'Proof artifacts',
          // Directive transcribed verbatim; body awaits user prose.
          directive:
            'Reference system described as a working architecture (not screenshots or UI gallery).',
          body: '{{PENDING_SYSTEM_PROOF_ARTIFACTS_BODY}}',
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
            input: '{{PENDING_WORKFLOW_TRADE_INPUT}}',
            agents: '{{PENDING_WORKFLOW_TRADE_AGENTS}}',
            processing: '{{PENDING_WORKFLOW_TRADE_PROCESSING}}',
            output: '{{PENDING_WORKFLOW_TRADE_OUTPUT}}',
          },
          {
            id: 'risk-reporting-generation',
            label: '§02',
            name: 'Risk reporting generation',
            input: '{{PENDING_WORKFLOW_RISK_INPUT}}',
            agents: '{{PENDING_WORKFLOW_RISK_AGENTS}}',
            processing: '{{PENDING_WORKFLOW_RISK_PROCESSING}}',
            output: '{{PENDING_WORKFLOW_RISK_OUTPUT}}',
          },
          {
            id: 'portfolio-analytics-pipeline',
            label: '§03',
            name: 'Portfolio analytics pipeline',
            input: '{{PENDING_WORKFLOW_PORTFOLIO_INPUT}}',
            agents: '{{PENDING_WORKFLOW_PORTFOLIO_AGENTS}}',
            processing: '{{PENDING_WORKFLOW_PORTFOLIO_PROCESSING}}',
            output: '{{PENDING_WORKFLOW_PORTFOLIO_OUTPUT}}',
          },
          {
            id: 'financial-data-ingestion-and-structuring',
            label: '§04',
            name: 'Financial data ingestion and structuring',
            input: '{{PENDING_WORKFLOW_DATA_INPUT}}',
            agents: '{{PENDING_WORKFLOW_DATA_AGENTS}}',
            processing: '{{PENDING_WORKFLOW_DATA_PROCESSING}}',
            output: '{{PENDING_WORKFLOW_DATA_OUTPUT}}',
          },
          {
            id: 'research-summarisation-workflow',
            label: '§05',
            name: 'Research summarisation workflow',
            input: '{{PENDING_WORKFLOW_RESEARCH_INPUT}}',
            agents: '{{PENDING_WORKFLOW_RESEARCH_AGENTS}}',
            processing: '{{PENDING_WORKFLOW_RESEARCH_PROCESSING}}',
            output: '{{PENDING_WORKFLOW_RESEARCH_OUTPUT}}',
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

export type V2 = typeof v2
