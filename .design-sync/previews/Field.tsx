import { Field } from 'baseline-ui'

export function Default() {
  return (
    <Field.Root style={{ maxWidth: 320 }}>
      <Field.Label>E-mail</Field.Label>
      <Field.Control type="email" required placeholder="voce@exemplo.com" />
      <Field.Description>Valide saindo do campo vazio: o erro aparece.</Field.Description>
      <Field.Error match="valueMissing">Informe um e-mail.</Field.Error>
    </Field.Root>
  )
}
