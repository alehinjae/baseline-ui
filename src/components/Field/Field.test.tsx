import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/a11y'
import * as Field from './Field'

function Example() {
  return (
    <Field.Root validationMode="onBlur">
      <Field.Label>E-mail</Field.Label>
      <Field.Control type="email" required placeholder="voce@exemplo.com" />
      <Field.Description>Usado só para o link do calendário.</Field.Description>
      <Field.Error match="valueMissing">Informe um e-mail.</Field.Error>
    </Field.Root>
  )
}

describe('Field', () => {
  it('associa label ao controle (aria-labelledby)', () => {
    render(<Example />)
    const input = screen.getByPlaceholderText('voce@exemplo.com')
    const label = screen.getByText('E-mail')
    expect(input).toHaveAccessibleName('E-mail')
    expect(label.id).toBeTruthy()
  })

  it('marca data-invalid e mostra o erro quando o campo obrigatório fica vazio no blur', async () => {
    render(<Example />)
    const input = screen.getByPlaceholderText('voce@exemplo.com')
    // valueMissing só invalida um campo "dirty" (o Base UI reduz ruído de
    // erro em campo nunca tocado) — digita e apaga pra marcar sujo, depois
    // sai do campo pra disparar o commit de validationMode="onBlur"
    await userEvent.type(input, 'a')
    await userEvent.clear(input)
    await userEvent.tab()
    expect(input).toHaveAttribute('data-invalid')
    expect(screen.getByText('Informe um e-mail.')).toBeInTheDocument()
  })

  it('não tem violações de acessibilidade, inclusive em estado inválido', async () => {
    const { container } = render(<Example />)
    const input = screen.getByPlaceholderText('voce@exemplo.com')
    await userEvent.type(input, 'a')
    await userEvent.clear(input)
    await userEvent.tab()
    await expectNoA11yViolations(container)
  })
})
