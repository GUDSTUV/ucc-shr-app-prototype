import Link from 'next/link'
import type { ReactNode } from 'react'

export interface NavItemProps {
  href: string
  icon?: ReactNode
  label: string
  active?: boolean
}

export function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-[10px] text-sm transition-colors
        ${active ? 'bg-navy-light text-navy font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
