import type { HTMLAttributes, ReactNode } from 'react'

// Aqui os nomes SÃO semânticos (ao contrário do Badge): um alerta comunica
// status do sistema, então a variante carrega significado.
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  children: ReactNode
}

const icon: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger: '✕',
}

export function Alert({ variant = 'info', title, className = '', children, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-bl-variant={variant}
      className={`bl-alert ${className}`.trim()}
      {...props}
    >
      <span className="bl-alert-icon" aria-hidden="true">{icon[variant]}</span>
      <div className="bl-alert-body">
        {title && <p className="bl-alert-title">{title}</p>}
        <div className="bl-alert-content">{children}</div>
      </div>
    </div>
  )
}
