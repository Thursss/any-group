import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  // input: './packages/index.ts',
  // output: [
  //   {
  //     dir: path.resolve(__dirname, 'dist'),
  //     format: 'esm',
  //     entryFileNames: '[name].ems.js',
  //   },
  //   {
  //     dir: path.resolve(__dirname, 'dist'),
  //     format: 'iife',
  //     entryFileNames: '[name].iife.js',
  //   },
  // ],
  plugins: [
    // del({
    //   targets: ['./dist/*'],
    // }),
    resolve(),
    commonjs(),
    typescript(),
    postcss(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  external: ['vue'],
})
