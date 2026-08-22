# 0005 — baseline-ui-mcp — Plan

## Abordagem

Subpacote próprio em `mcp-server/`, com `package.json` separado do
pacote principal — não adiciona `@modelcontextprotocol/sdk` como
dependência de quem só consome componentes/tokens (ver Decisões).
Consumidores que instalam via `github:alehinjae/baseline-ui` já
recebem o repositório inteiro (não é um pacote do registro npm — ver
ADR 0004), então `mcp-server/` chega junto sem precisar de publicação
separada; só precisa de `npm install` dentro da própria pasta antes de
rodar.

Arquivos:

- `mcp-server/package.json` — `@modelcontextprotocol/sdk`, `type: module`,
  sem dependência do pacote principal (lê `baseline.manifest.json` e
  `tokens/*.json` por caminho relativo, igual ao `generate-docs.mjs`).
- `mcp-server/index.mjs` — servidor MCP via stdio transport, registra as
  4 tools.
- `mcp-server/tools/{list-components,get-component,get-tokens,get-guarantees}.mjs`
  — uma função pura por tool, testável isolada do transporte MCP.
- `scripts/token-source.mjs` — extraída de `generate-docs.mjs` (função
  `tokenFile`, heurística primitivo-vs-semântico) pra ser importada
  tanto pelo gerador de docs quanto pelo `get_tokens`/`get_component` do
  MCP — a única lógica não trivial que valia a pena não duplicar (o
  resto é `JSON.parse(readFileSync(...))`, que não é "parser" de
  verdade, reimplementar não duplica nada de significativo).
- `docs/guarantees.json` — dado estruturado, escrito à mão (mesmo
  espírito do manifest: fonte de verdade versionada, não gerada),
  citando o ADR ou script que comprova cada garantia. Cobre só o que já
  foi verificado de fato nas Specs 0001-0004:
  - `_global.reducedMotion`: `prefers-reduced-motion` respeitado
    globalmente via `src/reduced-motion.css`, testado em
    `src/reduced-motion.test.ts` (Spec 0002).
  - `_global.contrast`: todos os pares de token verificados via
    `npm run check-contrast`, WCAG AA — rodado no build (ADR 0006).
  - `_global.focusVisible`: todo componente interativo usa
    `--bl-focus-ring-width`/`--bl-focus-ring-offset` (Spec 0004) —
    aplica-se aos componentes cujo `states` no manifest inclui
    `"focus-visible"`.
  - `Switch.hitArea`: `"44x44"`, fonte `ADR 0010`.
    `get_guarantees(component?)` funde `_global` com a entrada específica
    do componente (se existir) — nunca inventa um valor: se não há entrada
    pro componente, retorna só o que é global.
- `AGENTS.md`/`llms.txt`: nova seção "Consultando via MCP" apontando pro
  `mcp-server/`.
- `mcp-server/README.md`: como registrar no `.mcp.json` de um projeto
  consumidor (`command: node`, `args: [.../mcp-server/index.mjs]`).

## Decisões

**Subpacote separado (`mcp-server/package.json`) em vez de adicionar
`@modelcontextprotocol/sdk` ao `package.json` principal.**
Alternativa rejeitada: dependência única no `package.json` raiz — mais
simples de instalar, mas todo consumidor do baseline-ui (que só quer os
componentes React) passaria a baixar o SDK do MCP mesmo sem usá-lo; o
pacote principal hoje tem uma única dependência real
(`@base-ui/react`, ADR 0001/0009) — isso é uma característica buscada
ativamente, não acidental. Custo do subpacote: quem quiser rodar o MCP
precisa de um `npm install` extra dentro de `mcp-server/`, documentado
no README. → vira **ADR 0012**, linkada aqui.

**`docs/guarantees.json` hand-authored em vez de derivar tudo
dinamicamente do manifest.**
Alternativa considerada: computar `hitArea`/`reducedMotion` na hora,
inferindo de `states`/`tokens` do manifest. Rejeitada porque o
manifest não tem informação suficiente pra isso sem heurística frágil
(ex.: nem todo componente com `starting-style`/`ending-style` tem a
mesma cobertura de motion testada) — e o critério de aceite da spec
exige que o dado não seja inventado. Hand-authored, citando a fonte
(ADR/script) por entrada, é o mesmo princípio já usado no manifest
(ADR 0005): estrutura mantida à mão, validada por convenção, não por
inferência automática. Não é decisão grande o suficiente pra virar ADR
própria — é o mesmo padrão do manifest, só reaplicado.

## Verificação

- `mcp-server/tools/*.test.mjs` (Node test runner nativo, `node --test`,
  sem trazer Vitest pro subpacote) — cada função de tool testada isolada
  contra o `baseline.manifest.json`/`docs/guarantees.json` reais do
  repo, não mocks: `get_component("Field")` comparado campo a campo com
  `manifest.components.Field`; `get_guarantees("Switch")` precisa
  conter `"44x44"`.
- Smoke test end-to-end: script `mcp-server/smoke-test.mjs` usa o
  `Client` do próprio `@modelcontextprotocol/sdk` (stdio, conectando no
  `index.mjs` real) e chama as 4 tools de verdade — prova que o
  protocolo MCP funciona, não só as funções internas.
- Teste com agente real: registrar `mcp-server/index.mjs` no
  `.mcp.json` deste mesmo repositório (`G:\Dev\baseline-ui\.mcp.json`)
  e, na mesma sessão, consultar as tools via `ToolSearch`/chamada real —
  evidência colada no PR.
- `npm run build`/`test`/`lint`/`format:check` do pacote principal
  continuam verdes (o subpacote não entra no build principal, só tem
  seu próprio `npm test` opcional no CI — ver tasks.md).

## Riscos / rollback

- Subpacote com `node_modules` próprio não versionado
  (`mcp-server/node_modules` no `.gitignore`) — se o CI rodar teste do
  subpacote, precisa de um `npm install` extra nesse step (custo de CI
  pequeno, documentado no workflow).
- Se o smoke-test via stdio real se mostrar frágil no ambiente do CI
  (timing, buffering), critério de aceite aceita rodar só localmente e
  documentar a evidência no PR, sem bloquear o merge nisso — não é o
  cerne da spec (o cerne é o dado ser real, não a plumbing de CI do
  subpacote).
