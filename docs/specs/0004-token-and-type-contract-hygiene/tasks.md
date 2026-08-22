# 0004 — token-and-type-contract-hygiene — Tasks

- [x] Varredura real de hardcode em `src/**/*.{css,tsx}` (feita, ver
      plan.md) — triagem completa das 25 ocorrências
- [x] Tokens novos `focus-ring.width`/`focus-ring.offset` em
      `tokens/primitives.json`, regenerado `tokens.css`
- [x] Aplicar os tokens novos nos 5 lugares (`outline`/`outline-offset`:
      Accordion, Button, Field, Switch, Tabs)
- [x] Fix mecânico: `Dialog.css` `32px` → `var(--bl-space-6)`
- [x] Comentário inline nos hardcoded intencionais restantes (border 1px,
      Dialog 420px, Progress 6px, Spinner border-width)
- [x] ADR 0011 — duplicatas de token não consolidadas, com o porquê
- [x] Tipos `*Props` nomeados e exportados: Accordion, Dialog, Field,
      Switch, Tabs
- [x] Auditar union types vs string aberta nos 14 componentes — nenhum
      achado (já 100% union type restrito), documentado na ADR 0011
- [x] `baseline.manifest.json` atualizado com `focus-ring.width`/
      `focus-ring.offset` nos 5 componentes, `npm run docs` regenerado
- [x] `npm run build`, `typecheck`, `test`, `lint`, `format:check` verdes
- [ ] Commit(s), push, PR, CI verde real, merge
