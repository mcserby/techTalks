/*jslint node: true, stupid: true */
'use strict';
var userOp = require('../common/operations/userOp.js');
var projectOp = require('../common/operations/projectOp.js');
var taskOp = require('../common/operations/taskOp.js');

module.exports = function (server) {
	
	// user
	server.post('/signIn', userOp.signIn);
	server.post('/authenticate', userOp.authenticate);
	server.post('/logout', userOp.logout);
	server.post('/me', userOp.me);
	server.get('/users', userOp.search);

	// project
	server.post('/project', projectOp.create);
	server.get('/projects', projectOp.myProjects);
	server.get('/managedProjects', projectOp.managedProjects);

	//task
	server.post('/project/:projectId/tasks', taskOp.create);
	server.get('/project/:projectId/tasks', taskOp.search);

};
