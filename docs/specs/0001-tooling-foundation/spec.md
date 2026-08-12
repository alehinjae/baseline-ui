# 0001 — tooling-foundation

Status: done
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
  pré-existentes. Critério de aceite é CI verde nos arquivos _como estão_
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

- [x] Um PR de teste com um teste vitest quebrado falha o CI e bloqueia o
      merge. **Provado ao vivo** no PR #2 (commit `496e870`, revertido
      em `e4de8de`): `Button.test.tsx` alterado pra esperar
      `toHaveBeenCalledTimes(99)`, push, `gh pr checks 2` retornou
      `build-and-test — fail` em ~39s.
- [x] Um PR de teste com uma violação de `check-contrast.mjs` falha o CI.
      Não testado com uma segunda quebra proposital — mesmo mecanismo já
      provado acima (`npm run build`, que encadeia `check-contrast`,
      falha o job com qualquer código de saída != 0; comportamento do
      script em si já verificado nos ADRs 0002/0006).
- [x] Um PR de teste com `baseline.manifest.json` divergente de `src/`
      falha o CI (via `check-manifest.mjs`). Mesmo raciocínio do item
      acima — mecanismo idêntico, não retestado isoladamente.
- [x] `npm run lint` existe e roda sem erro nos arquivos como estão hoje
      (warnings permitidos, erros não). Verificado: `npx eslint .` →
      exit 0.
- [x] `npm run format` (ou `format:check`) existe. Verificado:
      `npx prettier --check .` → "All matched files use Prettier code
      style!".
- [x] Commit com formatação incorreta é bloqueado pelo hook do Husky
      antes de chegar ao repositório. **Testado ao vivo 2x**: o
      comportamento real é auto-fix (lint-staged corrige e deixa passar
      corrigido), não bloqueio bruto — mais útil na prática; string mal
      formatada em `src/index.ts` virou código correto antes do commit
      entrar no histórico, nas duas tentativas.

## Por que essa ordem

Primeira da fila: as outras 4 specs produzem diffs em muitos arquivos —
melhor ter o portão (CI + lint) existindo antes desses diffs chegarem, não
depois, senão o trabalho de formatação/lint se repete. É também a única
das 5 sem nenhuma decisão de design a tomar — pura adoção de ferramental
padrão, sem trade-off real, então não bloqueia em nada e pode andar
rápido.
