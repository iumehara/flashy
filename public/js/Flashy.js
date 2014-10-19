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
	
	this.toolsContainer = $("<div/>", {"id":"tools"}).appendTo(container);
	makeTools(this.toolsContainer);
	
	this.deckContainer = $("<div/>", {"id":"deck"}).appendTo(container);
	var self = this;
	jQuery.getJSON("/flashy/public/data/deck.json", null, function(deck){
		this.deck = new Deck(deck);
		var name = $("<div/>", {"id":"deckTitle"}).text(this.deck.name);
		name.appendTo(self.toolsContainer);
		this.deck.render(this.deckContainer);
	}.bind(this));
	
	
	
	
}