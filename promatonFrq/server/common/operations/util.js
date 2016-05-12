'use strict';
// below functions must handle http errors!
var jwt = require('jsonwebtoken');
var User = require('../model/user.js');
var Config = require('../../config/config.js');

function verifyToken(token, res, next, callback){
	jwt.verify(token, Config.JWT_SECRET, function(err) {
		if (err) {
			res.send(401, {
                data: 'Token is invalid or expired. '
            });
            return next();
		}
		User.findOne({tokens: token}, function(err, user) {
	    	if (err) {
	    		res.send(401, {
					data: 'Token expired or is invalid. '
				});
				return next();
	    	}
	    	if(!user) {
				res.send(401, {
					data: 'Token expired or is invalid. '
				});
				return next();
			} else {
				callback(user, token);
			}
		});
	});
}

module.exports.verifyToken = verifyToken;

module.exports.authorize = function(req, res, next, callback){
	if(req.headers.authorization == undefined){
		res.send(401, {
            data: 'authorization required for this operation. '
        });
        return next();
	}
	// verify token validity
	var token = req.headers.authorization.slice('Bearer '.length);
	verifyToken(token, res, next, callback);
}

module.exports.checkAuthorization = function(req, res, next, callback){
	var isAuthorized = false;
	if(req.headers.authorization == undefined){
		callback(isAuthorized, null, null);
	} else {
		var token = req.headers.authorization.slice('Bearer '.length);
		verifyToken(token, res, next, function(user, token){
			isAuthorized = true;
			callback(isAuthorized, user, token);
		});
	}
}

