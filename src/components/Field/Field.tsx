import { Field as BaseField } from '@base-ui/react/field'
import type { ComponentProps } from 'react'

// Mesmo desenho do Dialog: o Base UI cuida de associação label↔controle,
// aria-describedby, estados de validação (data-invalid, data-touched,
// data-dirty) e renderização condicional do Error. O baseline-ui só põe a
// casca visual em cada parte. Validity fica reexportado puro — é só lógica
// (render prop com o ValidityState), não tem opinião visual possível.
export const Validity = BaseField.Validity

// O className do Base UI também aceita função (state) => string; o
// baseline-ui restringe para string simples nas partes que veste, para
// poder concatenar com a classe própria sem ramificação de tipos.
type WithClass<P> = Omit<P, 'className'> & { className?: string }

export function Root({ className = '', ...props }: WithClass<ComponentProps<typeof BaseField.Root>>) {
  return <BaseField.Root className={`bl-field ${className}`.trim()} {...props} />
}

export function Label({ className = '', ...props }: WithClass<ComponentProps<typeof BaseField.Label>>) {
  return <BaseField.Label className={`bl-field-label ${className}`.trim()} {...props} />
}

export function Control({ className = '', ...props }: WithClass<ComponentProps<typeof BaseField.Control>>) {
  return <BaseField.Control className={`bl-field-control ${className}`.trim()} {...props} />
}

export function Description({ className = '', ...props }: WithClass<ComponentProps<typeof BaseField.Description>>) {
  return <BaseField.Description className={`bl-field-description ${className}`.trim()} {...props} />
}

export function Error({ className = '', ...props }: WithClass<ComponentProps<typeof BaseField.Error>>) {
  return <BaseField.Error className={`bl-field-error ${className}`.trim()} {...props} />
}
