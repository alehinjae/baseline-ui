# 0003 — Dissecando: estado exposto via data-attributes, não classes internas

Status: nota de estudo | Data: 2026-07-10

## O problema que isso resolve

A forma ingênua de expor "este componente está aberto" pra CSS é a própria
biblioteca decidir o nome da classe (`.is-open`, `.MuiDialog-open`...) e
adicioná-la/removê-la via JS. Isso acopla: o consumidor fica refém do nome
de classe que a biblioteca escolheu, e trocar de biblioteca vira reescrever
CSS inteiro.

## Como o Base UI resolve

O estado vira **atributo do próprio elemento DOM**, não classe:

```html
<div data-open>...</div>          <!-- Dialog.Popup aberto -->
<button data-checked>...</button>  <!-- Switch marcado -->
<span data-disabled>...</span>     <!-- Button desabilitado -->
```

CSS puro já sabe selecionar isso, sem nenhuma API da biblioteca:

```css
.bl-dialog-popup[data-open] { animation: scaleIn 200ms; }
```

Isso também cobre **transições de entrada/saída** de forma elegante, via
`[data-starting-style]` / `[data-ending-style]` (para `transition`) ou
`[data-open]` / `[data-closed]` (para `@keyframes`) — verificado na doc
oficial de animação do Base UI. A vantagem citada por eles: uma `transition`
pode ser cancelada no meio (o usuário reabre antes de fechar terminar) sem
o salto abrupto típico de `@keyframes` interrompida.

## Por que isso é mais "agnóstico" que a alternativa

Atributo de dados funciona **em qualquer motor de estilo** — CSS puro, CSS
Modules, Tailwind (`data-[open]:opacity-100`), Emotion, styled-components —
sem nenhuma integração especial. É o mecanismo mais próximo de "zero
lock-in" que existe pra expor estado de UI. O baseline-ui adota o mesmo
princípio nos próprios atributos que cria (`data-bl-variant`,
`data-bl-size`), pra ficar consistente com o que a fundação já faz.

## Aplicação prática no baseline-ui

`Button.css` seleciona `[data-bl-variant='solid']`, `[data-disabled]` (do
próprio Base UI) e `:focus-visible` — nenhuma dessas seleções depende de
JavaScript rodando; tudo é CSS puro reagindo a atributos que o Base UI (ou
o baseline-ui) já coloca no DOM.
