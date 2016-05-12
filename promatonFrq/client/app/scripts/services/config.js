'use strict';
angular.module('promatonFrqClient').service('Config', ['$localStorage', function( $localStorage) {

	//token has to be retrieved from local storage if exists
	var token = null;

	this.setToken = function(newToken){
		token = newToken;
		$localStorage.token = newToken;
	}

	this.getToken = function(){
		return token != null? token : $localStorage.token;
	}

	this.removeToken = function(){
		delete $localStorage.token;
	}



}]);