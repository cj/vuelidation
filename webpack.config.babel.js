import CleanWebpackPlugin from 'clean-webpack-plugin'
import UglifyJSPlugin     from 'uglifyjs-webpack-plugin'

export default {
  entry: {
    index: './src/index.js',
  },

  output: {
    filename: './dist/[name].js',
    libraryTarget: 'umd',
    library: 'vuelidation',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['vue-app'],
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
      sourceMap: false,
      comments: false,
    }),
  ],
}
