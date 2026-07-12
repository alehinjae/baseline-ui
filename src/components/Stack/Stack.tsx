import type { HTMLAttributes } from 'react'

// gap na escala de tokens: N = var(--bl-space-N); 0 = sem espaço.
// De propósito NÃO aceita pixels arbitrários — se um layout "precisa" de um
// valor fora da escala, ou a escala ganha um token novo ou o layout se ajusta.
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  gap?: StackGap
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
}

export function Stack({
  direction = 'column',
  gap = 4,
  align,
  justify,
  wrap = false,
  className = '',
  ...props
}: StackProps) {
  return (
    <div
      data-bl-direction={direction}
      data-bl-gap={gap}
      {...(align ? { 'data-bl-align': align } : {})}
      {...(justify ? { 'data-bl-justify': justify } : {})}
      {...(wrap ? { 'data-bl-wrap': '' } : {})}
      className={`bl-stack ${className}`.trim()}
      {...props}
    />
  )
}
