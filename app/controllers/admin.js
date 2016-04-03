var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Video = mongoose.model('Video'),
	_app,
	postsPerPage = 40;

module.exports = function (app) {
	_app = app;
	app.use('/admin', router);
};

router.get('/', function (req, res, next) {

	return Video
			.find()
			.sort({year: 'desc'})
			.limit(postsPerPage)
			.exec(function(err, videos) {
	    if (err) {
	        console.log(err);
	        return next(err);
	    }
	    //console.log(app.get('title'));
	    return res.render('home', {
	        title: _app.get('title'),
	        description: _app.get('description'),
	        url: req.getUrl(),
	        bodyclass: 'home',
	        videos: videos
	    });
	});
	
});


