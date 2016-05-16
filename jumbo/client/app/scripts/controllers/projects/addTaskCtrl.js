'use strict';
angular.module('jumboClient').controller('AddTaskCtrl', ['Task', 'User', '$state', '$scope', function (Task, User, $state, $scope) {

	$scope.task = Task.new();

	$scope.popup1 = {
	    opened: false
	};

	$scope.dateOptions = {
		dateDisabled: disabled,
		formatYear: 'yy',
		maxDate: new Date(2020, 5, 22),
		minDate: new Date(),
		startingDay: 1
	};

	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	function disabled(data) {
		var date = data.date,
		mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	}

	$scope.addNewTask = function(){
		$scope.task.project = $scope.project._id;
		Task.insert($scope.task).then(function(task){
			$scope.project.tasks.push(task);
		});
	}

}]);