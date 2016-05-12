'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
'use strict';
angular.module('promatonFrqClient').controller('MenuCtrl', ['User', '$state', '$scope', function (User, $state, $scope) {
   	
   	$scope.isLoggedIn = User.isLoggedIn;

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
