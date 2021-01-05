const base = require('./base')
const webpack = require('webpack');
const pkg = require('../package.json')

module.exports = {
  ...base([
    new webpack.DefinePlugin({
      'APP': JSON.stringify({
        doc_index_urls: [],
        service_worker_cache_name: Date.now(),
        service_worker_asset_urls: [],
        news: [],
        docs: [],
        version: pkg.version,
      })
    }),
  ]),
  mode: 'production',
}
