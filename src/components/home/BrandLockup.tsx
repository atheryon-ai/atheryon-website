import Link from 'next/link'
import { BrandMark } from './BrandMark'
import { PracticeToggle } from '../PracticeToggle'

type Props = {
  markSize?: number
}

export function BrandLockup({ markSize = 52 }: Props) {
  return (
    <span className="brand-lockup" style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <Link href="/" aria-label="Atheryon home" style={{ display: 'inline-flex', textDecoration: 'none' }}>
        <BrandMark size={markSize} />
      </Link>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <Link
          href="/"
          className="brand-lockup-wordmark"
          style={{
            fontFamily: 'Cinzel, "Trajan Pro", Georgia, serif',
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: '0.08em',
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          ATHERYON
        </Link>
        <PracticeToggle />
      </span>
    </span>
  )
}
