var Hogan = require('hogan.js');

var t = {
  /* jshint ignore:start */
  'results' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");return t.fl(); },partials: {}, subs: {  }}),
  'search' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<h1>Search for flights</h1>\r");t.b("\n" + i);t.b("<form action=\"\" class=\"form-inline\">\r");t.b("\n" + i);t.b("	<div class=\"form-group\">\r");t.b("\n" + i);t.b("		<label for=\"fromAirport\" class=\"control-label\">From</label>\r");t.b("\n" + i);t.b("		<div>\r");t.b("\n" + i);t.b("			<input type=\"text\" name=\"from\" class=\"form-control\" id=\"fromAiport\" placeholder=\"From Airport\" required=\"\">\r");t.b("\n" + i);t.b("		</div>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("	<div class=\"form-group\">\r");t.b("\n" + i);t.b("		<label for=\"toAirport\" class=\"control-label\">To</label>\r");t.b("\n" + i);t.b("		<div>\r");t.b("\n" + i);t.b("			<input type=\"text\" name=\"to\" id=\"toAirport\" class=\"form-control\" placeholder=\"To Airport\" required=\"\">\r");t.b("\n" + i);t.b("		</div>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("	<div class=\"form-group\">\r");t.b("\n" + i);t.b("		<label for=\"\" class=\"control-label\">Date</label>\r");t.b("\n" + i);t.b("		<div>\r");t.b("\n" + i);t.b("			<div class=\"input-group date\" data-date-format=\"dd/mm/yyyy\" data-date-start-date=\"+1d\" data-date-end-date=\"+1y\">\r");t.b("\n" + i);t.b("				<input type=\"text\" name=\"date\" id=\"travelDate\" class=\"form-control\" value=\"\" required=\"\">\r");t.b("\n" + i);t.b("				<div class=\"input-group-addon\">\r");t.b("\n" + i);t.b("					<span class=\"glyphicon glyphicon-th\"></span>\r");t.b("\n" + i);t.b("				</div>\r");t.b("\n" + i);t.b("			</div>\r");t.b("\n" + i);t.b("		</div>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("	<div class=\"button-container\">\r");t.b("\n" + i);t.b("		<button type=\"submit\" class=\"btn btn-default\">Search</button>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("</form>");return t.fl(); },partials: {}, subs: {  }})
  /* jshint ignore:end */
},
r = function(n) {
  var tn = t[n];
  return function(c, p, i) {
    return tn.render(c, p || t, i);
  };
};
module.exports = {
  'results' : r('results'),
  'search' : r('search')
};