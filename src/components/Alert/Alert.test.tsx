import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Alert } from './Alert'

describe('Alert', () => {
  it('usa role="alert" (anunciado automaticamente por leitores de tela)', () => {
    render(<Alert variant="danger">Erro ao salvar.</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Erro ao salvar.')
  })

  it('renderiza title quando fornecido', () => {
    render(<Alert variant="success" title="Sucesso">Ação concluída.</Alert>)
    expect(screen.getByText('Sucesso')).toBeInTheDocument()
  })

  it('ícone decorativo tem aria-hidden (não duplica leitura por leitor de tela)', () => {
    render(<Alert variant="info">Mensagem</Alert>)
    const icon = screen.getByRole('alert').querySelector('.bl-alert-icon')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Alert variant="warning" title="Atenção">Revise antes de continuar.</Alert>)
    await expectNoA11yViolations(container)
  })
})
