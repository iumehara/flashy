function Flashy( type, container){
	this.type = type;
	
	function makeTools(toolsContainer){
		$("<div/>",{"class":"button back"}).click(function(ev){
			window.location = "/";
		}).appendTo(toolsContainer);
		
		if( type === "creator" ){
			$("<div/>",{"class":"button menu"}).click(function(ev){
				window.location = "/";
			}).appendTo(toolsContainer);
		} else {
			$("<div/>",{"class":"button favorite"}).click(function(ev){
				window.location = "/";
			}).appendTo(toolsContainer);
		}
	}
	
	makeTools(container);
	
	
	jQuery.getJSON("/flashy/data/deck.json", null, function(deck){
		this.deck = new Deck(deck);
	}.bind(this));
	
	
	
	
}