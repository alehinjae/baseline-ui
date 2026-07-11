# 0006 — Tema white com contraste WCAG verificado no build

Status: aceito | Data: 2026-07-11

## Contexto

O tema claro original (fase 1) já era branco + cinzas zinc, mas os valores
foram escolhidos a olho. Pedido do usuário: refiná-lo como o tema padrão do
design system — branco com cinzas, bons contrastes **sem exagero** — seguindo
as recomendações de acessibilidade de verdade, e deixá-lo pronto para uso em
qualquer projeto.

"Seguir as recomendações de verdade" vira requisito executável: os mínimos
da WCAG 2.1 não são conferidos uma vez e esquecidos — são declarados em
`scripts/check-contrast.mjs` e **verificados em todo build**. Se um token
mudar e quebrar um par, o build falha, igual às regras de duas camadas
(ADR 0004) e do manifest (ADR 0005).

## Mínimos adotados

- **4.5:1** — texto normal (WCAG 1.4.3, nível AA): texto principal e
  secundário sobre os fundos, texto dos botões solid/danger, mensagem de
  erro.
- **3.0:1** — contraste não-textual (WCAG 1.4.11): bordas que identificam
  um controle (input, trilho do switch) e o anel de foco.

## Decisões de valor ("sem exagero")

- `text`: zinc-**800**, não zinc-900 — 14.9:1 sobre branco, muito acima de
  AAA (7:1), mas evita o choque de quase-preto sobre branco puro. O mesmo
  para `accent` (era zinc-900).
- `text-muted`: zinc-**600** (era zinc-500) — o valor antigo dava 4.35:1
  sobre `bg-subtle`, **abaixo de AA**; zinc-600 dá 7.0:1.
- **`border-strong` (token novo)**: a WCAG distingue borda decorativa de
  borda que identifica um controle. `border` (zinc-200, 1.2:1) continua
  para divisórias sutis; `border-strong` (zinc-500, 4.8:1 light / 3.7:1
  dark) entra para borda de input, borda do botão outline e trilho do
  switch — os lugares onde a regra 1.4.11 se aplica.
- `danger-text` no dark: era **branco sobre red-400 = 2.77:1, reprovado**
  — bug real da fase 1 que o verificador pegou. Agora zinc-950 sobre
  red-400 = 7.2:1.

## Razões medidas (saída do verificador em 2026-07-11)

| par | light | dark | mínimo |
|---|---|---|---|
| text / bg | 14.89 | 16.12 | 4.5 |
| text / bg-subtle | 13.55 | 13.55 | 4.5 |
| text-muted / bg | 7.73 | 6.91 | 4.5 |
| text-muted / bg-subtle | 7.03 | 5.81 | 4.5 |
| accent-text / accent | 14.89 | 16.12 | 4.5 |
| danger-text / danger | 4.83 | 7.19 | 4.5 |
| danger / bg | 4.83 | 6.40 | 4.5 |
| border-strong / bg | 4.83 | 3.67 | 3.0 |
| accent / bg (foco) | 14.89 | 16.12 | 3.0 |

## Consequências

- Par de cor novo em componente ⇒ declarar em `check-contrast.mjs` junto
  com o mínimo aplicável; o build passa a proteger o par para sempre.
- `border` decorativa fica deliberadamente fora do verificador — ela *deve*
  poder ser sutil.
- No Figma, `border-strong` é só mais uma Variable na coleção Semantic —
  nenhuma mudança estrutural na ponte.
