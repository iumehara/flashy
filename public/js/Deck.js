function Deck(deck_json, type){
	this.id = deck_json.id;
	this.owner_id = deck_json.owner_id;
	this.name = deck_json.name;
	this.description = deck_json.description;
	this.score = deck_json.score;
	this.difficulty = deck_json.difficulty;
	this.tags = deck_json.tags;
	
	if(deck_json.cards){
		this.cards = [];
		deck_json.cards.forEach(function(card_json){
			this.cards.push(new Card(card_json));
		}, this);
	}
}

jQuery.extend(Deck, Base);


Deck.prototype.render = function(deck_container){
	var self = this;
	
	this.deck_slider = $("<div/>",{
		"class":"deck_slider"
	}).appendTo(deck_container);
	this.deck_slider.css("width", (960*this.cards.length)+"px");
		
	this.cards.forEach(function(card, idx){ 
		var card_shield = $("<div/>",{"class":"cardShield"}).appendTo(this.deck_slider);
		if( idx !== 0){
			$("<div/>",{"class":"navigation left","html":"<"}).
					appendTo(card_shield).
					click(function(ev){
						self.retreat();
					});
		}
		card.render(card_shield); 
		if( idx !== this.cards.length-1 ){
			$("<div/>",{"class":"navigation right","html":">"}).
					appendTo(card_shield).
					click(function(ev){
						self.advance();
					});
		}
	}, this);
	
	this.selectCard(0);
};

Deck.prototype.renderSmall = function(deck_container){
	var renderer = function(){
		this.view = $(Deck.template(this));
		this.view.appendTo(deck_container);
	}.bind(this);
	
	if(Deck.template){
		renderer(deck_container);
	} else {
		Deck.primeTemplate(function(){
			renderer(deck_container);
		});
	}
};



Deck.prototype.selectCard = function(idx){
	this.selectedIndex = idx;
	this.deck_slider.animate({"left": "-"+(idx*960)+"px"}, 300);
};

Deck.prototype.advance = function(){
	if(this.selectedIndex === this.cards.length-1){
		this.selectedIndex = 0;
	} else {
		this.selectedIndex++;
	}
	this.selectCard(this.selectedIndex);
};

Deck.prototype.retreat = function(){
	if(this.selectedIndex === 0){
		this.selectedIndex = this.cards.length-1;
	} else {
		this.selectedIndex--;
	}
	this.selectCard(this.selectedIndex);
};