import type { HTMLAttributes, ReactNode } from 'react'

// Matizes decorativos por nome (não por significado): badges marcam
// CATEGORIAS visuais (tipos de conteúdo, etiquetas), não status do sistema.
// Para status com significado (sucesso/erro/aviso), use o Alert — lá os
// nomes são semânticos de propósito.
export type BadgeVariant = 'gray' | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'pink'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

export function Badge({ variant = 'gray', className = '', children, ...props }: BadgeProps) {
  return (
    <span data-bl-variant={variant} className={`bl-badge ${className}`.trim()} {...props}>
      {children}
    </span>
  )
}
