import { axe } from 'jest-axe'
import { expect } from 'vitest'

// Helper único: renderiza e verifica sem violações de acessibilidade via
// axe-core. Todo teste "sem violações de a11y" do baseline-ui passa por
// aqui, para manter o mesmo motor de verificação em todos os componentes.
export async function expectNoA11yViolations(container: Element) {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}
