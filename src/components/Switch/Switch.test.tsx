import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import * as Switch from './Switch'

function Example(props: React.ComponentProps<typeof Switch.Root>) {
  return (
    <Switch.Root {...props}>
      <Switch.Thumb />
    </Switch.Root>
  )
}

describe('Switch', () => {
  it('alterna data-checked ao clicar', async () => {
    render(<Example />)
    const sw = screen.getByRole('switch')
    expect(sw).not.toHaveAttribute('data-checked')
    await userEvent.click(sw)
    expect(sw).toHaveAttribute('data-checked')
    await userEvent.click(sw)
    expect(sw).not.toHaveAttribute('data-checked')
  })

  it('thumb reflete o mesmo estado do root (stateAttributesMapping do Base UI)', async () => {
    const { container } = render(<Example defaultChecked />)
    const thumb = container.querySelector('.bl-switch-thumb')
    expect(thumb).toHaveAttribute('data-checked')
  })

  it('respeita disabled e não alterna', async () => {
    render(<Example disabled />)
    const sw = screen.getByRole('switch')
    await userEvent.click(sw)
    expect(sw).not.toHaveAttribute('data-checked')
  })

  it('não tem violações de acessibilidade quando rotulado', async () => {
    // axe exige nome acessível em todo toggle — um Switch sem aria-label
    // nem <label> associado reprova de propósito; o rótulo é responsabilidade
    // de quem consome (baseline-ui não impõe wrapper de label).
    const { container } = render(<Example defaultChecked aria-label="Notificações" />)
    await expectNoA11yViolations(container)
  })
})
