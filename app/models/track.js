// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TrackSchema = new Schema({
	date_created: {
        index: true,
        type: Date, default: Date.now
    },
  	rider: {
        index: true,
        type: String
    },
    artist: {
        index: true,
        type: String
    },
    track: {
        index: true,
        type: String
    },
    videoId: {
        //unique: true,
        index: true,
        type: String
    },
    duration: {
        index: true,
        type: String
    },
  	
});


mongoose.model('Track', TrackSchema);

