'use strict';
angular.module('jumboClient').controller('LoginCtrl', ['User', '$state', '$scope', function (User, $state, $scope) {

	$scope.username = '';
	$scope.password = '';

	$scope.logged = false;

	// normal login, with user credentials
	$scope.login = function(){
		var loginPromise = User.login($scope.username, $scope.password).then(function(success){
			$state.transitionTo('main.hello');
		},
		function(error){
			console.log('authentication failed');
			alert('authentication failed');
		})
	}

}]);