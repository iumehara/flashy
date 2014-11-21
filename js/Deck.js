function Deck(deck_json, onload) {
	var card_ids = deck_json.cards.clean();
	this.constributers = deck_json.constributers;
	this.description = deck_json.description;
	this.name = deck_json.name;
	this.score = deck_json.score;
	this.tags = deck_json.tags;
	this.cards = [];
	this.onload = onload;
	if (card_ids) {
		this.getCards(card_ids);
	}
}

Deck.prototype.getCards = function(card_ids) {
	var cards = [];
	var self = this;
	var cardsCountdown = card_ids.length;
	var myFirebaseRef = new Firebase("https://flashy.firebaseio.com/");
	card_ids.forEach(function(card_id) {
		myFirebaseRef.child("cards").child(card_id).once("value", function(snapshot) {
			var card = new Card(snapshot.val());
			cards.push(card);
			if( --cardsCountdown === 0 ){
				self.onload();
			}
		});
	}, this);
	this.cards = cards;
};

Deck.prototype.render = function(deck_container, type) {
	var self = this;
	this.deck_container = deck_container;
	this.type = type;

	deck_container.empty();

	this.deck_slider = $("<div/>", {
		"class": "deck_slider"
	}).appendTo(deck_container);
	this.deck_slider.css("width", (960 * this.cards.length) + "px");

	this.cards.forEach(function(card, idx) {
		self.renderCard(card, type, idx);
	}, this);
};

Deck.prototype.renderCard = function(card, type, idx) {
	var self = this;
	card.shield = $("<div/>", {"class": "cardShield"}).appendTo(this.deck_slider);
	if (idx !== 0) {
		$("<div/>", {"class": "navigation left", "html": "<span>&lt;</span>"}).
				appendTo(card.shield).
				click(function(ev) {
					self.retreat();
				});
	}
	card.render(card.shield, type);
	if (idx !== this.cards.length - 1) {
		$("<div/>", {"class": "navigation right", "html": "<span>&gt;</span>"}).
				appendTo(card.shield).
				click(function(ev) {
					self.advance();
				});
	}
};

Deck.prototype.renderSmall = function(deck_container) {
	TemplatePrimer.get("deck", function(template) {
		this.view = $(template(this));
		this.view.appendTo(deck_container);
	}.bind(this));
};



Deck.prototype.selectCard = function(idx) {
	if (typeof this.selectedIndex === 'number') {
		this.cards[this.selectedIndex].shield.removeClass("active");
	}
	this.selectedIndex = idx;
	this.deck_slider.animate({"left": "-" + (idx * 722) + "px"}, 300);
	this.cards[idx].shield.addClass("active");
};

Deck.prototype.advance = function() {
	var idx;
	if (this.selectedIndex === this.cards.length - 1) {
		idx = 0;
	} else {
		idx = this.selectedIndex + 1;
	}
	this.selectCard(idx);
};

Deck.prototype.retreat = function() {
	var idx;
	if (this.selectedIndex === 0) {
		idx = this.cards.length - 1;
	} else {
		idx = this.selectedIndex - 1;
	}
	this.selectCard(idx);
};

Deck.prototype.addCard = function() {
	var card = Card.default();
	this.cards.push(card);
	this.render(this.deck_container, this.type, this.cards.length - 1);
	var self = this;
	self.selectCard(self.cards.length - 1);
};





Deck.prototype.marshal = function() {
	var ret = {
		id: this.id,
		owner_id: this.owner_id,
		name: this.name,
		description: this.description,
		score: this.score,
		difficulty: this.difficulty,
		tags: this.tags,
		cards: []
	};
	this.cards.forEach(function(card) {
		ret.cards.push(card.marshal());
	});
};

Deck.prototype.save = function() {
	var url = "/decks/" + this.id;
	window.player && window.player.setAttributes({
		key1: 'values'
	});
	return new Promise(function(success, error) {
		$.post(url, this.marshal(), function(data) {
			success(data);
		}, "application/json");
	});
};



Deck.get = function(id) {
	//var url = "http://192.168.2.87:3000/decks/"+id;
	var url = "public/data/deck.json";
	return new Promise(function(success, error) {
		$.getJSON(url, function(deck_json) {
			var deck = new Deck(deck_json);
			success(deck);
		}).fail(function(err) {
			console.log("ERRRORRRADR");
			console.log(err);
		});
	});
};




