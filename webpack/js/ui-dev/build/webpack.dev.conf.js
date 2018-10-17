'use strict'
const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


// process.env.ENV_NAME = 'development'

module.exports = webpackMerge(webpackBaseConf, {
  context: __dirname,
  mode: 'development',
  entry: {
    app: '../src/main.js'
  },
  output: {
    filename: '[name].dev.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: '../src',
    hot: true,
    // quiet: true, // necessary for FriendlyErrorsPlugin
    open: config.dev.autoOpenBrowser, // auto open browser
    port: config.dev.host
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
