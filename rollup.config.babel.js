import buble       from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs'
import replace     from 'rollup-plugin-replace'

const version = require('./package.json').version

export default {
  entry: 'src/index.js',
  dest: 'dist/vuelidation.js',
  format: 'umd',
  moduleName: 'Vuelidation',
  exports: 'named',
  plugins: [
    replace({
      __VERSION__: version,
    }),
    nodeResolve({
      jsnext: true,
      module: true,
    }),
    commonjs(),
    buble({
      objectAssign: 'Object.assign',
    }),
  ],
  banner:
`/**
 * vuelidation v${version}
 * (c) ${new Date().getFullYear()} CJ Lazell
 * @license MIT
 */`,
}
