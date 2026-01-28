'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  className?: string
}

export function FAQ({ items, className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <details
          key={index}
          open={openIndex === index}
          className="group bg-white border border-neutral-500/10 rounded-2xl shadow-card overflow-hidden"
          onClick={(e) => {
            e.preventDefault()
            setOpenIndex(openIndex === index ? null : index)
          }}
        >
          <summary className="flex items-center justify-between cursor-pointer p-6 text-left">
            <h3 className="text-lg font-semibold text-neutral-900 tracking-tight pr-4">
              {item.question}
            </h3>
            <div className="faq-icon w-8 h-8 rounded-full bg-warm-200 flex items-center justify-center flex-shrink-0 transition-transform duration-300">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
              </svg>
            </div>
          </summary>
          <div className={`px-6 pb-6 ${openIndex === index ? 'block' : 'hidden'}`}>
            <p className="text-neutral-600 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}

// Default FAQ items for the homepage
export const defaultFAQItems: FAQItem[] = [
  {
    question: 'What industries do you work with?',
    answer: 'Capital markets, institutional banking, trading infrastructure, and regulatory environments. We work with tier-one banks, asset managers, market operators, and regulators where data governance and regulatory compliance are non-negotiable.',
  },
  {
    question: 'Do you engage directly with regulators?',
    answer: 'Yes. As part of delivery leadership, we meet regulators on behalf of our clients to demonstrate control, progress, and production readiness. Our work is designed to be regulator-credible from the outset.',
  },
  {
    question: 'What makes Atheryon different from other consultancies?',
    answer: 'Three things. We are practitioner-led — senior people who have carried delivery risk in live trading and regulatory environments. We deliver decision-grade platforms, not slide decks. And our work is regulator-credible — built to withstand scrutiny, not just pass an internal review.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer: 'It depends on the scope. Recovery sprints take 2-4 weeks. Capability deliveries run 6-12 weeks. Foundation builds are multi-quarter. We scope based on outcomes, not time.',
  },
  {
    question: 'Do you work with existing platforms and vendors?',
    answer: 'Yes. We are vendor-agnostic and work with whatever technology stack you have. Our job is to make your existing investments produce trusted, governed outputs — not to replace them.',
  },
  {
    question: 'What does "decision-grade" mean?',
    answer: 'Decision-grade means data that the business can trust for regulatory reporting, risk calculations, and trade surveillance. It means consistent semantics, validated quality, clear lineage, and governance that withstands regulatory scrutiny.',
  },
]
