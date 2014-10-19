function Flashy( deck ){
	this.deck = deck;
}

Flashy.prototype.render = function(container, type){
	var self = this;
		
	var toolsContainer = $("<div/>", {"id":"tools"}).appendTo(container);
	$("<div/>",{"class":"button back"}).click(function(ev){
		window.location = "/";
	}).appendTo(toolsContainer);
	if( type === "creator" ){
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
	
	var deckContainer = $("<div/>", {"id":"deck"}).appendTo(container);
	var name = $("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(toolsContainer);
	
	this.deck.render(deckContainer, type);
};
