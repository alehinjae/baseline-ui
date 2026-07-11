// Valida que baseline.manifest.json não divergiu do código — roda no build.
// Um manifest desatualizado é pior que nenhum: a ponte com o Figma geraria
// componentes que não existem mais ou perderia tokens novos. Três checagens:
// 1. todo componente do manifest é exportado em src/index.ts (e vice-versa);
// 2. todo token referenciado existe em tokens/ (primitivo ou semântico);
// 3. toda cssClass declarada aparece no CSS do componente.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const manifest = JSON.parse(read('baseline.manifest.json'))
const errors = []

// 1 — exports de src/index.ts ↔ componentes do manifest
const indexSrc = read('src/index.ts')
const exported = [...indexSrc.matchAll(/export (?:\{ (\w+) \}|\* as (\w+)) from/g)]
  .map((m) => m[1] ?? m[2])
  .filter((name) => /^[A-Z]/.test(name)) // só componentes, não tipos
const manifestNames = Object.keys(manifest.components)
for (const name of manifestNames) {
  if (!exported.includes(name)) errors.push(`'${name}' está no manifest mas não é exportado em src/index.ts`)
}
for (const name of exported) {
  if (!manifestNames.includes(name)) errors.push(`'${name}' é exportado em src/index.ts mas não está no manifest`)
}

// 2 — tokens referenciados existem na fonte W3C
function tokenPaths(node, path = []) {
  if ('$value' in node) return [path.join('.')]
  return Object.entries(node)
    .filter(([k]) => !k.startsWith('$'))
    .flatMap(([k, child]) => tokenPaths(child, [...path, k]))
}
const known = new Set([
  ...tokenPaths(JSON.parse(read('tokens/primitives.json'))),
  ...tokenPaths(JSON.parse(read('tokens/semantic.light.json'))),
])
for (const [name, comp] of Object.entries(manifest.components)) {
  for (const token of comp.tokens ?? []) {
    if (!known.has(token)) errors.push(`'${name}' referencia token inexistente: ${token}`)
  }
}

// 3 — classes CSS declaradas existem no CSS do componente
for (const [name, comp] of Object.entries(manifest.components)) {
  const css = read(`src/components/${name}/${name}.css`)
  const classes = comp.cssClass
    ? [comp.cssClass]
    : Object.values(comp.parts ?? {}).map((p) => p.cssClass).filter(Boolean)
  for (const cls of classes) {
    if (!css.includes(`.${cls}`)) errors.push(`'${name}' declara cssClass '${cls}' que não aparece em ${name}.css`)
  }
}

if (errors.length) {
  console.error('baseline.manifest.json divergiu do código:')
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`manifest ok: ${manifestNames.length} componentes conferidos contra src/ e tokens/`)
