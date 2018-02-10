let utils = require('./utils');
let webpack = require('webpack');
let config = require('./config');

let assetsRoot = process.env.NODE_ENV === 'production' ?
config.build.assetsRoot : config.dev.assetsRoot;

let assetsPublicPath = process.env.NODE_ENV === 'production' ?
config.build.assetsPublicPath : config.dev.assetsPublicPath;

module.exports = {
  entry: {
    'main': utils.resolve('src/templates/js/main.js'),
    // Add as many chunks as you like
  },
  output: {
    path: assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    publicPath: assetsPublicPath,
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': utils.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src')],
        options: {
          presets: ['babel-preset-env'],
        },
      },
    ],
  },
  plugins: [
    // TODO: Add modules that are: used in main.js and at least one other file, to new chunk
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
    }),
    // extract webpack bootstrap logic
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: Infinity,
    }),
  ],
};
