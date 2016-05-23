'use strict';
var jwt = require('jsonwebtoken');
var User = require('../model/user.js');
var Config = require('../../config/config.js');
var Project = require('../model/project.js');
var Util = require('./util.js');
var Task = require('../model/task.js');

module.exports.create = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		Project.findById(req.params.projectId, function(err, project){
			if(err || !project){
				res.send(404, {
					data: 'project not found.'
				});
				return next();
			}
			var task = new Task({
				type: req.body.type,
				text: req.body.text,
				date: req.body.date,
				fromHours: req.body.fromHours,
				toHours: req.body.toHours, 
				owner: user._id,
				project: project._id
			});
			task.save(function(err, task) {
				if (err) {
					console.log(err);
					throw err;
				}
				console.log('task "' + task._id + '"  created.');
				Project.findByIdAndUpdate(project._id, {$push: {tasks: task._id}}, {new: true}, function(err){
					if(err){
						console.log(err);
						throw err;
					}
					res.send(200, {
						task: task
					});
					return next();
				});
			});
		});
	});
}

module.exports.search = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		var projectId = req.params.projectId;
		Task.find({
			'project': projectId, 
			'text': { "$regex": req.params.searchString}}, function (err, tasks) {
			if(err){
				console.log(err);
				throw err;
			}
			res.send(200, {
				tasks: tasks
			});
			return next();
		});
	});
}