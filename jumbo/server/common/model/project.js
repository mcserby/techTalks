var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
	title: String,
	managedBy: {type: ObjectId, ref: 'User'},
	members: [{type: ObjectId, ref: 'User'}],
	tasks: [{type: ObjectId, ref: 'Task'}]
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;