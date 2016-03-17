var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Video = mongoose.model('Video'),
	_app,
	postsPerPage = 40;

module.exports = function (app) {
	_app = app;
	app.use('/', router);
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

router.get('/page/:id', function (req, res, next) {
	var skip = parseInt(req.params.id * postsPerPage);
	return Video
			.find()
			.sort({year: 'desc'})
			.limit(postsPerPage)
			.skip(skip)
			.exec(function(err, videos) {
	    if (err) {
	        console.log(err);
	        return next(err);
	    }
	    //console.log(app.get('title'));
	    return res.render('liste', {
	        title: _app.get('title'),
	        description: _app.get('description'),
	        url: req.getUrl(),
	        bodyclass: 'home',
	        videos: videos
	    });
	});
	
});

router.get('/sort/year/:id', function (req, res, next) {
	return Video
			.find()
			.sort({year: req.params.id})
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
router.get('/sort/year/:id/:page', function (req, res, next) {
	var skip = parseInt(req.params.page * postsPerPage);
	return Video
			.find()
			.sort({year: req.params.id})
			.limit(postsPerPage)
			.skip(skip)
			.exec(function(err, videos) {
	    if (err) {
	        console.log(err);
	        return next(err);
	    }
	    //console.log(app.get('title'));
	    return res.render('liste', {
	        title: _app.get('title'),
	        description: _app.get('description'),
	        url: req.getUrl(),
	        bodyclass: 'home',
	        videos: videos
	    });
	});
});

router.get('/sort/rating/:id', function (req, res, next) {
	return Video
			.find()
			.sort({rating: req.params.id})
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

router.get('/sort/rating/:id/:page', function (req, res, next) {
	var skip = parseInt(req.params.page * postsPerPage);
	return Video
			.find()
			.sort({year: req.params.id})
			.limit(postsPerPage)
			.skip(skip)
			.exec(function(err, videos) {
	    if (err) {
	        console.log(err);
	        return next(err);
	    }
	    //console.log(app.get('title'));
	    return res.render('liste', {
	        title: _app.get('title'),
	        description: _app.get('description'),
	        url: req.getUrl(),
	        bodyclass: 'home',
	        videos: videos
	    });
	});
});


router.get('/sort/view/:id', function (req, res, next) {
	return Video
			.find()
			.sort({view: req.params.id})
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

router.get('/sort/view/:id/:page', function (req, res, next) {
	var skip = parseInt(req.params.page * postsPerPage);
	return Video
			.find()
			.sort({year: req.params.id})
			.limit(postsPerPage)
			.skip(skip)
			.exec(function(err, videos) {
	    if (err) {
	        console.log(err);
	        return next(err);
	    }
	    //console.log(app.get('title'));
	    return res.render('liste', {
	        title: _app.get('title'),
	        description: _app.get('description'),
	        url: req.getUrl(),
	        bodyclass: 'home',
	        videos: videos
	    });
	});
});



router.get('/legal', function (req, res, next) {
	return res.render('ml', {
	    title: _app.get('title'),
	    description: _app.get('description'),
	    url: req.getUrl(),
	    bodyclass: 'legal'
	});
});

router.get('/contact', function (req, res, next) {
	return res.render('contact', {
	    title: _app.get('title'),
	    description: _app.get('description'),
	    url: req.getUrl(),
	    bodyclass: 'contact'
	});
});


router.get('/submit', function (req, res, next) {
    console.log("hrer")
    return res.render('form-submit', {
        title: _app.get('title'),
        description: _app.get('description'),
        url: req.getUrl(),
        bodyclass: 'Submit',
    });
});
