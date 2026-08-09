import type { Metadata } from 'next'
import { DocBanner, DocPage, DocSection } from '@/components/Doc'
import { v2 } from '@/content/site'

const page = v2.pages.about

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/about' },
}

export default function AboutPage() {
  return (
    <DocPage>
      <DocBanner
        label={page.hero.label}
        title={page.hero.title}
        body={page.hero.body}
      />

      {page.principals.map((principal) => (
        <DocSection
          key={principal.id}
          id={principal.id}
          label={principal.label}
          title={`${principal.name} — ${principal.role}`}
        >
          <div className="max-w-4xl space-y-6 text-lg md:text-xl text-charcoal/85 leading-relaxed">
            {principal.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </DocSection>
      ))}
    </DocPage>
  )
}
