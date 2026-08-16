import type { Metadata } from 'next'
import Link from 'next/link'
import { ArmSubNav } from '@/components/ArmSubNav'
import { ServiceLineIndex } from '@/components/ServiceLineIndex'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { RetiredHashRedirect } from '@/components/RetiredHashRedirect'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

// Function 2 (functions-and-sectors spec §4; MECE cut 2026-08-15). Banner,
// principle, markets depth boxes, three related links — Labs, M&A line-04,
// supply chain — then the function method (delivery examples, principles,
// embedded delivery, engage paths), moved here when /approach retired on
// 2026-08-16. Each landing now carries its own method, like /ma.
const page = v3.pages.dataAi
const s = page.sections
const method = v3.pages.cmApproach.sections

const showPrinciple = !isPending(s.principle.statement)

// Labs note from platform depth; M&A + supply chain from the retired arms list.
// Do not invent link copy here.
const relatedLinks = [
  s.depth.links.find((link) => link.href === '/labs'),
  ...s.arms.links,
].filter((link): link is (typeof s.arms.links)[number] => Boolean(link))

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/data-ai' },
}

export default function DataAiPage() {
  return (
    <DocPage>
      <RetiredHashRedirect from="#ma" to="/ma" />
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      <ArmSubNav base="/data-ai" active="overview" />

      {showPrinciple && (
        <DocSection>
          <div className="max-w-4xl py-4 md:py-8">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
              {s.principle.statement}
            </p>
          </div>
        </DocSection>
      )}

      <DocSection label={s.lines.label} title={s.lines.title}>
        {s.lines.intro ? (
          <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
            {s.lines.intro}
          </p>
        ) : null}
        <ServiceLineIndex
          items={s.lines.items.map((line) => ({
            id: line.id,
            label: line.name,
            note: line.tagline,
            items: line.items,
          }))}
        />
      </DocSection>

      <DocSection>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {relatedLinks.map((link) => (
            <li key={link.href} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-6 py-5">
              <Link
                href={link.href}
                className="font-display text-lg md:text-xl font-medium text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-colors w-fit"
              >
                {link.label}
              </Link>
              <p className="text-base text-charcoal/75 leading-relaxed">{link.note}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection label={method.examples.label} title={method.examples.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {method.examples.items.map((example) => (
            <li
              key={example.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {example.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {example.body}
              </p>
            </li>
          ))}
        </ol>

        <h3 className="mt-12 mb-4 font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
          {method.method.title}
        </h3>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {method.method.intro}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {method.method.principles.map((principle, i) => (
            <li
              key={principle.name}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(16rem,0.6fr)_minmax(0,1.4fr)] gap-x-5 md:gap-x-8 gap-y-2 py-6"
            >
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 pt-1">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {principle.name}
              </h4>
              <p className="col-start-2 md:col-start-3 text-base text-charcoal/85 leading-relaxed max-w-3xl">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>

        <h3 className="mt-12 mb-6 font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
          {method.delivery.title}
        </h3>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {method.delivery.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-12 mb-4 font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
          {method.engage.title}
        </h3>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {method.engage.intro}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {method.engage.paths.map((path) => (
            <li
              key={path.name}
              className="grid grid-cols-1 md:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)] gap-2 md:gap-8 py-6"
            >
              <h4 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {path.name}
              </h4>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {path.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocFooter label="atheryon / data-ai / end-of-document" />
    </DocPage>
  )
}
