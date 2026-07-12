# 0007 — Fase 2: cobertura total (componentes puros + matizes de status)

Status: aceito | Data: 2026-07-12

## Contexto

O primeiro consumo real (nbd-scheduler) revelou a lacuna esperada: com só 4
componentes, o app precisou criar uma camada local (Card, Text, Badge, Tabs
feitos à mão com cores Tailwind cruas) — e essa camada não rastreia os
tokens. Mudar o tema do baseline-ui não mudava quase nada do app. Pra
migração completa (zero hardcode no consumidor), o baseline-ui precisa
cobrir todo o vocabulário genérico de UI que o app usa.

## Decisões

**1. Componentes "puros" entram na biblioteca.** Card, Text, Badge, Alert,
Spinner, Stack e Grid não têm Base UI por baixo — não há comportamento
(foco, teclado, ARIA composto) que justifique um motor headless num cartão
ou numa pilha de layout. São tokens + CSS. O critério continua o do ADR
0001: *usa-se o Base UI onde há comportamento a herdar* (Tabs, Accordion e
Progress, também desta fase, vêm dele).

**2. Matizes de status vs. decorativos, com nomes distintos de propósito.**
- `info/success/warning/danger-soft-*` — nomes SEMÂNTICOS, para status do
  sistema (Alert, Progress). Cada trio bg/text/border tem contraste AA
  verificado no build.
- `purple-soft-*`, `pink-soft-*` — nomes de MATIZ, para categorias
  decorativas (Badge de tipos de conteúdo). Badge usa nomes de matiz
  (`blue`, `green`...) porque categoria visual não carrega significado de
  status; Alert usa nomes semânticos porque status carrega.

**3. Gap de layout só na escala de tokens.** Stack/Grid aceitam gap
0–7 mapeando direto pra `--bl-space-N`, sem valores arbitrários. Se um
layout "precisa" de um valor fora da escala, ou a escala ganha um token
novo (decisão explícita) ou o layout se ajusta — foi assim que o hardcode
proliferou no consumidor.

**4. Responsividade é do app, não do design system.** Grid define o caso
base (`cols`); breakpoints responsivos vêm por `className` do consumidor.
Design system que embute breakpoint impõe decisão de produto.

## Consequência

O manifest saltou de 4 para 14 componentes, todos validados no build.
O check-contrast ganhou 10 pares novos — e já pagou o investimento: pegou
`green-600` sobre o trilho a 2,9969:1 (0,003 abaixo do mínimo AA) antes de
qualquer tela renderizar.
