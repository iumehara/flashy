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






DeckList.get = function(user_id){
	var url = "/decks";
	var url = "/flashy/public/data/deck_list.json";
	return new Promise(function(success, error){
		$.getJSON( url, function(data){
			var decklist = new DeckList(data);
			success(decklist);
		});
	});
};