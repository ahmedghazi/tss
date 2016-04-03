var TubeTapePlayer = function(_context,_data){
	var _this = this,
		context = _context,
		data = _data,
		id,
		rgb,
		rgba1,
		rgba2,
		rgba3,
		videoId;
	
	this.init = function(){
		//console.log(_data)
		this.render();
		//this.play();
		this.bindEvents();
	};
	
	this.render = function(){
		//console.log(data)
		if(data.artist == "")return;
		//var w = data.media$group.yt$duration.seconds+"px";
		//var w = '100%';
		var r = (Math.floor(Math.random() * 256))
		var g = (Math.floor(Math.random() * 256))
		var b = (Math.floor(Math.random() * 256))

		rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
		rgba1 = 'rgba(' + r + ',' + g + ',' + b + ',0.4)';
		rgba2 = 'rgba(' + r + ',' + g + ',' + b + ',0.6)';
		rgba3 = 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
		//var color = '#'+Math.floor(Math.random()*16777215).toString(16);
		id = data._id;

		var q = data.track+" "+data.artist;
		_GoogleSearch.search(id, function(_video){
			console.log(_video)

			videoId = _video.videoId;
			//var duration = convert_time(_video.duration);
			
			var html = '<div data-videoid="'+videoId+'" class="row ttp" id="'+id+'">';
					html += '<div class="fiboA player_track">';
						html += '<div class="controls">';
							html += '<span class="play">';
								html += '<i class="fa fa-play"></i>';
							html += '</span>';
							html += '<span class="pause">';
								html += '<i class="fa fa-pause"></i>';
							html += '</span>';
						html += '</div>';
					html += '</div>';
					html += '<div class="fiboB">';
						html += '<div class="track_rider span3">'+_video.rider+'</div>';
						html += '<div class="track_artist span3">'+_video.artist+'</div>';				
						html += '<div class="track_title span3">'+_video.track+'</div>';
					html += '</div>';

					//html += '<div class="track_seek"></div>';
				html += '</div>';
		
			$(_context).find(".article_content").append(html);
			
		})
	};

	this.bindEvents = function(){
		$("html").on("click", "#"+id, function(){

			if("#"+id != currentItemPlaying){
				//currentItemPlaying = id;
				$(".ttp")
					.removeClass('currentItemPlaying')
					.removeClass('pause');
				_this.play();
			}
		})
	};

	this.play = function(){
		//console.log("play : "+_data.media$group.media$thumbnail[2].url)
		$("body").addClass("loading");
		currentItemPlaying = "#"+id;
		_YoutubePlayer.currentItem(currentItemPlaying);
		_YoutubePlayer.loadVideoById(videoId);
		_YoutubePlayer.updateTitle(data.artist+" - "+data.track);

		_this.generatetitle();

	
	};

	this.generatetitle = function(){
		document.title = "▶ "+data.track+" - MixTubeSkate"
	}

	
	
	
}
