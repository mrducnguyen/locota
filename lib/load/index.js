
/**
 * Module dependencies.
 */

var Resource = require('koa-resource-router');
var debug = require('debug')('locota');
var path = require('path');
var fs = require('fs');
var join = path.resolve;
var readdir = fs.readdirSync;
var extend = require('extend');

/**
 * Load resources in `root` directory.
 *
 * TODO: move api.json (change name?)
 * bootstrapping into an npm module.
 *
 * TODO: adding .resources to config is lame,
 * but assuming no routes is also lame, change
 * me
 *
 * @param {Application} app
 * @param {String} root
 * @api private
 */

module.exports = function(app, base){

  base = base.replace(/\\/g, '/');

  function traverse(root, parentConf) {
    readdir(root).forEach(function(file){
      var dir = join(root, file);
      var stats = fs.lstatSync(dir);
      if (stats.isDirectory()) {
        var conf;
        try {
          conf = require(dir + '/config.json');
        } catch (e) {
          conf = {};
        }
        conf.parent = parentConf;
        conf.name = file;
        conf.directory = dir;
        conf.baseDirectory = base;

        // add the middlewares
        if (conf.routes) route(app, conf);
        else resource(app, conf);

        // recursively
        traverse(dir, conf);
      }
    });
  }

  traverse(base, {});
};

/**
 * Define routes in `conf`.
 */

function route(app, conf) {
  debug('routes: %s', conf.name);

  var module;
  if (module = getModule(conf.directory)) {
    module.conf = conf;
    for (var key in conf.routes) {
      var prop = conf.routes[key];
      var method = key.split(' ')[0];
      var path = buildPath(conf, key.split(' ')[1]);
      conf.basePath = path;
      debug('%s %s -> .%s', method, path, prop);

      var fn = module[prop];
      if (!fn) throw new Error(conf.name + ': exports.' + prop + ' is not defined');

      app[method.toLowerCase()](path, fn);
    }
  }
}

/**
 * Define resource in `conf`.
 */

function resource(app, conf) {
  debug('resource: %s', conf.name);

  var module;
  if (module = getModule(conf.directory)) {
    if (!conf.name) throw new Error('.name in ' + conf.directory + '/config.json is required');
    app.use(Resource(buildPath(conf, conf.name), module).middleware());
  }
}

/**
 * Helpers
 */

function getModule(directory) {
  try {
    debug('Loading module: %s/index.js', directory);
    return require(directory);
  } catch (e) {
    // no module found just ignore the path
    debug('Error loading module at [%s]', directory);
    debug(e);
  }
  return false;
}

function buildPath(conf, name) {
  conf.directory = conf.directory.replace(/\\/g, '/');
  if (name.startsWith('/')) {
    name = name.substring(1);
  }
  var basePath = conf.directory.substring(conf.baseDirectory.length);
  if (!basePath.endsWith(name)) {
    // avoid /name/name
    basePath += '/' + name;
  }
  debug('Build path: %s', basePath);
  return basePath;
}