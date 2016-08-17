var path = require('path')
var env = require('./environment');
var projectAssetsRoot = '../.build';

var applyRoot = function applyRoot(file){
  var _path = `${projectAssetsRoot}/${file}`;
  return path.resolve(__dirname, _path);
}

var config = {
  build: {
    env: require('./prod.env'),
    index: applyRoot('index.html'),
    demo: applyRoot('demo.html'),
    assetsRoot: path.resolve(__dirname, projectAssetsRoot),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env')
  }
}

module.exports = config;