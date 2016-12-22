
/**
 * Module dependencies.
 */

var debug = require('debug')('locota');
var path = require('path');
var fs = require('fs');
var join = path.resolve;
var readdir = fs.readdirSync;
var extend = require('extend');
var util = require('lib/util');

/**
 * Load APIs and Resources in `root` directory.
 *
 * The `API Tree` will itimate the folder tree, each folder is equivalent to an API, or a group of APIs
 * each folder can provide
 *
 * @param {Application} app
 * @param {String} root
 * @api private
 */

module.exports = function(app, base){

  base = base.replace(/\\/g, '/');
  var rootConf = {
    baseDirectory: base
  }

  function traverse(root, parentConf) {
    readdir(root).forEach(function(file){
      var dir = join(root, file);
      var stats = fs.lstatSync(dir);
      if (stats.isDirectory()) {
        var conf = Object.create(parentConf),
            confFile;
        try {
          confFile = require(dir + '/config.json');
        } catch (e) {
          // no custom config for the current folder
          confFile = {};
        }
        conf.parent = parentConf;
        conf.name = file;
        conf.directory = dir;
        conf.rootConf = rootConf;
        extend(conf, confFile);

        // add the middlewares
        route(app, conf);

        debug('Config object for file [%s]', file);
        debug('Config file', confFile);
        debug('Extend config', conf);

        // recursively
        traverse(dir, conf);
      }
    });
  }

  traverse(base, rootConf);
};

/**
 * Define routes in `conf`.
 */

function route(app, conf) {
  debug('routes: %s', conf.name);

  var module;
  if (module = getModule(conf.directory)) {
    module.conf = conf;
    if (!conf.routes) {
      throw new Error('.routes is required for api [' + conf.name + '], located at: ' + conf.directory + '');
    }
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

function buildPath(conf, path) {
  conf.directory = conf.directory.replace(/\\/g, '/');
  var basePath = conf.directory.substring(conf.baseDirectory.length);
  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  // avoid /name/name
  if (path.startsWith(conf.name)) {
    path = path.substring(conf.name.length);
  }
  if (!basePath.endsWith(conf.name)) {
    basePath += '/' + name;
  }
  if (path.startsWith('/')) {
    basePath += path;
  } else {
    basePath += '/' + path;
  }

  debug('Build path: %s', basePath);
  return basePath;
}