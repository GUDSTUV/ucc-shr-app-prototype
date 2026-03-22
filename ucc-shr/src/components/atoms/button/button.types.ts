import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'report' | 'outline' | 'ghost'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?:   ButtonVariant
  size?:      ButtonSize
  disabled?:  boolean
  loading?:   boolean
  fullWidth?: boolean
  onClick?:   () => void
  children:   ReactNode
  type?:      'button' | 'submit'
  className?: string
}