var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	http = require('http'),
	cheerio = require('cheerio'),
    sniffer = require('sniffer'),
    _app,
	Video = mongoose.model('Video'),
	Track = mongoose.model('Track');

module.exports = function (app) {
    _app = app;
	app.use('/video', router);
};

router.get('/:id', function (req, res, next) {
	return Video
        .findById(req.params.id)
        .populate('ost')
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            console.log(video.ost.length)
            if(video.ost.length == 0){
                res.redirect("/api/u/"+req.params.id);
            }else{
                //console.log(video)
                //return res.send(video)
            	return res.render('video', {
            	    title: _app.get('title'),
                    description: _app.get('description'),
                    url: req.getUrl(),
                    bodyclass: 'video',
            	    video: video,
            	}); 
            }
	         
            
    });
});

router.get('/share-count/:id', function (req, res, next) {
    return Video
        .findById(req.params.id)
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            video.rating = video.rating+1;

            video.save(function(err) {
                if (err)
                    return next(err);
                else
                    res.send(video.rating)
            });
            
    });
});



//reload inject api/id
//return


router.get('/2/:id', function (req, res, next) {
    return Video
        .findById(req.params.id)
        .populate('ost')
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            
            if(video.ost.length == 0){
                //res.redirect("/api/u/"+req.params.id);
                sniffer(video.url, function (data) {
                    console.log("cb");
                    console.log(data);
                    if(data.success == true){
                        var len = data.ost.length;
                        var ost = [];
                        var count = 0;
                        for(var i in data.ost){

                            var track = new Track({
                                rider: data.ost[i]._rider,
                                artist: data.ost[i]._artist,
                                track: data.ost[i]._track
                            });

                            track.save(function (err) {
                                if (!err) {
                                    console.log(count,len)
                                    ost.push(track._id);
                                    if(count == len-1){
                                        console.log(ost)
                                        
                                        video.ost = ost;
                                        video.save(function (_err) {
                                            if (!_err) {
                                                //res.send(video)
                                                return res.render('video', {
                                                    title: _app.get('title'),
                                                    description: _app.get('description'),
                                                    url: req.getUrl(),
                                                    bodyclass: 'video',
                                                    video: video,
                                                }); 
                                            }else{
                                                return console.log(_err);
                                            }
                                        });
                                        //res.send(video)
                                    }
                                    count++;
                                }
                            });
                        }
                    }
                });

            }else{
                //console.log(video)
                //return res.send(video)
                return res.render('video', {
                    title: _app.get('title'),
                    description: _app.get('description'),
                    url: req.getUrl(),
                    bodyclass: 'video',
                    video: video,
                }); 
            }
             
            
    });
});