import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
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
        format: 'esm',
        entryFileNames: '[name].ems.js',
      },
    ],
    plugins: [
      del({
        targets: ['./dist/*'],
      }),
      resolve(),
      commonjs(),
      typescript(),
      postcss(),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
    external: ['vue'],
  }),
)
