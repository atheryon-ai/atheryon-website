import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocFooter } from '@/components'

// ─────────────────────────────────────────────────────────────────────────────
// /blog/why-claude — Long-form post on model selection for the agent stack.
// Inlined per the legal-pages carve-out (CLAUDE.md): one-off long-form content
// with rich structure (numbered sections, tables, architecture block, mixed
// links) doesn't warrant a site.ts shape it won't share with other pages.
// ─────────────────────────────────────────────────────────────────────────────

const TITLE = 'Why we built our capital markets agent stack on Claude'
const PUBLISH_DATE = '19 May 2026'
const READING_TIME = '6 minutes'

export const metadata: Metadata = {
  title: `${TITLE} — Atheryon`,
  description:
    'Why Atheryon chose Claude for its production capital markets agent stack: long context, tool-use reliability, and a safety posture that aligns with buyer-side compliance.',
  openGraph: {
    title: `${TITLE} — Atheryon`,
    description:
      'Why Atheryon chose Claude for its production capital markets agent stack.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'Why Atheryon chose Claude for its production capital markets agent stack.',
  },
  alternates: { canonical: 'https://atheryon.com.au/blog/why-claude' },
}

// Body prose default — used across narrative paragraphs.
const prose = 'text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl'
const proseSmall = 'text-sm md:text-base text-charcoal/80 leading-relaxed max-w-3xl'
const mono = 'font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60'
const linkClass =
  'text-charcoal underline underline-offset-4 hover:text-ink'

// Evaluation framework — weights sum to 100. Source of truth for the table.
const evalDimensions: ReadonlyArray<{
  dimension: string
  weight: string
  rationale: string
}> = [
  {
    dimension: 'Context window (effective, not max)',
    weight: '25%',
    rationale: 'Prospectuses, ISDAs, term sheets — all long.',
  },
  {
    dimension: 'Tool use reliability',
    weight: '20%',
    rationale: 'Agent must call risk systems without drift.',
  },
  {
    dimension: 'Instruction following under load',
    weight: '15%',
    rationale: 'Compliance language must not be paraphrased.',
  },
  {
    dimension: 'Latency under concurrent load',
    weight: '10%',
    rationale: 'Trading windows close.',
  },
  {
    dimension: 'Cost per million tokens',
    weight: '10%',
    rationale: 'Margin matters.',
  },
  {
    dimension: 'Safety / refusal calibration',
    weight: '10%',
    rationale: 'Over-refusal breaks workflows; under-refusal breaks audits.',
  },
  {
    dimension: 'Enterprise data controls',
    weight: '10%',
    rationale: 'No training on our data.',
  },
]

// Reference architecture — orchestrator → 4 agent groups → data sources.
const architectureGroups: ReadonlyArray<{
  name: string
  data: string
}> = [
  { name: 'Trading Systems', data: 'Market Data (S&P)' },
  { name: 'Risk Management', data: 'Reference Data' },
  { name: 'Portfolio Analytics', data: 'Enterprise Data' },
  { name: 'Operations & Reporting', data: 'Unstructured (Research / News)' },
]

