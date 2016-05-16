'use strict';
angular.module('jumboClient').controller('CreateNewProjectCtrl', ['Project', 'User', '$state', '$scope', function (Project, User, $state, $scope) {
   	
	$scope.project = Project.new();
	$scope.newMemberUsername = '';
	$scope.addNewMember = false;

	$scope.members = [];

	$scope.matchedUsers = [];

	$scope.createNewProject = function(){
	   	Project.createNew($scope.project).then(function(project){
	   		console.log(project);
	   		$state.transitionTo('main.administrate.managedProjects');
	   	}, function(error){
	   		alert('could not create new project!');
	   	});
	}

	$scope.removeProjectMember = function() {
		if($scope.project.members.length > 0){
			$scope.project.members.pop();
		}
	};

	$scope.loadUsers = function(matchingString){
		return User.search(matchingString).then(function(users){
			$scope.matchedUsers = users;
      		return users.map(function(u){
        		return u.username;
      		});
    	});
	}

	$scope.appendMember = function(){
		$scope.addNewMember = false;
		$scope.project.members.push($scope.matchedUsers.filter(function(u){
			return u.username == $scope.newMemberUsername;
		})[0]);
		$scope.newMemberUsername = '';
	}

}]);