var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	http = require('http'),
	cheerio = require('cheerio'),
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



//reload inject api/id
//return