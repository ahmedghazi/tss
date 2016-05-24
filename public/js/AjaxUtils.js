var AjaxUtils = function(){
	var _this = this;

	this.init = function(){
		_this.bindEvents();
	};

	this.bindEvents = function(){
		//console.log("bindEvents")
		
		$("html").on("click", "a.ajax_g", function(event) {
			event.preventDefault();
			$("body").addClass('loading');
			

			arrTubeTapePlayer = [];
			$(".article_content .ost").html("");
			$article = $(this).parents("article");
			$("article").removeClass('open');
console.log($("header").height())
			var header_h = 53;
			if(isTouchDevice)header_h = 35;
			l("header_h = "+header_h)
			var st = $(this).parents("article").position().top - header_h;

			$article.addClass('open');

			var url = $(this).attr("href");
			var id = $(this).parents("article").attr("id");
			var title = $(this).children("h2").text();
			
			var ws_url = $(this).attr("href").replace("/video/", "/video/ost/");
			console.log(ws_url)

			history.pushState({ws_url}, title, url);
			document.title = "▶ "+SITE_NAME+' - '+title;

			$.ajax({
			  method: "GET",
			  url: ws_url
			})
				.done(function( html ) {
					//console.log(html)
					if(html){
						$article.find(".article_content").html(html);

						$("body").removeClass('loading');

						$("html,body").animate({
							scrollTop: st
						}, 1000, function(){
							
							au.postData("/api/view-count/"+id, {url:url});
							track(url)
						});
						
					}else{
						var reponse = '<div class="row">';
							reponse += '<div class="fiboA">... No soundtrack yet</div>';
							reponse += '<div class="fiboB"><a href="'+url+'" rel="ajax">Load It?</a></div>';
							reponse += '</div>';
						$article.find(".article_content").append(reponse);
						$("body").removeClass("loading");
					}
					
			  	});
			
		});

		//test

		$("html").on('click', '.more', function(event) {
			event.preventDefault();
			var path = window.location.pathname
			if(path == '/')path = '/page';
			if(path.indexOf("video") != -1){
				//path = '/page';
				path = feedUrl[feedUrl.length - 1];
				history.pushState({feedUrl}, SITE_NAME, path);
				//path = window.location.pathname
				
			}

			var st = $(this).parent().offset().top;
			$("body").addClass("loading");

			var page = $("#page").val();
				page++;
			$("#page").val(page);

			var u = path+'/'+page;
			

			$.ajax({
				type: "GET",
				url: u
			})
				.done(function( html ) {
					//console.log(html);
					$(".liste_content").append(html);

					$("body").removeClass("loading");
					/*$("html,body").animate({
						scrollTop: st
					}, 1000)
*/					

					track(path+'/'+page)
				});
		});

		$("#s_btn").on('click', function(event) {
			$(".morphsearch-content").html("")
			$("#modal2").show();
		});
/*
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
*/
		$( "input.search-input" ).keyup(function() {
			var val = $(this).val();
			if(val.length > 3){
				$.ajax({
				  method: "GET",
				  url: '/api/search/'+val
				})
					.done(function( data ) {
						$(".search-content").html(data)
				  	});
			}else{
				$(".search-content").html("");
			}
			
		});

		$("html").on("click", ".share", function(){
			var url = window.location.href;
			var title = document.title;
			console.log(title)

			var id = $(this).parents("article").attr("id"); 
			$("#id_article").val(id);

			//$(".modal_header h3").text(title);

			var fb_url = getFbUrl(url,title);
			$("#fb").attr("href", fb_url);

			var tw_url = getTwUrl(url,title);
			$("#tw").attr("href", tw_url);

			var mail_url = getMailUrl(url,title);
			$("#mail").attr("href", mail_url);

			//$(".sh .sh_title").text("Share ")
			//$(".embed .sh_title").text("Embed");
			var embedurl = window.location.href.replace("video", "embed");
			$("textarea[name='embedcode']").val('Soon');

			$("#modal").show();
		});

		$(".modal_close").on("click", function(){
			$(".modal").hide();
			$("#iframe").find(".modal_content").html("");
		});

		$("html").on("click", ".sh a", function(e){
			e.preventDefault();

			var url = $(this).attr("href");
			var id = $("#id_article").val();

			$.ajax({
				  method: "GET",
				  url: '/video/share-count/'+id
				})
					.done(function( data ) {
						console.log(data);
				  	});

			popupwindow(url);
		});

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

	this.postData = function(u,d){
		//console.log(u,d)
		//console.log(arguments.callee.caller.toString())
		$.ajax({
			//method: "POST",
			url: u, 
			data: d,
			success: function(result){
	        	//console.log(result);
	    	}
		});
    };
}















