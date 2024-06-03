import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

import pkg from './package.json' assert { type: 'json' }

const config = {
  input: [path.resolve('packages/group/index.ts')],
  output: [
    {
      dir: path.dirname(pkg.module),
      format: 'es',
      name: pkg.name,
      exports: 'named',
      // preserveModules: true, // 保留模块结构
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: ['dist/*', 'es/*'] }),
    vuePlugin(),
    typescript({
      outDir: path.dirname(pkg.module),
      declaration: true,
      declarationDir: path.dirname(pkg.module),
    }),
    postcss({ plugins: [autoprefixer()] }),
    commonjs(),
    resolve(),
  ],
  external: ['vue', 'lodash-es'],
}

export default config
