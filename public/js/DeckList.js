function DeckList(list_json) {
	this.decks = [];
	list_json.forEach(function(deck){
		this.decks.push(new Deck(deck));
	}, this);
}



DeckList.prototype.render = function(container){
	this.decks.forEach(function(deck){
		deck.renderSmall(container);
	});
};