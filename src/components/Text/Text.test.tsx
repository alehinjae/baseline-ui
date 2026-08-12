import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import { Text } from './Text'

describe('Text', () => {
  it('variant h1-h4 renderiza a tag de heading correspondente por padrão', () => {
    render(<Text variant="h2">Título</Text>)
    expect(screen.getByRole('heading', { level: 2, name: 'Título' })).toBeInTheDocument()
  })

  it('body/muted renderizam <p>/<span>, não headings', () => {
    render(<Text variant="body-md">Parágrafo</Text>)
    expect(screen.getByText('Parágrafo').tagName).toBe('P')
  })

  it('prop `as` separa visual de semântica: variante h1 pode renderizar <span>', () => {
    render(<Text variant="h1" as="span">Visual grande, sem heading</Text>)
    const el = screen.getByText('Visual grande, sem heading')
    expect(el.tagName).toBe('SPAN')
    expect(el).toHaveAttribute('data-bl-variant', 'h1')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <>
        <Text variant="h1">H1</Text>
        <Text variant="body-md">Corpo</Text>
      </>,
    )
    await expectNoA11yViolations(container)
  })
})
