import type { ReactNode } from 'react'

export type BadgeVariant = 'navy' | 'red' | 'gray' | 'success' | 'warning'

export interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
}
