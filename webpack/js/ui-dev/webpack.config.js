const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: {
    app: './app.js'
  },
  devtool: 'inlinne-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
        'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: {
                use: 'css-loader',
                fallback: 'vue-style-loader'
              }
            }
          }
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
          ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new VueLoaderPlugin()
  ]
}




// 模式
//
// module.exports = {
//   // mode: 'production',
//   // mode: 'none',
//   mode: 'development'
// }
