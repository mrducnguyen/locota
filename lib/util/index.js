module.exports = {
  toApiUrl: toApiUrl,
  apiConfig: apiConfig
}

var path2Regexp = require('path-to-regexp');

var configCache = {},
    regexCache = {};

function toApiUrl(apiName, parameters) {
  var apiConfig = getApiConfig();
  if (!regexCache[apiName]) {
    regexCache[apiName] = path2Regexp.compile(apiConfig[apiName]);
  }
  return regexCache[apiName](parameters);
}



function getEnvApiConfig() {
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