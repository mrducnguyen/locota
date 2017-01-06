var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["JST"] = this["JST"] || {};

Handlebars.registerPartial("_resultFilter", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      	<option value=\""
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"filter\">\r\n  <h3>Filter flights</h3>\r\n  <form>\r\n    <div class=\"form-group\">\r\n      <label for=\"filterAirline\" class=\"control-label\">From</label>\r\n      <select id=\"filterAirline\" name=\"airline\" class=\"form-control\" required=\"\">\r\n";
  stack1 = ((helper = (helper = helpers.airlines || (depth0 != null ? depth0.airlines : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"airlines","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.airlines) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </select>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"sortBy\" class=\"control-label\">From</label>\r\n      <select id=\"sortBy\" name=\"sort\" class=\"form-control\">\r\n        <option value=\"price-asc\">Price (lowest first)</option>\r\n        <option value=\"price-desc\">Price (highest first)</option>\r\n        <option value=\"time-asc\">Time (earliest first)</option>\r\n        <option value=\"time-desc\">Time (latest first)</option>\r\n      </select>\r\n    </div>\r\n  </form>\r\n</div>";
},"useData":true}));

Handlebars.registerPartial("_resultRow", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<tr id=\"flight_"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\r\n  <td><img src=\"img/airlines/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.code : stack1), depth0))
    + ".png\" alt=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.name : stack1), depth0))
    + "\" title=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.airline : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"></td>\r\n  <td>Flight number: <strong>"
    + alias4(((helper = (helper = helpers.flightNum || (depth0 != null ? depth0.flightNum : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flightNum","hash":{},"data":data}) : helper)))
    + "</strong><br><em>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.plane : depth0)) != null ? stack1.shortName : stack1), depth0))
    + "</em></td>\r\n  <td>"
    + alias4((helpers.formatDateTimeString || (depth0 && depth0.formatDateTimeString) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.start : depth0)) != null ? stack1.dateTime : stack1),{"name":"formatDateTimeString","hash":{},"data":data}))
    + " ("
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.start : depth0)) != null ? stack1.timeZone : stack1), depth0))
    + ")</td>\r\n  <td>"
    + alias4((helpers.formatDateTimeString || (depth0 && depth0.formatDateTimeString) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.finish : depth0)) != null ? stack1.dateTime : stack1),{"name":"formatDateTimeString","hash":{},"data":data}))
    + " ("
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.finish : depth0)) != null ? stack1.timeZone : stack1), depth0))
    + ")</td>\r\n  <td>"
    + alias4((helpers.formatDuration || (depth0 && depth0.formatDuration) || alias2).call(alias1,(depth0 != null ? depth0.durationMin : depth0),{"name":"formatDuration","hash":{},"data":data}))
    + "</td>\r\n  <td>"
    + alias4((helpers.formatAUD || (depth0 && depth0.formatAUD) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"formatAUD","hash":{},"data":data}))
    + "</td>\r\n</tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.flights || (depth0 != null ? depth0.flights : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"flights","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.flights) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"useData":true}));

