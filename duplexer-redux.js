'use strict';

var counter = process.argv[2],
	countries = {},
	through = require('through'),
	duplexer = require('duplexer');

module.exports = function (counter) {
	var countries = {},
		transform = through(function write(data){
			if(countries[data.country]){
				countries[data.country]++;
			}else{
				countries[data.country] = 1;
			}
			this.queue(data);
		},function end(data){
			counter.setCounts(countries);
			this.queue(null);
		});
	return duplexer(transform, counter);
};
