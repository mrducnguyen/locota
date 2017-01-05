var $ = require('jquery'),
  _ = require('lodash');


// global modules
global.jQuery = global.$ = $;
require('bootstrap');
require('bootstrap-datepicker');

require('select2');

// custom modules
require('./modules/search.js');