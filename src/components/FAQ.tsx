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
          className="group bg-white border border-slate-200/60 rounded-2xl shadow-card overflow-hidden"
          onClick={(e) => {
            e.preventDefault()
            setOpenIndex(openIndex === index ? null : index)
          }}
        >
          <summary className="flex items-center justify-between cursor-pointer p-6 text-left">
            <h3 className="font-display text-lg font-semibold text-slate-900 tracking-tight pr-4">
              {item.question}
            </h3>
            <div className="faq-icon w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300">
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
              </svg>
            </div>
          </summary>
          <div className={`px-6 pb-6 ${openIndex === index ? 'block' : 'hidden'}`}>
            <p className="text-slate-600 leading-relaxed">
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
    answer: 'We work primarily with regulated enterprises—banks, investment banks, asset managers, market infrastructure providers, and regulators. Our expertise is in financial services where data governance and regulatory compliance are critical.',
  },
  {
    question: 'Do you engage directly with regulators?',
    answer: 'Yes. As part of delivery leadership, we meet regulators on behalf of our clients to demonstrate control, progress, and production readiness.',
  },
  {
    question: 'What makes Atheryon different from other consultancies?',
    answer: 'We focus on production outcomes, not demos. Every engagement delivers working capabilities in production, plus reusable data products that compound value over time. We are AI-native in our approach but delivery-led in our execution.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer: 'It depends on the scope. Recovery sprints take 2-4 weeks. Capability deliveries run 6-12 weeks. Foundation builds are multi-quarter. We scope based on outcomes, not time.',
  },
  {
    question: 'Do you work with existing platforms and vendors?',
    answer: 'Yes. We are vendor-agnostic and work with whatever technology stack you have. Our job is to make your existing investments work, not to replace them.',
  },
  {
    question: 'What does "AI-ready data" mean?',
    answer: 'AI-ready data means consistent semantics, validated quality, clear lineage, and stable access patterns. Without these foundations, AI applications inherit confusion and produce unreliable results.',
  },
]
