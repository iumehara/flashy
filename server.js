var static = require('node-static'),
	util = require('util'),
	cards = require('./node/cards'),
	decks = require('./node/decks')
	;

var publicDirectory = new static.Server('./public');

require('http').createServer(function(request, response) {
	if( request.url === '/' ){
		request.url = '/flashy/public/html/index.html';
	}
	
	if(request.url.indexOf("/flashy/public") === 0){
		request.url = request.url.substring(14);
		request.addListener('end', function() {
			publicDirectory.serve(request, response, function(err, result) {
				if (err) {
					console.error('Error serving %s - %s', request.url, err.message);
					if (err.status === 404 || err.status === 500) {
						publicDirectory.serveFile(util.format('/%d.html', err.status), err.status, {}, request, response);
					} else {
						response.writeHead(err.status, err.headers);
						response.end();
					}
				} else {
					console.log('%s - %s', request.url, response.message);
				}
			});
		}).resume();
	} else if( request.url.indexOf("/cards") === 0 ) {
		cards.handle(request, response);
	} else if( request.url.indexOf("/decks") === 0 ) {	
		decks.handle(request, response);
	} else {
		request.resume();
	}
}).listen(3000);
