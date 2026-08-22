import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getTokens } from './get-tokens.mjs'

test('get_tokens retorna primitivos e semânticos nos dois modos', () => {
  const result = getTokens()
  assert.ok(result.primitives)
  assert.ok(result.semantic.light)
  assert.ok(result.semantic.dark)
})
