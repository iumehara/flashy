function Deck(deck_json){
	this.cards = [];
	deck_json.cards.forEach(function(card_json){
		this.cards.push(new Card(card_json));
	});
}

Deck.prototype.render = function(container){
	this.cards.forEach(function(card){ 
		card.render(container); 
	});
};