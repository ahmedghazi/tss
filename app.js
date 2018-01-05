

var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});



var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var app = express();
app.set('title', 'THE SKATEBOARD SOUNDTRACKS');
app.set('description', 'A PLACE FOR MUSIC ON WHEELS');
app.set('root', config.root);
app.set('canonical', "http://theskateboardsoundtracks.com");


app.use(function(req, res, next) {
	req.getUrl = function() {
    console.log(req.protocol, req.get('host'))
	  return req.protocol + "://" + req.get('host') + req.originalUrl;
	}
	return next();
});

app.use(function(req, res, next){
  req.resetDb = function(){
    mongoose.connection.db.dropDatabase();
  }
  return next();
})

require('./config/express')(app, config);



app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

