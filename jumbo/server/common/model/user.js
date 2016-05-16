var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	username: String,
	password: String,
	roles: [String],
	tokens: [String]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;