var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["JST"] = this["JST"] || {};

Handlebars.registerPartial("_resultFilter", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<option value=\""
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"filter\">\n	<h4>Filter flights</h4>\n	<form class=\"form-inline\">\n		<div class=\"form-group\">\n			<label for=\"filterResultAirline\" class=\"control-label\">Airline</label>\n			<select id=\"filterResultAirline\" name=\"airline\" class=\"form-control filter-airline\" required=\"\">\n				<option value=\"all\" selected=\"\">All</option>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.airlines : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</select>\n		</div>\n		<div class=\"form-group\">\n			<label for=\"filterResultSort\" class=\"control-label\">Sort</label>\n			<select id=\"filterResultSort\" name=\"sort\" class=\"form-control sort-result\">\n				<option value=\"price-asc\" selected=\"\">Price (lowest first)</option>\n				<option value=\"price-desc\">Price (highest first)</option>\n				<option value=\"time-asc\">Time (earliest first)</option>\n				<option value=\"time-desc\">Time (latest first)</option>\n			</select>\n		</div>\n	</form>\n</div>";
},"useData":true}));

Handlebars.registerPartial("_resultRow", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<tr id=\"flight_"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\n	<td><img class=\"airline-logo\" src=\"img/airlines/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.code : stack1), depth0))
    + ".png\" alt=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.name : stack1), depth0))
    + "\" title=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"></td>\n	<td><span class=\"column-header-responsive\">Flight: </span>Flight no: <strong>"
    + alias4(((helper = (helper = helpers.flightNum || (depth0 != null ? depth0.flightNum : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flightNum","hash":{},"data":data}) : helper)))
    + "</strong><br><em>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.plane : depth0)) != null ? stack1.shortName : stack1), depth0))
    + "</em></td>\n	<td><span class=\"column-header-responsive\">Depart: </span>"
    + alias4((helpers.formatDateTimeString || (depth0 && depth0.formatDateTimeString) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.start : depth0)) != null ? stack1.dateTime : stack1),{"name":"formatDateTimeString","hash":{},"data":data}))
    + " ("
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.start : depth0)) != null ? stack1.timeZone : stack1), depth0))
    + ")</td>\n	<td><span class=\"column-header-responsive\">Arrival: </span>"
    + alias4((helpers.formatDateTimeString || (depth0 && depth0.formatDateTimeString) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.finish : depth0)) != null ? stack1.dateTime : stack1),{"name":"formatDateTimeString","hash":{},"data":data}))
    + " ("
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.finish : depth0)) != null ? stack1.timeZone : stack1), depth0))
    + ")</td>\n	<td><span class=\"column-header-responsive\">Duration: </span>"
    + alias4((helpers.formatDuration || (depth0 && depth0.formatDuration) || alias2).call(alias1,(depth0 != null ? depth0.durationMin : depth0),{"name":"formatDuration","hash":{},"data":data}))
    + "</td>\n	<td><span class=\"column-header-responsive\">Price: </span>"
    + alias4((helpers.formatAUD || (depth0 && depth0.formatAUD) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"formatAUD","hash":{},"data":data}))
    + "</td>\n</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.flights || (depth0 != null ? depth0.flights : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"flights","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.flights) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true}));

