const base = require('./base')
const path = require('path')
const webpack = require('webpack')
const docs = require('../mock/doc.json')

module.exports = {
  ...base([
    new webpack.DefinePlugin({
      'APP': JSON.stringify({
        news: [],
        version: 'development',
        docs_origin: '/docs',
        docs,
      })
    }),
  ]),
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    compress: false,
    port: 9000,
    open: true,
  },
}
