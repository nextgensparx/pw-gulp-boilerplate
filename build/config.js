let path = require('path');

module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'site/templates',
    assetsPublicPath: '/',
  },
  dev: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'site/templates',
    assetsPublicPath: '/',
  },
};
