const base = require('./base')
const path = require('path')

module.exports = {
  ...base,
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    compress: false,
    port: 9000,
    open: true,
  },
}