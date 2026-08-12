# 0002 — accessibility-contract-completion — Plan

## Abordagem

### Switch → 44×44

O `.bl-switch` (o `Switch.Root` do Base UI) **é** o elemento interativo —
`role="switch"`, focável, com o hidden `<input type="checkbox">` de
participação em formulário. Hoje seu próprio box É o trilho visual (20px
de altura), então aumentar a área de toque aumentando o box aumentaria o
trilho junto — desproporcional, foge do "sem exagero" que guia o tema
visual do projeto.

Solução: o box do `.bl-switch` (a área de toque real) passa a ter 44×44,
mas o **trilho visual continua no tamanho compacto atual** (36×20),
desenhado num pseudo-elemento `::before` centralizado dentro da caixa
maior — em vez de o `background-color` pintar o box inteiro. O thumb
(`.bl-switch-thumb`) é reposicionado (absolute, dentro do box de 44×44)
pra ficar alinhado com o trilho do `::before`, não mais centralizado no
box todo.

Todos os deslocamentos ficam em `calc()` referenciando as variáveis já
existentes (`--_thumb`, `--_gap`) mais uma nova `--_hit: 44px` — nenhum
número mágico solto, mesma disciplina do CSS já existente.

### Teste de regressão — `prefers-reduced-motion`

Vitest não roda em navegador de verdade — não dá pra emular a media
query `prefers-reduced-motion` via jsdom (jsdom não calcula
`getComputedStyle` de propriedades de transição/animação de forma
confiável, e não expõe controle de media features). A verificação real
já foi feita manualmente no navegador nesta sessão (ADR 0008).

Abordagem: um teste **estrutural**, não comportamental — verifica que a
regra `@media (prefers-reduced-motion: reduce)` existe em
`src/reduced-motion.css` com o seletor catch-all `[class*="bl-"]` e as
propriedades corretas (`transition-duration`, `animation-duration`
zeradas). Isso não prova comportamento em runtime, mas **falha o build
se alguém remover ou alterar a regra** — que é o requisito real do
critério de aceite (proteção contra regressão, não recriar um browser
de teste). Documentado como limitação conhecida no próprio teste.

## Decisões

- **44×44 via pseudo-elemento, não infla o componente todo** — decisão
  registrada aqui porque tem alternativa rejeitada real (inflar o box
  inteiro, mais simples de implementar mas visualmente desproporcional)
  → **gera ADR** (0010, estendendo ADR 0008), conforme regra de
  `docs/specs/README.md`.
- **Teste de reduced-motion é estrutural (CSS estático), não
  comportamental (DOM real)** — trade-off aceito por limitação de jsdom,
  não por preguiça. Registrado como limitação conhecida, não escondido.

## Verificação

- `Switch` medido ao vivo no navegador (Browser pane): `getBoundingClientRect()`
  do `.bl-switch` ≥ 44×44 nos três estados, dois modos de tema.
- Trilho visual continua com as proporções atuais (36×20) — comparação
  visual antes/depois via screenshot.
- Novo teste Vitest (`src/reduced-motion.test.ts` ou similar) falha se
  a regra em `src/reduced-motion.css` for removida (testado
  deliberadamente: comentar a regra, confirmar que o teste quebra, depois
  reverter).
- `npm run test`, `npm run build`, `npm run lint` verdes.

## Riscos / rollback

Mudança visual real no `Switch` (área de toque maior, ainda que o trilho
pareça igual) — qualquer app consumidor com layout apertado ao redor do
Switch pode precisar de ajuste de espaçamento. Reversível via
`git revert`; nenhuma mudança de API pública (`Switch.Root`/`Switch.Thumb`
continuam com a mesma assinatura).
