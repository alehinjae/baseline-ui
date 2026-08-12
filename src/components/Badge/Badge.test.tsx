import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Badge } from './Badge'

describe('Badge', () => {
  it('aplica variant como data-attribute, default gray', () => {
    render(<Badge>Padrão</Badge>)
    expect(screen.getByText('Padrão')).toHaveAttribute('data-bl-variant', 'gray')
  })

  it.each(['gray', 'blue', 'green', 'orange', 'red', 'purple', 'pink'] as const)(
    'renderiza a variante %s',
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toHaveAttribute('data-bl-variant', variant)
    },
  )

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Badge variant="purple">Categoria</Badge>)
    await expectNoA11yViolations(container)
  })
})
