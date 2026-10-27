/**
 * Security / dependency guard tests for the fixed packages.
 *
 * Fails on the pre-fix code:
 *   - `next` is still on 14.x (or a 15.x before 15.5.28),
 *   - `js-yaml` / `source-map-js` / brace-expansion copies are below the
 *     patched versions,
 *   - the dynamic project route still reads `params` synchronously (Next 15
 *     made page `params` a Promise).
 *
 * Run with: `npm test` (node --test).
 */
import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..")

function lockfile() {
  return JSON.parse(readFileSync(resolve(ROOT, "package-lock.json"), "utf8"))
}

function parseVersion(v) {
  const [major, minor, patch] = v.split(".").map(Number)
  return { major, minor, patch }
}

function atLeast(actual, minimum) {
  const a = parseVersion(actual)
  const m = parseVersion(minimum)
  if (a.major !== m.major) return a.major > m.major
  if (a.minor !== m.minor) return a.minor > m.minor
  return a.patch >= m.patch
}

test("fixed dependency versions are locked", () => {
  const lock = lockfile()

  assert.ok(
    atLeast(lock.packages["node_modules/next"].version, "15.5.28"),
    `expected next >=15.5.28, got ${lock.packages["node_modules/next"].version}`
  )
  assert.equal(
    lock.packages["node_modules/js-yaml"].version,
    "4.3.2",
    "js-yaml should be on the patched 4.3.2"
  )
  assert.equal(
    lock.packages["node_modules/source-map-js"].version,
    "1.2.2",
    "source-map-js should be on the patched 1.2.2"
  )
})

test("all brace-expansion copies are on patched versions", () => {
  const lock = lockfile()
  const copies = [
    lock.packages["node_modules/brace-expansion"].version, // 1.x line
    lock.packages["node_modules/glob/node_modules/brace-expansion"].version,
    lock.packages["node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion"].version, // 5.x line
  ]
  for (const version of copies) {
    const [major] = version.split(".").map(Number)
    assert.ok(
      major === 1 ? atLeast(version, "1.1.21") : atLeast(version, "5.0.12"),
      `brace-expansion copy ${version} is below the patched version`
    )
  }
})

test("project detail route awaits async params (Next 15 API)", () => {
  const page = readFileSync(resolve(ROOT, "app/projects/[slug]/page.tsx"), "utf8")
  assert.match(page, /params:\s*Promise</, "params prop must be typed as a Promise")
  assert.match(page, /await params/, "params must be awaited before reading slug")
})
