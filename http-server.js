var http = require('http'),
	through = require('through'),
	transform = through(function write(data){
		this.queue(data.toString().toUpperCase());
	}),
	port = process.argv[2],
	server = http.createServer(function (req, res) {
        if (req.method === 'POST') {
            req.pipe(transform).pipe(res);
        }
        res.end();
    });
server.listen(port);