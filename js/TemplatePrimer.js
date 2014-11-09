TemplatePrimer = {
	templates: {},
	get: function(name, callback){
		if( this.templates[name] ){
			if(callback){
				callback(this.templates[name]);
			}
		} else {
			var self = this;
			$.get("templates/"+name+".hbs", null, function(source){
				if(callback){
					self.templates[name] = Handlebars.compile(source);
					callback(self.templates[name]);
				}
			});
		}
	}
};