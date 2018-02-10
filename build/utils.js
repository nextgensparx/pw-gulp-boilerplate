let path = require('path');
let config = require('./config');

exports.assetsPath = function(_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir);
};