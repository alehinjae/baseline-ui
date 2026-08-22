# 0012 — Servidor MCP como subpacote separado

Status: aceito | Data: 2026-08-22

## Contexto

A Spec 0005 pede um servidor MCP próprio (`list_components`,
`get_component`, `get_tokens`, `get_guarantees`) expondo
`baseline.manifest.json`/`tokens/*.json`/`docs/guarantees.json` a um
agente de IA. Precisa do SDK oficial `@modelcontextprotocol/sdk`.

## Decisão

O servidor MCP vive em `mcp-server/`, com seu próprio `package.json` e
`node_modules` — **não** entra em `dependencies` do `package.json`
raiz do baseline-ui.

## Alternativa rejeitada

Adicionar `@modelcontextprotocol/sdk` direto no `package.json`
principal. Mais simples de instalar (um `npm install` só) — mas o
pacote principal hoje tem uma única dependência real de fato
(`@base-ui/react`, ver ADR 0001/0009), característica buscada
ativamente, não acidental: qualquer projeto que só quer os componentes
React do baseline-ui não deveria baixar o SDK do MCP (nem seu grafo de
dependências) sem usá-lo.

## Consequências

- Quem quer rodar o MCP precisa de um `npm install` extra dentro de
  `mcp-server/` — documentado em `mcp-server/README.md`.
- Como o baseline-ui é instalado via `github:alehinjae/baseline-ui`
  (não é publicado num registro npm — ADR 0004), consumidores já
  recebem o repositório inteiro, incluindo `mcp-server/`; não precisa
  de publicação separada, só do `npm install` local antes do primeiro
  uso.
- `mcp-server/node_modules` fica no `.gitignore`, igual ao `node_modules`
  raiz.
