import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { ComponentProps } from 'react'

// Tabs do Base UI: teclado (setas, Home/End), roving tabindex e ARIA
// (tablist/tab/tabpanel com aria-controls/labelledby) resolvidos no motor.
// O baseline-ui só veste List/Tab/Panel; o estado ativo chega via
// [data-active] — nenhum clone de children com props injetadas (como o
// Tabs feito à mão que este componente substitui) é necessário.
type WithClass<P> = Omit<P, 'className'> & { className?: string }

export type TabsRootProps = WithClass<ComponentProps<typeof BaseTabs.Root>>
export type TabsListProps = WithClass<ComponentProps<typeof BaseTabs.List>>
export type TabsTabProps = WithClass<ComponentProps<typeof BaseTabs.Tab>>
export type TabsPanelProps = WithClass<ComponentProps<typeof BaseTabs.Panel>>

export function Root({ className = '', ...props }: TabsRootProps) {
  return <BaseTabs.Root className={`bl-tabs ${className}`.trim()} {...props} />
}

export function List({ className = '', ...props }: TabsListProps) {
  return <BaseTabs.List className={`bl-tabs-list ${className}`.trim()} {...props} />
}

export function Tab({ className = '', ...props }: TabsTabProps) {
  return <BaseTabs.Tab className={`bl-tabs-tab ${className}`.trim()} {...props} />
}

export function Panel({ className = '', ...props }: TabsPanelProps) {
  return <BaseTabs.Panel className={`bl-tabs-panel ${className}`.trim()} {...props} />
}

// exposto sem estilo: quem quiser o sublinhado deslizante usa as CSS vars
// (--active-tab-left/width) que o Base UI publica nesta parte
export const Indicator = BaseTabs.Indicator
