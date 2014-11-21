function Deck(deck_json){
	this.name = deck_json.name;
	this.description = deck_json.description;
	this.copied = deck_json.copied;
	this.favorited = deck_json.favorited;
	this.blanket_tags = deck_json.blanket_tags;
	this.tags = deck_json.tags;	
	// if(deck_json.cards){
	// 	this.cards = [];
	// 	deck_json.cards.forEach(function(card_json){
	// 		this.cards.push(new Card(card_json));
	// 	}, this);
	// }
}



Deck.prototype.render = function(deck_container, type){
	var self = this;
	this.deck_container = deck_container;
	this.type = type;
	
	deck_container.empty();
	
	this.deck_slider = $("<div/>",{
		"class":"deck_slider"
	}).appendTo(deck_container);
	this.deck_slider.css("width", (960*this.cards.length)+"px");
		
	this.cards.forEach(function(card, idx){ 
		self.renderCard(card, type, idx);
	}, this);
};

Deck.prototype.renderCard = function(card, type, idx){
	var self = this;
	card.shield = $("<div/>",{"class":"cardShield"}).appendTo(this.deck_slider);
	if( idx !== 0){
		$("<div/>",{"class":"navigation left","html":"<span>&lt;</span>"}).
				appendTo(card.shield).
				click(function(ev){
					self.retreat();
				});
	}
	card.render(card.shield, type); 
	if( idx !== this.cards.length-1 ){
		$("<div/>",{"class":"navigation right","html":"<span>&gt;</span>"}).
				appendTo(card.shield).
				click(function(ev){
					self.advance();
				});
	}
};

Deck.prototype.renderSmall = function(deck_container){
	TemplatePrimer.get("deck", function(template){
		this.view = $(template(this));
		this.view.appendTo(deck_container);
	}.bind(this));
};



Deck.prototype.selectCard = function(idx){
	if(typeof this.selectedIndex === 'number'){
		this.cards[this.selectedIndex].shield.removeClass("active");
	}
	this.selectedIndex = idx;
	this.deck_slider.animate({"left": "-"+(idx*722)+"px"}, 300);
	this.cards[idx].shield.addClass("active");
};

Deck.prototype.advance = function(){
	var idx;
	if(this.selectedIndex === this.cards.length-1){
		idx = 0;
	} else {
		idx = this.selectedIndex + 1;
	}
	this.selectCard(idx);
};

Deck.prototype.retreat = function(){
	var idx;
	if(this.selectedIndex === 0){
		idx = this.cards.length-1;
	} else {
		idx = this.selectedIndex-1;
	}
	this.selectCard(idx);
};

Deck.prototype.addCard = function(){
	var card = Card.default();
	this.cards.push(card);	
	this.render(this.deck_container, this.type, this.cards.length-1);
	var self = this;
	self.selectCard(self.cards.length-1);
};





Deck.prototype.marshal = function(){
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
	this.cards.forEach(function(card){
		ret.cards.push(card.marshal());
	});
};

Deck.prototype.save = function(){
	var url = "/decks/"+this.id;
	window.player && window.player.setAttributes({
		key1: 'values'
	});
	return new Promise(function(success, error){
		$.post( url, this.marshal(), function(data){
			success(data);
		}, "application/json");
	});
};



Deck.get = function(id){
	//var url = "http://192.168.2.87:3000/decks/"+id;
	var url = "public/data/deck.json";
	return new Promise(function(success, error){
		$.getJSON( url, function(deck_json){
            var deck = new Deck(deck_json);
			success(deck);
		}).fail(function(err){
			console.log("ERRRORRRADR");
			console.log(err);
		});
	});
};




