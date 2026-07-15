// Gera src/tokens.css a partir dos arquivos W3C Design Tokens em tokens/.
//
// Por que um script próprio e não Style Dictionary: o pipeline inteiro cabe
// em ~100 linhas legíveis, e entender cada passo é parte do objetivo do
// projeto (ver ADR 0004). Se o número de plataformas de saída crescer
// (iOS, Android...), aí sim uma ferramenta pronta se paga.
//
// Regras que este script garante:
// 1. Primitivos nunca são aliases; semânticos são SEMPRE aliases {caminho}
//    para primitivos — a hierarquia de duas camadas é validada, não combinada.
// 2. semantic.light.json e semantic.dark.json têm as mesmas chaves.
// 3. Alias vira var(--bl-...) no CSS — a cadeia semântico→primitivo continua
//    visível no devtools, igual à cadeia de aliases nas Variables do Figma.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (name) => JSON.parse(readFileSync(join(root, 'tokens', name), 'utf8'))

const primitives = read('primitives.json')
const semanticLight = read('semantic.light.json')
const semanticDark = read('semantic.dark.json')

// Percorre a árvore W3C e devolve uma lista plana:
// { path: 'color.zinc.900', type: 'color', value: '#18181b' }
// $type declarado num grupo é herdado pelos filhos (regra da spec).
function flatten(node, path = [], inheritedType = null) {
  const tokens = []
  const type = node.$type ?? inheritedType
  if ('$value' in node) {
    tokens.push({ path: path.join('.'), type, value: node.$value })
    return tokens
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    tokens.push(...flatten(child, [...path, key], type))
  }
  return tokens
}

const cssVar = (path) => `--bl-${path.replaceAll('.', '-')}`

const isAlias = (value) => typeof value === 'string' && /^\{[^}]+\}$/.test(value)

// Serializa um $value literal para CSS conforme o $type.
function toCss(token) {
  const { type, value, path } = token
  switch (type) {
    case 'color':
    case 'dimension':
      return value
    case 'fontWeight':
      return String(value)
    case 'fontFamily':
      // nomes com espaço precisam de aspas no CSS
      return value.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ')
    case 'shadow':
      return value
        .map((s) => `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${s.color}`)
        .join(', ')
    default:
      throw new Error(`Token '${path}' tem $type desconhecido: ${type}`)
  }
}

const primitiveTokens = flatten(primitives)
const primitivePaths = new Set(primitiveTokens.map((t) => t.path))

for (const t of primitiveTokens) {
  if (isAlias(t.value)) throw new Error(`Primitivo '${t.path}' não pode ser alias`)
}

// Semânticos: valida que todo valor é alias para um primitivo existente
// e devolve declarações CSS var(--bl-...) apontando para ele.
function semanticDecls(file, label) {
  return flatten(file).map((t) => {
    if (!isAlias(t.value)) {
      throw new Error(`Semântico '${t.path}' (${label}) deve ser alias {caminho}, achou: ${t.value}`)
    }
    const target = t.value.slice(1, -1)
    if (!primitivePaths.has(target)) {
      throw new Error(`Semântico '${t.path}' (${label}) aponta para primitivo inexistente: ${target}`)
    }
    return { path: t.path, css: `var(${cssVar(target)})` }
  })
}

const light = semanticDecls(semanticLight, 'light')
const dark = semanticDecls(semanticDark, 'dark')

const lightPaths = light.map((t) => t.path).sort().join('\n')
const darkPaths = dark.map((t) => t.path).sort().join('\n')
if (lightPaths !== darkPaths) {
  throw new Error('semantic.light.json e semantic.dark.json têm chaves diferentes — todo token semântico precisa existir nos dois modos')
}

const line = (path, css) => `  ${cssVar(path)}: ${css};`

const css = `/* ARQUIVO GERADO — não edite à mão.
   Fonte: tokens/*.json (formato W3C Design Tokens)
   Gerador: scripts/build-tokens.mjs (npm run tokens)
   É esta mesma fonte JSON que alimenta a ponte com o Figma
   (ver docs/figma/mapeamento-figma.md). */

:root {
  /* camada 1 — primitivos (coleção 'Primitives' no Figma) */
${primitiveTokens.map((t) => line(t.path, toCss(t))).join('\n')}

  /* camada 2 — semânticos, modo claro (coleção 'Semantic', modo 'Light') */
${light.map((t) => line(t.path, t.css)).join('\n')}
}

/* Override manual de tema via atributo data-bl-theme no <html>/<:root>.
   Sem o atributo, o tema segue o sistema (a media query abaixo). Com
   data-bl-theme="light"|"dark", o app força o modo (ex.: um toggle de tema).
   'light' explícito precisa vencer a media query de sistema-escuro, por isso
   o :not() nela e o bloco light dedicado. */
:root[data-bl-theme="light"] {
${light.map((t) => line(t.path, t.css)).join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-bl-theme="light"]) {
    /* camada 2 — semânticos, modo escuro (coleção 'Semantic', modo 'Dark') */
${dark.map((t) => '  ' + line(t.path, t.css)).join('\n')}
  }
}

:root[data-bl-theme="dark"] {
${dark.map((t) => line(t.path, t.css)).join('\n')}
}
`

writeFileSync(join(root, 'src', 'tokens.css'), css)
console.log(`tokens.css gerado: ${primitiveTokens.length} primitivos, ${light.length} semânticos × 2 modos`)
