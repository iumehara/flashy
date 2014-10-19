
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

function show(request, response){
	var id = request.url.split("/")[2];
  client.query('SELECT content FROM cards WHERE id = $1', [id], function(err, result) {
  	response.setHeader('Content-Type', 'application/json');
  	response.write(JSON.stringify(result["rows"][0]["content"]));
  	response.end();
  });
};

function create(request, response){
	console.log("===== CREATE =====");
	var body = '';
	request.on('data', function (data) {
		body += data;
		if (body.length > 1e6){
			request.connection.destroy();
		};
	});
	request.on('end', function(){
	  client.query('INSERT INTO cards(content) VALUES($1);', [body], function(err, result) {
	  	response.setHeader('Content-Type', 'application/json');
	  });
	})
};

function update(request, response){
	console.log("===== UPDATE =====");
	var card_id = request.url.split("/")[2];
	var body = '';
	request.on('data', function (data) {
		body += data;
		if (body.length > 1e6){
			request.connection.destroy();
		};
	});
	request.on('end', function(){
	  client.query('Update cards SET content = $1 WHERE id = $2;', [body, card_id], function(err, result) {
	  	response.setHeader('Content-Type', 'application/json');
	    console.log(err);
	    console.log(result);
	  });
	})
};

exports.handle = function(request, response){
	switch(request.method){
		case "GET":
			show(request, response);
			break;
		case "POST":
			if (request.url.split("/")[2] != null){
				update(request, response);
			}	else {
				create(request, response);
			}
			break;
	}
	request.resume();
};

