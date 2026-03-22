import Link from 'next/link'
import type { ReactNode } from 'react'

interface MobileNavItemProps {
  href: string
  label: string
  icon: ReactNode
  active?: boolean
}

export function MobileNavItem({ href, label, icon, active = false }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className={`flex min-w-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 transition-all ${active ? 'text-navy' : 'text-gray-500 hover:text-navy'}`}
      aria-label={label}
    >
      <span className={`${active ? 'scale-105' : ''}`}>{icon}</span>
      <span className="text-[10px] font-semibold leading-none">{label}</span>
    </Link>
  )
}
