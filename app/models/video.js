// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VideoSchema = new Schema({
	date_created: {
        index: true,
        type: Date, default: Date.now
    },
  	title: {
        unique: true,
        index: true,
        type: String
    },
  	url: String,
  	year: Date,
  	rating: Number,
  	ost: [{type: Schema.Types.ObjectId, ref: 'Track'}]
});

VideoSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Video', VideoSchema);

