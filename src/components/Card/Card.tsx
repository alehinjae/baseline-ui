import type { HTMLAttributes } from 'react'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
  /** superfície clicável: hover com borda/sombra mais fortes e cursor pointer */
  interactive?: boolean
}

// Componente "puro" do baseline-ui: não há comportamento que justifique um
// motor headless por baixo — um cartão é só superfície. A opinião de design
// (fundo, borda, raio, sombra) vem 100% dos tokens.
export function Card({ padding = 'md', interactive = false, className = '', ...props }: CardProps) {
  return (
    <div
      data-bl-padding={padding}
      {...(interactive ? { 'data-bl-interactive': '' } : {})}
      className={`bl-card ${className}`.trim()}
      {...props}
    />
  )
}
