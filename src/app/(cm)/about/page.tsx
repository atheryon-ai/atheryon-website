import type { Metadata } from 'next'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.about
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
  alternates: { canonical: 'https://atheryon.com.au/about' },
}

export default function AboutPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.body} />

      <DocSection label={s.positioning.label} title={s.positioning.title}>
        <p className="max-w-4xl font-display text-2xl md:text-3xl text-charcoal leading-snug mb-6">
          {s.positioning.statement}
        </p>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.positioning.audience}
        </p>
      </DocSection>

      <DocSection label={s.story.label} title={s.story.title}>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.story.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DocSection>

      <DocSection label={s.founders.label} title={s.founders.title}>
        <div className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.founders.items.map((founder) => (
            <article
              key={founder.id}
              id={founder.id}
              className={
                founder.photo
                  ? 'py-10 md:py-12 scroll-mt-24 grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-8 md:gap-12'
                  : 'py-10 md:py-12 scroll-mt-24'
              }
            >
              {founder.photo && (
                <img
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role}`}
                  width={533}
                  height={800}
                  className="w-40 md:w-full h-auto border border-charcoal/15"
                />
              )}
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
                  {founder.name}
                </h3>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
                  {founder.role}
                </div>
                <div className="mt-6 max-w-4xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
                  {founder.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <a
                  href={founder.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-charcoal underline-offset-4 hover:underline"
                >
                  LinkedIn profile
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </DocSection>

      <DocFooter label="atheryon / about / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
