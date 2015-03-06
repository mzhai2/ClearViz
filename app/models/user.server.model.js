var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	credits: Number,
	plan: String,
	address: String,
	city: String,
	zip: String,
	country: String
});

mongoose.model('User', UserSchema);