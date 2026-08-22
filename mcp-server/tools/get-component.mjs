import { loadManifest } from '../data.mjs'

// Retorna exatamente o que está no manifest pra esse componente — sem
// reformular nem inventar campo, pra não divergir da fonte de verdade
// que scripts/check-manifest.mjs já garante consistente com src/.
export function getComponent(name) {
  const manifest = loadManifest()
  const component = manifest.components[name]
  if (!component) {
    const available = Object.keys(manifest.components).sort()
    throw new Error(`Componente "${name}" não existe. Disponíveis: ${available.join(', ')}`)
  }
  return { name, ...component }
}
