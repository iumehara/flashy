var http = require('http');
var pg = require('pg');
var conString = "postgres://flashy:flashflash@localhost:5432/flashy";
var client;
var done;

// get a pg client from the connection pool
pg.connect(conString, function(err, pgclient, pgdone) {
	client = pgclient;
	done = pgdone;
});

var handleError = function(err, res) {
  // no error occurred, continue with the request
  if(!err) return false;
  // An error occurred, remove the client from the connection pool.
  // A truthy value passed to done will remove the connection from the pool
  // instead of simply returning it to be reused.
  // In this case, if we have successfully received a client (truthy)
  // then it will be removed from the pool.
  done(client);
  res.writeHead(500, {'content-type': 'text/plain'});
  res.end('An error occurred');
  return true;
};

function index(request, response){
  client.query('SELECT content FROM cards', function(err, result) {
  	response.setHeader('Content-Type', 'application/json');
  	response.write(JSON.stringify(result["rows"]));
  	response.end();
  });		
}

function show(request, response){
	var deck_id = request.url.split("/")[2];
  client.query('SELECT content FROM decks WHERE id = $1', [deck_id], function(err, result) {
  	var deck_content = result["rows"][0]["content"]
  	var card_ids     = deck_content["card_ids"]
	  client.query('SELECT * FROM cards WHERE id = ANY($1)', [card_ids], function(err, result) {
			result["rows"].forEach(function(card){
				deck_content["cards"].push(card);
			});
			console.log("=== DECK ===");
			console.log(deck_content);
		});
  	response.setHeader('Content-Type', 'application/json');
  	response.write(JSON.stringify(deck_content));
  	response.end();
  });	
}

function create(request, response){
	var body = '';
	request.on('data', function (data) {
		body += data;
		if (body.length > 1e6){
			request.connection.destroy();
		};
	});
	request.on('end', function(){
		console.log(body);
	  client.query('INSERT INTO decks(content) VALUES($1);', [body], function(err, result) {
	    console.log(err);
	    console.log(result);
	  });
	})
};

function update(request, response){
	
}


exports.handle = function(request, response){
	switch(request.method){
		case "GET":
			if (request.url.split("/")[2] != null){
				show(request, response);
			}	else {
				index(request, response);
			}
			break;
		case "POST":
			create(request, response);
			break;
	}
	request.resume();
};
