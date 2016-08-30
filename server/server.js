var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var path = require('path');
var env = require('../config/environment');
var mode = process.env.NODE_ENV || env.DEVELOPMENT;
const config = require('../config');

if(mode === env.DEVELOPMENT) {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = process.env.NODE_ENV === env.PRODUCTION
    ? require('../build/webpack.prod.conf')
    : require('../build/webpack.dev.conf');
  // var webpackConfig = require(`../webpack.config.${mode}`);
  var compiler = webpack(webpackConfig);

  // only need in development
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));  
  // allow loopback to locate files built by webpack
  // match path to /static
  var staticPath = path.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
  app.use(staticPath, loopback.static('./' + config.build.assetsSubDirectory))
  app.use(webpackHotMiddleware(compiler));
}

boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

if (require.main === module) {
  app.start();
}
