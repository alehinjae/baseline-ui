import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'
import { afterEach, expect } from 'vitest'

// jest-axe funciona com qualquer runner compatível com o `expect` do Jest
// (inclusive Vitest) — o nome é histórico, não uma dependência do Jest.
expect.extend(toHaveNoViolations)

// Sem test.globals:true no vitest.config, o auto-cleanup do RTL (que
// depende de um `afterEach` global) não se registra sozinho — sem isto o
// DOM de um teste vaza pro próximo dentro do mesmo arquivo.
afterEach(() => cleanup())
