var static = require('node-static'),
	util = require('util')
	;

var publicDirectory = new static.Server('.');

require('http').createServer(function(request, response) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	console.log(request.url);
	
	request.addListener('end', function() {
		publicDirectory.serve(request, response, function(err, result) {
			if (err && err.message) {
				console.error('Error serving %s - %s', request.url, err.message);
				if (err.status === 404 || err.status === 500) {
					publicDirectory.serveFile(util.format('/%d.html', err.status), err.status, {}, request, response);
				} else {
					//response.writeHead(err.status, err.headers);
					//response.end();
				}
			} else {
				console.log('%s - %s', request.url, response.message);
			}
		});
	}).resume();
	
}).listen(3000);
