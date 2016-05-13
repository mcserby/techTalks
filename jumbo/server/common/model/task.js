var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
	type: String,
	text: String,
	date: Date,
	fromHours: Number,
	toHours: Number, 
	owner: {type: ObjectId, ref: 'User'},
	project: {type: ObjectId, ref: 'Project'}
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Project;