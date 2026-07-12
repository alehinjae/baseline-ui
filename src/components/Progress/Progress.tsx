import { Progress as BaseProgress } from '@base-ui/react/progress'
import type { ComponentProps } from 'react'

export type ProgressVariant = 'default' | 'info' | 'success' | 'warning' | 'danger'

type WithClass<P> = Omit<P, 'className'> & { className?: string }

export interface ProgressRootProps extends WithClass<ComponentProps<typeof BaseProgress.Root>> {
  variant?: ProgressVariant
}

// Progress do Base UI: role="progressbar" + aria-valuenow/min/max e os
// estados data-complete/data-indeterminate vêm do motor. A variante de cor
// vive no Root como data-bl-variant e o CSS pinta o Indicator descendente.
export function Root({ variant = 'default', className = '', ...props }: ProgressRootProps) {
  return (
    <BaseProgress.Root
      data-bl-variant={variant}
      className={`bl-progress ${className}`.trim()}
      {...props}
    />
  )
}

export function Track({ className = '', ...props }: WithClass<ComponentProps<typeof BaseProgress.Track>>) {
  return <BaseProgress.Track className={`bl-progress-track ${className}`.trim()} {...props} />
}

export function Indicator({ className = '', ...props }: WithClass<ComponentProps<typeof BaseProgress.Indicator>>) {
  return <BaseProgress.Indicator className={`bl-progress-indicator ${className}`.trim()} {...props} />
}

// expostos sem estilo, para quem quiser rótulo/porcentagem acessíveis
export const Label = BaseProgress.Label
export const Value = BaseProgress.Value
