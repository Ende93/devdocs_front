const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
 const WorkboxPlugin = require('workbox-webpack-plugin');

const path = require('path')
const ASSET_PATH = process.env.ASSET_PATH || '';

module.exports = (plugins) => ({
  entry: {
    index: path.join(__dirname, '../assets/javascripts/index.js'),
    'service-worker': path.join(__dirname, '../assets/javascripts/service-worker.js')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../assets'),
      '@public': path.resolve(__dirname, '../public'),
    },
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].[contenthash].js',
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
    new MiniCssExtractPlugin(),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.html/, /\.css/, /\.js/, /\.json/, /\.png/, /\.ico/, /\.svg/, /\.xml/, /\.ico/]
    }),
    ...plugins,
  ],
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: require.resolve('./loader/coffee')
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
})
