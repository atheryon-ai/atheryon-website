interface QuoteBlockProps {
  quote: string
  className?: string
}

export function QuoteBlock({ quote, className = '' }: QuoteBlockProps) {
  return (
    <blockquote className={`relative pl-8 py-2 ${className}`}>
      {/* Gradient border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-orange via-brand-blue to-brand-orange rounded-full" />
      <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </blockquote>
  )
}
