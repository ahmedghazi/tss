var express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),
    request = require('request'),
	cheerio = require('cheerio'),
    Youtube = require('youtube-node'),
    forEach = require('async-foreach').forEach,
    Video = mongoose.model('Video'),
    Track = mongoose.model('Track');

    


exports.test = function(next) {
    return next("helpers");
};


exports.processInsertVideo = function(videoUrl, callback) {
    let soundtrackUrl = videoUrl.replace("/videos/", "/soundtracks/")
    
    urlGet(soundtrackUrl, false, function(_response){
        console.log("url: ",soundtrackUrl)
        $ = cheerio.load(_response.body);

        let videoName = $("h1").text().split(" (")[0]
        //let videoYear = $(".big-list").children("li").eq(2).text().replace("Year: ", "")
        let year = 0
        if($(".big-list").children("li").eq(1).text().indexOf("Year: ") > -1){
            year = $(".big-list").children("li").eq(1).text().replace("Year: ", "")
        }else if($(".big-list").children("li").eq(2).text().indexOf("Year: ") > -1){
            year = $(".big-list").children("li").eq(2).text().replace("Year: ", "")
        }else if($(".big-list").children("li").eq(3).text().indexOf("Year: ") > -1){
            year = $(".big-list").children("li").eq(3).text().replace("Year: ", "")
        }

        var videoYear = new Date();
        videoYear.setFullYear(year);
        //console.log(videoName, videoYear)
        //console.log("=====================================")
        let ostRaw = []
        $(".song-list").each(function(idx, part) {
            let rider = $(part).children("p.clip-title").children("strong").text()
            
            //console.log($(part).find("p.song-info").length)
            if($(part).find("p.song-info").length == 0){
                let o = {
                    rider: rider,
                    artist: "",
                    track: ""
                }
                ostRaw.push(o)
            }else if($(part).find("p.song-info").length == 1){
                let songInfos = $(part).find("p.song-info").text().split(" - ")
                let artist = songInfos[0];
                let track = songInfos[1];
                let o = {
                    rider: rider,
                    artist: artist,
                    track: track
                }
                ostRaw.push(o)
            }else{
                $(part).find("p.song-info").each(function(idx, partPart){
                    let songInfos = $(partPart).text().split(" - ")
                    let artist = songInfos[0];
                    let track = songInfos[1];
                    let o = {
                        rider: rider,
                        artist: artist,
                        track: track
                    }
                    ostRaw.push(o)
                })
            }
        });
//console.log(ostRaw)
        var video = new Video({
            title: videoName,
            url: videoUrl,
            year: videoYear
        });

        video.save(function (err) {
            let counter = 0
            let ost = []
            
            async.each(ostRaw,
                function(song, _callback){
                    //console.log(counter)
                    var track = new Track({
                        order: counter,
                        rider: song.rider,
                        artist: song.artist,
                        track: song.track
                    });
                    counter++
            
                    track.save(function (err) {
                        if (!err) {
                            ost.push(track._id)
                        }
                        _callback()
                    })
                },
                function (__response) {
                    //console.log(ost)  
                    //console.log("=====================================")

                    video.ost = ost
                    video.save(function (err) {
                        callback(video)
                    });
                    
                }
            )
        })  
    })
};

exports.processDateVideo = function(video, callback) {
    let soundtrackUrl = video.url.replace("/videos/", "/soundtracks/")
    console.log("soundtrackUrl",soundtrackUrl)        
    
    urlGet(soundtrackUrl, false, function(_response){
        $ = cheerio.load(_response.body);
        let year = 0
        if($(".big-list").children("li").eq(1).text().indexOf("Year: ") > -1){
            year = $(".big-list").children("li").eq(1).text().replace("Year: ", "")
        }else if($(".big-list").children("li").eq(2).text().indexOf("Year: ") > -1){
            year = $(".big-list").children("li").eq(2).text().replace("Year: ", "")
        }else if($(".big-list").children("li").eq(3).text().indexOf("Year: ") > -1){
            year = $(".big-list").children("li").eq(3).text().replace("Year: ", "")
        }

        var videoYear = new Date();
        videoYear.setFullYear(year);
//console.log("videoYear", videoYear)
        var query = {_id: video._id}
        var update = {year: videoYear}
        Video.findOneAndUpdate(query, update, {
            upsert: true, new: false
        }, function(err, _video, raw) {
            console.log("videoYear",videoYear)
            callback(_video)
        })
    })
}

function urlGet(url, json, cb){
	var j = request.jar()
	var options = { 
	    method: 'GET',
	    url: url,
	    json: json,
	    jar: j,
	    timeout: 10000,
	    followRedirect: true,
	    maxRedirects: 10000,
	    headers: 
	    { 
	        'cache-control': 'no-cache'
	    }
	};
	
	request(options, function (error, response, body) {
	    if (error) throw new Error(error);

	    //console.log(response.statusCode);
	    //var content = JSON.parse(body)
	    //console.log(content)
	    //console.log(content.detail.posts.length)
	    return cb({success:true, body:body});
	    
	}).setMaxListeners(0);
}


