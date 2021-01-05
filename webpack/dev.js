const base = require('./base')
const path = require('path')
const webpack = require('webpack')
const docs = require('../mock/doc.json')

module.exports = {
  ...base([
    new webpack.DefinePlugin({
      'APP': JSON.stringify({
        doc_index_urls: [],
        service_worker_cache_name: Date.now(),
        service_worker_asset_urls: [],
        news: [],
        version: 'development',
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
