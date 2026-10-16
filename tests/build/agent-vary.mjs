import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => JSON.parse(readFileSync(path, 'utf8'))
const assertVary = (value, source) => {
  assert.equal(typeof value, 'string', `${source}: missing Vary`)
  const tokens = value.toLowerCase().split(',').map((token) => token.trim())
  for (const token of ['accept', 'rsc', 'next-router-state-tree', 'next-router-prefetch', 'next-router-segment-prefetch']) {
    assert.ok(tokens.includes(token), `${source}: Vary is missing ${token}`)
  }
  assert.equal(new Set(tokens).size, tokens.length, `${source}: duplicate Vary tokens`)
}

test('deployment routing defaults preserve Accept and Next.js navigation tokens', () => {
  assertVary(read('.next/routes-manifest.json').rsc.varyHeader, 'routes manifest')
})
