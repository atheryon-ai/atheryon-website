import type { Metadata } from 'next'
import { ArmSubNav } from '@/components/ArmSubNav'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.cmApproach
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/capital-markets/approach' },
}

export default function CmApproachPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      <ArmSubNav base="/capital-markets" />

      <DocSection label={s.examples.label} title={s.examples.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.examples.items.map((example) => (
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
      </DocSection>

      <DocSection label={s.method.label} title={s.method.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.method.intro}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.method.principles.map((principle, i) => (
            <li
              key={principle.name}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(16rem,0.6fr)_minmax(0,1.4fr)] gap-x-5 md:gap-x-8 gap-y-2 py-6"
            >
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 pt-1">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {principle.name}
              </h3>
              <p className="col-start-2 md:col-start-3 text-base text-charcoal/85 leading-relaxed max-w-3xl">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label={s.delivery.label} title={s.delivery.title}>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.delivery.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DocSection>

      <DocSection label={s.engage.label} title={s.engage.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.engage.intro}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.engage.paths.map((path) => (
            <li
              key={path.name}
              className="grid grid-cols-1 md:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {path.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {path.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocFooter label="atheryon / capital markets / approach / end-of-document" cta={{ ...v3.cmCta }} />
    </DocPage>
  )
}
