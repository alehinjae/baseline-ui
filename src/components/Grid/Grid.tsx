import type { HTMLAttributes } from 'react'
import type { StackGap } from '../Stack/Stack'

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 12

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
  gap?: StackGap
}

// Colunas responsivas (ex.: 2 no mobile → 4 no desktop) são preocupação do
// app, não do design system: use className com utilitários responsivos por
// cima — o data-bl-cols define só o caso base.
export function Grid({ cols = 1, gap = 4, className = '', ...props }: GridProps) {
  return (
    <div
      data-bl-cols={cols}
      data-bl-gap={gap}
      className={`bl-grid ${className}`.trim()}
      {...props}
    />
  )
}
