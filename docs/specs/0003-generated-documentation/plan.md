# 0003 — generated-documentation — Plan

## Abordagem

### `scripts/generate-docs.mjs`

Lê `baseline.manifest.json` (única fonte — nunca lê `.tsx`/`.css` pra
não duplicar o que `check-manifest.mjs` já garante consistente) e emite
`docs/components/<Nome>.md`, um por componente, na mesma disciplina de
`build-tokens.mjs`: cabeçalho "ARQUIVO GERADO", nunca editado à mão.

Cada página renderiza, direto dos campos do manifest:

- `kind` (single/compound) e `base` (pacote do Base UI, ou "nenhum —
  componente puro" quando `base: null`)
- Tabela de partes (`parts`) pra `compound`, ou a `cssClass` única pra
  `single`
- Tabela de props (`values`, `default`, `dataAttribute`) quando existir
- Lista de `states`
- Lista de `tokens` consumidos, cada um linkado pro arquivo de origem
  (`tokens/primitives.json` ou `semantic.*.json`, resolvido por prefixo)

Componentes com `base` != null recebem uma nota fixa linkando ADR 0001
(Base UI = comportamento) — não é dado do manifest, é contexto estático
sempre igual, então fica hardcoded no gerador, não inventado por
componente.

`docs/components/README.md` (índice) também gerado, listando os 14 com
link — evita manter esse índice à mão toda vez que a Fase 2 adicionar
componente novo.

### `AGENTS.md`

Não gerado — é prosa curada, não dado estrutural. Cobre: como importar,
a regra de "3 entregas" (TSX+CSS+manifest+teste — na verdade 4, o
manifest já cobra a 3ª no build), convenção de tokens (nunca valor bruto
em CSS de componente), e 2-3 armadilhas reais descobertas nesta sessão
(o `valueMissing`/dirty do `Field`, a especificidade do `Grid` que
mordeu o nbd-scheduler).

### `llms.txt`

Formato simples (não há spec formal universal ainda) — lista curada de
pontos de entrada com uma linha de contexto cada, apontando pra
`AGENTS.md`, `docs/components/README.md`, `baseline.manifest.json`,
`docs/positioning.md`, `docs/decisions/`.

### `CONTRIBUTING.md`

Processo humano: como propor um componente novo, quando abrir uma spec
(`docs/specs/`) vs quando só uma ADR basta (regra já existe em
`docs/specs/README.md`, replicada aqui em linguagem de contribuidor).

## Decisões

- **Gerar em vez de escrever à mão** — já é a decisão da spec em si
  (objetivo, não escolha de plan.md), não repete aqui.
- **`AGENTS.md`/`llms.txt`/`CONTRIBUTING.md` não são gerados, são
  prosa** — não há trade-off real a discutir (não dá pra gerar prosa de
  convenção a partir de dado estruturado que não existe pra isso) →
  **não gera ADR**.

## Verificação

- `npm run docs` gera 14 arquivos + índice, sem erro.
- Apagar um componente do `baseline.manifest.json` temporariamente e
  rodar de novo — confirma que o gerador reflete o manifest atual, não
  um cache.
- `npx markdown-link-check` ou checagem manual dos links do `llms.txt`.
- Rodar `dsaudit` de novo, comparar nota de Documentation/AI Readiness
  contra o baseline de 75/C e 43/F.

## Riscos / rollback

Nenhum — só arquivos novos, nada em `src/` muda. Reversível trivialmente.
