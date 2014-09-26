'use strict';

var split = require('split'),
    through = require('through'),
    count = 0,
    transform = through(function write(data){
        if(count % 2 === 1){
            this.queue(data.toString().toUpperCase() + '\n');
        }else{
            this.queue(data.toString().toLowerCase() + '\n');
        }
        count++;
    });

process.stdin.pipe(split()).pipe(transform).pipe(process.stdout);
