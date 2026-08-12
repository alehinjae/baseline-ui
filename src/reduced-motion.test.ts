import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// jsdom não simula `prefers-reduced-motion` de verdade (não calcula layout/
// transição real) — a verificação comportamental já foi feita manualmente
// no navegador (ADR 0008). Este teste é estrutural: garante que a regra
// existe e continua correta, falhando o build se alguém remover ou alterar
// a regra por engano — é o requisito real (proteção contra regressão),
// não uma recriação de motor de browser dentro do Vitest.
//
// Caminho relativo à raiz do repo (não import.meta.url — o Vitest não
// garante um file:// URL estável pro arquivo de teste transformado).
const css = readFileSync(join(process.cwd(), 'src/reduced-motion.css'), 'utf8')

describe('prefers-reduced-motion (estrutural)', () => {
  it('declara a media query prefers-reduced-motion: reduce', () => {
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  })

  it('usa o seletor catch-all [class*="bl-"] — cobre todo componente sem exigir opt-in', () => {
    expect(css).toMatch(/\[class\*=['"]bl-['"]\]/)
  })

  it('zera transition-duration e animation-duration com !important (vence qualquer regra específica de componente)', () => {
    expect(css).toMatch(/transition-duration:\s*[\d.]+m?s\s*!important/)
    expect(css).toMatch(/animation-duration:\s*[\d.]+m?s\s*!important/)
  })

  it('src/styles.css importa reduced-motion.css — a regra chega ao pacote publicado', () => {
    const styles = readFileSync(join(process.cwd(), 'src/styles.css'), 'utf8')
    expect(styles).toMatch(/@import\s+['"]\.\/reduced-motion\.css['"]/)
  })
})
