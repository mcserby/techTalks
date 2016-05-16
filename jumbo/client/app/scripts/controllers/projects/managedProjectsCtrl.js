'use strict';
angular.module('jumboClient').controller('ManagedProjectsCtrl', ['Project', '$state', '$scope', function (Project, $state, $scope) {
   	
	$scope.projects = [];

	Project.list().then(function(projects){
		console.log(projects);
		$scope.projects = projects;
	});

}]);