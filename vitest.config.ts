import { resolve } from 'path'
import type { AliasOptions } from 'vite'
import { defineConfig } from 'vite'

const r = (p: string) => resolve(__dirname, p)

export const alias: AliasOptions = {
  'wordoodle/vue': r('./packages/vue3/src/'),
  '@wordoodle/core': r('./packages/core/src/'),
}

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias,
  },
  test: {
    isolate: false,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
