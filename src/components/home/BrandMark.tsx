import Image from 'next/image'

type Props = {
  size?: number
  className?: string
  alt?: string
}

export function BrandMark({ size = 48, className, alt = 'Atheryon' }: Props) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <Image
        src="/atheryon-mark.png"
        alt={alt}
        width={size}
        height={size}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        priority={size >= 80}
      />
    </span>
  )
}
