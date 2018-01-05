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
    //console.log(">>>>>>>>>>>here")
    var metas = '';
    return Video
        .findById(req.params.id)
        //.populate({path: 'ost', options: { sort: {'_id': 'desc'} }})
        .populate({
            path: 'ost',
            options: { sort: {'order': 'asc'} }
        })
            //options: { sort: {'createdAt': 'desc'} }})
        //.populate({path: 'ost', options: { sort: {'created_at': 1} }})
        //.populate({path: 'ost'})
        .exec(function(err, video) {
            if (err) {
                return next(err);
            }
//console.log(video.ost)
            try{


            //console.log(video);
  
            if(video.ost.length == 0){
                //res.redirect("/api/u/"+req.params.id);
                sniffer(video.url, function (data) {
                    //console.log("cb");
                    //console.log(data.ost);
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
                                videoId: item[3],
                                order: item[4]
                            });
                            if(item[0])metas += item[0]+", ";
                            //console.log(track)

                            track.save(function (err) {
                                if (!err) {
                                    //console.log(count,len)
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
//                                                    .populate('ost')
                                                    .populate({path: 'ost', options: { sort: {'order': 'asc'} }})
                                                    .exec(function(err, video) {
                                                        if (err) {
                                                            return next(err);
                                                        }
                                                        //console.log(video)
                                                        return res.render('video', {
                                                            title: _app.get('title'),
                                                            description: _app.get('description')+", "+metas,
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
                            canonical: _app.get('canonical'),
                            title: _app.get('title'),
                            description: _app.get('description'),
                            url: req.getUrl(),
                            bodyclass: 'video',
                            video: video,
                        }); 
                    }
                });

        
            }else{
                //console.log(video.ost)
                forEach(video.ost, function(item, index, arr) {
                    //console.log(item.rider)
                    if(item.rider)metas += item.rider+", ";
                });
                //video.ost.reverse();
                //console.log(metas)
                return res.render('video', {
                    canonical: _app.get('canonical'),
                    title: _app.get('title'),
                    description: _app.get('description')+", "+metas,
                    url: req.getUrl(),
                    bodyclass: 'video',
                    video: video,
                }); 
            }
            
            } catch(e) {

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
                return res.render('ost', {
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
    var metas = '';
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
                        if(item._rider)metas += item._rider+", ";
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
                                         
                                            return res.render('ost', {
                                                title: _app.get('title'),
                                                description: _app.get('description')+", "+metas,
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





