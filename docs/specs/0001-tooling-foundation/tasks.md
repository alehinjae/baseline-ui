# 0001 — tooling-foundation — Tasks

- [x] Instalar devDependencies: `eslint`, `@eslint/js`, `typescript-eslint`,
      `eslint-plugin-react`, `eslint-plugin-react-hooks`,
      `eslint-plugin-jsx-a11y`, `eslint-config-prettier`
- [x] Criar `eslint.config.js` (flat config), severidade warn-only no
      baseline, error só em regras de bug real
- [x] `npm run lint` script no `package.json`
- [x] Instalar `prettier`, criar `.prettierrc.json` + `.prettierignore`
- [x] `npm run format` / `npm run format:check` scripts
- [x] Rodar `prettier --write` uma vez no repositório inteiro (commit
      próprio, separado da config, pra diff de formatação não se misturar
      com diff de config)
- [x] Instalar `husky` + `lint-staged`, `npx husky init`
- [x] Configurar `lint-staged` no `package.json` (eslint --fix +
      prettier --write nos arquivos staged)
- [x] Testar o hook localmente (2x: string mal formatada corrigida
      automaticamente antes do commit — comportamento é auto-fix, não
      bloqueio; testes revertidos com `git reset --soft`)
- [x] `scripts/prepare.mjs` — guard pra não rodar husky em consumidor via
      `npm install github:...` (só builda; instala hook só se `.git`
      existir), testado isolado fora de qualquer repositório git
- [x] Criar `.github/workflows/ci.yml` — `npm ci`, build, typecheck,
      test, lint, format:check em push/PR pra main
- [x] Verificar os 6 critérios de aceite do `spec.md`
- [x] Commit(s), push da branch `specs/0001-tooling-foundation`, abrir PR
      ([#2](https://github.com/alehinjae/baseline-ui/pull/2))
- [x] Confirmar CI verde no PR real — provado nos dois sentidos: falha
      de propósito com teste quebrado (commit `496e870`), depois volta a
      passar após revert (`e4de8de`)
