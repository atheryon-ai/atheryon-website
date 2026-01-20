interface QuoteBlockProps {
  quote: string
  className?: string
}

export function QuoteBlock({ quote, className = '' }: QuoteBlockProps) {
  return (
    <blockquote className={`border-l-4 border-gray-300 pl-6 py-2 ${className}`}>
      <p className="text-lg text-gray-700 italic leading-relaxed">
        {quote}
      </p>
    </blockquote>
  )
}
