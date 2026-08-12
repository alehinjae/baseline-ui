import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('usa role="status" com aria-label padrão "Carregando"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status', { name: 'Carregando' })).toBeInTheDocument()
  })

  it('label customizado sobrescreve o aria-label', () => {
    render(<Spinner label="Enviando vídeo" />)
    expect(screen.getByRole('status', { name: 'Enviando vídeo' })).toBeInTheDocument()
  })

  it('aplica size como data-attribute', () => {
    render(<Spinner size="lg" />)
    expect(screen.getByRole('status')).toHaveAttribute('data-bl-size', 'lg')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Spinner />)
    await expectNoA11yViolations(container)
  })
})
