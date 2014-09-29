var trumpet = require('trumpet'),
	tr = trumpet(),
	through = require('through'),
	transform = through(function write(data){
		this.queue(data.toString().toUpperCase());
	});

tr.pipe(process.stdout);

var trumpetStream = tr.select('.loud').createStream();
trumpetStream.pipe(transform).pipe(trumpetStream);

process.stdin.pipe(tr);