'use strict';
angular.module('jumboClient').service('Task', ['Config', '$q', '$http', function(Config, $q, $http) {

	function task(type, text, date, fromHours, toHours, owner, project){
		this.type = type;
		this.text = text;
		this.date = date;
		this.fromHours = fromHours;
		this.toHours = toHours; 
		this.owner = owner;
		this.project = project;
	}

	this.new = function(){
		return new task('', '', new Date(), 9, 17, null, null);
	}

	this.insert = function(task){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://localhost:3000/project/'+ task.project + '/tasks',
			data: task
		}).then(function successCallback(response) {
			deferred.resolve(response.data);
		}, 
		function errorCallback(error) {
			console.log(error);
			deferred.reject(error);
		});
		return deferred.promise;
	}

}]);