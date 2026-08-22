// Gera docs/components/*.md a partir de baseline.manifest.json — nunca lê
// .tsx/.css diretamente, pra não duplicar o que check-manifest.mjs já
// garante consistente (única fonte: o manifest). Mesma disciplina de
// scripts/build-tokens.mjs: saída marcada "ARQUIVO GERADO", nunca editada
// à mão — rodar o script de novo é a única forma de atualizar.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'prettier'

// A saída é formatada com o Prettier antes de gravar — sem isso, rodar
// `npm run build` de novo (que roda este script) produziria markdown cru
// que reprova `npm run format:check` no CI toda vez, mesmo sem nenhuma
// mudança real de conteúdo.
const prettierConfig = await prettier.resolveConfig(
  join(dirname(fileURLToPath(import.meta.url)), '..'),
)
const fmt = (content, filepath) => prettier.format(content, { ...prettierConfig, filepath })

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'docs/components')
const manifest = JSON.parse(readFileSync(join(root, 'baseline.manifest.json'), 'utf8'))

mkdirSync(outDir, { recursive: true })
// limpa saída antiga — evita página órfã de um componente removido do manifest
for (const f of readdirSync(outDir)) {
  if (f.endsWith('.md')) unlinkSync(join(outDir, f))
}

const header = (name) => `<!-- ARQUIVO GERADO — não edite à mão.
     Fonte: baseline.manifest.json (scripts/generate-docs.mjs, npm run docs)
     Consistência com src/ garantida por scripts/check-manifest.mjs no build. -->

# ${name}
`

function tokenFile(path) {
  // primitivos: color.zinc.900, space.4... — semânticos: color.bg, color.accent...
  // heurística: se o segmento depois de "color." é um nome de matiz (zinc/red/blue/
  // green/orange/purple/pink) ou o token é espaço/raio/fonte/sombra puro (space.N,
  // radius.*, font*, shadow.*), é primitivo; senão é semântico (existe nos dois modos).
  const hueNames = ['zinc', 'red', 'blue', 'green', 'orange', 'purple', 'pink', 'white', 'black']
  const seg = path.split('.')
  if (seg[0] === 'color' && hueNames.includes(seg[1])) return 'tokens/primitives.json'
  if (seg[0] !== 'color') return 'tokens/primitives.json'
  return 'tokens/semantic.light.json (e semantic.dark.json)'
}

function renderProps(props) {
  if (!props) return ''
  const rows = Object.entries(props).map(([name, p]) => {
    const values = Array.isArray(p.values) ? p.values.map((v) => `\`${v}\``).join(', ') : '—'
    const on = p.on ? ` (em \`${p.on}\`)` : ''
    return `| \`${name}\`${on} | ${values} | \`${p.default}\` | \`${p.dataAttribute}\` |`
  })
  return `## Props

| Nome | Valores | Default | Data-attribute |
|---|---|---|---|
${rows.join('\n')}
`
}

function renderParts(parts) {
  const rows = Object.entries(parts).map(([name, p]) => {
    const cls = p.cssClass ? `\`${p.cssClass}\`` : '—'
    const note = p.note ? ` — ${p.note}` : ''
    return `| \`${name}\` | ${p.styled ? 'sim' : 'não (reexportado puro do Base UI)'} | ${cls}${note} |`
  })
  return `## Partes

| Parte | Estilizada pelo baseline-ui | Classe CSS |
|---|---|---|
${rows.join('\n')}
`
}

function renderComponent(name, c) {
  const lines = [header(name)]

  lines.push(
    c.base
      ? `**Tipo:** \`${c.kind}\` — comportamento herdado de \`${c.base}\` (ver [ADR 0001](../decisions/0001-por-que-base-ui.md): Base UI cuida de teclado, foco e ARIA; o baseline-ui só adiciona tokens + CSS).\n`
      : `**Tipo:** \`${c.kind}\` — componente puro, sem motor headless (não há comportamento interativo a herdar).\n`,
  )

  if (c.kind === 'compound') lines.push(renderParts(c.parts))
  else if (c.cssClass) lines.push(`**Classe CSS:** \`${c.cssClass}\`\n`)

  if (c.props) lines.push(renderProps(c.props))

  if (c.states?.length) {
    lines.push(`## Estados\n\n${c.states.map((s) => `- \`${s}\``).join('\n')}\n`)
  }

  if (c.tokens?.length) {
    const byFile = new Map()
    for (const t of c.tokens) {
      const f = tokenFile(t)
      if (!byFile.has(f)) byFile.set(f, [])
      byFile.get(f).push(t)
    }
    const rows = [...byFile.entries()]
      .map(([file, toks]) => toks.map((t) => `| \`${t}\` | \`${file}\` |`).join('\n'))
      .join('\n')
    lines.push(`## Tokens consumidos\n\n| Token | Origem |\n|---|---|\n${rows}\n`)
  }

  return lines.join('\n')
}

const names = Object.keys(manifest.components).sort()
for (const name of names) {
  const path = join(outDir, `${name}.md`)
  writeFileSync(path, await fmt(renderComponent(name, manifest.components[name]), path))
}

const index = `<!-- ARQUIVO GERADO — não edite à mão. Fonte: baseline.manifest.json. -->

# Componentes (${names.length})

${names.map((n) => `- [${n}](./${n}.md)`).join('\n')}
`
const indexPath = join(outDir, 'README.md')
writeFileSync(indexPath, await fmt(index, indexPath))

console.log(
  `docs/components/: ${names.length} páginas + índice geradas a partir do manifest v${manifest.version}`,
)
