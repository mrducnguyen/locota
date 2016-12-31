var should = require('should');

should.Assertion.add('containAtLeastOne', function(props) {
	this.params = {
		operator: 'to contain at least one of properties ' + JSON.stringify(props)
	};
	var count = 0;
	var error, idx, item;

	// expect array only
	for (var idx in this.obj) {
		item = this.obj[idx];
		try {
			item.should.have.properties(props);
			break;
		} catch (e) {
			error = e;
			count++;
		}
	}

	if (count == this.obj.length) throw error;
});

module.exports = should;