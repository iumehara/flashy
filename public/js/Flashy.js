function Flashy( type, deck_json ){
	this.type = type;
	this.deck = new Deck(deck_json);
}

Flashy.prototype.render = function(container){
	function makeTools(toolsContainer){
		var self = this;
		
		$("<div/>",{"class":"button back"}).click(function(ev){
			window.location = "/";
		}).appendTo(toolsContainer);
		
		if( this.type === "creator" ){
			$("<div/>",{"class":"button add"}).click(function(ev){
				self.deck.add();
			}).appendTo(toolsContainer);
			$("<div/>",{"class":"button save"}).click(function(ev){
				self.deck.save();
			}).appendTo(toolsContainer);
		} else {
			$("<div/>",{"class":"button favorite"}).click(function(ev){
				$(this).toggleClass("on");
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
	this.deck.render(this.deckContainer);
};
