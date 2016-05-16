'use strict';
angular.module('jumboClient').controller('MyProjectCtrl', ['Project', '$state', '$stateParams', '$scope', function (Project, $state, $stateParams, $scope) {
	
	$scope.project = $stateParams.project;
}]);