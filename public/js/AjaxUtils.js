var AjaxUtils = function(){
	var _this = this;

	this.init = function(){
		_this.bindEvents();
	};

	this.bindEvents = function(){
		console.log("bindEvents")
		
		
		
		$("html").on("click", "a.ajax_g", function(event) {
			event.preventDefault();
			$("body").addClass('loading');

			var st = $(this).parent().position().top - $("header").height();

			arrTubeTapePlayer = [];
			$(".article_content .ost").html("");
			
			$article = $(this).parents("article");

			$("article").removeClass('open');
			$article.addClass('open');
			
			$.ajax({
			  method: "GET",
			  url: $(this).attr("href"),
			  //data: { name: "John", location: "Boston" }
			})
				.done(function( data ) {

					/*var html = '<div class="ost_header row">';
							html += '<div class="fiboA player_ost">';
								
								html += '<span class="control play">';
									html += '<i class="fa fa-play"></i>  ';
								html += '</span>';
								
							html += '</div>';
							html += '<div class="fiboB">';
								html += '<div class="span3">Part</div>';
								html += '<div class="span3">Artist</div>';
								html += '<div class="span3">Track</div>';
							html += '</div>';
						html += '</div>';
					$article.find(".article_content").append(html);
					*/
					for(var i in data.ost){
						var _TubeTapePlayer = new TubeTapePlayer($article, data.ost[i]);
						_TubeTapePlayer.init();

						arrTubeTapePlayer.push(_TubeTapePlayer);
					}

					//$article.find(".article_content").show();
					$("body").removeClass('loading');
					$("html,body").animate({
						scrollTop: st
					}, 1000)
			  	});
		});


		$("html").on('click', '.more', function(event) {
			event.preventDefault();

			var st = $(this).parent().offset().top;
			$("body").addClass("loading");

			var page = $("#page").val();
				page++;
			$("#page").val(page);
			
			$.ajax({
				type: "GET",
				//cache: false,
				//url: 'https://gdata.youtube.com/feeds/api/playlists/'+keyword+'?start-index=1&max-results=50&v=2&alt=json',
				url: '/page/'+page,
				//dataType: "jsonp",
			})
				.done(function( html ) {
					console.log(html);
					$(".liste_content").append(html);

					$("body").removeClass("loading");
					$("html,body").animate({
						scrollTop: st
					}, 1000)
				});
		});

	};

	
}