Handlebars.registerPartial("_selectedFlights", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "<strong>Selected flight:</strong>\n<ul>\n	<li>Airline: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.name : stack1), depth0))
    + "</li>\n	<li>Flight number: <strong>"
    + alias2(((helper = (helper = helpers.flightNum || (depth0 != null ? depth0.flightNum : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"flightNum","hash":{},"data":data}) : helper)))
    + "</strong></li>\n	<li>Depart: "
    + alias2((helpers.formatDateTimeString || (depth0 && depth0.formatDateTimeString) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.start : depth0)) != null ? stack1.dateTime : stack1),{"name":"formatDateTimeString","hash":{},"data":data}))
    + " ("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.start : depth0)) != null ? stack1.timeZone : stack1), depth0))
    + ")</li>\n	<li>Arrive: "
    + alias2((helpers.formatDateTimeString || (depth0 && depth0.formatDateTimeString) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.finish : depth0)) != null ? stack1.dateTime : stack1),{"name":"formatDateTimeString","hash":{},"data":data}))
    + " ("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.finish : depth0)) != null ? stack1.timeZone : stack1), depth0))
    + ")</li>\n	<li>Price: "
    + alias2((helpers.formatAUD || (depth0 && depth0.formatAUD) || alias4).call(alias3,(depth0 != null ? depth0.price : depth0),{"name":"formatAUD","hash":{},"data":data}))
    + "</li></li>\n</ul>\n<a class=\"btn btn-primary\" role=\"button\" data-toggle=\"collapse\" href=\"#flightObjectDetails\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n	Show object data\n</a>\n<div class=\"collapse\" id=\"flightObjectDetails\">\n	<pre>\n		"
    + alias2((helpers.json || (depth0 && depth0.json) || alias4).call(alias3,depth0,{"name":"json","hash":{},"data":data}))
    + "\n	</pre>\n</div>\n";
},"useData":true}));

