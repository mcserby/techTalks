'use strict';
var jwt = require('jsonwebtoken');
var User = require('../model/user.js');
var Config = require('../../config/config.js');
var Project = require('../model/project.js');
var Util = require('./util.js');

module.exports.create = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		var project = new Project({
			title: req.body.title,
			managedBy: user._id,
			members: req.body.members.map(function(m){return m._id;}),
			tasks: []
		});
		project.save(function(err, project) {
			if (err) {
				console.log(err);
				throw err;
			}
			console.log('project "' + project.title + '"  created.');
			res.send(200, {
				data: project
			});
			return next();
		});
	});
}

module.exports.managedProjects = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		Project.find({'managedBy': user._id}).populate('members').exec(function (err, projects) {
			if(err){
				console.log(err);
				throw err;
			}
			console.log(projects);
			res.send(200, {
				projects: projects
			});
			return next();
		});
	});
}

module.exports.myProjects = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		Project.find({'members': user._id}).exec(function (err, projects) {
			if(err){
				console.log(err);
				throw err;
			}
			res.send(200, {
				projects: projects
			});
			return next();
		});
	});
}