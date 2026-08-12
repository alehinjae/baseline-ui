import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import * as Accordion from './Accordion'

function Example() {
  return (
    <Accordion.Root defaultValue={['1']}>
      <Accordion.Item value="1">
        <Accordion.Header>
          <Accordion.Trigger>O que é o baseline-ui?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Design system sobre o Base UI.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="2">
        <Accordion.Header>
          <Accordion.Trigger>Como os tokens funcionam?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Duas camadas, formato W3C.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}

describe('Accordion', () => {
  it('Header renderiza como <h3> (hierarquia de heading correta por padrão)', () => {
    render(<Example />)
    expect(
      screen.getByRole('heading', { level: 3, name: 'O que é o baseline-ui?' }),
    ).toBeInTheDocument()
  })

  it('item inicial aberto mostra o painel; clique alterna outro item', async () => {
    render(<Example />)
    expect(screen.getByText('Design system sobre o Base UI.')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Como os tokens funcionam?' }))
    expect(screen.getByText('Duas camadas, formato W3C.')).toBeVisible()
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Example />)
    await expectNoA11yViolations(container)
  })
})
