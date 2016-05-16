'use strict';
angular.module('jumboClient').controller('MenuCtrl', ['User', '$state', '$scope', function (User, $state, $scope) {
   	
   	$scope.isLoggedIn = User.isLoggedIn;
	$scope.isManager = User.isManager;

	function initHeader(){
		if(User.isLoggedIn()){
			$scope.username = User.getUsername();
		}
	}

	initHeader();

	User.subscribeForUserChange(initHeader);

	$scope.logout = function(){
		User.logout();
		$state.transitionTo('main');
	}


}]);
