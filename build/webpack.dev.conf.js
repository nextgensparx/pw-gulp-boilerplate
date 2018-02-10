let webpack = require('webpack');
let config = require('./config');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base.conf');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
  ],
});
