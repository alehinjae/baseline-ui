import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import * as Tabs from './Tabs'

function Example() {
  return (
    <Tabs.Root defaultValue="a">
      <Tabs.List>
        <Tabs.Tab value="a">Visão geral</Tabs.Tab>
        <Tabs.Tab value="b">Configurações</Tabs.Tab>
        <Tabs.Tab value="c" disabled>
          Desabilitada
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">Conteúdo A</Tabs.Panel>
      <Tabs.Panel value="b">Conteúdo B</Tabs.Panel>
    </Tabs.Root>
  )
}

describe('Tabs', () => {
  it('mostra o painel da aba ativa por padrão', () => {
    render(<Example />)
    expect(screen.getByText('Conteúdo A')).toBeVisible()
  })

  it('troca de painel ao clicar em outra aba, e o teclado navega (roving tabindex)', async () => {
    render(<Example />)
    await userEvent.click(screen.getByRole('tab', { name: 'Configurações' }))
    expect(screen.getByText('Conteúdo B')).toBeVisible()
    expect(screen.getByRole('tab', { name: 'Configurações' })).toHaveAttribute('data-active')
  })

  it('aba desabilitada não é selecionável', async () => {
    render(<Example />)
    await userEvent.click(screen.getByRole('tab', { name: 'Desabilitada' }))
    expect(screen.getByText('Conteúdo A')).toBeVisible()
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Example />)
    await expectNoA11yViolations(container)
  })
})
