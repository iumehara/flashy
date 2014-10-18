function Card(card_json){
}


Card.prototype.render = function(container){
	renderer = function(container){
		this.template = $(Card.template(this))
		this.template.appendTo(container);
		
		$(this.template).find(".top").addClass("show");
		$(this.template).find(".view").click(function(){
			if($(this.template).find(".top").hasClass("show")){
				$(this.template).find(".bottom").addClass("show");
				$(this.template).find(".top").removeClass("show");
			} else {
				$(this.template).find(".top").addClass("show");
				$(this.template).find(".bottom").removeClass("show");
			}
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


Card.primeTemplate = function(callback){
	$.get("/flashy/templates/card.hbs", null, function(source){
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