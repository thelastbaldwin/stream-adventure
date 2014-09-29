'use strict';

var combine = require('stream-combiner'),
	split = require('split'),
	through = require('through'),
	zlib = require('zlib'),
	currentGenre,
	transform = through(function write(data){
		var item = (data.length > 0) ? JSON.parse(data.toString()) : undefined;

		if(item){
			if(item.type === 'genre'){
				if(currentGenre){
					this.queue(JSON.stringify(currentGenre) + '\n');
				}
				currentGenre = {
					name: item.name,
					books: []
				};
			}else{
				currentGenre.books.push(item.name);
			}
		}
	},
	function end(){
		this.queue(JSON.stringify(currentGenre) + '\n');
		this.queue(null);
	});

module.exports = function (){
	return combine(
		split(),
		transform,
		zlib.createGzip());
};
