var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	http = require('http'),
	cheerio = require('cheerio'),
    sniffer = require('sniffer'),
    forEach = require('async-foreach').forEach,
	Video = mongoose.model('Video'),
	Track = mongoose.model('Track'),
    _app;

module.exports = function (app) {
    _app = app;
	app.use('/video', router);


};

router.get('/:id', function (req, res, next) {
    return Video
        .findById(req.params.id)
        .populate({path: 'ost', options: { sort: {'_id': 'desc'} }})
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            
            if(video.ost.length == 0){
                //res.redirect("/api/u/"+req.params.id);
                sniffer(video.url, function (data) {
                    //console.log("cb");
                    //console.log(data.success);
                    if(data.success == true){
                        var videoIframe = data.videoIframe;
                        var len = data.ost.length;
                        var ost = [];
                        var count = 0;
                        forEach(data.ost, function(item, index, arr) {
                        //for(var i in data.ost){
//console.log(item)
                            var track = new Track({
                                rider: item[0],
                                artist: item[1],
                                track: item[2],
                                videoId: item[3]
                            });

                            //console.log(track)

                            track.save(function (err) {
                                if (!err) {
                                    console.log(count,len)
                                    ost.push(track._id);
                                    if(count == len-1){
                                        //console.log(ost)
                                        
                                        video.ost = ost;
                                        if(videoIframe != undefined)video.videoIframe = videoIframe;
                                        //console.log("videoIframe ",videoIframe);
                                        video.save(function (_err) {
                                            if (!_err) {
                                             
                                                return Video
                                                    .findById(req.params.id)
                                                    .populate('ost')
                                                    .exec(function(err, video) {
                                                        if (err) {
                                                            return next(err);
                                                        }
                                                        console.log(video)
                                                        return res.render('video', {
                                                            title: _app.get('title'),
                                                            description: _app.get('description'),
                                                            url: req.getUrl(),
                                                            bodyclass: 'video',
                                                            video: video,
                                                        });
                                                });
                                            }else{
                                                return console.log(_err);
                                            }
                                        });
                                    }
                                    count++;
                                }
                            });
                        });
                    }else{

                        return res.render('video', {
                            title: _app.get('title'),
                            description: _app.get('description'),
                            url: req.getUrl(),
                            bodyclass: 'video',
                            video: video,
                        }); 
                    }
                });

            }else{
                //console.log(video)
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


router.get('/ost/:id', function (req, res, next) {
    return Video
        .findById(req.params.id)
//        .populate('ost')
        .populate({path: 'ost', options: { sort: {'_id': 'desc'} }})
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            //console.log(video.ost.length)
            if(video.ost.length == 0){
                res.send(false);
            }else{
                return res.render('track', {
                    title: _app.get('title'),
                    description: _app.get('description'),
                    url: req.getUrl(),
                    bodyclass: 'video',
                    video: video,
                }); 
            }  
    });
});

router.get('/sniff-ost/:id', function (req, res, next) {
    return Video
        .findById(req.params.id)
//        .populate('ost')
        .populate({path: 'ost', options: { sort: {'_id': 'desc'} }})
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            
            sniffer(video.url, function (data) {
                console.log("cb");
                //console.log(data);
                if(data.success == true){
                    var len = data.ost.length;
                    var ost = [];
                    var count = 0;
                    forEach(data.ost, function(item, index, arr) {

                        var track = new Track({
                            rider: item._rider,
                            artist: item._artist,
                            track: item._track,
                            videoId: item._videoId
                        });

                        //console.log(item)

                        track.save(function (err) {
                            if (!err) {
                                console.log(count,len)
                                ost.push(track._id);
                                if(count == len-1){
                                    console.log(ost)
                                    
                                    video.ost = ost;
                                    video.save(function (_err) {
                                        if (!_err) {
                                         
                                            return res.render('track', {
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
                                }
                                count++;
                            }
                        });
                    });
                }else{
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
});

router.get('/view-count/:id', function (req, res, next) {
    return Video
        .findById(req.params.id)
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
            video.view = video.view+1;

            video.save(function(err) {
                if (err)
                    return next(err);
                else
                    res.send(video.view)
            });
            
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