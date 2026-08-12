import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Grid } from './Grid'

describe('Grid', () => {
  it('default é cols=1, gap=4', () => {
    render(<Grid data-testid="g">conteúdo</Grid>)
    const g = screen.getByTestId('g')
    expect(g).toHaveAttribute('data-bl-cols', '1')
    expect(g).toHaveAttribute('data-bl-gap', '4')
  })

  it('aplica cols e gap como data-attributes', () => {
    render(
      <Grid cols={12} gap={2} data-testid="g">
        conteúdo
      </Grid>,
    )
    const g = screen.getByTestId('g')
    expect(g).toHaveAttribute('data-bl-cols', '12')
    expect(g).toHaveAttribute('data-bl-gap', '2')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(<Grid cols={3}>conteúdo</Grid>)
    await expectNoA11yViolations(container)
  })
})
