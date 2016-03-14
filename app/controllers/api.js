var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	http = require('http'),
	cheerio = require('cheerio'),
    Youtube = require('youtube-node'),
    forEach = require('async-foreach').forEach,
    Video = mongoose.model('Video'),
	User = mongoose.model('User'),
    //AIzaSyBMcFRVdw_jipl7LMlnP-87PpOet7uNN8c
    Track = mongoose.model('Track'),
    nodemailer = require("nodemailer"),
    _app;

module.exports = function (app) {
    _app = app;
	app.use('/api', router);

    youTube = new Youtube();
    youTube.setKey('AIzaSyBMcFRVdw_jipl7LMlnP-87PpOet7uNN8c');


};

router.get('/all', function (req, res, next) {
    return Video
            .find()
            .sort({year: 'desc'})
            //.limit(10)
            .exec(function(err, videos) {
        if (err) {
            console.log(err);
            return next(err);
        }
        //console.log(app.get('title'));
        return res.send(videos);
    });
    
});

    
router.get('/insert/:id', function (req, res, next) {
	
    console.log("api",req.params.id)
	var response_text = "";
	var options = {
	        host: 'www.skatevideosite.com'
	      , port: 80
	      , path: '/index.php?page=skatevideos&sort=year&p='+req.params.id
	      , method: 'GET'
	    };

    var request = http.get(options, function(ress){
        if(ress.statusCode != 200) {
           throw "Error: " + res.statusCode; 
        };
     
        ress.setEncoding("utf8");
        ress.on("data", function (chunk) {
            response_text += chunk;
        });
        ress.on("end", function() {
            $ = cheerio.load(response_text);
            var len = $("#skatevideos").find("tr").length
            $("#skatevideos").find("tr").each(function(idx, tr) {
                if(idx != 0){
                    var title,url,rating,year;

                    $(tr).find("td").each(function(_idx, td) {
                    	if (_idx == 0){
                    		var a = $(td).find("a");
                    		title = $(td).text();
                    		url = $(a).attr("href");
                    	}
                    	if (_idx == 1){
                            year = new Date();
                            year.setFullYear($(td).text());
                    	}
                    	if (_idx == 3){
                            if($(td).text() != undefined){
                                if($(td).text() == "-10 votes")
                                    rating = 2.5;
                                else 
                                    rating = parseInt($(td).text());
                            }else{
                                rating = 2.5;
                            }
                            //if($(td).text() == "-10 votes")rating = 2.5;
                    		//else rating = parseInt($(td).text());
                            if(isNaN(rating))rating = 2.5;
                            //console.log(rating)
                    	}
                    	
                    });
                    
                    var video = new Video({
                        title: title,
                        url: url,
                        rating: rating,
                        year: year
                    });

                    video.save(function (err) {
                        if (!err) {
                            if(idx == len-1){
                                var next = parseFloat(req.params.id) + 1;
                                console.log("next",next)
                                if(next < 18)  
                                    res.redirect('/api/insert/'+next);
                                else
                                    res.redirect("/");
                            }
                        } else {
                            console.log("else")
                            return console.log(err);
                        }
                    });
                }

            });
        })

    })
});

router.get('/u/:id', function (req, res, next) {
    //return res.redirect("/api/g/"+req.params.id);

    console.log("u")
    return Video
        .findById(req.params.id)
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
console.log(video)
            var ost = [];
            var response_text = "";
            var options = {
                    host: 'www.skatevideosite.com'
                  , port: 80
                  , path: video.url
                  , method: 'GET'
                };
console.log(options)
            var request = http.get(options, function(ress){
                //console.log(ress)
                if(ress.statusCode != 200) {
                   throw "Error: " + ress.statusCode; 
                };
             
                ress.setEncoding("utf8");
                ress.on("data", function (chunk) {
                    response_text += chunk;
                });
                ress.on("end", function() {
                    //console.log(response_text)
                    $ = cheerio.load(response_text);
                    var len = $("#soundtracklist").find("tr").length;
                    console.log(len)
                    if(len > 0){
                        $("#soundtracklist").find("tr").each(function(idx, tr) {
                            $(tr).find("td").each(function(_idx, td) {
                      
                                var nfo = $(td).text().split(" - ")
                                var _rider,_artist,_track;
                                if(nfo.length == 3){
                                    _rider = nfo[0];
                                    _artist = nfo[1];
                                    _track = nfo[2];
                                }else{
                                    _rider = "";
                                    _artist = nfo[0];
                                    _track = nfo[1];
                                }

                                var track = new Track({
                                    rider: _rider,
                                    artist: _artist,
                                    track: _track
                                });
    console.log(track)                      
                                track.save(function (err) {
                                    if (!err) {
                                        ost.push(track._id)
                                        
                                        if(idx == len-1){
                                            console.log(ost)
                                            
    //return res.send(video);
                                            video.ost = ost;
                                            video.save(function (_err) {
                                                if (!_err) {
                                                    //res.send(video)
                                                    res.redirect("/api/g/"+req.params.id);
                                                }else{
                                                    return console.log(_err);
                                                }
                                            });
                                        }
                                        
                                    } else {
                                        return console.log(err);
                                    }
                                }); 


                            });
                        });// LOOP
                        //res.send(video)
                    }else{
                        console.log("else")
                        //res.send(video);
                        return res.render('no-soundtrack', {
                            title: _app.get('title'),
                            description: _app.get('description'),
                            url: req.getUrl(),
                            video: video
                        });
                    }
                })// END
            })
    });
    
});


