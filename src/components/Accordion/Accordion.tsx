import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import type { ComponentProps } from 'react'

// Accordion do Base UI: aria-expanded/aria-controls, teclado e a medição de
// altura do painel (--accordion-panel-height) vêm do motor. O Header
// renderiza <h3> por padrão — hierarquia de heading correta de graça, coisa
// que o accordion feito à mão que este substitui não tinha.
type WithClass<P> = Omit<P, 'className'> & { className?: string }

export function Root({ className = '', ...props }: WithClass<ComponentProps<typeof BaseAccordion.Root>>) {
  return <BaseAccordion.Root className={`bl-accordion ${className}`.trim()} {...props} />
}

export function Item({ className = '', ...props }: WithClass<ComponentProps<typeof BaseAccordion.Item>>) {
  return <BaseAccordion.Item className={`bl-accordion-item ${className}`.trim()} {...props} />
}

export function Header({ className = '', ...props }: WithClass<ComponentProps<typeof BaseAccordion.Header>>) {
  return <BaseAccordion.Header className={`bl-accordion-header ${className}`.trim()} {...props} />
}

export function Trigger({ className = '', ...props }: WithClass<ComponentProps<typeof BaseAccordion.Trigger>>) {
  return <BaseAccordion.Trigger className={`bl-accordion-trigger ${className}`.trim()} {...props} />
}

export function Panel({ className = '', ...props }: WithClass<ComponentProps<typeof BaseAccordion.Panel>>) {
  return <BaseAccordion.Panel className={`bl-accordion-panel ${className}`.trim()} {...props} />
}
