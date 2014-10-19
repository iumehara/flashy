var Base = {
	primeTemplate: function(callback){
		var self = this;
		$.get("/flashy/public/templates/"+this.name.toLowerCase()+".hbs", null, function(source){
			self.template = Handlebars.compile(source);
			if(callback){
				callback();
			}
		});
	}
};