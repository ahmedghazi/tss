// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
	date_created: {
        index: true,
        type: Date, default: Date.now
    },
	name: {
        index: true,
        type: String
    },
    email: {
        unique: true,
        index: true,
        type: String
    }
});


mongoose.model('User', UserSchema);

