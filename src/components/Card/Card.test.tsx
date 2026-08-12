import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Card } from './Card'

describe('Card', () => {
  it('aplica padding e interactive como data-attributes', () => {
    render(<Card padding="lg" interactive data-testid="card">conteúdo</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-bl-padding', 'lg')
    expect(card).toHaveAttribute('data-bl-interactive', '')
  })

  it('não marca data-bl-interactive quando não interativo (default)', () => {
    render(<Card data-testid="card">conteúdo</Card>)
    expect(screen.getByTestId('card')).not.toHaveAttribute('data-bl-interactive')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Card>conteúdo</Card>)
    await expectNoA11yViolations(container)
  })
})
