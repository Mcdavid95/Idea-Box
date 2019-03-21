const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});
module.exports = {
  entry: [path.resolve(__dirname, 'client/app/index.jsx')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.(css|scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(js|jsx)$/, include: path.join(__dirname, 'client'), loader: 'babel-loader', query: { presets: ['es2015', 'react'] }
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(gif|png|jpg|svg)$/i,
        loaders: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin(),
    extractSass],
  devServer: {
    historyApiFallback: true
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty'
  }
};
