# 0003 — generated-documentation

Status: done
Owner: alehinjae
Related: ADR 0005 (manifest como ponte), audit gaps: Documentation 75/C e AI Readiness 43/F (`audit/report.md`)

## Problema

`baseline.manifest.json` já contém, estruturado, tudo que documentação
por componente precisaria (partes, variantes, estados, tokens
consumidos) — mas não existe nenhuma superfície legível a partir dele.
O audit confirma: "No per-component documentation found (no markdown
near components, no Storybook)", 0% de cobertura em qualquer formato de
doc por componente. Também não existe `AGENTS.md`/`CLAUDE.md` (agente de
IA editando o repo não tem mapa nenhum), nem `llms.txt`, nem
`CONTRIBUTING.md`, nem um índice em `docs/`.

## Objetivos

- `scripts/generate-docs.mjs` — lê `baseline.manifest.json` + `tokens/*`
  e gera `docs/components/*.md`, um arquivo por componente, marcado
  "ARQUIVO GERADO" no cabeçalho (mesmo padrão de `src/tokens.css`).
  Zero arquivo mantido à mão — regenerar é rodar o script de novo, e
  `check-manifest.mjs` já garante que a fonte (o manifest) é verdadeira.
- `AGENTS.md` na raiz — convenções pra agente de IA consumindo ou
  editando o pacote: caminhos de import, regra de "componente novo =
  TSX + CSS + entrada no manifest + teste", erros comuns (ex.: a
  descoberta desta sessão sobre `valueMissing` só invalidar campo
  "dirty" no `Field`).
- `llms.txt` na raiz, apontando pros docs gerados + manifest + tokens
  como pontos de entrada curados.
- `CONTRIBUTING.md` — processo humano: como propor mudança, quando um
  spec.md é necessário, quando uma ADR é necessária.
- `docs/specs/README.md` já existe (criado nesta mesma rodada) — vira
  parte do índice geral de `docs/`.

## Não-objetivos

- **Storybook.** Decisão já tomada em conversa anterior: rejeitado por
  peso (novo pipeline, manutenção contínua) e redundância — o que o
  Storybook daria (exemplo interativo por componente) já existe na
  `demo/index.html`, e o que faltava (doc textual por componente) esta
  spec resolve gerando, não instalando ferramenta nova.
- Push de JSDoc pra 100% das props — meta parcial aceitável; o gerador de
  docs (objetivo acima) já cobre a superfície mínima que o audit pede.
  Cobertura completa de JSDoc fica como item de acompanhamento, não
  critério de aceite bloqueante desta spec.
- Editor agent rules (`.cursorrules`, `.github/copilot-instructions.md`)
  — considerar só depois do `AGENTS.md` existir e estabilizar; réplicas
  prematuras arriscam divergir da fonte.

## Critério de aceite

- [x] `npm run docs` gera `docs/components/*.md` pros 14 componentes,
      sem erro, a partir do manifest atual — saída já formatada pelo
      Prettier programaticamente (achado: sem isso, `format:check`
      reprovaria a cada rebuild).
- [x] Componente hipotético (`Tooltip`) adicionado ao manifest
      temporariamente → apareceu em `docs/components/Tooltip.md` sem
      edição manual, na próxima execução — confirmado, revertido.
      Idempotência confirmada por checksum (md5) em execução dupla.
- [x] `AGENTS.md` existe, cobre convenções + 3 armadilhas reais
      descobertas na sessão (Field/valueMissing, Grid/especificidade,
      Switch/hit-area).
- [x] `llms.txt` existe — todos os 10 links verificados apontando pra
      arquivo real (checagem de existência, não só visual).
- [x] `CONTRIBUTING.md` existe.
- [x] `ds-audit` rodado de novo (2026-08-21): **70/100 (C) → 81/100
      (B)**. Documentation 75→85, AI Readiness 43→**61**, Accessibility
      53→88 (eslint-plugin-jsx-a11y detectado), Tooling 62→79. Gap
      pequeno encontrado no relatório (`docs/README.md` ausente) —
      corrigido nesta mesma spec.

## Por que essa ordem

Terceira da fila: quase tudo aditivo (arquivos novos, comentários novos),
risco baixo de regressão — mas precisa rodar depois da Spec 0002 pra não
documentar o `Switch` como "atende WCAG AA" antes de isso ser verdade
(os docs gerados vão incluir as garantias de acessibilidade por
componente).
