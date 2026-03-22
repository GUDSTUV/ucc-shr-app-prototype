import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full h-12 px-4 rounded-[10px] font-sans
        border-[1.5px] bg-white outline-none transition-colors
        ${error
          ? 'border-red focus:border-red'
          : 'border-gray-100 focus:border-navy'}
        ${className ?? ''}`}
      {...props}
    />
  )
)
Input.displayName = 'Input'