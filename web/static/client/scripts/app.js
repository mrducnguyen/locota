var $ = require('jquery'),
	_ = require('lodash'),
	handlebars = require('handlebars/runtime');

// global modules
global.jQuery = global.$ = $;
require('bootstrap');
require('bootstrap-datepicker');

require('select2');

// use only 1 global Handlebars object
// this is the only way precompiled templates will work with custom helpers
global.Handlebars = handlebars;

// custom modules
require('./modules/search.js');