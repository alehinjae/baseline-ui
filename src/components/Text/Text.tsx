import { createElement, type HTMLAttributes, type ReactNode } from 'react'

export type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4'
  | 'body-sm' | 'body-md' | 'body-lg'
  | 'muted-sm' | 'muted-md'

export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label' | 'div'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  /** troca a tag renderizada sem mudar o visual — variante ≠ semântica HTML */
  as?: TextElement
  children: ReactNode
}

// A tag padrão acompanha a variante (h1→<h1>, body→<p>) mas o `as` separa
// visual de semântica: um título visual de card pode ser <span> sem quebrar
// a hierarquia de headings da página.
const defaultElement: Record<TextVariant, TextElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'muted-md': 'p',
  'muted-sm': 'span',
}

export function Text({ variant = 'body-md', as, className = '', children, ...props }: TextProps) {
  return createElement(
    as ?? defaultElement[variant],
    { 'data-bl-variant': variant, className: `bl-text ${className}`.trim(), ...props },
    children,
  )
}
