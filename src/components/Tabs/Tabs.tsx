import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { ComponentProps } from 'react'

// Tabs do Base UI: teclado (setas, Home/End), roving tabindex e ARIA
// (tablist/tab/tabpanel com aria-controls/labelledby) resolvidos no motor.
// O baseline-ui só veste List/Tab/Panel; o estado ativo chega via
// [data-active] — nenhum clone de children com props injetadas (como o
// Tabs feito à mão que este componente substitui) é necessário.
type WithClass<P> = Omit<P, 'className'> & { className?: string }

export function Root({ className = '', ...props }: WithClass<ComponentProps<typeof BaseTabs.Root>>) {
  return <BaseTabs.Root className={`bl-tabs ${className}`.trim()} {...props} />
}

export function List({ className = '', ...props }: WithClass<ComponentProps<typeof BaseTabs.List>>) {
  return <BaseTabs.List className={`bl-tabs-list ${className}`.trim()} {...props} />
}

export function Tab({ className = '', ...props }: WithClass<ComponentProps<typeof BaseTabs.Tab>>) {
  return <BaseTabs.Tab className={`bl-tabs-tab ${className}`.trim()} {...props} />
}

export function Panel({ className = '', ...props }: WithClass<ComponentProps<typeof BaseTabs.Panel>>) {
  return <BaseTabs.Panel className={`bl-tabs-panel ${className}`.trim()} {...props} />
}

// exposto sem estilo: quem quiser o sublinhado deslizante usa as CSS vars
// (--active-tab-left/width) que o Base UI publica nesta parte
export const Indicator = BaseTabs.Indicator
