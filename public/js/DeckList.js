function DeckResults(){

}

function getList(){
				$(document).ready(function(){
				var results=[];
				$.getJSON("data/deck_list.json", function(data){
					for (i=0; i<results.length; i++){
						var info = {};
						info.name = data[i].name;
						info.score = data[i].score;
						results.push(info);
					}
				});
			});
}