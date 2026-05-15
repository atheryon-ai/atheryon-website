import { BrandMark } from './BrandMark'

type Props = {
  markSize?: number
}

export function BrandLockup({ markSize = 52 }: Props) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <BrandMark size={markSize} />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'Cinzel, "Trajan Pro", Georgia, serif',
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: '0.08em',
            color: '#ffffff',
          }}
        >
          ATHERYON
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: '0.22em',
            fontWeight: 500,
            marginTop: 6,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: 'var(--homev3-orange-bright)' }}>DATA.</span>{' '}
          <span style={{ color: 'var(--homev3-blue-bright)' }}>INTELLIGENCE.</span>{' '}
          <span style={{ color: '#ffffff' }}>TRANSFORMATION.</span>
        </span>
      </span>
    </span>
  )
}
