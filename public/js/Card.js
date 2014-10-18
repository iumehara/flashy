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

Card.prototype.render = function(container){
	var renderer = function(container){
		this.view = $(Card.template(this));
		this.view.appendTo(container);
		
		this.front.view = this.view.find(".front");
		this.back.view = this.view.find(".back");
		
		var self = this;
		this.view.click(function(ev){
			self.toggle();
		});
	}.bind(this);
	
	if(Card.template){
		renderer(container);
	} else {
		Card.primeTemplate(function(){
			renderer(container);
		});
	}
};

Card.prototype.toggle = function(){
	this.front.view.toggle();
	this.back.view.toggle();
};

Card.primeTemplate = function(callback){
	$.get("/flashy/public/templates/card.hbs", null, function(source){
		Card.template = Handlebars.compile(source);
		if(callback){
			callback();
		}
	});
};

/*
(function(){
	Card.primeTemplate();
});
*/