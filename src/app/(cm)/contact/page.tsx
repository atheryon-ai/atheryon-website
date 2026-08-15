import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { DocBanner, DocPage, DocSection } from '@/components/Doc'
import { site, v3 } from '@/content/site'

// The firm-level enquiry form (Terry 2026-08-15). This route used to fork to
// the two arms' contact pages, which cost a click, taught nothing, and had no
// answer for a Data & AI enquiry. The form asks which practice instead, and
// the arm contact pages still preset it for anyone already inside an arm.
const page = v3.pages.contact
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
  alternates: { canonical: 'https://atheryon.com.au/contact' },
}

export default function ContactPage() {
  return (
    <DocPage compact>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.body} />

      <DocSection>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] gap-12">
          <ContactForm />

          <div
            aria-label="How your enquiry is handled"
            role="group"
            className="lg:border-l lg:border-charcoal/15 lg:pl-8"
          >
            <h2 className="font-display text-xl font-medium tracking-tight text-charcoal mb-4">
              {s.disclosure.title}
            </h2>
            <ul className="space-y-3 text-sm text-charcoal/75 leading-relaxed">
              {s.disclosure.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>
                <Link
                  href={s.disclosure.privacyLink.href}
                  className="text-charcoal underline-offset-4 underline hover:no-underline"
                >
                  {s.disclosure.privacyLink.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-sm text-charcoal underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>
      </section>
    </DocPage>
  )
}
