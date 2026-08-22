# baseline-ui-mcp

Servidor MCP do baseline-ui. Expõe `baseline.manifest.json`,
`tokens/*.json` e `docs/guarantees.json` como tools consultáveis, pra um
agente de IA não precisar ler arquivos direto do `node_modules`. Ver
[docs/specs/0005-baseline-ui-mcp/](../docs/specs/0005-baseline-ui-mcp/)
e [ADR 0012](../docs/decisions/0012-mcp-server-como-subpacote-separado.md)
(por que é um subpacote separado, com dependências próprias).

## Tools

- `list_components` — resumo dos 14 componentes (tipo, partes, props, estados).
- `get_component(name)` — contrato completo de um componente, idêntico ao
  que está em `baseline.manifest.json`.
- `get_tokens()` — tokens primitivos e semânticos, modos claro e escuro.
- `get_guarantees(component?)` — garantias de acessibilidade verificadas
  (foco, contraste, motion, área de toque), citando o ADR/script que
  comprova cada uma. Sem argumento, retorna o mapa inteiro.

## Instalar e rodar

Dentro desta pasta (as dependências do MCP não entram no
`package.json` raiz do baseline-ui — ver ADR 0012):

```bash
npm install
```

## Registrar num projeto consumidor

No `.mcp.json` do projeto que consome o baseline-ui:

```json
{
  "mcpServers": {
    "baseline-ui": {
      "command": "node",
      "args": ["node_modules/baseline-ui/mcp-server/index.mjs"]
    }
  }
}
```

(Ajuste o caminho se o baseline-ui estiver em outro lugar — ex.: um
clone local em vez de `node_modules`.)

## Testar

```bash
npm test    # tools/*.test.mjs — funções isoladas, contra os dados reais do repo
npm run smoke  # sobe o servidor de verdade via stdio e chama as 4 tools
```