this["JST"]["airport"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return ", "
    + container.escapeExpression(((helper = (helper = helpers.stateCode || (depth0 != null ? depth0.stateCode : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"stateCode","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, buffer = 
  "<span class=\"airport-item\">\r\n  <strong class=\"airport-name\">"
    + alias4(((helper = (helper = helpers.airportName || (depth0 != null ? depth0.airportName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"airportName","hash":{},"data":data}) : helper)))
    + " <small>("
    + alias4(((helper = (helper = helpers.airportCode || (depth0 != null ? depth0.airportCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"airportCode","hash":{},"data":data}) : helper)))
    + ")</small></strong>\r\n  <p class=\"airport-location\">"
    + alias4(((helper = (helper = helpers.cityName || (depth0 != null ? depth0.cityName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cityName","hash":{},"data":data}) : helper)));
  stack1 = ((helper = (helper = helpers.stateCode || (depth0 != null ? depth0.stateCode : depth0)) != null ? helper : alias2),(options={"name":"stateCode","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.stateCode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + ", "
    + alias4(((helper = (helper = helpers.countryName || (depth0 != null ? depth0.countryName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"countryName","hash":{},"data":data}) : helper)))
    + " <span class=\"flag-icon flag-icon-"
    + alias4(((helper = (helper = helpers.flag || (depth0 != null ? depth0.flag : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flag","hash":{},"data":data}) : helper)))
    + "\"></span></p>\r\n</span>";
},"useData":true});

this["JST"]["error"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h4 class=\"text-danger\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</h4>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p class=\"text-info\">"
    + container.escapeExpression(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"details","hash":{},"data":data}) : helper)))
    + "</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=helpers.blockHelperMissing, buffer = "";

  stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(options={"name":"message","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.message) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : alias2),(options={"name":"details","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.details) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

this["JST"]["loading"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "  <h4 class=\"text-info\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</h4>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <h4 class=\"text-info\">Loading, please wait...</h4>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"loading\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["JST"]["results"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=helpers.blockHelperMissing, alias5=container.escapeExpression, buffer = 
  "    <li role=\"presentation\"";
  stack1 = ((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : alias2),(options={"name":"active","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.active) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "><a href=\"#"
    + alias5(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "\" class=\"travel-date";
  stack1 = ((helper = (helper = helpers.active || (depth0 != null ? depth0.active : depth0)) != null ? helper : alias2),(options={"name":"active","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.active) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + alias5(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " class=\"active\"";
},"4":function(container,depth0,helpers,partials,data) {
    return " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression, alias3=container.lambda;

  return "<h2>Available flights\r\n	<br>\r\n	<small>on <span class=\"text-primary\">"
    + alias2((helpers.formatDateFull || (depth0 && depth0.formatDateFull) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.date : stack1),{"name":"formatDateFull","hash":{},"data":data}))
    + "</span> from <strong class=\"text-primary\">"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.from : stack1)) != null ? stack1.airportName : stack1), depth0))
    + " ("
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.from : stack1)) != null ? stack1.airportCode : stack1), depth0))
    + ")</strong> to <strong class=\"text-primary\">"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.to : stack1)) != null ? stack1.airportName : stack1), depth0))
    + " ("
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.searchParams : depth0)) != null ? stack1.to : stack1)) != null ? stack1.airportCode : stack1), depth0))
    + ")</strong></small>\r\n</h2>\r\n"
    + ((stack1 = container.invokePartial(partials._resultFilter,depth0,{"name":"_resultFilter","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"date-range\">\r\n  <ul class=\"nav nav-tabs nav-justified\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dateRange : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\r\n</div>\r\n<div class=\"table-responsive\">\r\n  <table class=\"table table-stripped table-hover\">\r\n    <thead>\r\n      <tr>\r\n        <th>Airline</th>\r\n        <th>Flight</th>\r\n        <th>Depart</th>\r\n        <th>Arrive</th>\r\n        <th>Duration</th>\r\n        <th>Price</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n"
    + ((stack1 = container.invokePartial(partials._resultRow,depth0,{"name":"_resultRow","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </tbody>\r\n  </table>\r\n</div>";
},"usePartial":true,"useData":true});

this["JST"]["search"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h2>Search for flights</h2>\r\n<form class=\"search-form\">\r\n	<div class=\"form-group\">\r\n		<label for=\"fromAirport\" class=\"control-label\">From</label>\r\n		<select id=\"fromAiport\" name=\"from\" class=\"form-control airport-field\" required=\"\"></select>\r\n	</div>\r\n	<div class=\"form-group\">\r\n		<label for=\"toAirport\" class=\"control-label\">To</label>\r\n		<select id=\"toAirport\" name=\"to\" class=\"form-control airport-field\" required=\"\"></select>\r\n	</div>\r\n	<div class=\"form-group\">\r\n		<label for=\"\" class=\"control-label\">Date</label>\r\n		<div class=\"input-group date\" data-date-format=\"dd/mm/yyyy\" data-date-start-date=\"+0d\" data-date-end-date=\"+1y\">\r\n      <input type=\"text\" name=\"date\" id=\"travelDate\" class=\"form-control\" value=\"\" required=\"\" placeholder=\"\">\r\n      <div class=\"input-group-addon\">\r\n        <span class=\"glyphicon glyphicon-th\"></span>\r\n      </div>\r\n    </div>\r\n	</div>\r\n	<div class=\"button-container\">\r\n		<button type=\"submit\" class=\"btn btn-default\">Search</button>\r\n	</div>\r\n</form>";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["JST"];}