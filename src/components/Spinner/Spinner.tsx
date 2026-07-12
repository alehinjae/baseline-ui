import type { HTMLAttributes } from 'react'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  /** anunciado por leitores de tela via role="status" */
  label?: string
}

export function Spinner({ size = 'md', label = 'Carregando', className = '', ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      data-bl-size={size}
      className={`bl-spinner ${className}`.trim()}
      {...props}
    />
  )
}
