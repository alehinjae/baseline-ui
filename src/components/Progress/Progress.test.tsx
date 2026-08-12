import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import * as Progress from './Progress'

describe('Progress', () => {
  it('expõe role=progressbar com aria-value* corretos', () => {
    render(
      <Progress.Root value={70} aria-label="Upload">
        <Progress.Track><Progress.Indicator /></Progress.Track>
      </Progress.Root>,
    )
    const bar = screen.getByRole('progressbar', { name: 'Upload' })
    expect(bar).toHaveAttribute('aria-valuenow', '70')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('aplica variant como data-attribute no Root', () => {
    render(
      <Progress.Root value={50} variant="danger" aria-label="Erro">
        <Progress.Track><Progress.Indicator /></Progress.Track>
      </Progress.Root>,
    )
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-bl-variant', 'danger')
  })

  it('default é variant=default quando não especificado', () => {
    render(
      <Progress.Root value={10} aria-label="Progresso">
        <Progress.Track><Progress.Indicator /></Progress.Track>
      </Progress.Root>,
    )
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-bl-variant', 'default')
  })

  it('não tem violações de acessibilidade', async () => {
    const { container } = render(
      <Progress.Root value={70} aria-label="Upload">
        <Progress.Track><Progress.Indicator /></Progress.Track>
      </Progress.Root>,
    )
    await expectNoA11yViolations(container)
  })
})
