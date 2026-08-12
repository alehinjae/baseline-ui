# 0010 — Área de toque do Switch: 44×44 via pseudo-elemento

Status: aceito | Data: 2026-08-12

## Contexto

Estende a [ADR 0008](./0008-papel-estado-expressao.md), que documentou o
achado (Switch medindo 20px de altura, abaixo do piso WCAG 2.2 AA de
24×24) mas deixou o limiar e a implementação como pendência — "decisão
visual, não só técnica". O usuário decidiu: **44×44**, o valor AAA/Apple
HIG, o mesmo que o contrato `confirm-action` do `liquid-interface-design-
system` usa (não o mínimo AA de 24×24).

## Decisão

A área de toque real do `Switch.Root` (`.bl-switch`) passa a ser 44×44px.
O trilho visual **continua no tamanho compacto anterior** (36×20) — não
é o componente inteiro que cresce, só a caixa clicável.

### Como (alternativa considerada e rejeitada)

**Rejeitada**: inflar o box do `.bl-switch` direto pra 44×44 e deixar o
`background-color` (hoje aplicado no próprio `.bl-switch`) pintar a caixa
inteira. Mais simples de implementar, mas o trilho ficaria visualmente
enorme e desproporcional — contradiz o "sem exagero" que guia o tema
visual do projeto (ver ADR 0006) e teria mudado a aparência de todo
Switch já em uso, não só a área de toque.

**Adotada**: o trilho visual vira um pseudo-elemento `::before`,
centralizado dentro da caixa de 44×44 via `position: absolute` +
`transform: translate(-50%, -50%)`. O `.bl-switch-thumb` também passa a
ser posicionado via `top`/`left` absolutos (calculados a partir das
mesmas variáveis do trilho) em vez de centralizado pelo flex do pai.
Toda a geometria fica em `calc()` referenciando variáveis locais já
existentes (`--_thumb`, `--_gap`) mais uma nova `--_hit: 44px` — nenhum
número mágico solto.

## Verificação

Medido ao vivo no navegador (`getBoundingClientRect()`): `.bl-switch` ≥
44×44 nos três estados (unchecked/checked/disabled), trilho (`::before`)
mantém 36×20. Confirmado também via `getComputedStyle(el, '::before')`.

Uma observação de processo, não do componente: durante a verificação, o
`transform: translateX(...)` do thumb apareceu "travado" em `identity`
sob transição CSS ativa — investigado e isolado como artefato do painel
de preview não compositando frames em segundo plano (a mesma limitação
notada em sessões anteriores), não um bug real. Confirmado desligando
transições temporariamente (`* { transition: none !important }`), que
mostrou o valor correto (`translateX(16px)`).

## Consequências

- Mudança visual real: qualquer app consumidor com espaçamento apertado
  ao redor do `Switch` pode precisar ajustar layout (a área ocupada
  cresceu, mesmo que o trilho pareça igual).
- `Switch.Root`/`Switch.Thumb` mantêm a mesma API pública — nenhuma
  prop nova, nenhuma quebra de tipo.
- `baseline.manifest.json` não muda — nenhum token novo, `--_hit` é
  variável CSS local (mesmo padrão que `--_gap`/`--_thumb` já eram).
- Fecha, junto com [spec 0002](../specs/0002-accessibility-contract-completion/spec.md),
  o gap que impedia `docs/positioning.md` de ser 100% verdadeiro.
