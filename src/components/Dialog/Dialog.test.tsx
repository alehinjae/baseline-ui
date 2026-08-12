import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Button } from '../Button/Button'
import * as Dialog from './Dialog'

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>Abrir</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Confirmar ação</Dialog.Title>
          <Dialog.Description>Isso não pode ser desfeito.</Dialog.Description>
          <Dialog.Actions>
            <Dialog.Close render={<Button variant="ghost" />}>Cancelar</Dialog.Close>
            <Button variant="danger">Confirmar</Button>
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

describe('Dialog', () => {
  it('abre ao clicar no trigger, com título e descrição acessíveis', async () => {
    render(<Example />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Abrir' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleName('Confirmar ação')
    expect(dialog).toHaveAccessibleDescription('Isso não pode ser desfeito.')
  })

  it('move o foco pra dentro do popup ao abrir (focus trap do Base UI)', async () => {
    render(<Example />)
    await userEvent.click(screen.getByRole('button', { name: 'Abrir' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog.contains(document.activeElement)).toBe(true)
  })

  it('fecha com Escape e devolve o foco ao trigger', async () => {
    render(<Example />)
    const trigger = screen.getByRole('button', { name: 'Abrir' })
    await userEvent.click(trigger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(trigger)
  })

  it('fecha ao clicar em Cancelar', async () => {
    render(<Example />)
    await userEvent.click(screen.getByRole('button', { name: 'Abrir' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
