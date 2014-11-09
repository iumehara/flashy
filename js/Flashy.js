function Flashy( deck ){
	this.deck = deck;
}

Flashy.prototype.render = function(container, type){
	var self = this;
	var name;
	
	container.empty();
		
	var toolsContainer = $("<div/>", {"id":"tools"}).appendTo(container);
	var buttonBox = $("<div/>", {"class":"buttonBox"}).appendTo(toolsContainer);
	
	if( type === "creator" ){
		$("<div/>",{"class":"button fa fa-plus fa-1x"}).click(function(ev){
			self.deck.addCard();
		}).appendTo(buttonBox);
		$("<div/>",{"class":"button fa fa-save fa-1x"}).click(function(ev){
			self.deck.save();
		}).appendTo(buttonBox);
		var name = $("<input/>", {
			"id":"deckTitle", 
			"type": "text", 
			"value": this.deck.name
		}).appendTo(toolsContainer);
	} else if ( type === "learner" ) {
		$("<div/>",{"class":"button favorite"}).click(function(ev){
			$(this).toggleClass("on");
		}).appendTo(toolsContainer);
		name = $("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(toolsContainer);
	} else { // type === "player"
		name = $("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(toolsContainer);
	}
	
	name.click(function(ev){ self.deck.save(); });
	
	var deckContainer = $("<div/>", {"id":"deck"}).appendTo(container);
	
	$("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(self.toolsContainer);
	this.deck.render(deckContainer, type);
	this.deck.selectCard(0);
};
