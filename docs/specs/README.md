# Specs do baseline-ui

Iniciativas transversais, com critério de aceite e prazo de "feito" —
diferente de `docs/roadmap.md` (que cobre só o horizonte de vocabulário
de componentes: o que entra depois, quando a ponte Figma acontece) e de
`docs/decisions/` (que registra decisões arquiteturais permanentes, uma
vez tomadas).

Cada spec vive em `NNNN-nome-kebab-case/`, numerada com 4 dígitos
espelhando `docs/decisions/000N-*` — as duas séries se citam cruzado
(spec → ADR, ADR → spec) sem ambiguidade.

## Ciclo de vida

1. **`spec.md`** — o quê e por quê. Escrito antes de qualquer código:
   problema, objetivos, não-objetivos, critério de aceite.
2. **`plan.md`** — o como. Design técnico, arquivo por arquivo onde
   relevante. Só produz uma ADR nova se contiver uma decisão real com
   alternativas rejeitadas — adoção de ferramental padrão sem trade-off
   não gera ADR.
3. **`tasks.md`** — passos sequenciados e verificáveis, cada um pensado
   pra ser um commit revisável sozinho.

Status de cada spec fica na primeira linha do próprio `spec.md`
(`Status: draft | active | done`), mesmo padrão das ADRs — sem pasta de
arquivamento separada; o histórico do git já documenta quando foi feito.

Template em [`_template/`](./_template/).

## Specs ativas

| # | Nome | Status | Cobre |
|---|---|---|---|
| [0001](./0001-tooling-foundation/spec.md) | tooling-foundation | draft | CI/CD, ESLint, Prettier, Husky |
| [0002](./0002-accessibility-contract-completion/spec.md) | accessibility-contract-completion | draft | Área de toque do Switch (44×44), teste de regressão de `prefers-reduced-motion` |
| [0003](./0003-generated-documentation/spec.md) | generated-documentation | draft | Docs geradas do manifest, `AGENTS.md`, `llms.txt`, `CONTRIBUTING.md` |
| [0004](./0004-token-and-type-contract-hygiene/spec.md) | token-and-type-contract-hygiene | draft | Tipos `*Props` nomeados, union types, limpeza de tokens hardcoded |
| [0005](./0005-baseline-ui-mcp/spec.md) | baseline-ui-mcp | draft | Servidor MCP expondo manifest + tokens + garantias |

Ordem de execução: 0001 → 0002 → 0003 → 0004 → 0005 — cada `spec.md`
explica o porquê da posição na fila na própria seção "Por que essa
ordem".

## Origem

Todas as 5 specs vieram de um audit real (`ds-audit`, ferramenta
open-source da Southleft) rodado contra o baseline-ui em 2026-08-11 —
nota 70/100 (C), relatório completo em `audit/report.md` (não
versionado) — cruzado com achados próprios da sessão (hit-area do
Switch, `prefers-reduced-motion` sem teste, frase de posicionamento em
`docs/positioning.md` só ~90% verdadeira até a spec 0002 fechar).
