'use client'

interface AnimatedBadgeProps {
  text: string
  className?: string
}

export function AnimatedBadge({ text, className = '' }: AnimatedBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings */}
        <span className="absolute w-3 h-3 rounded-full bg-emerald-400/30 animate-ping" />
        <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/50" style={{ animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s' }} />
        {/* Core dot */}
        <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
      </div>
      <span className="text-sm font-medium text-slate-600 tracking-wide">
        {text}
      </span>
    </div>
  )
}
