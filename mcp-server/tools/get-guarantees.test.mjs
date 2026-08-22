import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getGuarantees } from './get-guarantees.mjs'

test('get_guarantees("Switch") contém a área de toque real 44x44, prova de que expõe estado real (ADR 0010)', () => {
  const result = getGuarantees('Switch')
  assert.equal(
    result.hitArea.guarantee,
    '44x44px de área de toque mínima (padrão AAA / Apple HIG), mesmo com o thumb visualmente menor',
  )
  assert.match(result.hitArea.source, /ADR 0010/)
})

test('get_guarantees("Switch") também inclui as garantias globais', () => {
  const result = getGuarantees('Switch')
  assert.ok(result.contrast)
  assert.ok(result.reducedMotion)
})

test('get_guarantees() sem componente retorna só as globais + o mapa completo', () => {
  const result = getGuarantees()
  assert.ok(result._global)
  assert.ok(result.Switch)
})

test('componente sem entrada específica não inventa dado, retorna só globais', () => {
  const result = getGuarantees('Card')
  assert.ok(result.contrast)
  assert.equal(result.hitArea, undefined)
})
