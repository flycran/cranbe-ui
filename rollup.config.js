import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: './packages/hooks/src/main.js',
  plugins: [ commonjs(), resolve() ],
  output: {
    file: './packages/hooks/lib/bundle.js',
    format: 'cjs',
  },
  external: [ 'vue' ],
}