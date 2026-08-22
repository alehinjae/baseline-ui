# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Como o pacote é instalado via `github:alehinjae/baseline-ui` (sem registro
npm), a "versão" aqui é a de `package.json`/`baseline.manifest.json` — para
fixar uma exata, use `npm install github:alehinjae/baseline-ui#<sha>`.

## [0.9.0] — 2026-08-22

### Adicionado

- **Spec 0005 (baseline-ui-mcp)**: servidor MCP próprio em
  `mcp-server/` (subpacote separado — ADR 0012), expondo
  `baseline.manifest.json`, `tokens/*.json` e `docs/guarantees.json`
  como 4 tools: `list_components`, `get_component(name)`,
  `get_tokens()`, `get_guarantees(component?)`.
- `docs/guarantees.json` — garantias de acessibilidade verificadas
  (foco, contraste, motion, área de toque do Switch), cada uma citando
  o ADR/script que a comprova.
- `scripts/token-source.mjs` — heurística de origem de token, extraída
  de `generate-docs.mjs` pra ser reaproveitada pelo MCP.
- `docs/decisions/0012-mcp-server-como-subpacote-separado.md` — por que
  o MCP não entra nas dependências do pacote principal.
- CI: novo job `mcp-server` (`.github/workflows/ci.yml`) rodando os
  testes e o smoke-test do subpacote.

### Resultado mensurável

- `mcp-server/tools/*.test.mjs`: 9/9 passando, contra os dados reais do
  repositório (não mocks). `mcp-server/smoke-test.mjs`: protocolo MCP
  real via stdio (SDK `Client`↔`Server`), as 4 tools respondem
  corretamente — `get_guarantees("Switch")` confirma a área de toque
  real de 44×44 (ADR 0010), prova de que o servidor expõe estado
  verificado, não aspiracional.

## [0.8.0] — 2026-08-22

### Adicionado

- **Spec 0004 (token-and-type-contract-hygiene)**: tipos `*Props`
  nomeados e exportados para os 5 componentes que ainda inlineavam o
  tipo (`Accordion`, `Dialog`, `Field`, `Switch`, `Tabs`) — ex.:
  `SwitchRootProps`, `DialogPopupProps`, importáveis diretamente.
- Tokens novos `--bl-focus-ring-width` (2px) e `--bl-focus-ring-offset`
  (2px), extraídos do anel de foco idêntico em 5 componentes; refletidos
  em `baseline.manifest.json`.
- `docs/decisions/0011-triagem-hardcode-e-duplicatas-de-token.md` — ADR
  com a varredura real de valores hardcoded em `src/**/*.{css,tsx}`
  (25 ocorrências reais, não os 93 inflados pelo audit contando
  `docs/*.md`), triagem individual, e a decisão de não consolidar os 4
  pares de tokens "duplicados" (falsos positivos: coincidência numérica
  entre escalas independentes ou alias semântico intencional).

### Corrigido

- `Dialog.css`: margem de viewport `32px` solta → `var(--bl-space-6)`
  (mesmo valor, agora rastreável à escala de espaçamento).

### Verificado

- Union types: auditados os 14 componentes, nenhuma prop de variante
  usa `string` aberta — já 100% union type restrito, sem mudança de
  código necessária.

## [0.7.0] — 2026-08-21

### Adicionado

- **Spec 0003 (generated-documentation)**: `scripts/generate-docs.mjs`
  gera `docs/components/*.md` (14 páginas + índice) a partir de
  `baseline.manifest.json` — zero arquivo mantido à mão, formatado
  via Prettier programaticamente. `npm run docs`, encadeado em
  `npm run build`.
- `AGENTS.md` — convenções pra agente de IA, incluindo 3 armadilhas
  reais descobertas na sessão (Field/valueMissing, Grid/especificidade
  CSS, Switch/hit-area).
- `llms.txt` — pontos de entrada curados.
- `CONTRIBUTING.md` — processo de contribuição, quando abrir spec vs
  ADR.
- `docs/README.md` — índice geral da documentação.

### Resultado mensurável

- `ds-audit` (Southleft): **70/100 (C) → 81/100 (B)**. Documentation
  75→85, AI Readiness 43→61, Accessibility 53→88, Tooling 62→79.

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
