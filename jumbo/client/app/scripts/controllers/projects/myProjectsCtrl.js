'use strict';
angular.module('jumboClient').controller('MyProjectsCtrl', ['Project', '$state', '$scope', function (Project, $state, $scope) {
   	
	$scope.projects = [];

	Project.myProjects().then(function(projects){
		console.log(projects);
		$scope.projects = projects;
	});

	$scope.goToProject = function(project){
		$state.transitionTo('main.project', {project: project});
	}

}]);