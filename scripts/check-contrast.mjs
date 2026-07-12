// Valida contraste WCAG 2.1 dos tokens semânticos — roda no build.
//
// Cada par (texto sobre fundo, borda de controle sobre fundo) tem um mínimo
// declarado aqui; se um token mudar e quebrar o contraste, o build falha.
// Mínimos usados:
//   4.5:1 — texto normal (WCAG 1.4.3, nível AA)
//   3.0:1 — componentes de UI e indicadores visuais como bordas de input,
//           anel de foco e trilho de switch (WCAG 1.4.11, non-text contrast)
// Bordas decorativas (color.border) ficam de fora de propósito: divisórias
// sutis não são "informação necessária para identificar o componente".
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (name) => JSON.parse(readFileSync(join(root, 'tokens', name), 'utf8'))

const primitives = read('primitives.json')
const modes = { light: read('semantic.light.json'), dark: read('semantic.dark.json') }

function flatten(node, path = []) {
  if ('$value' in node) return [{ path: path.join('.'), value: node.$value }]
  return Object.entries(node)
    .filter(([k]) => !k.startsWith('$'))
    .flatMap(([k, child]) => flatten(child, [...path, k]))
}

const primitiveMap = Object.fromEntries(flatten(primitives).map((t) => [t.path, t.value]))

// resolve 'color.bg' de um modo até o hex do primitivo
function hexOf(mode, semanticPath) {
  const token = flatten(modes[mode]).find((t) => t.path === semanticPath)
  if (!token) throw new Error(`Token semântico não encontrado: ${semanticPath} (${mode})`)
  const target = token.value.slice(1, -1)
  const hex = primitiveMap[target]
  if (typeof hex !== 'string' || !hex.startsWith('#')) {
    throw new Error(`'${semanticPath}' (${mode}) não resolve para um hex: ${target}`)
  }
  return hex
}

// luminância relativa e razão de contraste conforme WCAG 2.1
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function ratio(hexA, hexB) {
  const [hi, lo] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a)
  return (hi + 0.05) / (lo + 0.05)
}

// Os pares exigidos. fg/bg são caminhos semânticos; valem para os dois modos.
const requirements = [
  { fg: 'color.text', bg: 'color.bg', min: 4.5, context: 'texto principal' },
  { fg: 'color.text', bg: 'color.bg-subtle', min: 4.5, context: 'texto sobre superfície sutil (hover de botão ghost/outline)' },
  { fg: 'color.text-muted', bg: 'color.bg', min: 4.5, context: 'texto secundário (descrições)' },
  { fg: 'color.text-muted', bg: 'color.bg-subtle', min: 4.5, context: 'texto secundário sobre superfície sutil' },
  { fg: 'color.accent-text', bg: 'color.accent', min: 4.5, context: 'texto do botão solid' },
  { fg: 'color.danger-text', bg: 'color.danger', min: 4.5, context: 'texto do botão danger' },
  { fg: 'color.danger', bg: 'color.bg', min: 4.5, context: 'mensagem de erro do Field' },
  { fg: 'color.border-strong', bg: 'color.bg', min: 3.0, context: 'borda de input / trilho de switch (1.4.11)' },
  { fg: 'color.accent', bg: 'color.bg', min: 3.0, context: 'anel de foco (1.4.11)' },
  // fase 2 (ADR 0007) — status e matizes decorativos: texto sobre fundo suave
  { fg: 'color.info-soft-text', bg: 'color.info-soft-bg', min: 4.5, context: 'Alert/Badge info' },
  { fg: 'color.success-soft-text', bg: 'color.success-soft-bg', min: 4.5, context: 'Alert/Badge success' },
  { fg: 'color.warning-soft-text', bg: 'color.warning-soft-bg', min: 4.5, context: 'Alert/Badge warning' },
  { fg: 'color.danger-soft-text', bg: 'color.danger-soft-bg', min: 4.5, context: 'Alert/Badge danger' },
  { fg: 'color.purple-soft-text', bg: 'color.purple-soft-bg', min: 4.5, context: 'Badge purple (categoria)' },
  { fg: 'color.pink-soft-text', bg: 'color.pink-soft-bg', min: 4.5, context: 'Badge pink (categoria)' },
  // preenchimentos do Progress sobre o trilho (bg-subtle) — non-text, 1.4.11
  { fg: 'color.info-solid', bg: 'color.bg-subtle', min: 3.0, context: 'Progress info sobre o trilho' },
  { fg: 'color.success-solid', bg: 'color.bg-subtle', min: 3.0, context: 'Progress success sobre o trilho' },
  { fg: 'color.warning-solid', bg: 'color.bg-subtle', min: 3.0, context: 'Progress warning sobre o trilho' },
  { fg: 'color.accent', bg: 'color.bg-subtle', min: 3.0, context: 'Progress default sobre o trilho' },
]

let failed = false
for (const mode of Object.keys(modes)) {
  console.log(`\n${mode}:`)
  for (const req of requirements) {
    const [fgHex, bgHex] = [hexOf(mode, req.fg), hexOf(mode, req.bg)]
    const r = ratio(fgHex, bgHex)
    const ok = r >= req.min
    if (!ok) failed = true
    console.log(
      `  ${ok ? 'ok  ' : 'FAIL'} ${r.toFixed(2).padStart(5)}:1 (min ${req.min}) ` +
      `${req.fg} sobre ${req.bg} — ${req.context}`,
    )
  }
}

if (failed) {
  console.error('\nContraste insuficiente — ajuste os tokens semânticos.')
  process.exit(1)
}
console.log('\ncontraste ok: todos os pares atendem WCAG AA nos dois modos')
