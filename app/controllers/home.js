var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Video = mongoose.model('Video'),
	Track = mongoose.model('Track'),
	_app,
	postsPerPage = 60;

module.exports = function (app) {
	_app = app;
	app.use('/', router);
};

router.get('/', function (req, res, next) {

	return Video
			.find()
			.sort({title: 'asc'})
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
	        canonical: _app.get('canonical'),
	        bodyclass: 'home',
	        videos: videos
	    });
	});
	
});

router.get('/page/:id', function (req, res, next) {
	var skip = parseInt(req.params.id * postsPerPage);
	return Video
			.find()
			.sort({title: 'asc'})
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
	    console.log(req.params.id);
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
	console.log(req.params.page,postsPerPage,skip)
	return Video
			.find()
			.sort({view: req.params.id})
			.limit(postsPerPage)
			.skip(skip)
			.exec(function(err, videos) {
	    if (err) {
	        console.log(err);
	        return next(err);
	    }
	    //return res.json({videos})
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

router.get('/archive/:term', function (req, res, next) {
    return Track.find(
        { $or: [
            { artist: { $regex: req.params.term, $options: 'i' } },
            { track: { $regex: req.params.term, $options: 'i' } },
        ] } 
        )
        //.find( { artist : { $regex: req.params.term, $options: 'i' }} )
        .populate('parents')
        .exec(function(_err, tracks) {
            if (_err) {
                return next(_err);
            }
            console.log(tracks)
            //return res.send(tracks);
            
            //return res.send(tracks);
            return res.render('liste-archive', {
    	        title: _app.get('title'),
    	        description: _app.get('description'),
    	        url: req.getUrl(),
    	        bodyclass: 'archive',
    	        term: req.params.term,
    	        results: tracks
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
