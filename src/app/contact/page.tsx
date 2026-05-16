'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { site, v2 } from '@/content/site'

const page = v2.pages.contact
const contact = site.pages.contact

// ─────────────────────────────────────────────────────────────────────────────
// /contact — Architectural-document framing. Form preserved (structural, not
// marketing). No warm gradient, no orange eyebrow.
// ─────────────────────────────────────────────────────────────────────────────

const TOPIC_LABELS: Record<string, string> = {
  'labs-code': 'Labs platform code licensing',
  'labs-prompts': 'Labs prompts archive licensing',
  'front-office-bundle': 'I want the Front Office bundle ($14,000 AUD).',
  'labs-advisory': 'Labs advisory engagement',
  'ai-direction': 'AI Direction',
  'system-assessment': 'System assessment',
}

function ContactForm() {
  const searchParams = useSearchParams()
  const topicParam = searchParams.get('topic') ?? ''
  const topicLabel = TOPIC_LABELS[topicParam] ?? ''
  const defaultMessage = topicLabel ? `I'm interested in: ${topicLabel}\n\n` : ''

  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
      {/* Form — native HTML submission to Formspree (preserved) */}
      <form
        action="https://formspree.io/f/xdkdynak"
        method="POST"
        className="space-y-5"
      >
        <div>
          <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.name.label}
            {contact.form.fields.name.required && <span className="text-charcoal/50"> *</span>}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required={contact.form.fields.name.required}
            placeholder={contact.form.fields.name.placeholder}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.email.label}
            {contact.form.fields.email.required && <span className="text-charcoal/50"> *</span>}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required={contact.form.fields.email.required}
            placeholder={contact.form.fields.email.placeholder}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="company" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.company.label}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder={contact.form.fields.company.placeholder}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        {topicParam && (
          <input type="hidden" name="topic" value={topicParam} />
        )}

        <div>
          <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.message.label}
            {contact.form.fields.message.required && <span className="text-charcoal/50"> *</span>}
          </label>
          <textarea
            id="message"
            name="message"
            required={contact.form.fields.message.required}
            placeholder={contact.form.fields.message.placeholder}
            defaultValue={defaultMessage}
            rows={6}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-charcoal transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
        >
          {page.cta}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <aside className="space-y-6">
        <div className="border border-charcoal/30 bg-white p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-3">
            Direct
          </div>
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-sm text-charcoal underline-offset-4 hover:underline break-all"
          >
            {site.email}
          </a>
        </div>
      </aside>
    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Header banner */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / contact / system-assessment
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {page.cta}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {v2.identity}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              §01 / Request
            </div>
          </header>
          <Suspense fallback={<div className="max-w-5xl" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* End-of-document */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / contact / end-of-document
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
