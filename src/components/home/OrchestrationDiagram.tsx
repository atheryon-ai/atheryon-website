import { BrandMark } from './BrandMark'

type NodeData = {
  title: string
  sub: string
  icon: React.ReactNode
}

const inputs: NodeData[] = [
  {
    title: 'Market Data',
    sub: 'S&P Global',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Data',
    sub: 'Internal Systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: 'Reference Data',
    sub: 'Static & Dynamic',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
      </svg>
    ),
  },
  {
    title: 'Unstructured Data',
    sub: 'Research & News',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
      </svg>
    ),
  },
]

const outputs: NodeData[] = [
  {
    title: 'Trading',
    sub: 'Systems',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Risk',
    sub: 'Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Portfolio',
    sub: 'Analytics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17l6-6 4 4 6-8" />
        <circle cx="3" cy="17" r="1.5" />
        <circle cx="9" cy="11" r="1.5" />
        <circle cx="13" cy="15" r="1.5" />
        <circle cx="19" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Operations',
    sub: '& Reporting',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </svg>
    ),
  },
]

function Node({ data }: { data: NodeData }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--homev3-surface)',
        border: '1px solid var(--homev3-border)',
        borderRadius: 6,
        padding: '12px 16px',
        minWidth: 200,
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          background: 'var(--homev3-surface-2)',
          border: '1px solid var(--homev3-border)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--mode-accent-bright)',
        }}
      >
        <span style={{ width: 18, height: 18, display: 'block' }}>{data.icon}</span>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>{data.title}</span>
        <span style={{ fontSize: 11, color: 'var(--homev3-text-faint)', marginTop: 3 }}>
          {data.sub}
        </span>
      </span>
    </div>
  )
}

export function OrchestrationDiagram() {
  return (
    <div style={{ position: 'relative', minHeight: 460 }}>
      <svg
        viewBox="0 0 600 460"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(96,165,250,0.65)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
          <linearGradient id="wireGradOrange" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(245,158,11,0)" />
            <stop offset="50%" stopColor="rgba(251,191,36,0.5)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0)" />
          </linearGradient>
        </defs>
        <path d="M 210 60  C 280 60, 270 220, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 210 140 C 280 140, 270 225, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 210 220 C 280 220, 270 230, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.6" />
        <path d="M 210 300 C 280 300, 270 240, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 210 380 C 280 380, 270 280, 300 230" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 220, 320 60,  390 60"  fill="none" stroke="url(#wireGradOrange)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 225, 320 140, 390 140" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 235, 320 300, 390 300" fill="none" stroke="url(#wireGradOrange)" strokeWidth="1.2" />
        <path d="M 300 230 C 330 240, 320 380, 390 380" fill="none" stroke="url(#wireGrad)" strokeWidth="1.2" />
        <g fill="#60a5fa">
          <circle cx="260" cy="100" r="1.5" opacity="0.9" />
          <circle cx="270" cy="180" r="1.5" opacity="0.85" />
          <circle cx="265" cy="260" r="1.5" opacity="0.9" />
          <circle cx="270" cy="340" r="1.5" opacity="0.85" />
          <circle cx="345" cy="120" r="1.5" opacity="0.9" />
          <circle cx="350" cy="280" r="1.5" opacity="0.85" />
        </g>
        <g fill="#fbbf24">
          <circle cx="345" cy="80" r="1.5" opacity="0.85" />
          <circle cx="345" cy="320" r="1.5" opacity="0.85" />
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 2,
        }}
      >
        {inputs.map((n) => (
          <Node key={n.title} data={n} />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200,
          height: 200,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid var(--homev3-blue)',
            background:
              'radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0.08) 50%, transparent 75%)',
            boxShadow:
              '0 0 80px rgba(59,130,246,0.4), inset 0 0 60px rgba(59,130,246,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            textAlign: 'center',
            padding: '0 12px',
          }}
        >
          <BrandMark size={44} alt="" />
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              marginTop: 8,
            }}
          >
            AI Agent
            <br />
            Orchestration
            <br />
            Layer
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 2,
        }}
      >
        {outputs.map((n) => (
          <Node key={n.title} data={n} />
        ))}
      </div>
    </div>
  )
}
