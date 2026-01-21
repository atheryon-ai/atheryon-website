'use client'

import { useEffect, useRef } from 'react'

export function DataVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Add subtle animations on mount
    const svg = svgRef.current
    if (!svg) return

    const bars = svg.querySelectorAll('.data-bar')
    const nodes = svg.querySelectorAll('.data-node')
    const lines = svg.querySelectorAll('.data-line')

    // Animate bars
    bars.forEach((bar, i) => {
      bar.animate(
        [
          { transform: 'scaleY(0)', opacity: 0 },
          { transform: 'scaleY(1)', opacity: 1 },
        ],
        {
          duration: 800,
          delay: i * 100,
          fill: 'forwards',
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }
      )
    })

    // Animate nodes
    nodes.forEach((node, i) => {
      node.animate(
        [
          { transform: 'scale(0)', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        {
          duration: 500,
          delay: 400 + i * 150,
          fill: 'forwards',
          easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }
      )
    })

    // Animate lines
    lines.forEach((line, i) => {
      const length = (line as SVGPathElement).getTotalLength?.() || 100
      line.animate(
        [
          { strokeDasharray: `${length}`, strokeDashoffset: `${length}` },
          { strokeDasharray: `${length}`, strokeDashoffset: '0' },
        ],
        {
          duration: 1000,
          delay: 300 + i * 200,
          fill: 'forwards',
          easing: 'ease-out',
        }
      )
    })
  }, [])

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background glow effects */}
      <div className="absolute inset-0 -m-8">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main visualization */}
      <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-glass border border-white/40">
        <svg
          ref={svgRef}
          viewBox="0 0 400 300"
          className="w-full h-auto"
          style={{ minHeight: '280px' }}
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1" />
            </pattern>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9900" />
              <stop offset="100%" stopColor="#FFB833" />
            </linearGradient>
            <linearGradient id="barGradientBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A84FF" />
              <stop offset="100%" stopColor="#4BC0FF" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9900" />
              <stop offset="50%" stopColor="#0A84FF" />
              <stop offset="100%" stopColor="#0A1A2F" />
            </linearGradient>
          </defs>

          <rect width="400" height="300" fill="url(#grid)" />

          {/* Bar chart section */}
          <g transform="translate(30, 40)">
            <text x="0" y="-10" className="text-[10px] fill-slate-400 font-medium">DATA TRANSFORMATION</text>

            {/* Bars */}
            <rect className="data-bar" x="0" y="60" width="24" height="100" rx="4" fill="url(#barGradient)" style={{ transformOrigin: '12px 160px' }} />
            <rect className="data-bar" x="35" y="30" width="24" height="130" rx="4" fill="url(#barGradientBlue)" style={{ transformOrigin: '47px 160px' }} />
            <rect className="data-bar" x="70" y="80" width="24" height="80" rx="4" fill="url(#barGradient)" style={{ transformOrigin: '82px 160px' }} />
            <rect className="data-bar" x="105" y="20" width="24" height="140" rx="4" fill="url(#barGradientBlue)" style={{ transformOrigin: '117px 160px' }} />
            <rect className="data-bar" x="140" y="50" width="24" height="110" rx="4" fill="url(#barGradient)" style={{ transformOrigin: '152px 160px' }} />

            {/* X-axis labels */}
            <text x="12" y="175" textAnchor="middle" className="text-[8px] fill-slate-400">Raw</text>
            <text x="47" y="175" textAnchor="middle" className="text-[8px] fill-slate-400">Clean</text>
            <text x="82" y="175" textAnchor="middle" className="text-[8px] fill-slate-400">Valid</text>
            <text x="117" y="175" textAnchor="middle" className="text-[8px] fill-slate-400">Model</text>
            <text x="152" y="175" textAnchor="middle" className="text-[8px] fill-slate-400">Prod</text>
          </g>

          {/* Flow diagram section */}
          <g transform="translate(220, 40)">
            <text x="0" y="-10" className="text-[10px] fill-slate-400 font-medium">DATA FLOW</text>

            {/* Connection lines */}
            <path className="data-line" d="M 20 40 Q 60 40 60 80" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinecap="round" />
            <path className="data-line" d="M 60 80 Q 60 120 100 120" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinecap="round" />
            <path className="data-line" d="M 100 120 Q 140 120 140 160" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinecap="round" />

            {/* Nodes */}
            <g className="data-node" style={{ transformOrigin: '20px 40px' }}>
              <circle cx="20" cy="40" r="12" fill="#FF9900" />
              <text x="20" y="44" textAnchor="middle" className="text-[8px] fill-white font-bold">1</text>
            </g>
            <g className="data-node" style={{ transformOrigin: '60px 80px' }}>
              <circle cx="60" cy="80" r="12" fill="#0A84FF" />
              <text x="60" y="84" textAnchor="middle" className="text-[8px] fill-white font-bold">2</text>
            </g>
            <g className="data-node" style={{ transformOrigin: '100px 120px' }}>
              <circle cx="100" cy="120" r="12" fill="#A7B0B8" />
              <text x="100" y="124" textAnchor="middle" className="text-[8px] fill-white font-bold">3</text>
            </g>
            <g className="data-node" style={{ transformOrigin: '140px 160px' }}>
              <circle cx="140" cy="160" r="14" fill="#0A1A2F" />
              <text x="140" y="164" textAnchor="middle" className="text-[10px] fill-white font-bold">AI</text>
            </g>

            {/* Labels */}
            <text x="40" y="40" className="text-[8px] fill-slate-500">Extract</text>
            <text x="75" y="75" className="text-[8px] fill-slate-500">Validate</text>
            <text x="115" y="115" className="text-[8px] fill-slate-500">Transform</text>
            <text x="145" y="185" className="text-[8px] fill-slate-500" textAnchor="middle">Ready</text>
          </g>

          {/* Stats section */}
          <g transform="translate(30, 220)">
            <rect x="0" y="0" width="340" height="60" rx="12" fill="white" fillOpacity="0.6" />
            <g transform="translate(30, 20)">
              <text x="0" y="0" className="text-[24px] fill-slate-900 font-bold font-display">99.9%</text>
              <text x="0" y="18" className="text-[10px] fill-slate-500">Validation Rate</text>
            </g>
            <g transform="translate(140, 20)">
              <text x="0" y="0" className="text-[24px] fill-slate-900 font-bold font-display">5x</text>
              <text x="0" y="18" className="text-[10px] fill-slate-500">Faster Delivery</text>
            </g>
            <g transform="translate(250, 20)">
              <text x="0" y="0" className="text-[24px] fill-slate-900 font-bold font-display">100%</text>
              <text x="0" y="18" className="text-[10px] fill-slate-500">Lineage Tracked</text>
            </g>
          </g>
        </svg>

        {/* Floating label */}
        <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
          Production Ready
        </div>
      </div>
    </div>
  )
}