router.get('/g/:id', function (req, res, next) {

    return Video
        .findById(req.params.id)
        .populate('ost')
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            
            if(video.ost.length == 0){
                res.redirect("/api/u/"+req.params.id);
                //return res.send({success:false, video:video});
            }else{
                return res.send(video);
                /*return res.render('video', {
                    title: _app.get('title'),
                    description: _app.get('description'),
                    url: req.getUrl(),
                    bodyclass: 'video',
                    video: video,
                });*/
            }
    });
});


var youTube = new Youtube();
    youTube.setKey('AIzaSyBMcFRVdw_jipl7LMlnP-87PpOet7uNN8c');

router.get('/s/:id', function (req, res, next) {
    return Track
        .findById(req.params.id)
        .exec(function(err, track) {
            if (err) {
                return next(err);
            }
            console.log(track.videoId)
            if(!track.videoId){
                var q = track.artist+" "+track.track;
                youTube.search(q, 2, function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {


                        console.log("result.items.length : "+result.items.length)
                        if(result.items.length > 0){
                            console.log(result.items[0])
                            console.log(result.items[0].id.videoId)

                            var videoId = result.items[0].id.videoId;
                            track.videoId = videoId;
                            track.save(function (_err) {
                                if (!_err) {
                                    res.send(track);
                                }else{
                                    return console.log(_err);
                                }
                            });
                        }else{
                            res.send(track);
                        }
                    }
                });
                
            }else{
                return res.send(track);
            }
//            return res.send(track);
    });

    
});

router.get('/search/:term', function (req, res, next) {
    
    return Video
        .find( { title : { $regex: req.params.term, $options: 'i' }})
        .sort({year: 'desc'})
        .populate('ost')
        .exec(function(err, videos) {
            if (err) {
                return next(err);
            }

            //res.send(videos);
            return res.render('autocomplete-item', {
                videos: videos
            });
        });
    


});



router.get('/empty', function (req, res, next) {

    return Video
            .find( {ost: { $exists: true, $size: 0 } } )
            .exec(function(err, videos) {
        if (err) {
            console.log(err);
            return next(err);
        }
        //console.log(app.get('title'));
        return res.send(videos);
    });
    
});

router.get('/drop', function (req, res, next) {
    req.resetDb();
    res.redirect("/");
});

router.get('/maj1', function (req, res, next) {
    return Video
            .update( 
                {},
                {$set: { videoStatus: "published" } },
                { multi: true }
            )
            .exec(function(err, videos) {
        if (err) {
            console.log(err);
            return next(err);
        }
        //console.log(app.get('title'));
        return res.send({status:"OK"});
    });
});




router.post('/submit', function (req, res, next) {
    console.log(req.body)

    //var videoIframe = req.body.videoIframe;
    var len = req.body.ost.length;
    var ost = [];
    var count = 0;
    var _videoId = '';

    forEach(req.body.ost, function(item, index, arr) {
    //for(var i in data.ost){
//console.log(item)
        var q = item.artist+" "+item.track;
        youTube.search(q, 2, function(error, result) {
            if (error) {
                console.log(error);
                //callback({success:false, ost:ost});
            } else {
                if(result.items.length > 0){
                    _videoId = result.items[0].id.videoId;
                }else{
                    _videoId = null;
                }

                var track = new Track({
                    rider: item.part,
                    artist: item.artist,
                    track: item.track,
                    videoId: _videoId
                });

                //console.log(track)
                
                track.save(function (err) {
                    if (!err) {
                        //console.log(count,len)
                        ost.push(track._id);
                        if(count == len-1){
                            //console.log(ost)

                            var user = new User({
                                name: req.body.name,
                                email: req.body.email,
                            });

                            user.save(function (_err) {
                                if (_err) {
                                    return console.log(_err);
                                }else{
                                    
                                    var year = new Date();
                                    year.setFullYear(req.body.year);

                                    var video = new Video({
                                        title: req.body.title,
                                        year: year,
                                        ost: ost,
                                        rating: 0,
                                        videoIframe: req.body.videoIframe,
                                        _user: user._id
                                    });
                                    

                                    video.save(function (_err) {
                                        if (!_err) {

                                            var mailOptions = {
                                                to : "ahmed.ghazi@soixanteseize.com",
                                                subject : "TSBST submit",
                                                text : "/video/"+video._id
                                            }
                                            sendEmail(mailOptions, res);

                                            return res.redirect("/video/"+video._id);
                                        }else{
                                            return console.log(_err);
                                        }
                                    });

                                }
                            });
                        }
                        count++;
                    }
                });
            }
        });

        
    });

    //return res.json(req.body);
});



router.get('/email', function (req, res, next) {
    var mailOptions = {
        to : "ahmed.ghazi@soixanteseize.com",
        subject : "TSBST submit",
        text : "Un test"
    }
    sendEmail(mailOptions, res);
    
});


function sendEmail(mailOptions, res){
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "atmet.ghazi",
            pass: "vviirrggiill"
        }
    });

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
}

















