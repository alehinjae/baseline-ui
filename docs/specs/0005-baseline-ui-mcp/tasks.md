# 0005 — baseline-ui-mcp — Tasks

- [x] `scripts/token-source.mjs` — extrai `tokenFile()` de
      `generate-docs.mjs`, ambos passam a importar dali
- [x] `docs/guarantees.json` — dado hand-authored, citando ADR/script por
      entrada
- [x] ADR 0012 — subpacote `mcp-server/` separado, sem tocar
      `package.json` principal
- [x] `mcp-server/package.json` + `mcp-server/index.mjs` (stdio
      transport, `@modelcontextprotocol/sdk`)
- [x] `mcp-server/tools/{list-components,get-component,get-tokens,get-guarantees}.mjs`
- [x] `mcp-server/tools/*.test.mjs` (`node --test`) contra os dados reais
      do repo — 9/9 passando
- [x] `mcp-server/smoke-test.mjs` (Client real via stdio, chama as 4
      tools) — passou, output colado no PR
- [x] `mcp-server/README.md` — como registrar num `.mcp.json` consumidor
- [x] `AGENTS.md`/`llms.txt`: seção "Consultando via MCP"
- [~] Registrado em `.mcp.json` deste repo (feito); consulta via agente
  de IA na própria UI de tools fica pendente de sessão nova (ver
  spec.md) — verificação via protocolo MCP real (SDK Client/Server)
  já feita no smoke-test
- [x] `npm run build`/`test`/`lint`/`format:check` do pacote principal
      verdes (subpacote não entra no build)
- [ ] Commit(s), push, PR, CI verde real, merge
