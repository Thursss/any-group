import { defineConfig } from 'rollup'
import serve from 'rollup-plugin-serve'
import { merge } from 'lodash-es'
import path from 'path'
import { fileURLToPath } from 'node:url'
import baseConfig from '../rollup.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default merge(
  baseConfig,
  defineConfig({
    input: path.resolve(__dirname, '../example/src/index.tsx'),
    output: [
      {
        dir: path.resolve(__dirname, '../example/public/dist'),
        format: 'es',
        entryFileNames: '[name].es.js',
      },
      {
        dir: path.resolve(__dirname, '../example/public/dist'),
        format: 'iife',
        entryFileNames: '[name].iife.js',
        globals: {
          vue: 'Vue',
        },
      },
    ],
    plugins: [
      serve({
        open: true,
        port: 4000,
        contentBase: [path.resolve(__dirname, '../example/public')],
      }),
    ],
  }),
)
