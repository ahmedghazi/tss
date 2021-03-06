var ww,wh,fu,vu,au,prev_st,
	_GoogleSearch,
	_YoutubePlayer,
	_TubeTapePlayer,
	arrTubeTapePlayer = [],
	currentItemPlaying = null;

jQuery(document).ready(function ($) {
	format();
});

$(window).resize(function(){ 
	format();
});

$(window).load(function(){ 
	$("#wrapper").removeClass("hidden");
	init();
});



function init(){
	bindEvents();
	initObjects();
}

function initObjects(){
	_GoogleSearch = new GoogleSearch();
	_GoogleSearch.init();

	_YoutubePlayer = new YoutubePlayer();
	_YoutubePlayer.init();


	au = new AjaxUtils();
	au.init();

	vu = new ViewUtils();
	vu.init();

	console.log("initObjects")
}

function bindEvents(){
	$("html").on("PLAYER_API_READY",function(e,d){
		//console.log(e.type)
		_YoutubePlayer.initPlayer("ph")
	});

	$("html").on("PLAYER_READY",function(e,d){
		//console.log(e);
	});

	$("html").on("PLAYLIST_RESULT",function(e,d){

	});

	$("html").on("PREV",function(e,d){
		var idx = d-1;
		console.log(idx);
		if(idx > 1){
			idx--;
			$("article.open").find(".ttp").eq(idx).click();
		}
	});

	$("html").on("NEXT",function(e,d){
		var idx = d-1;
		var len = $("article.open").find(".ttp").length;
		console.log(idx,len);
		if(idx < len-1){
			idx++;
			$("article.open").find(".ttp").eq(idx).click();
		}else{
			$next = $("article.open").next("article");
			console.log($next)
			$next.find("a.ajax_g").click();
		}
	});

	$("body.video").find(".ttp").on("click", function(e){

		$(".ttp")
			.removeClass('currentItemPlaying')
			.removeClass('pause');
			
		var id = $(this).attr('id');
		var videoid = $(this).data('videoid');
		var artist = $(this).find('.track_artist').text();
		var track = $(this).find('.track_title').text();

		$("body").addClass("loading");
		currentItemPlaying = "#"+id;
		_YoutubePlayer.currentItem(currentItemPlaying);
		_YoutubePlayer.loadVideoById(videoid);
		_YoutubePlayer.updateTitle(artist+" - "+track);

		document.title = "▶ "+track+" - MixTubeSkate"
		
	});

	$(".player_ost .play").on("click", function(){
		$article = $(this).closest("article");
		console.log($article)
		if($article.find(".currentItemPlaying").length == 0){
			console.log($article.find(".ttp").eq(0))
			$article.find(".ttp").eq(0).click();
		}else{
			_YoutubePlayer.play();
		}
		$(this).hide();
		$(this).siblings('.pause').show();
	});

	$(".player_ost .pause").on("click", function(){
		_YoutubePlayer.pause();

		$(this).hide();
		$(this).siblings('.play').show();
	});
}

function format(){
	ww = $(window).width();
	wh = $(window).height();

	
}