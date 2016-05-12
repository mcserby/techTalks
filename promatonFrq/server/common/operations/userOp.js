'use strict';

var jwt = require('jsonwebtoken');
var User = require('../model/user.js');
var Config = require('../../config/config.js');
var Util = require('./util.js');

module.exports.authenticate = function(req, res, next){
	var filter = {
		username: req.body.username,
		password: req.body.password
	};
	User.findOne(filter, function(err, user) {
		if(err) {
			console.log(err);
			throw err;
		}
		// ok
		if(!user){
			res.send(401, {
				data: 'Wrong credentials.'
			});
			return next();
		}
		return renewTokenAndReturn(user, res, next);
	});
};

module.exports.signIn = function(req, res, next){
	validateUsername(req, res, next, function(){
    	var user = new User({
    		username: req.body.username,
			password: req.body.password
    	});
    	user.save(function(err, user) {
			if (err) {
				console.log(err);
				throw err;
			}
			console.log('user "' + user.username + '"  created.');
			return renewTokenAndReturn(user, res, next);
		});
	});
}

module.exports.me = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		//extra check
		var filter = {
			username: req.body.username,
			_id: user._id
		};
		User.findOne(filter, function(err, user) {
			res.send(200, {
				user: user,
				token: token
			});
			return next();
		});
	});
}

module.exports.logout = function(req, res, next){
	Util.authorize(req, res, next, function(user, token){
		user.tokens.splice(user.tokens.indexOf(token), 1);
		User.findByIdAndUpdate(user._id,
		{$set: {tokens: user.tokens}}, {overwrite: true}).exec(function(err){
			if (err) {
				res.send(500, {
					data: 'can\'t logout user'
				});
				return next();
			} else {
				console.log('user ' + user.username + ' logout successfully.');
				res.send(200, {
					data: 'User logged out successfully'
				});
				return next();
			}
		});
	});
}

function renewTokenAndReturn(user, res, next){
	var token = jwt.sign({
			username: user.username, 
			password: user.password
		}, Config.JWT_SECRET, {
		expiresIn: 1440 * 60 * 7 // expires in 24 hours
	});
	user.tokens.push(token);
	// only 2 sessions in parallel permitted
	var tokens = user.tokens.slice(-2);
	User.findByIdAndUpdate(user._id, {$set: {tokens: tokens}}, function(err, user){
		if(err) {
			console.log(err);
			throw err;
		}
		res.send(200, {
			user: user,
			token: token
		});
		return next();
	});
}

function validateUsername(req, res, next, callback){
	User.findOne({username: req.body.username}, function(err, user) {
		if (err) throw err;
		if (user) {
			res.send(422, {
				error: "Username already exists."
			});
			return next();
		}
		callback();
	});
}