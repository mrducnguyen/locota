var $ = require('jquery'),
	_ = require('lodash'),
	hogan = require('hogan.js'),
	templates = require('../templates.js');

// global require
global.jQuery = $;
require('bootstrap');
require('bootstrap-datepicker');

$(function() {
	var searchView = $('#searchView');

	searchView
		.html(templates['search']())
		.find('.date').datepicker();

	searchView
		.find('form')
		.submit(function() {

		});
});