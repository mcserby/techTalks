/*jslint node: true, stupid: true */
'use strict';
var userOp = require('../common/operations/userOp.js');

module.exports = function (server) {
	
	// user
	server.post('/signIn', userOp.signIn);
	server.post('/authenticate', userOp.authenticate);
	server.post('/logout', userOp.logout);
	server.post('/me', userOp.me);

};
