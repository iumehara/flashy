function Card(){
	$(document).ready(function(){
				$(".top").addClass("show");
				$(".view").click(function(){
					if($(".top").hasClass("show")){
						$(".bottom").addClass("show");
						$(".top").removeClass("show");
					} else {
						$(".top").addClass("show");
						$(".bottom").removeClass("show");
					}
				})
			});
}