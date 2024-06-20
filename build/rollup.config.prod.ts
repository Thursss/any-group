import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import { merge } from 'lodash-es'
import path from 'path'
import { fileURLToPath } from 'node:url'
import config from '../rollup.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default merge(
  config,
  defineConfig({
    input: path.resolve(__dirname, '../packages/index.ts'),
    output: [
      {
        dir: './dist',
        format: 'es',
        exports: 'named',
        entryFileNames: '[name].js',
        // preserveModules: true,
        // preserveModulesRoot: 'dist',
      },
    ],
    plugins: [
      del({
        targets: ['./dist/*'],
      }),
    ],
  }),
)
