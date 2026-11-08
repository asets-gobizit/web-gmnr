import { readFileSync } from 'node:fs'
import { transformSync } from 'esbuild'

// Lets node --test import the site's JSX components without a bundler.
export async function load(url, context, nextLoad) {
  if (url.startsWith('file:') && url.endsWith('.jsx')) {
    const source = readFileSync(new URL(url), 'utf8')
    const transformed = transformSync(source, {
      loader: 'jsx',
      format: 'esm',
      jsx: 'automatic',
      sourcefile: url,
    })
    return { format: 'module', source: transformed.code, shortCircuit: true }
  }
  return nextLoad(url, context)
}
