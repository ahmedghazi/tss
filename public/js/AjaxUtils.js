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

			arrTubeTapePlayer = [];
			$(".article_content .ost").html("");
			$article = $(this).parents("article");
			$("article").removeClass('open');
			$article.addClass('open');

			var st = $(this).parent().position().top - $("header").height();

			var url = $(this).attr("href");
			var ws_url = $(this).attr("href").replace("/video/", "/api/g/");
			var id = $(this).parents("article").attr("id");
			var title = $(this).children("h2").text();
			history.pushState({ws_url}, title, url);
			document.title = document.title+' - '+title;
			
			$.ajax({
			  method: "GET",
			  url: ws_url
			})
				.done(function( data ) {

					for(var i in data.ost){
						var _TubeTapePlayer = new TubeTapePlayer($article, data.ost[i]);
						_TubeTapePlayer.init();

						arrTubeTapePlayer.push(_TubeTapePlayer);
					}

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
				url: '/page/'+page
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

		$(".morphsearch-submit").on('click', function(event) {
			event.preventDefault();
		
			$(".morphsearch").toggleClass('open');
			$("input.morphsearch-input").focus()
		});

		$(".morphsearch-close").on('click', function(event) {
			$(".morphsearch").removeClass('open');
			setTimeout(function(){
				$(".morphsearch-content").html("")
			},1000);
		});

		$( "input.morphsearch-input" ).keyup(function() {
			var val = $(this).val();
			if(val.length > 3){
				$.ajax({
				  method: "GET",
				  url: '/api/search/'+val
				})
					.done(function( data ) {
						$(".morphsearch-content").html(data)
				  	});
			}
			
		});

		$(".share").on("click", function(){

			var url = window.location.href;
			var title = document.title;

			$(".modal_header h3").text(title);

			var fb_url = getFbUrl(url,title);
			$("#fb").attr("href", fb_url);

			var tw_url = getTwUrl(url,title);
			$("#tw").attr("href", tw_url);

			var mail_url = getMailUrl(url,title);
			$("#mail").attr("href", mail_url);

			//$(".sh .sh_title").text("Share ")
			//$(".embed .sh_title").text("Embed");
			var embedurl = window.location.href.replace("video", "embed");
			$("textarea[name='embedcode']").val(embedurl);

			$("#modal").show();
		});

		$(".modal_close").on("click", function(){
			$("#modal").hide();
		});

		$(".sh a").on("click", function(e){
			e.preventDefault();

			var url = $(this).attr("href");
			popupwindow(url);
		});
		/*
		$("textarea[name='embedcode']").on("click", function () {
		   $(this).select();
		});
		*/
		$("textarea[name='embedcode']").focus(function() {
		    var $this = $(this);

		    $this.select();

		    window.setTimeout(function() {
		        $this.select();
		    }, 1);

		    // Work around WebKit's little problem
		    function mouseUpHandler() {
		        // Prevent further mouseup intervention
		        $this.off("mouseup", mouseUpHandler);
		        return false;
		    }

		    $this.mouseup(mouseUpHandler);
		});
	};
}















