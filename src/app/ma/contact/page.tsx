import { site } from '@/content/site'
import { ContactForm } from '@/components/ContactForm'

export default function MAContactPage() {
  return (
    <div className="bg-bone min-h-screen">
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / m-and-a / contact
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            Book an M&amp;A execution review
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            Embedded execution specialists alongside your in-house team — pre-sign through post-sign,
            led by Anna Contos. Tell us where you are in the deal and we will come back with how the
            engagement maps to that stage.
          </p>
        </div>
      </section>

      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              §01 / Request
            </div>
          </header>
          <ContactForm defaultTopic="ma-execution" />
        </div>
      </section>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / contact / end-of-document
          </div>
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
