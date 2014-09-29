'use strict';

var through = require('through'),
transform = through(function write(data) {
        this.queue(data.toString().toUpperCase());
    },
    function end() { //optional
        this.queue(null);
    }
);

process.stdin.pipe(transform).pipe(process.stdout);
