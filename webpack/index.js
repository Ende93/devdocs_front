const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')

const webpack = require('webpack')
const path = require('path')
const ASSET_PATH = process.env.ASSET_PATH || path.join(__dirname, '../dist');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, '../assets/javascripts/index.js'),
    'service-worker': path.join(__dirname, '../assets/javascripts/service-worker.js')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../assets')
    },
  },
  output: {
    path: ASSET_PATH,
    filename: '[name].js',
    publicPath: ASSET_PATH,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../assets/views/index.ejs'),
      templateParameters: {
        canonical_origin: './',
        cdn_origin: ASSET_PATH,
      }
    }),
    new webpack.DefinePlugin({
      'APP': JSON.stringify({
        doc_index_urls: [],
        service_worker_cache_name: Date.now(),
        service_worker_asset_urls: [],
        news: [],
        docs_manifest_path: [],
        version: pkg.version,
      })
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: false,
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: require.resolve('./loader/coffee')
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  }
}
