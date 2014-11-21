function Flashy( deck ){
	this.deck = deck;
	fireStarter();
}

Flashy.prototype.render = function(container, type){
	var self = this;
	var name;
	
	container.empty();
		
	var toolsContainer = $("<div/>", {"id":"tools"}).appendTo(container);
	var buttonBox = $("<div/>", {"class":"buttonBox"}).appendTo(toolsContainer);
	
	if( type === "creator" ){
		$("<div/>",{"class":"button fa fa-plus fa-1x"}).click(function(ev){
			self.deck.addCard();
		}).appendTo(buttonBox);
		$("<div/>",{"class":"button fa fa-save fa-1x"}).click(function(ev){
			self.deck.save();
		}).appendTo(buttonBox);
		var name = $("<input/>", {
			"id":"deckTitle", 
			"type": "text", 
			"value": this.deck.name
		}).appendTo(toolsContainer);
	} else if ( type === "learner" ) {
		$("<div/>",{"class":"button favorite"}).click(function(ev){
			$(this).toggleClass("on");
		}).appendTo(toolsContainer);
		name = $("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(toolsContainer);
	} else { // type === "player"
		name = $("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(toolsContainer);
	}
	
	name.click(function(ev){ self.deck.save(); });
	
	var deckContainer = $("<div/>", {"id":"deck"}).appendTo(container);
	
	$("<div/>", {"id":"deckTitle"}).text(this.deck.name).appendTo(self.toolsContainer);
	this.deck.render(deckContainer, type);
	this.deck.selectCard(0);
};


function fireStarter() {

	var myFirebaseRef = new Firebase("https://flashy.firebaseio.com/");

	// myFirebaseRef.set({
	//   decks: {
	//     name: "San Francisco",
	//     description: "California",
	//     score: 94103
	//   }
	// });

	// myFirebaseRef.child("decks").child("-JaZBLp3mR8rMeOBk5Vv").child("cards").update({
	// 	2: "-JaZxIzkl1359imKmmek"
	// })

	// myFirebaseRef.child("location").update({
	// 	"city": "New York"
	// })

	// myFirebaseRef.child("decks").push({


	// myFirebaseRef.child("decks").push({
	//   "cards": {
	//   	"1": ""
	//   },
 //    "contributers": {
 //    	"1": ""
 //    },
	//   "description": "Covers six of the seven continents",
	//   "name": "Countries and Capitals",
	//   "score": 30,
	//   "tags": {
	//     "geography": true,
	//     "international": true,
	//     "Africa": true,
	//     "Asia": true,
	//     "Australia": true,
	//     "Europe": true,
	//     "North America": true,
	//     "South America": true
	//   }
	// })

	// myFirebaseRef.child("cards").push({
 //    "back": {
 //        "text": "26th president of the US.",
 //        "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/T_Roosevelt.jpg/477px-T_Roosevelt.jpg"
 //    },
 //    "contributers": {
 //    	"1": "bobby",
 //    	"2": "funnyjimmy"
 //    },
 //    "front": {
 //        "text": "Theodore Roosevelt",
 //        "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/T_Roosevelt.jpg/477px-T_Roosevelt.jpg"
 //    },
 //    "original_id": 3
	// })

	// myFirebaseRef.child("cards").push({
 //    "back": {
 //        "text": "16th president of the US.",
 //        "details": "Abraham Lincoln Listeni/ˈeɪbrəhæm ˈlɪŋkən/ (February 12, 1809 – April 15, 1865) was the 16th president of the United States, serving from March 1861 until his assassination in April 1865. Lincoln led the United States through its Civil War—its bloodiest war and its greatest moral, constitutional and political crisis.[1][2] In doing so, he preserved the Union, abolished slavery, strengthened the federal government, and modernized the economy. Reared in a poor family on the western frontier, Lincoln was a self-educated lawyer in Illinois, a Whig Party leader, state legislator during the 1830s, and a one-term member of the Congress during the 1840s. He promoted rapid modernization of the economy through banks, canals, railroads and tariffs to encourage the building of factories; he opposed the war with Mexico in 1846. After a series of highly publicized debates in 1858, during which Lincoln spoke out against the expansion of slavery, he lost the U.S. Senate race to his archrival, Democrat Stephen A. Douglas. Lincoln, a moderate from a swing state, secured the Republican Party presidential nomination in 1860. With very little support in the slave states, Lincoln swept the North and was elected president in 1860. His election prompted seven southern slave states to form the Confederacy before he took the office. No compromise or reconciliation was found regarding slavery."
 //    },
 //    "contributers": {
 //    	"1": "bobby",
 //    	"2": "funnyjimmy"
 //    },
 //    "front": {
 //        "text": "Abraham Lincoln",
 //        "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Abraham_Lincoln_November_1863.jpg/486px-Abraham_Lincoln_November_1863.jpg"
 //    },
 //    "original_id": "",
 //    "tags": {
 //        "civil war": true,
 //        "honest": true
 //    }
	// })

	// myFirebaseRef.child("users").set({
	// 	"bobby1" : {
	// 		"name": "Bob Anderson",
	// 		"description": "I'm a teacher from Utah!",
	// 		"decks": {
	// 			"-JaZBLp3mR8rMeOBk5Vv": true,
	// 			"-JaZEYGHDOR451MMn0kU": true
	// 		}
	// 	}
	// })


	// myFirebaseRef.child("decks/-JaZBLp3mR8rMeOBk5Vv/cards").on("value", function(snapshot) {
	//   alert(snapshot.val());  // Alerts "San Francisco"
	// });
}