function NumberedSection({
  index,
  title,
  children,
}: {
  index: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-charcoal/15 pt-10">
      <div className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 items-baseline">
        <span className="font-mono text-xs text-charcoal/50 tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal mb-4">
            {title}
          </h3>
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default function WhyClaudePage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / blog / why-claude"
        title={TITLE}
        body="Long context that survives a prospectus, tool use that holds in a regulated environment, and a safety posture buyer-side compliance will sign off on. Here&rsquo;s the working."
      />

      {/* Byline */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl">
            <div>
              <div className={mono + ' mb-1'}>Author</div>
              <div className="font-mono text-sm text-charcoal">
                Terry Tsakiris &middot; Founder, Atheryon
              </div>
            </div>
            <div>
              <div className={mono + ' mb-1'}>Published</div>
              <div className="font-mono text-sm text-charcoal">{PUBLISH_DATE}</div>
            </div>
            <div>
              <div className={mono + ' mb-1'}>Reading time</div>
              <div className="font-mono text-sm text-charcoal">{READING_TIME}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <DocSection label="TL;DR" title="The short version">
        <p className={prose}>
          We built an evaluation framework around the dimensions that actually
          matter for a production agent stack across trading, risk, and
          operations workflows. We chose Claude. Three reasons: long context
          that survives a real prospectus, tool use that holds up in a
          regulated environment, and a safety posture that buyer-side
          compliance functions will actually sign off on. Here&rsquo;s the
          working.
        </p>
      </DocSection>

      {/* §01 The problem */}
      <DocSection label="§ 01" title="The problem we were solving">
        <p className={prose + ' mb-6'}>
          Capital markets workflows are not chatbot workflows. A single agent
          run might need to:
        </p>
        <ul className="space-y-3 max-w-3xl mb-6">
          {[
            'Ingest a 400-page bond prospectus',
            'Cross-reference it against an internal credit policy',
            'Pull live pricing from S&P Global',
            'Reconcile against a position in the firm’s risk system',
            'Produce a report the desk can defend to compliance',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-charcoal/60 mt-2.5"
              />
              <span className="text-base text-charcoal/85 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <p className={prose}>
          Most LLM demos break before step two. We needed a model that
          doesn&rsquo;t.
        </p>
      </DocSection>

      {/* §02 Evaluation framework */}
      <DocSection label="§ 02" title="Our evaluation framework">
        <p className={prose + ' mb-8'}>
          We built an evaluation framework around the dimensions that actually
          matter in a front office. Not benchmark scores — production
          constraints.
        </p>
        <div className="border border-charcoal/15 overflow-hidden max-w-3xl">
          <div
            className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_2fr] gap-x-6 md:gap-x-8 px-5 md:px-6 py-3 border-b border-charcoal/15 bg-charcoal/[0.03]"
          >
            <div className={mono}>Dimension</div>
            <div className={mono + ' text-right'}>Weight</div>
            <div className={mono + ' hidden md:block'}>Why it matters</div>
          </div>
          {evalDimensions.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_2fr] gap-x-6 md:gap-x-8 gap-y-1 px-5 md:px-6 py-4 border-b last:border-b-0 border-charcoal/15"
            >
              <div className="font-mono text-sm text-charcoal">
                {row.dimension}
              </div>
              <div className="font-mono text-sm text-charcoal tabular-nums text-right">
                {row.weight}
              </div>
              <div className="col-span-2 md:col-span-1 font-mono text-xs text-charcoal/70 leading-relaxed">
                {row.rationale}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* §03 Why Claude won */}
      <DocSection label="§ 03" title="Why Claude won">
        <div className="space-y-10">
          <NumberedSection index={1} title="Long context that doesn&rsquo;t degrade">
            <p className={prose}>
              The published context numbers are marketing. What matters is
              whether the model can answer a question that requires reasoning
              over content on page 312 of a prospectus. In our tests against
              EU Green Bond framework documents, Claude maintained recall and
              reasoning quality through documents that caused noticeable
              degradation in competing models. For a front-to-back agent,
              &ldquo;the answer is somewhere in the document but the model
              forgot&rdquo; is a non-starter.
            </p>
          </NumberedSection>

          <NumberedSection index={2} title="Tool use that holds the line">
            <p className={prose}>
              Our agents call internal tools: a pricing service, a risk API, a
              position store, a compliance check. In stress tests with 8+
              tools available and ambiguous instructions, Claude&rsquo;s tool
              selection was the most consistent. It also volunteered fewer
              hallucinated tool calls — critical when a wrong call costs real
              money or generates a real audit finding.
            </p>
          </NumberedSection>

          <NumberedSection
            index={3}
            title="Safety calibration that compliance approves"
          >
            <p className={prose}>
              This one surprised us. We expected to fight the safety layer.
              Instead, Claude&rsquo;s calibration — say what you can, decline
              what you can&rsquo;t, explain why — aligned almost exactly with
              how a buyer-side second-line risk function wants an analyst to
              behave. The same posture that makes Claude &ldquo;cautious&rdquo;
              in consumer settings makes it deployable in regulated ones.
            </p>
          </NumberedSection>

          <NumberedSection
            index={4}
            title="The Anthropic stance on safety is a procurement advantage"
          >
            <p className={prose}>
              When a second-line risk function reviews an AI vendor, they
              aren&rsquo;t reading benchmarks. They&rsquo;re reading model
              cards, responsible scaling policies, and incident disclosures.
              Anthropic&rsquo;s published positions — Responsible Scaling
              Policy, Constitutional AI, transparent post-deployment
              monitoring — close procurement gates that would otherwise
              require months of legal and risk review.
            </p>
          </NumberedSection>
        </div>
      </DocSection>

      {/* §04 What we built */}
      <DocSection label="§ 04" title="What we built">
        <p className={prose + ' mb-10'}>
          Atheryon&rsquo;s reference system is a front-to-back capital markets
          agent stack.
        </p>

        {/* Orchestration layer */}
        <div className="max-w-4xl">
          <div className="border border-charcoal/30 bg-charcoal/[0.04] px-6 py-5 mb-3">
            <div className={mono + ' mb-1'}>Orchestration</div>
            <div className="font-display text-xl md:text-2xl font-medium text-charcoal tracking-tight">
              Claude
            </div>
          </div>

          {/* Arrow connector */}
          <div
            aria-hidden="true"
            className="text-charcoal/40 font-mono text-xl text-center mb-3"
          >
            ↓
          </div>

          {/* Agent groups */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {architectureGroups.map((g, i) => (
              <li
                key={g.name}
                className="border border-charcoal/30 bg-bone px-5 py-4 flex flex-col"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-2">
                  Agent {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display text-base md:text-lg font-medium text-charcoal leading-snug mb-3">
                  {g.name}
                </div>
                <div className="mt-auto font-mono text-[11px] text-charcoal/70 leading-relaxed border-t border-charcoal/15 pt-2">
                  {g.data}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className={proseSmall + ' italic mt-6 mb-8'}>
          Reference architecture. Components shipped / building / roadmap — see{' '}
          <Link href="/roadmap" className={linkClass}>
            /roadmap
          </Link>
          .
        </p>

        <p className={prose}>
          Each agent is single-purpose. They share a Claude-driven
          orchestration layer that routes work, manages tool selection, and
          enforces compliance constraints declaratively rather than in code.
        </p>
      </DocSection>

      {/* §05 What we'd tell another shop */}
      <DocSection label="§ 05" title="What we&rsquo;d tell another shop evaluating today">
        <ol className="divide-y divide-charcoal/15 border-y border-charcoal/15 max-w-3xl">
          {[
            {
              lead: 'Don’t pick on benchmarks. Pick on procurement.',
              body: 'The model your compliance team will approve is worth more than the model that’s 2 points higher on MMLU.',
            },
            {
              lead: 'Test long context with your actual documents.',
              body: 'Synthetic needle-in-haystack tests will mislead you.',
            },
            {
              lead: 'Stress tool use, not raw generation.',
              body: 'Agents live or die on tool selection under ambiguity.',
            },
            {
              lead: 'Measure cost per task, not per token.',
              body: 'A cheaper model that needs three retries is not cheaper.',
            },
          ].map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 items-baseline py-6"
            >
              <span className="font-mono text-xs text-charcoal/50 tabular-nums pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="font-display text-lg md:text-xl font-medium text-charcoal tracking-tight mb-2">
                  {item.lead}
                </div>
                <p className="text-base text-charcoal/80 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </DocSection>

      {/* §06 Where we go next */}
      <DocSection label="§ 06" title="Where we go next">
        <p className={prose}>
          We&rsquo;re building the case studies. If you&rsquo;re at an
          Australian bank, asset manager, or capital markets infrastructure
          provider and want to see the reference system,{' '}
          <Link href="/contact" className={linkClass}>
            book a system assessment
          </Link>
          .
        </p>
      </DocSection>

      <DocFooter label="atheryon / blog / why-claude / end-of-document" />
    </DocPage>
  )
}
