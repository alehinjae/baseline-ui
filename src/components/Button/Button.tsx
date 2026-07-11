import { Button as BaseButton } from '@base-ui/react/button'
import type { ComponentProps } from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ComponentProps<typeof BaseButton>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

// wrapper fino: toda a acessibilidade/comportamento vem do Base UI
// (focusableWhenDisabled, semântica de <button>, suporte a render prop
// herdado via ComponentProps). O baseline-ui só adiciona variant/size,
// mapeados para atributos de dados — a mesma técnica que o Base UI usa
// internamente para estado (data-checked, data-open...).
export function Button({ variant = 'solid', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <BaseButton
      data-bl-variant={variant}
      data-bl-size={size}
      className={`bl-button ${className}`.trim()}
      {...props}
    />
  )
}
