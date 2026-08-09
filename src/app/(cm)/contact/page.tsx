import Link from 'next/link'
import { site, v3 } from '@/content/site'
import { ContactForm } from '@/components/ContactForm'

const page = v3.pages.contact
const s = page.sections

export default function ContactPage() {
  return (
    <div className="bg-bone min-h-screen">
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.body}
          </p>
        </div>
      </section>

      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              Enquiry
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] gap-12">
            <ContactForm defaultTopic="ma-execution" />

            <aside aria-label="How your enquiry is handled" className="lg:border-l lg:border-charcoal/15 lg:pl-8">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-4">
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
            </aside>
          </div>
        </div>
      </section>

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
    </div>
  )
}
