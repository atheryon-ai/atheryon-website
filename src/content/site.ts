export const site = {
  name: 'Atheryon',
  tagline: 'Decision-grade data platforms for regulated markets.',
  email: 'info@atheryon.com.au',

  nav: [
    { label: 'Reality', href: '/reality' },
    { label: 'Data', href: '/data' },
    { label: 'AI Direction', href: '/ai-direction' },
    { label: 'Transformation', href: '/transformation' },
    { label: 'Labs', href: '/labs' },
    { label: 'About', href: '/about' },
  ],

  // Services dropdown items (used in Header)
  servicesNav: [
    { label: 'Data', href: '/data' },
    { label: 'AI Direction', href: '/ai-direction' },
    { label: 'Transformation', href: '/transformation' },
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
      title: 'Atheryon Labs — Banking AI platform from the S&P TeraHelix integration partner',
      description: 'A working CDM-native banking reference platform, built by one capital-markets expert directing AI. Buy the code. License the prompts. Engage the builder.',
      hero: {
        headlineLine1: 'Atheryon Labs',
        headlineLine2: 'The banking platform built by AI.',
        body: 'Atheryon Labs is a working CDM-native banking reference platform built by one capital-markets expert directing AI. It demonstrates how complex financial data can be modelled, linked, structured, and turned into usable banking software.',
        primaryCta: { label: 'See it live', href: 'https://labs.atheryon.ai' },
        secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
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
            oneLiner: 'Senior-led delivery under your AI banner in regulated finance.',
            anchorHref: '#advisory',
          },
        ],
      },
      evidence: {
        badge: 'At a glance',
        title: 'What was built, how fast',
        statsItems: [
          { value: '8', label: 'banking functions covered' },
          { value: '1', label: 'CDM data model — ISDA-compliant, end to end' },
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
              bankerCorrected: 'Goldman SecDB taught the opposite: extend when the concept is genuinely a CDM concept with one more attribute; wrap when the concept is a bank-internal artefact that happens to reference CDM. The schema editor encodes both modes, and the rule for choosing.',
            },
          },
        ],
      },
      bankerWedge: {
        badge: 'Why a banker beats a consultancy at this',
        title: 'AI in regulated finance needs the rare expert in the loop',
        intro: 'AI labs competing with the global SIs in regulated verticals run into the same wall: the model is plausible, the domain judgement is missing. Here are two corrections — small on the surface, structural underneath — that prove why the loop matters.',
        photo: '/labs/terry-headshot.jpg',
        photoAlt: 'Terry Tsakiris',
        bio: "I'm Terry Tsakiris. At Credit Suisse I built the bank's first near-real-time front-office risk system, then a global P&L Attribution platform across Fixed Income, Equities, FX and Rates. At Commonwealth Bank I owned the Markets Operational Data Store powering Regulatory Trade Reporting, MiFID II, and Trade Surveillance. At Westpac Institutional Banking I rescued a distressed $84M data programme and stood up a Data Products capability that delivered ten times faster than the bank's prior baseline — the same compression AI labs need to compete with the consultancies that defended that baseline. Atheryon is a Microsoft partner and S&P Global partner; the platform is the next iteration of that method, paired with AI.",
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
            body: 'Where most AI demos start "as a user I want…", this started with the regulatory artefact, the operational control, the risk view. Controls drive surfaces; surfaces do not drive controls.',
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
          heading: 'What this method displaces',
          body: 'A tier-1 systems integrator scopes a regulated-banking platform as a multi-year, eight-figure engagement — armies of analysts running discovery, change requests, and reconciliation cycles. The five rules above are the operating system that compresses that scope into weeks. This is the licensable asset: not the model on the other side of the chat, but the directorial track that makes the model ship.',
        },
        artifact: {
          heading: 'One real prompt, one real correction',
          promptShown: '{{TERRY_PROMPT_EXAMPLE_PROMPT}}',
          correctionShown: '{{TERRY_PROMPT_EXAMPLE_CORRECTION}}',
          prLink: '{{TERRY_PROMPT_EXAMPLE_PR_URL}}',
        },
        disclosure: "Atheryon Labs is currently built using Anthropic's Claude. The method is model-agnostic by design — the durable artefact is how a banker directs AI, not which model is on the other side of the chat.",
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
            ctaHref: '/contact?topic=labs-code',
            anchorId: 'code',
          },
          {
            id: 'prompts',
            number: '02',
            title: 'License the prompts.',
            body: 'License the prompt archive that directed the AI build. This includes the instructions, corrections, domain constraints, architecture decisions, and banking reasoning used to turn AI from a generic code generator into a useful regulated-finance build partner.',
            ctaLabel: 'License the prompts',
            ctaHref: '/contact?topic=labs-prompts',
            anchorId: 'prompts',
          },
          {
            id: 'advisory',
            number: '03',
            title: 'Engage the builder.',
            body: 'Work with Terry to apply the same method to your own data, product, platform, client opportunity, or S&P TeraHelix integration path. This is where integration-partner credibility matters most.',
            ctaLabel: 'Engage the builder',
            ctaHref: '/contact?topic=labs-advisory',
            anchorId: 'advisory',
          },
        ],
      },
      closing: {
        badge: 'Available for select engagements',
        title: 'Atheryon partners with a small number of institutions per year.',
        body: 'If what you have just read maps to a problem on your desk — or to a deal you are pitching — the next step is a confidential conversation.',
        primaryCta: { label: 'Request a confidential discussion', href: '/contact' },
        secondaryCta: { label: 'Download the pack', href: '/labs/atheryon-pitch-pack.pdf' },
        tertiaryCta: { label: 'See it live', href: 'https://www.atheryon.com.au' },
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
        partnerStrip: {
          partners: [
            { name: 'S&P TeraHelix integration partner' },
            { name: 'Microsoft partner' },
          ],
        },
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
            title: 'AI Direction',
            body: 'How senior domain expertise directs frontier AI from plausible code into shipped, regulated systems.',
            href: '/ai-direction',
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
          { id: 'aiDirection', title: 'AI direction pain', body: '"We need to study how senior domain expertise directs frontier AI from plausible code into shipped, regulated systems."', cta: 'Plug into AI Direction' },
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
          aiDirection: {
            title: 'Reality Blueprint: AI Direction',
            intro: 'Frontier AI generates plausible code. In a regulated domain, plausible is wrong. The artefact you are looking for is the directorial record — the prompts, corrections, and architectural choices a 20-year banker made to turn AI output into production-grade banking systems.',
            bullets: [
              'Trace where a prompt produced a textbook-but-wrong implementation, and the domain rule that corrected it. Five worked examples live on /labs (lifecycle events vs trade states, MiFID evidence chains, FOBO P&L taxonomy, CDM extend-vs-wrap, Sydney 5pm cutoff calendars).',
              'Study the methodology — controls before user stories, data model before screen, generate-three-then-narrow — that compressed a multi-decade banking platform into weeks.',
              "Take the directorial archive, not a prompt library: every prompt paired with the banker's reasoning, paired with the resulting code in the labs-platform repo.",
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
              'Classify the challenge across data, AI direction, and transformation.',
              'Generate recommended first moves based on the selected pain point.',
              'Continue the conversation in a Reality Architecture Session.',
            ],
          },
        },
        sellCardsHeading: 'Your next moves',
        recommendation: {
          data: 'code',
          aiDirection: 'prompts',
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
    aiDirection: {
      title: 'AI Direction — Atheryon',
      description: 'How senior domain expertise directs frontier AI from plausible code into shipped, regulated systems.',
      hero: {
        eyebrow: '02 · AI Direction',
        title: 'AI Direction',
        definition: 'How senior domain expertise directs frontier AI from plausible code into shipped, regulated systems.',
        positioning: 'Frontier AI generates plausible code. In a regulated domain, plausible is wrong. The durable artefact is not the model — it is the directorial track of the human who corrected it.',
        breadcrumbHref: '/reality',
        breadcrumbLabel: '← Back to Reality',
      },
      hiddenReality: {
        badge: 'The hidden reality',
        title: 'Why most AI-built software fails the regulated test.',
        bullets: [
          'AI proposes textbook implementations. Regulators ask for evidence chains, not endpoints.',
          'Frontier models do not know that operations works deadlines, not SLAs, at 5pm Sydney.',
          'The first plausible answer is the wrong answer in any domain with thirty years of edge cases.',
        ],
      },
      whatWeDo: {
        badge: 'What we do',
        title: 'A directorial track, not a prompt library.',
        cards: [
          { title: 'Five worked corrections', body: 'Lifecycle events vs trade states, MiFID evidence chains, FOBO P&L taxonomy, CDM extend-vs-wrap, Sydney 5pm cutoff calendars — five places where AI proposed the textbook answer and a banker corrected it. Each pairs the prompt, the correction, and the resulting code on /labs.' },
          { title: 'The 10× method', body: 'Built from regulatory artefacts and operational controls, not user stories. Started from the data model, not the screen. Generate three implementation candidates, then narrow with judgment. Surface-to-control traceability enforced.' },
          { title: 'The directorial archive', body: "Every prompt paired with Terry's reasoning per surface. Every correction paired with the banking concept that drove it. Every decision linked to the running code in the labs-platform repo." },
          { title: 'Model-agnostic by design', body: "Atheryon Labs is currently built using Anthropic's Claude. The durable artefact is how a senior banker directs frontier AI, not which model is on the other side of the chat." },
        ],
      },
      proof: {
        badge: 'Proof',
        title: 'See the direction in action on Labs.',
        body: 'Atheryon Labs is the working artefact: 31 banking surfaces shipped under directorial AI in weeks. Every surface traces to a regulatory artefact, an operational control, or a risk view — never a "as a user I want" story.',
        screenshot: '/reality/labs-screenshot-intelligence.png',
        screenshotAlt: 'Atheryon Labs analytics dashboard and ML workbench',
        cta: { label: 'Explore Labs →', href: '/labs' },
      },
      floor13Nudge: {
        body: 'Want the directorial track, not the platform?',
        cta: { label: 'Generate a Reality Blueprint', href: '/#floor-13' },
      },
      closing: {
        badge: 'Next step',
        title: 'License the directorial track.',
        body: 'For AI labs, model researchers, and developer-product teams studying how senior domain expertise turns frontier AI into regulated-system delivery.',
        cta: { label: 'Request access', href: '/contact?topic=ai-direction' },
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
    themes: {
      title: 'Labs Surface | Atheryon',
      description: '29 themes · 147 pages across the Atheryon labs platform — the live discovery surface for ODS, front office, risk & analytics, operations, compliance, and treasury.',
      badge: 'Discovery',
      headline: 'Explore the labs surface',
      intro: 'A public preview of the Atheryon labs discovery surface — every theme and every sub-page that lives at labs.atheryon.ai, rendered here as a static map. Click any tile to open the live theme on the labs subdomain in a new tab. The lattice mirrors the operational shape of a tier-1 capital-markets bank: an Operational Data Store (schemas, validators, lifecycle, entity intelligence, ops/dev tools, the MSX workshop deck) plus five business-unit surfaces — Front Office, Risk & Analytics, Operations, Compliance, and Treasury / Finance.',
      countsLine: '29 themes · 147 pages · 6 surfaces (1 ODS data store + 5 business units)',
      businessDividerLabel: 'Business Units',
    },
  },

  footer: {
    description: 'Decision-grade data platforms for capital markets and institutional banking. Senior-led. Regulator-credible. Production-grade.',
    links: {
      pillars: [
        { label: 'Data', href: '/data' },
        { label: 'AI Direction', href: '/ai-direction' },
        { label: 'Transformation', href: '/transformation' },
      ],
      resources: [
        { label: 'Labs', href: '/labs' },
        { label: 'Programs', href: '/programs' },
        { label: 'MiB Insight', href: '/programs/mib-insight' },
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
