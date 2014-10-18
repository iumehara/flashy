function Flashy( type, container, deck ){
	this.type = type;
	
	function makeTools(body){
		$("<div/>",{"class":"button back"}).click(function(ev){
			window.location = "/";
		}).appendTo(body);
		
		if( type === "creator" ){
			$("<div/>",{"class":"button menu"}).click(function(ev){
				window.location = "/";
			}).appendTo(body);
		} else {
			$("<div/>",{"class":"button favorite"}).click(function(ev){
				window.location = "/";
			}).appendTo(body);
		}
	}
	
	
	
	
	
	makeTools(container);
	// Make back tool
	
	
	
	
}