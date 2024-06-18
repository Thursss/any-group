import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
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
        format: 'esm',
        entryFileNames: '[name].ems.js',
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
      // del({
      //   targets: [path.resolve(__dirname, '../example/public/dist/*')],
      // }),
      // serve({
      //   open: true,
      //   contentBase: [path.resolve(__dirname, '../example/public')],
      // }),
    ],
  }),
)
