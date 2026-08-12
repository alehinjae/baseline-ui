# 0003 — generated-documentation

Status: draft
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

- [ ] `npm run docs` (ou equivalente) gera `docs/components/*.md` pros
      14 componentes, sem erro, a partir do manifest atual.
- [ ] Um componente novo (hipotético) adicionado ao manifest aparece nos
      docs gerados na próxima execução do script, sem edição manual.
- [ ] `AGENTS.md` existe e é lido corretamente por um agente novo (testar
      pedindo pra um agente sem contexto prévio resumir as convenções do
      projeto só a partir dele).
- [ ] `llms.txt` existe e aponta pros arquivos corretos (sem link
      quebrado).
- [ ] `CONTRIBUTING.md` existe.
- [ ] Rodar `ds-audit` de novo (mesma ferramenta usada em 2026-08-11)
      mostra "Documentation" e "AI Readiness" subindo de nota — não é
      obrigatório bater 100, mas a direção precisa ser mensurável.

## Por que essa ordem

Terceira da fila: quase tudo aditivo (arquivos novos, comentários novos),
risco baixo de regressão — mas precisa rodar depois da Spec 0002 pra não
documentar o `Switch` como "atende WCAG AA" antes de isso ser verdade
(os docs gerados vão incluir as garantias de acessibilidade por
componente).
