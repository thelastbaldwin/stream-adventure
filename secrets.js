'use strict';

var crypto = require('crypto'),
	tar = require('tar'),
	zlib = require('zlib'),
	through = require('through'),
	unzipStream = zlib.createGunzip(),
	parser = tar.Parse(),
	decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

process.stdin.pipe(decipher).pipe(unzipStream).pipe(parser);

parser.on('entry', function(entry){
	if(entry.type === 'File'){
		var md5 = crypto.createHash('md5', {encoding: 'hex'});
		entry.pipe(md5).pipe(through(function write(buffer){
			this.queue(buffer + ' ' + entry.path + '\n');
		})).pipe(process.stdout);
	}
});
