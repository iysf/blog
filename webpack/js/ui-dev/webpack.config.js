const path = require('path')

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
          ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [

  ]
}




// 模式
//
// module.exports = {
//   // mode: 'production',
//   // mode: 'none',
//   mode: 'development'
// }
