import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza o texto e responde a clique', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Salvar</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('aplica variant e size como data-attributes', () => {
    render(<Button variant="danger" size="lg">Excluir</Button>)
    const btn = screen.getByRole('button', { name: 'Excluir' })
    expect(btn).toHaveAttribute('data-bl-variant', 'danger')
    expect(btn).toHaveAttribute('data-bl-size', 'lg')
  })

  it('default é solid/md quando nenhuma prop é passada', () => {
    render(<Button>Padrão</Button>)
    const btn = screen.getByRole('button', { name: 'Padrão' })
    expect(btn).toHaveAttribute('data-bl-variant', 'solid')
    expect(btn).toHaveAttribute('data-bl-size', 'md')
  })

  it('desabilitado continua focável (focusableWhenDisabled do Base UI) e não dispara onClick', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Indisponível</Button>)
    const btn = screen.getByRole('button', { name: 'Indisponível' })
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger" disabled>Danger disabled</Button>
      </>,
    )
    await expectNoA11yViolations(container)
  })
})
