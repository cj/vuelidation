import buble       from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs'
import replace     from 'rollup-plugin-replace'
import uglify      from 'rollup-plugin-uglify'
import cleanup     from 'rollup-plugin-cleanup'

const version  = require('./package.json').version
const compress = !!process.env.COMPRESS

let plugins = [
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
  cleanup(),
]

if (compress) {
  plugins.push(uglify())
}

export default {
  entry: 'src/index.js',
  dest: `dist/vuelidation${compress ? '.min' : ''}.js`,
  format: 'umd',
  moduleName: 'Vuelidation',
  plugins: plugins,
  banner:
`/**
 * vuelidation v${version}
 * (c) ${new Date().getFullYear()} CJ Lazell
 * @license MIT
 */`,
}
