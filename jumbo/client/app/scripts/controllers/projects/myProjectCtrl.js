'use strict';
angular.module('jumboClient').controller('MyProjectCtrl', ['Task', '$state', '$stateParams', '$scope', function (Task, $state, $stateParams, $scope) {
	
	$scope.project = $stateParams.project;

	$scope.task = null;

	$scope.tasks = [];

	$scope.listTasks = function(searchValue){
		return Task.search($scope.project._id, searchValue).then(function(tasks){
			$scope.tasks = tasks;
			return tasks.map(function(t){
        		return t.text;
      		});
		})
	}

	$scope.loadTask = function(taskText){
		$scope.task = $scope.tasks.filter(function(t){
			return t.text.startsWith(taskText);
		})[0];
	}
}]);