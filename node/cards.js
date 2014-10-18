

function favorite(request){
	// do something here
}


exports.handle = function(request, response){
	var action = request.url.split("/")[2];
	
	switch(action){
		case "favorite":
			favorite(request);
	}
	
	
	
};