this["JST"]["airport"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return ", "
    + container.escapeExpression(((helper = (helper = helpers.stateCode || (depth0 != null ? depth0.stateCode : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"stateCode","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"airport-item\">\n	<strong class=\"airport-name\">"
    + alias4(((helper = (helper = helpers.airportName || (depth0 != null ? depth0.airportName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"airportName","hash":{},"data":data}) : helper)))
    + " <small>("
    + alias4(((helper = (helper = helpers.airportCode || (depth0 != null ? depth0.airportCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"airportCode","hash":{},"data":data}) : helper)))
    + ")</small></strong>\n	<p class=\"airport-location\">"
    + alias4(((helper = (helper = helpers.cityName || (depth0 != null ? depth0.cityName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cityName","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.stateCode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ", "
    + alias4(((helper = (helper = helpers.countryName || (depth0 != null ? depth0.countryName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"countryName","hash":{},"data":data}) : helper)))
    + " <span class=\"flag-icon flag-icon-"
    + alias4(((helper = (helper = helpers.flag || (depth0 != null ? depth0.flag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flag","hash":{},"data":data}) : helper)))
    + "\"></span></p>\n</span>";
},"useData":true});

this["JST"]["error"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "	<h4 class=\"text-danger\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</h4>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<p class=\"text-info\">"
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<h4 class=\"text-danger\">An error has occured. Please try again later.</h4>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["loading"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<h4 class=\"text-info\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</h4>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<h4 class=\"text-info\">Loading, please wait...</h4>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"loading\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["JST"]["main"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav id=\"mainNav\" class=\"navbar navbar-inverse navbar-fixed-top\">\r\n	<div class=\"container\">\r\n		<div class=\"navbar-header\">\r\n			<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n				<span class=\"sr-only\">Toggle navigation</span>\r\n				<span class=\"icon-bar\"></span>\r\n				<span class=\"icon-bar\"></span>\r\n				<span class=\"icon-bar\"></span>\r\n			</button>\r\n			<a class=\"navbar-brand\" href=\"#\">Locomote code task</a>\r\n		</div>\r\n		<div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n			<nav>\r\n				<ul class=\"nav navbar-nav navbar-right\">\r\n					<li role=\"presentation\"><a href=\"#\" data-toggle=\"modal\" data-target=\"#aboutModal\">About</a></li>\r\n				</ul>\r\n			</nav>\r\n		</div><!--/.navbar-collapse -->\r\n	</div>\r\n</nav>\r\n\r\n<div class=\"container search-view\" id=\"searchView\">\r\n</div>\r\n\r\n<div class=\"container result-view\" id=\"resultView\">\r\n</div>\r\n<div id=\"modalContent\">\r\n	<div id=\"aboutModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\r\n		<div class=\"modal-dialog\" role=\"document\">\r\n			<div class=\"modal-content\">\r\n				<div class=\"modal-header\">\r\n					<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n					<h4 class=\"modal-title\">About author</h4>\r\n				</div>\r\n				<div class=\"modal-body\">\r\n					<h3>Duc Nguyen</h3>\r\n					<h4>Contact information</h4>\r\n					<ul>\r\n						<li><strong>Email: </strong><a href=\"mailto:mrducnguyen@gmail.com\">mrducnguyen@gmail.com</a></li>\r\n						<li><strong>Phone: </strong><a href=\"tel:+61412510256\">+61412510256</a></li>\r\n					</ul>\r\n				</div>\r\n				<div class=\"modal-footer\">\r\n					<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n				</div>\r\n			</div><!-- /.modal-content -->\r\n		</div><!-- /.modal-dialog -->\r\n	</div><!-- /.modal -->\r\n</div>";
},"useData":true});

this["JST"]["results"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<li role=\"presentation\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "><a href=\"#"
    + alias3(((helper = (helper = helpers.dateYYMMDD || (depth0 != null ? depth0.dateYYMMDD : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"dateYYMMDD","hash":{},"data":data}) : helper)))
    + "\" class=\"travel-date"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + alias3((helpers.formatDateFull || (depth0 && depth0.formatDateFull) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),{"name":"formatDateFull","hash":{},"data":data}))
    + "</a></li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " class=\"active\"";
},"4":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression, alias3=container.lambda;

  return "<h2>Available flights\n	<br>\n	<small>on <span class=\"text-primary\">"
    + alias2((helpers.formatDateFull || (depth0 && depth0.formatDateFull) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.date : stack1),{"name":"formatDateFull","hash":{},"data":data}))
    + "</span> from <strong class=\"text-primary\">"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.from : stack1)) != null ? stack1.airportName : stack1), depth0))
    + " ("
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.from : stack1)) != null ? stack1.airportCode : stack1), depth0))
    + ")</strong> to <strong class=\"text-primary\">"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.to : stack1)) != null ? stack1.airportName : stack1), depth0))
    + " ("
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.to : stack1)) != null ? stack1.airportCode : stack1), depth0))
    + ")</strong></small>\n</h2>\n<div id=\"selectedFlights\"></div>\n<div id=\"resultFilter\" class=\"result-filter\"></div>\n<div id=\"resultDateRange\" class=\"date-range\">\n	<ul class=\"nav nav-tabs nav-justified\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dateRange : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n<div class=\"table-responsive result-table\">\n	<table id=\"resultTable\" class=\"table table-stripped table-hover\">\n		<thead>\n			<tr>\n				<th width=\"15%\">Airline</th>\n				<th width=\"15%\">Flight</th>\n				<th width=\"22%\">Depart</th>\n				<th width=\"22%\">Arrive</th>\n				<th width=\"15%\">Duration</th>\n				<th width=\"11%\">Price</th>\n			</tr>\n		</thead>\n		<tbody>\n"
    + ((stack1 = container.invokePartial(partials._resultRow,depth0,{"name":"_resultRow","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</tbody>\n	</table>\n</div>";
},"usePartial":true,"useData":true});

this["JST"]["search"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2>Search for flights</h2>\n<form class=\"search-form\">\n	<div class=\"form-group\">\n		<label for=\"fromAirport\" class=\"control-label\">From</label>\n		<select id=\"fromAiport\" name=\"from\" class=\"form-control airport-field\" required=\"\"></select>\n	</div>\n	<div class=\"form-group\">\n		<label for=\"toAirport\" class=\"control-label\">To</label>\n		<select id=\"toAirport\" name=\"to\" class=\"form-control airport-field\" required=\"\"></select>\n	</div>\n	<div class=\"form-group\">\n		<label for=\"\" class=\"control-label\">Date</label>\n		<div class=\"input-group date\" data-date-format=\"dd/mm/yyyy\" data-date-start-date=\"+0d\" data-date-end-date=\"+1y\">\n			<input type=\"text\" name=\"date\" id=\"travelDate\" class=\"form-control\" value=\"\" required=\"\" placeholder=\"\">\n			<div class=\"input-group-addon\">\n				<span class=\"glyphicon glyphicon-th\"></span>\n			</div>\n		</div>\n	</div>\n	<div class=\"button-container\">\n		<button type=\"submit\" class=\"btn btn-default\">Search</button>\n	</div>\n</form>";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}