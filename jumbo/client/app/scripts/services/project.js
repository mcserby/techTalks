'use strict';
angular.module('jumboClient').service('Project', ['Config', '$q', '$http', function(Config, $q, $http) {

	function project(title, managedBy, members, tasks){
		this.title = title;
		this.managedBy = managedBy;
		this.members = members;
		this.tasks = tasks;
	}

	this.new = function(){
		return new project('', '', [], []);
	}

	this.createNew = function(project){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/project',
			data: project
		}).then(function successCallback(response) {
			var newProject = response.data;
			deferred.resolve(newProject);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

	this.list = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:3000/managedProjects'
		}).then(function successCallback(response) {
			deferred.resolve(response.data.projects);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

	this.myProjects = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:3000/projects'
		}).then(function successCallback(response) {
			deferred.resolve(response.data.projects);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}


}]);