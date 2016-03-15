var ViewUtils = function(){
	var _this = this,
		prev_st = 0;

	this.init = function(){
		_this.bindEvents();
	};

	this.bindEvents = function(){
		console.log("bindEvents")
		/*$(window).scroll(function(){ 
			_this.handleScroll();
			if($(window).scrollTop() == $(document).height() - $(window).height()){
			    //if(!isLoading)get_new_images();
			}
		});*/

		$("html").on('click', '.remove-row', function(event) {
			if($(".form-row").length > 2)
				$(this).parent().remove();
		});

		$("html").on('click', '.add-row', function(event) {
			var len = $(".form-row").length;

			var html = '<div class="row form-row">';
				    html += '<div class="span3"><input type="text" name="ost['+len+'][part]" placeholder="Part"></div>';
				    html += '<div class="span3"><input type="text" name="ost['+len+'][artist]" placeholder="Artist"></div>';
				    html += '<div class="span3"><input type="text" name="ost['+len+'][track]" placeholder="Track"></div>';
				    html += '<button class="remove-row hvr">-</button>';
	            html += '</div>';

	        $(".form-row-soundtrack").append(html);
		});
	};

	this.handleScroll = function(){
		if($(window).scrollTop() > prev_st){
			console.log("haut")
			$("footer").removeClass("offside_bottom");
			$("header").addClass("offside_top");
		}else{
			console.log("bas");
			//$("footer").addClass("offside_bottom");
			$("header").removeClass("offside_top");
		}

		if($(window).scrollTop() == $(document).height() - $(window).height())$("footer").removeClass("offside_bottom");
		if($(window).scrollTop() == 0)$("header").removeClass("offside_top");
		
		prev_st = $(window).scrollTop();
	};

	this.parseContent = function(c){
        return c;
    };

    
}

