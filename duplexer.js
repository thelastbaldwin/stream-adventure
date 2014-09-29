var spawn = require('child_process').spawn,
	duplexer = require('duplexer');
    
module.exports = function (cmd, args) {
	var spawnedProcess = spawn(cmd, args);
	return duplexer(spawnedProcess.stdin, spawnedProcess.stdout);
};