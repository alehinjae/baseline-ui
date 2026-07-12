'use client'

// Diretiva no topo do bundle inteiro: torna todo o pacote um "client boundary"
// único para o Next.js/RSC — quem consome não precisa se preocupar em marcar
// 'use client' de novo, mesmo dentro de Server Components.
//
// Estilos NÃO são importados aqui — vêm de 'baseline-ui/styles.css', um
// arquivo separado (ver src/styles.css) que o consumidor importa uma vez
// no layout raiz da aplicação.

export { Button } from './components/Button/Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button/Button'

export * as Dialog from './components/Dialog/Dialog'
export * as Field from './components/Field/Field'
export * as Switch from './components/Switch/Switch'
export * as Tabs from './components/Tabs/Tabs'
export * as Accordion from './components/Accordion/Accordion'
export * as Progress from './components/Progress/Progress'

export { Card } from './components/Card/Card'
export type { CardProps, CardPadding } from './components/Card/Card'

export { Text } from './components/Text/Text'
export type { TextProps, TextVariant, TextElement } from './components/Text/Text'

export { Badge } from './components/Badge/Badge'
export type { BadgeProps, BadgeVariant } from './components/Badge/Badge'

export { Alert } from './components/Alert/Alert'
export type { AlertProps, AlertVariant } from './components/Alert/Alert'

export { Spinner } from './components/Spinner/Spinner'
export type { SpinnerProps, SpinnerSize } from './components/Spinner/Spinner'

export { Stack } from './components/Stack/Stack'
export type { StackProps, StackGap } from './components/Stack/Stack'

export { Grid } from './components/Grid/Grid'
export type { GridProps, GridCols } from './components/Grid/Grid'
