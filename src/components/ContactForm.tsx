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
