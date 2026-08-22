import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listComponents } from './list-components.mjs'

const manifest = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), '../../baseline.manifest.json'),
    'utf8',
  ),
)

test('lista todos os componentes do manifest, sem inventar nem omitir', () => {
  const result = listComponents()
  const names = result.map((c) => c.name).sort()
  assert.deepEqual(names, Object.keys(manifest.components).sort())
})

test('resumo do Switch bate com o manifest', () => {
  const switchSummary = listComponents().find((c) => c.name === 'Switch')
  assert.equal(switchSummary.kind, 'compound')
  assert.deepEqual(switchSummary.parts, ['Root', 'Thumb'])
})
