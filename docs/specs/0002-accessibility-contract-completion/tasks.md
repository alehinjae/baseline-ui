# 0002 — accessibility-contract-completion — Tasks

- [x] Reescrever `Switch.css`: box do Root em 44×44, trilho visual em
      `::before` compacto (36×20), thumb reposicionado
- [x] Medir ao vivo no navegador (Browser pane): hit-area real (44×44
      confirmado, dois modos, três estados) — screenshot não disponível
      nesta sessão (limitação de compositing do painel), verificação
      feita via `getBoundingClientRect()`/`getComputedStyle` real
- [x] `Switch.test.tsx` conferido — não precisou mudar (testa
      comportamento/atributos, não geometria; 4/4 continuam passando)
- [x] ADR 0010 — registra a decisão de 44×44 via pseudo-elemento,
      estendendo ADR 0008
- [x] Teste estrutural de `prefers-reduced-motion`
      (`src/reduced-motion.test.ts`) — testado quebrando de propósito
      (removido `!important`, confirmado que falha, restaurado)
- [x] `baseline.manifest.json` conferido — sem mudança necessária
      (`--_hit` é variável CSS local, não token; `check-manifest.mjs`
      passa)
- [x] `docs/positioning.md` escrito, linkado no README
- [x] `npm run build`, `test` (62/62), `lint`, `format:check` verdes
      localmente
- [ ] Commit(s), push, abrir PR, confirmar CI verde real
- [ ] Merge
