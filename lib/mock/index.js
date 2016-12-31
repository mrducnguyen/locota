var ContinuousStream = require('lib/continuous-stream'),
	debug = require('debug')('locota'),
	util = require('lib/util'),
	fs = require('fs');

module.exports = mock();

function mock() {
	var MAX_DELAY = 1000,
		MIN_DELAY = 100,
		MAX_PARTS = 20,
		MIN_PARTS = 1;

	function randomNum(min, max) {
		return min + Math.ceil(Math.random() * (max - min));
	}

	function randomSplit(data) {
		var partCount = randomNum(MIN_PARTS, MAX_PARTS),
			parts = [],
			subLen = Math.floor(data.length / partCount);

		if (partCount > data.length) {
			return [data];
		}

		for (var i = 0; i < partCount - 1; i++) {
			parts.push(data.substring(i * subLen, (i + 1) * subLen));
		}
		if (i * subLen < data.length) {
			parts.push(data.slice(i * subLen));
		}
		return parts;
	}

	function loadResource(conf, ctx) {

		ctx.set('Transfer-Encoding', 'chunked');
		var resultStream = ctx.body = ContinuousStream();
		var file = conf.directory + '/response-export.json';

		debug("Mocking resources for %s api, from [%s]", conf.name, file);

		function writeData(data, resolve, reject) {
			if (Math.random() < 0.1) {
				reject();
				return;
			}
			resultStream.write(data);
			resultStream.end();
			resolve();
		}

		function writeDataAsync(parts, i, resolve, reject) {
			if (Math.random() < 0.1 & i < 3) {
				// randomly reject the promise, for the first 3 parts only
				reject();
				return;
			}
			if (i < parts.length) {
				setTimeout(() => {
					resultStream.write(parts[i]);
					writeDataAsync(parts, i + 1, resolve, reject);
				}, randomNum(MIN_DELAY, MAX_DELAY));
			} else {
				resultStream.end();
				resolve();
			}
		}

		return new Promise((resolve, reject) => {
			setTimeout(() => {

				fs.readFile(file, 'utf8', function(err, data) {
					if (err) {
						return debug(err);
					}

					data = util.unescape(data);
					if (data.startsWith('"') && data.endsWith('"')) {
						data = data.slice(1, -1);
					}

					var promises = [];

					if (conf.delimiter) {
						ctx.set('Chunk-Delimiter', util.escape(conf.delimiter));
						var parts = randomSplit(data);
						debug("Randomly splitting into %s parts", parts.length);
						writeDataAsync(parts, 0, resolve);
					} else {
						writeData(data, resolve);
					}
				});

			}, randomNum(MIN_DELAY, MAX_DELAY));
		});
	}

	return {
		resource: loadResource
	};
}