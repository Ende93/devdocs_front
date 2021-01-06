const base = require('./base')
const webpack = require('webpack');
const pkg = require('../package.json')

module.exports = {
  ...base([
    new webpack.DefinePlugin({
      'APP': JSON.stringify({
        news: [],
        docs: [],
        version: pkg.version,
      })
    }),
  ]),
  mode: 'production',
}
