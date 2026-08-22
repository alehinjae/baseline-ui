import { loadManifest } from '../data.mjs'

// Resumo de cada componente — não repete o manifest inteiro (isso é
// get_component); só o suficiente pra um agente decidir qual detalhar.
export function listComponents() {
  const manifest = loadManifest()
  return Object.entries(manifest.components).map(([name, c]) => ({
    name,
    kind: c.kind,
    base: c.base ?? null,
    parts: c.kind === 'compound' ? Object.keys(c.parts) : undefined,
    props: c.props ? Object.keys(c.props) : [],
    states: c.states ?? [],
  }))
}
