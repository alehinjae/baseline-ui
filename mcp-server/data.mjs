// Lê baseline.manifest.json, tokens/*.json e docs/guarantees.json direto
// do repositório (caminho relativo — mcp-server/ vive dentro do próprio
// repo do baseline-ui, não precisa duplicar nem versionar cópia própria).
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function readJSON(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), 'utf8'))
}

export function loadManifest() {
  return readJSON('baseline.manifest.json')
}

export function loadTokens() {
  return {
    primitives: readJSON('tokens/primitives.json'),
    semantic: {
      light: readJSON('tokens/semantic.light.json'),
      dark: readJSON('tokens/semantic.dark.json'),
    },
  }
}

export function loadGuarantees() {
  return readJSON('docs/guarantees.json')
}
