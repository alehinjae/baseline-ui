#!/usr/bin/env node
// Prova end-to-end de verdade: sobe index.mjs como processo real via
// stdio e chama as 4 tools através do protocolo MCP, não das funções
// internas direto (isso já é coberto por tools/*.test.mjs).
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [join(here, 'index.mjs')],
})

const client = new Client({ name: 'smoke-test', version: '0.1.0' })
await client.connect(transport)

const parse = (result) => JSON.parse(result.content[0].text)

const tools = await client.listTools()
console.log(`tools registradas: ${tools.tools.map((t) => t.name).join(', ')}`)

const components = parse(await client.callTool({ name: 'list_components', arguments: {} }))
console.log(`list_components: ${components.length} componentes`)

const field = parse(await client.callTool({ name: 'get_component', arguments: { name: 'Field' } }))
console.log(
  `get_component("Field"): kind=${field.kind}, partes=${Object.keys(field.parts).join(',')}`,
)

const tokens = parse(await client.callTool({ name: 'get_tokens', arguments: {} }))
console.log(`get_tokens: ${Object.keys(tokens.primitives).length} grupos de primitivos`)

const guarantees = parse(
  await client.callTool({ name: 'get_guarantees', arguments: { component: 'Switch' } }),
)
console.log(`get_guarantees("Switch"): hitArea=${guarantees.hitArea.guarantee}`)

await client.close()

const ok =
  tools.tools.length === 4 &&
  components.length === 14 &&
  field.kind === 'compound' &&
  guarantees.hitArea.guarantee.includes('44x44')

if (!ok) {
  console.error('smoke test falhou: resultado inesperado de uma ou mais tools')
  process.exit(1)
}
console.log('smoke test ok: as 4 tools respondem via protocolo MCP real (stdio)')
