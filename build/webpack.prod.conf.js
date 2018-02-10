let webpack = require('webpack');
let config = require('./config');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
  ],
});
