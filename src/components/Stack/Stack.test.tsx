import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Stack } from './Stack'

describe('Stack', () => {
  it('default é column, gap 4, sem align/justify/wrap', () => {
    render(<Stack data-testid="s">conteúdo</Stack>)
    const s = screen.getByTestId('s')
    expect(s).toHaveAttribute('data-bl-direction', 'column')
    expect(s).toHaveAttribute('data-bl-gap', '4')
    expect(s).not.toHaveAttribute('data-bl-align')
    expect(s).not.toHaveAttribute('data-bl-justify')
    expect(s).not.toHaveAttribute('data-bl-wrap')
  })

  it('aplica direction/align/justify/wrap só quando fornecidos', () => {
    render(
      <Stack direction="row" align="center" justify="between" wrap data-testid="s">
        conteúdo
      </Stack>,
    )
    const s = screen.getByTestId('s')
    expect(s).toHaveAttribute('data-bl-direction', 'row')
    expect(s).toHaveAttribute('data-bl-align', 'center')
    expect(s).toHaveAttribute('data-bl-justify', 'between')
    expect(s).toHaveAttribute('data-bl-wrap', '')
  })

  it('gap 0 é aplicado explicitamente (não confundido com "sem gap definido")', () => {
    render(
      <Stack gap={0} data-testid="s">
        conteúdo
      </Stack>,
    )
    expect(screen.getByTestId('s')).toHaveAttribute('data-bl-gap', '0')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Stack>conteúdo</Stack>)
    await expectNoA11yViolations(container)
  })
})
