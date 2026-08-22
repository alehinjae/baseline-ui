# 0003 — generated-documentation — Tasks

- [x] `scripts/generate-docs.mjs` — lê manifest, emite
      `docs/components/<Nome>.md` + índice, formatado via Prettier
      programaticamente (evita reprovar `format:check` a cada rebuild)
- [x] `npm run docs` script, encadeado em `npm run build`
- [x] `AGENTS.md` na raiz
- [x] `llms.txt` na raiz
- [x] `CONTRIBUTING.md`
- [x] `docs/README.md` — índice geral (achado durante o audit
      comparativo, não estava no plano original)
- [x] Rodado `npm run docs`, conferidos os 14 arquivos + índice
- [x] Testado reflexo do manifest (`Tooltip` hipotético adicionado,
      apareceu, revertido) — idempotência confirmada por checksum
- [x] Links do `llms.txt` conferidos (10/10 apontam pra arquivo real)
- [x] `ds-audit` rodado de novo: 70/100 (C) → **81/100 (B)**
- [x] `npm run build`, `test` (62/62), `lint`, `format:check` verdes
- [ ] Commit(s), push, PR, CI verde real, merge

## Achados durante a execução (fora do plano original)

- Encontrada e corrigida uma pasta `ds-bundle/`/`.ds-sync/` (2MB, gerada
  pelo Claude Design/claude.ai/design sincronizando com o pacote) que
  não estava no `eslint.config.js` — já estava no `.gitignore`, só
  faltava alinhar o ESLint. Não é código nosso, não foi tocada.
- Gerador de docs precisou formatar a própria saída com Prettier
  programaticamente — sem isso, cada `npm run build` reprovaria
  `format:check` mesmo sem mudança real de conteúdo.
