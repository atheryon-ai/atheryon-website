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
            <article key={founder.id} id={founder.id} className="py-10 md:py-12 scroll-mt-24">
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
            </article>
          ))}
        </div>
      </DocSection>

      <DocFooter label="atheryon / about / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
