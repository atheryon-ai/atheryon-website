'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { site, v2 } from '@/content/site'

const contact = site.pages.contact
const page = v2.pages.contact

/**
 * Topic identifiers emitted by CTAs across the site, mapped to the
 * human-readable label the contact form pre-fills into the message field.
 * Keep in sync with shellConfig CTA hrefs and any page-level CTA query params.
 */
const TOPIC_LABELS: Record<string, string> = {
  'labs-code': 'Labs platform code licensing',
  'labs-prompts': 'Labs prompts archive licensing',
  'front-office-bundle': 'I want the Front Office bundle ($14,000 AUD).',
  'labs-advisory': 'Labs advisory engagement',
  'ai-direction': 'AI Direction',
  'system-assessment': 'System assessment',
  'ma-execution': 'M&A execution review',
  'data-ai': 'Data, transformation and AI program',
  // Retained for links and bookmarks predating the 2026-08-15 move of capital
  // markets from a function to a sector: the slug still resolves, and it maps
  // onto function 2, which absorbed that work. Not offered in the select.
  // Keeping the key also keeps the string stable for anything downstream of
  // Formspree that filters on it.
  'capital-markets': 'Data, transformation and AI program',
  // Retained for links predating the 2026-08-15 retirement of the practice;
  // it is not offered in the practice select.
  mortgages: 'Mortgages practice',
}

function ContactFormInner({
  defaultTopic,
  submitLabel,
}: {
  defaultTopic?: string
  submitLabel?: string
}) {
  const searchParams = useSearchParams()
  // An explicit ?topic= query param wins (mortgages CTA links
  // /contact?topic=mortgages); otherwise the page's `defaultTopic` applies —
  // the root /contact defaults to the M&A execution enquiry path.
  const topicParam = searchParams.get('topic') ?? defaultTopic ?? ''
  const topicLabel = TOPIC_LABELS[topicParam] ?? ''
  const defaultMessage = topicLabel ? `I'm interested in: ${topicLabel}\n\n` : ''

  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
      <form
        action="https://formspree.io/f/xdkdynak"
        method="POST"
        className="space-y-5"
      >
        <div>
          <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.name.label}
            {contact.form.fields.name.required && <span className="text-charcoal/55"> *</span>}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required={contact.form.fields.name.required}
            placeholder={contact.form.fields.name.placeholder}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
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
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.email.label}
            {contact.form.fields.email.required && <span className="text-charcoal/55"> *</span>}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required={contact.form.fields.email.required}
            placeholder={contact.form.fields.email.placeholder}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        {/* With a topic already known — an arm's contact page, or an offer
            CTA carrying ?topic= — the practice is not in question and rides
            along hidden. The neutral /contact has no such context, so it asks
            here instead of making the visitor pick an arm on a page first. */}
        {topicParam ? (
          <input type="hidden" name="topic" value={topicParam} />
        ) : (
          <div>
            <label
              htmlFor="topic"
              className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2"
            >
              Practice
            </label>
            <select
              id="topic"
              name="topic"
              defaultValue=""
              className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors"
            >
              {/* Two functions (spec §4). The capital-markets value still
                  resolves through TOPIC_LABELS for old links, but it is not
                  offered here: it is a sector, not something to choose. */}
              <option value="">Not sure yet</option>
              <option value="ma-execution">M&A Transaction Services</option>
              <option value="data-ai">Data, Transformation, AI</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70 mb-2">
            {contact.form.fields.message.label}
            {contact.form.fields.message.required && <span className="text-charcoal/55"> *</span>}
          </label>
          <textarea
            id="message"
            name="message"
            required={contact.form.fields.message.required}
            placeholder={contact.form.fields.message.placeholder}
            defaultValue={defaultMessage}
            rows={6}
            className="w-full px-4 py-3 bg-white border border-charcoal/30 font-mono text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-charcoal transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
        >
          {submitLabel ?? page.cta}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="space-y-6">
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
      </div>
    </div>
  )
}

export function ContactForm({
  defaultTopic,
  submitLabel,
}: {
  defaultTopic?: string
  submitLabel?: string
}) {
  return (
    <Suspense fallback={<div className="max-w-5xl" />}>
      <ContactFormInner defaultTopic={defaultTopic} submitLabel={submitLabel} />
    </Suspense>
  )
}
