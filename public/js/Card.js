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
		}
	}.bind(this));
};

Card.prototype.toggle = function(){
	this.front.view.toggle();
	this.back.view.toggle();
};



/*
(function(){
	Card.primeTemplate();
});
*/