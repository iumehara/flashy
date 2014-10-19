function Flashy( deck ){
	this.deck = deck;
}

Flashy.prototype.render = function(container, type){
	var self = this;
	var name;
	
	container.empty();
		
	var toolsContainer = $("<div/>", {"id":"tools"}).appendTo(container);
	$("<div/>",{"class":"button back"}).click(function(ev){
		window.location = "/";
	}).appendTo(toolsContainer);
	$(".button.back").html('<i class="fa fa-arrow-left fa-1x"></i>');
	if( type === "creator" ){
		$("<div/>",{"class":"button add"}).click(function(ev){
			self.deck.add();
		}).appendTo(toolsContainer);
		$("<div/>",{"class":"button save"}).click(function(ev){
			self.deck.save();
		}).appendTo(toolsContainer);
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
};
