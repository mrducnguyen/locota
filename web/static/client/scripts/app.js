var $ = require('jquery'),
	handlebars = require('handlebars/runtime');

// global modules
global.jQuery = global.$ = $;
require('bootstrap');
require('bootstrap-datepicker');

require('select2');

require('./modules/polyfill');

// use only 1 global Handlebars object
// this is the only way precompiled templates will work with custom helpers
global.Handlebars = handlebars;

$(function() {
	// render navigation
	var templates = require('./templates');
	$('.loading')
		.before(templates['main']({}))
		.remove();
});
// custom modules
require('./modules/search.js');