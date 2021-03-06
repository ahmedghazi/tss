var YoutubePlayer = function(){
	var _this = this,
		context,
		player,
		enterFrame,
		el,
		IDX,
		duration;
	
	this.init = function(){
		//el = $("#player");

		this.initScript();
		this.bindEvents();

		Piecon.setOptions({
			color: '#0000ff', // Pie chart color
			background: '#fff', // Empty pie chart color
			shadow: 'transparent', // Outer ring color
			fallback: false // Toggles displaying percentage in the title bar (possible values - true, false, 'force')
		});
	};
	
	this.initScript = function(){
		var tag = document.createElement('script');
      	tag.src = "//www.youtube.com/iframe_api";
      	var firstScriptTag = document.getElementsByTagName('script')[0];
    	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	};
	
	this.bindEvents = function(){
		$(document).keyup(function(evt) {
		    //console.log(evt.keyCode)
		    if (evt.keyCode == 32) {
		    	//space = false;
		    	//console.log(player.getPlayerState())
		    	if(player.getPlayerState() == 1){
		    		_this.pause();
		    	}else{
		    		_this.play();
		    	}
		    }
		    if (evt.keyCode == 39) {
		    	$("html").trigger("NEXT",[IDX]);
		    }
		    if (evt.keyCode == 37) {
		    	$("html").trigger("PREV",[IDX]);
		    }
		})

		$("#player").find(".play").on("click", function(){
			_this.play();
		});

		$("#player").find(".pause").on("click", function(){
			_this.pause();
		});

		$("#player").find(".backward").on("click", function(){
			$("html").trigger("PREV",[IDX]);
		});

		$("#player").find(".forward").on("click", function(){
			$("html").trigger("NEXT",[IDX]);
		});
		
	};
	
	this.initPlayer = function(holder){
		context = holder;

		player = new YT.Player(holder, {
          	height: $("#"+holder).height(),
          	width: $("#"+holder).width(),
          	videoId: '',
          	events: {
            	'onReady': _this.onPlayerReady,
            	'onStateChange': _this.onPlayerStateChange
          	},
			playerVars: {
            	controls	:'0',
				rel			:'0',
				showinfo	:'0',
				modestbranding:'0',
				iv_load_policy:'3',
				cc_load_policy:'0'
          	}
        });
		
	};
	
	this.onPlayerReady = function(event){
		$("html").trigger("PLAYER_READY",[]);
	};
	
	this.onPlayerStateChange = function(event){
		console.log(event.data)
		switch(event.data){
			case 0:
				clearInterval(enterFrame);
				Piecon.reset()
				$("html").trigger("NEXT",[IDX]);
			break;
			case 1:
				duration = player.getDuration();
				enterFrame = setInterval(_this.update,250);			
				
				$("body").removeClass("loading");

				$(el).addClass("currentItemPlaying").removeClass("state_pause");
				$("#player").removeClass('state_pause');
			break;
			case 2:
				clearInterval(enterFrame);
				$(el).removeClass("currentItemPlaying").addClass("state_pause");
				$("#player").addClass('state_pause');
			break;
		}
	};
	
	this.update = function(){
		
		var seconds = secondsToHms( player.getCurrentTime() );
		$(".time").text(seconds+"/"+secondsToHms(duration));

		var prog = player.getVideoLoadedFraction();
		var percent = (player.getCurrentTime() / duration);
		var pw = $("#player").width();
		
		//buffer
		var progress = pw * prog;
		$("#player").find(".buffer").css("width",progress)

		//scrubber
		var w = pw * percent;
		$("#player").find(".scrubber").css("width",w)

		Piecon.setProgress(percent*100);
	}
	
	this.loadVideoByUrl = function(url){
		console.log(url)
		player.loadVideoByUrl(url);
	};

	this.loadVideoById = function(_id){
		$("#player").removeClass('offside_bottom')
		player.loadVideoById(_id);
	};
	
	this.play = function(){
		player.playVideo();
		$("#player").removeClass('state_pause');
	};
	
	this.stop = function(){
		player.stopVideo();
		$("#player").addClass('state_pause');
	};
	
	this.pause = function(){
		player.pauseVideo();
		$("#player").addClass('state_pause');
	};
	
	this.setVolume = function(val){
		player.setVolume(val);
	};
	
	this.currentItem = function(_el){
		el = _el;
		IDX = $(el).index();
		//Piecon.setOptions({color: rgb2hex($(el).css("background-color"))});

		$("body").on("click", '.track_seek', function(e){
			//console.log(e.pageX)
			var xpos = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX;
			var percent = xpos / $(this).width() * 100;
			var duration = player.getDuration();
			var pos = duration * percent / 100;
			player.seekTo(pos,true);
		});
	};

	this.updateTitle = function(_title){
		$("#player").find(".track").text(_title);
	}
}

//IMPORTANT MUST BE OUTSIDE THIS OBJECT SCOPE
function onYouTubeIframeAPIReady() {
	$("html").trigger("PLAYER_API_READY",[]);
}
