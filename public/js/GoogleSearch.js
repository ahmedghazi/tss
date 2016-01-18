var GoogleSearch = function(){
	$this = this;
	
	this.init = function(){
		//this.search("image","rihanna")
		
	};
	
	this.SearchCompleted = function(response){
		
	}
	
	
	this.search = function(keyword, callback){	
	
		$.ajax({
			type: "GET",
			//cache: false,
			//url: 'https://gdata.youtube.com/feeds/api/playlists/'+keyword+'?start-index=1&max-results=50&v=2&alt=json',
			url: '/api/s/'+keyword,
			//dataType: "jsonp",
		})
			.done(function( data ) {
				return callback(data);
			});

		
		

	}
	
	
}