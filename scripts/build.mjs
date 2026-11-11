import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const mode = process.argv[2]
if (mode !== 'api' && mode !== 'static') {
  console.error('Usage: node scripts/build.mjs <api|static>')
  process.exit(1)
}

const nuxt = fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url))
const result = spawnSync(process.execPath, [nuxt, mode === 'static' ? 'generate' : 'build'], {
  stdio: 'inherit',
  env: { ...process.env, CEROTD_BUILD_MODE: mode }
})
if (result.error) throw result.error
process.exit(result.status ?? 1)
