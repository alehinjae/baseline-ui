import { loadGuarantees } from '../data.mjs'

// Funde as garantias globais (docs/guarantees.json._global) com as
// específicas do componente, se existirem. Nunca inventa: se o
// componente não tem entrada própria, retorna só as globais.
export function getGuarantees(component) {
  const guarantees = loadGuarantees()
  if (!component) return guarantees

  const specific = guarantees[component] ?? {}
  return { ...guarantees._global, ...specific }
}
