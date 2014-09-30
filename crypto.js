'use strict';

var crypto = require('crypto'),
	stream = crypto.createDecipher('aes256', process.argv[2]);
stream.pipe(process.stdout);
process.stdin.pipe(stream);
