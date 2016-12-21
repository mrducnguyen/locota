
/**
 * This file illustrates how you may map
 * single routes using config.json instead
 * of resource-based routing.
 */
var request = require('request');
var path2Regexp = require('path-to-regexp');

var regexCache = {};
var stats = {
  requests: 100000,
  average_duration: 52,
  uptime: 123123132
};

exports.getAirlines = function *(){
  console.log(exports.conf);
  this.body = stats;
};

exports.getAirports = function *(){
  this.body = stats;
};

exports.search = function *(){
  this.body = stats;
};

function toApiUrl(apiName, parameters) {
  var apiConfig = getApiConfig();
  if (!regexCache[apiName]) {
    regexCache[apiName] = path2Regexp.compile(apiConfig[apiName]);
  }
  return regexCache[apiName](parameters);
}

function getApiConfig() {
  if (exports.conf.apiEndpoints) {
    if (exports.conf.apiEndpoints[this.app.env]) {
      return exports.conf.apiEndpoints[this.app.env];
    } else {
      for (var env in exports.conf.apiEndpoints) {
        console.log("WARNING: apiEndpoints for environment [%s] not found. Using endpoints for [%s]", this.app.env, env);
        return exports.conf.apiEndpoints[env];
      }
    }
  }
  throw new Error("API Endpoints configuration is missing, please provide .apiEndpoints in config.json for at least 1 environment");
}