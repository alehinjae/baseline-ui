# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Como o pacote é instalado via `github:alehinjae/baseline-ui` (sem registro
npm), a "versão" aqui é a de `package.json`/`baseline.manifest.json` — para
fixar uma exata, use `npm install github:alehinjae/baseline-ui#<sha>`.

## [0.6.0] — 2026-08-12

### Adicionado

- Estrutura spec-driven (`docs/specs/`) pra iniciativas transversais,
  separada de `docs/roadmap.md` e `docs/decisions/`. 5 specs criadas a
  partir de um audit real (`ds-audit` da Southleft, 70/100).
- **Spec 0001 (tooling-foundation)**: ESLint (flat config,
  `eslint-plugin-jsx-a11y`), Prettier, Husky + lint-staged, GitHub
  Actions CI (`build`/`typecheck`/`test`/`lint`/`format:check` em todo
  push/PR).
- **Spec 0002 (accessibility-contract-completion)**: `Switch`
  redimensionado — área de toque real 44×44 (AAA/Apple HIG), trilho
  visual mantém 36×20 via pseudo-elemento (ADR 0010, estende ADR 0008).
  Teste estrutural de regressão pra `prefers-reduced-motion`
  (`src/reduced-motion.test.ts`).
- `docs/positioning.md` — frase de posicionamento do projeto, 100%
  verdadeira desde o fechamento da spec 0002.
- ADR 0009 (Base UI mantido sobre Radix Primitives e vendorização) e
  ADR 0010 (Switch 44×44).

### Corrigido

- Área de toque do `Switch`, medida em 20px de altura desde a v0.5.0
  (abaixo do piso WCAG 2.2 AA) — agora 44×44.

## [0.5.0] — 2026-08-11

### Adicionado

- `src/reduced-motion.css`: toda transição/animação de qualquer componente
  agora respeita `prefers-reduced-motion` (WCAG 2.3.3), via regra catch-all
  `[class*="bl-"]` — não exige tratamento manual em componentes novos.
- [ADR 0008](./docs/decisions/0008-papel-estado-expressao.md): hierarquia
  **papel > estado > expressão** formalizada como princípio do projeto,
  importada da tese de contratos verificáveis do
  `liquid-interface-design-system` (pesquisa própria do usuário). Mapeia
  Base UI = papel/estado, tokens+CSS = expressão — o que já era verdade,
  agora com vocabulário e regra de precedência explícitas.

### Encontrado, não corrigido

- Área de toque do `Switch` medida em 20px de altura — abaixo do piso
  WCAG 2.2 AA (24×24, SC 2.5.8). Redimensionar é decisão visual, registrada
  como pendência em `docs/roadmap.md`, aguardando decisão do usuário sobre
  o limiar (24×24 AA vs. 44×44 AAA/Apple HIG).

## [0.4.0] — 2026-07-14

### Adicionado

- Suporte a tema manual via atributo `data-bl-theme="light"|"dark"` no
  `<html>`/`:root` — sem o atributo, o tema continua seguindo
  `prefers-color-scheme` como antes. Permite um toggle de tema no app
  consumidor sem depender só da preferência do sistema.
- Suíte de testes automatizados (Vitest + Testing Library + jest-axe):
  58 testes cobrindo os 14 componentes, 100% de cobertura de statements/
  branches/funções em `src/components/`. Todo componente novo passa a
  precisar de testes (comportamento + variantes + zero violações de
  acessibilidade via axe-core) além de TSX + CSS + manifest.
- `npm run test` e `npm run test:coverage`.

### Notas

- `data-bl-theme` havia sido implementado antes desta entrada (commit
  `f905971`) sem bump de versão — registrado aqui retroativamente.

## [0.3.0] — 2026-07-12 — Fase 2: cobertura total

### Adicionado

- 10 componentes novos: `Tabs`, `Accordion`, `Progress` (sobre o Base UI);
  `Card`, `Text`, `Badge`, `Alert`, `Spinner`, `Stack`, `Grid` (puros,
  tokens + CSS, sem motor headless).
- Matizes de status nos tokens (`info`/`success`/`warning`/`danger-soft`
  - `purple`/`pink` decorativos) para Alert/Badge/Progress.
- Ver [ADR 0007](./docs/decisions/0007-fase-2-cobertura-total.md).

## [0.2.0] — 2026-07-11 — Tema white

### Adicionado

- `scripts/check-contrast.mjs`: contraste WCAG AA (4.5:1 texto, 3:1
  não-textual) verificado em todo build, nos dois modos.
- Token `color.border-strong` para bordas que identificam controle
  (input, botão outline, trilho do switch).

### Corrigido

- `danger-text` no modo escuro tinha 2.77:1 de contraste (reprovado);
  corrigido para 7.19:1.
- Ver [ADR 0006](./docs/decisions/0006-tema-white-contraste-verificado.md).

## [0.1.0] — 2026-07-11 — Fase 1: fundação

### Adicionado

- Tokens migrados para formato W3C Design Tokens em `tokens/*.json`
  (primitivos + semânticos light/dark), `src/tokens.css` gerado
  (`npm run tokens`).
- `baseline.manifest.json` — contrato legível por máquina dos componentes,
  validado contra `src/` no build (`check-manifest`).
- Componentes `Field` e `Switch`.
- Ver [ADR 0004](./docs/decisions/0004-tokens-w3c-como-fonte-unica.md) e
  [ADR 0005](./docs/decisions/0005-manifest-como-ponte-para-figma.md).

## [0.0.1] — 2026-07-10 — Estrutura inicial

### Adicionado

- Projeto de estudo sobre o Base UI. Componentes `Button` e `Dialog`.
- ADRs 0001–0003 documentando as decisões de fundação (por que Base UI,
  padrão Root/Parts + render prop, estado via data-attributes).
