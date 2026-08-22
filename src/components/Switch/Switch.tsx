import { Switch as BaseSwitch } from '@base-ui/react/switch'
import type { ComponentProps } from 'react'

// O Base UI entrega o Switch como <button role="switch"> com teclado e ARIA
// resolvidos, e expõe o estado como data-checked / data-unchecked no Root E
// no Thumb (via stateAttributesMapping) — por isso o CSS consegue mover o
// thumb sem nenhum seletor de descendente dependente de JS.
type WithClass<P> = Omit<P, 'className'> & { className?: string }

export type SwitchRootProps = WithClass<ComponentProps<typeof BaseSwitch.Root>>
export type SwitchThumbProps = WithClass<ComponentProps<typeof BaseSwitch.Thumb>>

export function Root({ className = '', ...props }: SwitchRootProps) {
  return <BaseSwitch.Root className={`bl-switch ${className}`.trim()} {...props} />
}

export function Thumb({ className = '', ...props }: SwitchThumbProps) {
  return <BaseSwitch.Thumb className={`bl-switch-thumb ${className}`.trim()} {...props} />
}
