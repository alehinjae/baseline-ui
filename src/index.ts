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
