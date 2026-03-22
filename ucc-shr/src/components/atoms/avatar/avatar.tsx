import type { ReactNode } from 'react'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fallbackIcon?: ReactNode
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export function Avatar({
  src,
  alt = 'avatar',
  initials,
  size = 'md',
  className,
  fallbackIcon,
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover bg-gray-100 ${className ?? ''}`}
      />
    )
  }

  return (
    <span
      className={`${sizes[size]} inline-flex items-center justify-center rounded-full bg-navy-light text-navy font-semibold ${className ?? ''}`}
    >
      {initials ?? fallbackIcon ?? '?'}
    </span>
  )
}
