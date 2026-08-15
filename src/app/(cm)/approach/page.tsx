import type { Metadata } from 'next'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

// One Approach page (Terry 2026-08-15): full method for both functions,
// function 1 first. Function-path copies stay until Task 5 301s them at
// /approach#ma and /approach#data-ai.
const page = v3.pages.approach
const s = page.sections
const ma = v3.pages.maApproach.sections
const cm = v3.pages.cmApproach.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/approach' },
}

export default function ApproachPage() {
  const maArm = s.arms[0]
  const cmArm = s.arms[1]

  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      <DocSection id={maArm.id} label={maArm.label} title={ma.lifecycle.title}>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {ma.lifecycle.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-12 mb-6 font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
          {ma.governance.title}
        </h3>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {ma.governance.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DocSection>

      <DocSection id={cmArm.id} label={cmArm.label} title={cm.examples.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {cm.examples.items.map((example) => (
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
          {cm.method.title}
        </h3>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {cm.method.intro}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {cm.method.principles.map((principle, i) => (
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
          {cm.delivery.title}
        </h3>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {cm.delivery.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className="mt-12 mb-4 font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
          {cm.engage.title}
        </h3>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {cm.engage.intro}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {cm.engage.paths.map((path) => (
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

      <DocFooter label="atheryon / approach / end-of-document" />
    </DocPage>
  )
}
