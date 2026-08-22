#!/usr/bin/env node
// Servidor MCP do baseline-ui — ver docs/specs/0005-baseline-ui-mcp/ e ADR 0012.
// Expõe baseline.manifest.json, tokens/*.json e docs/guarantees.json como
// tools consultáveis, pra um agente não precisar ler node_modules na mão.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { listComponents } from './tools/list-components.mjs'
import { getComponent } from './tools/get-component.mjs'
import { getTokens } from './tools/get-tokens.mjs'
import { getGuarantees } from './tools/get-guarantees.mjs'

const server = new McpServer({ name: 'baseline-ui-mcp', version: '0.1.0' })

const asText = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] })

server.registerTool(
  'list_components',
  {
    title: 'Listar componentes',
    description:
      'Lista os componentes do baseline-ui com um resumo de cada um (tipo, partes/props/estados).',
  },
  async () => asText(listComponents()),
)

server.registerTool(
  'get_component',
  {
    title: 'Detalhar componente',
    description:
      'Retorna o contrato completo de um componente a partir de baseline.manifest.json — partes, props, estados, tokens consumidos.',
    inputSchema: { name: z.string().describe('Nome do componente, ex.: "Switch"') },
  },
  async ({ name }) => {
    try {
      return asText(getComponent(name))
    } catch (err) {
      return { ...asText({ error: err.message }), isError: true }
    }
  },
)

server.registerTool(
  'get_tokens',
  {
    title: 'Obter tokens',
    description: 'Retorna os tokens primitivos e semânticos (modos claro e escuro) do baseline-ui.',
  },
  async () => asText(getTokens()),
)

server.registerTool(
  'get_guarantees',
  {
    title: 'Obter garantias de acessibilidade',
    description:
      'Retorna as garantias de acessibilidade verificadas (foco, contraste, motion, área de toque). Sem argumento, retorna as garantias globais; com um nome de componente, funde com as específicas dele.',
    inputSchema: {
      component: z.string().optional().describe('Nome do componente, ex.: "Switch" (opcional)'),
    },
  },
  async ({ component }) => asText(getGuarantees(component)),
)

const transport = new StdioServerTransport()
await server.connect(transport)
