function Card(card_json){
	this.id = card_json.id;
	this.front = card_json.front;
	this.back = card_json.back;
	this.category = card_json.category;
	this.favorite = card_json.favorite;
	this.score = card_json.score;
	this.original_id = card_json.original_id;
	this.tags = card_json.tags;
}



Card.prototype.render = function(container, type){
	var templateName = (type === "creator" ? "card_creator" : "card");
	
	TemplatePrimer.get(templateName, function(template){
		this.view = $(template({
			card: this,
			type: type
		}));
		this.view.appendTo(container);
		
		this.front.view = this.view.find(".front");
		this.back.view = this.view.find(".back");
		
		var self = this;
		if( type === "player"){
			this.view.click(function(ev){
				self.toggle();
			});
		} else if( type === "creator"){
			this.view.find(".view.front .text").change(function(){
				self.front.text = this.value;
			});
			this.view.find(".view.back .text").change(function(){
				self.back.text = this.value;
			});
		}
	}.bind(this));
};

Card.prototype.toggle = function(){
	if( this.toggled ){
		this.toggled = false;
		this.front.view.animate({"opacity": "1"}, 300);
		this.back.view.animate({"opacity": "0"}, 300);
	} else {
		this.toggled = true;
		this.front.view.animate({"opacity": "0"}, 300);
		this.back.view.animate({"opacity": "1"}, 300);
	}
};




Card.prototype.marshal = function(){
	return {
		id: this.id,
		front: this.front,
		back: this.back,
		category: this.category,
		favorite: this.favorite,
		score: this.score,
		original_id: this.original_id,
		tags: this.tags
	};
};


Card.default = function(){
	return new Card({
		id: null,
		front: {
			text: ""
		},
		back: {
			text: ""
		},
		category: "",
		favorite: false,
		score: null,
		original_id: null,
		tags: []
	});
};


/*
(function(){
	Card.primeTemplate();
});
*/