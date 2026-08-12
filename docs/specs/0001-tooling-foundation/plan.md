# 0001 — tooling-foundation — Plan

## Abordagem

**ESLint** (flat config, `eslint.config.js`, ESM — combina com `"type":
"module"` do `package.json`): `@eslint/js` (recomendado) +
`typescript-eslint` (regras TS) + `eslint-plugin-react` +
`eslint-plugin-react-hooks` + `eslint-plugin-jsx-a11y` (pedido direto do
audit) + `eslint-config-prettier` (desliga regras de formatação que
conflitam com o Prettier — cada ferramenta cuida de uma coisa só).
Severidade: `warn` em tudo por padrão (baseline pros 70 arquivos
existentes, per o não-objetivo da spec), exceto regras que pegam bug real
(`react-hooks/rules-of-hooks`, `no-undef` em TS) que ficam `error` —
essas não deveriam disparar em código correto de qualquer forma.

**Prettier**: `.prettierrc.json` com as convenções que o código já segue
hoje (aspas simples, sem ponto-e-vírgula — confirmado lendo os arquivos
existentes), `.prettierignore` cobrindo `dist/`, `coverage/`, `audit/`,
`src/tokens.css` (gerado, não se formata fonte gerada).

**Husky + lint-staged**: hook de pre-commit rodando `lint-staged`, que
por sua vez roda `eslint --fix` + `prettier --write` só nos arquivos
staged — não no repositório inteiro (rápido, e não força reescrever
arquivo que ninguém tocou).

**GitHub Actions**: um workflow (`.github/workflows/ci.yml`) rodando em
`push` e `pull_request` pra `main`: `npm ci`, depois `npm run build`
(que já encadeia tokens→check-contrast→check-manifest→tsup),
`npm run typecheck`, `npm run test`, `npm run lint`. Falha em qualquer
um desses passos falha o job — sem passo "continue-on-error".

## Decisões

- **Severidade warn-only no baseline, não `--max-warnings 0`** — decisão
  já registrada no `spec.md` (não-objetivo). Sem alternativa considerada
  aqui além da já descartada (`error` em tudo desde o dia 1, rejeitada
  porque pararia todo PR das specs 0002-0004 que ainda não tocaram os
  arquivos problemáticos). Ferramental padrão, sem trade-off real →
  **não gera ADR**, conforme regra do `docs/specs/README.md`.
- **`eslint-config-prettier` em vez de `eslint-plugin-prettier`** — a
  primeira só desliga regras conflitantes, a segunda roda o Prettier
  _dentro_ do ESLint (mais lento, reporta formatação como lint error).
  Preferida a primeira: as duas ferramentas continuam independentes,
  cada uma no seu script.

## Verificação

- `npm run lint` roda sem erro (warnings permitidos) nos arquivos como
  estão hoje.
- `npm run format:check` roda sem erro (formatação já aplicada antes do
  commit desta spec).
- Um commit com código mal formatado é bloqueado pelo hook do Husky
  (testado localmente: `git commit` com um arquivo sujo proposital,
  depois revertido).
- CI real: PR desta própria spec dispara o workflow no GitHub Actions —
  o run precisa terminar verde antes do merge (prova ao vivo, não só
  leitura do YAML).

## Riscos / rollback

Baixo risco — nada em `src/` muda de comportamento, só formatação
(reversível via `git revert`) e arquivos de configuração novos. Se o
hook do Husky incomodar no dia a dia, é removível sem afetar o pacote
publicado (nenhum desses arquivos entra em `dist/` nem no `files` do
`package.json`).
