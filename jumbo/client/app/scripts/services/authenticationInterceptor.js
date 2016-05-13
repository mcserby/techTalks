'use strict';
angular.module('jumboClient').service('AuthInterceptor', ['Config', '$q', function (Config, $q) {
		
	this.request = function (config) {
		config.headers = config.headers || {};
		var token = Config.getToken();
		if (token) {
			config.headers.Authorization = 'Bearer ' + token;
		}
		return config;
	}

	this.response = function (response) {
		if (response.status === 401) {
			console.log('authentication required.');
		}
		return response || $q.when(response);
	}
}]);