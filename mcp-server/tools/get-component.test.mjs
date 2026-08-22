import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getComponent } from './get-component.mjs'

const manifest = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), '../../baseline.manifest.json'),
    'utf8',
  ),
)

test('get_component("Field") bate campo a campo com o manifest', () => {
  const result = getComponent('Field')
  assert.deepEqual(result, { name: 'Field', ...manifest.components.Field })
})

test('componente inexistente lança erro listando os disponíveis', () => {
  assert.throws(() => getComponent('NaoExiste'), /NaoExiste.*Disponíveis/s)
})
