# 0001 — tooling-foundation

Status: draft
Owner: alehinjae
Related: audit gap: Tooling & Infrastructure 62/D (`audit/report.md`)

## Problema

Todo `npm run build`, `npm run test`, `npm run check-manifest` e
`npm run check-contrast` só roda manualmente, executado à mão em cada
sessão de trabalho — nada impede um push com testes quebrados, contraste
reprovado, ou manifest divergente de chegar na `main`. Não existe
`.github/workflows/`. Não existe ESLint, Prettier, nem hook de
pre-commit — zero portão automatizado além do que já roda dentro de
`npm run build` localmente.

## Objetivos

- CI (GitHub Actions) rodando `npm run build` (que já encadeia tokens,
  check-contrast, check-manifest, tsup), `npm run test` e
  `npm run typecheck` em todo push e pull request.
- ESLint configurado (regras JS/TS + React, incluindo
  `eslint-plugin-jsx-a11y` — recomendação direta do audit).
- Prettier configurado, com formatação consistente no repositório.
- Husky com hook de pre-commit rodando lint + format nos arquivos
  staged.

## Não-objetivos

- **Não é "zerar todo warning do ESLint hoje"** — introduzir lint numa
  base que nunca teve vai revelar uma cauda longa de violações
  pré-existentes. Critério de aceite é CI verde nos arquivos *como estão*
  (baseline de warning, não de erro, pro código já existente); severo só
  no que for tocado a partir de agora. Limpeza de código pré-existente
  pertence às specs 0003/0004, que já vão tocar esses arquivos por outro
  motivo.
- E2E (Cypress/Playwright) — fica de fora por precisar de uma decisão de
  alvo de teste (contra o quê? a demo? uma página gerada pela spec 0003?)
  que ainda não existe. Não faz parte desta spec.
- Storybook como ferramenta de teste de componente — decisão já tomada
  em conversa anterior: não adotar Storybook (ver spec 0003).

## Critério de aceite

- [ ] Um PR de teste com um teste vitest quebrado falha o CI e bloqueia o
      merge.
- [ ] Um PR de teste com uma violação de `check-contrast.mjs` falha o CI.
- [ ] Um PR de teste com `baseline.manifest.json` divergente de `src/`
      falha o CI (via `check-manifest.mjs`).
- [ ] `npm run lint` existe e roda sem erro nos arquivos como estão hoje
      (warnings permitidos, erros não).
- [ ] `npm run format` (ou `format:check`) existe.
- [ ] Commit com formatação incorreta é bloqueado pelo hook do Husky
      antes de chegar ao repositório.

## Por que essa ordem

Primeira da fila: as outras 4 specs produzem diffs em muitos arquivos —
melhor ter o portão (CI + lint) existindo antes desses diffs chegarem, não
depois, senão o trabalho de formatação/lint se repete. É também a única
das 5 sem nenhuma decisão de design a tomar — pura adoção de ferramental
padrão, sem trade-off real, então não bloqueia em nada e pode andar
rápido.
