# 0001 — tooling-foundation — Tasks

- [ ] Instalar devDependencies: `eslint`, `@eslint/js`, `typescript-eslint`,
      `eslint-plugin-react`, `eslint-plugin-react-hooks`,
      `eslint-plugin-jsx-a11y`, `eslint-config-prettier`
- [ ] Criar `eslint.config.js` (flat config), severidade warn-only no
      baseline, error só em regras de bug real
- [ ] `npm run lint` script no `package.json`
- [ ] Instalar `prettier`, criar `.prettierrc.json` + `.prettierignore`
- [ ] `npm run format` / `npm run format:check` scripts
- [ ] Rodar `prettier --write` uma vez no repositório inteiro (commit
      próprio, separado da config, pra diff de formatação não se misturar
      com diff de config)
- [ ] Instalar `husky` + `lint-staged`, `npx husky init`
- [ ] Configurar `lint-staged` no `package.json` (eslint --fix +
      prettier --write nos arquivos staged)
- [ ] Testar o hook localmente (commit proposital com formatação errada,
      confirmar bloqueio, reverter o teste)
- [ ] Criar `.github/workflows/ci.yml` — `npm ci`, build, typecheck,
      test, lint em push/PR pra main
- [ ] Verificar os 6 critérios de aceite do `spec.md`
- [ ] Commit(s), push da branch `specs/0001-tooling-foundation`, abrir PR
- [ ] Confirmar CI verde no PR real (não só leitura do YAML)
